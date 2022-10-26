import React, { useState } from 'react';
import styles from './styles/UIAddMember.module.scss'
import { useParams } from 'react-router-dom';
import * as XLSX from 'xlsx';
import phongHocApi from '../../../apis/phongHocApi';
import FileMembers from '../../../files/Members.xlsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCsv } from '@fortawesome/free-solid-svg-icons';



function UIAddMember(props) {

    const [AddMember, setAddMember] = useState(true);
    let params = useParams();

    // const [listMembers, setListMembers] = useState([]);

    console.log(params.roomId);


    const handleFile = async (e) => {
        const file = e.target.files[0];
        const datafile = await file.arrayBuffer();
        const workBook = XLSX.read(datafile);

        const workSheet = workBook.Sheets[workBook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(workSheet, {
            header: 1,
            defval: ""
        });
        // setListMembers(jsonData.slice(1))
        let arr = jsonData.slice(1);
        let list = [];
       
        arr.forEach(e => list.push(e.toString()) )

        const response = await phongHocApi.addListMembers(list, params.roomId);
        // if(response.data === true){
        //     alert("Thêm thành viên thành công")
            window.location.reload(true);
        // }
        // if(response.data)
    }

    // console.log(listMembers)

    return (

        <div className={styles.container} >

            <h1>Thêm thành viên</h1>
            {AddMember ? <>
                <p>Để thêm thành viên bạn hãy nhập tài khoản gmail</p>
                <input placeholder='Nhập email tài khoản' type={'email'} />
            </> : <>
                <p>Để thêm nhiều thành viên bạn hãy tải file mẫu sau đó nhấn nút thêm để tải file lên hệ thống</p>
                <div className={styles.fileSample} >
                    <FontAwesomeIcon icon={faFileCsv} />
                    <a href={FileMembers} >Tải file mẫu</a>
                </div>
            </>}



            <p>Nếu bạn muốn thêm {AddMember ? 'nhiều thành viên' : 'thành viên'} cùng một lúc hãy nhấn vào <span onClick={() => setAddMember(!AddMember)}>đây</span></p>
            <div>
                {AddMember ? <button>Thêm</button> :
                    <label className={styles.custom_file_upload}>
                        <input type="file" onChange={(e) => handleFile(e)} />
                        Thêm
                    </label>
                }
                <button>Hủy</button>
            </div>
        </div>
    );
}

export default UIAddMember;