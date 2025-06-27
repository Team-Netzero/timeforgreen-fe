"use client"

import styles from "./page.module.css";
import Header from "../../../components/Header";
import getData from "../../../lib/get";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function Room() {
  const router = useRouter();

  const { id } = useParams();

  const [roomName, setRoomName] = useState(null);
  const [totMisson, setTotMisson] = useState(0);
  const [todayMisson, setTodayMisson] = useState(0);
  const [username, setUsername] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetch() {
      const res = await getData(`room/${id}`);
      setRoomName(res.title);
      const name = localStorage.getItem("username");
      setUsername(name);
      const misson_today = await getData(`user/${name}/mission/today`);
      setTodayMisson(misson_today.length);
      const misson_all = await getData(`user/${name}/mission`);
      setTotMisson(misson_all.length);
      const user = await getData(`room/${id}/users`);
      setUsers(user);
    }

    fetch();
  }, []);

  useEffect(() => {
    const begintime = new Date();
    begintime.setHours(12, 0, 0, 0);

    const finishtime = new Date();
    finishtime.setHours(21, 0, 0, 0);

    const randomDuration =
      Math.random() * (5 * 60 * 60 * 1000 - 1 * 60 * 60 * 1000) + 1 * 60 * 60 * 1000; // 1~5시간
    const missionTime = begintime.getTime() + randomDuration;
    const now = Date.now();

    if (now >= missionTime && now <= finishtime.getTime()) {
      router.push(`/mission/${id}`);
    } else if (now < missionTime) {
      const delay = missionTime - now;
      const timer = setTimeout(() => {
        router.push(`/mission/${id}`);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [router]);

  return (
    <div className={styles.container}>
      <Header imgSrc="/arrow_left.svg" title={roomName} />
      <div className={styles.roomWrapper}>
        <div className={styles.missionTitleWrapper}>
          <div className={styles.missionTitle}>달성한 과제</div>
        </div>

        <div className={styles.missionStatusWrapper}>
            {/* 과제개수 받아오기 */}
          <div className={styles.missionStatus}>전체 달성한 과제: {totMisson} | 오늘 달성한 과제: {todayMisson}</div>
        </div>

        <div className={styles.graphArea}></div>

        <div className={styles.memberTitleWrapper}>
          <div className={styles.memberTitle}>다른 멤버들</div>
        </div>

        {/* 멤버 리스트 */}
        <div className={styles.memberItem}>
					{users.map(() => {
            return (
              <div className={styles.person_block}>
                <div className={styles.avatar}>
                  <img src="../user.png" alt="" className={styles.usericon} />
                </div>
                <div className={styles.memberInfo}>
                  <div className={styles.memberName}>{username}</div>
                </div>
              </div>
            );
          })}
        </div>
        
      </div>
    </div>
  );
}