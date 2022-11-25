import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baiTapLuyenTapAPI from "../apis/baiTapLuyenTapAPI";

const initialState = { listData: [], listDataDaLam: [] };

export const callApiGetListData = createAsyncThunk("Get data", async () => {
  const response = await baiTapLuyenTapAPI.getAllOver();
  return response.data;
});

export const callApiGetListIsWork = createAsyncThunk(
  "Lay danh sach bai da lam",
  async (id) => {
    const response = await baiTapLuyenTapAPI.getBaiTapDaLam(id);
    let arr = response.data;

    const layNhungBaiDaHoanThanh = arr.filter((i) => {
      return i.trangThai === true;
    });

    const locDuLieu = (arr, key1, key2) => {
      return [
        ...new Map(
          arr.map((item) => [item[key1], item] && [item[key2], item])
        ).values(),
      ];
    };

    return locDuLieu(layNhungBaiDaHoanThanh, "id", "ngonNgu");
  }
);

const userOverViewSlice = createSlice({
  name: "userOverView",
  initialState,
  reducers: {
    // addAnswer: (state, action) => {
    //     const ans = state.answer.find(element => element.id === action.payload.id&&element.loaiCauHoi===action.payload.loaiCauHoi)

    //     if(!!ans === false)
    //     {
    //         //them moi
    //         state.answer = [...state.answer,action.payload]
    //     }
    //     else{
    //         //sua lai gia tri
    //         const index = state.answer.indexOf(ans);
    //         state.answer = state.answer.map((item , i) =>{
    //             if(i === index)
    //                 return action.payload
    //             else
    //                 return item
    //         })
    //     }
    // },
    // clearAnswer: (state,action) => {
    //     state.answer  = action.payload;
    // }
    getListData: (state, action) => {
      state.listData = action.payload;
    },
    setDataDaLam: (state, action) => {
      state.listDataDaLam = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(callApiGetListData.fulfilled, (state, action) => {
      state.listData = action.payload;
    });
    builder.addCase(callApiGetListIsWork.fulfilled, (state, action) => {
      state.listDataDaLam = action.payload;
    });
  },
});

export default userOverViewSlice;
