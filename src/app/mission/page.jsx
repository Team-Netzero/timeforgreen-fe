
"use client";

import styles from "./page.module.css";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MissonPage() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(20 * 60 * 1000); // 20분

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/room"); // 20분 끝나면 복귀
          return 0;
        }
        return prev - 1;
      });
    }, 1); // 1ms 단위

    return () => clearInterval(timer);
  }, [router]);

  const min = Math.floor((timeLeft / 1000 / 60) % 60);
  const sec = Math.floor((timeLeft / 1000) % 60);
  const ms = timeLeft % 1000;

  return (
    <div className={styles.page}>
      <Header imgSrc="arrow_left.svg" title="미션 인증" />
        <div>
          <img src="plug.avif" alt="" className={styles.picture} />
        </div>
        <div className={styles.body}>
        <div>
          <div className={styles.misson}>
            콘센트 플러그를 뽑아주세요!
          </div>
          <div className={styles.description}>
            설명설명설명
          </div>
        </div>

        <div className={styles.footer}>
          <div>
            <div className={styles.title}>
              Time Left
            </div>
            <div className={styles.time_wrapper}>
              <div className={styles.time}>
                <div className={styles.time_box}>
                  {min}
                </div>
                <div>
                  Minutes
                </div>
              </div>
              <div className={styles.time}>
                <div className={styles.time_box}>
                  {sec}
                </div>
                <div>
                  Seconds
                </div>
              </div>
              <div className={styles.time}>
                <div className={styles.time_box}>
                  {ms}
                </div>
                <div>
                  Milliseconds
                </div>
              </div>
            </div>
          </div>
          <button className={styles.verify_button}>
            인증하기
          </button>

        </div>
      </div>
    </div>
  );
}