import React, { useState, useEffect } from "react";
import styles from "./CodeUi.module.css";

function Clock({ time, value }) {
  //   const [timeSave, setTimeSave] = useState("");
  const [timer, setTimer] = useState("00:00:00");

  //   console.log(time);

  const getTimeRemaining = () => {
    if (time !== null || time !== undefined) {
      const sample = time;
      let getValue = sample.split(":");
      let seconds = getValue[2];
      let minutes = getValue[1];
      let hours = getValue[0];

      const startCountDown = setInterval(() => {
        if (+seconds === 0) {
          if (+minutes > 0 && +seconds === 0) {
            seconds = 59;
            minutes = minutes - 1;
          }
          if (+seconds === 0 && +minutes === 0 && +hours > 0) {
            minutes = 59;
            hours = hours - 1;
          }
          // minutes = minutes - 1;
          // console.log(minutes);
        } else {
          seconds = seconds - 1;
        }
        if (+hours <= 0 && +minutes <= 0 && +seconds === 0) {
          //   console.log("DONE");
          clearInterval(startCountDown);
          value(true);
        }
        // console.log(
        //   `${+hours > 9 && +hours !== 0 ? hours : "0" + hours}/${
        //     +minutes > 9 ? minutes : "0" + minutes
        //   }/${+seconds > 9 ? seconds : "0" + seconds}`
        // );
        setTimer(`${
          +hours === 0 ? "0" + +hours : +hours < 10 ? "0" + +hours : hours
        }:
              ${
                +minutes === 0
                  ? "0" + +minutes
                  : +minutes < 10
                  ? "0" + +minutes
                  : minutes
              }:
              ${
                +seconds === 0
                  ? "0" + +seconds
                  : +seconds < 10
                  ? "0" + +seconds
                  : seconds
              }`);
      }, 1000);
    }
  };

  useEffect(() => {
    // clearTimer(getDeadTime());
    // console.log(time);

    if (time !== null || time !== undefined) {
      //   console.log("RUN");
      getTimeRemaining();
    }
  }, [time]);

  return (
    <div className={styles.timeFrame}>
      <p>{timer}</p>
    </div>
  );
}

export default Clock;
