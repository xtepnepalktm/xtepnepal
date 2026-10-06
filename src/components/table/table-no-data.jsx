// import TableRow from '@mui/material/TableRow';
// import TableCell from '@mui/material/TableCell';

// import { EmptyContent } from '../empty-content';

// // ----------------------------------------------------------------------

// export function TableNoData({ notFound, sx }) {
//   return (
//     <TableRow>
//       {notFound ? (
//         <TableCell colSpan={12}>
//           <EmptyContent filled sx={[{ py: 10 }, ...(Array.isArray(sx) ? sx : [sx])]} />
//         </TableCell>
//       ) : (
//         <TableCell colSpan={12} sx={{ p: 0 }} />
//       )}
//     </TableRow>
//   );
// }
import { EmptyContent } from "../empty-content";

export function TableNoData({ notFound, className = "" }) {
  return (
    <tr>
      {notFound ? (
        <td colSpan={12} className="p-4">
          <EmptyContent filled className={className} />
        </td>
      ) : (
        <td colSpan={12} className="p-0" />
      )}
    </tr>
  );
}