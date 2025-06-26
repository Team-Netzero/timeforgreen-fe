"use client";

import styles from "./page.module.css";
import { useState } from "react";
import { useRef } from "react";
import postData from "../../lib/post";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [isPwShow, setIsPwShow] = useState(false);
  const id = useRef(null);
  const pw = useRef(null);

  async function handleLogin() {
    if (!id.current || !pw.current) return;

    const res = await postData("auth/login", {username: id.current.value, password: pw.current.value});

    if (!res) {
      localStorage.setItem("username", id.current.value);
      router.push("/");
    } else {
      alert('error');
      console.log(res);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.logo}>
        TimeForGreen
      </div>
      <div className={styles.input_form}>
        <div className={styles.input_wrapper}>
          <input 
            ref={id}
            type="text" 
            placeholder="아이디" 
            className={styles.input} 
          />
        </div>

        <div className={styles.input_wrapper}>
          <input 
            className={styles.input}
            ref={pw}
            type={isPwShow ? "text" : "password"} 
            placeholder="비밀번호" 
          />
          <button 
            className={styles.eye_button}
            onClick={() => setIsPwShow(!isPwShow)}
          >
            <img src={`${isPwShow ? "/eye_on.svg" : "/eye_off.svg"}`} alt="" className={styles.eye_icon} />
          </button>
        </div>
      </div>
      <button 
        className={styles.login_button}
        onClick={handleLogin}
      >
        로그인
      </button>
    </div>
  );
}
