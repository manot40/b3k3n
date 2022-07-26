import type { NextPage } from 'next';

import useSWR from 'swr';

import { fetcher } from 'utils';
import { Container } from 'components/reusable';
import BooksToRead from 'components/BooksToRead';
import MyBookmarks from 'components/MyBookmarks';
import BookmarksProvider from 'components/BookmarkProvider';

const Home: NextPage = () => {
  const { data: res } = useSWR(['/category'], fetcher.get);

  return (
    <Container className="space-y-12">
      <BookmarksProvider>
        <Section id="bookmarks" title="My Bookmarks" icon="bookmarks-outline">
          <MyBookmarks categories={res?.data as Category[]} />
        </Section>
        <Section id="book-list" title="Books For Read" icon="book-outline">
          <BooksToRead categories={res?.data as Category[]} />
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
