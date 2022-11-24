import React, { useState } from 'react';
import Image from 'next/image';
import IconAdd from '../../assets/svgs/icon-add.svg';
import IconMinus from '../../assets/svgs/icon-minus.svg';

interface Props {
  title: string;
  content: string;
}

const Accordion: React.FC<Props> = ({ title, content }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className='accordion-item'>
      <div className='accordion-title' onClick={() => setIsActive(!isActive)}>
        <h5>{title}</h5>
        <div className='accordion-header-icon'>
          {isActive ? (
            <Image src={IconMinus} objectFit='contain' alt='Minimize' />
          ) : (
            <Image src={IconAdd} objectFit='contain' alt='Expand' />
          )}
        </div>
      </div>
      {isActive && (
        <div className='accordion-content-container'>
          <p className='accordion-content'>{content}</p>
        </div>
      )}
    </div>
  );
};

export default Accordion;
