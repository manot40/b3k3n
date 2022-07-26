import clsx from 'clsx';
import {
  type InputHTMLAttributes,
  type DetailedHTMLProps,
  type KeyboardEvent,
  forwardRef,
  LegacyRef,
  memo,
} from 'react';

interface Props
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  type?: string;
  label?: string;
  value?: string | number;
  disabled?: boolean;
  variant?: Variant;
  colorScheme?: ColorScheme;
  custom?: string;
  onEnter?: (value: string) => void;
}

const InputComponent = (props: Props, ref: LegacyRef<HTMLInputElement>) => {
  const {
    label,
    placeholder,
    type,
    disabled,
    value,
    custom,
    required,
    className,
    onEnter,
    ...restProps
  } = props;

  function handleKeyPress(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && onEnter) onEnter(e.currentTarget.value);
  }

  return (
    <div className={'form-group ' + className}>
      {label && (
        <label className={'text-xs ml-1 mb-2 ' + (disabled && 'text-neutral-500')}>
          {label}
        </label>
      )}
      {/* @ts-ignore */}
      <input
        {...restProps}
        ref={ref}
        onKeyDown={handleKeyPress}
        required={required}
        className={clsx('input', custom)}
        placeholder={placeholder}
        type={type}
        disabled={disabled}
        value={value}
      />
    </div>
  );
};

export const Input = memo(forwardRef<HTMLInputElement, Props>(InputComponent));
