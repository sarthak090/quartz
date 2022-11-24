import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import OutDoorCollection from '../../assets/images/outdoor-collection.png';
import MarbleLook from '../../assets/images/marble-look.png';
import BookMatched from '../../assets/images/book-matched.png';

const list = [
  { title: 'OutDoor Collection', banner: OutDoorCollection },
  { title: 'MARBLE LOOK', banner: MarbleLook },
  { title: 'BOOKMATCHED', banner: BookMatched },
];

const Collection: React.FC = () => {
  return (
    <section className='top-collection'>
      <div className='container'>
        <div className='row'>
          {list.map((item, index) => (
            <div className='col-md-4' key={index}>
              <div className='collection-item'>
                <div className='thumbnail'>
                  <Image src={item.banner} alt='top collections' />
                </div>
                <div className='item-content'>
                  <h3>{item.title}</h3>
                  <Link href='/shop'>Shop Now</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collection;
