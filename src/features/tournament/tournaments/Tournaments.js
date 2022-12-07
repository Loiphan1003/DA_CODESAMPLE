import React, { useEffect, useState } from 'react';
import styles from './styles/Tournament.module.css';
import { responseAPI, responseAPITrounamentSoonStart } from '../../../redux/giaiDauSlice';
import GiaiDauAPI from '../../../apis/giaiDauAPI';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import Tournamnet from '../../../images/tournament.png'
import OneItem from './OneItem';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import giaiDauSilce from '../../../redux/giaiDauSlice';
import { useNavigate } from 'react-router-dom';

const responsive = {
    desktop: {
        breakpoint: {
            max: 3000,
            min: 1024
        },
        items: 2,
        partialVisibilityGutter: 40
    },
    mobile: {
        breakpoint: {
            max: 464,
            min: 0
        },
        items: 1,
        partialVisibilityGutter: 30
    },
    tablet: {
        breakpoint: {
            max: 1024,
            min: 464
        },
        items: 2,
        partialVisibilityGutter: 30
    }
};


function Tournaments(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const listTournament = useSelector((state) => state.giaiDau.listTournament);
    const listTournamentStartSoon = useSelector((state) => state.giaiDau.listTournamentStartSoon);
    const paginations = useSelector((state) => state.giaiDau.totalPages);

    useEffect(() => {

        if (localStorage.getItem("uId") !== null) {
            dispatch(responseAPI(1, 5));
            dispatch(responseAPITrounamentSoonStart());
        }
    }, [dispatch]);


    const handleChangePagination = async (e) => {
        const pageNumber = e.target.innerText;
        const pageSize = 5;
        const res = await GiaiDauAPI.getAll(pageNumber, pageSize);
        dispatch(giaiDauSilce.actions.setListTournament(res.data.data))
    }

    const formatTime = (time) => {
        let date = new Date(time);
        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} : ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    }

    const handleTypeTournament = (time) => {
        let date = new Date(time);
        let getDay = new Date();
        if (date > getDay) {
            return "Mở";
        } else {
            return "Đóng";
        }
    }

    console.log("giai dau",listTournament);

    return (
        <div className={styles.container} >
            <img src={Tournamnet} alt="banner" />

            <div className={styles.block} >
                <h1 style={{fontWeight: "bold"}}>Giải đấu sắp bắt đầu</h1>
                {listTournamentStartSoon != null && <Carousel
                    additionalTransfrom={0}
                    arrows
                    autoPlay
                    autoPlaySpeed={7000}
                    centerMode={false}
                    className={styles.form}
                    containerClass="container-with-dots"
                    dotListClass=""
                    draggable
                    focusOnSelect={false}
                    infinite
                    itemClass=""
                    keyBoardControl
                    minimumTouchDrag={80}
                    pauseOnHover
                    renderArrowsWhenDisabled={false}
                    renderButtonGroupOutside={false}
                    renderDotsOutside={false}
                    responsive={responsive}
                    rewind={false}
                    rewindWithAnimation={false}
                    rtl={false}
                    shouldResetAutoplay
                    showDots={false}
                    sliderClass=""
                    slidesToSlide={1}
                    swipeable
                >

                    {listTournamentStartSoon.map(item => (
                        <OneItem key={item.idgiaiDau} setdata={item} />
                    ))}

                </Carousel>}

                <div className={styles.list} >
                    <div>
                        <p>
                            <span style={{fontSize:"30px", fontWeight: "bold"}} className={styles.tieuDe}>Các giải đấu khác</span>
                            <span className={styles.tieuDe} style={{float:"right", marginTop: "10px", fontWeight: "350"}}>Trạng thái</span>
                        </p>
                    </div>

                    <div className={styles.listTournaments} >

                        {listTournament.map(item => (
                            <div className={styles.customGD} key={item.idgiaiDau} onClick={() => navigate(`/waitpage/tournament/${item.idgiaiDau}`)}>
                                <div className={styles.ItemLeft} >
                                    <img className={styles.thamGia} src='https://leetcode.com/_next/static/images/biweekly-default-f5a8fc3be85b6c9175207fd8fd855d47.png' alt='avatar' />
                                    <div>
                                        <p style={{fontSize: "20px", fontWeight: "600"}}>{item.tenGiaiDau}</p>
                                        <p style={{fontWeight: "350"}}>
                                            Thời gian kết thúc: <span>{formatTime(item.thoiGianKetThuc)}</span>
                                        </p>
                                        {/* <FontAwesomeIcon icon={faUserGroup} /> */}
                                    </div>
                                </div>
                                <div className={styles.ItemType} >
                                    <p style={{color: handleTypeTournament(item.thoiGianKetThuc) === "Mở" ? "green" : "red"}}>{handleTypeTournament(item.thoiGianKetThuc)}</p>
                                </div>
                            </div>
                        ))}

                    </div>

                    <Stack spacing={2} alignItems='center'>
                        <Pagination count={paginations}
                            onClick={(e) => handleChangePagination(e)}
                            color="primary" />
                    </Stack>
                </div>
            </div>
        </div>
    );
}

export default Tournaments;