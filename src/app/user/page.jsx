import styles from "./page.module.css";
import Header from "../../components/Header";

export default function UserPage() {
  let plugmission = 12;
  let airconmission = 7;
  let lightmission = 2;
  let allmission = plugmission + airconmission + lightmission;

  const plugPercent = (plugmission / allmission) * 100;
  const airconPercent = (airconmission / allmission) * 100;
  const lightPercent = (lightmission / allmission) * 100;

  let treenumber = Math.floor(allmission / 3);

  return (
    <div>
      <Header imgSrc="/arrow_left.svg" title="내 정보" />
      <div className={styles.body}>
        <div>
          <div className={styles.user_img}></div>
          <div className={styles.user_name}>유저이름</div>
        </div>
        <div>
          <div className={styles.line_graph}>
            <div
              style={{
                width: `${plugPercent}%`,
                backgroundColor: "#F2FF80",
                height: "100%",
                borderTopLeftRadius: "10px",
                borderBottomLeftRadius: "10px",
              }}
            ></div>
            <div
              style={{
                width: `${airconPercent}%`,
                backgroundColor: "#CEF67E",
                height: "100%",
              }}
            ></div>
            <div
              style={{
                width: `${lightPercent}%`,
                backgroundColor: "#8EF17E",
                height: "100%",
                borderTopRightRadius: "10px",
                borderBottomRightRadius: "10px",
              }}
            ></div>
          </div>

          <div className={styles.legend}>
            <div className={styles.legend_item}>
              <span
                className={styles.color_box}
                style={{ backgroundColor: "#F2FF80" }}
              ></span>
              플러그 뽑기: {plugmission}
            </div>
            <div className={styles.legend_item}>
              <span
                className={styles.color_box}
                style={{ backgroundColor: "#CEF67E" }}
              ></span>
              냉난방기 전원 끄기: {airconmission}
            </div>
            <div className={styles.legend_item}>
              <span
                className={styles.color_box}
                style={{ backgroundColor: "#8EF17E" }}
              ></span>
              전등 끄기: {lightmission}
            </div>
          </div>

          <div className={styles.sub_title} style={{ marginTop: "30px" }}>
            내가 지킨 나무
          </div>
        </div>
        <div className={styles.tree_container}>
          {Array.from({ length: treenumber }).map((_, i) => {
            const left = Math.random() * 80 + 10; // 10% ~ 90% 범위
            const top = Math.random() * 80 + 10; // 10% ~ 90% 범위
            const imgNum = Math.floor(Math.random() * 15) + 1; // 이미지 이름: 1~5.png 등
            return (
              <img
                key={i}
                src={`${imgNum}.png`}
                alt="tree"
                className={styles.tree_image}
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
