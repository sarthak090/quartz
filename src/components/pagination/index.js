import React from 'react';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { usePagination, DOTS } from './usePagination';

const Pagination = (props) => {
  const { urlPrefix, totalCount, siblingCount = 1, currentPage, pageSize, className } = props;
  const router = useRouter();

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onPrevious = () => {
    const actualPageNumber = currentPage - 1;
    if (actualPageNumber === 1) {
      router.push(urlPrefix);
    } else {
      router.push(urlPrefix + '/page/' + actualPageNumber);
    }
  };

  const onNext = () => {
    const actualPageNumber = currentPage + 1;
    router.push(urlPrefix + '/page/' + actualPageNumber);
  };

  const onPageChange = (number) => {
    if (number === 1) {
      router.push(urlPrefix);
    } else {
      router.push(urlPrefix + '/page/' + number);
    }
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className={classnames('pagination-container', { [className]: className })}>
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}>
        <div className='arrow left' />
      </li>
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return <li className='pagination-item dots'>&#8230;</li>;
        }

        return (
          <li
            className={classnames('pagination-item', {
              selected: pageNumber === currentPage,
            })}
            onClick={() => onPageChange(pageNumber)}
            key={pageNumber}>
            {pageNumber}
          </li>
        );
      })}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}>
        <div className='arrow right' />
      </li>
    </ul>
  );
};

export default Pagination;
