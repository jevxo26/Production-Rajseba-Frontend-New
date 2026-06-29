import { useMemo } from "react";

interface User {
  id?: string | number;
  _id?: string | number;
  name?: string;
  role?: {
    name?: string;
  };
}

interface InboxItem {
  user: User;
  lastMessage?: string;
  lastMessageAt?: string | null;
}

export function useSidebarUsers(isAdmin: boolean, inbox: InboxItem[], allUsers: User[]) {
  return useMemo(() => {
    if (isAdmin) {
      const vendorsAndAgents = allUsers.filter((u: User) => {
        const r = u.role?.name?.toLowerCase();
        return r === 'vendor' || r === 'agent';
      });
      
      const inboxUserIds = new Set(inbox.map((i: InboxItem) => i.user.id || i.user._id));
      const notInInbox = vendorsAndAgents.filter((u: User) => !inboxUserIds.has(u.id) && !inboxUserIds.has(u._id));

      const merged = [
        ...inbox.map((item: InboxItem) => ({
          user: item.user,
          lastMessage: item.lastMessage,
          lastMessageAt: item.lastMessageAt
        })),
        ...notInInbox.map((u: User) => ({
          user: u,
          lastMessage: 'Click to start chat',
          lastMessageAt: null
        }))
      ];
      return merged;
    }
    return inbox.map((item: InboxItem) => ({
      user: item.user,
      lastMessage: item.lastMessage,
      lastMessageAt: item.lastMessageAt
    }));
  }, [isAdmin, inbox, allUsers]);
}
