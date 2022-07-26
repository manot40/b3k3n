import Image from 'next/image';

import { trimString } from 'utils';
import { Button, NotFound } from './reusable';
import { useBookmarks } from './BookmarkProvider';

type BookListProp = {
  data?: Book[];
  skeleton: number;
  onFocus?: (id: number) => void;
};

type BookCardProp = {
  book?: Book;
  children?: JSX.Element;
  onClick?: (id: number) => void;
};

const BookList = ({ data, onFocus, skeleton }: BookListProp) => {
  const { find, add, remove } = useBookmarks();

  function handleFocus(id: number) {
    onFocus && onFocus(id);
  }

  function handleBookmark(book: Book) {
    if (find(book.id)) remove(book.id);
    else add(book);
  }

  if (!data) return <BookList.Skeleton count={skeleton} />;

  if (!data.length)
    return (
      <div className="flex col-span-full row-span-6 items-center">
        <NotFound />
      </div>
    );

  return (
    <>
      {data.map(book => {
        const isBookmarked = !!find(book.id);
        return (
          <div key={book.id} className="font-sans">
            <BookList.Card book={book} onClick={handleFocus}>
              <Button
                className="absolute p-2 right-1 bottom-1 z-10"
                onClick={() => handleBookmark(book)}
                colorScheme={isBookmarked ? 'danger' : 'info'}
                shadow={false}>
                {/* @ts-ignore */}
                <ion-icon
                  style={{ fontSize: 18 }}
                  name={isBookmarked ? 'heart-dislike' : 'bookmark'}
                />
              </Button>
            </BookList.Card>
            <div
              className="min-h-[2.5rem] cursor-pointer hover:underline"
              onClick={() => handleFocus(book.id)}>
              <h6 className="text-sm max-w-[8rem] line-clamp-2">
                {trimString(book.title, 26)}
              </h6>
            </div>
          </div>
        );
      })}
    </>
  );
};

BookList.Card = ({ book, children, onClick }: BookCardProp) => {
  if (!book?.cover_url) return null;
  return (
    <div className="flex items-start relative w-full mb-2 min-w-[8.99rem] max-w-[8.99rem] h-[13.5rem]">
      <Image
        className="cursor-pointer rounded shadow-md w-full max-h-full h-full"
        layout="fill"
        alt={book.title}
        src={book.cover_url}
        onClick={() => {
          onClick && onClick(book.id);
        }}
      />
      {children}
    </div>
  );
};

BookList.Skeleton = ({ count }: { count: number }) => {
  return (
    <>
      {Array(count)
        .fill(1)
        .map((_, i) => (
          <div key={i} className="animate-pulse font-sans">
            <div className="flex items-start relative w-full mb-2 min-w-[8.99rem] max-w-[8.99rem] h-[13.5rem]">
              <div className="rounded shadow-md w-[143px] h-[216px] bg-neutral-300 dark:bg-neutral-600" />
            </div>
            <div className="min-h-[2.5rem]">
              <div className="mt-2 w-[130px] h-[20px] bg-neutral-300 dark:bg-neutral-600" />
            </div>
          </div>
        ))}
    </>
  );
};

export default BookList;
