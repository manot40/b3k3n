import React, { FC, HTMLAttributes } from 'react';
import clsx from 'clsx';

type Props = HTMLAttributes<HTMLDivElement>;

export const Container: FC<Props> = ({ children, ...HTMLProps }) => {
  return (
    <div className={clsx('px-4 mx-auto max-w-screen-lg', HTMLProps.className)}>
      {children}
    </div>
  );
};
