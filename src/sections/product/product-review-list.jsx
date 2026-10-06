// import React, { useState } from "react";

// import Pagination, { paginationClasses } from "@mui/material/Pagination";

// import { ProductReviewItem } from "./product-review-item";

// // ----------------------------------------------------------------------

// const REVIEWS_PER_PAGE = 5;

// export function ProductReviewList({ reviews }) {
//   const [currentPage, setCurrentPage] = useState(1);

//   const handlePageChange = (event, page) => {
//     setCurrentPage(page);
//   };

//   const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE;
//   const endIndex = startIndex + REVIEWS_PER_PAGE;

//   const currentReviews = reviews.slice(startIndex, endIndex);

//   return (
//     <>
//       {currentReviews.map((review) => (
//         <ProductReviewItem key={review.id} review={review} />
//       ))}

//       <Pagination
//         count={Math.ceil(reviews.length / REVIEWS_PER_PAGE)}
//         page={currentPage}
//         onChange={handlePageChange}
//         sx={{
//           mx: "auto",
//           [`& .${paginationClasses.ul}`]: {
//             my: 5,
//             mx: "auto",
//             justifyContent: "center",
//           },
//         }}
//       />
//     </>
//   );
// }
import React, { useState } from "react";

import { ProductReviewItem } from "./product-review-item";

// ----------------------------------------------------------------------

const REVIEWS_PER_PAGE = 5;

export function ProductReviewList({ reviews }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);

  const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE;
  const endIndex = startIndex + REVIEWS_PER_PAGE;

  const currentReviews = reviews.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPaginationButtons = () => {
    const buttons = [];

    for (let i = 1; i <= totalPages; i += 1) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-medium transition-all duration-200 ${currentPage === i
            ? "border-black bg-black text-white"
            : "border-gray-300 bg-white text-gray-700 hover:border-black hover:text-black"
            }`}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  return (
    <>
      {currentReviews.map((review) => (
        <ProductReviewItem key={review.id} review={review} />
      ))}

      {totalPages > 1 && (
        <div className="my-10 flex flex-wrap items-center justify-center gap-2">
          {/* Previous */}
          <button
            onClick={() =>
              currentPage > 1 && handlePageChange(currentPage - 1)
            }
            disabled={currentPage === 1}
            className={`flex h-10 items-center justify-center rounded-full border px-4 text-sm font-medium transition-all duration-200 ${currentPage === 1
              ? "cursor-not-allowed border-gray-200 text-gray-400"
              : "border-gray-300 text-gray-700 hover:border-black hover:text-black"
              }`}
          >
            Prev
          </button>

          {renderPaginationButtons()}

          {/* Next */}
          <button
            onClick={() =>
              currentPage < totalPages &&
              handlePageChange(currentPage + 1)
            }
            disabled={currentPage === totalPages}
            className={`flex h-10 items-center justify-center rounded-full border px-4 text-sm font-medium transition-all duration-200 ${currentPage === totalPages
              ? "cursor-not-allowed border-gray-200 text-gray-400"
              : "border-gray-300 text-gray-700 hover:border-black hover:text-black"
              }`}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}