import { useState, useMemo } from 'react';
import MOCK_DATA from '../../MOCK_DATA.json'
import { COLUMNS, GROUP_COLUMNS } from '../../components/columns/index'
import { usePagination, useTable } from 'react-table';
import './table.css'


const PaginationTable = () => {

    const columns = useMemo(() => GROUP_COLUMNS, [])
    const date = useMemo(() => MOCK_DATA, [])

    const tableInstance = useTable(
        {
            columns: columns,
            data: date,

        },
        usePagination
    );

    const { getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        canNextPage,
        canPreviousPage,
        previousPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
        state,
        prepareRow } = tableInstance;

    const { pageIndex, pageSize } = state

    return (
        <>
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
                    {page.map(row => {
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
            <div>
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <span>
                    | Go to page: {' '}
                    <input type="number" defaultValue={pageIndex + 1}
                        onChange={e => {
                            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(pageNumber)
                        }} />
                </span>
                <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                    {
                        [10, 25, 50].map(pageSize =>(
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))
                    }
                </select>
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
                <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
            </div>
        </>
    );

};

export default PaginationTable;