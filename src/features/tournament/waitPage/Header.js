// import { getElementError } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import logo from "../../../images/logo_transparent.png"
// import GioiThieu from "../GioiThieu/GioiThieu";
import styles from "./styles/header.module.css"


function Header({ isClick, getHeader }) {
  let tenCuocThi = "Ai là người nhanh nhất? code sample"
  const [time, setTime] = useState();
  useEffect(() => {
    // const dateTimeStart = new Date("Aug 30, 2022 17:59:59").getTime();

    const dateTimeStart = new Date("Sep 2, 2022 17:59:59").getTime();
    const dateTimeChange = setInterval(function () {

      // Lấy thời gian hiện tại
      let now = new Date().getTime();

      // Lấy số thời gian chênh lệch
      let distance = dateTimeStart - now;

      // Tính toán số ngày, giờ, phút, giây từ thời gian chênh lệch
      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // HIển thị chuỗi thời gian trong thẻ p
      setTime(`${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây`);

      // document.getElementById("Count-time").innerHTML = days + " " + "ngày" + " " + hours + " " + "giờ"
      //   + " " + minutes + " " + "phút" + " " + seconds + " " + "giây";

      // Nếu thời gian kết thúc, hiển thị chuỗi thông báo
      if (distance < 0) {
        setTime("Thời gian đếm ngược đã kết thúc!");
        return clearInterval(dateTimeChange);

        // document.getElementById("Count-time").innerHTML = "Thời gian đếm ngược đã kết thúc!";
      }
    }, 1000);

  }, [])

  return (
    <div ref={getHeader}
      className={styles.App_header}>
      <img src={logo} style={{ width: '350px' }} alt=""></img>
      <h1>{tenCuocThi}</h1>
      <h4>Chào mừng các bạn đã đến với cuộc thi của CodeSample!</h4>
      <div>
        <h5>Cuộc thi sẽ bắt đầu sau: </h5>
        <p id="Count-time">{time}</p>
      </div>
      <div
        onClick={() => {
          isClick()
        }}
        className={styles.button}
      >
        <p>Xem chi tiết</p>
      </div>
      <div
        onClick={() => {
          alert("Đăng ký thành công");
        }}
        className={styles.button}
      >
        <p>Đăng ký</p>
      </div>
    </div>
  )
}
export default Header