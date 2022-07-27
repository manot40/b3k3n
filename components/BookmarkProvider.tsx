import {
  useMemo,
  useState,
  useEffect,
  useContext,
  useCallback,
  createContext,
} from 'react';

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

  const find = useCallback(
    (criteria: number | string) =>
      bookmarks.find(b => b.id === criteria || b.title === criteria) || null,
    [bookmarks]
  );

  const add = useCallback(
    (book: Book) => {
      if (find(book.id)) return;
      const { sections, ...newBook } = book;
      const newData = [...bookmarks, newBook];
      localStorage.setItem('bookmarks', JSON.stringify(newData));
      setBookmarks(newData);
    },
    [bookmarks, find]
  );

  const remove = useCallback(
    (id: number) => {
      const newData = bookmarks.filter(b => b.id !== id);
      localStorage.setItem('bookmarks', JSON.stringify(newData));
      setBookmarks(newData);
    },
    [bookmarks]
  );

  const memoed = useMemo(
    () => ({
      add,
      find,
      remove,
      bookmarks,
    }),
    [add, bookmarks, find, remove]
  );

  return <BookmarksContext.Provider value={memoed}>{children}</BookmarksContext.Provider>;
};

export const useBookmarks = () => useContext(BookmarksContext);

export default BookmarksProvider;
