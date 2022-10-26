import axiosClient from "./axiosClient";

const GiaiDauAPI = {
    getAll: (pageNumber, pageSize) =>{
        const url = `GiaiDau/getAll?PageNumber=${pageNumber}&PageSize=${pageSize}`
        return axiosClient.get(url);
    },
    getListToDay: () => {
        const url = `GiaiDau/getListToDay`;
        return axiosClient.get(url);
    }
}

export default GiaiDauAPI;