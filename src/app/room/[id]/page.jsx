"use client"

import styles from "./page.module.css";
import Header from "../../../components/Header";
import getData from "../../../lib/get";

export default function Room() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [roomName, setRoomName] = useState(null);
  const [totMisson, setTotMisson] = useState(0);
  const [todayMisson, setTodayMisson] = useState(0);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    // 랜덤한 미션 시작 시간 설정
    const begintime = new Date();
    begintime.setHours(12, 0, 0, 0);

    const finishtime = new Date();
    finishtime.setHours(21, 0, 0, 0);

    const randomDuration =
      Math.random() * (5 * 60 * 60 * 1000 - 1 * 60 * 60 * 1000) + 1 * 60 * 60 * 1000; // 1~5시간
    const missionTime = begintime.getTime() + randomDuration;
    const now = Date.now();

    if (now >= missionTime && now <= finishtime.getTime()) {
      router.push(`/mission/${id}`);
    } else if (now < missionTime) {
      const delay = missionTime - now;
      const timer = setTimeout(() => {
        router.push(`/mission/${id}`);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [router]);

  return (
    <div className={styles.container}>
      <Header imgSrc="/arrow_left.svg" title={roomname} />
      <div className={styles.roomWrapper}>
        {/* <div className={styles.header}>
          <img className={styles.backIcon} src="arrow-left.svg" />
          <div className={styles.roomTitleWrapper}>
            <div className={styles.roomTitle}>{roomname}</div>
          </div>
        </div> */}
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
					<img className={styles.avatar} src={userimage}/>
          <div className={styles.memberInfo}>
            <div className={styles.memberName}>{username}</div>
          </div>
        </div>
        
      </div>
    </div>
  );
}