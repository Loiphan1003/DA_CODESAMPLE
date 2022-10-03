import React from "react";
import loa from "../../../images/loa.jpg"
import balo from "../../../images/balo.jpg"
import sackhongday from "../../../images/sackhongday.png"
import tainghe from "../../../images/tainghe.png"
import styles from "./styles/phanthuong.module.css"

function PhanThuong() {
    return (
        <div className={styles.App_phanThuong}>
            <h2>Phần thưởng</h2>
            <p> Phần thưởng sẽ được trao tặng thông qua thẻ ngân hàng hoặc địa chỉ liên hệ được cung cấp cho CodeSample.</p>
            <div className={styles.App_hinhanhThuong} >
                <ul >
                    <li>
                        <p><b>Top 1: </b> Tai nghe Sony bluetooth & Loa bluetooth</p>
                    </li>
                    <li>
                        <p><b>Top 2: </b> Balo logitech</p>
                    </li>
                    <li>
                        <p><b>Top 3: </b> Sạc dự phòng</p>
                    </li>
                    <li>
                        <p><b>Top 4</b> - <b>Top 10: </b> 200.000 VND</p>
                    </li>
                    <li>
                        <p><b>Top 11</b> - <b>Top 50: </b> 50.000 VND</p>
                    </li>
                </ul>

                <div>
                    <img src={balo} alt=""></img>
                    <img src={loa} alt=""></img>
                    <img src={sackhongday} alt=""></img>
                    <img src={tainghe} alt=""></img>
                </div>
            </div>
        </div>
    )
}
export default PhanThuong