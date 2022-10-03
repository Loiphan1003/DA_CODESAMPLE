import React, { useState } from "react";
import { imgmeet, imgmeet2 } from "../content/export";
import styles from "./join.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus, faListAlt, faShareFromSquare } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";

export default function JoinRoom() {
  const [room, setRoom] = useState(null);
  const [hiddenbtn, setHiddenbtn] = useState(true);
  const navigate = useNavigate();

  const onSubmit = () => {
    window.location.assign(`/video/${room}`);
  };

  const handleHidden = () => {
    if(hiddenbtn === true)
    {
      setHiddenbtn(false);
    }
  };

  const handleClickMain = () => {
    if(hiddenbtn === false)
    {
      setHiddenbtn(true);
    }
  };
  
  const onJoin = () => {
    navigate(`/video/${room}`);
  }

  return (  
    <div className={styles.main_meet} onClick={handleClickMain}>
      <div>
        <div>
          <h1 style={{fontWeight:"700"}}>LỚP HỌC TRỰC TUYẾN</h1>
          <p className={styles.content}>Cùng tham gia lớp học trực tuyến, đây là nơi các bạn có thể gặp nhau trao đổi, học tập dù bạn đang ở bất cứ nơi đâu.</p>
        </div>
        <div className={styles.main1}>
          <button className={styles.btnsubmit} onClick={onSubmit}><FontAwesomeIcon className={styles.icon_add} icon={faSquarePlus}></FontAwesomeIcon> Tạo phòng</button>
          <input className={styles.txtnameclass} onClick={handleHidden} onChange={(e) => setRoom(e.target.value)} placeholder="Tên phòng họp"/>
          <button hidden={hiddenbtn} className={styles.btnsubmit} onClick={onJoin}>Tham gia</button>
        </div>
      </div>
      <div className={styles.main9}>
        <div className={styles.main8}>
          <div className={styles.main10}>
            <div className={styles.main11}></div>
            <img src={imgmeet2} className={styles.img_meet2}></img>
            <div className={styles.main12}></div>
          </div>
        </div>
        <div className={styles.main2}>
          <div className={styles.main3}>
            <div className={styles.main4}></div>
            <div className={styles.main5}>
              <div className={styles.main7}>
                <img src={imgmeet} className={styles.img_meet}></img>
              </div>
            </div>
            <div className={styles.main6}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
