import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import RatingStart from '../../assets/svgs/rating-star.svg';

interface Props {
  name: string;
  priceHtml: string;
  previewImg: string;
  slug: string;
}
const FooterProducts: React.FC<Props> = ({ name, priceHtml, previewImg, slug }) => (
  <Link href='/product/[slug]' as={`/product/${slug}`}>
    <a>
      <div className='footer-product'>
        <div className='img-class'>
          {previewImg && (
            <Image
              src={previewImg}
              alt=''
              layout='fill'
              placeholder='blur'
              blurDataURL='data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN0dXGrBwAC9QFQyw5Q+AAAAABJRU5ErkJggg=='
            />
          )}
        </div>
        <div className='base-content'>
          <h2>{name}</h2>
          <p className='price-range' dangerouslySetInnerHTML={{ __html: priceHtml }} />
          <div className='rating-bar'>
            <Image src={RatingStart} alt='' />
            <Image src={RatingStart} alt='' />
            <Image src={RatingStart} alt='' />
            <Image src={RatingStart} alt='' />
            <Image src={RatingStart} alt='' />
          </div>
        </div>
      </div>
    </a>
  </Link>
);

export default FooterProducts;
