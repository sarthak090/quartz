import { useEffect, useState, useRef } from 'react';
import useScrollPosition from '../../hooks/useScrollPosition';
import useOutsideAlerter from '../../hooks/useOutsideAlerter';
export default function Popup() {
  const scrollPosition = useScrollPosition();
  const [isVisible, setIsVisible] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setIsVisible, setIsActive);
  useEffect(() => {
    setTimeout(() => {
      if (scrollPosition > 800) {
        return;
      } else {
        if (isActive) {
          console.log('running this');
          setIsVisible(true);
        }
      }
    }, 4000);
  }, []);
  useEffect(() => {
    if (scrollPosition > 785 && isActive) {
      console.log('running this 2');

      setIsVisible(true);
    }
  }, [scrollPosition]);
  if (isVisible) {
    return (
      <div id='overlay' className='   d-flex align-items-center justify-content-center  '>
        <div className='row p-2  justify-content-md-center rounded  bg-white' ref={wrapperRef}>
          <h3>Our Process</h3>
          <hr />
          <div className='col-12 d-flex    justify-content-center'>
            <video autoPlay controls style={{ width: '550px', height: '300px' }}>
              <source src='/shop.mp4' />
            </video>
          </div>

          <button className=' mt-2 px-2 btn btn-primary btn-shop text-white'>Shop Now</button>
        </div>
      </div>
    );
  }
  return <></>;
}
