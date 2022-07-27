import BookList from './BookList';
import { Modal } from './reusable';

type BookDetailProp = {
  book: Book;
  categories: Category[];
  onClose: () => void;
};

const BookDetail = ({ book, categories, onClose }: BookDetailProp) => {
  const category = categories?.find(cat => cat.id === book.category_id)?.name || '';
  return (
    <Modal isOpen={!!book.title} onClose={onClose}>
      <Modal.Header>
        <h1 className="font-bold text-lg">Book Details</h1>
      </Modal.Header>
      <Modal.Body>
        <div className="flex flex-col md:flex-row">
          <BookList.Card className="self-center mb-8 md:mb-0 md:mr-4" book={book} />
          <div className="text-sm">
            <h2 className="font-bold text-lg">{book.title}</h2>
            <p className="italic mb-2">{book.authors?.join(', ')}</p>
            <div className="text-gray-800 dark:text-gray-300 font-semibold text-xs">
              <span className="bg-gray-200 dark:bg-neutral-700 px-2.5 py-0.5 rounded-md">
                {category}
              </span>
            </div>
            <br />
            <div>
              <strong className="block mb-1">About this book</strong>
              <p>{book.description}</p>
            </div>
          </div>
        </div>
        {book.sections?.length ? <hr /> : null}
        <div className="max-h-[360px] overflow-y-auto space-y-4">
          {book.sections?.map(section => (
            <div key={section.title}>
              <h3 className="font-bold text-lg">{section.title}</h3>
              <p className="text-sm">{section.content}</p>
            </div>
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default BookDetail;
