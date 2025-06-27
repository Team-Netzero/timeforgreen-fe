"use client";

import styles from "./page.module.css";
import Header from "../../../components/Header";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function MissonPage() {
  const {id} = useParams();
  const router = useRouter(); // ← 추가
  const [timeLeft, setTimeLeft] = useState(20 * 60 * 1000);
  const [missionType, setMissionType] = useState(1);

  useEffect(() => {
    const randomType = 1;
    setMissionType(randomType);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/room");
          return 0;
        }
        return prev - 1;
      });
    }, 1);
    return () => clearInterval(timer);
  }, [router]);

  const min = Math.floor((timeLeft / 1000 / 60) % 60)
    .toString()
    .padStart(2, "0");
  const sec = Math.floor((timeLeft / 1000) % 60)
    .toString()
    .padStart(2, "0");
  const ms = (timeLeft % 1000).toString().padStart(3, "0");

  const missionInfo = {
    1: {
      img: "../plug.avif",
      title: "콘센트 플러그를 뽑아주세요!",
      desc: `사용하지 않는 플러그, 환경에 남기는 발자국입니다.
가전제품을 꺼도 플러그가 꽂혀 있다면 전기는 계속 낭비됩니다.
작은 실천으로 지구를 지키세요.
지금 당장 플러그를 뽑아주세요.`,
    },
    2: {
      img: "../aircon.png",
      title: "에어컨을 꺼주세요!",
      desc: `여름철 에어컨 과다 사용은 환경 파괴의 주범입니다.
전원을 끄지 않으면 에어컨은 대기 전력을 계속 소모합니다.
작은 실천으로 지구를 지키세요.
지금 당장 에어컨 전원을 꺼주세요.`,
    },
    3: {
      img: "../light.png",
      title: "전등을 꺼주세요!",
      desc: `외출시 소등의 습관화는 지구를 위한 한 걸음입니다.
일상에서의 작은 실천이 큰 효과를 불러일으킵니다.
지금 당장 전등을 꺼주세요.`,
    },
  };

  // 인증하기 클릭 시 PhotoPage(/photo)로 이동
  const handleVerify = () => {
    router.push(`/photo/${id}`);
  };

  return (
    <div className={styles.page}>
      <Header imgSrc="../arrow_left.svg" title="미션 인증" />
      <div>
        <img
          src={missionInfo[missionType].img}
          alt=""
          className={styles.picture}
        />
      </div>
      <div className={styles.body}>
        <div>
          <div className={styles.misson}>{missionInfo[missionType].title}</div>
          <div className={styles.description}>
            {missionInfo[missionType].desc}
          </div>
        </div>

        <div className={styles.footer}>
          <div>
            <div className={styles.title}>Time Left</div>
            <div className={styles.time_wrapper}>
              <div className={styles.time}>
                <div className={styles.time_box}>{min}</div>
                <div>Minutes</div>
              </div>
              <div className={styles.time}>
                <div className={styles.time_box}>{sec}</div>
                <div>Seconds</div>
              </div>
              <div className={styles.time}>
                <div className={styles.time_box}>{ms}</div>
                <div>Milliseconds</div>
              </div>
            </div>
          </div>
          {/* onClick에 handleVerify 연결 */}
          <button onClick={handleVerify} className={styles.verify_button}>
            인증하기
          </button>
        </div>
      </div>
    </div>
  );
}
