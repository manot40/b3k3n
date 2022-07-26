import { createContext, useContext, useMemo, useState, useEffect } from 'react';

type BookmarksContextType = {
  bookmarks: Omit<Book, 'sections'>[];
  add: (book: Book) => void;
  remove: (id: number) => void;
  find: (criteria: number | string) => Omit<Book, 'sections'> | null;
};

const BookmarksContext = createContext({} as BookmarksContextType);

const BookmarksProvider = ({ children }: { children?: React.ReactNode }) => {
  const [bookmarks, setBookmarks] = useState([] as BookmarksContextType['bookmarks']);

  useEffect(() => {
    const bookmarks = localStorage.getItem('bookmarks');
    if (bookmarks) setBookmarks(JSON.parse(bookmarks));
  }, []);

  function add(book: Book) {
    if (find(book.id)) return;
    const { sections, ...newBook } = book;
    const newData = [...bookmarks, newBook];
    localStorage.setItem('bookmarks', JSON.stringify(newData));
    setBookmarks(newData);
  }

  function remove(id: number) {
    const newData = bookmarks.filter(b => b.id !== id);
    localStorage.setItem('bookmarks', JSON.stringify(newData));
    setBookmarks(newData);
  }

  function find(criteria: number | string) {
    return (
      bookmarks.find(b => {
        if (typeof criteria == 'number') return b.id === criteria;
        return b.title === criteria + '';
      }) || null
    );
  }

  const memoed = useMemo(
    () => ({
      add,
      find,
      remove,
      bookmarks,
    }),
    [bookmarks]
  );

  return <BookmarksContext.Provider value={memoed}>{children}</BookmarksContext.Provider>;
};

export const useBookmarks = () => useContext(BookmarksContext);

export default BookmarksProvider;
