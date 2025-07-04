"use client";

import styles from "./page.module.css";
import Room from "../components/Room";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import getData from "../lib/get";

export default function Home() {
  const router = useRouter();

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const username = localStorage.getItem("username");
    console.log(username);
    async function get() {
      const res = await getData(`user/${username}/rooms`);
      setRooms(res);
    }

    get();
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.title}>
          Rooms
        </div>
        <div 
          className={styles.user_button}
          onClick={() => {router.push("/user")}}
        >
          <img src="user.png" alt="" className={styles.user_icon} />
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.search_bar}>
          <img src="/search.png" className={styles.search_icon} />
          <input type="text" placeholder="검색" className={styles.search_input} />
        </div>
        <div className={styles.rooms}>
          {rooms && rooms.map((room) => {
            return (
              <Room key={room.id} room={room} />
            );
          })}
        </div>
      </div>
      <button 
        className={styles.creation_button}
        onClick={() => {router.push("/create")}}
      >
        <img src="/plus.svg" className={styles.plus_icon} />
      </button>
    </div>
  );
}
