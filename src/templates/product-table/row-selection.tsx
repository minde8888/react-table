import React, { useMemo } from 'react';
import MOCK_DATA from '../../MOCK_DATA.json';
import { COLUMNS, Data, GROUP_COLUMNS } from '../../components/columns/index';
import { useRowSelect, useTable, Column, HeaderGroup, Row, CellProps } from 'react-table';
import './table.css';
import { Checkbox } from './check-box';

const RowSelection: React.FC = () => {
    const columns: Column<Data>[] = useMemo(() => COLUMNS, []);
    const data: Data[] = useMemo(() => MOCK_DATA, []);

    const tableInstance = useTable<Data>(
        {
            columns,
            data,
        },
        useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push((columns: Column<Data>[]) => [
                {
                    id: 'selection',
                    Header: ({ getToggleAllRowsSelectedProps }: any) => (
                        <Checkbox {...getToggleAllRowsSelectedProps()} />
                    ),
                    Cell: ({ row }: CellProps<Data>) => (
                        <Checkbox {...row.getToggleRowSelectedProps()} />
                    ),
                },
                ...columns,
            ]);
        }
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        footerGroups,
        selectedFlatRows
    } = tableInstance;

    const firstPageRows = rows.slice(0, 10);

    return (
        <>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup: HeaderGroup<Data>) => {
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
                    {firstPageRows.map((row: any) => {
                        prepareRow(row);
                        const { key, ...restRowProps } = row.getRowProps();
                        return (
                            <tr key={key} {...restRowProps}>
                                {row.cells.map((cell: any) => {
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
                    {footerGroups.map((footerGroup: HeaderGroup<Data>) => {
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
            <code>
                {JSON.stringify(
                    { selectedFlatRows: selectedFlatRows.map((row: any) => row.original) },
                    null,
                    2
                )}
            </code>
        </>
    );
};

export default RowSelection;
