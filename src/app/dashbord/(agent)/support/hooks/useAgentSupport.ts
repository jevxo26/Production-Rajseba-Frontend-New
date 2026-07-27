"use client";

import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "sonner";

export interface Ticket {
  id: string;
  subject: string;
  category: string;
  status: "Open" | "Resolved" | "In Progress";
  date: string;
  lastReply: string;
}

export function useAgentSupport() {
  const role = useAppSelector((state) => state.auth.role) || "superadmin";
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: "TCK-482",
      subject: "Commission calculation error on RS-9240",
      category: "Commission & Payout",
      status: "In Progress",
      date: "Today",
      lastReply: "We are auditing the invoice.",
    },
    {
      id: "TCK-198",
      subject: "Nagad transfer wallet config missing",
      category: "Account Config",
      status: "Resolved",
      date: "May 14, 2026",
      lastReply: "Nagad API added.",
    },
  ]);

  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("Commission & Payout");
  const [description, setDescription] = useState("");

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTicket: Ticket = {
      id: `TCK-${Math.floor(100 + Math.random() * 900)}`,
      subject,
      category,
      status: "Open",
      date: "Just now",
      lastReply: "Waiting for support agent assign.",
    };
    setTickets([newTicket, ...tickets]);
    toast.success("Support ticket generated successfully!");
    setSubject("");
    setDescription("");
  };

  return {
    role,
    tickets,
    subject,
    setSubject,
    category,
    setCategory,
    description,
    setDescription,
    handleTicketSubmit,
  };
}
