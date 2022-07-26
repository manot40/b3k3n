import clsx from 'clsx';
import { Input } from '.';
import { searchArray, prettyString } from 'utils';
import { FC, useCallback, useState, useEffect, useRef, memo } from 'react';

type Option = { [key: string]: any };

interface Props {
  label?: string;
  idKey?: string;
  labelKey?: string;
  placeholder: string;
  multiple?: boolean;
  name?: string;
  variant?: Variant;
  colorScheme?: ColorScheme;
  className?: string;
  options: Option[];
  value?: string | string[];
  searchable?: boolean;
  required?: boolean;
  onChange?: (value: string | string[]) => void;
}

const SelectComponent: FC<Props> = ({
  label: labelHtml = '',
  placeholder = 'Pilih item',
  idKey = 'id',
  labelKey = 'label',
  multiple = false,
  variant = 'default',
  colorScheme = 'primary',
  className,
  name,
  options = [],
  value,
  searchable,
  required,
  onChange,
}) => {
  const searchInput = useRef<HTMLInputElement>(null);
  const focusedOption = useRef<HTMLDivElement>(null);

  const [chosen, setChosen] = useState<Option[]>([]);
  const [focus, setFocus] = useState<Option>({});
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    const def = required && options[0] ? [options[0]] : [];
    if (!multiple) {
      const target = options.find(option => option[idKey] === value);
      setChosen(target ? [target] : def);
    } else {
      setChosen(value ? options.filter(option => value.includes(option[idKey])) : def);
    }
  }, [idKey, multiple, options, required, value]);

  useEffect(() => {
    if (onChange) {
      const toObj: string[] = chosen.map(value => value[idKey].toString());
      multiple ? onChange(toObj) : onChange(toObj[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosen]);

  useEffect(() => {
    !isOpen && setSearch('');
    !isOpen && setFocus({});
  }, [isOpen]);

  const onClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const onBlur = useCallback(() => {
    !isHover && setIsOpen(false);
  }, [isHover]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const focusAction = (mode: boolean) => {
        const filter = searchArray(options, labelKey, search);
        const idx = filter.findIndex(val => val[idKey] === focus[idKey]);
        const next = mode
          ? idx === -1
            ? filter.length - 1
            : idx - 1
          : idx === -1
          ? 0
          : idx + 1;
        setFocus({ ...filter[next] });
        focusedOption.current?.scrollIntoView(!mode);
      };
      const blurAction = () => {
        multiple ? setChosen([...chosen, focus]) : setChosen([focus]);
      };
      const open = () => {
        !isHover && setIsHover(true);
        !isOpen && setIsOpen(true);
      };
      const close = () => {
        setFocus({});
        setIsOpen(false);
        setIsHover(false);
      };
      switch (e.key) {
        case ' ':
          !isOpen && e.preventDefault();
          multiple && isOpen && focus[idKey] && setChosen([...chosen, focus]);
          break;
        case 'Enter': {
          open();
          if (!focus[idKey])
            searchable && setTimeout(() => searchInput.current?.focus(), 300);
          else focus[idKey] && blurAction(), close();
          break;
        }
        case 'Escape':
          e.preventDefault();
          close();
          break;
        case 'Tab':
          focus[idKey] && e.preventDefault();
          !focus && blurAction(), close();
          break;
        case 'ArrowUp':
          e.preventDefault();
          open();
          focusAction(true);
          break;
        case 'ArrowDown':
          e.preventDefault();
          open();
          focusAction(false);
          break;
        default:
          break;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [focus, idKey, isOpen, labelKey, options, search, searchable]
  );

  const onOptionClick = useCallback(
    (e: any) => {
      const { id, label } = e.currentTarget.dataset;
      const obj = { [idKey]: id, [labelKey]: label };
      if (!multiple) {
        setChosen([obj]);
        setIsOpen(false);
        setIsHover(false);
      } else {
        console.log('Multiple');
      }
    },
    [idKey, labelKey, multiple]
  );

  const renderChosen = () => {
    const style = 'text-xs overflow-x-hidden text-ellipsis whitespace-nowrap';
    if (chosen[0]) {
      const result = multiple
        ? chosen.map((val, i) => (
            <div key={i.toString()} className="badge">
              {val[labelKey]}
            </div>
          ))
        : prettyString(chosen[0][labelKey]);
      return <div className={style}>{result}</div>;
    }
    return <div className={style + ' text-neutral-400'}>{placeholder}</div>;
  };

  const renderOptions = useCallback(() => {
    const list = searchable ? [...searchArray(options, labelKey, search)] : [...options];

    if (!list.length) return <div className="option disabled">Tidak ada data</div>;
    return list.map((option, idx) => (
      <div
        ref={focus[idKey] === option[idKey] ? focusedOption : undefined}
        key={option[idKey] || idx}
        data-id={option[idKey]}
        data-label={option[labelKey]}
        onClick={onOptionClick}
        className={clsx(
          'option',
          focus[idKey] === option[idKey] && 'focused',
          chosen.find(val => val[labelKey] === option[labelKey]) && 'selected'
        )}>
        {prettyString(option[labelKey])}
      </div>
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, chosen, focus]);

  return (
    <div className={clsx('form-group', className)} onKeyDown={onKeyDown}>
      {isOpen && (
        <div className="fixed md:hidden top-0 left-0 w-screen h-screen z-20">
          <div className="dark:bg-black bg-neutral-800 opacity-90 w-full h-full" />
          <h1 className="fixed text-white text-2xl font-semibold top-[16vw] left-[5vw] ml-2">
            {placeholder}
          </h1>
        </div>
      )}
      <label className="text-xs ml-1 mb-2">{labelHtml}</label>
      <input
        hidden
        readOnly
        name={name}
        required={required}
        value={chosen.length ? chosen[0][idKey] : ''}
      />
      <div className="flex relative items-center">
        <div onClick={onClick} onBlur={onBlur} tabIndex={0} className="select w-full">
          {renderChosen()}
          <span className={clsx(isOpen ? 'rotate-180' : 'transform-none')}>
            <Chevron />
          </span>
        </div>
        <div
          className={clsx(
            'options',
            !isOpen
              ? '-translate-y-3 invisible opacity-0'
              : 'translate-y-0 visible opacity-100'
          )}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}>
          {options.length && searchable ? (
            <Input
              // @ts-ignore
              onChange={setSearch}
              ref={searchInput}
              onFocus={() => {}}
              onBlur={onBlur}
              label=""
              value={search}
              placeholder="Cari entri"
              className="sticky top-0 border-b border-neutral-300 dark:border-neutral-700"
              custom={clsx(
                'rounded-none border-none bg-white dark:bg-black',
                !isOpen && 'transition-none'
              )}
            />
          ) : null}
          {renderOptions()}
        </div>
      </div>
    </div>
  );
};

function Chevron() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision"
      style={{ color: 'currentcolor' }}>
      <path d="M6 9l6 6 6-6"></path>
    </svg>
  );
}

export const Select = memo(SelectComponent);
