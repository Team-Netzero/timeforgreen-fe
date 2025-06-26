"use client";

import styles from "./page.module.css";
import Header from "../../components/Header";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useState } from "react";

export default function CreatePage() {
  const [value, setValue] = useState(null);
  
  return (
    <div>
      <Header imgSrc="arrow_left.svg" title="새로운 모임" />
      <div className={styles.body}>
        <input 
          type="text" 
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
              value={value}
              onChange={(newValue) => setValue(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label="종료 시간"
              value={value}
              onChange={(newValue) => setValue(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
      </div>
      <button className={styles.create_button}>
        만들기
      </button>
    </div>
  );
}