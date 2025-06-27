"use client";

import styles from "./Room.module.css";
import { useRouter } from "next/navigation";
import getData from "../lib/get";
import { useState, useEffect } from "react";

export default function Room({ room }) {
  const router = useRouter();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      const res = await getData(`room/${room.id}/users`);
      setUsers(res);
    }
    
    getUsers()
  }, []);

  return (
    <div 
      className={styles.room}
      onClick={() => router.push(`room/${room.id}`)}
    >
      <div className={styles.icon}>
        <img src="leaf.png" alt="" className={styles.leaf} />
      </div>
      <div>
        <div className={styles.roomName}>
          {room.title}
        </div>
        <div className={styles.info}>
          {users && users.map((user, idx) => {
            return (
              <span key={user}>
                {idx === 0 ? "" : ", "}
                {user.username}
              </span>
            );
          })}
          <div>
            {users.length}명의 참여자
          </div>
        </div>
      </div>
    </div>
  );
}