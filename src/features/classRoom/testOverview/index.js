import React, {useState,useEffect} from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import InfoIcon from '@mui/icons-material/Info';
import classNames from 'classnames/bind'
import styles from './testOverview.module.css'
import { useParams } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import BaiLamkiemTraAPI from '../../../apis/baiLamKiemTraAPI';
import DetailTest from './detailTest';
import DeKiemTraAPI from '../../../apis/deKiemTraAPI';
import testOverviewSlice from '../../../redux/testOverviewSlice';
import ChartOverview from './ChartOverview';
import phongHocApi from '../../../apis/phongHocApi';
import roomSlice from '../../../redux/roomSlice';
import ListNoSubmitOverview from './ListNoSubmitOverview';
import { useDispatch, useSelector } from 'react-redux';




const cx = classNames.bind(styles);

function TestOverview(props) {
    
    const [tabType, setTabType] = useState("Thống kê");
    // const [tabType1, setTabType1] = useStateIfMounted("Lịch sử làm bài");
    const handleTab = (value) => {
        setTabType(value)
        console.log(tabType);
    }

    const tabs = ["Thống kê","Lịch sử làm bài","Danh sách học viên chưa làm bài",]
    const params = useParams();
    const [open, setOpen] = useState(false);
    const [rows,setRows] = useState([]);
    const [rowSelect,setRowSelect] = useState({});
    const [testName,setTestName] = useState('');
    const dispatch = useDispatch();
    const colums = [
        { field: 'id', headerName: 'STT', width: 30 },
        { field: 'uid', headerName: 'uId', width: 250 },
        { field: 'idBaiLam', headerName: 'Id', width: 50 },
        { field: 'hoTen', headerName: 'Họ và tên', width: 175 },
        { field: 'tenHienThi', headerName: 'Tên hiển thị', width: 175 },
        { field: 'thoiGianNop', headerName: 'Thời gian nộp', width: 250 },
        { field: 'diem', headerName: 'Điểm', width: 50 },
        { field: 'chiTiet', headerName: 'Chi tiết', width: 70,renderCell: (params)=>{
            const onClick = (e)=> {
                e.stopPropagation();
                setOpen(true);
                setRowSelect(params.row);
            }
            return (
                <div onClick={onClick} style={{width:'100%', height:'100%', display:'flex', alignItems:'center',justifyContent:'center'}}>
                    <InfoIcon  sx={{
                        '&:hover': {
                            color: '#1976d2'}
                        ,color:"#6c6464"}}
                    />
                </div>)}
            , align: 'center'
        }
    ]
    
    const listMember = useSelector((state) => state.roomSlice.member);

    // Bien luu dư liệu
    const listOverView = useSelector((state) => state.testOverview.list);

    // console.log(listOverView);

    useEffect(() => {
        let mounted = true;

        const getData = async () =>{
            try {

                const responseMember =  await phongHocApi.getMmeber(params.idPhong);
                dispatch(
                    roomSlice.actions.setMember(responseMember.data)
                )

                const response = await BaiLamkiemTraAPI.getTestOverview(params.idTest);
                let arr = [];
                response.data.map( i => {
                    if(arr.length === 0){
                        arr.push(i);
                    }else{
                        let tempArr = [];
                        arr.push(i)
                        arr.filter(item => {
                            if(item.uid === i.uid && item.thoiGianNop < i.thoiGianNop){
                                // arr.push(arr)
                                
                                // arr.push(i)
                                tempArr.push(i)
                                // arr.push(tempArr)

                                arr = tempArr;
                            }
                        })
                    }
                })

                setRows(arr);
                dispatch(
                    testOverviewSlice.actions.setData(arr)
                )
            } catch (error) {
                console.log(error)
            }
        }
        
        const getName = async() => {
            try {
                const response = await DeKiemTraAPI.getOneById(params.idTest);
                setTestName(response.data.moTa);
            } catch (error) {
                console.log(error)
            }
        }
        if(mounted)
        {
            getData();
            getName();
        }
        
        return () => mounted = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    

    const getDiem = () =>{

    let dsdiembangnam = [];
    let dsdiemduoinam = [];
    let dsdiemmuoi = [];

        rows.map(i =>{
                if(i.diem >= 5){
                    return dsdiembangnam.push(i);
                }
                else if(i.diem < 5){
                    return dsdiemduoinam.push(i);
        
                }
                else if(i.diem === 10){
                    return dsdiemmuoi.push(i);
        
                }
                return null;
            } )
        return [dsdiemduoinam.length,dsdiembangnam.length, dsdiemmuoi.length]
    }


    const handleClose = () => {
        setOpen(false);
      };
    

    //   console.log(tabType)

    const handleNoSubmit = () => {
        let arr = [];
        listMember.filter(item => {
            listOverView.map(i => {
                if(item.uid !== i.uid){
                    if(arr.length <= 0){
                        arr.push(item);
                        return;
                    }

                    arr.map(a => {
                        if(a.uid !== item.uid){
                            arr.push(item)
                        }
                    })

                }
            })
        })
        return arr;
    }


      
    return (
        <div className={cx('container')}>
            <div className={cx('header')}>
                <h1>Tổng quan {testName}</h1>
            </div>
            <div className={styles.container}>
               
               <div className={styles.content}>

                   <div className={styles.tongquan_header}>

                       {tabs.map((tab, index) => (

                           <button key={index}
                               onClick={() => setTabType(tab)}
                               style={tabType === tab ? {
                                   color: 'white',
                                   backgroundColor: '#3e80ef'
                               } : {

                               }}
                           >
                               {tab}
                           </button>
                       ))}

                   </div>
           </div>
           <div className={cx('content')}>


                {tabType === "Lịch sử làm bài" &&
                <div className={cx('content-table')}>
                <DataGrid
                        autoHeight
                        rows={rows}
                        columns={colums}
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
                </div>}

                {tabType === "Thống kê" && <ChartOverview Arr={getDiem()} />}

                {tabType === "Danh sách học viên chưa làm bài" && <ListNoSubmitOverview Rows = {handleNoSubmit()} />}

            </div>
            </div>
            <Dialog
                open={open}
                fullWidth
                maxWidth='lg' 
                onClose={handleClose}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title" sx={{color: '#6F767A'}}>Chi tiết bài làm của  {rowSelect.tenHienThi} </DialogTitle>
                <DialogContent dividers>
                    <DetailTest idBaiLam={rowSelect.idBaiLam} totalScore={rowSelect.diem} />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>THOÁT</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default TestOverview;
