import React, { useEffect, useState } from "react";
import styles from "./creatematch.module.css";
import Button from '@mui/material/Button';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import Backdrop from "../../components/Backdrop";
import InputMatch from "./inputmatch";
import GiaiDauAPI from "../../apis/giaiDauAPI";
import { useNavigate } from "react-router-dom";
import DeCauHoiGiaiDauAPI from "../../apis/deCauHoiGiaiDauAPI";
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import { useSelector, useDispatch } from "react-redux";
import matchSlice, {callApiGetListMatch, formatDateTime} from "../../redux/matchSlice";
import { matchRemainingSelector } from "../../redux/selectors";
import { imgRanMatch1, imgRanMatch2, imgRanMatch3, imgRanMatch4, imgRanMatch5, imgRanMatch6 } from "../../components/content/export";

function CreateMatch() {
    const dispatch = useDispatch();
    const paginations = useSelector((state) => state.match.totalPages);
    const navigate = useNavigate();
    const [openCreateMatch, setOpenCreateMatch] = useState(false);
    const uId = JSON.parse(localStorage.getItem('uId'));
    const [restart, setRestart] = useState(false);
    const listMatchs = useSelector(matchRemainingSelector);
    const imgRandom = [
        imgRanMatch1,
        imgRanMatch2,
        imgRanMatch3,
        imgRanMatch4,
        imgRanMatch5,
        imgRanMatch6
    ]


    useEffect(() => {
        if (!!uId) {
            try {
                dispatch(callApiGetListMatch())
            } catch (error) {
                console.log("Fetch data error: ", error);
            }
        }
    }, [dispatch, uId])

    const CloseInputMatch = () => {
        setOpenCreateMatch(false);
        setRestart(!restart);
    }

    const handleDetaiMatch = (tenGiaiDau, idgiaiDau) => {
        const data = async () => {
            try {
                const response = await DeCauHoiGiaiDauAPI.getIdDeCauHoiGiaiDauByID(idgiaiDau);
                navigate(`/match/detailMatch/${tenGiaiDau}/${idgiaiDau}/${response.data}`);
            } catch (error) {
                console.log("Error...", error);
            }
        }
        data();
    }

    const handleChangePagination = async (e) => {
        const pageNumber = e.target.innerText;
        const pageSize = 8;
        const res = await GiaiDauAPI.getAllGiaiDauByIdGiangVien(uId, pageNumber, pageSize );
        res.data.data.map(item => {
            item.thoiGianBatDau = formatDateTime(item.thoiGianBatDau);
            item.thoiGianKetThuc = formatDateTime(item.thoiGianKetThuc);
            return item;
        })
        dispatch(matchSlice.actions.setListMatch(res.data.data))
    }

    const handleRandomImageMatch = () => {
        var numRandom = Math.floor(Math.random() * imgRandom.length);
        return imgRandom[numRandom];
    }

    return (
        <div className={styles.body_main}>
            <div className={styles.body_match}>
                <div>
                    <h2>Danh sách cuộc thi đã tạo</h2>
                    <Button
                        sx={{ marginBottom: "20px", marginRight: "20px", float: "right" }}
                        variant="contained"
                        endIcon={<AddCircleOutlinedIcon />}
                        onClick={() => setOpenCreateMatch(true)}
                    >Tạo giải đấu</Button>
                </div>
                {openCreateMatch && <Backdrop onClick={() => CloseInputMatch()}/>}
                {openCreateMatch && <InputMatch></InputMatch>}
                <div className={styles.listMatch}>
                    {listMatchs.map((item, index) => {
                        return (
                            <div className={styles.itemMatch} key={index}  onClick={() => handleDetaiMatch(item.tenGiaiDau, item.idgiaiDau)}>
                                <div className={styles.imgMatch}>
                                    <img className={styles.imgRandom} src={handleRandomImageMatch()} alt = "This is image of match"></img>
                                </div>
                                <div className={styles.infoMatch}>
                                    <h3>{item.tenGiaiDau}</h3>
                                    <span>Bắt đầu: {item.thoiGianBatDau}</span>
                                    <br></br>
                                    <span>Kết thúc: {item.thoiGianKetThuc}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <Stack spacing={2} alignItems='center'>
            <Pagination count={paginations}
                onClick={(e) => handleChangePagination(e)}
                color="primary" />
            </Stack>
        </div>
    );
}

export default CreateMatch;
