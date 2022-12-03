import axiosClient from "./axiosClient";

const DeCauHoiGiaiDauAPI = {
    addDeCauHoiGiaiDau: (body) =>{
        const url = 'DeCauHoiGiaiDau';
        return axiosClient.post(url,body);
    },
    getListCauHoiGiaiDau: (uID) =>{
        const url = `DeCauHoiGiaiDau/getListCauHoiGiaiDau?uID=${uID}`
        return axiosClient.get(url, {uID});
    },
    getDeCauHoiGiaiDauByID: (id) =>{
        const url = `DeCauHoiGiaiDau/getDeCauHoiGiaiDauByID?id=${id}`
        return axiosClient.get(url, {id});
    },
    getIdDeCauHoiGiaiDauByID: (id) =>{
        const url = `DeCauHoiGiaiDau/getIdDeCauHoiGiaiDauByID?id=${id}`
        return axiosClient.get(url, {id});
    },
    getGiauDauByIdDeThi: (id) =>{
        const url = `DeCauHoiGiaiDau/getGiauDauByIdDeThi?id=${id}`
        return axiosClient.get(url, {id});
    },
    countSlCau: (id) =>{
        const url = `DeCauHoiGiaiDau/countSlCau?id=${id}`
        return axiosClient.get(url, {id});
    }
}

export default DeCauHoiGiaiDauAPI;
