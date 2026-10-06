"use client";

import { useRef, useState, useEffect } from "react";
import clsx from "clsx";

import { useAppSelector } from "@/redux/hooks";
import { RouterLink } from "@/routes/components";

import { AccountButton } from "./account-button";
import { SignOutButton } from "./sign-out-button";

// ----------------------------------------------------------------------

export function AccountPopover({
  data = [],
  className = "",
  ...other
}) {
  const { profile } = useAppSelector(
    (state) => state.profile
  );

  const [open, setOpen] = useState(false);

  const containerRef = useRef(null);

  const onOpen = () => setOpen(true);

  const onClose = () => setOpen(false);

  // ----------------------------------------------------------------------
  // Close on outside click
  // ----------------------------------------------------------------------

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  // ----------------------------------------------------------------------

  return (
    <div
      ref={containerRef}
      className={clsx(
        "relative flex items-center",
        className
      )}
      {...other}
    >
      <AccountButton
        onClick={() =>
          setOpen((prev) => !prev)
        }
        photoURL={profile?.featured_image}
        displayName={
          profile?.customer_name ||
          profile?.full_name
        }
      />

      {open && (
        <div
          className="
            absolute right-0 top-full mt-3
            z-[9999]
            min-w-[260px]
            overflow-hidden
            border border-gray-200
            bg-white
            shadow-[0_20px_50px_rgba(0,0,0,0.12)]
            animate-in fade-in zoom-in-95
            duration-150
          "
        >
          {/* Arrow */}
          <div
            className="
              absolute -top-2 right-6
              h-4 w-4
              rotate-45
              border-l border-t border-gray-200
              bg-white
            "
          />

          {/* User Info */}
          <div className="relative px-4 py-4">
            <p className="truncate text-sm font-semibold text-gray-900">
              {profile?.full_name || "User"}
            </p>

            <p className="mt-0.5 truncate text-xs text-gray-500">
              {profile?.email}
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-dashed border-gray-200" />

          {/* Menu */}
          <div className="p-2">
            {data.map((option) => (
              <RouterLink
                key={option.label}
                href={option.href}
                onClick={onClose}
                className="
                  group flex items-center
                  
                  px-3 py-2.5
                  text-sm font-medium
                  text-gray-600
                  transition-all duration-150
                  hover:bg-gray-100
                  hover:text-gray-900
                "
              >
                {/* Icon */}
                <span
                  className="
                    flex h-6 w-6 shrink-0
                    items-center justify-center
                    [&>svg]:h-6
                    [&>svg]:w-6
                  "
                >
                  {option.icon}
                </span>

                {/* Label */}
                <span className="ml-3 flex-1">
                  {option.label}
                </span>

                {/* Badge */}
                {option.info && (
                  <span
                    className="
                      ml-2
                      rounded-full
                      bg-red-500
                      px-2 py-0.5
                      text-[12px]
                      font-semibold
                      text-white
                    "
                  >
                    {option.info}
                  </span>
                )}
              </RouterLink>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-dashed border-gray-200" />

          {/* Logout */}
          <div className="p-2">
            <div
              className="
                
                transition-colors
                hover:bg-gray-100
              "
            >
              <SignOutButton
                onClose={onClose}
                className="
                  flex w-full items-center
                  justify-start
                  px-3 py-2.5
                  text-sm font-medium
                  text-gray-600
                "
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}