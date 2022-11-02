import React, {useState, useEffect} from "react";
import styles from "./doTest.module.css";
import Button from '@mui/material/Button';
import ResultView from '../../../features/test/ResultView';
import { useParams } from 'react-router-dom';
import { useStateIfMounted } from "use-state-if-mounted";
import { useSelector } from 'react-redux';
import CauCode from "./cauCode";
import FlagIcon from '@mui/icons-material/Flag';
import { faChevronLeft, faChevronRight, faCircle, faMedal, faRankingStar, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TestMutipleQuestion from '../../../features/test/TestMutipleQuestion';
import DeCauHoiGiaiDauAPI from "../../../apis/deCauHoiGiaiDauAPI";
import BaiLamGiaiDauAPI from "../../../apis/baiLamGiaiDauAPI";
import {HubConnectionBuilder, LogLevel} from '@microsoft/signalr';
import MessageContainer from "./MessageContainer";

function DoTest(){
    const [connection, setConnection] = useState();
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);

    const params = useParams();
    const [collapse, setCollapse] = useState(false);
    const [select, setSelect] = useState();
    const [test,setTest] = useStateIfMounted({});
    const [questions,setQuestions] = useStateIfMounted([]);
    const [resultView,setResultView] = useState(false);
    const [tongDiem,setTongDiem] = useState(0);
    const [giaiDau, setGiaiDau] = useState();
    const [timeEnd, setTimeEnd] = useState();
    const [time, setTime] = useState();
    const idDeMatch = params.idDeMatch;
    let answers = useSelector((state) => state.doTest.answer);
    answers = [...answers].sort((a,b) => a.stt-b.stt);
    const uId = JSON.parse(localStorage.getItem('uId'));

    const user = uId;
    const room = idDeMatch;

    useEffect(()=>{
        const joinRoom = async () => {
            try {
                const connection = new HubConnectionBuilder()
                    .withUrl("https://localhost:44307/socket")
                    .configureLogging(LogLevel.Information)
                    .build();
                connection.on("ReceiveMessage", (uId, message) => {
                    setMessages(messages => [...messages, { uId, message }]);
                    // setMessages({ uId, message });
                });
            
                connection.on("UsersInRoom", (users) => {
                    setUsers(users);
                });
            
                connection.onclose(e => {
                    setConnection();
                    setMessages({});
                    setUsers([]);
                });
                await connection.start();
                await connection.invoke("JoinRoom", { user, room });
                setConnection(connection);
            } catch (e) {
                console.log(e);
            }
        }
        joinRoom();

        const getGiaiDau = async ()=>{
            const response1 = await DeCauHoiGiaiDauAPI.getGiauDauByIdDeThi(idDeMatch);
            let date = new Date(response1.data.thoiGianKetThuc); 
            setTimeEnd(date.toString().split("GMT")[0]);

            const dateTimeStart = new Date(date.toString().split("GMT")[0]).getTime();
            const dateTimeChange = setInterval(function () {
            // Lấy thời gian hiện tại
            let now = new Date().getTime();
            // Lấy số thời gian chênh lệch
            let distance = dateTimeStart - now;
            // Tính toán số ngày, giờ, phút, giây từ thời gian chênh lệch
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
            // HIển thị chuỗi thời gian trong thẻ p
            setTime(`${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây`);
            // Nếu thời gian kết thúc, hiển thị chuỗi thông báo
            if (distance < 0) {
                setTime("Thời gian đã kết thúc!");
                return clearInterval(dateTimeChange);
            }
            }, 1000);
        }
        getGiaiDau();
    },[])


    useEffect(() => {
        const getBaiKiemTra = async ()=>{
            const response = await DeCauHoiGiaiDauAPI.getDeCauHoiGiaiDauByID(idDeMatch);
            setTest(response.data);
            setQuestions(response.data.listCauHoi)
        }
        getBaiKiemTra();
        
    }, [idDeMatch]);
    
    const sendMessage = async (message) => {
        try {
            await connection.invoke("SendMessage", message);
            console.log("thanh cong SendMessage: ", message);
        } catch (e) {
            console.log(e);
        }
    }
    
    const closeConnection = async () => {
        try {
            await connection.stop();
        } catch (e) {
            console.log(e);
        }
    }

    const handleNopBai = () => {
        setResultView(true);
        let totalScore = answers.reduce((sum, answer) => sum+answer.diemDatDuoc, 0);
        totalScore = Math.round(totalScore*10)/10;
        setTongDiem(totalScore);
              const saveBaiLamKiemTra = async()=>{
                try {
                  const response = await BaiLamGiaiDauAPI.addBaiLam({
                    tongDiem : totalScore,
                    uId: uId,
                    idDeKiemTra: idDeMatch,
                    lsCauTraLoi: answers.map((answer) => ({
                                              id: answer.id,
                                              dapAn: answer.dapAn,
                                              loaiCauHoi: answer.loaiCauHoi,
                                              diem: answer.diemDatDuoc}))
                  });
                //   sendMessage(totalScore.toString());
                  if(response.data){
                    alert("Lưu bài làm kiểm tra thành công!");
                  }
                    
                } catch (error) {
                  console.log(error)
                }
              }
              saveBaiLamKiemTra();
    }

    const handleSelect = (index) => {
        setSelect(questions.at(index));
    }

    const getCountUser = (users) => {
        var sum = 0;
        for (let index = 0; index < users.length; index++) {
            sum++;
        }
        return sum;
    }

    return (
        <div className={styles.test} >
            <div className={collapse === true ? styles.left_frame_collapse : styles.left_frame} >
                <div className={collapse === true ? styles.left_container_collapse : styles.left_container} >
                    <div className={collapse === true ? styles.none : styles.left_header} >
                        <h3 style={{textAlign:"center"}}>Danh sách các câu</h3>
                        <div className={styles.left_name} >
                            <FontAwesomeIcon icon={faMedal} />
                            <FontAwesomeIcon icon={faTrophy} />
                            <FontAwesomeIcon icon={faMedal} />
                        </div>
                        <div className={styles.left_line} ></div>
                    </div>
                    <div className={collapse === true ? styles.left_question_collapse : styles.left_question} >
                    { collapse && <div className={collapse === true ? styles.question_item_collapse :styles.question_item} >
                        <FlagIcon sx={{color:"#81d671"}}/>
                        <div className={styles.left_line} ></div>
                    </div>}
                        { questions.map((data, index) => (
                            <div className={collapse === true ? styles.question_item_collapse :styles.question_item} key={index} onClick={() => handleSelect(index)}  >
                                
                                <p>{collapse === true ? 'C'+(data.stt) : `Câu hỏi ${data.stt}`}</p>
                                <div className={collapse === true ? styles.none : styles.question_discription} >
                                    Câu hỏi {data.loaiCauHoi === 0 ? 'trắc nghiệm' :'code' }, {data.diem} điểm
                                </div>
                                <div className={styles.left_line} ></div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.left_line} ></div>
                    <div className={styles.btn_collapse} onClick={() => setCollapse(p => !p)} >
                        <FontAwesomeIcon icon={collapse === true ? faChevronRight : faChevronLeft} />
                       { collapse || <p>Thu hẹp</p>  }
                    </div>
                </div>
            </div>

            <div className={styles.right_container} >

                <div className={styles.right_header} >
                   <div>
                        {resultView || <Button sx={{float:"right", backgroundColor: '#66d551'}} variant="contained"
                            onClick={handleNopBai}>
                            Nộp bài
                        </Button>}
                   </div>
                    <div className={styles.header_list} >
                        <div className={styles.header_items_list} >
                            <h3>Trạng thái</h3>
                            <div className={styles.header_status} >
                                <FontAwesomeIcon className={styles.status_icon_open} icon={faCircle} size='2xs' />
                                <p>Mở</p>
                            </div>
                        </div>
                        <div className={styles.header_items_list} >
                            <h3>Thời gian làm bài</h3>
                            <p>{time}</p>
                        </div>
                        <div className={styles.header_items_list} >
                            <h3>Tổng câu hỏi</h3>
                            <p>{questions.length}</p>
                        </div>
                        <div className={styles.header_items_list} >
                            <h3>Số người tham gia</h3>
                            <p>{getCountUser(users)}</p>
                        </div>
                    </div>
                    
                </div>

                <div className={styles.right_content} >
                    {(!!select && !resultView) &&  (select.loaiCauHoi === 1  ? <CauCode data={select} sendMessage={sendMessage}/> : <TestMutipleQuestion data={select} /> ) }
                    { resultView && <ResultView totalScore = {tongDiem} answers ={answers}></ResultView> }
                </div>
            </div>

            <div style={collapse === true ? {width:"285px"} : {width:"330px"}} className={styles.left_frame} >
                <div className={styles.left_container} >
                    <div className={styles.left_header} >
                        <h3 style={{textAlign:"center"}}>Bảng điểm giải đấu</h3>
                        <div className={styles.left_name} >
                            <FontAwesomeIcon icon={faMedal} />
                            <FontAwesomeIcon icon={faRankingStar} />
                            <FontAwesomeIcon icon={faMedal} />
                        </div>
                        <div className={styles.left_line} ></div>
                    </div>
                    <MessageContainer users={users} messages={messages}/>
                </div>
            </div>
            
        </div>
    );
}

export default DoTest;
