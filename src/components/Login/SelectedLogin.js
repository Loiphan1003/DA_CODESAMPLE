import React from 'react';
import styles from './styles/SelectedLogin.module.scss';
import TeacherImage from '../../images/Teacher.png';
import UserImage from '../../images/User.png';

function SelectedLogin({ isGiangVien, select, login}) {


    return (
        <div className={styles.container} >

            <div className={styles.TeacherSelect} 
            onClick={() =>{
                select(false)
                login(true)
                isGiangVien(true)
            }}
            >
                <img src={TeacherImage} alt='hình ảnh' />
                <p>Đăng nhập tài khoản giáo viên</p>
            </div>

            <div className={styles.TeacherSelect}
            onClick={() => {
                select(false)
                login(true)
                isGiangVien(false)
            }}>
                <img src={UserImage} alt='hình ảnh' />
                <p>Đăng nhập tài khoản học viên</p>
            </div>
        </div>
    );
}

export default SelectedLogin;