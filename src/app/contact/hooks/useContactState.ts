"use client";

import { useState, useRef, useEffect } from "react";
import { useSubmitContactMutation } from "@/redux/features/landing/landingApi";
import { useAppSelector } from "@/redux/hooks";
import { useScroll, useTransform } from "framer-motion";
import { toast } from "sonner";

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const INITIAL_FORM: FormState = { name: "", email: "", phone: "", subject: "", message: "" };

export function useContactState() {
  const currentUser = useAppSelector((state) => state.auth.user);

  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [submitContact, { isLoading }] = useSubmitContactMutation();

  // Auto pre-fill user info if logged in (user can edit anytime)
  useEffect(() => {
    if (currentUser) {
      setForm((prev) => ({
        ...prev,
        name: prev.name || currentUser.name || "",
        email: prev.email || currentUser.email || "",
        phone: prev.phone || currentUser.phoneNumber || currentUser.phone || "",
      }));
    }
  }, [currentUser]);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const glowY2 = useTransform(scrollYProgress, [0, 1], [0, 30]);

  const validate = (): boolean => {
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = "Full name is required";
    if (!form.email.trim()) next.email = "Email address is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email address";
    if (!form.subject.trim()) next.subject = "Please select a subject topic";
    if (!form.message.trim()) next.message = "Message details are required";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      toast.error("Please fill in all required fields correctly.");
    }
    return Object.keys(next).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await submitContact(form).unwrap();
      toast.success("Your inquiry has been submitted successfully! We will contact you soon.");
      setSubmitted(true);
      setForm(INITIAL_FORM);
    } catch (err: any) {
      console.error("Failed to submit contact form", err);
      toast.error(err?.data?.message || "Failed to submit inquiry. Please try again.");
    }
  };

  return {
    form, errors, submitted, setSubmitted, activeFaq, setActiveFaq,
    isLoading, heroRef, glowY, glowY2,
    handleChange, handleSubmit,
  };
}
