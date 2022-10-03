import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Logo from '../../images/logo_transparent.png';
import NguoiDungAPI from '../../apis/nguoiDungAPI';
import PhongHocAPI from '../../apis/phongHocApi';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import styles from './ConfirmAccount.module.scss';

function ConfirmAccount(props) {

    const params = useParams();
    const navigate = useNavigate();
    const getInfoUrl = {
        email: atob(params.email),
        idRoom: atob(params.idRoom)
    }

    const handleClick = async () => {
        try {
            const response = await createUserWithEmailAndPassword(auth, getInfoUrl.email, "123456");
            let userTemp = {
                uid: response.user.uid,
                email: response.user.email
            };

            let date = new Date();
            const indexValueArray = 0;
            date = date.toISOString().split('T')[indexValueArray];
            
            const responseAddUser = await NguoiDungAPI.AddOrUpdate(userTemp.uid, null, null, null, userTemp.email, date, null);

            if(responseAddUser.data === true){
                const responseAddRoom = await PhongHocAPI.joinPhongHoc(userTemp.uid, getInfoUrl.idRoom);
                if(responseAddRoom.data === true){
                    navigate("/");
                }
            }

        } catch (error) {
            if(error.toString() === "FirebaseError: Firebase: Error (auth/email-already-in-use)."){
                alert("Tài khoản đã được tạo!")
                return;
            }
            console.log(error);
        }
    }

    return (
        <div className={styles.container} >
            <div>
                <img src={Logo} alt="logo" />
                <p>Bấm vào nút để tạo tài khoản và tham gia phòng học</p>
                <button onClick={() => handleClick()} >Xác nhận</button>
            </div>
        </div>
    );
}

export default ConfirmAccount;