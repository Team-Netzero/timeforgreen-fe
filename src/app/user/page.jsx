"use client";

import styles from "./page.module.css";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import getData from "../../lib/get";

export default function UserPage() {
  const [plugMission, setPlugMisson] = useState(0);
  const [airconMission, setAirconMission] = useState(0);
  const [lightMission, setLightMission] = useState(0);

  const allMission = plugMission + airconMission + lightMission;

  const plugPercent = allMission == 0 ? 0 : (plugMission / allMission) * 100;
  const airconPercent = allMission == 0 ? 0 : (airconMission / allMission) * 100;
  const lightPercent = allMission == 0 ? 0 : (lightMission / allMission) * 100;

  const treeNumber = Math.floor(allMission / 3);

  const [username, setUsername] = useState(null);

  useEffect(() => {
    const name = localStorage.getItem("username");
    setUsername(name);

    async function fetchData() {
      const res = await getData(`user/${name}/missions`);

      for (let i = 0; i < res.length; i++) {
        const airCount = res.filter(r => r.subject === "AIR_CONDITIONER").length;
        const lightCount = res.filter(r => r.subject === "LIGHT").length;
        const plugCount = res.length - airCount - lightCount;

        setAirconMission(airCount);
        setLightMission(lightCount);
        setPlugMisson(plugCount);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <Header imgSrc="/arrow_left.svg" title="내 정보" />

      <div className={styles.body}>
        <div>
          <div className={styles.user_img}>
            <img src="user.png" alt="" className={styles.user_icon} />
          </div>
          <div className={styles.user_name}>{username}</div>
        </div>

        <div>
          <div className={styles.line_graph}>
            <div
              style={{
                width: `${plugPercent}%`,
                backgroundColor: "#2D4F2B",
                height: "100%",
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
              }}
            />
            <div
              style={{
                width: `${airconPercent}%`,
                backgroundColor: "#708A58",
                height: "100%",
              }}
            />
            <div
              style={{
                width: `${lightPercent}%`,
                backgroundColor: "#FFB823",
                height: "100%",
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
              }}
            />
          </div>

          <div className={styles.legend}>
            <div className={styles.legend_item}>
              <span
                className={styles.color_box}
                style={{ backgroundColor: "#2D4F2B" }}
              />
              플러그 뽑기: {plugMission}
            </div>
            <div className={styles.legend_item}>
              <span
                className={styles.color_box}
                style={{ backgroundColor: "#708A58" }}
              />
              냉난방기 전원 끄기: {airconMission}
            </div>
            <div className={styles.legend_item}>
              <span
                className={styles.color_box}
                style={{ backgroundColor: "#FFB823" }}
              />
              전등 끄기: {lightMission}
            </div>
          </div>

          <div className={styles.sub_title}>내가 지킨 나무</div>

          <div className={styles.tree_container}>
            {Array.from({ length: (plugMission + airconMission + lightMission) }).map((_, i) => {
              const left = Math.random() * 70 + 10; // 10% ~ 80%
              const top = Math.random() * 70 + 10; // 10% ~ 80%
              const imgNum = Math.floor(Math.random() * 15) + 1;
              return (
                <img
                  key={i}
                  src={`/${imgNum}.png`}
                  alt="tree"
                  className={styles.tree_image}
                  style={{ left: `${left}%`, top: `${top}%` }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}