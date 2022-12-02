import axiosClient from "./axiosClient";

const PhongHocAPI = {
    getByUid: (uID) =>{
        const url = `PhongHoc/getByUid?uID=${uID}`;
        return axiosClient.get(url,{uID});
    },
    joinPhongHoc: (uID,id) => {
        const url = `PhongHoc/addUser?uID=${uID}&id=${id}`;
        return axiosClient.post(url,{uID,id});
    },
    getOneByID:(id)=>{
        const url = `PhongHoc/getOne?id=${id}`;
        return axiosClient.get(url,{id});
    },
    getByUidGiangVien: (uID) => {
        const url = `PhongHoc/getByUidGiangVien?uID=${uID}`;
        return axiosClient.get(url,{uID});
    },
    createRoom: (room) => {
        const url = 'PhongHoc/createRoom';
        return axiosClient.post(url, room);
    },
    getMmeber: (idRoom) => {
        const url = `PhongHoc/getMember?IdPhong=${idRoom}`;
        return axiosClient.get(url);
    },
    removeMembers: (members) => {
        const url = `PhongHoc/removeMembers`;
        return axiosClient.post(url, members);
    },
    addListMembers: (members, roomId) => {
        const url = `PhongHoc/addListMembers?roomId=${roomId}`;
        return axiosClient.post(url , members, {roomId})
    },
    addOneMember: (email, idRoom) => {
        const url = `PhongHoc/addUser?email=${email}&id=${idRoom}`;
        return axiosClient.post(url);
    }
}

export default PhongHocAPI;