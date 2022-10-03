import { createSlice } from "@reduxjs/toolkit";

// Tao gia tri ban dau
const initialState = { cauHoiTracNghiem: [], cauHoiCode: [] };


const importDataSlice = createSlice({
    name: 'importData',
    initialState,

    reducers:{
        setCauHoiTracNghiem: (state, action) => {
            state.cauHoiTracNghiem = action.payload;
        },
        setCauHoiCode: (state, action) =>{
            state.cauHoiCode = action.payload;
        }
    }
})

export default importDataSlice;