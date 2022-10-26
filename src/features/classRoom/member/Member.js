import React, { useState, useEffect } from 'react';
import styles from './Member.module.css';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImport, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarExport, GridToolbarDensitySelector } from '@mui/x-data-grid';
import UIAddMember from './UIAddMember';
import roomSlice from '../../../redux/roomSlice';
import PhongHocAPI from '../../../apis/phongHocApi';
import { useDispatch } from 'react-redux';

function Member(props) {

    const colums = [
        { field: 'uid', headerName: 'Id', width: 200 },
        { field: 'hoTen', headerName: 'Họ và tên', width: 200 },
        { field: 'tenHienThi', headerName: 'Tên hiển thị', width: 200 },
        { field: 'email', headerName: 'Email', width: 230 }
    ]

    const [member, setMember] = useState([]);
    const [importMembers, setImportMembers] = useState(false);
    const [removeMember, setRemoveMember] = useState([]);
    const dispatch = useDispatch();
    const params = useParams();

    const toolBarCustom = () => {
        return (
            <GridToolbarContainer>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
                {localStorage.getItem("isTeacher") === "true" && <GridToolbarExport />}
                {localStorage.getItem("isTeacher") === "true" && 
                
                <div className={styles.importMember} onClick={() => setImportMembers(!importMembers)} >
                    <FontAwesomeIcon icon={faFileImport} />
                    <p>Thêm thành viên</p>
                </div>
                }
                {localStorage.getItem("isTeacher") === "true" && 
                
                <div className={removeMember.length > 0 ? styles.deleteMember : styles.none} onClick={() => handleRemove()} >
                    <FontAwesomeIcon icon={faTrashCan} />
                    <p>Xóa thành viên</p>
                </div>
                }


            </GridToolbarContainer>
        )
    }

    useEffect(() => {
        try {
            const getMember = async () => {
                const response = await PhongHocAPI.getMmeber(params.roomId);
                if (response.data.length > 0) {
                    setMember(response.data);
                }
            }
            getMember();
        } catch (error) {
            console.log(error);
        }
    }, [params.roomId])


    // const handleImport = () => {
    //     console.log("runn")
    // }


    const handleRemove = async () => {

        let dialog = window.confirm("Bạn có chắc muốn xóa");
        if (dialog === true) {
            try {
                let emailList = [];
                removeMember.forEach(e => { emailList.push(e.email); });
                const response = await PhongHocAPI.removeMembers(emailList);
                if(response.data === true){
                    alert("Xóa thành viên thành công ");
                    window.location.reload(true);
                }
            } catch (err) {
                console.log("Error: ", err);
            }
        } else {
            return;
        }
    }

    return (

        <>
            <div className={styles.member}>

                <DataGrid
                    autoHeight
                    getRowId={(row) => row.email}
                    rows={member}
                    columns={colums}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    components={{
                        Toolbar: toolBarCustom,
                    }}
                    checkboxSelection
                    onSelectionModelChange={(mail) => {
                        const selectedEmail = new Set(mail);
                        const selectedRowData = member.filter((r) => selectedEmail.has(r.email))
                        setRemoveMember(selectedRowData)
                    }}
                    localeText={{
                        toolbarColumns: "Cột",
                        toolbarFilters: "Tìm kiếm",
                        toolbarDensity: "Độ cao",
                        toolbarExport: "Xuất file",
                        // Value: "Giá trị",
                        filterPanelInputLabel: 'Giá trị',
                        filterPanelColumns: 'Cột',
                        filterPanelOperators: 'So sánh'
                    }}
                />

            </div>

            {importMembers && <UIAddMember />}
        </>

    );
}

export default Member;