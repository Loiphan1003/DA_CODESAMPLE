import axiosClient from "./axiosClient";

const MonHocAPI = {
    getAll: (pageNumber, pageSize) => {
        const url = `MonHoc/getAll?PageNumber=${pageNumber}&PageSize=${pageSize}`
        return axiosClient.get(url)
    },
    AddMonHoc: (MonHoc) => {
        const url = `MonHoc/AddMonHoc`;
        return axiosClient.post(url, MonHoc);
    },
    EditMonHoc: (MonHoc) => {
        const url = `MonHoc/EditMonHoc`;
        return axiosClient.put(url, MonHoc);
    },
    DeleteMonHoc: (id) => {
        const url = `MonHoc/DeleteMonHoc?id=${id}`
        return axiosClient.delete(url, {id});
    },
    getAllMH: () => {
        const url = `MonHoc/getAllMH`;
        return axiosClient.get(url);
    }
}

export default MonHocAPI