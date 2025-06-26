"use client"

import styles from "./page.module.css";
import Header from "../../../components/Header";
import getData from "../../../lib/get";
import { useEffect } from "react";
import { useState } from "react";

export default function Room({ params }) {
  const { id } = params;

  const [roomName, setRoomName] = useState(null);
  const [totMisson, setTotMisson] = useState(0);
  const [todayMisson, setTodayMisson] = useState(0);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    async function fetchRoom() {
      
    }

    fetchRoom();
  }, []);

  return (
    <div className={styles.container}>
      <Header imgSrc="/arrow_left.svg" title={roomName} />
      <div className={styles.roomWrapper}>
        <div className={styles.missionTitleWrapper}>
          <div className={styles.missionTitle}>달성한 과제</div>
        </div>

        <div className={styles.missionStatusWrapper}>
            {/* 과제개수 받아오기 */}
          <div className={styles.missionStatus}>
            여태껏 달성한 과제: {totMisson} | 오늘 달성한 과제: {todayMisson}
          </div>
        </div>

        <div className={styles.graphArea}></div>

        <div className={styles.memberTitleWrapper}>
          <div className={styles.memberTitle}>다른 멤버들</div>
        </div>

        {/* 멤버 리스트 */}
        <div className={styles.memberItem}>
					<img className={styles.avatar} src={"hello.png"}/>
          <div className={styles.memberInfo}>
            <div className={styles.memberName}>{username}</div>
          </div>
        </div>
        
      </div>
    </div>
  );
}