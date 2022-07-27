import { type FC, useMemo, useState } from 'react';

import BookList from './BookList';
import BookDetail from './BookDetail';
import { Pagination } from './reusable';
import { useViewport } from 'utils/hooks';
import { useBookmarks } from './BookmarkProvider';

const MyBookmarks: FC<{ categories: Category[] }> = ({ categories = [] }) => {
  const { lg } = useViewport();
  const { bookmarks } = useBookmarks();

  const [focusedBook, setFocusedBook] = useState({} as typeof bookmarks[number]);

  const limit = useMemo(() => {
    if (lg) return 5;
    else return 4;
  }, [lg]);

  const { itemIndex, changePage, ...pagination } = Pagination.usePagination({
    limit,
    totalItems: bookmarks.length,
  });

  const books = useMemo(() => {
    const { first, last } = itemIndex;
    const thisPage = bookmarks.slice(first, last);
    return thisPage.length ? thisPage : bookmarks.slice(first - limit, last);
  }, [bookmarks, itemIndex, limit]);

  function handlePageChange(page: number) {
    // @ts-ignore
    const top = document.querySelector('#bookmarks')?.offsetTop - 20;
    if (top) window.scrollTo({ top, behavior: 'smooth' });
    changePage(page);
  }

  function openModal(id: number) {
    const focused = bookmarks.find(book => book.id === id);
    setFocusedBook(focused || ({} as Book));
  }

  return (
    <div className="space-y-4">
      <BookDetail
        categories={categories}
        book={focusedBook as Book}
        onClose={() => setFocusedBook({} as Book)}
      />
      <div className="grid justify-items-center gap-4 grid-cols-2 sm:grid-cols-4 lg:grid-cols-5">
        <BookList data={books as Book[]} onFocus={openModal} skeleton={limit} />
      </div>
      <Pagination {...pagination} onPageChange={handlePageChange} />
    </div>
  );
};

export default MyBookmarks;
