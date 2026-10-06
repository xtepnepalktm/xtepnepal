// import { useState } from 'react';
// import { varAlpha } from 'minimal-shared/utils';

// import Menu from '@mui/material/Menu';
// import { listClasses } from '@mui/material/List';
// import ButtonBase, { buttonBaseClasses } from '@mui/material/ButtonBase';

// import { Iconify } from '../../iconify';
// import { ToolbarItem } from './toolbar-item';

// const HEADING_OPTIONS = [
//   'Heading 1',
//   'Heading 2',
//   'Heading 3',
//   'Heading 4',
//   'Heading 5',
//   'Heading 6',
// ];

// // ----------------------------------------------------------------------

// export function HeadingBlock({ editor }) {
//   const [anchorEl, setAnchorEl] = useState(null);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   if (!editor) {
//     return null;
//   }

//   return (
//     <>
//       <ButtonBase
//         id="heading-menu-button"
//         aria-label="Heading menu button"
//         aria-controls={anchorEl ? 'heading-menu-button' : undefined}
//         aria-haspopup="true"
//         aria-expanded={anchorEl ? 'true' : undefined}
//         onClick={handleClick}
//         sx={(theme) => ({
//           px: 1,
//           width: 120,
//           height: 32,
//           borderRadius: 0.75,
//           typography: 'body2',
//           justifyContent: 'space-between',
//           border: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.2)}`,
//         })}
//       >
//         {(editor.isActive('heading', { level: 1 }) && 'Heading 1') ||
//           (editor.isActive('heading', { level: 2 }) && 'Heading 2') ||
//           (editor.isActive('heading', { level: 3 }) && 'Heading 3') ||
//           (editor.isActive('heading', { level: 4 }) && 'Heading 4') ||
//           (editor.isActive('heading', { level: 5 }) && 'Heading 5') ||
//           (editor.isActive('heading', { level: 6 }) && 'Heading 6') ||
//           'Paragraph'}

//         <Iconify
//           width={16}
//           icon={anchorEl ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
//         />
//       </ButtonBase>

//       <Menu
//         id="heading-menu"
//         anchorEl={anchorEl}
//         open={!!anchorEl}
//         onClose={handleClose}
//         MenuListProps={{ 'aria-labelledby': 'heading-button' }}
//         slotProps={{
//           paper: {
//             sx: {
//               width: 120,
//               [`& .${listClasses.root}`]: { gap: 0.5, display: 'flex', flexDirection: 'column' },
//               [`& .${buttonBaseClasses.root}`]: {
//                 px: 1,
//                 width: 1,
//                 height: 34,
//                 borderRadius: 0.75,
//                 justifyContent: 'flex-start',
//                 '&:hover': { backgroundColor: 'action.hover' },
//               },
//             },
//           },
//         }}
//       >
//         <ToolbarItem
//           component="li"
//           label="Paragraph"
//           active={editor.isActive('paragraph')}
//           onClick={() => {
//             handleClose();
//             editor.chain().focus().setParagraph().run();
//           }}
//         />

//         {HEADING_OPTIONS.map((heading, index) => {
//           const level = index + 1;

//           return (
//             <ToolbarItem
//               aria-label={heading}
//               component="li"
//               key={heading}
//               label={heading}
//               active={editor.isActive('heading', { level })}
//               onClick={() => {
//                 handleClose();
//                 editor.chain().focus().toggleHeading({ level }).run();
//               }}
//               sx={{
//                 ...(heading !== 'Paragraph' && {
//                   fontSize: 18 - index,
//                   fontWeight: 'fontWeightBold',
//                 }),
//               }}
//             />
//           );
//         })}
//       </Menu>
//     </>
//   );
// }
'use client';

import { useState } from 'react';
import { Iconify } from '../../iconify';

const HEADING_OPTIONS = [
  'Heading 1',
  'Heading 2',
  'Heading 3',
  'Heading 4',
  'Heading 5',
  'Heading 6',
];

export function HeadingBlock({ editor }) {
  const [open, setOpen] = useState(false);

  if (!editor) return null;

  const activeLabel =
    (editor.isActive('heading', { level: 1 }) && 'Heading 1') ||
    (editor.isActive('heading', { level: 2 }) && 'Heading 2') ||
    (editor.isActive('heading', { level: 3 }) && 'Heading 3') ||
    (editor.isActive('heading', { level: 4 }) && 'Heading 4') ||
    (editor.isActive('heading', { level: 5 }) && 'Heading 5') ||
    (editor.isActive('heading', { level: 6 }) && 'Heading 6') ||
    'Paragraph';

  const setHeading = (type, level = null) => {
    if (type === 'paragraph') {
      editor.chain().focus().setParagraph().run();
    } else {
      editor.chain().focus().toggleHeading({ level }).run();
    }
    setOpen(false);
  };

  return (
    <div className="relative inline-block">
      {/* Button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="
          flex items-center justify-between
          w-[120px] h-8 px-2
          text-sm font-medium
          border border-gray-300
          rounded-md
          bg-white
          hover:bg-gray-50
          transition
        "
      >
        <span>{activeLabel}</span>

        <Iconify
          width={16}
          icon={
            open
              ? 'eva:arrow-ios-upward-fill'
              : 'eva:arrow-ios-downward-fill'
          }
        />
      </button>

      {/* Dropdown */}
      {open && (
        <>
          {/* backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
          />

          {/* menu */}
          <div
            className="
              absolute z-20 mt-2
              w-[120px]
              bg-white
              border border-gray-200
              rounded-md
              shadow-lg
              p-1
            "
          >
            {/* Paragraph */}
            <button
              onClick={() => setHeading('paragraph')}
              className={`
                w-full text-left px-2 py-1.5 rounded-md text-sm
                hover:bg-gray-100 transition
                ${editor.isActive('paragraph') ? 'bg-gray-100 font-medium' : ''}
              `}
            >
              Paragraph
            </button>

            {/* Headings */}
            {HEADING_OPTIONS.map((label, index) => {
              const level = index + 1;

              const isActive = editor.isActive('heading', { level });

              return (
                <button
                  key={label}
                  onClick={() => setHeading('heading', level)}
                  className={`
                    w-full text-left px-2 py-1.5 rounded-md
                    hover:bg-gray-100 transition
                    ${isActive ? 'bg-gray-100 font-semibold' : ''}
                  `}
                  style={{
                    fontSize: `${18 - index}px`,
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}