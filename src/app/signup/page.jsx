"use client";

import styles from "./page.module.css";
import { useState } from "react";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import postData from "../../lib/post";

export default function SignupPage() {
  const router = useRouter();
  const [isPwShow, setIsPwShow] = useState(false);
  const id = useRef(null);
  const pw = useRef(null);

  async function handleSignup() {
    if (!id.current || !pw.current) return;

    const res = await postData("auth/join", {createUserDto: { username: id.current.value, password: pw.current.value}})
    if (!res) {
      router.push("/login");
    } else {
      alert("error");
      console.log(res);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.logo}>
        회원가입
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
        onClick={handleSignup}
      >
        가입하기
      </button>
    </div>
  );
}
