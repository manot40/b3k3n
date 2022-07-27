import clsx from 'clsx';
import { HTMLAttributes, useEffect } from 'react';
import { findChildren } from 'utils';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  onProceed?: () => void;
}

const Main = ({ children, isOpen, onClose, onProceed }: IProps) => {
  const Header = findChildren(children, 'Header');
  const Body = findChildren(children, 'Body');
  const Footer = findChildren(children, 'Footer');

  useEffect(() => {
    const body = document.querySelector('body');
    if (body) {
      if (isOpen) body.style.overflow = 'hidden';
      else body.style.overflow = 'auto';
    }
  }, [isOpen]);

  return (
    <div>
      <div
        className={clsx(
          { flex: isOpen },
          { hidden: !isOpen },
          'overflow-y-auto overflow-x-hidden fixed top-0 left-0 z-[999] inset-0 mb-4 w-full md:inset-0 h-modal md:h-full justify-center items-center'
        )}>
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto max-h-screen">
          <div
            onClick={onClose}
            className="bg-neutral-600 dark:bg-black top-0 left-0 fixed w-full h-full z-40 opacity-75"
          />
          <div className="relative z-50 dark:bg-neutral-900 dark:border border-neutral-800 bg-white rounded-lg shadow animate-slideInDown">
            <div className="flex justify-between items-center p-4 rounded-t border-b border-gray-200 dark:border-neutral-600">
              {Header?.length ? Header : <div />}
              <div
                onClick={onClose}
                className="flex items-center cursor-pointer p-1 hover:dark:bg-neutral-800 hover:bg-neutral-300 rounded-md">
                {/* @ts-ignore */}
                <ion-icon style={{ fontSize: 24 }} name="close-outline" />
              </div>
            </div>
            {Body?.length ? <div className="p-6 space-y-6">{Body}</div> : null}
            {Footer?.length ? (
              <div className="flex justify-end items-center p-4 space-x-2 rounded-b border-t border-gray-200 dark:border-neutral-600">
                {Footer}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

const Header = ({ children }: any) => children;
Header.displayName = 'Header';
Main.Header = Header;

const Body = ({ children }: any) => children;
Body.displayName = 'Body';
Main.Body = Body;

const Footer = ({ children }: any) => children;
Footer.displayName = 'Footer';
Main.Footer = Footer;

export const Modal = Main;
