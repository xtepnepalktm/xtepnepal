// ----------------------------------------------------------------------

export function getMessage({ message, currentUserId }) {
  const sender = message.sender;

  const isCurrentUser = sender.id == currentUserId;

  const senderDetails = isCurrentUser
    ? { type: "me" }
    : {
        avatarUrl: sender?.avatarUrl,
        firstName: sender?.name?.split(" ")[0] ?? "Unknown",
      };

  return { me: isCurrentUser, senderDetails };
}
