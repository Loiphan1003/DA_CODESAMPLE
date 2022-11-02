import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import GiaiDauAPI from "../apis/giaiDauAPI";

export const callApiGetListMatch = createAsyncThunk("Get data Match", async () => {
    const uId = JSON.parse(localStorage.getItem('uId'));
    const pageNumber = 1;
    const pageSize = 8;
    const response = await GiaiDauAPI.getAllGiaiDauByIdGiangVien(uId, pageNumber, pageSize);
    response.data.data.map(item => {
        item.thoiGianBatDau = formatDateTime(item.thoiGianBatDau);
        item.thoiGianKetThuc = formatDateTime(item.thoiGianKetThuc);
        return item;
    })
    return [response.data.data, response.data.totalPages];
})

const checkDate = (a) => {
    if(0<a && a<10)
    {
        return `0${a}`;
    }
    return a;
}

export const formatDateTime = (dateTime) =>{
    let date = new Date(dateTime);
    let format = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${checkDate(date.getHours())}:${checkDate(date.getMinutes())}:${checkDate(date.getSeconds())}`;
    return format;
}

const initialState = { data: [], listMatch: [], searchText: "", totalPages: 0 , member: []};
const matchSlice = createSlice({
    name: 'match',
    initialState,
    reducers: {
        searchTextChange: (state, action) => {
            state.searchText = action.payload;
        },
        setListMatch: (state, action) => {
            state.data = action.payload;
        },
        setMemeber: (state, action) => {
            state.member = [...state.member, action.payload];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(callApiGetListMatch.fulfilled, (state, action) => {
            state.data = action.payload[0];
            state.totalPages = action.payload[1];
        }) 
    }
})

export default matchSlice;
