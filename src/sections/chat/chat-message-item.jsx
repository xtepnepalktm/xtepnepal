// import { Box, Stack, Avatar, Typography } from "@mui/material";

// import { useAppSelector } from "@/redux/hooks";

// import { fToNow } from "@/utils/format-time";

// import { getMessage } from "./utils/get-message";

// // ----------------------------------------------------------------------

// export function ChatMessageItem({ message }) {
//   const { profile: user } = useAppSelector((state) => state.profile);

//   const { me, senderDetails } = getMessage({
//     message,
//     currentUserId: `${user?.customer_id}`,
//   });

//   const { firstName, avatarUrl } = senderDetails;

//   const { text, timestamp } = message;

//   const renderInfo = () => (
//     <Typography
//       noWrap
//       variant="caption"
//       sx={{ mb: 1, color: "text.disabled", ...(!me && { mr: "auto" }) }}
//     >
//       {!me && `${firstName}, `}

//       {fToNow(timestamp)}
//     </Typography>
//   );

//   const renderBody = () => (
//     <Stack
//       sx={{
//         p: 1.5,
//         minWidth: 48,
//         maxWidth: 320,
//         borderRadius: 1,
//         typography: "body2",
//         bgcolor: "background.neutral",
//         ...(me && { color: "grey.800", bgcolor: "primary.lighter" }),
//       }}
//     >
//       {text}
//     </Stack>
//   );

//   if (!text) {
//     return null;
//   }

//   return (
//     <Box
//       sx={{ mb: 5, display: "flex", justifyContent: me ? "flex-end" : "unset" }}
//     >
//       {!me && (
//         <Avatar
//           alt={firstName}
//           src={avatarUrl}
//           sx={{ width: 32, height: 32, mr: 2 }}
//         />
//       )}

//       <Stack alignItems={me ? "flex-end" : "flex-start"}>
//         {renderInfo()}

//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             position: "relative",
//             "&:hover": { "& .message-actions": { opacity: 1 } },
//           }}
//         >
//           {renderBody()}
//         </Box>
//       </Stack>
//     </Box>
//   );
// }
import { useAppSelector } from "@/redux/hooks";
import { fToNow } from "@/utils/format-time";
import { getMessage } from "./utils/get-message";

// ----------------------------------------------------------------------

export function ChatMessageItem({ message }) {
  const { profile: user } = useAppSelector((state) => state.profile);

  const { me, senderDetails } = getMessage({
    message,
    currentUserId: `${user?.customer_id}`,
  });

  if (!message?.text) return null;

  const { firstName, avatarUrl } = senderDetails;
  const { text, timestamp } = message;

  return (
    <div
      className={`mb-5 flex ${me ? "justify-end" : "justify-start"
        }`}
    >
      {/* AVATAR (LEFT SIDE ONLY) */}
      {!me && (
        <img
          src={avatarUrl}
          alt={firstName}
          className="w-8 h-8 rounded-full mr-2"
        />
      )}

      <div className={`flex flex-col ${me ? "items-end" : "items-start"}`}>
        {/* INFO (NAME + TIME) */}
        <p
          className={`text-xs text-gray-400 mb-1 truncate ${me ? "text-right" : "text-left"
            }`}
        >
          {!me && `${firstName}, `} {fToNow(timestamp)}
        </p>

        {/* MESSAGE BUBBLE */}
        <div className="relative flex items-center">
          <div
            className={`px-4 py-2 text-sm rounded-md max-w-[320px] break-words
            ${me
                ? "bg-blue-100 text-gray-800 rounded-br-sm"
                : "bg-gray-100 text-gray-800 rounded-bl-sm"
              }`}
          >
            {text}
          </div>
        </div>
      </div>
    </div>
  );
}