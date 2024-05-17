import { useMemo } from 'react';
import MOCK_DATA from '../../MOCK_DATA.json';
import { COLUMNS, GROUP_COLUMNS } from '../../components/columns/index';
import { useTable } from 'react-table';
import './table.css';
import { Checkbox } from './check-box';

const ColumnHiding = () => {
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => MOCK_DATA, []);

    const tableInstance = useTable({
        columns,
        data,
    });

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        footerGroups,
        allColumns,
        getToggleHideAllColumnsProps,
    } = tableInstance;

    return (
        <>
            <div>
                <div>
                    <Checkbox {...getToggleHideAllColumnsProps()} /> Toggle All
                </div>
                {allColumns.map((column) => (
                    <div key={column.id}>
                        <label>
                            <input type="checkbox" {...column.getToggleHiddenProps()} />
                            {column.render('Header')}
                        </label>
                    </div>
                ))}
            </div>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => {
                        const { key, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps();
                        return (
                            <tr key={key} {...restHeaderGroupProps}>
                                {headerGroup.headers.map((column) => {
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
                    {rows.map((row) => {
                        prepareRow(row);
                        const { key, ...restRowProps } = row.getRowProps();
                        return (
                            <tr key={key} {...restRowProps}>
                                {row.cells.map((cell) => {
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

export default ColumnHiding;
