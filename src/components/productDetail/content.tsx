import React, { Fragment, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CryptoJS from 'crypto-js/aes';
import { useSiteContext } from '../../context';
import IconAdd from '../../assets/svgs/icon-add.svg';
import IconMinus from '../../assets/svgs/icon-minus.svg';
import IconFacebook from '../../assets/svgs/icon-facebook.svg';
import IconTwitter from '../../assets/svgs/icon-twitter.svg';
import IconInstagram from '../../assets/svgs/icon-instagram.svg';
import IconLinkedin from '../../assets/svgs/icon-linkedin.svg';
import toast from 'react-hot-toast';
import Sample from './sample';
interface Props {
  // id: number;
  // name: string;
  // categories: any[];
  // productType?: string;
  // attributes: any[];
  // price: string;
  // image: string;
  product: any;
}

const Content: React.FC<Props> = ({ product }) => {
  const { paSlabSizes, paColors, paFinishes, paOrigins, paThicknesses } = product;
  const { updateCartLength, list } = useSiteContext();
  const [price, setPrice] = useState<string>(
    product.price === null ? '' : product.price.split(',')[0].trim()
  );
  const [qty, setQty] = useState<number>(1);
  const [thick, setThick] = useState<string>('');

  const [selectedPrice, setSelectedPrice] = useState<string>('');
  const [variations, setVariations] = useState<any>([]);
  const [variationId, setVariationId] = useState<number>(0);
  const [showSample, setShowSample] = useState<Boolean>(false);
  useEffect(() => {
    setThick('');
    if (
      product.type === 'VARIABLE' &&
      product?.variations &&
      product?.variations.edges.length > 0
    ) {
      let list = [];
      list = product.variations.edges.map(({ node }: { node: any }) => {
        const item = node.attributes.edges.map(({ node }: { node: any }) => node.value);
        return {
          price: node.price,
          id: node.databaseId,
          combination: item.toString(),
          image: node.image.mediaItemUrl,
        };
      });
      setVariations(list);
    } else {
      setVariations([]);
    }

    setSelectedPrice('');
    setPrice(product.price === null ? '' : product.price.split(',')[0].trim());
  }, [product]);

  const _changeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const val = event.target.value;
    setThick(val);
    const getCombination = variations.find(
      (item: any) => item.combination.toLowerCase().trim() === val.toLowerCase().trim()
    );

    if (getCombination) {
      setSelectedPrice(getCombination.price.split('$')[1]);
      setVariationId(getCombination.id);
    } else {
      setSelectedPrice('');
    }
  };

  const _decreament = () => {
    if (qty === 1) return;
    setQty((pre) => pre - 1);
  };
  const _increament = () => {
    setQty((pre) => pre + 1);
  };

  const manageCart = (arr: any) => {
    const encryptText = CryptoJS.encrypt(
      JSON.stringify(arr),
      process.env.CART_SECRET_KEY || ''
    ).toString();

    localStorage.setItem('@key_product', encryptText);
    updateCartLength();
  };

  const _addCart = () => {
    const temp: any = [...list];
    let obj: any = {};
    if (product.type === 'VARIABLE' && variations.length > 0) {
      if (thick === '') {
        toast.error('Select Thickness');
        return;
      }
      obj = {
        product_id: product?.databaseId,
        image: product?.image?.mediaItemUrl,
        name: `${product?.name}`,
        price: selectedPrice ? selectedPrice : price,
        attribute: thick,
        quantity: qty,
        variationId: variationId,
      };
    } else {
      obj = {
        product_id: product?.databaseId,
        image: product?.image?.mediaItemUrl,
        name: `${product?.name}`,
        price: price,
        quantity: qty,
      };
    }
    if (temp === null) {
      manageCart([obj]);

      return;
    } else {
      const index = temp.findIndex((ob: any) => ob.product_id === obj.product_id);
      if (index !== -1) {
        if (obj?.variationId) {
          if (temp.findIndex((ob: any) => ob.variationId === obj.variationId) !== -1) {
            temp[index].quantity += obj.quantity;
            manageCart(temp);
          } else {
            temp.push(obj);
            manageCart(temp);
          }
        } else {
          temp[index].quantity += obj.quantity;
          manageCart(temp);
        }
        toast.success('Item added to cart!');
        return;
      }
      toast.success('Item added to cart!');

      temp.push(obj);
      manageCart(temp);
    }
  };
  const onClickHandler = () => {
    console.log('clicked');
    setShowSample(true);
  };
  return (
    <section className='product-base-content'>
      {showSample && <Sample setShowSample={setShowSample} />}
      <div className='breadcrumb'>
        <p>HOME / SIZE / {paSlabSizes?.nodes?.length > 0 && paSlabSizes?.nodes[0]?.name}</p>
      </div>
      <div className='title'>
        <h1>
          {product?.name} – {product?.productCategories?.edges[0]?.node.name}
        </h1>
      </div>
      <p className='price-range'>
        <span>
          <bdi>From ${price}</bdi>
        </span>
      </p>
      <div className='stone-meta'>
        {paColors?.nodes?.length > 0 && (
          <div className='row'>
            <div className='col-sm-6'>
              <p>
                <strong>Colour Name :</strong>
              </p>
            </div>
            <div className='col-sm-6'>
              <p>{paColors?.nodes[0]?.name}</p>
            </div>
          </div>
        )}
        <div className='row'>
          <div className='col-sm-6'>
            <p>
              <strong>Brand :</strong>
            </p>
          </div>
          <div className='col-sm-6'>
            <p>{product?.productCategories?.edges[0].node.name}</p>
          </div>
        </div>
        {paSlabSizes?.nodes?.length > 0 && (
          <div className='row'>
            <div className='col-sm-6'>
              <p>
                <strong>Slab Size : </strong>
              </p>
            </div>
            <div className='col-sm-6'>
              <p>{paSlabSizes?.nodes[0]?.name}</p>
            </div>
          </div>
        )}
        {/* <div className='row'>
          <div className='col-sm-6'>
            <p>
              <strong>Thickness :</strong>
            </p>
          </div>
          <div className='col-sm-6'>
            {thickness.length > 0 && (
              <p>
                {thickness[0]?.options.map((item: string, index: number) => (
                  <Fragment key={index}>
                    {item} {thickness[0]?.options.length - 1 !== index && 'and'}
                  </Fragment>
                ))}
              </p>
            )}
          </div>
        </div> */}
        {paFinishes?.nodes?.length > 0 && (
          <div className='row'>
            <div className='col-sm-6'>
              <p>
                <strong>Finish :</strong>
              </p>
            </div>
            <div className='col-sm-6'>
              <p>{paFinishes?.nodes[0]?.name}</p>
            </div>
          </div>
        )}
        {paOrigins?.nodes?.length > 0 && (
          <div className='row'>
            <div className='col-sm-6'>
              <p>
                <strong>Origin :</strong>
              </p>
            </div>
            <div className='col-sm-6 text-uppercase'>
              <p>{paOrigins?.nodes[0]?.name}</p>
            </div>
          </div>
        )}
      </div>
      <div className='sample-order-link cursor-pointer' onClick={onClickHandler}>
        <a href='#'>Click Here To Order A Sample </a>
      </div>
      {product?.type === 'VARIABLE' && (
        <Fragment>
          {paThicknesses?.nodes?.length > 0 && (
            <div className='form-group variation-form'>
              <label>Select Thickness:</label>
              <select className='form-control' onChange={_changeSelect}>
                <option value=''>choose an option</option>
                {paThicknesses?.nodes?.map((item: any) => (
                  <option value={item?.slug} key={item?.slug}>
                    {item?.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </Fragment>
      )}
      <div className='quantity'>
        <button className='btn' onClick={_decreament}>
          <Image src={IconMinus} alt='' />
        </button>
        <input className='text-center' type='text' value={qty} readOnly />
        <button className='btn' onClick={_increament}>
          <Image src={IconAdd} alt='' />
        </button>
      </div>
      <div className='price text-center'>
        <span>
          <bdi>{selectedPrice !== '' ? `$${selectedPrice}` : `From $${price}`}</bdi>
        </span>
      </div>
      {price && (
        <div className='text-center'>
          <button className='btn btn-primary btn-cart' onClick={_addCart}>
            Add to Cart
          </button>
        </div>
      )}
      <div className='social-share d-flex justfiy-content-center align-items-center'>
        <div className='d-flex m-auto'>
          <div className='mx-1'>
            <Image className='mr-18' src={IconFacebook} alt='' />
          </div>
          <div className='mx-1'>
            <Image className='mr-18' src={IconTwitter} alt='' />
          </div>
          <div className='mx-1'>
            <Image className='mr-18' src={IconLinkedin} alt='' />
          </div>
          <div className='mx-1'>
            <Image src={IconInstagram} alt='' />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content;
