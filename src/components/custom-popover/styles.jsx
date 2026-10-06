// import { varAlpha } from 'minimal-shared/utils';

// import { styled } from '@mui/material/styles';

// // ----------------------------------------------------------------------

// const centerStyles = {
//   hCenter: { left: 0, right: 0, margin: 'auto' },
//   vCenter: { top: 0, bottom: 0, margin: 'auto' },
// };

// const getRtlPosition = (position, isRtl, value) => ({
//   [position]: isRtl ? 'auto' : value,
//   [position === 'left' ? 'right' : 'left']: isRtl ? value : 'auto',
// });

// const createBackgroundStyles = (theme, color, size) => {
//   const colorChannel = theme.vars.palette[color === 'cyan' ? 'info' : 'error'].mainChannel;

//   return {
//     backgroundRepeat: 'no-repeat',
//     backgroundSize: `${size * 3}px ${size * 3}px`,
//     backgroundColor: theme.vars.palette.background.paper,
//     backgroundPosition: color === 'cyan' ? 'top right' : 'bottom left',
//     backgroundImage: `linear-gradient(45deg, ${varAlpha(colorChannel, 0.1)}, ${varAlpha(colorChannel, 0.1)})`,
//   };
// };

// const arrowDirection = {
//   top: { top: 0, rotate: '135deg', translate: '0 -50%' },
//   bottom: { bottom: 0, rotate: '-45deg', translate: '0 50%' },
//   left: { rotate: '45deg', translate: '-50% 0' },
//   right: { rotate: '-135deg', translate: '50% 0' },
// };

// export const Arrow = styled('span', {
//   shouldForwardProp: (prop) => !['size', 'placement', 'offset', 'sx'].includes(prop),
// })(({ offset = 0, size = 0, theme }) => {
//   const isRtl = theme.direction === 'rtl';

//   const cyanBackgroundStyles = createBackgroundStyles(theme, 'cyan', size);
//   const redBackgroundStyles = createBackgroundStyles(theme, 'red', size);

//   return {
//     width: size,
//     height: size,
//     position: 'absolute',
//     backdropFilter: '6px',
//     borderBottomLeftRadius: size / 4,
//     clipPath: 'polygon(0% 0%, 100% 100%, 0% 100%)',
//     backgroundColor: theme.vars.palette.background.paper,
//     border: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)}`,
//     ...theme.applyStyles('dark', {
//       border: `solid 1px ${varAlpha(theme.vars.palette.common.blackChannel, 0.12)}`,
//     }),

//     variants: [
//       /**
//        * @position top*
//        */
//       {
//         props: ({ placement }) => placement?.startsWith('top-'),
//         style: { ...arrowDirection.top },
//       },
//       {
//         props: { placement: 'top-left' },
//         style: { ...getRtlPosition('left', isRtl, offset) },
//       },
//       {
//         props: { placement: 'top-center' },
//         style: { ...centerStyles.hCenter },
//       },
//       {
//         props: { placement: 'top-right' },
//         style: { ...getRtlPosition('right', isRtl, offset), ...cyanBackgroundStyles },
//       },
//       /**
//        * @position bottom*
//        */
//       {
//         props: ({ placement }) => placement?.startsWith('bottom-'),
//         style: { ...arrowDirection.bottom },
//       },
//       {
//         props: { placement: 'bottom-left' },
//         style: { ...getRtlPosition('left', isRtl, offset), ...redBackgroundStyles },
//       },
//       {
//         props: { placement: 'bottom-center' },
//         style: { ...centerStyles.hCenter },
//       },
//       {
//         props: { placement: 'bottom-right' },
//         style: { ...getRtlPosition('right', isRtl, offset) },
//       },
//       /**
//        * @position left*
//        */
//       {
//         props: ({ placement }) => placement?.startsWith('left-'),
//         style: { ...getRtlPosition('left', isRtl, 0), ...arrowDirection.left },
//       },
//       {
//         props: { placement: 'left-top' },
//         style: { top: offset },
//       },
//       {
//         props: { placement: 'left-center' },
//         style: { ...centerStyles.vCenter, ...redBackgroundStyles },
//       },
//       {
//         props: { placement: 'left-bottom' },
//         style: { ...redBackgroundStyles, bottom: offset },
//       },
//       /**
//        * @position right*
//        */
//       {
//         props: ({ placement }) => placement?.startsWith('right-'),
//         style: { ...getRtlPosition('right', isRtl, 0), ...arrowDirection.right },
//       },
//       {
//         props: { placement: 'right-top' },
//         style: { ...cyanBackgroundStyles, top: offset },
//       },
//       {
//         props: { placement: 'right-center' },
//         style: { ...centerStyles.vCenter, ...cyanBackgroundStyles },
//       },
//       {
//         props: { placement: 'right-bottom' },
//         style: { bottom: offset },
//       },
//     ],
//   };
// });
"use client";

// ----------------------------------------------------------------------

const centerStyles = {
  hCenter: {
    left: "50%",
    transform: "translateX(-50%) rotate(135deg)",
  },

  vCenter: {
    top: "50%",
    transform: "translateY(-50%) rotate(45deg)",
  },
};

// ----------------------------------------------------------------------

const arrowDirection = {
  top: {
    top: 0,
    transform: "translateY(-50%) rotate(135deg)",
  },

  bottom: {
    bottom: 0,
    transform: "translateY(50%) rotate(-45deg)",
  },

  left: {
    left: 0,
    transform: "translateX(-50%) rotate(45deg)",
  },

  right: {
    right: 0,
    transform: "translateX(50%) rotate(-135deg)",
  },
};

// ----------------------------------------------------------------------

function createBackgroundStyles(color, size) {
  return {
    backgroundRepeat: "no-repeat",
    backgroundSize: `${size * 3}px ${size * 3}px`,
    backgroundPosition:
      color === "cyan" ? "top right" : "bottom left",

    backgroundImage:
      color === "cyan"
        ? "linear-gradient(45deg, rgba(6,182,212,0.1), rgba(6,182,212,0.1))"
        : "linear-gradient(45deg, rgba(239,68,68,0.1), rgba(239,68,68,0.1))",
  };
}

// ----------------------------------------------------------------------

export function Arrow({
  size = 14,
  offset = 17,
  placement = "top-right",
  className = "",
}) {
  const style = {
    width: size,
    height: size,
    position: "absolute",
    backdropFilter: "blur(6px)",
    clipPath: "polygon(0% 0%, 100% 100%, 0% 100%)",
    borderBottomLeftRadius: size / 4,
    backgroundColor: "white",
    border: "1px solid rgba(0,0,0,0.12)",
  };

  // --------------------------------------------------------------------
  // TOP
  // --------------------------------------------------------------------

  if (placement.startsWith("top-")) {
    Object.assign(style, arrowDirection.top);

    if (placement === "top-left") {
      style.left = offset;
    }

    if (placement === "top-center") {
      Object.assign(style, centerStyles.hCenter);
    }

    if (placement === "top-right") {
      style.right = offset;

      Object.assign(
        style,
        createBackgroundStyles("cyan", size)
      );
    }
  }

  // --------------------------------------------------------------------
  // BOTTOM
  // --------------------------------------------------------------------

  if (placement.startsWith("bottom-")) {
    Object.assign(style, arrowDirection.bottom);

    if (placement === "bottom-left") {
      style.left = offset;

      Object.assign(
        style,
        createBackgroundStyles("red", size)
      );
    }

    if (placement === "bottom-center") {
      style.left = "50%";
      style.transform =
        "translateX(-50%) translateY(50%) rotate(-45deg)";
    }

    if (placement === "bottom-right") {
      style.right = offset;
    }
  }

  // --------------------------------------------------------------------
  // LEFT
  // --------------------------------------------------------------------

  if (placement.startsWith("left-")) {
    Object.assign(style, arrowDirection.left);

    if (placement === "left-top") {
      style.top = offset;
    }

    if (placement === "left-center") {
      Object.assign(style, centerStyles.vCenter);

      Object.assign(
        style,
        createBackgroundStyles("red", size)
      );
    }

    if (placement === "left-bottom") {
      style.bottom = offset;

      Object.assign(
        style,
        createBackgroundStyles("red", size)
      );
    }
  }

  // --------------------------------------------------------------------
  // RIGHT
  // --------------------------------------------------------------------

  if (placement.startsWith("right-")) {
    Object.assign(style, arrowDirection.right);

    if (placement === "right-top") {
      style.top = offset;

      Object.assign(
        style,
        createBackgroundStyles("cyan", size)
      );
    }

    if (placement === "right-center") {
      Object.assign(style, centerStyles.vCenter);

      style.right = 0;
      style.left = "auto";
      style.transform =
        "translateX(50%) translateY(-50%) rotate(-135deg)";

      Object.assign(
        style,
        createBackgroundStyles("cyan", size)
      );
    }

    if (placement === "right-bottom") {
      style.bottom = offset;
    }
  }

  // --------------------------------------------------------------------

  return (
    <span
      className={className}
      style={style}
    />
  );
}