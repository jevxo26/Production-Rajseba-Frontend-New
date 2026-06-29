"use client";

import { useState, useRef } from "react";
import { useSubmitContactMutation } from "@/redux/features/landing/landingApi";
import { useScroll, useTransform } from "framer-motion";

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const INITIAL_FORM: FormState = { name: "", email: "", phone: "", subject: "", message: "" };

export function useContactState() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [submitContact, { isLoading }] = useSubmitContactMutation();

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const glowY2 = useTransform(scrollYProgress, [0, 1], [0, 30]);

  const validate = (): boolean => {
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = "Full name is required";
    if (!form.email.trim()) next.email = "Email address is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email address";
    if (!form.subject.trim()) next.subject = "Please select a subject";
    if (!form.message.trim()) next.message = "Message details are required";
    setErrors(next);
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
      setSubmitted(true);
      setForm(INITIAL_FORM);
    } catch (err) {
      console.error("Failed to submit contact form", err);
    }
  };

  return {
    form, errors, submitted, setSubmitted, activeFaq, setActiveFaq,
    isLoading, heroRef, glowY, glowY2,
    handleChange, handleSubmit,
  };
}
