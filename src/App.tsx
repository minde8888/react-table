import React from 'react';
import BasicTable from './templates/product-table/basic-table';
import SortingTable from './templates/product-table/sorting-table';
import FilteringTable from './templates/product-table/filtering-table';
import PaginationTable from './templates/product-table/pagination-table';
import RwoSelection from './templates/product-table/row-selection';
import ColumnOrder from './templates/product-table/column-order';
import ColumnHiding from './templates/product-table/column-hiding';
import StickyTable from './templates/product-table/sticky-table';

function App() {
  return (
    <div className="App">
      <StickyTable />
    </div>
  );
}

export default App;
