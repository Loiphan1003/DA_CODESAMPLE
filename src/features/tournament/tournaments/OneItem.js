import React from 'react';
import useCountDownDate from '../../../hooks/useCountDownDate';
import styles from './styles/OneItem.module.css'

function OneItem({setdata}) {

    let time = useCountDownDate(setdata.thoiGianBatDau)

    return (
        <div className={styles.container} >
            <img src='https://leetcode.com/_next/static/images/biweekly-default-f5a8fc3be85b6c9175207fd8fd855d47.png' alt='avatar'/>
            <p>{setdata.tenGiaiDau}</p>
            <div>
                <div>{time}</div>
                {/* <div>Thời gian</div> */}
            </div>
        </div>
    );
}

export default OneItem;