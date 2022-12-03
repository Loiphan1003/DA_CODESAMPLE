import axiosClient from "./axiosClient";

const BaiLamGiaiDauAPI = {
    addBaiLam: (body) => {
        const url = 'BaiLamGiaiDau'
        return axiosClient.post(url, body);
    },
    getAll: (id) => {
        const url = `BaiLamGiaiDau/getAll?id=${id}`;
        return axiosClient.get(url, {id});
    }
}

export default BaiLamGiaiDauAPI;
