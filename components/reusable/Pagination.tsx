import { useEffect, useMemo, useState, type HTMLAttributes } from 'react';
import clsx from 'clsx';

interface Props extends HTMLAttributes<HTMLDivElement> {
  page?: number;
  totalPages: number;
  initialPage?: number;
  onPageChange?: (page: number) => void;
}

type HookProps = {
  limit: number;
  totalItems: number;
  currentPage?: number;
};

export const Pagination = ({
  initialPage = 1,
  onPageChange,
  totalPages,
  page,
  ...restProps
}: Props) => {
  const [currentPage, setCurrentPage] = useState(page || initialPage);

  useEffect(() => {
    page && setCurrentPage(page);
  }, [page]);

  const pages = useMemo(() => {
    if (!totalPages) return [];

    if (currentPage > totalPages) setCurrentPage(totalPages);

    if (totalPages < 6) {
      let x = [];
      for (let i = 0; i < totalPages; i++) {
        x.push(i + 1);
      }
      return x;
    } else {
      return currentPage > 3
        ? currentPage + 1 < totalPages
          ? [currentPage - 1, currentPage, currentPage + 1]
          : [totalPages - 3, totalPages - 2, totalPages - 1]
        : [2, 3, 4];
    }
  }, [currentPage, totalPages]);

  function pageChanged(_page: number) {
    !page && setCurrentPage(_page);
    onPageChange && onPageChange(_page);
  }

  return (
    <div {...restProps} className={clsx('pagination', restProps.className)}>
      {totalPages > 5 && (
        <button
          onClick={() => pageChanged(1)}
          className={clsx({
            active: currentPage === 1,
          })}>
          {1}
        </button>
      )}

      {totalPages > 5 && currentPage >= 4 && currentPage - 1 > 0 && (
        <button className="disabled">...</button>
      )}
      {pages.map(pageNum => (
        <button
          onClick={() => pageChanged(pageNum)}
          key={`key_${pageNum}`}
          className={clsx({
            active: pageNum === currentPage,
          })}>
          {pageNum}
        </button>
      ))}

      {totalPages > 5 && currentPage + 2 < totalPages && (
        <button className="disabled">...</button>
      )}

      {totalPages > 5 && (
        <button
          onClick={() => pageChanged(totalPages)}
          className={clsx({
            active: currentPage === totalPages,
          })}>
          {totalPages}
        </button>
      )}
    </div>
  );
};

Pagination.usePagination = ({ currentPage, totalItems, limit }: HookProps) => {
  const totalPages = Math.ceil(totalItems / limit);

  const [page, setPage] = useState(currentPage || 1);

  const itemIndex = {
    first: page * limit - limit,
    last: page == totalPages ? totalItems : page * limit,
  };

  const changePage = (nextPage: number) => {
    nextPage != page && nextPage <= totalPages && nextPage > 0 && setPage(nextPage);
  };

  return {
    next: () => changePage(page + 1),
    prev: () => changePage(page - 1),
    changePage,
    totalPages,
    itemIndex,
    page,
  };
};
