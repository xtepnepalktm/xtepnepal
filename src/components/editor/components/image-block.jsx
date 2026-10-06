// import { useState, useCallback } from 'react';

// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Popover from '@mui/material/Popover';
// import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';

// import { editorClasses } from '../classes';
// import { ToolbarItem } from './toolbar-item';

// // ----------------------------------------------------------------------

// export function ImageBlock({ editor }) {
//   const [url, setUrl] = useState('');

//   const [anchorEl, setAnchorEl] = useState(null);

//   const handleOpenPopover = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClosePopover = () => {
//     setAnchorEl(null);
//   };

//   const handleUpdateUrl = useCallback(() => {
//     handleClosePopover();

//     if (anchorEl) {
//       editor?.chain().focus().setImage({ src: url }).run();
//     }
//   }, [anchorEl, editor, url]);

//   if (!editor) {
//     return null;
//   }

//   return (
//     <>
//       <ToolbarItem
//         aria-label="Image"
//         className={editorClasses.toolbar.image}
//         onClick={handleOpenPopover}
//         icon={
//           <path d="M20 5H4V19L13.2923 9.70649C13.6828 9.31595 14.3159 9.31591 14.7065 9.70641L20 15.0104V5ZM2 3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934ZM8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11Z" />
//         }
//       />
//       <Popover
//         id={anchorEl ? 'simple-popover' : undefined}
//         open={!!anchorEl}
//         anchorEl={anchorEl}
//         onClose={handleClosePopover}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
//         slotProps={{ paper: { sx: { p: 2.5 } } }}
//       >
//         <Typography variant="subtitle2" sx={{ mb: 1 }}>
//           URL
//         </Typography>

//         <Box sx={{ gap: 1, display: 'flex', alignItems: 'center' }}>
//           <TextField
//             size="small"
//             placeholder="Enter URL here..."
//             value={url}
//             onChange={(event) => {
//               setUrl(event.target.value);
//             }}
//             sx={{ width: 240 }}
//           />
//           <Button variant="contained" onClick={handleUpdateUrl}>
//             Apply
//           </Button>
//         </Box>
//       </Popover>
//     </>
//   );
// }
'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { ToolbarItem } from './toolbar-item';
import { editorClasses } from '../classes';

export function ImageBlock({ editor }) {
  const [url, setUrl] = useState('');
  const [open, setOpen] = useState(false);

  const containerRef = useRef(null);

  const handleUpdateUrl = useCallback(() => {
    if (!url.trim()) return;

    editor?.chain().focus().setImage({ src: url }).run();
    setUrl('');
    setOpen(false);
  }, [editor, url]);

  // close on outside click (popover replacement)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!editor) return null;

  return (
    <div ref={containerRef} className="relative inline-block">
      {/* Toolbar Button */}
      <ToolbarItem
        aria-label="Image"
        className={editorClasses.toolbar.image}
        onClick={() => setOpen((v) => !v)}
        icon={
          <path d="M20 5H4V19L13.2923 9.70649C13.6828 9.31595 14.3159 9.31591 14.7065 9.70641L20 15.0104V5ZM2 3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934ZM8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11Z" />
        }
      />

      {/* Popover */}
      {open && (
        <div className="absolute left-0 mt-2 z-50 w-80  border border-gray-200 bg-white shadow-lg p-4">
          {/* Title */}
          <p className="text-sm font-semibold mb-2 text-gray-700">
            URL
          </p>

          {/* Input + Button */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Enter URL here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="
                flex-1 px-3 py-2 text-sm
                border border-gray-300 rounded-md
                focus:outline-none focus:ring-2 focus:ring-black/20
              "
            />

            <button
              onClick={handleUpdateUrl}
              className="
                px-4 py-2 text-sm font-medium
                bg-black text-white rounded-md
                hover:bg-black/80 transition
              "
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}