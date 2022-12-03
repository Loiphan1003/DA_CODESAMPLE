import React, { useState } from "react";
import styles from "./JoinClass.module.css";
// import { useNavigate } from 'react-router-dom';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PhongHocAPI from "../../../apis/phongHocApi";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function JoinClass(props) {
  const [input, setInput] = useState("");
  const [showError, setShowError] = useState("");
  // const navigate = useNavigate();

  const handleJoinClass = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (input === "") {
          setShowError("Vui lòng nhập mã phòng học!");
          return;
        }
        const joinPhongHoc = async () => {
          try {
            const response = await PhongHocAPI.joinPhongHoc(user.uid, input);
            if (response.data) alert("Tham gia phòng thành công");
            else setShowError("Mã phòng học không chính xác!");
          } catch (error) {
            console.log("Fetch data error: ", error);
          }
        };
        joinPhongHoc();
      } else console.log("Chưa đăng nhập");
    });
  };

  return (
    <>
      <div className={styles.backdrop} onClick={() => props.close(false)}></div>
      <div className={styles.joinclass}>
        <h1>Tham gia lớp học</h1>
        <TextField
          autoComplete="off"
          className={styles.input}
          label="Nhập mã phòng học"
          variant="filled"
          onChange={(e) => setInput(e.target.value)}
        />
        {showError !== "" && (
          <p
            style={{
              color: "red",
              marginTop: "10px",
            }}
          >
            {showError}
          </p>
        )}
        <Button
          variant="contained"
          sx={{
            marginTop: "20px",
            width: "100%",
            backgroundColor: "#24859A",
            ":hover": {
              backgroundColor: "#309fb7",
            },
          }}
          onClick={handleJoinClass}
        >
          Tham gia
        </Button>
      </div>
    </>
  );
}

export default JoinClass;
