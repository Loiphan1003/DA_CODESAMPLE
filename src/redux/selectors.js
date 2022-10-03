import { createSelector } from "@reduxjs/toolkit";

export const fillterLevel = (state) => state.btLuyenTap.searchLevel;
export const practiceQuestionList = (state) => state.btLuyenTap.questions;
const searchTextPractice = (state) => state.btLuyenTap.searchText;
const searchTextTheory = (state) => state.theory.searchText;
const theoryList = (state) => state.theory.data;



const findValueInArrayPractice = (value1, level, title) => {
    const listQuestions = []
    if(title === "" && level === 0){
        return value1;
    }

    if(title === "" && level !== 0){
        value1.map(bt => {
            if (bt.doKho === level) {
                return listQuestions.push(bt);
            }else{
                return [];
            }
        }) 
    }

    if(title !== "" && level !== 0){
        value1.map(bt => {
            if (bt.tieuDe.includes(title) && bt.doKho === level) {
                return listQuestions.push(bt);
            }
            return [];
        }) 
    }

    if(title !== "" && level === 0){
        value1.map(bt => {
            if (bt.tieuDe.includes(title)) {
                return listQuestions.push(bt);
            }
            return [];
        }) 
    }
    return listQuestions;
}

const practiceRemainingSelector = createSelector(
    fillterLevel,
    searchTextPractice,
    practiceQuestionList,

    (searchLevel, searchText, btLuyenTap) => {
        return findValueInArrayPractice(btLuyenTap, searchLevel, searchText);
    }
)

const theoryRemainingSelector = createSelector(
    searchTextTheory,
    theoryList,
    (searchText, theorys) => {
        if(searchText !== ""){
            let list = [];
            theorys.map(
                (lt) => {
                    if(lt.tenMonHoc.includes(searchText)){
                        list.push(lt);
                    }
                    return [];
                }
            )
            return list;
        } else{
            return theorys;
        }
    }
)


export { practiceRemainingSelector, theoryRemainingSelector };