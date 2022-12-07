import React, { useEffect } from "react";
import "../waitPage/styles/ranking.css";
import BaiLamGiaiDauAPI from "../../../apis/baiLamGiaiDauAPI";
import { useState } from "react";
import { useParams } from "react-router-dom";
import GiaiDauAPI from "../../../apis/giaiDauAPI";
import { useDispatch, useSelector } from "react-redux";
import taiKhoanAPI from "../../../apis/taiKhoanAPI";
import matchSlice from "../../../redux/matchSlice";

function Ranking(){
    const dispatch = useDispatch();
    let UserRedux = useSelector((state) => state.match.member);
    let params = useParams();
    const idDe = params.idDeCauHoiGiaiDau;
    const [bailam, setBailams] = useState([])                                     
    const [giaiDau, setGiaiDau] = useState();

    useEffect(() => {
        const data = async() => {
            const response = await BaiLamGiaiDauAPI.getAll(idDe);
            if(response !== null)
            {
                response.data.sort(function(a,b){
                    let date1 = new Date(a.ngayLam); 
                    let date2 = new Date(b.ngayLam); 
                    const dateTimeStart1 = new Date(date1.toString().split("GMT")[0]).getTime();
                    const dateTimeStart2 = new Date(date2.toString().split("GMT")[0]).getTime();
                    if(a.diemTong > b.diemTong)
                    {
                        return -1;
                    }
                    if(a.diemTong === b.diemTong)
                    {
                        if(dateTimeStart1 < dateTimeStart2)
                        {
                            return -1;
                        }
                    }
                    return 0;
                })
                setBailams(response.data);
            }
        }
        data();

        const data2 = async() => {
            const response1 = await GiaiDauAPI.getThongtinGiaiDauByIdDe(idDe);
            if(response1 !== null)
            {
                setGiaiDau(response1.data);
            }
        }
        data2();

    },[idDe]);

    useEffect(() => {
        bailam.map((i, index) => {
            const data = async() => {
                const res = await taiKhoanAPI.getNameTK(i.uIdnguoiDung);
                let obj  = {
                    name: res.data.tenHienThi,
                    uId: res.data.uidTaiKhoan,
                };
                if(UserRedux.length !== 0){
                    UserRedux.map(d => {
                        if(d.uId !== obj.uId){
                            return dispatch(matchSlice.actions.setMemeber(obj));
                        }
                })
                }else{
                    dispatch(matchSlice.actions.setMemeber(obj));
                }
            }
            data();
        });
    },[bailam.length])

    console.log("userredux",UserRedux);
    
    const handleDisplayName = (u) =>{
      let nameU = "";
      UserRedux.map(i => {
          if(i.uId === u){
              return nameU = i.name;
          }
          return null;
      })
      return nameU;
    }
    
    return(
        <div className="page-leaderboard">
            <div id="contain-all" className=" slideout-panel">
                <div className="banner featured" data-eyebrow>
                <a id="ga-6cb519" className="banner--close dark a" href="leaderboard.html#" />
                </div>
                <section className="hero hero--inverse section">
                </section>
                <section className="leaderboard-progress section">
                <div className="contain text-center">
                    <img alt="Android Basics Leaderboard" className="mb-2 img" src="https://d125fmws0bore1.cloudfront.net/assets/svgs/icon_trophy_leaderboard-3442a4b2312e6cdd02aa9870e636dc082890277a6267c4ed986a750fef7cbb35.svg" />
                    <h2 className="h2">Bảng xếp hạng giải đấu</h2>
                    <p className="lead p">Chạy đua để giành 1 trong 100 phần thưởng của Code Sample. Theo dõi tốc độ của bạn, theo kịp những người cùng học và tận hưởng niềm vui!</p>
                </div>
                </section>
                <section className="ranking section">
                <div className="contain">
                    <div className="ranking-table">
                    <div className="ranking-table-header-row">
                        <div className="ranking-table-header-data h6">Hạng</div>
                        <div className="ranking-table-header-data h6">Tên</div>
                        <div className="ranking-table-header-data h6">Thời gian</div>
                    </div>
                    {bailam.map((i, index) => (
                        <div>
                            {index + 1 <= 3 &&
                                <div className={index + 1 === 1 && "ranking-table-row-leader-1" || index + 1 === 2 && "ranking-table-row-leader-2" || index + 1 === 3 && "ranking-table-row-leader-3"}>
                                    <div className={index + 1 === 1 && "ranking-table-data-leader-1" || index + 1 === 2 && "ranking-table-data-leader-2" || index + 1 === 3 && "ranking-table-data-leader-3"}>
                                        <div className={index + 1 === 1 && "medal-gold" || index + 1 === 2 && "medal-silver" || index + 1 === 3 && "medal-bronze"} />
                                    </div>
                                    <div className={index + 1 <= 3 && "ranking-table-data"}>{handleDisplayName(i.uIdnguoiDung)}</div>
                                    <div className={index + 1 <= 3 && "ranking-table-data"} style={{display: "flex"}}>{i.ngayLam.split("T")[1]}<div className={index + 1 <= 3 && "complete"} />
                                </div>
                                </div>
                            }
                        </div>
                    ))}
                    <div className={bailam.length > 3 && "ranking-table-body"}>
                        {bailam.map((j, index) => (
                            <div>
                                {index + 1 >= 4 &&
                                    <div className="ranking-table-row">
                                        <div className="ranking-table-data">{index + 1}</div>
                                        <div className="ranking-table-data">
                                            {handleDisplayName(j.uIdnguoiDung)}
                                        </div>
                                        <div className="ranking-table-data">
                                            <div className="complete" />
                                        </div>
                                    </div>
                                }
                            </div>
                        ))}
                    </div>
                    </div>
                </div>
                </section>
            </div>
            <div style={{height:"100px"}}></div>
        </div>
    );
}

export default Ranking;