import { createSlice } from "@reduxjs/toolkit";

// Tao gia tri ban dau
const initialState = { member: [] };


const roomSlice = createSlice({
    name: 'roomSlice',
    initialState,

    reducers:{
        setMember: (state, action) => {
            state.member = action.payload;
        },
        
    }
})

export default roomSlice;