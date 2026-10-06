// import Pusher from "pusher-js";
// import Echo from "laravel-echo";
// import { useState, useEffect, useRef } from "react";

// import { Box } from "@mui/material";

// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { setActiveChatData } from "@/redux/actions/chat-actions";

// import { CONFIG } from "@/global-config";

// import { ChatLayout } from "../chat-layout";
// import { ChatHeaderDetail } from "../chat-header-detail";
// import { ChatMessageList } from "../chat-message-list";
// import { ChatMessageInput } from "../chat-message-input";

// export function ChatView() {
//   window.Pusher = Pusher;

//   const [messages, setMessages] = useState([]);

//   const dispatch = useAppDispatch();
//   const { userToken } = useAppSelector((state) => state.auth);

//   const { activeChatId, activeChatMessages, activeChatProduct } = useAppSelector(
//     (state) => state.chat
//   );

//   // Use refs to avoid stale closures in Pusher callback
//   const chatStateRef = useRef({ activeChatMessages, activeChatProduct, activeChatId });

//   useEffect(() => {
//     chatStateRef.current = { activeChatMessages, activeChatProduct, activeChatId };
//   }, [activeChatMessages, activeChatProduct, activeChatId]);

//   useEffect(() => {
//     setMessages(activeChatMessages);
//   }, [activeChatMessages]);

//   useEffect(() => {
//     if (!userToken || !activeChatId) return;

//     const echo = new Echo({
//       broadcaster: "pusher",
//       key: CONFIG.pusher.key,
//       cluster: CONFIG.pusher.cluster,
//       forceTLS: true,
//       encrypted: true,
//       authEndpoint: "https://venturekartapi.walkershive.com.np/broadcasting/auth",
//       auth: {
//         headers: {
//           Authorization: `Bearer ${userToken}`,
//           "X-Requested-With": "XMLHttpRequest",
//           Accept: "application/json",
//         },
//       },
//     });

//     const channelName = `product-chat.${activeChatId}`;
//     const channel = echo.private(channelName);

//     const eventName = "NewChatMessage";

//     const onNewMessage = (data) => {
//       try {
//         const currentState = chatStateRef.current;

//         // Prevent duplicate messages
//         if (currentState.activeChatMessages.some((m) => m.id === data.id)) {
//           return;
//         }

//         // Update Redux with new message
//         dispatch(
//           setActiveChatData({
//             id: currentState.activeChatId,
//             messages: [...currentState.activeChatMessages, data],
//             product: currentState.activeChatProduct,
//           })
//         );

//         console.log("this is chat message", data, channelName);
//       } catch (err) {
//         console.error("Failed to process incoming message:", err);
//       }
//     };

//     channel.listen(eventName, onNewMessage);

//     return () => {
//       channel.stopListening(eventName, onNewMessage);
//       echo.leave(channelName);
//     };
//   }, [userToken, activeChatId, dispatch]);

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flex: "1 1 auto",
//         flexDirection: "column",
//         height: 1,
//       }}
//     >
//       <ChatLayout
//         slots={{
//           header: <ChatHeaderDetail />,
//           main: (
//             <>
//               <ChatMessageList messages={messages} />

//               <ChatMessageInput />
//             </>
//           ),
//         }}
//       />
//     </Box>
//   );
// }
import Pusher from "pusher-js";
import Echo from "laravel-echo";
import { useState, useEffect, useRef } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setActiveChatData } from "@/redux/actions/chat-actions";

import { CONFIG } from "@/global-config";

import { ChatLayout } from "../chat-layout";
import { ChatHeaderDetail } from "../chat-header-detail";
import { ChatMessageList } from "../chat-message-list";
import { ChatMessageInput } from "../chat-message-input";

export function ChatView() {
  window.Pusher = Pusher;

  const [messages, setMessages] = useState([]);

  const dispatch = useAppDispatch();
  const { userToken } = useAppSelector((state) => state.auth);

  const { activeChatId, activeChatMessages, activeChatProduct } = useAppSelector(
    (state) => state.chat
  );

  const chatStateRef = useRef({
    activeChatMessages,
    activeChatProduct,
    activeChatId,
  });

  useEffect(() => {
    chatStateRef.current = {
      activeChatMessages,
      activeChatProduct,
      activeChatId,
    };
  }, [activeChatMessages, activeChatProduct, activeChatId]);

  useEffect(() => {
    setMessages(activeChatMessages);
  }, [activeChatMessages]);

  useEffect(() => {
    if (!userToken || !activeChatId) return;

    const echo = new Echo({
      broadcaster: "pusher",
      key: CONFIG.pusher.key,
      cluster: CONFIG.pusher.cluster,
      forceTLS: true,
      encrypted: true,
      authEndpoint:
        "https://venturekartapi.walkershive.com.np/broadcasting/auth",
      auth: {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
        },
      },
    });

    const channelName = `product-chat.${activeChatId}`;
    const channel = echo.private(channelName);

    const eventName = "NewChatMessage";

    const onNewMessage = (data) => {
      try {
        const currentState = chatStateRef.current;

        // Prevent duplicate messages
        if (currentState.activeChatMessages.some((m) => m.id === data.id)) {
          return;
        }

        dispatch(
          setActiveChatData({
            id: currentState.activeChatId,
            messages: [...currentState.activeChatMessages, data],
            product: currentState.activeChatProduct,
          })
        );
      } catch (err) {
        console.error("Failed to process incoming message:", err);
      }
    };

    channel.listen(eventName, onNewMessage);

    return () => {
      channel.stopListening(eventName, onNewMessage);
      echo.leave(channelName);
    };
  }, [userToken, activeChatId, dispatch]);

  return (
    <div className="flex flex-col flex-1 h-full w-full">
      <ChatLayout
        slots={{
          header: <ChatHeaderDetail />,

          main: (
            <div className="flex flex-col flex-1 h-full">
              {/* Messages area */}
              <div className="flex-1 overflow-hidden">
                <ChatMessageList messages={messages} />
              </div>

              {/* Input fixed at bottom */}
              <div className="border-t border-gray-200">
                <ChatMessageInput />
              </div>
            </div>
          ),
        }}
      />
    </div>
  );
}