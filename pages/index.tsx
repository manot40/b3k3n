import { type NextPage } from 'next';

import { Container } from 'components/reusable';
import BooksToRead from 'components/BooksToRead';
import MyBookmarks from 'components/MyBookmarks';
import BookmarksProvider from 'components/BookmarkProvider';

const Home: NextPage = () => {
  return (
    <Container className="space-y-12">
      <BookmarksProvider>
        <Section id="bookmarks" title="My Bookmarks" icon="bookmarks-outline">
          <MyBookmarks />
        </Section>
        <Section id="book-list" title="Books For Read" icon="book-outline">
          <BooksToRead />
        </Section>
      </BookmarksProvider>
    </Container>
  );
};

function Section({ icon, title, children, ...restProps }: any) {
  return (
    <div {...restProps} className={'space-y-8' + ` ${restProps?.className}`}>
      <div className="flex space-x-4 items-center">
        {/* @ts-ignore */}
        <ion-icon name={icon} size="large" />
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>
      {children}
    </div>
  );
}

export default Home;
