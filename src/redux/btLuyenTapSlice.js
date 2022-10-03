import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BaiTapLuyenTapAPI from "../apis/baiTapLuyenTapAPI";


const initialState = { data: [], questions: [], searchLevel: 0, searchText: "", totalPages: 0, status: "" };


export const responseAPI = createAsyncThunk("Call API", async () => {
    
    const pageNumber = 1;
    const pageSize = 2;
    const response = await BaiTapLuyenTapAPI.getAll(pageNumber, pageSize);

    return [response.data, response.data.data, response.data.totalPages];
}
);


const btLuyenTapSlice = createSlice({
    name: 'btLuyenTap',
    initialState,

    reducers: {
        setListQuestion: (state, action) => {
            state.questions = action.payload;
        },
        levelFilterChange: (state, action) => {
            state.searchLevel = action.payload;
        },
        searchTextChange: (state, action) => {
            state.searchText = action.payload;
        }
    },

    extraReducers: (builder) => {
        // // builder.addCase(fetchData.pending, (state) => {
        // //     state.loading = true;
        // // });
        builder.addCase(responseAPI.fulfilled, (state, action) => {
            // state.loading = false;
            state.data = action.payload[0]
            state.questions = action.payload[1];
            state.totalPages = action.payload[2];
        });
        // builder.addCase(response.rejected, (state) => {
        //     state.status = false;
        // });
    }

})

export default btLuyenTapSlice;