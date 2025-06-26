import styles from "./Room.module.css"
import { useRouter } from "next/navigation";

export default function Room({ room }) {
  const router = useRouter();

  return (
    <div 
      className={styles.room}
      onClick={() => router.push("/room")}
    >
      <div className={styles.icon}>
        {/* <img src="/test.png" className={styles.icon} /> */}
      </div>
      <div>
        <div className={styles.roomName}>
          {room.roomName}
        </div>
        <div className={styles.info}>
          {room.participants.map((person, idx) => {
            return (
              <span key={person}>
                {idx === 0 ? "" : ", "}
                {person}
              </span>
            );
          })}
          <div>
            {room.participants.length}명의 참여자
          </div>
        </div>
      </div>
    </div>
  );
}