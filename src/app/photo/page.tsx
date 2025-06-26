"use client";

import { useRef, useState, useEffect } from "react";
import styles from "./TakePhoto.module.css";

export default function PhotoPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [photo, setPhoto] = useState<string | null>(null);

  // 카메라 초기화
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

  // 마운트 시 카메라 켜고, 언마운트 시 트랙 정리
  useEffect(() => {
    initCamera();
    return () => {
      const stream = videoRef.current?.srcObject;
      if (stream instanceof MediaStream) {
        stream.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  // 스냅샷 찍기
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

  // 재촬영
  const retry = () => {
    setPhoto(null);
    // 이전 스트림 정리 후 재초기화
    const stream = videoRef.current?.srcObject;
    if (stream instanceof MediaStream) {
      stream.getTracks().forEach((t) => t.stop());
    }
    initCamera();
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
