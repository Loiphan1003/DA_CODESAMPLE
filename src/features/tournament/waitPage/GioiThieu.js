import React from "react";
import banner from "../../../images/logo_transparent.png"
import styles from "./styles/gioithieu.module.css"

function GioiThieu({ getElement }) {

  return (
    <div ref={getElement} className={styles.App_gioiThieu}>
      <h2>Thông tin giải đấu</h2>

      <div>
        
        <p><strong>Thể lệ</strong> cuộc thi sẽ gồm 10 câu hỏi liên quan đến các bài đã học trên trang web.</p>

        <div>
          <ul>
            <li>
              <p>Hỗ trợ</p>
              <p className={styles.discriptions}>Thí sinh thi được phép sử dụng các công cụ hỗ trợ như Google, Egde,..</p>
            </li>

            <li>
              <p>Lưu ý</p>
              <p className={styles.discriptions}>Thí sinh phải điền đầy đủ thông tin xác thực.</p>
              <p className={styles.discriptions}>Đánh giá cuối cùng của cuộc thi này sẽ được cập nhật trong vòng 3 ngày làm việc sau cuộc thi.</p>
              <p className={styles.discriptions}>Kết quả sẽ được xác thực về email mà thí sinh đã đăng ký. Sau đó kết quả sẽ được lên bảng xếp hạng.</p>
            </li>

            <li>
              <p>Xếp hạng</p>
              <p className={styles.discriptions}>Top 50 thí sinh có kết quả chính xác và nhanh nhất sẽ được công bố khi thời gian làm bài kết thúc.</p>
            </li>
          </ul>

          <img className={styles.banner} src={banner} alt=""></img>
        </div>

      </div>
    </div>
  )
}
export default GioiThieu;