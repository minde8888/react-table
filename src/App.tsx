import React from 'react';
import BasicTable from './templates/product-table/product-table';
import SortingTable from './templates/product-table/sorting-table';
import FilteringTable from './templates/product-table/filtering-table';
import PaginationTable from './templates/product-table/pagination-table';
import RwoSelection from './templates/product-table/row-selection';

function App() {
  return (
    <div className="App">
      <RwoSelection />
    </div>
  );
}

export default App;
