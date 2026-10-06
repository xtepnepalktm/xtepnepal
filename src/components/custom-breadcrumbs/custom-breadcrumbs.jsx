// import Breadcrumbs from '@mui/material/Breadcrumbs';

// import { BackLink } from './back-link';
// import { MoreLinks } from './more-links';
// import { BreadcrumbsLink } from './breadcrumb-link';
// import {
//   BreadcrumbsRoot,
//   BreadcrumbsHeading,
//   BreadcrumbsContent,
//   BreadcrumbsContainer,
//   BreadcrumbsSeparator,
// } from './styles';

// // ----------------------------------------------------------------------

// export function CustomBreadcrumbs({
//   sx,
//   action,
//   backHref,
//   heading,
//   slots = {},
//   links = [],
//   moreLinks = [],
//   slotProps = {},
//   activeLast = false,
//   ...other
// }) {
//   const lastLink = links[links.length - 1]?.name;

//   const renderHeading = () => (
//     <BreadcrumbsHeading {...slotProps?.heading}>
//       {backHref ? <BackLink href={backHref} label={heading} /> : heading}
//     </BreadcrumbsHeading>
//   );

//   const renderLinks = () =>
//     slots?.breadcrumbs ?? (
//       <Breadcrumbs separator={<BreadcrumbsSeparator />} {...slotProps?.breadcrumbs}>
//         {links.map((link, index) => (
//           <BreadcrumbsLink
//             key={link.name ?? index}
//             icon={link.icon}
//             href={link.href}
//             name={link.name}
//             disabled={link.name === lastLink && !activeLast}
//           />
//         ))}
//       </Breadcrumbs>
//     );

//   const renderMoreLinks = () => <MoreLinks links={moreLinks} {...slotProps?.moreLinks} />;

//   return (
//     <BreadcrumbsRoot sx={sx} {...other}>
//       <BreadcrumbsContainer {...slotProps?.container}>
//         <BreadcrumbsContent {...slotProps?.content}>
//           {(heading || backHref) && renderHeading()}
//           {(!!links.length || slots?.breadcrumbs) && renderLinks()}
//         </BreadcrumbsContent>
//         {action}
//       </BreadcrumbsContainer>

//       {!!moreLinks?.length && renderMoreLinks()}
//     </BreadcrumbsRoot>
//   );
// }

import { BackLink } from './back-link';
import { MoreLinks } from './more-links';
import { BreadcrumbsLink } from './breadcrumb-link';

// ----------------------------------------------------------------------

export function CustomBreadcrumbs({
  className,
  action,
  backHref,
  heading,
  slots = {},
  links = [],
  moreLinks = [],
  slotProps = {},
  activeLast = false,
  ...other
}) {
  const lastLink = links[links.length - 1]?.name;

  const renderHeading = () => (
    <h1 className="text-2xl font-bold truncate" {...slotProps?.heading}>
      {backHref ? <BackLink href={backHref} label={heading} /> : heading}
    </h1>
  );

  const renderLinks = () =>
    slots?.breadcrumbs ?? (
      <nav aria-label="breadcrumb" {...slotProps?.breadcrumbs}>
        <ol className="flex items-center justify-start flex-wrap gap-1 w-full">
          {links.map((link, index) => (
            <li key={link.name ?? index} className="flex items-center gap-1">
              <BreadcrumbsLink
                icon={link.icon}
                href={link.href}
                name={link.name}
                disabled={link.name === lastLink && !activeLast}
              />
              {index < links.length - 1 && (
                <span className="w-1 h-1 rounded-full bg-current opacity-40 mx-0.5" />
              )}
            </li>
          ))}
        </ol>
      </nav>
    );

  const renderMoreLinks = () => <MoreLinks links={moreLinks} {...slotProps?.moreLinks} />;

  return (
    <div className={`py-3 ${className || ''}`} {...other}>
      <div className="flex items-center justify-start gap-3" {...slotProps?.container}>
        <div className="flex flex-col gap-1 min-w-0" {...slotProps?.content}>
          {(heading || backHref) && renderHeading()}
          {(!!links.length || slots?.breadcrumbs) && renderLinks()}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>

      {!!moreLinks?.length && renderMoreLinks()}
    </div>
  );
}