import { configureStore } from "@reduxjs/toolkit";
import createTestSlice from "./createTestSlice";
import doTestSlice from "./doTestSlice";
import btLuyenTapSlice from "./btLuyenTapSlice";
import giaiDauSlice from "./giaiDauSlice";
import theorySlice from './theorySlice';
import importDataSlice from './importDataSlice';

const store = configureStore({
    reducer: {
        createTest: createTestSlice.reducer,
        doTest: doTestSlice.reducer,
        btLuyenTap: btLuyenTapSlice.reducer,
        giaiDau: giaiDauSlice.reducer,
        theory: theorySlice.reducer,
        // Them slice cua import data
        importData: importDataSlice.reducer,
    },
    devTools: true

})

export default store;
