"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useGetInboxQuery } from "@/redux/features/shared/chatApi";
import { useGetAllUsersQuery } from "@/redux/features/admin/user";
import { useSearchParams } from "next/navigation";

// Import Modular Components and Hooks
import ChatSidebar from "./components/ChatSidebar";
import ChatWindow from "./components/ChatWindow";
import EmptyChatState from "./components/EmptyChatState";
import { useSidebarUsers } from "./hooks/useSidebarUsers";
import { useChatMessages } from "./hooks/useChatMessages";

function LiveChatContent() {
  const user = useAppSelector((state) => state.auth.user);
  const rawRole = useAppSelector((state) => state.auth.role);
  const role = typeof rawRole === "string" ? rawRole.toLowerCase().replace(/\s+/g, "") : "";
  const isAdmin = role === "superadmin" || role === "admin";
  const isAgent = role === "agent";

  const searchParams = useSearchParams();
  const queryUserId = searchParams?.get("userId") || searchParams?.get("receiverId");
  const queryUserName = searchParams?.get("userName") || searchParams?.get("receiverName");

  const [activeChatUser, setActiveChatUser] = useState<any | null>(null);
  const [inboxSearch, setInboxSearch] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch inbox for everyone
  const { data: inboxRes, refetch: refetchInbox } = useGetInboxQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const inbox = inboxRes || [];

  // If query params are provided, set active chat user
  useEffect(() => {
    if (queryUserId) {
      setActiveChatUser({
        id: Number(queryUserId),
        name: queryUserName || "User",
      });
    }
  }, [queryUserId, queryUserName]);

  // For Agent/Admin specific logic: Fetch all users
  const { data: usersRes } = useGetAllUsersQuery(undefined, { skip: (!isAgent && !isAdmin) });
  const allUsers = usersRes?.data || [];

  useEffect(() => {
    if (isAgent && usersRes?.data && !activeChatUser) {
      const superadmin = usersRes.data.find((u: any) => u.role?.name === "Super Admin");
      if (superadmin) {
        if (typeof window !== "undefined" && window.innerWidth >= 768) {
          setActiveChatUser(superadmin);
        }
      }
    }
  }, [isAgent, usersRes, activeChatUser]);

  // Combine inbox with all agents/vendors if admin using hook
  const sidebarUsers = useSidebarUsers(isAdmin, inbox, allUsers);

  // messaging logic hook
  const {
    messages,
    messageInput,
    setMessageInput,
    imageFile,
    imagePreview,
    isUploading,
    handleSendMessage,
    setImageFile,
    setImagePreview,
  } = useChatMessages(user, activeChatUser, role, refetchInbox, messagesEndRef);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSendMessageSubmit = (e: React.FormEvent) => {
    handleSendMessage(e, fileInputRef);
  };

  // Filter inbox list based on sidebar search input
  const filteredInbox = sidebarUsers.filter((item: any) => {
    const name = item.user?.name || "";
    return name.toLowerCase().includes(inboxSearch.toLowerCase());
  });

  return (
    <div className="flex h-[78vh] md:h-[82vh] bg-white rounded-3xl shadow-xl border border-slate-100/90 overflow-hidden relative">
      {/* Inbox Sidebar Component */}
      <ChatSidebar
        inboxSearch={inboxSearch}
        setInboxSearch={setInboxSearch}
        filteredInbox={filteredInbox}
        activeChatUser={activeChatUser}
        setActiveChatUser={setActiveChatUser}
      />

      {/* Main Chat Area Window */}
      <div
        className={`flex-1 flex flex-col bg-[#FAF9F6]/40 transition-all duration-300 ${
          activeChatUser ? "flex" : "hidden md:flex"
        }`}
      >
        {activeChatUser ? (
          <ChatWindow
            activeChatUser={activeChatUser}
            setActiveChatUser={setActiveChatUser}
            messages={messages}
            user={user}
            messagesEndRef={messagesEndRef}
            imageFile={imageFile}
            imagePreview={imagePreview}
            messageInput={messageInput}
            setMessageInput={setMessageInput}
            isUploading={isUploading}
            fileInputRef={fileInputRef}
            handleImageSelect={handleImageSelect}
            handleSendMessage={handleSendMessageSubmit}
            setImageFile={setImageFile}
            setImagePreview={setImagePreview}
          />
        ) : (
          <EmptyChatState />
        )}
      </div>
    </div>
  );
}

export default function LiveChatPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500 font-bold animate-pulse">Loading chat...</div>}>
      <LiveChatContent />
    </Suspense>
  );
}
