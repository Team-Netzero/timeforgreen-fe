import styles from "./page.module.css";
import Header from "../../components/Header";

export default function UserPage() {
  const plugMission = 12;
  const airconMission = 7;
  const lightMission = 2;
  const allMission = plugMission + airconMission + lightMission;

  const plugPercent = (plugMission / allMission) * 100;
  const airconPercent = (airconMission / allMission) * 100;
  const lightPercent = (lightMission / allMission) * 100;

  const treeNumber = Math.floor(allMission / 3);

  return (
    <div>
      <Header imgSrc="/arrow_left.svg" title="내 정보" />

      <div className={styles.body}>
        <div>
          <div className={styles.user_img} />
          <div className={styles.user_name}>유저이름</div>
        </div>

        <div>
          <div className={styles.line_graph}>
            <div
              style={{
                width: `${plugPercent}%`,
                backgroundColor: "#F2FF80",
                height: "100%",
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
              }}
            />
            <div
              style={{
                width: `${airconPercent}%`,
                backgroundColor: "#CEF67E",
                height: "100%",
              }}
            />
            <div
              style={{
                width: `${lightPercent}%`,
                backgroundColor: "#8EF17E",
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
                style={{ backgroundColor: "#F2FF80" }}
              />
              플러그 뽑기: {plugMission}
            </div>
            <div className={styles.legend_item}>
              <span
                className={styles.color_box}
                style={{ backgroundColor: "#CEF67E" }}
              />
              냉난방기 전원 끄기: {airconMission}
            </div>
            <div className={styles.legend_item}>
              <span
                className={styles.color_box}
                style={{ backgroundColor: "#8EF17E" }}
              />
              전등 끄기: {lightMission}
            </div>
          </div>

          <div className={styles.sub_title}>내가 지킨 나무</div>

          <div className={styles.tree_container}>
            {Array.from({ length: treeNumber }).map((_, i) => {
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