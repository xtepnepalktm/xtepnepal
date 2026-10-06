// import { Box, Avatar, IconButton, Typography } from "@mui/material";

// import { useAppSelector } from "@/redux/hooks";

// import { CONFIG } from "@/global-config";

// import { Iconify } from "@/components/iconify";

// import { ChatHeaderSkeleton } from "./chat-skeleton";

// // ----------------------------------------------------------------------

// export function ChatHeaderDetail({ loading }) {
//   const { activeChatProduct } = useAppSelector((state) => state.chat);

//   const renderSingle = () => (
//     <Box sx={{ gap: 2, display: "flex", alignItems: "center" }}>
//       <Avatar
//         src={`${activeChatProduct?.featured_image}`}
//         alt={activeChatProduct?.name}
//       />

//       <Typography variant="subtitle2">{activeChatProduct?.name}</Typography>
//     </Box>
//   );

//   if (loading) {
//     return <ChatHeaderSkeleton />;
//   }

//   return (
//     <>
//       {renderSingle()}

//       <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}>
//         <IconButton>
//           <Iconify icon="solar:phone-bold" />
//         </IconButton>
//       </Box>
//     </>
//   );
// }
import { useAppSelector } from "@/redux/hooks";
import { Iconify } from "@/components/iconify";
import { ChatHeaderSkeleton } from "./chat-skeleton";

// ----------------------------------------------------------------------

export function ChatHeaderDetail({ loading }) {
  const { activeChatProduct } = useAppSelector((state) => state.chat);

  if (loading) {
    return <ChatHeaderSkeleton />;
  }

  return (
    <div className="flex items-center w-full">
      {/* LEFT: Product info */}
      <div className="flex items-center gap-2">
        <img
          src={activeChatProduct?.featured_image}
          alt={activeChatProduct?.name}
          className="w-10 h-10 rounded-full object-cover"
        />

        <p className="text-sm font-semibold text-gray-800">
          {activeChatProduct?.name}
        </p>
      </div>

      {/* RIGHT: Action button */}
      <div className="flex flex-1 justify-end">
        <button className="p-2 rounded-full hover:bg-gray-100 transition">
          <Iconify icon="solar:phone-bold" />
        </button>
      </div>
    </div>
  );
}