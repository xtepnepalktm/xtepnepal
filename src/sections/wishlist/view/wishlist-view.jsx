
"use client";

import { WishlistOverview } from "../wishlist-overview";

export function WishlistView() {
  return (
    <div className="mx-auto mb-10 mt-5 container px-4 sm:px-6 lg:px-8">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold ">Wishlist</h1>
      </div>

      {/* Grid Layout */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-12">
        {/* Main Content */}
        <div className="md:col-span-12">
          <div className=" bg-white shadow-sm">
            <WishlistOverview />
          </div>
        </div>
      </div>
    </div>
  );
}