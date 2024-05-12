import {  Column } from 'react-table';

interface Row {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    date_of_birth: string;
    age: number;
    country: string;
    phone: string;
  }

export const COLUMNS: Column<Row>[] = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "First Name",
    accessor: "first_name",
  },
  {
    Header: "Last Name",
    accessor: "last_name",
  },
  {
    Header: "Date of Birth",
    accessor: "date_of_birth",
  },
  {
    Header: "Country",
    accessor: "country",
  },
  {
    Header: "Phone",
    accessor: "phone",
  },
];
