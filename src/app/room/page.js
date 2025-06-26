import styles from "./page.module.css";

export default function Room() {
  let roomname = "방제목";
  let totalmission = 100;
  let todaymission = 0;
  let userimage = "";
	let username = "park jaewon";
  return (
    <div className={styles.container}>
      <div className={styles.roomWrapper}>
        <div className={styles.header}>
          <img className={styles.backIcon} src="arrow-left.svg" />
          <div className={styles.roomTitleWrapper}>
            {/* 방제목 받아오기 */}
            <div className={styles.roomTitle}>{roomname}</div>
          </div>
        </div>

        <div className={styles.missionTitleWrapper}>
          <div className={styles.missionTitle}>달성한 과제</div>
        </div>

        <div className={styles.missionStatusWrapper}>
            {/* 과제개수 받아오기 */}
          <div className={styles.missionStatus}>여태껏 달성한 과제: {totalmission} | 오늘 달성한 과제: {todaymission}</div>
        </div>

        <div className={styles.graphArea}></div>

        <div className={styles.memberTitleWrapper}>
          <div className={styles.memberTitle}>다른 멤버들</div>
        </div>

        {/* 멤버 리스트 */}
        <div className={styles.memberItem}>
					{/* 유저 이미지 위치랑 유저 이름 받아오기 */}
					<img className={styles.avatar} src= {userimage}/>
          <div className={styles.memberInfo}>
            <div className={styles.memberName}>{username}</div>
          </div>
        </div>
        
      </div>
    </div>
  );
}