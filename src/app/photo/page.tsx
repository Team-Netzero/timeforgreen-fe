"use client";

import { useRef, useState, useEffect } from "react";
import axios from "axios";
import styles from "./TakePhoto.module.css";

export default function PhotoPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("photo.jpg");
  const [uploading, setUploading] = useState<boolean>(false);

  const initCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("카메라 권한 오류:", err);
    }
  };

  useEffect(() => {
    initCamera();
    return () => {
      const stream = videoRef.current?.srcObject;
      if (stream instanceof MediaStream) {
        stream.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  const capture = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    setPhoto(canvas.toDataURL("image/jpeg"));
  };

  const retry = () => {
    setPhoto(null);
    const stream = videoRef.current?.srcObject;
    if (stream instanceof MediaStream) {
      stream.getTracks().forEach((t) => t.stop());
    }
    initCamera();
  };

  const uploadPhoto = async () => {
    if (!photo) return;
    setUploading(true);
    try {
      // dataURL → Blob
      const res = await fetch(photo);
      const blob = await res.blob();
      // Blob → File (파일명 지정)
      const file = new File([blob], fileName, { type: blob.type });

      const formData = new FormData();
      formData.append("file", file);

      // 변경된 서버 엔드포인트
      const response = await axios.post(
        "http://20.41.122.250:8080/predict",
        formData,
        {
          // Let Axios set the correct headers for FormData in the browser
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Server response:", response.data);
      alert("업로드 성공!");
    } catch (err: any) {
      console.error("Upload error:", err.response ?? err.message);
      alert("업로드 실패: " + (err.response?.data || err.message));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={styles.container}>
      {!photo ? (
        <>
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className={styles.video}
          />
          <div className={styles.shutterWrapper}>
            <button onClick={capture} className={styles.shutter} />
          </div>
        </>
      ) : (
        <div className={styles.previewWrap}>
          <img src={photo} alt="촬영 결과" className={styles.preview} />

          <div style={{ marginTop: 16 }}>
            <label>
              파일명:&nbsp;
              <input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                style={{ width: 120 }}
              />
            </label>
          </div>

          <div className={styles.btnGroup}>
            <button
              onClick={uploadPhoto}
              className={styles.confirmBtn}
              disabled={uploading}
            >
              {uploading ? "업로드 중…" : "사진 업로드"}
            </button>
            <button onClick={retry} className={styles.retryBtn}>
              다시 촬영하기
            </button>
          </div>
        </div>
      )}
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}
