import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSiteContext } from '../../context';
import headphone from '../../assets/svgs/icon-headphone.svg';
import logo from '../../assets/images/logo-new.png';
import heart from '../../assets/svgs/icon-heart-dark.svg';
import cart from '../../assets/svgs/icon-cart-dark.svg';
import arrow from '../../assets/svgs/icon-chevron-down.svg';

interface Props {
  menuItems: any[];
}

const Navbar = ({ menuItems }: Props) => {
  const router = useRouter();
  const { cartLength, fvtLength } = useSiteContext();

  const [open, setOpen] = useState<boolean>(false);
  const [isLogged, setLogged] = useState<boolean>(false);

  const openMenu = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (localStorage.getItem('qsd-auth-data')) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  });

  return (
    <div>
      <div className={`overlay ${open && 'show-overlay'}`} />
      {/* Top contact details */}
      <div id='top'>
        <div className='container-md top-header custom-responsive'>
          <div className='custom-row'>
            <Image src={headphone} alt='headphone' />
            <p id='phone'>
              <a href='tel:(949) 676 7522 (7522)'>(949) 676-SLAB (7522)</a>
            </p>
          </div>
          <div className='custom-row'>
            {/* <p className='top-item'>Create An Wholesale Account</p> */}
            <p className='top-item' onClick={() => router.push('/contact')}>
              Contact Us
            </p>
            <p className='top-item' onClick={() => router.push('/faq')}>
              FAQ
            </p>
          </div>
        </div>
      </div>
      {/* Logo and search section */}
      <div className='container-md logo-section custom-responsive'>
        <div className='custom-row'>
          <button className='menu-btn' onClick={openMenu}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='40'
              height='40'
              fill='currentColor'
              className='bi bi-list'
              viewBox='0 0 16 16'>
              <path
                fillRule='evenodd'
                d='M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z'
              />
            </svg>
          </button>
          <div className='logo'>
            <Link href='/'>
              <a>
                <Image src={logo} alt='logo' />
              </a>
            </Link>
          </div>
          <form role='search' action='/search' style={{ marginBottom: 20 }}>
            <div className='search-box'>
              <select className='custom-select'>
                <option>All</option>
                {/* <option>black</option> */}
              </select>
              {/* <div id='line' /> */}
              <input type='text' name='s' placeholder='Search...' className='search-input' />
              <button type='submit'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  fill='currentColor'
                  className='bi bi-search'
                  viewBox='0 0 16 16'>
                  <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' />
                </svg>
              </button>
            </div>
          </form>
        </div>
        <div className='custom-row'>
          <Link href='/wishlist' as='/wishlist'>
            <a className='link'>
              <div className='fvt'>
                <Image src={heart} alt='fvt' />
                <div id='badge'>
                  <p>{fvtLength}</p>
                </div>
              </div>
            </a>
          </Link>
          <Link href='/cart' as='/cart'>
            <a className='link'>
              <div className='cart'>
                <Image src={cart} alt='cart' />
                <div id='badge'>
                  <p>{cartLength}</p>
                </div>
              </div>
            </a>
          </Link>
          {isLogged ? (
            <button
              className='login-button'
              onClick={() => {
                localStorage.removeItem('qsd-auth-data');
                window.location.reload();
              }}>
              Log Out
            </button>
          ) : (
            <Link href='/login' as='/login'>
              <a className='link'>
                <button className='login-button'>Log In</button>
              </a>
            </Link>
          )}
        </div>
      </div>
      {/* Mobile search */}
      <div className='mobile-search-container'>
        <div className='mobile-search-box'>
          <select className='custom-select'>
            <option>All</option>
            {/* <option>black</option> */}
          </select>
          <input type='text' placeholder='Search...' className='search-input' />
          <button className='search-btn'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='18'
              height='18'
              fill='#fff'
              className='bi bi-search'
              viewBox='0 0 16 16'>
              <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Menu */}
      <div className={`container menu custom-responsive ${open && 'menu-open'}`}>
        <button className='close-btn' onClick={openMenu}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            fill='currentColor'
            className='bi bi-x-lg'
            viewBox='0 0 16 16'>
            <path d='M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z' />
          </svg>
        </button>

        {isLogged ? (
          <button
            className='mobile-login'
            onClick={() => {
              localStorage.removeItem('qsd-auth-data');
              window.location.reload();
            }}>
            Log Out
          </button>
        ) : (
          <Link href='/login' as='/login'>
            <a>
              <button className='mobile-login'>Log In</button>
            </a>
          </Link>
        )}
        <nav role='navigation'>
          <ul className='parent'>
            {menuItems.map(({ node }) => (
              <li
                id={`${router.pathname === '/' ? node.path : ''}`}
                className='mobile-home'
                key={node.label}>
                <Link href={node.path} as={node.path}>
                  <a>{node.label}</a>
                </Link>
                {node.childItems && node.childItems.edges.length > 0 && (
                  <>
                    &nbsp;
                    <Image src={arrow} height={11} width={11} alt='menu-arrow' />
                  </>
                )}
                {node.label === 'SORT BY' ? (
                  <>
                    {node.childItems && node.childItems.edges.length > 0 && (
                      <ul className='dropdown large-dropdown'>
                        <div className='sort-by'>
                          {node.childItems.edges.map((childItem: any) => (
                            <div key={childItem.node.label}>
                              <li>
                                <a href='#' className='menu-head'>
                                  {childItem.node.label}
                                </a>
                              </li>
                              {childItem.node.childItems &&
                                childItem.node.childItems.edges.length > 0 && (
                                  <div>
                                    {childItem.node.childItems.edges.map(
                                      (item: any, index: number) => (
                                        <li
                                          key={item.name}
                                          className={`${
                                            childItem.node.childItems.edges.length - 1 === index &&
                                            'border-bottom-0'
                                          }`}>
                                          <Link href={item.node.path} as={item.node.path}>
                                            <a>{item.node.label}</a>
                                          </Link>
                                        </li>
                                      )
                                    )}
                                  </div>
                                )}
                            </div>
                          ))}
                          {/* <div>
                            <li>
                              <a href='#' className='menu-head'>
                                BY SIZE
                              </a>
                            </li>
                            <div>
                              {sizes.map((item, index) => (
                                <li
                                  key={item.name}
                                  className={`${sizes.length - 1 === index && 'border-bottom-0'}`}>
                                  <Link
                                    href={'/product-category/size/[slug]'}
                                    as={`/product-category/size/${item.slug}`}>
                                    <a>{item.name}</a>
                                  </Link>
                                </li>
                              ))}
                            </div>
                          </div> */}
                        </div>
                      </ul>
                    )}
                  </>
                ) : (
                  <>
                    {node.childItems && node.childItems.edges.length > 0 && (
                      <ul className='dropdown'>
                        {node.childItems.edges.map((childItem: any, index: number) => (
                          <li
                            key={childItem.node.label}
                            className={`${
                              node.childItems.edges.length - 1 === index && 'border-bottom-0'
                            }`}>
                            <Link href={childItem.node.path} as={childItem.node.path}>
                              <a>{childItem.node.label}</a>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </li>
            ))}
            {/* <li id={`${router.pathname === '/shop' ? 'home' : ''}`}>
              <Link href='/shop'>
                <a>VIEW ALL PRODUCTS</a>
              </Link>
            </li>
            <li>
              <a href='#'>QUARTZ BY BRAND</a>
              &nbsp;
              <Image src={arrow} height={11} width={11} alt='menu-arrow' />
              <ul className='dropdown'>
                {topBrands.map((item, index) => (
                  <li
                    key={item.title}
                    className={`${topBrands.length - 1 === index && 'border-bottom-0'}`}>
                    <Link
                      href={'/product-category/by-brand/[slug]'}
                      as={`/product-category/by-brand/${item.slug}`}>
                      <a>{item.title}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <a href='#'>PORCELAIN BY BRAND</a>&nbsp;
              <Image src={arrow} height={11} width={11} alt='menu-arrow' />
              <ul className='dropdown'>
                {porcelainBrands.map((item, index) => (
                  <li
                    key={item.title}
                    className={`${porcelainBrands.length - 1 === index && 'border-bottom-0'}`}>
                    <Link
                      href={'/product-category/by-brand/[slug]'}
                      as={`/product-category/by-brand/${item.slug}`}>
                      <a>{item.title}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <a href='#'>SORT BY</a>&nbsp;
              <Image src={arrow} height={11} width={11} alt='menu-arrow' />
              <ul className='dropdown large-dropdown'>
                <div className='sort-by'>
                  <div>
                    <li>
                      <a href='#' className='menu-head'>
                        BY DESIGN
                      </a>
                    </li>
                    <div>
                      {colors.map((item, index) => (
                        <li
                          key={item.name}
                          className={`${colors.length - 1 === index && 'border-bottom-0'}`}>
                          <Link
                            href={`${
                              item.isDesign
                                ? '/product-category/by-design/[slug]'
                                : '/product-category/by-color/[slug]'
                            }`}
                            as={`${
                              item.isDesign
                                ? `/product-category/by-design/${item.slug}`
                                : `/product-category/by-color/${item.slug}`
                            }`}>
                            <a>{item.name}</a>
                          </Link>
                        </li>
                      ))}
                    </div>
                  </div>
                  <div>
                    <li>
                      <a href='#' className='menu-head'>
                        BY SIZE
                      </a>
                    </li>
                    <div>
                      {sizes.map((item, index) => (
                        <li
                          key={item.name}
                          className={`${sizes.length - 1 === index && 'border-bottom-0'}`}>
                          <Link
                            href={'/product-category/size/[slug]'}
                            as={`/product-category/size/${item.slug}`}>
                            <a>{item.name}</a>
                          </Link>
                        </li>
                      ))}
                    </div>
                  </div>
                </div>
              </ul>
            </li>
            <li id={`${router.pathname === '/contact' ? 'home' : ''}`}>
              <Link href='/contact' as='/contact'>
                <a>CONTACT US</a>
              </Link>
            </li>
            <li>
              <a href='#'>MORE</a>&nbsp;
              <Image src={arrow} height={11} width={11} alt='menu-arrow' />
              <ul className='dropdown'>
                <li className='border-bottom-0'>
                  <Link href='/faq' as='/faq'>
                    <a>FAQ</a>
                  </Link>
                </li>
              </ul>
            </li> */}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
