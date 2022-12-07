import React from "react";
import TextField from "@mui/material/TextField";
import { DatePicker } from "antd";
import { useParams } from "react-router-dom";
import moment from "moment";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import axios from "axios";
import DeKiemTraAPI from "../../../apis/deKiemTraAPI";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

// const { RangePicker } = DatePicker;

function TestInfo({ data }) {
//   console.log(data.ngayHetHan);
  const [endDate, setEndDate] = React.useState("");
  const params = useParams()
  const [name,setName] = React.useState('');

  const colums = [
    // { field: 'id', headerName: 'STT', width: 30 },
    // { field: 'uid', headerName: 'uId', width: 250 },
    // { field: 'idBaiLam', headerName: 'Id', width: 50 },
    { field: 'stt', headerName: 'Số thứ tự', width: 175 },
    { field: 'loaiCauHoi', headerName: 'Loại câu hỏi', width: 175 },
    { field: 'diem', headerName: 'Điểm', width: 175 },]

  const [list, setList] = React.useState([]);

  React.useEffect(() => {

    const fetchData= async () => {
        const res = await DeKiemTraAPI.getOneById(params.idTest)
        const convert = res.data.listCauHoi.map(i => 
            {
                if(+i.loaiCauHoi === 1){
                     i.loaiCauHoi = 'Dễ'
                }
                if(+i.loaiCauHoi === 2){
                     i.loaiCauHoi = 'Trung Bình'
                }
                if(+i.loaiCauHoi === 3){
                     i.loaiCauHoi = 'Khó'
                }
                return i
            }
        );

        setList(convert);
    }

    fetchData();

  },[]) 

  const handleUpdate = async () => {
    let date = new Date(endDate)
    const result = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    const nameUpdate = name === '' ? data.moTa : name;
    const response = await DeKiemTraAPI.updateDeInfo(params.idTest, nameUpdate, result);
    if(response.data === true){
        alert("Chỉnh sửa thông tin thành công");
        // window.location.reload(true);
    }
  }


  return (
    <>
      <div
        style={{
            display: 'flex',
            flexDirection: 'row',
            gap: "20px",
            alignItems: 'center'
        }}
      >
        <TextField
          id="filled-basic"
          label="Tên bài"
          defaultValue={data.moTa}
          variant="filled"
          onChange={(e) => setName(e.target.value) }
        />

        <div
            style={{
                width: 'fit-content'
            }}
        >
            <h3 style={{margin: "0"}} >Ngày hết hạn</h3>
        <DatePicker
          placeholder={"Ngày kết thúc"}
          ranges={{
            Today: [moment(), moment()],
            "This Month": [moment().startOf("month"), moment().endOf("month")],
          }}
          defaultValue={dayjs(data.ngayHetHan, "YYYY/MM/DD")}
          showTime
          format="YYYY/MM/DD HH:mm:ss"
          onChange={(dateStrings) => {
            setEndDate(dateStrings);
          }}
        />
        </div>

        <Button
          variant="contained"
          style={{
            height: "30px"
          }}
          onClick={() => handleUpdate()}
        >
          Chỉnh sửa
        </Button>
      </div>

      <DataGrid
        autoHeight
        rows={list}
        columns={colums}
        getRowId={(row) => row.id}
        pageSize={10}
        rowsPerPageOptions={[10]}
        components={{
          Toolbar: GridToolbar,
        }}
        localeText={{
          toolbarColumns: "Cột",
          toolbarFilters: "Tìm kiếm",
          toolbarDensity: "Kích thước",
          toolbarDensityLabel: "Kích thước",
          toolbarDensityCompact: "Nhỏ",
          toolbarDensityStandard: "Trung Bình",
          toolbarDensityComfortable: "Lớn",
          toolbarExport: "Xuất file",
          filterPanelInputLabel: "Giá trị",
          filterPanelColumns: "Cột",
          filterPanelOperators: "So sánh",
        }}
      />

        {/* <Button
          variant="contained"
          // onClick={handleSave}
        >
            Thêm câu hỏi
        </Button> */}
    </>
  );
}

export default TestInfo;
