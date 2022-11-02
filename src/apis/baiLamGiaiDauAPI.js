import axiosClient from "./axiosClient";

const BaiLamGiaiDauAPI = {
    addBaiLam: (body) => {
        const url = 'BaiLamGiaiDau'
        return axiosClient.post(url, body);
    }
}

export default BaiLamGiaiDauAPI;
