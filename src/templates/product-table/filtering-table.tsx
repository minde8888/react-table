import { useMemo } from 'react';
import MOCK_DATA from '../../MOCK_DATA.json'
import { COLUMNS, GROUP_COLUMNS } from '../../components/columns/index'
import { useFilters, useGlobalFilter, useTable } from 'react-table';
import './table.css'
import { GlobalFilter } from './global-filter';
import { ColumnFilter } from './column-filter';


const FilteringTable = () => {

  const columns = useMemo(() => COLUMNS, [])
  const date = useMemo(() => MOCK_DATA, [])

  const defaultColumn = useMemo(() => ({ Filter: ColumnFilter }), []);

  console.log('====================================');
  console.log(defaultColumn);
  console.log('====================================');

  const tableInstance = useTable(
    {
      columns,
      data: date,
      defaultColumn
    },
    useFilters,
    useGlobalFilter
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, footerGroups, state, setGlobalFilter } = tableInstance;

  const { globalFilter } = state

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
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
                      <div>{column.canFilter ? column.render("Filter") : null}</div>
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
        <tfoot>
          {footerGroups.map((footerGroup) => {
            const { key: footerGroupKey, ...footerGroupProps } = footerGroup.getFooterGroupProps();
            return (
              <tr key={footerGroupKey} {...footerGroupProps}>
                {footerGroup.headers.map((column) => {
                  const { key: columnKey, ...footerProps } = column.getFooterProps();
                  return (
                    <td key={columnKey} {...footerProps}>
                      {column.render('Footer')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tfoot>

      </table>
    </>
  );

};

export default FilteringTable;