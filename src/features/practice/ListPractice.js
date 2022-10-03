import React, { memo } from 'react';
import styles from './Practice.module.css';
import clsx from 'clsx';
import { Avatar } from '@mui/material';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux';
import { practiceRemainingSelector } from '../../redux/selectors';

function ListPractice({ onClickPractice }) {

    const listQuestion = useSelector(practiceRemainingSelector);


    return (
        <div className={styles.conten_list_exercise}>
            <ul className={styles.list_exercise}>
                {
                    listQuestion.map(baitap => (
                        <li key={baitap.id}>
                            <div className={styles.item_list} onClick={() => onClickPractice(baitap.id)}>
                                <h3 className={styles.title}>{baitap.tieuDe}</h3>
                                <div className={styles.tag}>
                                    <span>{baitap.tag}</span>
                                </div>
                                <div className={styles.image_avatar} >

                                    <Avatar className={styles.avatar}
                                        alt='avatar'
                                        sx={{
                                            height: "70px",
                                            width: "70px",
                                            fontSize: "25px"
                                        }}
                                        src={window.atob(baitap.linkAvatar)}
                                    >
                                        U
                                    </Avatar>
                                </div>
                                <div className={styles.username}>{baitap.tenHienThi !== null ? baitap.tenHienThi : "Admin"}</div>
                                <div className={styles.item_footer}>
                                    <div className={styles.userpass}>
                                        {/* <i class="fa-solid fa-users"></i> */}
                                        <FontAwesomeIcon icon={faUserGroup} />
                                        <span>{baitap.soNguoiLam + '/' + baitap.soNguoiThanhCong}</span>
                                    </div>
                                    <div className={styles.level}>
                                        <span className={clsx({
                                            [styles.easy]: baitap.doKho === 1,
                                            [styles.average]: baitap.doKho === 2,
                                            [styles.hard]: baitap.doKho === 3,
                                        })}>{baitap.doKho === 1 ? 'Dễ' : (baitap.doKho === 2 ? 'Trung bình' : 'Khó')}</span>
                                    </div>
                                </div>
                            </div>
                        </li>))
                }

            </ul>

        </div>
    );
}

export default memo(ListPractice);