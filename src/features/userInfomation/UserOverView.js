import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  callApiGetListData,
  callApiGetListIsWork,
} from "../../redux/userOverViewSlice";
import styles from "./styles/UserOverView.module.scss";
import taiKhoanAPI from "../../apis/taiKhoanAPI";
// import BaiTapLuyenTapAPI from "../../apis/baiTapLuyenTapAPI";
// import userOverViewSlice from "../../redux/userOverViewSlice";
import ChartUserOver from "./ChartUserOver";

function UserOverView(props) {
  const uId = JSON.parse(localStorage.getItem("uId"));
  const image = window.atob(JSON.parse(localStorage.getItem("linkAvatar")));

  const [tabType, setTabStyle] = useState("questions");

  //   const [listPractice, setListPractice] = useState([]);
  const dispatch = useDispatch();

  // const getData = useSelector((state) => state.userOverView.listData);
  const [info, setInfo] = useState({});
  const getDataDaLam = useSelector((state) => state.userOverView.listDataDaLam);
  const [count, setCount] = useState({
    c: "0",
    java: 0,
    csharp: 0,
    javascript: 0,
    cplus: "0",
    python: 0,
  });

  const tabs = [
    {
      name: "questions",
      content: "Câu hỏi",
      icon: faList,
    },
    {
      name: "tournaments",
      content: "Giải đấu",
      icon: faTrophy,
    },
  ];

  const tournaments = [
    {
      name: "Lập trình 1",
      time: "1 tháng trước",
    },
    {
      name: "Lập trình 2",
      time: "1 tháng trước",
    },
  ];

  function FormatDate(date) {
    let dateToFormat = new Date(date);

    return `${dateToFormat.getDate()} tháng ${dateToFormat.getMonth()} năm ${dateToFormat.getFullYear()}`;
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await taiKhoanAPI.getOne(uId);
      setInfo(res.data);
    };
    fetchData();

    dispatch(callApiGetListData());
    dispatch(callApiGetListIsWork(uId));

    if (getDataDaLam.length > 0) {
      let countC = 0;
      let countCplus = 0;
      let countJava = 0;
      let countCsharp = 0;
      let countPy = 0;
      let countJavascipt = 0;
      const arr = getDataDaLam;
      arr.map((i) => {
        if (i.ngonNgu === "c") {
          countC = countC + 1;
        }
        if (i.ngonNgu === "cpp") {
          countCplus = countCplus + 1;
        }
        if (i.ngonNgu === "py") {
          countPy = countPy + 1;
        }
        if (i.ngonNgu === "cs") {
          countCsharp = countCsharp + 1;
        }
        if (i.ngonNgu === "java") {
          countJava = countJava + 1;
        }
        if (i.ngonNgu === "js") {
          countJavascipt = countJavascipt + 1;
        }
        return {
          countC,
          countCplus,
          countCsharp,
          countJava,
          countPy,
          countJavascipt,
        };
      });

      setCount({
        c: countC,
        cplus: countCplus,
        csharp: countCsharp,
        java: countJava,
        javascript: countJavascipt,
        python: countPy,
      });
    }
  }, [uId, dispatch]);

  return (
    <div>
      <div
        className={styles.container}
        // 'sm:flex-col sm:gap-2 tablet:gap-4 tablet:flex-col w-full flex laptop:flex-row'
      >
        <div className={styles.left_col}>
          <div className={styles.user_info}>
            <div>
              <img
                src={image}
                // 'https://assets.leetcode.com/users/user8961DO/avatar_1625471241.png'
                alt="avatar"
              />
              <p>{info !== {} ? info.tenHienThi : "Tên tài khoản"}</p>
            </div>

            <a href="/infomation">
              <span>Chỉnh sửa thông tin</span>
            </a>
          </div>

          <div className={styles.line}></div>

          <div className={styles.programming}>
            <p>Ngôn ngữ</p>

            <div>
              {count.java > 0 && (
                <div>
                  <div className={styles.name_programming}>
                    <span>Java</span>
                  </div>

                  <div>
                    <span>{count.java}</span> Câu hỏi
                  </div>
                </div>
              )}

              {count.javascript > 0 && (
                <div>
                  <div className={styles.name_programming}>
                    <span>Javascript</span>
                  </div>

                  <div>
                    <span>{count.javascript}</span> Câu hỏi
                  </div>
                </div>
              )}

              {count.csharp > 0 && (
                <div>
                  <div className={styles.name_programming}>
                    <span>C#</span>
                  </div>

                  <div>
                    <span>{count.csharp}</span> Câu hỏi
                  </div>
                </div>
              )}

              {count.c > 0 && (
                <div>
                  <div className={styles.name_programming}>
                    <span>C</span>
                  </div>

                  <div>
                    <span>{count.c}</span> Câu hỏi
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          className={styles.right_col}
          // 'flex sm:gap-4 tablet:gap-4 flex-col w-full'
        >
          <div
            className={styles.right_col_head}
            // 'sm:flex-col sm:gap-3 sm:h-fit sm:ml-0 tablet:ml-0 tablet:h-fit  w-auto h-[300px] ml-4 flex flex-row gap-1'
          >
            <div className={styles.statistics}>
              <h3>Câu hỏi</h3>

              <ChartUserOver />
            </div>

            <div className={styles.tournaments}>
              <h3>Giải đấu</h3>
              <div>
                <div>
                  <span>10</span>
                </div>
                {/* <img src={TrophyImage} alt="giải đấu" /> */}
              </div>
            </div>
          </div>

          <div
            className={styles.right_content}
            // 'sm:ml-0 tablet:ml-0 h-full w-auto bg-white ml-4 rounded-lg shadow-inner p-5'
          >
            <div
              className={styles.content_tab}
              // 'flex flex-row gap-2'
            >
              {tabs.map((tab) => (
                <div
                  key={tab.name}
                  onClick={() => setTabStyle(tab.name)}
                  className={
                    tabType === tab.name
                      ? styles.tab_active
                      : // 'flex items-center gap-2 p-3 bg-slate-200 hover:cursor-pointer box-border rounded-[5px]'
                        "flex items-center gap-2 p-3 hover:bg-slate-200 hover:cursor-pointer box-border rounded-[5px]"
                  }
                >
                  <FontAwesomeIcon icon={tab.icon} size="xl" />
                  <div className="text-xl">
                    <span>{tab.content}</span>
                  </div>
                </div>
              ))}
            </div>

            <div
              className={styles.content_history}
              // 'w-auto h-[90%] mt-3 flex flex-col gap-2'
            >
              {tabType === "questions" && (
                <>
                  {getDataDaLam.length > 0 ? (
                    getDataDaLam.map((item, index) => (
                      <div
                        key={index}
                        className={
                          index % 2 === 0 ? styles.content_history_gray : ""
                        }
                      >
                        <p>{item.tenBai}</p>
                        <p>{FormatDate(item.ngayLam)}</p>
                      </div>
                    ))
                  ) : (
                    <div className={styles.content_history_mess}>
                      <span>Bạn chưa làm bài tập nào</span>
                    </div>
                  )}
                </>
              )}

              {tabType === "tournaments" && (
                <>
                  {tournaments.length > 0 ? (
                    tournaments.map((item, index) => (
                      <div
                        key={index}
                        className={
                          index % 2 === 0 ? styles.content_history_gray : ""
                        }
                      >
                        <p>{item.name}</p>
                        <p>{item.time}</p>
                      </div>
                    ))
                  ) : (
                    <div className={styles.content_history_mess}>
                      <span>Bạn chưa tham gia giải đấu nào</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(UserOverView);
