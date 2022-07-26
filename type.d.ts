declare type Res<T> = {
  message: string;
  status: number;
  count: number;
  data: T;
};

declare type Category = {
  id: number;
  name: string;
};

declare type Section = {
  title: string;
  content: string;
};

declare type Book = {
  id: number;
  title: string;
  authors: string[];
  cover_url: string;
  sections: Section[];
  category_id: number;
  description: string;
};
