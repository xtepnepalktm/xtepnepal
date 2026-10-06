// import { useState, useCallback } from 'react';

// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Popover from '@mui/material/Popover';
// import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';

// import { editorClasses } from '../classes';
// import { ToolbarItem } from './toolbar-item';

// // ----------------------------------------------------------------------

// export function LinkBlock({ editor }) {
//   const [url, setUrl] = useState('');

//   const [anchorEl, setAnchorEl] = useState(null);

//   const handleOpenPopover = (event) => {
//     const previousUrl = editor?.getAttributes('link').href;

//     setAnchorEl(event.currentTarget);

//     if (previousUrl) {
//       setUrl(previousUrl);
//     } else {
//       setUrl('');
//     }
//   };

//   const handleClosePopover = () => {
//     setAnchorEl(null);
//   };

//   const handleUpdateUrl = useCallback(() => {
//     handleClosePopover();

//     if (!url) {
//       editor?.chain().focus().extendMarkRange('link').unsetLink().run();
//     } else {
//       editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
//     }
//   }, [editor, url]);

//   if (!editor) {
//     return null;
//   }

//   return (
//     <>
//       <ToolbarItem
//         aria-label="Link"
//         active={editor.isActive('link')}
//         className={editorClasses.toolbar.link}
//         onClick={handleOpenPopover}
//         icon={
//           <path d="M17.6567 14.8284L16.2425 13.4142L17.6567 12C19.2188 10.4379 19.2188 7.90524 17.6567 6.34314C16.0946 4.78105 13.5619 4.78105 11.9998 6.34314L10.5856 7.75736L9.17139 6.34314L10.5856 4.92893C12.9287 2.58578 16.7277 2.58578 19.0709 4.92893C21.414 7.27208 21.414 11.0711 19.0709 13.4142L17.6567 14.8284ZM14.8282 17.6569L13.414 19.0711C11.0709 21.4142 7.27189 21.4142 4.92875 19.0711C2.5856 16.7279 2.5856 12.9289 4.92875 10.5858L6.34296 9.17157L7.75717 10.5858L6.34296 12C4.78086 13.5621 4.78086 16.0948 6.34296 17.6569C7.90506 19.2189 10.4377 19.2189 11.9998 17.6569L13.414 16.2426L14.8282 17.6569ZM14.8282 7.75736L16.2425 9.17157L9.17139 16.2426L7.75717 14.8284L14.8282 7.75736Z" />
//         }
//       />

//       <ToolbarItem
//         aria-label="Unset link"
//         disabled={!editor.isActive('link')}
//         className={editorClasses.toolbar.unsetlink}
//         onClick={() => editor.chain().focus().unsetLink().run()}
//         icon={
//           <path d="M17.657 14.8284L16.2428 13.4142L17.657 12C19.2191 10.4379 19.2191 7.90526 17.657 6.34316C16.0949 4.78106 13.5622 4.78106 12.0001 6.34316L10.5859 7.75737L9.17171 6.34316L10.5859 4.92895C12.9291 2.5858 16.7281 2.5858 19.0712 4.92895C21.4143 7.27209 21.4143 11.0711 19.0712 13.4142L17.657 14.8284ZM14.8286 17.6569L13.4143 19.0711C11.0712 21.4142 7.27221 21.4142 4.92907 19.0711C2.58592 16.7279 2.58592 12.9289 4.92907 10.5858L6.34328 9.17159L7.75749 10.5858L6.34328 12C4.78118 13.5621 4.78118 16.0948 6.34328 17.6569C7.90538 19.219 10.438 19.219 12.0001 17.6569L13.4143 16.2427L14.8286 17.6569ZM14.8286 7.75737L16.2428 9.17159L9.17171 16.2427L7.75749 14.8284L14.8286 7.75737ZM5.77539 2.29291L7.70724 1.77527L8.74252 5.63897L6.81067 6.15661L5.77539 2.29291ZM15.2578 18.3611L17.1896 17.8434L18.2249 21.7071L16.293 22.2248L15.2578 18.3611ZM2.29303 5.77527L6.15673 6.81054L5.63909 8.7424L1.77539 7.70712L2.29303 5.77527ZM18.3612 15.2576L22.2249 16.2929L21.7072 18.2248L17.8435 17.1895L18.3612 15.2576Z" />
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
import clsx from 'clsx';

export function LinkBlock({ editor }) {
  const [url, setUrl] = useState('');
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const popoverRef = useRef(null);

  const handleOpen = () => {
    const previousUrl = editor?.getAttributes('link')?.href || '';
    setUrl(previousUrl);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateUrl = useCallback(() => {
    handleClose();

    if (!url) {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
    } else {
      editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  }, [editor, url]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!editor) return null;

  return (
    <div className="relative inline-flex items-center gap-2">
      {/* LINK BUTTON */}
      <button
        ref={buttonRef}
        onClick={handleOpen}
        className={clsx(
          'w-10 h-10 flex items-center justify-center rounded-md border transition',
          editor.isActive('link')
            ? 'bg-blue-100 text-blue-600'
            : 'hover:bg-gray-100'
        )}
        aria-label="Link"
      >
        🔗
      </button>

      {/* UNSET BUTTON */}
      <button
        disabled={!editor.isActive('link')}
        onClick={() => editor.chain().focus().unsetLink().run()}
        className={clsx(
          'w-10 h-10 flex items-center justify-center rounded-md border transition',
          !editor.isActive('link')
            ? 'opacity-40 cursor-not-allowed'
            : 'hover:bg-gray-100'
        )}
        aria-label="Unset link"
      >
        ✂
      </button>

      {/* POPOVER */}
      {open && (
        <div
          ref={popoverRef}
          className="absolute left-0 top-12 z-50 w-80  border bg-white p-4 shadow-lg"
        >
          <div className="mb-2 text-sm font-semibold">URL</div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter URL here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full rounded-md border px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              onClick={handleUpdateUrl}
              className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}