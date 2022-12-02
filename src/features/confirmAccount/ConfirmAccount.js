import React from 'react';
import { useParams } from 'react-router-dom';
import Logo from '../../images/logo_transparent.png';
// import NguoiDungAPI from '../../apis/nguoiDungAPI';
import PhongHocAPI from '../../apis/phongHocApi';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import styles from './ConfirmAccount.module.scss';
import taiKhoanAPI from '../../apis/taiKhoanAPI';

function ConfirmAccount(props) {

    const params = useParams();
    // const navigate = useNavigate();
    const getInfoUrl = {
        email: atob(params.email),
        idRoom: atob(params.idRoom)
    }

    const [loading, setLoading] = React.useState(false);


    const handleClick = async () => {
        try {
            setLoading(true)
            const response = await createUserWithEmailAndPassword(auth, getInfoUrl.email, "123456");
            let userTemp = {
                uid: response.user.uid,
                email: response.user.email
            };

            let date = new Date();
            const indexValueArray = 0;
            date = date.toISOString().split('T')[indexValueArray];
            const objectTaiKhoan = {
                UidTaiKhoan: userTemp.uid, 
                HoTen: getInfoUrl.email, 
                Email: getInfoUrl.email, 
                TenHienThi: userTemp.email, 
                NgaySinh: date,
            }
            const responseAddUser = await taiKhoanAPI.taoTaiKhoan(objectTaiKhoan);

            if(responseAddUser.data === true){
                const responseAddRoom = await PhongHocAPI.addOneMember(getInfoUrl.email, getInfoUrl.idRoom);
                if(responseAddRoom.data === true){
                    // navigate("/");
                    alert(`Tài khoản đã được tạo và tham gia phòng học với tài khoản: ${getInfoUrl.email.toString()} và mật khẩu: 123456 hãy truy câp trang chủ và bắt đầu học tập`)

                }
                setLoading(false)

            }

        } catch (error) {
            if(error.toString() === "FirebaseError: Firebase: Error (auth/email-already-in-use)."){
                alert("Tài khoản đã được tạo!")
                setLoading(false)
                return;
            }
            console.log(error);
        }
    }

    return (
        <>
            <Backdrop
            style={{ color: '#fff', zIndex: 10 }}
            open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <div className={styles.container} >
                <div>
                    <img src={Logo} alt="logo" />
                    <p>Bấm vào nút để tạo tài khoản và tham gia phòng học</p>
                    <button style={{
                        cursor: "pointer",
                    }} onClick={() => handleClick()} >Xác nhận</button>
                </div>
            </div>
        </>
    );
}

export default ConfirmAccount;