// import { Box, Pagination, paginationClasses } from "@mui/material";

// import { paths } from "@/routes/paths";

// import { BlogItem } from "./blog-item";
// import { BlogItemSkeleton } from "./blog-skeleton";

// // ----------------------------------------------------------------------

// export function BlogList({ blogs, loading }) {
//   const renderLoading = () => <BlogItemSkeleton />;

//   const renderList = () =>
//     blogs.map((blog) => (
//       <BlogItem
//         key={blog.id}
//         blog={blog}
//         detailsHref={paths.blog.details(blog.slug)}
//       />
//     ));

//   return (
//     <>
//       <Box
//         sx={{
//           gap: 3,
//           display: "grid",
//           gridTemplateColumns: {
//             xs: "repeat(1, 1fr)",
//             md: "repeat(2, 1fr)",
//             md: "repeat(3, 1fr)",
//           },
//         }}
//       >
//         {loading ? renderLoading() : renderList()}
//       </Box>

//       {blogs.length > 8 && (
//         <Pagination
//           count={8}
//           sx={{
//             mt: { xs: 5, md: 8 },
//             [`& .${paginationClasses.ul}`]: { justifyContent: "center" },
//           }}
//         />
//       )}
//     </>
//   );
// }
import { paths } from "@/routes/paths";

import { BlogItem } from "./blog-item";
import { BlogItemSkeleton } from "./blog-skeleton";

// ----------------------------------------------------------------------

export function BlogList({ blogs, loading }) {
  const renderLoading = () => <BlogItemSkeleton />;

  const renderList = () =>
    blogs.map((blog) => (
      <BlogItem
        key={blog.id}
        blog={blog}
        detailsHref={paths.blog.details(blog.slug)}
      />
    ));

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-5">
        {loading ? renderLoading() : renderList()}
      </div>

      {blogs.length > 8 && (
        <div className="mt-8 flex justify-center md:mt-12">
          {/* Replace with your pagination component */}
          <div className="flex items-center gap-2">
            {Array.from({ length: 8 }).map((_, index) => (
              <button
                key={index}
                className="flex h-10 w-10 items-center justify-center  border border-gray-300 text-sm transition hover:bg-gray-100"
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}