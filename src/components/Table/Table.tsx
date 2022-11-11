import React from 'react';
import styles from './Table.module.scss';
import { HeaderItem, TableProps, TableRowItem } from './types';

const Table: React.FC<TableProps> = ({
  structure,
  rows = [],
  emptyText = 'No data',
  clickableRow = false,
  onClick,
}) => {
  const handleRowClick = (row: TableRowItem) => {
    if (onClick) onClick(row);
  };

  return (
    <table className={styles['table']}>
      <thead>
        <tr className={`${styles['cols']} ${styles['tableHeader']}`}>
          {structure.header.map((column: HeaderItem, index: number) => (
            <th
              className={`${styles['tableColumn']} ${styles[`col-${column.width}`]}`}
              data-key={column.name}
              key={index}
            >
              <span className={styles['tableHeaderText']}>{column.show_title && column.title}</span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length > 0 ? (
          <>
            {rows.map((row, position) => (
              <tr key={`${row.key}`}>
                <td
                  className={`${styles['cols']} ${styles['tableRow']} ${clickableRow && styles['tableRowClickable']}`}
                  key={position}
                  onClick={() => handleRowClick(row)}
                  data-testid={`row-${position}`}
                >
                  {structure.header.map((column, index) => (
                    <div
                      className={`${styles['tableColumn']} ${styles[`col-${column.width}`]} ${
                        column.show_on_hover && styles['showOnHover']
                      }`}
                      data-key={column.name}
                      key={index}
                    >
                      {row[column.name] && row[column.name]}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </>
        ) : (
          <tr>
            <td className={styles['tableEmpty']} data-testid={'empty-table'}>
              {emptyText}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
