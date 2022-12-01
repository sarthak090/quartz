import Image from 'next/image';
import headphone from '../../assets/svgs/icon-headphone.svg';
import { useEffect, useRef } from 'react';

function useOutsideAlerter(ref: any, setShowSample: (v: Boolean) => void) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowSample(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}
interface Props {
  setShowSample: (v: Boolean) => void;
}
export default function Sample(props: Props) {
  const { setShowSample } = props;
  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSample(false);
  };
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setShowSample);

  return (
    <div id='overlay' className=' d-flex align-items-center justify-content-center '>
      <div
        ref={wrapperRef}
        className='bg-white  p-4 rounded'
        style={{
          width: '500px',
          maxWidth: '700px',
          maxHeight: '600px',
        }}>
        <form onSubmit={onFormSubmit}>
          <h3 className='my-4'>Fill The Form Below</h3>

          <div className='form-group'>
            <label htmlFor='name'>Your Name</label>
            <input type='text' className='form-control border' id='name' placeholder='name ' />
          </div>
          <div className='form-group'>
            <label htmlFor='exampleFormControlInput1'>Email address</label>
            <input
              type='email'
              className='form-control border'
              id='exampleFormControlInput1'
              placeholder='name@example.com'
            />
          </div>
          <button className=' mt-2 px-2 btn btn-primary btn-shop text-white'>Contact Me</button>
        </form>
        <hr />

        <h3>Contact Us</h3>

        <p>
          <Image src={headphone} alt='headphone' />

          <a href='tel:(949) 676 7522 (7522)'>(949) 676-SLAB (7522)</a>
        </p>
      </div>
    </div>
  );
}
