import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center mt-8">
      <nav className="inline-flex rounded-md shadow" aria-label="Pagination">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
          aria-label="Previous Page"
        >
          Previous
        </button>

        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`px-3 py-1 border-t border-b border-gray-300 transition 
              ${currentPage === number 
                ? 'bg-blue-50 text-blue-600 font-semibold' 
                : 'bg-white text-gray-500 hover:bg-gray-50 hover:scale-105'}
            `}
            aria-current={currentPage === number ? 'page' : undefined}
            aria-label={`Page ${number}`}
            type="button"
          >
            {number}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
          aria-label="Next Page"
        >
          Next
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
