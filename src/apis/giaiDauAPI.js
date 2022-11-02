import axiosClient from "./axiosClient";

const GiaiDauAPI = {
    getAll: (pageNumber, pageSize) =>{
        const url = `GiaiDau/getAll?PageNumber=${pageNumber}&PageSize=${pageSize}`
        return axiosClient.get(url);
    },
    getListToDay: () => {
        const url = `GiaiDau/getListToDay`;
        return axiosClient.get(url);
    },
    getAllGiaiDauByIdGiangVien: (id, pageNumBer, pageSize) => {
        const url = `GiaiDau/getAllGiaiDauByIdGiangVien?id=${id}&PageNumber=${pageNumBer}&PageSize=${pageSize}`
        return axiosClient.get(url,{id}, {pageNumBer}, {pageSize});
    },
    AddGiaiDau: (GiaiDau_Custom) => {
        const url = `GiaiDau/AddGiaiDau`
        return axiosClient.post(url, GiaiDau_Custom);
    },
}

export default GiaiDauAPI;