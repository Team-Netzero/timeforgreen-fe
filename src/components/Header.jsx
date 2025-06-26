"use client";

import styles from "./Header.module.css";
import { useRouter } from "next/navigation";

export default function Header({ imgSrc, title }) {
  const router = useRouter();

  return (
    <div className={styles.header}>
      <img 
        src={imgSrc} 
        onClick={() => {router.push("/")}}
      />
      <div className={styles.title}>
        {title}
      </div>
    </div>
  );
}