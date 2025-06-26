import styles from "./page.module.css";
import Header from "../../components/Header";

export default function UserPage() {
  return (
    <div>
      <Header imgSrc="/arrow_left.svg" title="내 정보" />
      <div className={styles.body}>
        <div>
          <div className={styles.user_img}>

          </div>
          <div className={styles.user_name}>
            유저이름
          </div>
        </div>
        <div>
          <div className={styles.sub_title}>
            나무 심기
          </div>
          <div className={styles.level}>
            Level2
          </div>
          <div className={styles.line_graph}>

          </div>
        </div>
      </div>
    </div>
  );
}