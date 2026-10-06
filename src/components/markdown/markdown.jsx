// import "./code-highlight-block.css";

// import { useMemo } from "react";
// import remarkGfm from "remark-gfm";
// import rehypeRaw from "rehype-raw";
// import rehypeHighlight from "rehype-highlight";
// import { mergeClasses, isExternalLink } from "minimal-shared/utils";

// import Link from "@mui/material/Link";

// import { RouterLink } from "@/routes/components";

// import { Image } from "../image";
// import { MarkdownRoot } from "./styles";
// import { markdownClasses } from "./classes";
// import { htmlToMarkdown, isMarkdownContent } from "./html-to-markdown";

// // ----------------------------------------------------------------------

// export function Markdown({ children, sx, className, ...other }) {
//   const content = useMemo(() => {
//     if (isMarkdownContent(`${children}`)) {
//       return children;
//     }
//     return htmlToMarkdown(`${children}`.trim());
//   }, [children]);

//   return (
//     <MarkdownRoot
//       children={content}
//       components={components}
//       rehypePlugins={rehypePlugins}
//       /* base64-encoded images
//        * https://github.com/remarkjs/react-markdown/issues/774
//        * urlTransform={(value) => value}
//        */
//       className={mergeClasses([markdownClasses.root, className])}
//       sx={sx}
//       {...other}
//     />
//   );
// }

// const rehypePlugins = [
//   rehypeRaw,
//   rehypeHighlight,
//   [remarkGfm, { singleTilde: false }],
// ];

// const components = {
//   img: ({ ...other }) => (
//     <Image
//       ratio="16/9"
//       className={markdownClasses.content.image}
//       sx={{ borderRadius: 2 }}
//       {...other}
//     />
//   ),
//   a: ({ href, children, node, ...other }) => {
//     const linkProps = isExternalLink(href)
//       ? { target: "_blank", rel: "noopener" }
//       : { component: RouterLink };

//     return (
//       <Link
//         {...linkProps}
//         href={href}
//         className={markdownClasses.content.link}
//         {...other}
//       >
//         {children}
//       </Link>
//     );
//   },
//   pre: ({ children }) => (
//     <div className={markdownClasses.content.codeBlock}>
//       <pre>{children}</pre>
//     </div>
//   ),
//   code({ className, children, node, ...other }) {
//     const language = /language-(\w+)/.exec(className || "");

//     return language ? (
//       <code {...other} className={className}>
//         {children}
//       </code>
//     ) : (
//       <code {...other} className={markdownClasses.content.codeInline}>
//         {children}
//       </code>
//     );
//   },
// };
'use client';

import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import clsx from 'clsx';

import { isExternalLink } from 'minimal-shared/utils';
import { RouterLink } from '@/routes/components';
import { Image } from '../image';
import { htmlToMarkdown, isMarkdownContent } from './html-to-markdown';

// ------------------------------------------------------

export function Markdown({ children, className = '', ...other }) {
  const content = useMemo(() => {
    if (isMarkdownContent(`${children}`)) {
      return children;
    }
    return htmlToMarkdown(`${children}`.trim());
  }, [children]);

  return (
    <ReactMarkdown
      {...other}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeHighlight]}
      components={components}
      className={clsx(
        'prose prose-sm max-w-none dark:prose-invert',
        className
      )}
    >
      {content}
    </ReactMarkdown>
  );
}

// ------------------------------------------------------

const components = {
  // IMAGE
  img: ({ src, alt }) => (
    <Image
      src={src}
      alt={alt}
      className="my-3 "
    />
  ),

  // LINK (internal + external)
  a: ({ href, children }) => {
    const external = isExternalLink(href);

    const className =
      'text-blue-600 dark:text-blue-400 underline underline-offset-2 hover:opacity-80 transition';

    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {children}
        </a>
      );
    }

    return (
      <RouterLink href={href} className={className}>
        {children}
      </RouterLink>
    );
  },

  // BLOCK CODE WRAPPER
  pre: ({ children }) => (
    <div className="my-4 overflow-x-auto  bg-zinc-900 p-4 text-sm text-white">
      <pre className="whitespace-pre-wrap">{children}</pre>
    </div>
  ),

  // INLINE + BLOCK CODE
  code({ className, children }) {
    const isBlock = /language-(\w+)/.test(className || '');

    if (isBlock) {
      return <code className={className}>{children}</code>;
    }

    return (
      <code className="rounded bg-gray-200 px-1 py-0.5 text-sm dark:bg-gray-800">
        {children}
      </code>
    );
  },
};