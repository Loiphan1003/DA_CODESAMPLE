import { configureStore } from "@reduxjs/toolkit";
import createTestSlice from "./createTestSlice";
import doTestSlice from "./doTestSlice";
import btLuyenTapSlice from "./btLuyenTapSlice";
import giaiDauSlice from "./giaiDauSlice";
import theorySlice from './theorySlice';
import importDataSlice from './importDataSlice';
import testOverviewSlice from "./testOverviewSlice";
import roomSlice from "./roomSlice";
import matchSlice from "./matchSlice";

const store = configureStore({
    reducer: {
        createTest: createTestSlice.reducer,
        doTest: doTestSlice.reducer,
        btLuyenTap: btLuyenTapSlice.reducer,
        giaiDau: giaiDauSlice.reducer,
        theory: theorySlice.reducer,
        // Them slice cua import data
        importData: importDataSlice.reducer,
        testOverview: testOverviewSlice.reducer,
        roomSlice: roomSlice.reducer,
        match: matchSlice.reducer
    },
    devTools: true

})

export default store;
