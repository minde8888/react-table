import React from 'react';
import BasicTable from './templates/product-table/basic-table';
import SortingTable from './templates/product-table/sorting-table';
import FilteringTable from './templates/product-table/filtering-table';
import PaginationTable from './templates/product-table/pagination-table';
import RwoSelection from './templates/product-table/row-selection';
import ColumnOrder from './templates/product-table/column-order';
import ColumnHiding from './templates/product-table/column-hiding';

function App() {
  return (
    <div className="App">
      <ColumnHiding />
    </div>
  );
}

export default App;
