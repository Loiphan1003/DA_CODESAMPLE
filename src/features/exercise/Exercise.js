import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Exercise.module.css";
import BaiTapCodeAPI from "../../apis/baiTapCodeAPI";
import BaiTapTN from "../../apis/baiTapTN_API";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ImportBTCode from "./importBT/ImportBTCode";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { faTrashCan, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Backdrop from "../../components/Backdrop";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import testCaseBtCode from "../../apis/testCaseBtCode";
import { useDispatch, useSelector } from "react-redux";
import importDataSlice from "../../redux/importDataSlice";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import BaiTapLuyenTapAPI from '../../apis/baiTapLuyenTapAPI'



function Exercise(props) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [idTC, setIdTC] = useState();
  const [openTestCase, setOpenTestCase] = useState(false);
  const [openEditTestCase, setOpenEditTestCase] = useState(false);
  const [resetTC, setResetTC] = useState(true);
  const [rows, setRows] = useState([]);
  const [rowsTN, setRowsTN] = useState([]);
  const [testCases, setTestCases] = useState([]);
  const navigate = useNavigate();

  // const [importBTCode, setImportBTCode] = useState([]);
  // const [importBTTN, setImportBTTN] = useState([]);

  const dispatch = useDispatch();

  const [reset, setReset] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [openEditBtCode, setOpenEditBtCode] = useState(false);
  const [openEditBTTN, setOpenEditBTTN] = useState(false);
  const [deleteAction, setDeleteAction] = useState({
    isBTCode: false,
    id: 1,
  });


  const importCauHoiTracNghiem = useSelector(
    (state) => state.importData.cauHoiTracNghiem
  );
  const importCauHoiCode = useSelector((state) => state.importData.cauHoiCode);

  const [btCode, setBtCode] = useState({
    id: 0,
    tieuDe: "",
    deBai: "",
    rangBuoc: "",
    dinhDangDauVao: "",
    dinhDangDauRa: "",
    mauDauVao: "",
    mauDauRa: "",
    ngonNgu: "",
    thoiGian: "",
    doKho: "",
    congKhai: "",
  });
  const [btTN, setBtTN] = useState({
    id: 0,
    cauHoi: "",
    cauTraLoi1: "",
    cauTraLoi2: "",
    cauTraLoi3: "",
    cauTraLoi4: "",
    dapAn: "",
  });

  console.log("R: ", btCode.doKho)


  const uId = JSON.parse(localStorage.getItem("uId"));

  useEffect(() => {
    const getAllBTCode = async () => {
      try {
        const response = await BaiTapCodeAPI.getListByuID(uId);
        setRows(response.data);
      } catch (error) {
        console.log("Fetch data error: ", error);
      }
    };
    getAllBTCode();

    const getAllBTTN = async () => {
      try {
        const response = await BaiTapTN.getListByUid(uId);
        setRowsTN(response.data);
      } catch (error) {
        console.log("Fetch data error: ", error);
      }
    };
    getAllBTTN();
  }, [reset, uId]);

  useEffect(() => {
    if (reset === true) {
      const getAllBTCode = async () => {
        try {
          const response = await BaiTapCodeAPI.getListByuID(uId);
          setRows(response.data);
        } catch (error) {
          console.log("Fetch data error: ", error);
        }
      };
      getAllBTCode();

      const getAllBTTN = async () => {
        try {
          const response = await BaiTapTN.getListByUid(uId);
          setRowsTN(response.data);
        } catch (error) {
          console.log("Fetch data error: ", error);
        }
      };
      setReset(false);
      getAllBTTN();
      return;
    }
  }, [reset, uId]);

  const deleteBTCode = (id) => {
    setOpen(true);
    setDeleteAction({
      isBTCode: true,
      id: id,
    });
  };

  const deleteBTTN = (id) => {
    setOpen(true);
    setDeleteAction({
      isBTCode: false,
      id: id,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addBTCode = async (ob) => {
    try {
      const response = await BaiTapCodeAPI.postAddBaiTapCode(ob);
      console.log(response.data);
      if (response.data === true) {
        alert(`Thêm bài tập có tiêu đề : ${ob.tieuDe} thành công!`);
        setReset(true);
      }
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
        setReset(true);
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


  const handleDelete = () => {
    if (deleteAction.isBTCode) {
      const dBTCode = async () => {
        try {
          const response = await BaiTapCodeAPI.deleteBaiTapCode(
            deleteAction.id
          );
          console.log("Xóa bài tập Code thành công!");
          console.log(response.data);

          if (response.data) {
            setRows((pre) => pre.filter((item) => item.id !== deleteAction.id));
          }
          else{
            alert("Bạn không thể xóa câu hỏi này do câu hỏi đã được sử dụng!")
          }
        } catch (error) {
          console.log("Fetch data error: ", error);
        }
      };
      dBTCode();
      console.log("Xóa bài tập code id = ", deleteAction.id);
      setReset(true);
    } else {
      const dBTTN = async () => {
        try {
          const response = await BaiTapTN.deleteBaiTapTN(deleteAction.id);
          if (response.data) {
            // console.log("Xóa bài tập TN thành công!");
            setRowsTN((pre) =>
              pre.filter((item) => item.id !== deleteAction.id)
            );
          }
        } catch (error) {
          console.log("Fetch data error: ", error);
        }
      };
      dBTTN();
      console.log("Xóa bài tập trắc nghiệm id = ", deleteAction.id);
      setReset(true);
    }
    setOpen(false);
  };

  const handleOpenEditBtCode = (
    Id,
    TieuDe,
    DeBai,
    RangBuoc,
    DinhDangDauVao,
    DinhDangDauRa,
    MauDauVao,
    MauDauRa,
    NgonNgu,
    thoiGian,
    congKhai,
    doKho,
  ) => {
    setBtCode({
      id: Id,
      tieuDe: TieuDe,
      deBai: DeBai,
      rangBuoc: RangBuoc,
      dinhDangDauVao: DinhDangDauVao,
      dinhDangDauRa: DinhDangDauRa,
      mauDauVao: MauDauVao,
      mauDauRa: MauDauRa,
      ngonNgu: NgonNgu,
      thoiGian: thoiGian,
      congKhai: congKhai,
      doKho: doKho,
    });
    // console.log("C: ",congKhai);
    setOpenEditBtCode(true);
    setResetTC(!resetTC);
  };

  const handleEditBTCode = () => {
    const data = async () => {
      try {
        const response = await BaiTapCodeAPI.editBaiTapCode(btCode);
        if (response.data) {
          if(btCode.congKhai === true){
            const response = await BaiTapLuyenTapAPI.EditBTLT(btCode.id, btCode.doKho, btCode.tieuDe, btCode.rangBuoc,
              btCode.dinhDangDauVao,
              btCode.dinhDangDauRa,
              btCode.mauDauVao,
              btCode.mauDauRa,);
          }

          alert("Sửa thành công");
          setOpenEditBtCode(false);
          setReset(!reset);
        }
      } catch (error) {
        console.log("Error...", error);
      }
    };
    data();
  };

  useEffect(() => {
    const data = async () => {
      try {
        const response = await testCaseBtCode.getOneTestCase(btCode.id);
        if (response.data) {
          setTestCases(response.data);
        }
      } catch (error) {
        console.log("Error...", error);
      }
    };
    data();
  }, [resetTC, btCode.id]);

  const handleAddTC = () => {
    const data = async () => {
      try {
        const response = await testCaseBtCode.AddTestCase(
          input,
          output,
          btCode.id
        );
        if (response.data) {
          alert("Thêm thành công");
          setResetTC(!resetTC);
          setOpenTestCase(false);
          setInput("");
          setOutput("");
        }
      } catch (error) {}
    };
    data();
  };

  const handleOpenEditTC = (id, input, output) => {
    setOpenEditTestCase(true);
    setIdTC(id);
    setInput(input);
    setOutput(output);
  };

  const handleEditTestCase = () => {
    const data = async () => {
      try {
        const response = await testCaseBtCode.EditTestCase(idTC, input, output);
        if (response.data) {
          alert("Sửa thành công");
          setOpenEditTestCase(false);
          setResetTC(!resetTC);
        }
      } catch (error) {
        console.log("Error...", error);
      }
    };
    data();
  };

  const handleDeleteTC = (id) => {
    const data = async () => {
      try {
        const response = await testCaseBtCode.DeleteTestCase(id);
        if (response.data) {
          alert("Xóa thành công");
          setResetTC(!resetTC);
        }
      } catch (error) {
        console.log("Error...", error);
      }
    };
    data();
  };

  const handleOpenEditBTTN = (
    Id,
    CauHoi,
    DapAn,
    CauTraLoi1,
    CauTraLoi2,
    CauTraLoi3,
    CauTraLoi4
  ) => {
    setOpenEditBTTN(true);
    setBtTN({
      id: Id,
      cauHoi: CauHoi,
      cauTraLoi1: CauTraLoi1,
      cauTraLoi2: CauTraLoi2,
      cauTraLoi3: CauTraLoi3,
      cauTraLoi4: CauTraLoi4,
      dapAn: DapAn,
    });
  };

  const handleEditBTTN = () => {
    const data = async () => {
      try {
        const response = await BaiTapTN.editBTTN(btTN);
        if (response.data) {
          alert("Sửa thành công");
          setOpenEditBTTN(false);
          setReset(!reset);
        }
      } catch (error) {}
    };
    data();
  };

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

  const handlePublic = async (btCode) => {
    const object = {
      id: btCode.id,
      doKho: btCode.doKho,
      tieuDe: btCode.tieuDe,
      deBai: btCode.deBai,
      isPublic: true,
      uIdNguoiTao: uId,
      rangBuoc: btCode.rangBuoc,
      dinhDangDauVao: btCode.dinhDangDauVao,
      dinhDangDauRa: btCode.dinhDangDauRa,
      mauDauVao: btCode.mauDauVao,
      mauDauRa: btCode.mauDauRa,
      thoiGian: btCode.thoiGian,
    }

    const response = await BaiTapCodeAPI.publicCauHoiCode(object)
    if(response.data === true){
      alert("Công khai câu hỏi thành công");
    }
  }

  return (
    <>
      <div className={styles.container}>
        {/* table câu hỏi code */}
        <div className={styles.TableCauHoiCode}>
          <div>
            <h2>Câu hỏi code</h2>

            <ImportBTCode
              type={"BaiTapCode"}
              style={{ marginBottom: "20px", float: "right" }}
            />

            <Button
              sx={{ marginBottom: "20px", marginRight: "20px", float: "right" }}
              variant="contained"
              endIcon={<AddCircleOutlinedIcon />}
              onClick={() => {
                navigate("/exercise/create");
              }}
            >
              Tạo bài tập code
            </Button>
          </div>
          <TableContainer component={Paper} style={{ maxHeight: 350 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: 40, fontWeight: "700" }}>
                    ID
                  </TableCell>
                  <TableCell sx={{ fontWeight: "700" }} align="center">
                    Tiêu Đề
                  </TableCell>
                  <TableCell sx={{ fontWeight: "700" }} align="center">
                    Ngôn ngữ
                  </TableCell>
                  <TableCell sx={{ fontWeight: "700" }} align="center">
                    Thời gian
                  </TableCell>
                  <TableCell
                    sx={{ width: 40, fontWeight: "700" }}
                    align="center"
                  >
                    Xóa
                  </TableCell>
                  <TableCell
                    sx={{ width: 40, fontWeight: "700" }}
                    align="center"
                  >
                    Sửa
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="center">{row.tieuDe}</TableCell>
                    <TableCell align="center">{row.ngonNgu}</TableCell>
                    <TableCell align="center">{row.thoiGian !== null ? row.thoiGian: "Không có"}</TableCell>
                    <TableCell align="center">
                      <DeleteIcon
                        sx={{ cursor: "pointer", color: "#f04530" }}
                        onClick={() => deleteBTCode(row.id)}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <ModeEditIcon
                        sx={{ cursor: "pointer" }}
                        onClick={() =>
                          handleOpenEditBtCode(
                            row.id,
                            row.tieuDe,
                            row.deBai,
                            row.rangBuoc,
                            row.dinhDangDauVao,
                            row.dinhDangDauRa,
                            row.mauDauVao,
                            row.mauDauRa,
                            row.ngonNgu,
                            row.thoiGian,
                            row.congKhai,
                            row.doKho,
                          )
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        {/* table câu hỏi trắc nghiệm */}
        <div className={styles.TableCauHoiCode}>
          <div>
            <h2>Câu hỏi trắc nghiệm</h2>

            <ImportBTCode
              type={"BaiTapTracNghiem"}
              style={{ marginBottom: "20px", float: "right" }}
            />

            <Button
              sx={{ marginBottom: "20px", marginRight: "20px", float: "right" }}
              variant="contained"
              endIcon={<AddCircleOutlinedIcon />}
              onClick={() => {
                navigate("/exercise/multiplechoice");
              }}
            >
              Tạo bài tập trắc nghiệm
            </Button>
          </div>
          <TableContainer component={Paper} style={{ maxHeight: 350 }}>
            <Table sx={{ minWidth: 800 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: 40, fontWeight: "700" }}>
                    ID
                  </TableCell>
                  <TableCell sx={{ fontWeight: "700" }} align="center">
                    Câu hỏi
                  </TableCell>
                  <TableCell sx={{ fontWeight: "700" }} align="center">
                    Đáp án
                  </TableCell>
                  <TableCell
                    sx={{ width: 40, fontWeight: "700" }}
                    align="center"
                  >
                    Xóa
                  </TableCell>
                  <TableCell
                    sx={{ width: 40, fontWeight: "700" }}
                    align="center"
                  >
                    Sửa
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rowsTN.map((row) => (
                  <TableRow
                    key={row.idbaiTapTracNghiem}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.idbaiTapTracNghiem}
                    </TableCell>
                    <TableCell
                      className={styles.conten_cell}
                      align="center"
                      style={{ minWidth: "200px" }}
                      dangerouslySetInnerHTML={{ __html: row.cauHoi }}
                    />
                    <TableCell align="center">{row.dapAn}</TableCell>
                    <TableCell align="center">
                      <DeleteIcon
                        sx={{ cursor: "pointer", color: "#f04530" }}
                        onClick={() => deleteBTTN(row.idbaiTapTracNghiem)}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <ModeEditIcon
                        sx={{ cursor: "pointer" }}
                        onClick={() =>
                          handleOpenEditBTTN(
                            row.idbaiTapTracNghiem,
                            row.cauHoi,
                            row.dapAn,
                            row.cauTraLoi1,
                            row.cauTraLoi2,
                            row.cauTraLoi3,
                            row.cauTraLoi4
                          )
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
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

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Bạn có thật sự muốn xóa?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Sau khi xóa
              {deleteAction.isBTCode
                ? " bài tập code "
                : " bài tập trắc nghiệm "}{" "}
              có
              <span style={{ fontWeight: "bold", color: "#f04530" }}>
                {" "}
                ID: {deleteAction.id}{" "}
              </span>
              bạn sẽ không thể khôi phục lại. Bạn có đồng ý với điều này?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose()}>Hủy</Button>
            <Button onClick={() => handleDelete()} autoFocus>
              Đồng ý
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      {/* màn hình sửa bài tập code */}
      {openEditBtCode && <Backdrop onClick={() => setOpenEditBtCode(false)} />}
      {openEditBtCode && (
        <div className={styles.content}>
          <input
            className={styles.input_NameEx}
            type="text"
            placeholder="Nhập tên bài tập"
            value={btCode.tieuDe}
            onChange={(e) => setBtCode({ ...btCode, tieuDe: e.target.value })}
          ></input>

          <div className={styles.exxercise_discription}>
            Mô tả
            <TextField
              value={btCode.deBai}
              onChange={(e) => setBtCode({ ...btCode, deBai: e.target.value })}
              sx={{ marginTop: "20px" }}
              fullWidth
              label="Nhập đề bài"
              multiline
            />
            <TextField
              value={btCode.rangBuoc}
              onChange={(e) =>
                setBtCode({ ...btCode, rangBuoc: e.target.value })
              }
              sx={{ marginTop: "20px" }}
              fullWidth
              label="Nhập ràng buộc"
              multiline
            />
            <TextField
              value={btCode.dinhDangDauVao}
              onChange={(e) =>
                setBtCode({ ...btCode, dinhDangDauVao: e.target.value })
              }
              sx={{ marginTop: "20px" }}
              fullWidth
              label="Nhập định dạng đầu vào"
              multiline
            />
            <TextField
              value={btCode.dinhDangDauRa}
              onChange={(e) =>
                setBtCode({ ...btCode, dinhDangDauRa: e.target.value })
              }
              sx={{ marginTop: "20px" }}
              fullWidth
              label="Nhập định dạng đầu ra"
              multiline
            />
            <TextField
              value={btCode.mauDauVao}
              onChange={(e) =>
                setBtCode({ ...btCode, mauDauVao: e.target.value })
              }
              sx={{ marginTop: "20px" }}
              fullWidth
              label="Nhập mẫu đầu vào"
              multiline
            />
            <TextField
              value={btCode.mauDauRa}
              onChange={(e) =>
                setBtCode({ ...btCode, mauDauRa: e.target.value })
              }
              sx={{ marginTop: "20px" }}
              fullWidth
              label="Nhập mẫu đầu ra"
              multiline
            />
            <TextField
              value={btCode.thoiGian}
              onChange={(e) =>
                setBtCode({ ...btCode, thoiGian: e.target.value })
              }
              sx={{ marginTop: "20px" }}
              fullWidth
              label="Thời gian"
              multiline
            />
          </div>

          <div className={styles.excercise_language}>
            <FormControl fullWidth>
              <InputLabel id="language-label">Ngôn ngữ</InputLabel>
              <Select
                labelId="language-label"
                value={btCode.ngonNgu}
                label="Ngôn ngữ"
                onChange={(e) =>
                  setBtCode({ ...btCode, ngonNgu: e.target.value })
                }
              >
                <MenuItem value="c">C</MenuItem>
                <MenuItem value="cpp">C++</MenuItem>
                <MenuItem value="py">Python</MenuItem>
                <MenuItem value="java">Java</MenuItem>
              </Select>
            </FormControl>

          </div>
          
          <FormControl fullWidth >
              <InputLabel id="level-label">Độ khó</InputLabel>
              <Select
                labelId="level-label"
                value={btCode.doKho}
                label="Đô khó"
                onChange={(e) =>
                  setBtCode({ ...btCode, doKho: e.target.value })
                }
              >
                <MenuItem value="1">Dễ</MenuItem>
                <MenuItem value="2">Trung Bình</MenuItem>
                <MenuItem value="3">Khó</MenuItem>
              </Select>
            </FormControl>

            <FormGroup>
              <FormControlLabel control={<Checkbox checked={btCode.congKhai !== true ? false : true} />} 
              label="Công khai câu hỏi" 
              onChange={() => 
                handlePublic(
                  btCode
                )
              }
              />
            </FormGroup>
          {/* xuất các testcase của bài code có id = id */}
          <div className={styles.content_TestCase}>
            <Button
              variant="contained"
              className={styles.btnAddTestCase}
              endIcon={<AddCircleOutlinedIcon />}
              onClick={() => setOpenTestCase(true)}
            >
              Thêm TestCase
            </Button>
            {testCases.map((testcase, index) => (
              <div className={styles.testcase} key={index}>
                <div className={styles.name_input}>TestCase #{index + 1}</div>
                <div className={styles.testcase_btn}>
                  <FontAwesomeIcon
                    className={styles.btn_update}
                    icon={faPen}
                    onClick={() =>
                      handleOpenEditTC(
                        testcase.id,
                        testcase.input,
                        testcase.output
                      )
                    }
                  />
                  <FontAwesomeIcon
                    className={styles.btn_delete}
                    icon={faTrashCan}
                    onClick={() => handleDeleteTC(testcase.id)}
                  />
                </div>
              </div>
            ))}
          </div>
          {/* nút lưu và hủy của form sửa bài code */}
          <div className={styles.exercise_btn}>
            <Button
              variant="contained"
              style={{ backgroundColor: "red" }}
              endIcon={<CancelIcon />}
              onClick={() => setOpenEditBtCode(false)}
            >
              Hủy
            </Button>

            <Button
              variant="contained"
              style={{ marginLeft: "20px" }}
              endIcon={<SaveIcon />}
              onClick={() => handleEditBTCode()}
            >
              Lưu
            </Button>
          </div>
        </div>
      )}
      {/* màn hình thêm test case */}
      {openTestCase && <Backdrop onClick={() => setOpenTestCase(false)} />}
      {openTestCase && (
        <div className={styles.input_testcase}>
          <h2>NHẬP TESTCASE</h2>
          <div>
            <TextField
              className={styles.input_output}
              label="Đầu vào"
              placeholder="Nhập đầu vào (input)"
              value={input}
              multiline
              onChange={(e) => setInput(e.target.value)}
            />
            <div style={{ width: "100%", height: "20px" }}></div>
            <TextField
              className={styles.input_output}
              label="Đầu ra"
              placeholder="Nhập đầu ra (output)"
              value={output}
              multiline
              onChange={(e) => setOutput(e.target.value)}
            />
          </div>
          <div className={styles.btn_intputTestCase}>
            <Button
              variant="contained"
              style={{ backgroundColor: "ButtonShadow" }}
              endIcon={<CancelIcon />}
              onClick={() => setOpenTestCase(false)}
            >
              Hủy
            </Button>
            <Button
              variant="contained"
              style={{ marginLeft: "20px" }}
              endIcon={<SaveIcon />}
              onClick={handleAddTC}
            >
              Lưu
            </Button>
          </div>
        </div>
      )}
      {/* màn hình sửa test case */}
      {openEditTestCase && (
        <Backdrop onClick={() => setOpenEditTestCase(false)} />
      )}
      {openEditTestCase && (
        <div className={styles.input_testcase}>
          <h2>SỬA TESTCASE</h2>
          <div>
            <TextField
              className={styles.input_output}
              label="Đầu vào"
              placeholder="Nhập đầu vào (input)"
              value={input}
              multiline
              onChange={(e) => setInput(e.target.value)}
            />
            <div style={{ width: "100%", height: "20px" }}></div>
            <TextField
              className={styles.input_output}
              label="Đầu ra"
              placeholder="Nhập đầu ra (output)"
              value={output}
              multiline
              onChange={(e) => setOutput(e.target.value)}
            />
          </div>
          <div className={styles.btn_intputTestCase}>
            <Button
              variant="contained"
              style={{ backgroundColor: "red" }}
              endIcon={<CancelIcon />}
              onClick={() => setOpenEditTestCase(false)}
            >
              Hủy
            </Button>
            <Button
              variant="contained"
              style={{ marginLeft: "20px" }}
              endIcon={<SaveIcon />}
              onClick={handleEditTestCase}
            >
              Lưu
            </Button>
          </div>
        </div>
      )}
      {/* màn hình sửa bài trắc nghiệm */}
      {openEditBTTN && <Backdrop onClick={() => setOpenEditBTTN(false)} />}
      {openEditBTTN && (
        <div className={styles.content}>
          <div className={styles.exxercise_disciption}>
            <h2 style={{ margin: "0" }}>Câu hỏi</h2>
            <TextField
              sx={{ marginTop: "20px" }}
              fullWidth
              label="Nhập câu hỏi"
              multiline
              value={btTN.cauHoi}
              onChange={(e) => setBtTN({ ...btTN, cauHoi: e.target.value })}
            />
          </div>
          <div className={styles.content_answer}>
            <div className={styles.exercise_input}>
              <h2>Câu trả lời</h2>
              <div className={styles.input_items}>
                <div className={styles.input_item}>
                  A:
                  <div className={styles.conten_input}>
                    <input
                      type={"text"}
                      placeholder="Nhập câu trả lời"
                      value={btTN.cauTraLoi1}
                      onChange={(e) =>
                        setBtTN({ ...btTN, cauTraLoi1: e.target.value })
                      }
                    ></input>
                  </div>
                </div>

                <div className={styles.input_item}>
                  B:
                  <div className={styles.conten_input}>
                    <input
                      type={"text"}
                      placeholder="Nhập câu trả lời"
                      value={btTN.cauTraLoi2}
                      onChange={(e) =>
                        setBtTN({ ...btTN, cauTraLoi2: e.target.value })
                      }
                    ></input>
                  </div>
                </div>

                <div className={styles.input_item}>
                  C:
                  <div className={styles.conten_input}>
                    <input
                      type={"text"}
                      placeholder="Nhập câu trả lời"
                      value={btTN.cauTraLoi3}
                      onChange={(e) =>
                        setBtTN({ ...btTN, cauTraLoi3: e.target.value })
                      }
                    ></input>
                  </div>
                </div>

                <div className={styles.input_item}>
                  D:
                  <div className={styles.conten_input}>
                    <input
                      type={"text"}
                      placeholder="Nhập câu trả lời"
                      value={btTN.cauTraLoi4}
                      onChange={(e) =>
                        setBtTN({ ...btTN, cauTraLoi4: e.target.value })
                      }
                    ></input>
                  </div>
                </div>
              </div>
            </div>
            <h2>Đáp án</h2>
            <FormControl fullWidth style={{ marginTop: "10px" }}>
              <InputLabel id="level-label">Đáp án</InputLabel>
              <Select
                labelId="level-label"
                value={btTN.dapAn}
                label="Cấp độ"
                onChange={(e) => setBtTN({ ...btTN, dapAn: e.target.value })}
              >
                <MenuItem value={1}>Câu A</MenuItem>
                <MenuItem value={2}>Câu B</MenuItem>
                <MenuItem value={3}>Câu C</MenuItem>
                <MenuItem value={4}>Câu D</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className={styles.exercise_btn}>
            <Button
              variant="contained"
              style={{ backgroundColor: "red" }}
              endIcon={<CancelIcon />}
              onClick={() => setOpenEditBTTN(false)}
            >
              Hủy
            </Button>

            <Button
              variant="contained"
              style={{ marginLeft: "20px" }}
              endIcon={<SaveIcon />}
              onClick={handleEditBTTN}
            >
              Lưu
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default Exercise;
