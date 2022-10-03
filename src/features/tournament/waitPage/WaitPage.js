import React, { useRef, useEffect } from 'react';
import Header from './Header.js'
import PhanThuong from './PhanThuong.js'
import GioiThieu from './GioiThieu'

function WaitPage() {
  const scrollRef = useRef();
  const scrollHead = useRef();

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
  }, [])

  return (
    <div className="App">
      <Header isClick={scrollToInfo} getHeader={scrollHead} />
      <GioiThieu getElement={scrollRef} />
      <PhanThuong />
    </div>
  );
}

export default WaitPage;