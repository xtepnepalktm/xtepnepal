// "use client";

// import { useEffect, useState, useCallback } from "react";

// import { paths } from "@/routes/paths";
// import { useRouter } from "@/routes/hooks";

// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import {
//   getProfileRequest,
//   clearUser,
//   resetCart,
//   resetProfile,
//   clearWishlist,
// } from "@/redux/actions";

// import { CustomBreadcrumbs } from "@/components/custom-breadcrumbs";
// import { Iconify } from "@/components/iconify";
// import { toast } from "@/components/snackbar";

// import { EmailVerificationBanner } from "@/auth/components";

// import { ProfileAccount } from "../profile-account";
// import { ProfileAddress } from "../profile-address";
// import { OrderView } from "../../order/view";

// import { signOut } from "@/api/auth";

// // ----------------------------------------------------------------------

// const TABS = [
//   {
//     label: "Account",
//     value: "account",
//     icon: <Iconify width={24} icon="solar:user-id-bold" />,
//   },
//   {
//     label: "Order",
//     value: "order",
//     icon: <Iconify width={24} icon="solar:bill-list-bold" />,
//   },
//   {
//     label: "Address",
//     value: "address",
//     icon: <Iconify width={24} icon="mingcute:location-fill" />,
//   },
// ];

// // ----------------------------------------------------------------------

// export function ProfileView() {
//   const dispatch = useAppDispatch();

//   const { isLogin } = useAppSelector((state) => state.auth);

//   const router = useRouter();

//   const [selectedTab, setSelectedTab] = useState("account");

//   useEffect(() => {
//     if (isLogin) {
//       dispatch(getProfileRequest());
//     } else {
//       router.push(paths.auth.signIn);
//     }
//   }, [dispatch, isLogin]);

//   const handleTab = (value) => {
//     setSelectedTab(value);
//   };

//   const handleLogout = useCallback(async () => {
//     try {
//       await signOut();
//     } catch (error) {
//       console.error("Server logout failed (non-critical):", error);
//     }

//     dispatch(clearUser());
//     dispatch(resetCart());
//     dispatch(resetProfile());
//     dispatch(clearWishlist());

//     router.push(paths.home);

//     toast.success("You have been logged out!");
//   }, [router, dispatch]);

//   const renderTabContent = () => {
//     switch (selectedTab) {
//       case "account":
//         return <ProfileAccount />;
//       case "order":
//         return <OrderView />;
//       case "address":
//         return <ProfileAddress />;
//     }
//   };

//   return (
//     <div className="w-full container mx-auto px-4 sm:px-6 lg:px-8 my-5">
//       {/* CustomBreadcrumbs with logout action */}
//       <div className="mb-0">
//         <div className="flex items-center justify-between gap-4 w-full">
//           {/* Breadcrumb */}
//           <CustomBreadcrumbs
//             heading="Profile"
//             links={[
//               { name: "Profile", href: paths.profile.root },
//               { name: "Account" },
//             ]}
//           />

//           {/* Action */}
//           <button
//             onClick={handleLogout}
//             className="inline-flex items-center gap-1.5  bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
//           >
//             <Iconify icon="solar:logout-3-bold" className="h-4 w-4" />
//             Logout
//           </button>
//         </div>
//       </div>

//       <EmailVerificationBanner />

//       {/* Tabs */}
//       <div className="mb-2 md:mb-2">
//         <div className="flex border-b border-gray-200 mb-4">
//           {TABS.map((tab) => (
//             <button
//               key={tab.value}
//               onClick={() => handleTab(tab.value)}
//               className={`inline-flex items-center gap-2 px-2 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${selectedTab === tab.value
//                 ? "border-gray-900 text-gray-900"
//                 : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//                 }`}
//             >
//               {tab.icon}
//               {tab.label}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Tab Content */}
//       {renderTabContent()}
//     </div>
//   );
// }

"use client";

import { useEffect, useState, useCallback } from "react";

import { paths } from "@/routes/paths";
import { useRouter } from "@/routes/hooks";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getProfileRequest, clearUser, resetCart, resetProfile, clearWishlist } from "@/redux/actions";

import { CustomBreadcrumbs } from "@/components/custom-breadcrumbs";
import { Iconify } from "@/components/iconify";
import { toast } from "@/components/snackbar";

import { EmailVerificationBanner } from "@/auth/components";

import { ProfileAccount } from "../profile-account";
import { ProfileAddress } from "../profile-address";
import { OrderView } from "../../order/view";

import { signOut } from "@/api/auth";

// ── Design tokens ──
const WHITE = "#ffffff";
const BG = "#f5f5f5";
const RED = "#e61911";
const TEXT = "#1a1a1a";
const TEXT_MUTED = "#6b6b6b";
const BORDER = "#e8e8e8";

// ----------------------------------------------------------------------

const TABS = [
  { label: "Account", value: "account", icon: <Iconify width={18} icon="solar:user-id-bold" /> },
  { label: "Order", value: "order", icon: <Iconify width={18} icon="solar:bill-list-bold" /> },
  { label: "Address", value: "address", icon: <Iconify width={18} icon="mingcute:location-fill" /> },
];

// ----------------------------------------------------------------------

export function ProfileView() {
  const dispatch = useAppDispatch();
  const { isLogin } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("account");
  const [hoveredTab, setHoveredTab] = useState(null);
  const [logoutHovered, setLogoutHovered] = useState(false);

  useEffect(() => {
    if (isLogin) {
      dispatch(getProfileRequest());
    } else {
      router.push(paths.auth.signIn);
    }
  }, [dispatch, isLogin]);

  const handleLogout = useCallback(async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Server logout failed (non-critical):", error);
    }
    dispatch(clearUser());
    dispatch(resetCart());
    dispatch(resetProfile());
    dispatch(clearWishlist());
    router.push(paths.home);
    toast.success("You have been logged out!");
  }, [router, dispatch]);

  const renderTabContent = () => {
    switch (selectedTab) {
      case "account": return <ProfileAccount />;
      case "order": return <OrderView />;
      case "address": return <ProfileAddress />;
    }
  };

  return (
    <div style={{
      width: "100%",
      maxWidth: 1200,
      margin: "1.25rem auto",
      padding: "0 1rem",
    }}>

      {/* Header row */}
      <div style={{
        display: "flex", alignItems: "flex-start",
        justifyContent: "space-between", gap: "1rem",
        marginBottom: "1rem",
      }}>
        <CustomBreadcrumbs
          heading="Profile"
          links={[
            { name: "Profile", href: paths.profile.root },
            { name: "Account" },
          ]}
        />

        {/* Logout button */}
        <button
          onClick={handleLogout}
          onMouseEnter={() => setLogoutHovered(true)}
          onMouseLeave={() => setLogoutHovered(false)}
          style={{
            fontFamily: "Helvetica",
            fontSize: 9, fontWeight: 700,
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: logoutHovered ? RED : TEXT_MUTED,
            backgroundColor: logoutHovered ? `${RED}08` : BG,
            border: `1px solid ${logoutHovered ? `${RED}44` : BORDER}`,
            padding: "0.375rem 0.75rem",
            cursor: "pointer",
            display: "inline-flex", alignItems: "center", gap: "0.375rem",
            transition: "color 0.15s, border-color 0.15s, background-color 0.15s",
            flexShrink: 0,
          }}
        >
          <Iconify icon="solar:logout-3-bold" style={{ width: 14, height: 14 }} />
          Logout
        </button>
      </div>

      <EmailVerificationBanner />

      {/* Tabs */}
      <div style={{ marginBottom: "1rem" }}>

        {/* Tab strip */}
        <div style={{
          display: "flex",
          borderBottom: `1px solid ${BORDER}`,
          marginBottom: "1rem",
        }}>
          {TABS.map((tab) => {
            const isActive = selectedTab === tab.value;
            const isHovered = hoveredTab === tab.value;

            return (
              <button
                key={tab.value}
                onClick={() => setSelectedTab(tab.value)}
                onMouseEnter={() => setHoveredTab(tab.value)}
                onMouseLeave={() => setHoveredTab(null)}
                style={{
                  fontFamily: "Helvetica",
                  fontSize: 9, fontWeight: 700,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  color: isActive ? TEXT : isHovered ? TEXT : TEXT_MUTED,
                  backgroundColor: "transparent",
                  border: "none",
                  borderBottom: `2px solid ${isActive ? TEXT : "transparent"}`,
                  marginBottom: -1,
                  padding: "0.625rem 0.875rem",
                  cursor: "pointer",
                  display: "inline-flex", alignItems: "center", gap: "0.375rem",
                  transition: "color 0.15s, border-color 0.15s",
                }}
              >
                {tab.icon}
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab content */}
      {renderTabContent()}
    </div>
  );
}