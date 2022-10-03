import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Course from './Course';
import image1 from '../../images/headerTheory.png';
import MonHocAPI from '../../apis/monHocAPI';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import styles from './styles/Theory.module.css';
import theorySlice, { callApiGetListTheory } from '../../redux/theorySlice';

function Theory(props) {

    const dispatch = useDispatch();
    const uId = JSON.parse(localStorage.getItem('uId'));
    const paginations = useSelector((state) => state.theory.totalPages);

    useEffect(() => {
        if (!!uId) {
            try {
                const pageNumber = 1;
                const pageSize = 8;

                dispatch(callApiGetListTheory(pageNumber, pageSize))
            } catch (error) {
                console.log("Fetch data error: ", error);
            }
        }
    }, [dispatch, uId])


    const handleSearch = (e) => {
        dispatch(theorySlice.actions.searchTextChange(e.target.value))
    }

    const handleChangePagination = async (e) => {
        const pageNumber = e.target.innerText;
        const pageSize = 1;
        const res = await MonHocAPI.getAll(pageNumber, pageSize );
        dispatch( theorySlice.actions.setListTheory(res.data.data))
    }

    return (
        <div>
            <div className={styles.theory}>
                <div className={styles.theoryHeader} src={image1}>
                    <div className={styles.theoryHeaderLeft}>
                        <h1>Tìm hiểu lý thuyết cùng CODE SAMPLE</h1>
                        <div className={styles.findTheory}>
                            <input type='text'
                                onChange={(e) => handleSearch(e)}
                                className={styles.nameTheory} placeholder='Nhập nội dung tìm kiếm' />
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </div>
                    </div>
                    <img src={image1} alt='imageHeaderTheory' />
                </div>

                <div className={styles.container}>

                    <div className={styles.kienthuccoso}>
                        <h1>Kiến thức cơ sở</h1>
                        <Course />
                    </div>

                    <Stack spacing={2} alignItems='center'>
                        <Pagination count={paginations}
                            onClick={(e) => handleChangePagination(e)}
                            color="primary" />
                        {/* <Pagination count={10} color="secondary" /> */}
                        {/* <Pagination count={10} disabled /> */}
                    </Stack>
                </div>
            </div>
        </div>
    );
}

export default Theory;