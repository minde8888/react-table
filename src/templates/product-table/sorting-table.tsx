import { useMemo } from 'react';
import MOCK_DATA from '../../MOCK_DATA.json';
import { GROUP_COLUMNS } from '../../components/columns/index';
import { useSortBy, useTable } from 'react-table';
import './table.css';

const SortingTable = () => {
    const columns = useMemo(() => GROUP_COLUMNS, []);
    const data = useMemo(() => MOCK_DATA, []);

    const tableInstance = useTable(
        { columns, data },
        useSortBy  // Ensuring useSortBy is included to provide sorting logic
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        footerGroups
    } = tableInstance;

    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => {
                            // Ensure getSortByToggleProps is called on the column
                            const sortByToggleProps = column.getSortByToggleProps();
                            return (
                                <th {...column.getHeaderProps(sortByToggleProps)}>
                                    {column.render('Header')}
                                    {/* Include sorting direction indicators */}
                                    <span>
                                        {column.isSorted
                                            ? (column.isSortedDesc ? ' 🔽' : ' 🔼')
                                            : ''}
                                    </span>
                                </th>
                            );
                        })}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => (
                                <td {...cell.getCellProps()}>
                                    {cell.render('Cell')}
                                </td>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
            <tfoot>
                {footerGroups.map(footerGroup => (
                    <tr {...footerGroup.getFooterGroupProps()}>
                        {footerGroup.headers.map(column => (
                            <td {...column.getFooterProps()}>
                                {column.render('Footer')}
                            </td>
                        ))}
                    </tr>
                ))}
            </tfoot>
        </table>
    );
};

export default SortingTable;
