import { createSlice } from "@reduxjs/toolkit";

// Tao gia tri ban dau
const initialState = { list: [], };


const testOverviewSlice = createSlice({
    name: 'testOverview',
    initialState,

    reducers:{
        setData: (state, action) => {
            state.list = action.payload;
        },
       
    }
})

export default testOverviewSlice;