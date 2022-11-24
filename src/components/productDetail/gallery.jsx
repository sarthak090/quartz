import React, { useEffect } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
// import { useKeenSlider } from 'keen-slider/react';

import IconChevronLeft from '../../assets/svgs/icon-chevron-left.svg';
import IconChevronRight from '../../assets/svgs/icon-chevron-right.svg';

const settings = {
  arrows: true,
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  initialSlide: 0,
  // className: 'center slider variable-width',
  centerPadding: '60px',
  nextArrow: <ArrowRight />,
  prevArrow: <ArrowLeft />,
  responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const Gallery = ({ images, featuredImage }) => {
  const [previewImg, setPreviewImg] = React.useState(
    'https://cms.quartzstonedirect.com/wp-content/uploads/woocommerce-placeholder.png'
  );
  const [slides, setSlides] = React.useState([]);

  useEffect(() => {
    const unique = images.map((item) => item?.node?.mediaItemUrl);
    unique.unshift(
      featuredImage
        ? featuredImage
        : 'https://cms.quartzstonedirect.com/wp-content/uploads/woocommerce-placeholder.png'
    );
    setSlides([...unique]);
  }, [images]);

  useEffect(() => {
    if (featuredImage) {
      setPreviewImg(featuredImage);
    }
  }, [featuredImage]);

  return (
    <div className='gallery-section'>
      <div className='image-full-view'>
        <Image src={previewImg} alt='' layout='fill' objectFit='cover' />
      </div>

      <div
        style={{
          margin: 'auto',
          maxWidth: '80%',
        }}>
        <Slider {...settings}>
          {slides.map((item, index) => (
            <div key={index}>
              <div className='slider-thumbnail' onClick={() => setPreviewImg(item)}>
                <Image
                  src={item}
                  alt=''
                  layout='fill'
                  placeholder='blur'
                  blurDataURL='data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN0dXGrBwAC9QFQyw5Q+AAAAABJRU5ErkJggg=='
                  objectFit='cover'
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Gallery;

function ArrowLeft(props) {
  return (
    <div
      className={`arrow arrow--left ${props.disabled && 'arrow--disabled'}`}
      onClick={props.onClick}>
      <Image src={IconChevronLeft} alt='' />
    </div>
  );
}

function ArrowRight(props) {
  return (
    <div
      className={`arrow arrow--right ${props.disabled && 'arrow--disabled'}`}
      onClick={props.onClick}>
      <Image src={IconChevronRight} alt='' />
    </div>
  );
}
