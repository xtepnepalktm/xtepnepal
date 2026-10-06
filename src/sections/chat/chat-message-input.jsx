// import { useState, useCallback } from "react";

// import { useAppDispatch, useAppSelector } from "@/redux/hooks";

// import { InputBase, IconButton } from "@mui/material";

// import { sendMessage } from "@/api";
// import { setActiveChatData } from "@/redux/actions/chat-actions";

// import { Iconify } from "@/components/iconify";
// import { toast } from "@/components/snackbar";

// export function ChatMessageInput() {
//   const [message, setMessage] = useState("");

//   const dispatch = useAppDispatch();
//   const { activeChatId, activeChatMessages, activeChatProduct } = useAppSelector(
//     (state) => state.chat
//   );

//   const handleChangeMessage = useCallback((event) => {
//     setMessage(event.target.value);
//   }, []);

//   const sendMessageToServer = useCallback(async () => {
//     if (!message.trim()) return;

//     // Validate message length
//     if (message.length > 5000) {
//       toast.error("Message is too long. Maximum 5000 characters allowed.");
//       return;
//     }

//     const messageText = message;
//     setMessage(""); // Clear input immediately for better UX

//     try {
//       const response = await sendMessage({ chat_id: activeChatId, message: messageText });

//       // Optimistic UI: Add message to state
//       const newMessage = {
//         id: response.message.id,
//         text: messageText,
//         sender: {
//           id: response.message.sender_id,
//           name: "You",
//         },
//         is_customer: true,
//         timestamp: response.message.created_at,
//       };

//       dispatch(
//         setActiveChatData({
//           id: activeChatId,
//           messages: [...activeChatMessages, newMessage],
//           product: activeChatProduct,
//         })
//       );
//     } catch (error) {
//       console.error(error);
//       setMessage(messageText); // Restore message on error
//       if (error.message?.includes("too fast")) {
//         toast.error(error.message);
//       } else if (error.response?.status === 429) {
//         toast.error("You're sending messages too fast. Please wait a moment.");
//       } else {
//         toast.error("Failed to send message. Please try again.");
//       }
//     }
//   }, [message, activeChatId, activeChatMessages, activeChatProduct, dispatch]);

//   const handleKeyPress = useCallback(
//     async (event) => {
//       if (event.key === "Enter") {
//         await sendMessageToServer();
//       }
//     },
//     [sendMessageToServer]
//   );

//   const handleClickSend = useCallback(() => {
//     sendMessageToServer();
//   }, [sendMessageToServer]);

//   return (
//     <InputBase
//       name="chat-message"
//       id="chat-message-input"
//       value={message}
//       onKeyDown={handleKeyPress}
//       onChange={handleChangeMessage}
//       placeholder="Please type your message here..."
//       endAdornment={
//         <IconButton onClick={handleClickSend}>
//           <Iconify icon="mingcute:send-fill" />
//         </IconButton>
//       }
//       sx={[
//         (theme) => ({
//           px: 1,
//           height: 56,
//           flexShrink: 0,
//           borderTop: `solid 1px ${theme.vars.palette.divider}`,
//         }),
//       ]}
//     />
//   );
// }
import { useState, useCallback } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { sendMessage } from "@/api";
import { setActiveChatData } from "@/redux/actions/chat-actions";

import { Iconify } from "@/components/iconify";
import { toast } from "@/components/snackbar";

export function ChatMessageInput() {
  const [message, setMessage] = useState("");

  const dispatch = useAppDispatch();

  const { activeChatId, activeChatMessages, activeChatProduct } =
    useAppSelector((state) => state.chat);

  const handleChangeMessage = useCallback((e) => {
    setMessage(e.target.value);
  }, []);

  const sendMessageToServer = useCallback(async () => {
    if (!message.trim()) return;

    if (message.length > 5000) {
      toast.error("Message is too long. Maximum 5000 characters allowed.");
      return;
    }

    const messageText = message;
    setMessage("");

    try {
      const response = await sendMessage({
        chat_id: activeChatId,
        message: messageText,
      });

      const newMessage = {
        id: response.message.id,
        text: messageText,
        sender: {
          id: response.message.sender_id,
          name: "You",
        },
        is_customer: true,
        timestamp: response.message.created_at,
      };

      dispatch(
        setActiveChatData({
          id: activeChatId,
          messages: [...activeChatMessages, newMessage],
          product: activeChatProduct,
        })
      );
    } catch (error) {
      console.error(error);
      setMessage(messageText);

      if (error.message?.includes("too fast")) {
        toast.error(error.message);
      } else if (error.response?.status === 429) {
        toast.error("You're sending messages too fast. Please wait a moment.");
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    }
  }, [
    message,
    activeChatId,
    activeChatMessages,
    activeChatProduct,
    dispatch,
  ]);

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter") {
        sendMessageToServer();
      }
    },
    [sendMessageToServer]
  );

  const handleClickSend = useCallback(() => {
    sendMessageToServer();
  }, [sendMessageToServer]);

  return (
    <div className="flex items-center h-14 flex-shrink-0 px-2 border-t border-gray-200 bg-white">
      {/* INPUT */}
      <input
        id="chat-message-input"
        name="chat-message"
        value={message}
        onChange={handleChangeMessage}
        onKeyDown={handleKeyPress}
        placeholder="Please type your message here..."
        className="flex-1 h-full outline-none text-sm px-2 bg-transparent"
      />

      {/* SEND BUTTON */}
      <button
        onClick={handleClickSend}
        className="p-2  hover:bg-gray-100 transition"
      >
        <Iconify icon="mingcute:send-fill" />
      </button>
    </div>
  );
}