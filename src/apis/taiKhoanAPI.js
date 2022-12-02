import axiosClient from "./axiosClient";

const taiKhoanAPI = {
    // getByUid: (uID) =>{
    //     const url = `PhongHoc/getByUid?uID=${uID}`;
    //     return axiosClient.get(url,{uID});
    // },
   
    getOne: (uId) => {
        const url = `TaiKhoan/getOne?uId=${uId}`;
        return axiosClient.get(url);
    },

    updateInfo: (info) => {
        const url =`TaiKhoan/updateInfo`;
        return axiosClient.post(url, info);
    },
    taoTaiKhoan: (info) => {
        const url =`TaiKhoan/TaoTaiKhoan`;
        return axiosClient.post(url, info);
    },

    getNameTK: (uId) => {
        const url = `TaiKhoan/getNameTK?uid=${uId}`;
        return axiosClient.get(url, {uId});
    }
}

export default taiKhoanAPI;