import React, {memo, useEffect} from "react";
import styles from './ItemDeThiMatch.module.css';
import classNames from 'classnames/bind'
import {  useDispatch } from 'react-redux';
import createTestSlice from "../../../redux/createTestSlice";
import BaiTapCodeAPI from "../../../apis/baiTapCodeAPI";
import BaiTapTN from '../../../apis/baiTapTN_API';
import { useStateIfMounted } from "use-state-if-mounted";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
const cx = classNames.bind(styles);

function ItemDeThiMatch({data, index}){
    const dispatch = useDispatch();
    const [question,setQuestion] = useStateIfMounted({});
    
    const handleDeleteQuestion = (data) => {
        dispatch(createTestSlice.actions.deleteQuestion(data))
    }

    useEffect(() => {
        console.log("call API con ", data.loaiCauHoi)
        if(data.loaiCauHoi === 0)
        {
            const getOneTN = async()=>{
                try {
                    const response = await BaiTapTN.getOne(data.id);
                    setQuestion(response.data);
                } catch (error) {
                    console.log("Fetch data error: ", error);
                }
            }
            getOneTN();
        }
        else
        {
            const getOneCode = async()=>{
                try {
                    const response = await BaiTapCodeAPI.getOne(data.id);
                    setQuestion(response.data);
                } catch (error) {
                    console.log("Fetch data error: ", error);
                }
            }
            getOneCode();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);


    return (
    <div className={cx('question')} >
        <div className={cx('header-ques')}>
            <div className={cx('header-ques-left')}>
                <h4 className={cx('number-ques')}>Câu {index+1}</h4>
                <span className={cx('scores')}>{data.diem} điểm</span>
                <span className={cx('type-ques')}>CODE</span>
            </div>
        </div>

        <h3 className={cx('name-ques')}>{question.deBai}</h3>
        <div className={cx('line')}></div>
        {
            <div>
                <h3 className={cx('ans-title')}>Ví dụ mẫu</h3>
                <div className={cx('sample-code')}>
                    <p>Input</p>
                    <div>{!!question.mauDauVao && question.mauDauVao.replace(/\\n/g,'\n')}</div>
                    <p>Output</p>
                    <div>{!!question.mauDauRa && question.mauDauRa.replace(/\\n/g,'\n')}</div>
                </div>
            </div>
        }
    </div>
  );
}

export default memo(ItemDeThiMatch);
