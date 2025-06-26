"use client";

import { useRef, useState, useEffect } from "react";
import styles from "./TakePhoto.module.css";

export default function PhotoPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [photo, setPhoto] = useState<string | null>(null);

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
    canvas.toBlob(
      async (blob) => {
        if (!blob) return;

        // 3) FormData 에 파일 추가
        const formData = new FormData();
        // key 이름은 서버 API 스펙에 맞춰주세요. 예시로 'file' 사용
        formData.append("file", blob, "capture.jpg");

        try {
          // 4) fetch 로 전송 (Content-Type 헤더는 자동 세팅)
          const res = await fetch("http://20.41.122.250:8080/predict", {
            method: "POST",
            body: formData,
          });
          if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
          }
          const json = await res.json();
          console.log("예측 결과:", json);
        } catch (err) {
          console.error("업로드 실패:", err);
        }
      },
      "image/jpeg",
      0.95 /* 화질(0~1) */
    );
  };

  const retry = () => {
    setPhoto(null);
    const stream = videoRef.current?.srcObject;
    if (stream instanceof MediaStream) {
      stream.getTracks().forEach((t) => t.stop());
    }
    initCamera();
  };

  const sendPhoto = async () => {
    if (!photo) return;
    // base64 → Blob 변환
    const res = await fetch(photo);
    const blob = await res.blob();
    // File 객체로 변환 (여기서 파일 이름 지정)
    const file = new File([blob], "my_photo.jpg", { type: "image/jpeg" });

    const formData = new FormData();
    formData.append("file", file);

    // 서버로 전송
    await fetch("http://20.41.122.250:8080/predict", {
      method: "POST",
      body: formData,
    });
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
          <div className={styles.btnGroup}>
            <button className={styles.confirmBtn}>사진 선택하기</button>
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
