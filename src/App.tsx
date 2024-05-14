import React from 'react';
import BasicTable from './templates/product-table/product-table';
import SortingTable from './templates/product-table/sorting-table';
import FilteringTable from './templates/product-table/filtering-table';

function App() {
  return (
    <div className="App">
      <FilteringTable />
    </div>
  );
}

export default App;
