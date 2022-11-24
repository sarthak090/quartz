import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';
import RatingStart from '../../assets/svgs/rating-star.svg';
import IconHeart from '../../assets/svgs/icon-heart-fill.svg';
import IconHeartOutline from '../../assets/svgs/icon-heart-outline.svg';
import { useSiteContext } from '../../context';

interface Props {
  id: number;
  title: string;
  paSizes: any[];
  price: string;
  image: string;
  slug: string;
  updateFvt: () => void;
}

const Product: React.FC<Props> = ({ title, paSizes, price, image, slug, updateFvt, id }) => {
  const { wishList } = useSiteContext();

  const _addFvt = () => {
    const temp = localStorage.getItem('@fvtItems');
    const obj = {
      id: id,
      image: image,
      title: title,
      price: price,
      attributes: paSizes,
      slug: slug,
    };
    if (temp === null) {
      localStorage.setItem('@fvtItems', JSON.stringify([obj]));
      toast.success('Product added to Wishlist!');
      updateFvt();
      return;
    } else {
      const arr = JSON.parse(temp);
      if (arr.findIndex((ob: any) => ob.id === obj.id) !== -1) {
        const filtered = arr.filter((ob: any) => ob.id !== obj.id);
        localStorage.setItem('@fvtItems', JSON.stringify(filtered));
        updateFvt();
        toast.success('Product removed from Wishlist!');
        return;
      }
      toast.success('Product added to Wishlist!');

      arr.push(obj);
      localStorage.setItem('@fvtItems', JSON.stringify(arr));
      updateFvt();
    }
  };
  // check if product having in wishlist
  const isProductIncluded = (id: number) => {
    if (wishList.length > 0) {
      return wishList.findIndex((ob: any) => ob.id === id) !== -1;
    }
    return false;
  };
  return (
    <div className='col-sm-6 col-lg-4 col-xl-3'>
      <div className='product-item'>
        <div className='thumbnail'>
          <div className='product-thumbnail'>
            <div className='fvt-icon' onClick={_addFvt}>
              <Image
                src={isProductIncluded(id) ? IconHeart : IconHeartOutline}
                alt='heart'
                title='Add to Wishlist'
              />
            </div>
            <Link href='/product/[slug]' as={`/product/${slug}`}>
              <a>
                {image && (
                  <Image
                    src={image}
                    alt=''
                    layout='fill'
                    placeholder='blur'
                    blurDataURL='data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN0dXGrBwAC9QFQyw5Q+AAAAABJRU5ErkJggg=='
                  />
                )}
              </a>
            </Link>
          </div>
          {/* <div className='item-options'></div> */}
        </div>
        <div className='item-content'>
          <h2 className='title'>{title}</h2>
          {paSizes.length > 0 && <p className='dimension'>{paSizes[0]?.name}</p>}
          <div className='rating-bar'>
            <div className='star'>
              <Image src={RatingStart} alt='' />
            </div>
            <div className='star'>
              <Image src={RatingStart} alt='' />
            </div>
            <div className='star'>
              <Image src={RatingStart} alt='' />
            </div>
            <div className='star'>
              <Image src={RatingStart} alt='' />
            </div>
            <div className='star'>
              <Image src={RatingStart} alt='' />
            </div>
          </div>
          <p className='price-range' dangerouslySetInnerHTML={{ __html: price }}></p>
          <Link href='/product/[slug]' as={`/product/${slug}`}>
            <a className='btn btn-primary btn-shop'>Shop Now</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
