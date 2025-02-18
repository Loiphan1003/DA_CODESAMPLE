import React from "react";
import useLookBodyScroll from "../useLockBodyScroll";
import { auth, googleProvider, githubProvider } from "../../firebase/config";
import { signInWithPopup } from "firebase/auth";
import styles from "./Login.module.css";
import TaiKhoanAPI from "../../apis/taiKhoanAPI";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login({ isGiangVien, login }) {
  useLookBodyScroll();
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();
  const handleGoogleLogin = async (value) => {
    const data = await signInWithPopup(auth, googleProvider);
    localStorage.setItem(
      "linkAvatar",
      JSON.stringify(window.btoa(data.user.photoURL))
    );
    setLoading(true);
    const response = await TaiKhoanAPI.getOne(data.user.uid);

    if (response.data === "") {
      setLoading(false);
      navigate("/infomation");
    } else {
      navigate("/");
      setLoading(false);
      localStorage.setItem(
        "linkAvatar",
        JSON.stringify(response.data.linkAvatar)
      );
    }

    let getdate = new Date();
    let date = new Date(getdate.toISOString());
    date.setDate(date.getDate() + 1);

    localStorage.setItem("isTeacher", JSON.stringify(isGiangVien));
    localStorage.setItem("uId", JSON.stringify(data.user.uid));
    document.cookie = `uId=${JSON.stringify(
      data.user.uid
    )}; expires=${date.toUTCString()}`;
    login(false);
  };

  const handleGitHubLogin = async (value) => {
    try {
      const data = await signInWithPopup(auth, githubProvider);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    if (userName === "" || password === "") {
      alert("Vui lòng nhập đầy đủ thông tin!");
      //   return;
      setLoading(false);
    } else {
      await signInWithEmailAndPassword(auth, userName, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          //   setLoading(false);
          //   console.log(user.uid);
          const fetchData = async () => {
            const response = await TaiKhoanAPI.getOne(user.uid);

            if (response.data === "") {
              setLoading(false);
              navigate("/infomation");
            } else {
              navigate("/");
              setLoading(false);
              localStorage.setItem(
                "linkAvatar",
                JSON.stringify(response.data.linkAvatar)
              );
            }

            let getdate = new Date();
            let date = new Date(getdate.toISOString());
            date.setDate(date.getDate() + 1);

            localStorage.setItem("isTeacher", JSON.stringify(isGiangVien));
            localStorage.setItem("uId", JSON.stringify(user.uid));
            alert("Đăng nhập thành công");
            login(false)
          };
          fetchData();
          // ...
        })
        .catch((error) => {
          //   const errorCode = error.code;
          //   const errorMessage = error.message;
          setLoading(false);
          alert("Đăng nhập thành công");
        });
    }
  };

  return (
    <>
      {/* <Button onClick={handleToggle}>Show backdrop</Button> */}
      <Backdrop
        style={{ color: "#fff", zIndex: 20 }}
        open={loading}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" disableShrink />
      </Backdrop>

      <div className={styles.Login}>
        <div className={styles.modal}>
          <h1>Đăng nhập</h1>
          <input
            className={styles.input}
            placeholder="Tài khoản"
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Mật khẩu"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className={styles.btnLogin} onClick={() => handleLogin()}>
            Đăng nhập
          </button>
          <span>Hoặc đăng nhập bằng</span>
          <div className={styles.socialNetwork}>
            <button
              className={styles.btn_socialNetwork}
              id="Google"
              name="Google"
              value="Google"
              onClick={handleGoogleLogin}
            >
              <img
                src="data:image/png;base64,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"
                alt="LoginWithGoogle"
              />
            </button>
            <button className={styles.btn_socialNetwork} value="Facebook">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAFEklEQVRoge2ZW2gcVRjH/2c22SQ1aZLNRXNraFATvKFs0QdfTPTFiKCIQUwFwZQYkqIY8cELrKLFF2+0G4yVgpBgm4q0oO2DJvpgVUICKohtUFuSzcZoLrK7uezOzPn7kLRddmZ2ZjJJfGg+WHZ2zjnf/P7nfOc7c84CO7Zj17aJTfEyRF/TSvxuAM0SCIJsAlFFsJAECCQoGQVwgeQ4wZFL04FRhIT0+mhPAm77dLlO12Q3yf0kawCAJEgAWPte+xAmZRFKDug5Ijx9oCyyrQJuHIpX+JN4k8DTJPwWgNng0+4jBfKY7lNfi3ZWz225gFsHEk9KicMQDGQHdASfXmeeFD3RnorjWyIg2M/c1cJEn5SiwwjiGf5qHaB/JrfyIDqFumkCgv3ctXLd0mckHtxS+Kvtz/jy5ePRzuplOzbFAXzuNsMDQKu2itMI/er3LGC1MNG3zfBrZVI8UF5S+oEdX9YQumUw0U6JAS/wCoiWej/urc5FfbGCkjwFKZ1QdSKWIn6MpvDxTyuW7SX5xEJvzQnXApo+iZUJRTkPsHyj8HdW+vBecyH2FvssO+lcJIXHPl+08E0AWEhRNMZfNE+xliGkKOKQF/i7Kn0Yenh3Vvh0yxJ2gRzK1y05zW7eMbBcu75IbQjeJ4jD9xfB73OWpR3MmY7St6N7HAtQKXvoYYVtbchDbZFtfkgTkBUeJP1S0bvM2uYY7oSokIl2L9mmuS7XFHQypqN3OI5f/lavkKuSdvBrzyCfwhBfRZvQswpo2hu/h0TtRuFJ4PYKY78AwAvDcXw3lbRtb7FC1+y+GAnGgNF0n2bj3OwFniTKC4xu/1qSOLdReF7+LVsy/ZoJ2Od1kSryGyfvZEwHPcADACWCtgIkebMXeJJQTJJPPCm9wRMgZGOmX0OwkqjyAr9+aTBJR9kmax1SVGX6NQmh9W3ghuEtFMArPACwKNOj2Qi4cvzD/oAh5s1C6L76PEw8e73h/snfVvDS14tO4E1H15jviATJgBN4ACjOE6aTNtNyFaAk3zjg0bjmGJ5kPLO92SSecQpPsy5xaRPzmlN4CGDGVgCICa8T1o39vqA6ggcACVywFUBwzFW28ACvSeDPRc0R/Pr1WKYP4yQGR4zA1pP6ua9iyLncDetlRx8qMWw0fp5V8f5o/EodAFjViKQmncKDCkZsBVyaDozuqVqYAllnB08CZ/9YNZR9xBKIDAWzSzpOnV92M2EzO29SlQ3jmbzGORASEpKDTuCtyqzMAzwADJodRZq+tOs5Ikwi5eWVejPhCSZTqhY282sqYPpAWQTksc2CB4x1HMOTkMRRvNU47VgAANDvf4XknFv47CHkHp7EvC50d3tiAIh0FC+Q4qBbeLvFzSU8CHYh1Gh56Jt14xrtqThOoP9/hA/rb9x0MptP2533TGVlN8FTTuEtRbiEB/ClrkSet+OzPzpoE7ovT7aDPOPi4Wb8zuHJLzRlVxtCzZp3AQCindXLswU3PELBD+3h3Wei9PYEw5ov8ihC9ifTgNnrtJV1CnUO6Aq8M/2tAhyRRPlGFrIs8P8Q7LaL+Uxzfvq0bgu9NSeSSTaR7AOQdLMWWC1SEjiiKckmt/CAmxFIs/jLtfMAusvenTqkaegB2E6iziX8FIABVdXDVouUE9ucv1lDVHYXRPaRsoUSwe+fqWoN5Iv80gKfIgTw74qUwxeXFztOz31DcowCI6psGN+Mv1l3bMeudfsPP8EkRZOLDr8AAAAASUVORK5CYII="
                alt="LoginWithFacebook"
              />
            </button>
            <button
              className={styles.btn_socialNetwork}
              value="GitHub"
              onClick={handleGitHubLogin}
            >
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAADTklEQVRoge2ZS0hUURjHf2NmE9nCNHsohoFR4SKKoSBatKtNTwgNV1FQYaugF0RBrSp7QFCTItHDoLK2Qas2LQqCII2ohB6KZBaWPUSdaXHuhZkz555zz9x7J6L5w7fw3HP///93nPPNd85AEUX834hFxBsH5gPlzt+jQD8wFpFeYFQBu4AuoA+YBNJSTAJvnTk7gcq/4lRCAriDWFnZsCnGnHdXFNw1UAfcszBrirtAbaHMtwDfQzTvxjegOUrjJcD5CIzLcYYIiksJcLUA5t3oDDuJcwU078bpsMy3aER6CWc/9AMfFONNQc3XaQzed+aUAhuBp5amx4FLQIPDUwtMSHNGCFiddKXysDS3FDgLpIDnQBI4DrQC+4FTQDcwBAwDaxR67xQ6t/M1n9CYTwP7PN6rMPDGNHNeKHRSwHIvshKN0AGDkTke418N76U1c+YqxmLAQQNnDqowtwfdtqQGVGu0fgOzVC95/Qc2AWUGwfq8bHpjoebZNESh8I1bmCvIyrxs6tGp0bxhQ9SnIUoDHaFZzsZsRE+k0nzjlyRObj2WY1mYriV0eGhOON6MqPcgcGModMvZaNZoL5AnqzZxuWIsEwMBDZrwUfNspjygSmDcIDDDyo49dAuY402VgOkjUgNMt3FkiQbNs2E/BDFEprp9sCGYRy0eemhOoO8csvDag8SNJ0RzJbMa0fuoNF/aEF3xIMmMk2G5dlAFvNLoJW3ItmmIMqMNc8vhB41Aj0GrxYawEvjlM4keYDviPGCLWsRx9adB4wfmNj0H7T4TcOMLcBPYA6wFpio4a4CtwDHgMeobPFW025oHWELuhtoLrEd9cnJjEtjtwVkNPPJp2o0UAVqXLolsFFiFaDdUh/A0cMLAWQG8t0igM1/zICrDoET4DFFCGxFtReazAfw1XE0+zX92PATCFgWxeyAvcxJZijgO+q1IZcAng/kUYr+EgqMS+fUQOB+gT+BICBpZaCN7dXYE5NNVuYsBuZWIIcpfZunrBa4hviWTiIswv0ii/tgcCs+yGusQm0u1cjY/VsgJDCL2W0EwD7hMbteaTwIpRKlUXptEjUWIa/cRx0zC4t0LiEVYHIEva8SBzYhvb7+YEpGXIooo4l/CH+SPSIFr9wg2AAAAAElFTkSuQmCC"
                alt="LoginWithGithub"
              />
            </button>
          </div>
          {/* <span>
            Chưa có tài khoản? <span className={styles.dangKy}>Đăng ký</span>
          </span> */}
        </div>
      </div>
    </>
  );
}

export default Login;
