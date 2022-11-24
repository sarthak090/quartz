import React from 'react';
interface Props {
  itemCount: number;
}
const Header: React.FC<Props> = ({ itemCount }) => {
  return (
    <header className='header-container'>
      <h1>Shopping Cart</h1>

      <ul className='breadcrumb'>
        <li>Home</li>
        <li>Shopping Cart</li>
      </ul>

      <span className='count'>{itemCount} items in the bag</span>
    </header>
  );
};
export default Header;
