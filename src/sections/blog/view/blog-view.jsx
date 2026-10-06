"use client";

import { paths } from "@/routes/paths";

import { CustomBreadcrumbs } from "@/components/custom-breadcrumbs";
import { EmptyContent } from "@/components/empty-content";

import { BlogList } from "../blog-list";

import { useGetBlogs } from "@/api";

export function BlogView() {
  const { blogs, isLoading } = useGetBlogs();

  const isBlogsNotFound = !isLoading && !blogs?.length;

  const renderNotFound = () => (
    <EmptyContent title="No blogs found" filled sx={{ py: 10 }} />
  );

  return (
    <div className="mx-auto container w-full my-5 lg:px-10">
      <CustomBreadcrumbs
        heading="Blogs"
        links={[{ name: "Blog", href: paths.blog.root }, { name: "Posts" }]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      {isBlogsNotFound && renderNotFound()}

      <BlogList blogs={blogs} loading={isLoading} />
    </div>
  );
}