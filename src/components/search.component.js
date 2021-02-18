import React from 'react';

function Search ({handleSearch, handleChange, searchValue}) {

  return (
   <div className="col-md-8">
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        value={searchValue}
        onChange={handleChange}
      />
      <div className="input-group-append">
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
   </div>

  );
}

export default Search;
