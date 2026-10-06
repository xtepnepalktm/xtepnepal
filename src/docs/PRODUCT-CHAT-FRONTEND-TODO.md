# Product Chat — Frontend Implementation TODO

> Generated: 2026-03-09
> For: Frontend Developer
> Customer Side: **Next.js**
> Vendor/Admin Side: **React**
> Backend Status: **All fixes complete** — see `PRODUCT-CHAT-ERRORS-AND-OPTIMIZATION-TODO.md`

---

## ⚠️ CRITICAL BREAKING CHANGES

### 1. Pusher Channel Name Changed (MUST FIX FIRST)

The Pusher private channel has changed from **per-vendor** to **per-chat**.

```
OLD (broken, do NOT use):  private-product-chat.{vendorId}
NEW (current):             private-product-chat.{chatId}
```

`chatId` = the `id` field returned by every chat API response.

**If you don't update this, no real-time messages will work.**

---

## 📡 API Reference

### Base URLs
- **Customer APIs** (Next.js): `/frontend/message/...` (requires `customer` auth guard / sanctum token)
- **Vendor APIs** (React): `/api/message/...` (requires `admin/vendor` auth guard / sanctum token)

---

### Customer APIs

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| `POST` | `/frontend/message/start/{productId}` | Start or resume a chat for a product | — | Chat object with last 50 messages |
| `POST` | `/frontend/message/send` | Send a message | `{ chat_id, message }` | Message object |

### Vendor APIs

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| `GET` | `/api/message/chats` | List all chats for this vendor | — | Array of chat objects with last message preview |
| `GET` | `/api/message/chat-messages/{chatId}` | Get messages for a specific chat | — | Chat object with last 50 messages |
| `POST` | `/api/message/send-message` | Vendor sends a message | `{ chat_id, message }` | Message object |

---

### API Response Shapes

#### Chat List Item (`GET /api/message/chats`)
```json
{
  "id": 5,                          // ← THIS is the chatId for Pusher
  "product_id": 12,
  "product": {
    "product_id": 12,
    "product_name": "Widget A"
  },
  "customer_id": 3,
  "customer": {
    "id": 3,
    "party_id": 45,
    "full_name": "John Doe",
    "email": "john@example.com",
    "phone_number": "9800000000"
  },
  "last_message": {
    "text": "Hello, is this available?",
    "timestamp": "2026-03-09 10:30:00",
    "is_customer": true
  },
  "created_at": "2026-03-09T10:00:00.000000Z",
  "updated_at": "2026-03-09T10:30:00.000000Z"
}
```

#### Chat with Messages (`GET /api/message/chat-messages/{chatId}` or `POST /frontend/message/start/{productId}`)
```json
{
  "id": 5,
  "product_id": 12,
  "product": {
    "product_id": 12,
    "product_name": "Widget A"
  },
  "customer_id": 3,
  "customer": {
    "id": 3,
    "party_id": 45,
    "full_name": "John Doe"
  },
  "messages": [
    {
      "id": 101,
      "text": "Hello, is this available?",
      "sender": {
        "id": 3,
        "name": "John Doe"
      },
      "is_customer": true,
      "timestamp": "2026-03-09 10:30:00"
    },
    {
      "id": 102,
      "text": "Yes, it is!",
      "sender": {
        "id": 7,
        "name": "Admin User"
      },
      "is_customer": false,
      "timestamp": "2026-03-09 10:31:00"
    }
  ],
  "created_at": "2026-03-09T10:00:00.000000Z",
  "updated_at": "2026-03-09T10:31:00.000000Z"
}
```

#### Pusher `NewChatMessage` Event Payload (received via Echo)
```json
{
  "id": 103,
  "product_chat_id": 5,
  "text": "When can you deliver?",
  "sender": {
    "id": 3,
    "name": "John Doe"
  },
  "is_customer": true,
  "timestamp": "2026-03-09 10:35:00",
  "vendor_id": 1
}
```

#### Pusher `NewChatStarted` Event Payload (vendor only)
```json
{
  "chat_id": 6,
  "product_id": 15,
  "customer_name": "Jane Smith",
  "message": "New chat started"
}
```

---

## 🟢 CUSTOMER SIDE (Next.js) — TODO

### Task C1: Update Channel Subscription (CRITICAL)

**File(s):** Wherever you subscribe to Pusher/Echo for chat.

**Change:** Replace the old vendor-based channel with the chat-based channel.

```javascript
// ❌ OLD
Echo.private(`product-chat.${vendorId}`)

// ✅ NEW — use the chat's `id` from the API response
Echo.private(`product-chat.${chatId}`)
```

---

### Task C2: Lazy Subscribe — Only When Chat Window is Open

**Why:** Reduces concurrent Pusher connections. Pusher bills by **peak concurrent connections**. If 500 customers are browsing your site but only 10 have the chat open, you only need 10 connections instead of 500.

**How:**

```javascript
// ---- State ----
let chatChannel = null;

// ---- When customer opens the chat window ----
function openChat(chatId) {
  // Subscribe to this chat's private channel
  chatChannel = Echo.private(`product-chat.${chatId}`)
    .listen('NewChatMessage', (event) => {
      // Append the new message to your message list
      // event shape: { id, product_chat_id, text, sender: { id, name }, is_customer, timestamp, vendor_id }
      addMessageToState({
        id: event.id,
        text: event.text,
        sender: event.sender,
        is_customer: event.is_customer,
        timestamp: event.timestamp,
      });
    });
}

// ---- When customer closes the chat window / navigates away ----
function closeChat() {
  if (chatChannel) {
    chatChannel.stopListening('NewChatMessage');
    Echo.leave(chatChannel.name);
    chatChannel = null;
  }
}
```

**Next.js specifics:**
- Use `useEffect` cleanup to call `closeChat()` when the chat component unmounts.
- Store `chatChannel` in a `useRef` so it persists across re-renders without triggering them.

```jsx
import { useEffect, useRef } from 'react';
import Echo from '../lib/echo'; // your Echo instance

export function useChatSubscription(chatId, onNewMessage) {
  const channelRef = useRef(null);

  useEffect(() => {
    if (!chatId) return;

    // Subscribe
    channelRef.current = Echo.private(`product-chat.${chatId}`)
      .listen('NewChatMessage', (event) => {
        onNewMessage(event);
      });

    // Cleanup on unmount or chatId change
    return () => {
      if (channelRef.current) {
        channelRef.current.stopListening('NewChatMessage');
        Echo.leave(`product-chat.${chatId}`);
        channelRef.current = null;
      }
    };
  }, [chatId]);
}
```

---

### Task C3: Start/Resume Chat Flow

When the customer clicks "Chat about this product" on a product page:

```javascript
// POST /frontend/message/start/{productId}
const response = await api.post(`/frontend/message/start/${productId}`);
const chat = response.data.data[0]; // API returns array wrapped in collection

// chat.id        → chatId (use for Pusher subscription)
// chat.messages  → array of existing messages (last 50, oldest first)

// Now open the chat UI and subscribe
setChatId(chat.id);
setMessages(chat.messages);
openChat(chat.id);  // from Task C2
```

---

### Task C4: Send Message Flow

```javascript
// POST /frontend/message/send
const response = await api.post('/frontend/message/send', {
  chat_id: chatId,
  message: inputText,
});

// Optimistic UI: add the message to state immediately
// The response contains the raw message object
const msg = response.data.message;
addMessageToState({
  id: msg.id,
  text: msg.message,
  sender: { id: msg.sender_id, name: 'You' },
  is_customer: true,
  timestamp: msg.created_at,
});
```

**Rate Limit:** Backend allows max **30 messages per 60 seconds**. If exceeded, API returns `429`. Handle it:

```javascript
if (response.status === 429) {
  showToast('You are sending messages too fast. Please wait a moment.');
  return;
}
```

---

### Task C5: Prevent Duplicate Messages

Since you do optimistic UI (add message on send) AND receive via Pusher `broadcast()->toOthers()`, the sender will NOT receive the Pusher event for their own message. However, if using `broadcast()` without `->toOthers()`, you'd get duplicates.

**Current backend uses `->toOthers()`**, so:
- The sender's message appears via the API response (optimistic).
- The receiver's message appears via Pusher event.
- No dedup needed on the sender side.

But for safety, you can deduplicate by `id`:

```javascript
function addMessageToState(newMsg) {
  setMessages(prev => {
    if (prev.some(m => m.id === newMsg.id)) return prev; // already exists
    return [...prev, newMsg];
  });
}
```

---

### Task C6: Cleanup on Page Navigation (Next.js)

In Next.js with App Router, components unmount on navigation. Make sure the `useEffect` cleanup in Task C2 fires. If using Pages Router with persistent layouts, you need to manually leave the channel when the route changes:

```javascript
import { useRouter } from 'next/router';

const router = useRouter();
useEffect(() => {
  const handleRouteChange = () => closeChat();
  router.events.on('routeChangeStart', handleRouteChange);
  return () => router.events.off('routeChangeStart', handleRouteChange);
}, []);
```

---

## 🟠 VENDOR/ADMIN SIDE (React) — TODO

### Task V1: Update Channel Subscription (CRITICAL)

Same as C1 — replace vendor-based channel with chat-based channel everywhere.

```javascript
// ❌ OLD
Echo.private(`product-chat.${vendorId}`)

// ✅ NEW
Echo.private(`product-chat.${chatId}`)
```

---

### Task V2: Chat List Page — Subscribe to New Chat Notifications

When the vendor opens the chat list page, subscribe to the **vendor notification channel** to get alerted about new chats from customers:

```javascript
// On chat list page mount
useEffect(() => {
  const channel = Echo.private(`vendor.notifications.${vendorId}`)
    .listen('NewChatStarted', (event) => {
      // event shape: { chat_id, product_id, customer_name, message }
      // Option A: Show a toast notification
      showNotification(`New chat from ${event.customer_name}`);
      // Option B: Prepend to chat list
      refetchChatList(); // or optimistically add to state
    });

  return () => {
    channel.stopListening('NewChatStarted');
    Echo.leave(`vendor.notifications.${vendorId}`);
  };
}, [vendorId]);
```

---

### Task V3: Chat List Page — Fetch & Display

```javascript
// GET /api/message/chats
const response = await api.get('/api/message/chats');
const chats = response.data.data;

// Each chat has:
//   id, product, customer: { full_name, email, phone_number }, last_message: { text, timestamp, is_customer }
```

Display as a list. Show customer name, product name, last message preview, and timestamp.

---

### Task V4: Chat Detail — Lazy Subscribe to Per-Chat Channel

When vendor clicks on a chat from the list:

```javascript
// 1. Fetch messages
// GET /api/message/chat-messages/{chatId}
const response = await api.get(`/api/message/chat-messages/${chatId}`);
const chat = response.data.data[0];
setMessages(chat.messages);

// 2. Subscribe to real-time updates for THIS chat only
const channel = Echo.private(`product-chat.${chatId}`)
  .listen('NewChatMessage', (event) => {
    addMessageToState({
      id: event.id,
      text: event.text,
      sender: event.sender,
      is_customer: event.is_customer,
      timestamp: event.timestamp,
    });
  });

// 3. Cleanup when leaving this chat or unmounting
return () => {
  channel.stopListening('NewChatMessage');
  Echo.leave(`product-chat.${chatId}`);
};
```

**Important:** When the vendor switches from Chat A to Chat B, you MUST **leave** Chat A's channel before subscribing to Chat B. Otherwise you accumulate connections.

```javascript
const channelRef = useRef(null);
const prevChatIdRef = useRef(null);

useEffect(() => {
  // Leave previous chat channel
  if (prevChatIdRef.current && prevChatIdRef.current !== chatId) {
    Echo.leave(`product-chat.${prevChatIdRef.current}`);
  }
  prevChatIdRef.current = chatId;

  if (!chatId) return;

  channelRef.current = Echo.private(`product-chat.${chatId}`)
    .listen('NewChatMessage', (event) => {
      addMessageToState(event);
    });

  return () => {
    if (channelRef.current) {
      channelRef.current.stopListening('NewChatMessage');
      Echo.leave(`product-chat.${chatId}`);
      channelRef.current = null;
    }
  };
}, [chatId]);
```

---

### Task V5: Vendor Send Message

```javascript
// POST /api/message/send-message
const response = await api.post('/api/message/send-message', {
  chat_id: chatId,
  message: inputText,
});

// Optimistic UI
const msg = response.data.message;
addMessageToState({
  id: msg.id,
  text: msg.message,
  sender: { id: msg.sender_id, name: 'You' },
  is_customer: false,
  timestamp: msg.created_at,
});
```

**Rate Limit:** Same 30/min. Handle `429`.

---

### Task V6: Dedup Helper (same as C5)

```javascript
function addMessageToState(newMsg) {
  setMessages(prev => {
    // Normalize: Pusher event has `text`, API response has `message`
    const normalized = {
      id: newMsg.id,
      text: newMsg.text || newMsg.message,
      sender: newMsg.sender || { id: newMsg.sender_id, name: 'You' },
      is_customer: newMsg.is_customer ?? false,
      timestamp: newMsg.timestamp || newMsg.created_at,
    };
    if (prev.some(m => m.id === normalized.id)) return prev;
    return [...prev, normalized];
  });
}
```

---

## 🔵 SHARED — Pusher/Echo Setup Checklist

### Echo Configuration (both Next.js and React)

Make sure your Echo instance is configured with the correct auth endpoint:

```javascript
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

// For CUSTOMER (Next.js)
const echo = new Echo({
  broadcaster: 'pusher',
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
  cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
  forceTLS: true,
  authEndpoint: '/broadcasting/auth',  // or your custom endpoint
  auth: {
    headers: {
      Authorization: `Bearer ${customerToken}`,  // Sanctum token
    },
  },
});

// For VENDOR (React)
const echo = new Echo({
  broadcaster: 'pusher',
  key: process.env.REACT_APP_PUSHER_APP_KEY,
  cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER,
  forceTLS: true,
  authEndpoint: '/broadcasting/auth',
  auth: {
    headers: {
      Authorization: `Bearer ${vendorToken}`,  // Sanctum token
    },
  },
});
```

**Important:** The `authEndpoint` must match where your Laravel app serves `broadcasting/auth`. If using a separate API domain, use the full URL (e.g., `https://api.example.com/broadcasting/auth`).

---

## 📋 CHECKLIST

### Customer Side (Next.js)

- [ ] **C1** — Change Pusher channel from `product-chat.{vendorId}` → `product-chat.{chatId}` *(CRITICAL)*
- [ ] **C2** — Lazy subscribe: only connect when chat window is open, disconnect on close
- [ ] **C3** — Start/resume chat via `POST /frontend/message/start/{productId}`
- [ ] **C4** — Send message via `POST /frontend/message/send` with `{ chat_id, message }`
- [ ] **C5** — Deduplicate messages by `id` (safety net)
- [ ] **C6** — Cleanup Echo channels on route change / component unmount

### Vendor Side (React)

- [ ] **V1** — Change Pusher channel from `product-chat.{vendorId}` → `product-chat.{chatId}` *(CRITICAL)*
- [ ] **V2** — Subscribe to `vendor.notifications.{vendorId}` for `NewChatStarted` on chat list page
- [ ] **V3** — Fetch chat list from `GET /api/message/chats`, display with last message preview
- [ ] **V4** — Lazy subscribe to `product-chat.{chatId}` when opening a specific chat, leave previous
- [ ] **V5** — Send message via `POST /api/message/send-message` with `{ chat_id, message }`
- [ ] **V6** — Deduplicate messages by `id`

### Both

- [ ] Echo config with correct `authEndpoint` and Bearer token
- [ ] Handle `429 Too Many Requests` gracefully (toast/disabled send button for a few seconds)
- [ ] Scroll to bottom on new message
- [ ] Show loading state while fetching messages
- [ ] `message` field max length: **5000 characters** — validate on frontend too

---

## 🚫 DO NOT DO

- ❌ Do NOT subscribe to `product-chat.{vendorId}` — that channel no longer exists
- ❌ Do NOT subscribe to all chats on page load — only subscribe to the one being viewed
- ❌ Do NOT use `customer_name` field directly from chat object — use `customer.full_name`
- ❌ Do NOT reference the old `customers` table — it's deprecated. Data comes from `customer_auth` → `parties`

---

## 🔮 FUTURE (Optional, Not Required Now)

### Infinite Scroll for Old Messages
Backend returns last 50 messages. If a chat has more, you'll need a "load more" button.
**No backend endpoint exists yet** — will be added later as:
```
GET /api/chat/{chatId}/messages?before_id={oldestMessageId}&limit=50
```

### Typing Indicators
Would use Pusher client events (whisper). Not implemented on backend yet. Low priority.

### Read Receipts
Not implemented. Low priority.

