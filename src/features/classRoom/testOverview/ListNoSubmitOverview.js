import React , {useState,useEffect} from'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import styles from './testOverview.module.css';
import classNames from 'classnames/bind'
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

export default function ListNoSubmitOverview({Rows}) {

    const colums = [
        // { field: 'id', headerName: 'STT', width: 30 },
        // { field: 'uid', headerName: 'uId', width: 250 },
        // { field: 'idBaiLam', headerName: 'Id', width: 50 },
        { field: 'hoTen', headerName: 'Họ và tên', width: 175 },
        { field: 'email', headerName: 'Email', width: 175 },
        { field: 'tenHienThi', headerName: 'Tên hiển thị', width: 175 },]

    const [rows,setRows] = React.useState(Rows);


    return <div className={cx('content-table')} >

<DataGrid
                        autoHeight
                        rows={Rows}
                        columns={colums}
                        getRowId={(row) => row.uid}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        
                        components={{
                            Toolbar: GridToolbar
                        }}
                        localeText={{
                            toolbarColumns: "Cột",
                            toolbarFilters: "Tìm kiếm",
                            toolbarDensity: "Kích thước",
                            toolbarDensityLabel: 'Kích thước',
                            toolbarDensityCompact: 'Nhỏ',
                            toolbarDensityStandard: 'Trung Bình',
                            toolbarDensityComfortable: 'Lớn',
                            toolbarExport: "Xuất file",
                            filterPanelInputLabel: 'Giá trị',
                            filterPanelColumns: 'Cột',
                            filterPanelOperators: 'So sánh'
                        }}
                    />
    </div>
}