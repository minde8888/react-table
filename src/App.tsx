import React from 'react';
import BasicTable from './templates/product-table/product-table';
import SortingTable from './templates/product-table/sorting-table';
import FilteringTable from './templates/product-table/filtering-table';
import PaginationTable from './templates/product-table/pagination-table';

function App() {
  return (
    <div className="App">
      <PaginationTable />
    </div>
  );
}

export default App;
