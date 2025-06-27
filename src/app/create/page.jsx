"use client";

import styles from "./page.module.css";
import Header from "../../components/Header";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useState, useEffect } from "react";
import postData from "../../lib/post";
import { useRouter } from "next/navigation";

export default function CreatePage() {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [title, setTitle] = useState("");
  const [username, setUsername] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const name = localStorage.getItem("username");
    setUsername(name);
  }, []);

  async function createTeam() {
    const res = await postData(`user/${username}/room`, {
      createRoomDto: {
        title: title,
        allowNotificationAt: `${start} ${end}`
      }
    });

    router.push("/");
  }
  
  return (
    <div>
      <Header imgSrc="arrow_left.svg" title="새로운 모임" />
      <div className={styles.body}>
        <input 
          type="text" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input_title} 
          placeholder="이름을 입력해주세요"
        />
        <div className={styles.title}>
          시간 선택
        </div>
        <div className={styles.sub_title}>
          미션이 뜨기를 원하는 시간대를 입력해주세요
        </div>
        <div className={styles.time_picker}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label="시작 시간"
              value={start}
              onChange={(time) => setStart(time)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label="종료 시간"
              value={end}
              onChange={(time) => setEnd(time)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
      </div>
      <button 
        className={styles.create_button}
        onClick={createTeam}
      >
        만들기
      </button>
    </div>
  );
}