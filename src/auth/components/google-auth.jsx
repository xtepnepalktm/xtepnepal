"use client";

import { Iconify } from "@/components/iconify";
import { useAppSelector } from "@/redux/hooks";
import { CONFIG } from "@/global-config";
import { endpoints } from "@/api";

export function GoogleAuth({ type = "Continue" }) {
  const { vendor } = useAppSelector((state) => state.vendor);

  const handleSignInWithGoogle = () => {
    // Use vendor_id from vendor state or fallback to CONFIG
    const vendorId = vendor?.vendor_id || CONFIG.vendorId;
    window.location.href = endpoints.auth.googleRedirect(vendorId);
  };

  return (
    <button
      onClick={handleSignInWithGoogle}
      className="
        w-full flex items-center justify-center gap-2
        border border-gray-300
        rounded-md
        px-4 py-2.5
        text-sm font-medium
        text-gray-700
        hover:bg-gray-50
        transition
        active:scale-[0.98]
      "
    >
      <Iconify icon="devicon:google" className="text-lg" />
      {type} with Google
    </button>
  );
}
