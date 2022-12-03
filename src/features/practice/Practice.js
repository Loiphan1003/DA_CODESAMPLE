import React, { useState, useEffect, useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import btLuyenTapSlice, { responseAPI } from "../../redux/btLuyenTapSlice.js";
import styles from "./Practice.module.css";
import NavBarLevel from "./NavBarLevel";
import DoMode from "./DoMode.js";
import ListPractice from "./ListPractice";
import BaiTapLuyenTapAPI from "../../apis/baiTapLuyenTapAPI.js";

function Practice(props) {
  const [level, setLevel] = useState(0);
  const [doMode, setDoMode] = useState(
    useSelector((state) => state.btLuyenTap.mode)
  );
  const paginations = useSelector((state) => state.btLuyenTap.totalPages);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("uId") !== null) {
      dispatch(responseAPI(1, 8));
    }
  }, [dispatch]);

  const handClickPractice = useCallback(
    (id) => {
      navigate(`/practice/code/${id}`);
    },
    [navigate]
  );

  const handleLevelSearch = (e) => {
    setLevel(e);
    dispatch(btLuyenTapSlice.actions.levelFilterChange(e));
  };

  const handleChangeMode = (e) => {
    setDoMode(e);
    dispatch(btLuyenTapSlice.actions.modeChange(e));
  };

  const handleSearchText = (e) => {
    dispatch(btLuyenTapSlice.actions.searchTextChange(e.target.value));
  };

  const handleChangePagination = async (e) => {
    const pageNumber = e.target.innerText;
    const pageSize = 2;
    const res = await BaiTapLuyenTapAPI.getAll(pageNumber, pageSize);
    dispatch(btLuyenTapSlice.actions.setListQuestion(res.data.data));
  };

  return (
    <>
      <div className={styles.practice}>
        <div className={styles.conten_control}>
          <div className={styles.conten_control_search}>
            <input
              onChange={(e) => handleSearchText(e)}
              type="text"
              className={styles.control_search}
              placeholder="Tìm kiếm bài tập"
            />
            <FontAwesomeIcon
              className={styles.iconPracticeHeader}
              icon={faMagnifyingGlass}
            />
          </div>

          <NavBarLevel onChangeSearch={handleLevelSearch} setValue={level} />
          <DoMode onChangeMode={handleChangeMode} setValue={doMode} />
        </div>

        <ListPractice
          onClickPractice={handClickPractice}
          //  setValue={listQuestion}
        />

        <Stack spacing={2} alignItems="center">
          <Pagination
            count={paginations}
            onClick={(e) => handleChangePagination(e)}
            color="primary"
          />
          {/* <Pagination count={10} color="secondary" /> */}
          {/* <Pagination count={10} disabled /> */}
        </Stack>
      </div>
    </>
  );
}

export default memo(Practice);
