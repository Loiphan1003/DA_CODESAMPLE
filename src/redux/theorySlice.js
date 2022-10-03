import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MonHocAPI from '../apis/monHocAPI';

export const callApiGetListTheory = createAsyncThunk("Get data Theory", async () => {
    const pageNumber = 1;
    const pageSize = 1;
    const response = await MonHocAPI.getAll(pageNumber, pageSize);
    return [response.data.data, response.data.totalPages];
})



const initialState = { data: [], listTheory: [], searchText: "", totalPages: 0 };

const theorySlice = createSlice({
    name: 'theory',
    initialState,
    reducers: {
        searchTextChange: (state, action) => {
            state.searchText = action.payload;
        },
        setListTheory: (state, action) => {
            state.data = action.payload;
        }

    },
    extraReducers: (builder) => {
        builder.addCase( callApiGetListTheory.fulfilled, (state, action) => {
            state.data = action.payload[0];
            state.totalPages = action.payload[1];
        } ) 
    }
})

export default theorySlice;