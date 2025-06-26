"use client";

import styles from "./page.module.css";
import Header from "../../../components/Header";
import getData from "../../../lib/get";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function Room() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [roomName, setRoomName] = useState(null);
  const [totMisson, setTotMisson] = useState(0);
  const [todayMisson, setTodayMisson] = useState(0);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    // 랜덤한 미션 시작 시간 설정
    const begintime = new Date();
    begintime.setHours(12, 0, 0, 0);

    const finishtime = new Date();
    finishtime.setHours(21, 0, 0, 0);

    const randomDuration =
      Math.random() * (5 * 60 * 60 * 1000 - 1 * 60 * 60 * 1000) + 1 * 60 * 60 * 1000; // 1~5시간
    const missionTime = begintime.getTime() + randomDuration;
    const now = Date.now();

    if (now >= missionTime && now <= finishtime.getTime()) {
      router.push("/mission");
    } else if (now < missionTime) {
      const delay = missionTime - now;
      const timer = setTimeout(() => {
        router.push("/mission");
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [router]);

  return (
    <div className={styles.container}>
      <Header imgSrc="/arrow_left.svg" title={roomName || `Room ${id}`} />
      <div className={styles.roomWrapper}>
        <div className={styles.missionTitleWrapper}>
          <div className={styles.missionTitle}>달성한 과제</div>
        </div>

        <div className={styles.missionStatusWrapper}>
          <div className={styles.missionStatus}>
            여태껏 달성한 과제: {totMisson} | 오늘 달성한 과제: {todayMisson}
          </div>
        </div>

        <div className={styles.graphArea}></div>

        <div className={styles.memberTitleWrapper}>
          <div className={styles.memberTitle}>다른 멤버들</div>
        </div>

        <div className={styles.memberItem}>
          <img className={styles.avatar} src={"hello.png"} />
          <div className={styles.memberInfo}>
            <div className={styles.memberName}>{username}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
