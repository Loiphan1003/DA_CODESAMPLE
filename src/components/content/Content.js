import React, { useState, useEffect, useRef } from "react";
import AceEditor from "react-ace";
import RunCodeAPI from "../../apis/runCodeAPI";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/theme-one_dark";
import "react-ace-builds/webpack-resolver-min";
// import { useNavigate } from "react-router-dom";
import SelectedLogin from "../Login/SelectedLogin";

import Header from "../header/Header";
import styles from "./Content.module.css";
import Backdrop from "../Backdrop";
import Login from "../Login/Login";
import SignUp from "./SignUp";
import {
  image_1,
  image_2,
  image_3,
  image_4,
  image_5,
  image_6,
  image_7,
  image_8,
  image_9,
  image_10,
  imghead,
} from "./export";

function Content(props) {
  //   const navigate = useNavigate();
  const [studentSignUp, setStudentSignUp] = useState(false);
  const [login, setLogin] = useState(false);
  const [selectLogin, setSelectLogin] = useState(false);
  const [language, setLanguage] = useState("c");
  const [resultCode, setResultCode] = useState();
  const [isGiangVien, setIsGiangVien] = useState(false);
  let uId = JSON.parse(localStorage.getItem("uId"));

  useEffect(() => {
    // function getCookie(cname) {
    //   let name = cname + "=";
    //   let decodedCookie = decodeURIComponent(document.cookie);
    //   let ca = decodedCookie.split(";");
    //   for (let i = 0; i < ca.length; i++) {
    //     let c = ca[i];
    //     while (c.charAt(0) === " ") {
    //       c = c.substring(1);
    //     }
    //     if (c.indexOf(name) === 0) {
    //       return c.substring(name.length, c.length);
    //     }
    //   }
    //   return "";
    // }
    // console.log(getCookie("uId"));
  }, []);

  const editor = useRef();

  const defaultValueEditor = {
    c: "#include <stdio.h> \n\n\n int main() {\n    // Complete the code.\n    return 0;\n}\n",
    cpp: "#include <iostream>\nusing namespace std;\n\nint main() {\n    // Complete the code.\n    return 0;\n}\n",
    java: "import java.io.*;\n\nclass Main {\n\n    public static void main(String[] args) {\n        // Your code goes here\n   }\n}\n",
    py: "# Enter your code here. Read input from STDIN. Print output to STDOUT",
    cs: 'using System;\nnamespace HelloWorld\n{\n\tclass Program\n\t{\n\t\tstatic void Main(string[] args)\n\t\t{\n\t\t\tConsole.WriteLine("Hello World!");\n\t\t}\n\t}\n}',
  };
  const modeEditor = {
    c: "c_cpp",
    cpp: "c_cpp",
    java: "java",
    py: "python",
    cs: "csharp",
  };

  function handleClickRunCode() {
    setResultCode("Đang chạy....");
    const data = async () => {
      try {
        const response = await RunCodeAPI.postRunCode({
          code: editor.current.editor.getValue(),
          input: "",
          language: language,
        });
        setResultCode(response.data.output);
      } catch (error) {
        console.log("Fetch data error: ", error);
      }
    };
    data();
  }

  function handleChangeValueDropDownLanguage(e) {
    setLanguage(e.target.value);
    editor.current.editor.setValue(defaultValueEditor[e.target.value]);
  }
  return (
    <React.Fragment>
      <div className={styles.Content}>
        <div className={styles.first_content}>
          <Header />

          <div>
            <div className={styles.left_content}>
              <h1>CodeSample</h1>

              <p>
                <span>Khơi dậy đam mê lập trình</span>
                <br />
                <span>Dễ dàng để bắt đầu với CodeSample</span>
              </p>

              {uId === null && (
                <div className={styles.content_GV}>
                  <button
                    className={styles.button_login_content}
                    onClick={() => {
                      setSelectLogin(true);
                    }}
                  >
                    Đăng nhập
                  </button>
                  <div className={styles.group2}>
                    <span>Chưa có tài khoản ?</span>
                    <p onClick={() => setStudentSignUp(true)}>
                      Tạo mới miễn phí
                    </p>
                  </div>
                </div>
              )}
            </div>

            <img
              className={styles.right_content}
              alt="hình ảnh"
              src={imghead}
            />
          </div>
        </div>

        <div className={styles.seccond_content}>
          <h1>Lộ trình trở thành lập trình viên</h1>
          <div className={styles.seccond_content_logoList}>
            <div className={styles.seccond_content_item}>
              <img src={image_1} alt="Học lập trình" />
              <h3>Học lập trình</h3>
              <p className={styles.seccond_content_discription}>
                Học lập trình từ cơ bản đến nâng cao thông qua lớp học
              </p>
            </div>

            <div className={styles.seccond_content_item}>
              <img src={image_2} alt="Luyện lập trình" />
              <h3>Luyện lập trình</h3>
              <p className={styles.seccond_content_discription}>
                Luyện lập trình hằng ngày với nghìn bài tập lớn nhỏ
              </p>
            </div>

            <div className={styles.seccond_content_item}>
              <img src={image_3} alt="Thi lập trình" />
              <h3>Thi lập trình</h3>
              <p className={styles.seccond_content_discription}>
                Tham gia các cuộc thi và cải thiện kỹ năng lập trình
              </p>
            </div>

            <div className={styles.seccond_content_item}>
              <img src={image_4} alt="Tìm hiểu lập trình" />
              <h3>Tìm hiểu lập trình</h3>
              <p className={styles.seccond_content_discription}>
                Tìm hiểu kiến thức lập trình thông qua chia sẻ từ các chuyên gia
              </p>
            </div>
          </div>
        </div>

        <div className={styles.three_content}>
          <h1>CodeSample ưu điểm vượt trội</h1>
          <div className={styles.three_content_main}>
            <img src={image_5} alt="giao dien lam bài" />
            <ul className={styles.three_content_list_info}>
              <li>
                <img src={image_6} alt="Hệ thống" />
                <p>Hệ thống mạnh mẽ hiện đại</p>
              </li>

              <li>
                <img src={image_7} alt="Nội dung" />
                <p>Nội dung dễ hiểu chi tiết</p>
              </li>

              <li>
                <img src={image_8} alt="Hấp dẫn" />
                <p>Hấp dẫn thu hút</p>
              </li>

              <li>
                <img src={image_9} alt="Cộng đồng" />
                <p>Cộng đồng đông đảo</p>
              </li>

              <li>
                <img src={image_10} alt="Đội ngũ" />
                <p>Đội ngũ nhiệt tình, có chuyên môn</p>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.four_content}>
          <div className={styles.code_editor}>
            <div className={styles.option_language}>
              <select
                className={styles.selectpicker}
                onChange={handleChangeValueDropDownLanguage}
                data-live-search="true"
                name="Language"
                id="mode"
                defaultValue={language}
              >
                <option value="c" id="c">
                  C
                </option>
                <option value="cpp" id="c++">
                  C++
                </option>
                <option value="py" id="python">
                  Python
                </option>
                <option value="cs" id="c#">
                  C#
                </option>
                <option value="java" id="java">
                  Java
                </option>
              </select>
            </div>

            <div className={styles.frameCode}>
              {/* <div className={styles.code} > */}
              <AceEditor
                ref={editor}
                defaultValue={defaultValueEditor[language]}
                mode={modeEditor[language]}
                theme="one_dark"
                fontSize="12pt"
                name="UNIQUE_ID_OF_DIV"
                width="50%"
                height="500px"
                showPrintMargin={false}
                // enableSnippets= {true}
                editorProps={{
                  $blockScrolling: true,
                }}
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  enableSnippets: true,
                  showLineNumbers: true,
                }}
              />
              {/* </div> */}

              <div className={styles.code_output}>
                <p>Kết quả:</p>
                {resultCode}
              </div>
            </div>

            <button
              className={styles.run_code}
              onClick={() => handleClickRunCode}
            >
              Chạy
            </button>
          </div>
          <div className={styles.four_content_discription}>
            <h2>Bắt đầu học code chỉ trong vài giây</h2>
            <p>
              Môi trường học tập thực hành của chúng tôi có nghĩa là bạn sẽ viết
              mã thực từ bài học đầu tiên của mình
            </p>
          </div>
        </div>
      </div>
      {(selectLogin || login) && (
        <Backdrop
          onClick={() => {
            setLogin(false);
            setSelectLogin(false);
          }}
        />
      )}
      {selectLogin && (
        <SelectedLogin
          isGiangVien={setIsGiangVien}
          select={setSelectLogin}
          login={setLogin}
        />
      )}
      {login && <Login isGiangVien={isGiangVien} login={setLogin} />}

      {studentSignUp && <SignUp close={setStudentSignUp} />}
    </React.Fragment>
  );
}

export default Content;
