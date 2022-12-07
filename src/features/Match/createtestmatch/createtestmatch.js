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
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { faFileCsv } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BaiTapCodeFile from '../../../files/BaiTapCode.xlsx';
import BTTracnghiem from '../../../files/CauHoiTracNghiem.xlsx';
import { styled } from '@mui/material/styles';
import * as XLSX from 'xlsx';
import importDataSlice from '../../../redux/importDataSlice';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import BaiTapCodeAPI from "../../../apis/baiTapCodeAPI";
import BaiTapTN from "../../../apis/baiTapTN_API";
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from "@mui/material/Backdrop";
// const { RangePicker } = DatePicker;
const cx = classNames.bind(styles);

const Input = styled('input')({
    display: 'none',
});

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
    // const [nameTest, setNameTest] = useState('');
    const [startDate, setStartDate] = useState('');
    // const [endDate, setEndDate] = useState('');
    const theme = useTheme();
    const [loading, setLoading] = useState(false);
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const questions = useSelector((state) => state.createTest.questions);
    const [openBackDrop, setopenBackDrop] = useState(false);
    const [rows, setRows] = useState([]);
    const [questionSelecteds,setQuestionSelecteds] = useState([]);
    const uId = JSON.parse(localStorage.getItem('uId'));
    const [importType, setImportType] = useState(''); 
    const [editQues, setEditQues] = useState(false);
    const [totalQues, setTotalQues] = useState('');
    const [qTemp, setQTemp] = useState()
    const importCauHoiTracNghiem = useSelector((state) => state.importData.cauHoiTracNghiem);
    const importCauHoiCode = useSelector((state) => state.importData.cauHoiCode);

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

    const handleFile = async (e) => {
        const file = e.target.files[0];
        const datafile = await file.arrayBuffer();
        const workBook = XLSX.read(datafile);

        const workSheet = workBook.Sheets[workBook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(workSheet, {
            header: 1,
            defval: ""
        });

        if (importType === "BaiTapTracNghiem") {
            
            dispatch(
                importDataSlice.actions.setCauHoiTracNghiem(jsonData.slice(1))
            );
        }
        if(importType === "BaiTapCode"){
            dispatch(
                importDataSlice.actions.setCauHoiCode(jsonData.slice(1))
            );
        }
    }

    const handleCalTotalGrade = (array) => {
        // console.log(array)
        let total = 0;
        array.map(i => 
            total = total + i.diem
                // console.log(i.diem)
            );
        return setTotalQues(Math.round(total));
    }

    const handleDeleteImportQuestions = (value, type) => {
        const list = [];
    
        if (type === "tracnghiem") {
          importCauHoiTracNghiem.map((a, index) => {
            if (index !== value) {
              list.push(a);
            }
            return null;
          });
          dispatch(importDataSlice.actions.setCauHoiTracNghiem(list));
        }
    
        if (type === "cauhoicode") {
          importCauHoiCode.map((a, index) => {
            if (index !== value) {
              list.push(a);
            }
            return null;
          });
          dispatch(importDataSlice.actions.setCauHoiCode(list));
        }
      };

    const addBTCode = async (ob) => {
        try {
            setLoading(true);
            const response = await BaiTapCodeAPI.postAddBaiTapCode(ob);
          
            if (response.data === true) {
                alert(`Thêm bài tập có tiêu đề : ${ob.tieuDe} thành công!`);
            }

            const responseCauHoiCode = await DeCauHoiGiaiDauAPI.getListCauHoiGiaiDau(uId);
            const convert  = responseCauHoiCode.data.map((item,index)=> ({
                id: index,
                idBt:item.id,
                loaiBai: item.loaiBai,
                tenBai: item.tenBai,
                doKho: item.doKho === 1 ? "Dễ" : (item.doKho === 2? "Trung Bình": "Khó"),

            }))

            dispatch(createTestSlice.actions.addQuestion(
                convert.map((item) => ({
                    id: item.idBt,
                    diem: 0,
                    loaiCauHoi: item.loaiBai,
                    doKho: item.doKho,
                }))
            ))
            setImportType("");
            setLoading(false);
          
        } catch (error) {
          console.log("Fetch data error: ", error);
        }
      };
    
      const addBTTracNghiem = async (ob) => {
        try {
          const response = await BaiTapTN.postAddBaiTapTN(ob);
          console.log(response);
          if (response.data === true) {
            alert(`Thêm bài tập có tiêu đề : ${ob.cauHoi} thành công!`);
            // setReset(true);
          }
        } catch (error) {
          console.log("Error: ", error);
        }
      };

    const handleCloseImport = () => {
        dispatch(importDataSlice.actions.setCauHoiCode([]));
        dispatch(importDataSlice.actions.setCauHoiTracNghiem([]));
      };
    
    const handleAddListImport = () => {
        if (importCauHoiCode.length > 0) {
          importCauHoiCode.forEach((data) => {
            let baiTapCode = {
              tieuDe: data[0],
              deBai: data[1],
              rangBuoc: data[2],
              dinhDangDauVao: data[3],
              dinhDangDauRa: data[4],
              mauDauVao: data[5],
              mauDauRa: data[6],
              ngonNgu: data[7],
              thoiGian: data[8].replaceAll(`"`, ""),
              congKhai: data[9],
              doKho: data[10],
              uIdNguoiTao: uId,
            };
    
            let testCase = [];
            let i = 11;
            while (data.length > 0) {
              if (i > data.length) {
                return;
              } else {
                // let temp = 0;
                if (data[i] !== "" ) {
                   
                      testCase.push({
                        Input: data[i],
                        Output: data[i + 1],
                      });
                    //   temp = data[i + 1];
                
                }
                else break;
              }
              i = i + 2;
            }
            baiTapCode = {
              ...baiTapCode,
              testCases: testCase,
            };
    
            addBTCode(baiTapCode);
          });
    
          dispatch(importDataSlice.actions.setCauHoiCode([]));
        }
    
        if (importCauHoiTracNghiem.length > 0) {
          importCauHoiTracNghiem.forEach((data) => {
            let cauHoiTracNghiem = {
              cauHoi: data[0],
              cauTraLoi1: data[1],
              cauTraLoi2: data[2],
              cauTraLoi3: data[3],
              cauTraLoi4: data[4],
              dapAn: data[5],
              uIdNguoiTao: uId,
            };
    
            addBTTracNghiem(cauHoiTracNghiem);
          });
    
          dispatch(importDataSlice.actions.setCauHoiTracNghiem([]));
        }
    };

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

    const handleClear = () => {
        dispatch(createTestSlice.actions.clearQuestion([]))
        setEditQues(false)
    }

    const handleEditQues = (value,id) => {
        let arr = []
        questions.map( item => 
            {
                if (item.id !== id) return arr.push(item);
                const objC = {...item};
                objC.diem = value === '' ? 0 : parseFloat(value);
                return arr.push(objC)
            }
        );
        handleCalTotalGrade(arr)
        setQTemp(arr);
    }

    const handleSaveChange = () => {
        if(totalQues > 10){
            alert('Tổng điểm đã lớn hơn 10 vui lòng điều chỉnh lại điểm các câu hỏi')
            // set
            return
        }
        dispatch(createTestSlice.actions.updateQuestion(qTemp));
        setEditQues(false);
    }

    const handleCancel = () => {
        handleCalTotalGrade(questions)
        setEditQues(false);
    }

    React.useEffect(() => {
        if(questions){
            handleCalTotalGrade(questions)
        }
    },[questions])

    return (
        <>
            <Backdrop
                style={{ color: "#fff",  zIndex: 5 }}
                open={loading}
                // onClick={handleClose}
            >
                <CircularProgress color="inherit" disableShrink />
            </Backdrop>

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
                        
                        <div 
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between"
                            }}
                            // className={cx('header-ques')}
                        >
                            <h3 
                            // className={cx('header-ques-left')}
                                style={{
                                    width: "200px"
                                }}
                            >Tổng điểm <span>{totalQues}/10</span></h3>

                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: "20px",
                                }}
                            >
                                {questions.length > 0 && 
                                <button 
                                    className={cx('btn-add-question')} 
                                    onClick={editQues === false ? () => setEditQues(!editQues) :
                                        () => handleSaveChange()
                                    }
                                >
                                    <AddCircleIcon sx={{ fontSize: "19px" }} />
                                    {editQues === false  ?
                                    "Chỉnh sủa đề" : "Lưu thay đổi"}
                                </button>}

                                {editQues === true && 
                                <button 
                                    className={cx('btn-add-question')} 
                                    onClick={() => handleCancel()}
                                >
                                    {/* <AddCircleIcon sx={{ fontSize: "19px" }} /> */}
                                    Hủy
                                </button>}

                                {questions.length > 0 && 
                                <button 
                                    className={cx('btn-add-question')}
                                    onClick={() =>handleClear()}
                                >
                                    Xóa tất cả
                                </button>}
                            </div>
                        </div>
                        {
                            questions.map((item, index) => (
                                <ItemQuestion key={index} data={item} index={index} edit={editQues} onChangeScore={handleEditQues} />
                            ))
                        }
                    </div>
                   
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '10px',
                        }}
                    >
                        <div className={cx('add-question')}>
                            <button className={cx('btn-add-question')} onClick={() => handleClickAdd()} >
                                <AddCircleIcon sx={{ fontSize: "19px" }} />
                                Thêm Câu Hỏi
                            </button>
                        </div>

                        <div className={cx('add-question')}>
                            <button 
                                className={cx('btn-add-questionOutSite')} 
                                onClick={() => setImportType("BaiTapCode")} 
                            >
                                <AddCircleIcon sx={{ fontSize: "19px" }} />
                                Thêm Câu Hỏi Ngoài
                            </button>
                        </div>
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

            {importType !== '' &&  
                <Dialog
                    fullScreen={fullScreen}
                    open={importType !== ''}
                    onClose={() => setImportType("")}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title" sx={{ fontWeight: '600' }}>
                        {importType === "BaiTapCode" ? "Import bài tập code từ file excel" : "Import câu hỏi trắc nhiệm từ file excel"}
                    </DialogTitle>
                    <DialogContent  >
                        <DialogContentText sx={{ padding: '20px' }}>
                            <p>Để tạo nhiều câu hỏi vui lòng tạo theo file mẫu</p>
                            <FontAwesomeIcon icon={faFileCsv} style={{ marginRight: '6px', color: 'green', fontSize: '20px' }}></FontAwesomeIcon>
                            <a href={importType === "BaiTapCode" ? BaiTapCodeFile : BTTracnghiem}
                            // download={BaiTapCode.xlsx}
                            >Bấm vào đây để tải file</a>
                            <br></br>
                            <p style={{ marginTop: '20px' }}>Để import câu hỏi vui lòng tải file Excel lên website!</p>
                            <label htmlFor="contained-button-file">
                                <Input accept="xlsx" id="contained-button-file" multiple type="file" 
                                    onChange={(e) => handleFile(e)} 
                                />
                                <Button variant="contained" component="span">
                                    Upload
                                </Button>
                            </label>
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            }

<Dialog
                open={
                    importCauHoiTracNghiem.length > 0 || importCauHoiCode.length > 0
                }
                fullWidth
                maxWidth="xl"
                // onClose={() => setImportBTCode([])}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title" sx={{ color: "#6F767A" }}>
                    Các câu hỏi đã thêm
                </DialogTitle>
                <DialogContent dividers>
                    <TableContainer component={Paper} style={{ maxHeight: 350 }}>
                    <Table aria-label="simple table">
                        {/* <TableRow> */}
                        <TableHead>
                        {importCauHoiTracNghiem.length > 0 && (
                            <TableRow>
                            <TableCell sx={{ width: "5%", fontWeight: "700" }}>
                                STT
                            </TableCell>
                            <TableCell
                                sx={{ width: "20%", fontWeight: "700" }}
                                align="center"
                            >
                                Câu hỏi
                            </TableCell>
                            <TableCell
                                sx={{ width: "20%", fontWeight: "700" }}
                                align="center"
                            >
                                Đáp án 1
                            </TableCell>
                            <TableCell sx={{ width: "10%", fontWeight: "700" }}>
                                Đáp án 2
                            </TableCell>
                            <TableCell sx={{ width: "10%", fontWeight: "700" }}>
                                Đáp án 3
                            </TableCell>
                            <TableCell sx={{ width: "10%", fontWeight: "700" }}>
                                Đáp án 4
                            </TableCell>
                            <TableCell sx={{ width: "10%", fontWeight: "700" }}>
                                Đáp án đúng
                            </TableCell>
                            </TableRow>
                        )}
                        {importCauHoiCode.length > 0 && (
                            <TableRow>
                            <TableCell sx={{ width: "5%", fontWeight: "700" }}>
                                STT
                            </TableCell>
                            <TableCell
                                sx={{ width: "20%", fontWeight: "700" }}
                                align="center"
                            >
                                Tên bài
                            </TableCell>
                            <TableCell
                                sx={{ width: "20%", fontWeight: "700" }}
                                align="center"
                            >
                                Đề bài
                            </TableCell>
                            <TableCell sx={{ width: "10%", fontWeight: "700" }}>
                                Ràng buộc
                            </TableCell>
                            <TableCell sx={{ width: "10%", fontWeight: "700" }}>
                                Định dạng đầu vào
                            </TableCell>
                            <TableCell sx={{ width: "10%", fontWeight: "700" }}>
                                Định dạng đầu ra
                            </TableCell>
                            <TableCell sx={{ width: "10%", fontWeight: "700" }}>
                                Mẫu đầu vào
                            </TableCell>
                            <TableCell sx={{ width: "10%", fontWeight: "700" }}>
                                Mẫu đầu ra
                            </TableCell>
                            <TableCell sx={{ width: "10%", fontWeight: "700" }}>
                                Thời gian
                            </TableCell>
                            <TableCell
                                sx={{ width: "5%", fontWeight: "700" }}
                                align="center"
                            >
                                Xóa
                            </TableCell>
                            </TableRow>
                        )}
                        </TableHead>
                        <TableBody>
                        {importCauHoiCode.map((row, index) => (
                            <TableRow
                            key={index}
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {index + 1}
                            </TableCell>
                            <TableCell
                                className={styles.conten_cell}
                                align="center"
                                style={{ minWidth: "200px" }}
                            >
                                {row[0]}
                            </TableCell>
                            <TableCell align="center">{row[1]}</TableCell>
                            <TableCell>{row[2]}</TableCell>
                            <TableCell>{row[3]}</TableCell>

                            <TableCell>{row[4]}</TableCell>

                            <TableCell>{row[5]}</TableCell>

                            <TableCell>{row[6]}</TableCell>
                            <TableCell>{row[8].replaceAll(`"`, "")}</TableCell>

                            <TableCell align="center">
                                <DeleteIcon
                                sx={{ cursor: "pointer", color: "#f04530" }}
                                onClick={() =>
                                    // console.log(index)
                                    handleDeleteImportQuestions(index, "cauhoicode")
                                }
                                />
                            </TableCell>
                            </TableRow>
                        ))}

                        {importCauHoiTracNghiem.map((row, index) => (
                            <TableRow
                            key={index}
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {index + 1}
                            </TableCell>
                            <TableCell
                                className={styles.conten_cell}
                                align="center"
                                style={{ minWidth: "200px" }}
                            >
                                {row[0]}
                            </TableCell>
                            <TableCell align="center">{row[1]}</TableCell>
                            <TableCell>{row[2]}</TableCell>
                            <TableCell>{row[3]}</TableCell>

                            <TableCell>{row[4]}</TableCell>

                            <TableCell>{row[5]}</TableCell>

                            <TableCell align="center">
                                <DeleteIcon
                                sx={{ cursor: "pointer", color: "#f04530" }}
                                onClick={() =>
                                    // console.log(index)
                                    handleDeleteImportQuestions(index, "tracnghiem")
                                }
                                />
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleAddListImport()}>LƯU</Button>
                    <Button onClick={() => handleCloseImport()}>THOÁT</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default CreateTestMatch;
