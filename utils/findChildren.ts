import { ReactNode, Children } from 'react';

export const findChildren = (children: ReactNode, name: string) => {
  return Children.map(children, child =>
    // @ts-ignore
    child?.type.displayName === name ? child : null
  );
};
