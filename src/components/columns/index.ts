import React from "react";
import { format } from "date-fns";
import { CellProps, Column } from "react-table";
import { ColumnFilter } from "../../templates/product-table/column-filter";

export interface Data {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth: string;
  age: number;
  country: string;
  phone: string;
}

type CustomColumn<D extends object = {}> = Column<D> & {
  sticky?: 'left' | 'right';
};

export const COLUMNS: CustomColumn<Data>[] = [
  {
    Header: "Id",
    Footer: "Id",
    accessor: "id",
    sticky: 'left',
  },
  {
    Header: "First Name",
    Footer: "First Name",
    accessor: "first_name",
    sticky:'left'
  },
  {
    Header: "Last Name",
    Footer: "Last Name",
    accessor: "last_name",
    sticky:'left'
  },
  {
    Header: "Date of Birth",
    Footer: "Date of Birth",
    accessor: "date_of_birth",
    Cell: ({ value }: CellProps<Data, string>) =>
      format(new Date(value), "dd/MM/yyyy"),

    disableFilters: true,
  },
  {
    Header: "Country",
    Footer: "Country",
    accessor: "country",
  },
  {
    Header: "Phone",
    Footer: "Phone",
    accessor: "phone",
  },
  {
    Header: "Age",
    Footer: "Age",
    accessor: "age",
  },
  {
    Header: "Email",
    Footer: "Email",
    accessor: "email",
  },
];

type GroupColumn = Column<Data> & {
  columns: Column<Data>[];
};

type TableColumn = Column<Data> | GroupColumn;

export const GROUP_COLUMNS: TableColumn[] = [
  { Header: "Id", Footer: "Id", accessor: "id" },
  {
    Header: "First Name",
    Footer: "First Name",
    columns: [
      {
        Header: "First Name",
        Footer: "First Name",
        accessor: "first_name",
      },
      {
        Header: "Last Name",
        Footer: "Last Name",
        accessor: "last_name",
      },
    ],
  },
  {
    Header: "Info",
    Footer: "Info",
    columns: [
      {
        Header: "Date of Birth",
        Footer: "Date of Birth",
        accessor: "date_of_birth",
      },
      {
        Header: "Country",
        Footer: "Country",
        accessor: "country",
      },
      {
        Header: "Phone",
        Footer: "Phone",
        accessor: "phone",
      },
    ],
  },
];
