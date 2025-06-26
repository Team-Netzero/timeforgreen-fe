import styles from "./page.module.css";

export default function UserPage() {
  return (
    <div>
      <div className={styles.header}>
        <img src="arrow_left.svg" className={styles.back_icon} />
        <div className={styles.title}>
          내 정보
        </div>
      </div>
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