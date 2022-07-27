import { type FC, useState, useEffect, useMemo } from 'react';
import useSWR from 'swr';

import BookList from './BookList';
import BookDetail from './BookDetail';
import { useViewport } from 'utils/hooks';
import { Input, Pagination, Select } from './reusable';
import { fetcher, qsFormat, searchArray } from 'utils';

const BooksToRead: FC<{ categories: Category[] }> = ({ categories = [] }) => {
  const { lg } = useViewport();
  const size = lg ? 10 : 8;

  const [search, setSearch] = useState('');
  const [pageCount, setPageCount] = useState(0);
  const [focusedBook, setFocusedBook] = useState<Book>({} as Book);

  const [meta, setMeta] = useState({
    size,
    page: 1,
    categoryId: 1,
  });

  const { data: bookRes, error } = useSWR<Res<Book[]>>(
    [`/books?${qsFormat(meta)}`],
    fetcher.get
  );

  useEffect(() => {
    setMeta({ ...meta, size, page: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lg]);

  useEffect(() => {
    if (bookRes) setPageCount(Math.ceil(bookRes.count / meta.size));
  }, [bookRes, meta.size]);

  function handlePageChange(page: number) {
    // @ts-ignore
    const top = document.querySelector('#book-list')?.offsetTop - 20;
    setMeta({ ...meta, page });
    if (top) window.scrollTo({ top, behavior: 'smooth' });
  }

  function openModal(id: number) {
    const focused = bookRes?.data.find((book: Book) => book.id === id);
    setFocusedBook(focused || ({} as Book));
  }

  const bookList = useMemo(() => {
    if (!bookRes) return;
    const { data } = bookRes;
    return searchArray(data, 'title', search);
  }, [bookRes, search]);

  if (error) return <div className="text-center">Failed to load data</div>;

  return (
    <div className="space-y-4">
      <div className="space-y-4 md:space-y-0 md:flex md:space-x-2">
        <Select
          label="Category"
          labelKey="name"
          options={categories}
          className="min-w-[200px]"
          placeholder="Select Category"
          value={categories[0]?.id + ''}
          onChange={e => e && setMeta({ ...meta, page: 1, categoryId: +e })}
        />
        <Input
          value={search}
          label="Search Book"
          className="w-full self-end"
          placeholder="Search by book title"
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <BookDetail
        categories={categories}
        book={focusedBook}
        onClose={() => setFocusedBook({} as Book)}
      />
      <div className="grid justify-items-center gap-4 grid-cols-2 sm:grid-cols-4 lg:grid-cols-5">
        <BookList data={bookList} onFocus={openModal} skeleton={size} />
      </div>
      <Pagination
        page={meta.page}
        totalPages={pageCount}
        onPageChange={handlePageChange}
      />
      <br />
    </div>
  );
};

export default BooksToRead;
