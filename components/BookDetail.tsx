import BookList from './BookList';
import { Modal } from './reusable';

type BookDetailProp = {
  book: Book;
  onClose: () => void;
};

const BookDetail = ({ book, onClose }: BookDetailProp) => {
  return (
    <Modal isOpen={!!book.title} onClose={onClose}>
      <Modal.Header>
        <h1 className="font-bold text-lg">Book Details</h1>
      </Modal.Header>
      <Modal.Body>
        <div className="flex space-x-4">
          <BookList.Card book={book} />
          <div>
            <h2 className="font-bold text-lg">{book.title}</h2>
            <p className="text-sm mt-2 mb-6 sm:mt-0 italic">{book.authors?.join(', ')}</p>
            <div className="text-sm">
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
