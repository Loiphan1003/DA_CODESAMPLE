import React, { useRef, useEffect, useState } from 'react';
import Header from './Header.js'
import PhanThuong from './PhanThuong.js'
import GioiThieu from './GioiThieu'
import { useParams } from 'react-router-dom';
import { async } from '@firebase/util';
import DeCauHoiGiaiDauAPI from '../../../apis/deCauHoiGiaiDauAPI.js';
import GiaiDauAPI from '../../../apis/giaiDauAPI.js';

function WaitPage() {
  const params = useParams();
  const scrollRef = useRef();
  const scrollHead = useRef();
  const [idDe, setIdDe] = useState();
  const [giaiDau, setGiaiDau] = useState();
  const [slCau, setSlCau] = useState();
  let idGiaiDau = params.idGiaiDau;

  const scrollToInfo = () => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    // console.log("Click");
  }

  useEffect(() => {
    if (window.performance) {
      if (performance.navigation.type === 1) {
        scrollHead.current?.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
  },[idGiaiDau])

  useEffect(() => {
    const data = async() => {
      try {
        const response = await DeCauHoiGiaiDauAPI.getIdDeCauHoiGiaiDauByID(idGiaiDau);
        setIdDe(response.data);
      } catch (error) {
        console.log("ERROR: " + error);
      }
    }
    data();
  },[idGiaiDau])

  useEffect(() => {
    if(idDe !== undefined)
    {
      const dataCountCau = async() => {
        const response = await DeCauHoiGiaiDauAPI.countSlCau(idDe);
        if(response.data !== 0)
        {
          setSlCau(response.data);
        }
      }
      dataCountCau();
    }

    const dataGiaiDau = async() => {
      try {
          const response = await GiaiDauAPI.getThongTinGiaiDau(idGiaiDau);
          if(response.data !== null)
          {
            setGiaiDau(response.data);
          }
      } catch (error) {
        console.log("ERROR: " + error);
      }
    }
    dataGiaiDau();
  },[idDe])

  return (
    <div className="App">
      <Header isClick={scrollToInfo} getHeader={scrollHead} idDe={idDe} giaiDau={giaiDau} />
      <GioiThieu getElement={scrollRef} slCau={slCau}/>
      <PhanThuong />
    </div>
  );
}

export default WaitPage;