import { useState, useMemo } from 'react';
import MOCK_DATA from '../../MOCK_DATA.json'
import { COLUMNS, GROUP_COLUMNS } from '../../components/columns/index'
import { useBlockLayout, useTable } from 'react-table';
import './table.css'
import { useSticky } from 'react-table-sticky';
import { Styles } from './tsble-styles';


const StickyTable = () => {

    const columns = useMemo(() => COLUMNS, [])
    const date = useMemo(() => MOCK_DATA, [])

    const tableInstance = useTable(
        {
            columns: columns,
            data: date,
        },
        useBlockLayout,
        useSticky
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, footerGroups } = tableInstance;

    const firstPageRows = rows.slice(0,20)

    return (
        <Styles>
            <div {...getTableProps()} className="table sticky" style={{ width: 1000, height: 500 }}>
                <div className="header">
                    {headerGroups.map((headerGroup) => (
                        <div {...headerGroup.getHeaderGroupProps()} className="tr">
                            {headerGroup.headers.map((column) => (
                                <div {...column.getHeaderProps()} className="th">
                                    {column.render('Header')}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div {...getTableBodyProps()} className="body">
                    {firstPageRows.map((row) => {
                        prepareRow(row);
                        return (
                            <div {...row.getRowProps()} className="tr">
                                {row.cells.map((cell) => (
                                    <div {...cell.getCellProps()} className="td">
                                        {cell.render('Cell')}
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
                {/* <div className="footer">
                    {footerGroups.map((footerGroup) => (
                        <div {...footerGroup.getHeaderGroupProps()} className="tr">
                            {footerGroup.headers.map((column) => (
                                <div {...column.getHeaderProps()} className="td">
                                    {column.render('Footer')}
                                </div>
                            ))}
                        </div>
                    ))}
                </div> */}
            </div>
        </Styles>
    );

};

export default StickyTable;