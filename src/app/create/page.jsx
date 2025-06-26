import styles from "./page.module.css";
import Header from "../../components/Header";

export default function CreatePage() {
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
      </div>
      <button className={styles.create_button}>
        만들기
      </button>
    </div>
  );
}