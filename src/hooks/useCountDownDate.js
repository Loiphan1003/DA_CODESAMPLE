import React from 'react'

export default function useCountDownDate(dateTime) {
    const [time, setTime] = React.useState();

    React.useEffect(() => {
        // const dateTimeStart = new Date("Aug 30, 2023 17:59:59").getTime();

        if (dateTime !== null || dateTime !== undefined) {
            const dateTimeStart = new Date(dateTime).getTime();
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

                // document.getElementById("Count-time").innerHTML = days + " " + "ngày" + " " + hours + " " + "giờ"
                //   + " " + minutes + " " + "phút" + " " + seconds + " " + "giây";

                // Nếu thời gian kết thúc, hiển thị chuỗi thông báo
                if (distance < 0) {
                    setTime("Thời gian đếm ngược đã kết thúc!");
                    return clearInterval(dateTimeChange);

                    // document.getElementById("Count-time").innerHTML = "Thời gian đếm ngược đã kết thúc!";
                }
            }, 1000);

            return () => {
                setTime();
            }
        }else{
            setTime("null");
        }


    }, [dateTime])



    return time;
}
