import React, {useState} from "react";
import styles from "./inputmatch.module.css"
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { DatePicker } from 'antd';
import classNames from 'classnames/bind';
import Button from '@mui/material/Button';
import moment from 'moment';
import useLookBodyScroll from "../../components/useLockBodyScroll";
import GiaiDauAPI from "../../apis/giaiDauAPI";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { imgRanMatch1, imgRanMatch2 } from "../../components/content/export";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { fireStorage } from '../../firebase/config';

const { RangePicker } = DatePicker;
const cx = classNames.bind(styles);
function InputMatch(){
    useLookBodyScroll();
    const [openCreateMatch, setOpenCreateMatch] = useState(false);
    const uId = JSON.parse(localStorage.getItem('uId')); 
    const [giaiDau_cusTom, setGiaiDau_cusTom] = useState({
        tenGiaiDau: "",
        moTa: "",
        tag: "",
        uidTaiKhoan: uId,
        thoiGianBatDau: "",
        thoiGianKetThuc: "",
        linkImgGiaiDau: "",
    });
    const imgRandom = [
        imgRanMatch1,
        imgRanMatch2,
    ]

    const handleCreateMatch = () => {
        const data = async () => {
            try {
                if(giaiDau_cusTom.tenGiaiDau === "" || giaiDau_cusTom.moTa === "" || giaiDau_cusTom.tag === "" || giaiDau_cusTom.thoiGianBatDau === "" || giaiDau_cusTom.thoiGianKetThuc === "")
                {
                    alert("Vui lòng nhập đủ thông tin");
                }
                else{
                    // if(giaiDau_cusTom.linkImgGiaiDau !== ""){
                    //     const index = Math.floor(Math.random() * imgRandom.length);
                    //     setGiaiDau_cusTom({...giaiDau_cusTom, linkImgGiaiDau: imgRandom[index]});
                    //     const storageRef = ref(fireStorage, `images/${giaiDau_cusTom.linkImgGiaiDau.name}`);
                    //     await uploadBytes(storageRef, giaiDau_cusTom.linkImgGiaiDau).then((snapshot) => {
                    //         getDownloadURL(snapshot.ref).then((url) => {
                    //             saveDB(window.btoa(url),"add");
                    //         })
                    //     })
                    // }
                    const add = async () => {
                        const response = await GiaiDauAPI.AddGiaiDau(giaiDau_cusTom);
                        if(response.data)
                        {
                            alert("Thêm mới thành công");
                            setGiaiDau_cusTom({tenGiaiDau:"", moTa:"", tag:"", uidTaiKhoan: uId, thoiGianBatDau:"", thoiGianKetThuc:"", linkImgGiaiDau:""});
                        }
                    }
                    add();
                }
                
            } catch (error) {
                console.log("Error...", error);
            }
        }
        data();
    }

    const saveDB = async (img, type) => {
        
        const ob = {
            tenGiaiDau: giaiDau_cusTom.tenGiaiDau,
            moTa: giaiDau_cusTom.moTa,
            tag: giaiDau_cusTom.tag,
            uidTaiKhoan: uId,
            thoiGianBatDau: giaiDau_cusTom.thoiGianBatDau,
            thoiGianKetThuc: giaiDau_cusTom.thoiGianKetThuc,
            linkImgGiaiDau: img,
        }
        console.log(ob);
        if(type === "add")
        {
            const response = await GiaiDauAPI.AddGiaiDau(ob);
            console.log(response.data);
            if (response.data) {
                alert("Thêm mới thành công");
                setGiaiDau_cusTom({tenGiaiDau:"", moTa:"", tag:"", uidTaiKhoan: uId, thoiGianBatDau:"", thoiGianKetThuc:"", linkImgGiaiDau:""});
            }
        }
    }

    return (
        <>
            <div className={styles.input_match} >
                <h2>Nhập thông tin giải đấu</h2>
                <div style={{position: "relative"}}>
                    <TextField className={styles.input_output}  label="Tên giải đấu" 
                        placeholder="Nhập tên giải đấu" value={giaiDau_cusTom.tenGiaiDau}
                        multiline onChange= {e => setGiaiDau_cusTom({...giaiDau_cusTom, tenGiaiDau: e.target.value})}/>
                    <div style={{width:"100%", height:"20px"}}></div>
                    <div className={cx('content-describe')}>
                        <RangePicker
                            style={{height:"56px"}}
                            className={styles.input_output}
                            type="datetime-local"
                            placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
                            ranges={{
                                "Ngày hiện tại": [moment(), moment()],
                                "Tháng hiện tại": [moment().startOf('month'), moment().endOf('month')],
                            }}
                            showTime
                            format="YYYY/MM/DD HH:mm:ss"
                            onChange={(dates, dateStrings) => {
                                setGiaiDau_cusTom({...giaiDau_cusTom, thoiGianBatDau: dateStrings[0], thoiGianKetThuc: dateStrings[1]});
                            }}
                        />
                    </div>
                    <div style={{width:"100%", height:"20px"}}></div>
                    <p>Nội dung</p>
                    <CKEditor
                        editor={ClassicEditor}
                        height="700px"
                        data="<p>Nhập nội dung giải đấu</p>"
                        onReady={(editor) => {
                            editor.editing.view.change((writer) => {
                                writer.setStyle(
                                    "height",
                                    "200px",
                                    editor.editing.view.document.getRoot()
                                );
                            });
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setGiaiDau_cusTom({...giaiDau_cusTom, moTa: data});
                        }}

                    />
                    <div style={{width:"100%", height:"20px"}}></div>
                    <TextField className={styles.input_output} label="Tag" 
                        placeholder="Nhập tag giải đấu" value={giaiDau_cusTom.tag}
                        multiline onChange= {e => setGiaiDau_cusTom({...giaiDau_cusTom, tag: e.target.value})}/>
                </div>
                <div className={styles.btn_intputTestCase} >
                    <Button  variant="contained" style={{backgroundColor:"darkgray"}}
                        endIcon={<CancelIcon />}
                        onClick={() => setOpenCreateMatch(false)}
                    >Hủy</Button>
                    <Button  variant="contained" style={{marginLeft:"20px"}}
                        endIcon={<SaveIcon />}
                        onClick={() => handleCreateMatch()}
                    >Lưu</Button>
                </div>
            </div>
        </>
    );
}

export default InputMatch;
