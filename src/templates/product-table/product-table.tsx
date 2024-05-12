import { useState, useMemo } from 'react';
import MOCK_DATA from '../../MOCK_DATA.json'
import { COLUMNS } from '../../components/columns/index'
import { useTable } from 'react-table';
import './table.css'


const BasicTable = () => {
  // const [showList, setShowList] = useState(true);
  // const [numPages, setNumPages] = useState(0);

  // const columns = useProductTableColumn({
  //   setTileView: () => setShowList(false),
  //   setListView: () => setShowList(true),
  //   showList: showList,
  // });

  const columns = useMemo(() => COLUMNS, [])
  const date = useMemo(() => MOCK_DATA, [])

  const tableInstance = useTable(
    {
      columns: columns,
      data: date,

    }
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => {
          // Extract the key and other props separately for headerGroup
          const { key, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps();
          return (
            <tr key={key} {...restHeaderGroupProps}>
              {headerGroup.headers.map(column => {
                const { key: headerKey, ...restHeaderProps } = column.getHeaderProps();
                return (
                  <th key={headerKey} {...restHeaderProps}>
                    {column.render('Header')}
                  </th>
                );
              })}
            </tr>
          );
        })}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          // Extract the key and other props separately for rows
          const { key, ...restRowProps } = row.getRowProps();
          return (
            <tr key={key} {...restRowProps}>
              {row.cells.map(cell => {
                const { key: cellKey, ...restCellProps } = cell.getCellProps();
                return (
                  <td key={cellKey} {...restCellProps}>
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );

};

export default BasicTable;