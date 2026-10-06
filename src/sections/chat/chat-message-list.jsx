// import { Stack, LinearProgress } from "@mui/material";

// import { Scrollbar } from "@/components/scrollbar";

// import { ChatMessageItem } from "./chat-message-item";

// import { useMessagesScroll } from "./hooks/use-messages-scroll";

// // ----------------------------------------------------------------------

// export function ChatMessageList({ messages = [], loading }) {
//   const { messagesEndRef } = useMessagesScroll(messages);

//   if (loading) {
//     return (
//       <Stack sx={{ flex: "1 1 auto", position: "relative" }}>
//         <LinearProgress
//           color="inherit"
//           sx={{
//             top: 0,
//             left: 0,
//             width: 1,
//             height: 2,
//             borderRadius: 0,
//             position: "absolute",
//           }}
//         />
//       </Stack>
//     );
//   }

//   return (
//     <>
//       <Scrollbar
//         ref={messagesEndRef}
//         sx={{
//           px: 3,
//           pt: 5,
//           pb: 3,
//           flex: "1 1 auto",
//         }}
//       >
//         {messages.map((message) => (
//           <ChatMessageItem key={message.id} message={message} />
//         ))}
//       </Scrollbar>
//     </>
//   );
// }
import { ChatMessageItem } from "./chat-message-item";
import { useMessagesScroll } from "./hooks/use-messages-scroll";

// ----------------------------------------------------------------------

export function ChatMessageList({ messages = [], loading }) {
  const { messagesEndRef } = useMessagesScroll(messages);

  if (loading) {
    return (
      <div className="flex-1 relative">
        {/* TOP LOADING BAR */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gray-200 overflow-hidden">
          <div className="h-full w-full bg-gray-500 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={messagesEndRef}
      className="flex-1 overflow-y-auto px-3 pt-5 pb-3"
    >
      {messages.map((message) => (
        <ChatMessageItem key={message.id} message={message} />
      ))}
    </div>
  );
}