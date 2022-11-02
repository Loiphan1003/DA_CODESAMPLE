import React from "react";
import { useState } from "react";
import styles from "./createtestmatch.module.css";
import { useNavigate, useParams } from "react-router-dom";
import classNames from 'classnames/bind';
import { Button } from '@mui/material';
import { DatePicker} from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ItemQuestion from "../../../features/classRoom/createTest/ItemQuestion";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector } from '@mui/x-data-grid';
import createTestSlice from "../../../redux/createTestSlice";
import DeCauHoiGiaiDauAPI from "../../../apis/deCauHoiGiaiDauAPI";

const { RangePicker } = DatePicker;
const cx = classNames.bind(styles);

function getType(params) {
    return params.row.loaiBai === 0 ? "Trắc nghiệm" :"Code";
}

const colums = [
    { field: 'idBt', headerName: 'ID', flex:0.3 },
    { field: 'tenBai', headerName: 'Tên bài', flex:1 },
    { field: 'loaiBai', headerName: 'Loại', flex:0.5 ,valueGetter: getType},
]

const GridToolbarCustom = () => {
    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
        </GridToolbarContainer>
    )
}

function CreateTestMatch(){
    let params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [nameTest, setNameTest] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const questions = useSelector((state) => state.createTest.questions);
    const [openBackDrop, setopenBackDrop] = useState(false);
    const [rows, setRows] = useState([]);
    const [questionSelecteds,setQuestionSelecteds] = useState([]);
    const uId = JSON.parse(localStorage.getItem('uId')); 

    const handleSave = () => {
        const lsCauHoi = questions.map((item, index) => ({
            id: parseInt(item.id),
            stt: index + 1,
            diem: parseFloat(item.diem),
            loaiCauHoi: item.loaiCauHoi
        }))
        const baiKiemTra = {
            TongDiem: 10,
            NgayTao: startDate,
            IdgiaiDau: params.idMatch,
            listCauHoi: lsCauHoi
        }
        const addDeKiemTra = async () => {
            try {
                const response = await DeCauHoiGiaiDauAPI.addDeCauHoiGiaiDau(baiKiemTra);
                console.log(response.data);
                if (response.data) {
                    alert("Thêm bài kiểm tra thành công!");
                    dispatch(createTestSlice.actions.clearQuestion([]));
                    const getIdDeCauHoiGiaiDau = async () => {
                        try {
                            const response = await DeCauHoiGiaiDauAPI.getIdDeCauHoiGiaiDauByID(params.idMatch);
                            if(response.data !== null)
                            {
                                navigate(`/match/detailMatch/${params.nameMatch}/${params.idMatch}/${response.data}`);
                            }
                        } catch (error) {
                            console.log("Error..." + error);
                        }
                    }
                    getIdDeCauHoiGiaiDau();
                    // /match/detailMatch/:nameMatch/:idMatch/:idDeCauHoiGiaiDau
                    // navigate(`/match`);
                }
            } catch (error) {
                if("Error: Request failed with status code 400" === String(error)){
                    alert("Vui lòng nhập đầy đủ thông tin");
                }
                console.log("Fetch data error: ", error);
            }
        }
        addDeKiemTra();
    }

    const handleClickAdd = () => {
        if (!!uId) {
            try {
                const data = async () => {
                    const response = await DeCauHoiGiaiDauAPI.getListCauHoiGiaiDau(uId);
                    const convert  = response.data.map((item,index)=> ({
                        id: index,
                        idBt:item.id,
                        loaiBai: item.loaiBai,
                        tenBai: item.tenBai
                    }))
                    const fillter  = convert.filter(item => {
                        return !(!!questions.find(({id,loaiCauHoi}) => {
                            return item.loaiBai === loaiCauHoi && item.idBt === id;
                        }));
                    }) 
                    setRows(fillter);
                }
                data();
            } catch (error) {
                console.log("Error: ", error);
            }
        }
        setopenBackDrop(true)
    }

    const handleAccept = () => {
        dispatch(createTestSlice.actions.addQuestion(
            questionSelecteds.map((item) => ({
                id: item.idBt,
                diem: 0,
                loaiCauHoi: item.loaiBai
            }))
        ))
        setopenBackDrop(false);
    }

    const handleCloseBdrop = () => {
        setopenBackDrop(false);
    }

    console.log(startDate);
    return (
        <>
            <div className={cx('header')}>
                <h2>Tạo đề thi giải đấu {params.nameMatch}</h2>
                <Button variant="contained" onClick={handleSave}>
                    Lưu bài
                </Button>
            </div>
            <div className={cx('content')}>
            <div className={cx('content-center')}>
                    <p className={cx('input-nameTest')}>Thông tin tạo đề</p>
                    <div className={cx('content-describe')}>
                        <h3 className={cx('title-row')}>Ngày tạo đề giải đấu</h3>
                        <DatePicker
                            placeholder={"Ngày tạo đề"}
                            ranges={{
                                Today: moment(),
                                'This Month': [moment().startOf('month'), moment().endOf('month')],
                            }} 
                            showTime
                            format="YYYY/MM/DD HH:mm:ss"
                            onChange={(dateStrings) => {
                                setStartDate(dateStrings);
                            }}
                        />
                    </div>
                    <div className={cx('content-questions')}>
                        <h3 className={cx('title-row')}>Các câu hỏi trong giải đấu</h3>
                        {
                            questions.map((item, index) => (
                                <ItemQuestion key={index} data={item} index={index} />
                            ))
                        }
                    </div>
                    <div className={cx('add-question')}>
                        <button className={cx('btn-add-question')} onClick={() => handleClickAdd()} >
                            <AddCircleIcon sx={{ fontSize: "19px" }} />
                            Thêm Câu Hỏi
                        </button>
                    </div>
                </div>
                <Dialog open={openBackDrop} onClose={handleCloseBdrop} fullWidth maxWidth='lg'
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description" >
                    <DialogTitle>Thêm bài tập</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Chọn câu hỏi bài tập bạn muốn thêm.
                        </DialogContentText>
                        <DataGrid
                            rows={rows}
                            columns={colums}
                            autoHeight
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            components={{
                                Toolbar: GridToolbarCustom
                            }}
                            checkboxSelection
                            onSelectionModelChange={(ids) => {
                                const selectedIDs = new Set(ids);
                                const selectedRowData = rows.filter((row) =>
                                    selectedIDs.has(row.id) )
                                setQuestionSelecteds(selectedRowData);
                            }}
                            localeText={{
                                toolbarColumns: "Cột",
                                toolbarFilters: "Tìm kiếm",
                                toolbarDensity: "Độ cao",
                                toolbarExport: "Xuất file",
                                filterPanelInputLabel: 'Giá trị',
                                filterPanelColumns: 'Cột',
                                filterPanelOperators: 'So sánh'
                            }}
                        /> 
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseBdrop}>Hủy</Button>
                        <Button onClick={handleAccept}>Đồng ý</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
}

export default CreateTestMatch;
