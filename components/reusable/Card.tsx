import type { HTMLAttributes } from 'react';
import { findChildren } from 'utils';

interface IProps extends HTMLAttributes<HTMLDivElement> {}

const Main = ({ children }: IProps) => {
  const Banner = findChildren(children, 'Banner');
  const Body = findChildren(children, 'Body');

  return (
    <div className="dark:border dark:border-neutral-700 rounded-lg">
      {Banner && <div className="flex w-full h-36 max-h-auto">{Banner}</div>}
      <div className="flex-1 p-4 bg-white h-60 dark:bg-black shadow-xl rounded-b-lg space-y-4">
        {Body}
      </div>
    </div>
  );
};

const Banner = ({ children }: any) => children;
Banner.displayName = 'Banner';
Main.Banner = Banner;

const Body = ({ children }: any) => children;
Body.displayName = 'Body';
Main.Body = Body;

export const Card = Main;
