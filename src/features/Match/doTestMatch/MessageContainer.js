import { style } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import taiKhoanAPI from "../../../apis/taiKhoanAPI";
import styles from "./MessageContainer.module.css";
import { faTrophy, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import matchSlice from "../../../redux/matchSlice";
import { useDispatch, useSelector } from "react-redux";

const MessageContainer = ({ users, messages }) => {
  const messageRef = useRef();
  const uId = JSON.parse(localStorage.getItem("uId"));
  const dispatch = useDispatch();
  const refb = React.useRef();
  let UserRedux = useSelector((state) => state.match.member);

  useEffect(() => {
    if (messageRef && messageRef.current) {
      const { scrollHeight, clientHeight } = messageRef.current;
      messageRef.current.scrollTo({
        left: 0,
        top: scrollHeight - clientHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const Diem = (u) => {
    var sum = 0;
    for (let index = 0; index < messages.length; index++) {
      if (messages[index].uId === u) {
        sum += Number(messages[index].message);
      }
    }
    return sum;
  };

  useEffect(() => {

    users.map(i => {

        const data = async () => {
            const res = await taiKhoanAPI.getNameTK(i);
            let obj  = {
                name: res.data.tenHienThi,
                uId: res.data.uidTaiKhoan,
              };

            if(UserRedux.length !== 0){

                UserRedux.map(d => {
                    if(d.uId !== obj.uId){
                        return dispatch(matchSlice.actions.setMemeber(obj));
                    }
                })
            }else{
                dispatch(matchSlice.actions.setMemeber(obj));
            }
        }
        data()
    })

  },[users])

  const handleDisplayName = (u) =>{
    let nameU = "";
    UserRedux.map(i => {
        if(i.uId === u){
            return nameU = i.name;
        }
        return null;
    })
    return nameU;
  }

  return (
    <div ref={messageRef} className="message-container">
      {users.map((u) => (
        <div key={u} className={styles.container}>
          <div  className={styles.user}>&ensp;<FontAwesomeIcon icon={faUserAlt}/>&nbsp;{handleDisplayName(u)}&ensp;</div>
          <p className={styles.diem}>&ensp;<FontAwesomeIcon icon={faTrophy} />&nbsp;{Diem(u)}&ensp;</p>
        </div>
      ))}
    </div>
  );
};

export default MessageContainer;
