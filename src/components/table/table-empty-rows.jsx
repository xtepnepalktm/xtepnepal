// import TableRow from '@mui/material/TableRow';
// import TableCell from '@mui/material/TableCell';

// // ----------------------------------------------------------------------

// export function TableEmptyRows({ emptyRows, height, sx, ...other }) {
//   if (!emptyRows) {
//     return null;
//   }

//   return (
//     <TableRow
//       sx={[
//         () => ({
//           ...(height && { height: height * emptyRows }),
//         }),
//         ...(Array.isArray(sx) ? sx : [sx]),
//       ]}
//       {...other}
//     >
//       <TableCell colSpan={9} />
//     </TableRow>
//   );
// }
export function TableEmptyRows({ emptyRows, height = 0, className = "", ...other }) {
  if (!emptyRows) return null;

  return (
    <>
      {Array.from({ length: emptyRows }).map((_, index) => (
        <tr
          key={index}
          className={className}
          style={{
            height: height ? `${height}px` : undefined,
          }}
          {...other}
        >
          <td colSpan={9} />
        </tr>
      ))}
    </>
  );
}