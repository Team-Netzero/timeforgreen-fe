"use client";
import { useRef, useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import styles from "./page.module.css";

export default function PhotoPage({ params }) {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("photo.jpg");
  const [uploading, setUploading] = useState<boolean>(false);
  const [username, setUsername] = useState("");
  const { id } = params;

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
    
    const name = localStorage.getItem("username");
    setUsername(name);
    console.log(id);
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
      // Blob → File
      const file = new File([blob], fileName, { type: blob.type });

      const formData = new FormData();
      formData.append("file", file);

      // 서버에 업로드
      const response = await axios.post(
        "http://20.41.122.250:8080/predict",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const { result, score } = response.data as {
        result: string;
        score: number;
      };
      console.log("Server response:", result, score);

      if (result === "true") {
        // 플러그가 뽑혀 있으면 /room으로 이동
        const createMissionDto = {
          subject: "PLUG",
          roomId: id
        };

        axios.post(`http://localhost:50000/user/${username}/mission`, {createMissionDto: createMissionDto}, { withCredentials: true })
          .then(res => {
            console.log("Mission created!", res.data);
          })
          .catch(err => {
            console.error(err);
          });

        router.push("/");
      } else {
        // 꽂혀 있으면 사용자에게 알림
        alert("⚠️ 플러그가 꽂혀 있습니다. 방으로 이동하지 않습니다.");
      }
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
