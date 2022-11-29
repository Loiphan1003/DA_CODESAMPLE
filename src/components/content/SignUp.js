import React from "react";
import styles from "./SignUp.module.css";
import { TextField } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function SignUp({ close }) {
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");

  //   console.log(userName);

  const handleSignUp = async () => {
    if (userName === "" || password === "") {
      alert("Vui lòng nhập đầy đủ thông tin!");
      //   return;
    } else {
      await createUserWithEmailAndPassword(getAuth(), userName, password)
        .then((userCredential) => {
          // Signed in
          //   const user = userCredential.user;
          alert("Đăng ký tài khoản thành công");
          close(false);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          //   const errorMessage = error.message;
          console.log(errorCode);
          // ..
        });
    }
  };

  return (
    <div className={styles.signUp}>
      <div className={styles.signUpHeader}>
        <h1>Đăng ký</h1>
        <FontAwesomeIcon icon={faXmark} onClick={() => close(false)} />
      </div>
      <div className={styles.signUp_content}>
        <TextField
          required
          label="Email"
          type="email"
          variant="outlined"
          onChange={(e) => setUserName(e.target.value)}
        />
        <TextField
          label="Mật khẩu"
          type="password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={() => handleSignUp()}>Đăng ký</button>
    </div>
  );
}

export default SignUp;
