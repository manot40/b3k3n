import type { DetailedHTMLProps, FC, TableHTMLAttributes } from 'react';

type Data = { [key: string]: any };

interface Props
  extends Omit<
    DetailedHTMLProps<TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>,
    'onChange'
  > {
  data: Data[];
  footer?: boolean;
  onChange?: (data: Data[]) => void;
}

export const Table: FC<Props> = ({ data, footer, ...HTMLTableProps }) => {
  if (!data.length)
    return (
      <div className="w-full h-[50vh] bg-white dark:bg-black rounded-lg flex justify-center items-center text-sm">
        No Data
      </div>
    );

  const columns = Object.keys(data[0]);

  return (
    // @ts-ignore
    <table
      className="table-parent"
      style={{ ...HTMLTableProps.style, borderSpacing: 0 }}
      {...HTMLTableProps}>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((column, index) => (
              <td key={index}>
                <div>{row[column]}</div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      {footer && (
        <tfoot>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </tfoot>
      )}
    </table>
  );
};
