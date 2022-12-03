import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import styles from "./styles/UserOverView.module.scss";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ChartUserOver() {
  const getData = useSelector((state) => state.userOverView.listData);
  const getDataDaLam = useSelector((state) => state.userOverView.listDataDaLam);

  const [count, setCount] = useState({
    doEasy: 0,
    doAverage: 0,
    doHard: 0,
  });

  React.useEffect(() => {
    if (getData.length > 0) {
      const demTongSoCauDe = (value) => {
        let countCauDe = 0;
        let countCauDeDaLam = 0;
        let countCauTrungBinh = 0;
        let countCauTrungBinhDaLam = 0;
        let countCauKho = 0;
        let countCauKhoDaLam = 0;
        value.map((i) => {
          if (i.doKho === 1) {
            return (countCauDe = countCauDe + 1);
          }
          if (i.doKho === 2) {
            return (countCauTrungBinh = countCauTrungBinh + 1);
          }
          if (i.doKho === 3) {
            return (countCauKho = countCauKho + 1);
          }
          return null;
        });

        getDataDaLam.map((item) => {
          if (item.doKho === 1) {
            return (countCauDeDaLam = countCauDeDaLam + 1);
          }
          if (item.doKho === 2) {
            return (countCauTrungBinhDaLam = countCauTrungBinhDaLam + 1);
          }
          if (item.doKho === 3) {
            return (countCauKhoDaLam = countCauKhoDaLam + 1);
          }
          return true;
        });

        setCount({
          doEasy: countCauDeDaLam,
          doAverage: countCauTrungBinhDaLam,
          doHard: countCauKhoDaLam,
        });
      };
      demTongSoCauDe(getData);
    }
  }, [getData, getDataDaLam]);

  const data = {
    labels: ["Khó", "Trung bình", "Dễ"],
    datasets: [
      {
        label: "# of Votes",
        data: [count.doHard, count.doAverage, count.doEasy],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(54, 162, 235, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(54, 162, 235, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className={styles.bieudo}>
      <Pie
        data={data}
        options={{
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
}
