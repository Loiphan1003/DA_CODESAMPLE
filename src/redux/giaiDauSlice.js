import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import GiaiDauAPI from "../apis/giaiDauAPI";

const initialState = { data: [], listTournament: [], listTournamentStartSoon: null , searchLevel: 0, searchText: "", totalPages: 0, status: "" };


export const responseAPI = createAsyncThunk("Call API Giai Dau", async () => {

    const pageNumber = 1;
    const pageSize = 5;
    const response = await GiaiDauAPI.getAll(pageNumber, pageSize);

    return [response.data, response.data.data, response.data.totalPages];
});

export const responseAPITrounamentSoonStart = createAsyncThunk("Call API giai dau sap vat dau", async () => {

    const response = await GiaiDauAPI.getListToDay();
    return response.data;
});


const giaiDauSilce = createSlice({
    name: 'giaiDau',
    initialState,

    reducers: {
        setListTournament: (state, action) => {
            state.listTournament = action.payload;
        },
        // levelFilterChange: (state, action) => {
        //     state.searchLevel = action.payload;
        // },
        // searchTextChange: (state, action) => {
        //     state.searchText = action.payload;
        // }
    },

    extraReducers: (builder) => {
        // // builder.addCase(fetchData.pending, (state) => {
        // //     state.loading = true;
        // // });
        builder.addCase(responseAPI.fulfilled, (state, action) => {
            // state.loading = false;
            state.data = action.payload[0]
            state.listTournament = action.payload[1];
            state.totalPages = action.payload[2];
        });
        builder.addCase(responseAPITrounamentSoonStart.fulfilled, (state, action) => {
            // state.loading = false;
            state.listTournamentStartSoon = action.payload;
        });
        // builder.addCase(response.rejected, (state) => {
        //     state.status = false;
        // });
    }

})

export default giaiDauSilce;