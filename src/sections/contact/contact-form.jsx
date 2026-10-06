"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { toast } from '@/components/snackbar';
import { sendContactForm } from '@/api/contact';

// ---------------- Validation Schema ----------------
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000),
});

// ---------------- Spinner ----------------
function Spinner() {
  return (
    <svg
      className="animate-spin h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12" cy="12" r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}

// ----------------------------------------------------------------------

export function ContactForm({ className = '', ...other }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await sendContactForm(data);
      toast.success("Message sent successfully! We'll get back to you soon.");
      reset();
    } catch (err) {
      toast.error(err?.message || "Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="group">
        <label className="text-xs md:text-sm font-bold text-secondary block mb-1 tracking-wide">YOUR NAME</label>
        <input 
          className={`w-full bg-surface-container border-none border-b-2 border-transparent focus:border-on-surface focus:outline-none px-4 py-3 text-sm md:text-base transition-all ${errors.name ? 'border-error/50' : ''}`}
          placeholder="Athlete Name" 
          type="text"
          {...register("name")}
          disabled={isSubmitting}
        />
        {errors.name && <p className="text-xs text-error mt-1">{errors.name.message}</p>}
      </div>
      <div className="group">
        <label className="text-xs md:text-sm font-bold text-secondary block mb-1 tracking-wide">EMAIL ADDRESS</label>
        <input 
          className={`w-full bg-surface-container border-none border-b-2 border-transparent focus:border-on-surface focus:outline-none px-4 py-3 text-sm md:text-base transition-all ${errors.email ? 'border-error/50' : ''}`}
          placeholder="runner@example.com" 
          type="email"
          {...register("email")}
          disabled={isSubmitting}
        />
        {errors.email && <p className="text-xs text-error mt-1">{errors.email.message}</p>}
      </div>
      <div className="group">
        <label className="text-xs md:text-sm font-bold text-secondary block mb-1 tracking-wide">MESSAGE</label>
        <textarea 
          className={`w-full bg-surface-container border-none border-b-2 border-transparent focus:border-on-surface focus:outline-none px-4 py-3 text-sm md:text-base transition-all resize-none ${errors.message ? 'border-error/50' : ''}`}
          placeholder="How can we help you perform better?" 
          rows={4}
          {...register("message")}
          disabled={isSubmitting}
        ></textarea>
        {errors.message && <p className="text-xs text-error mt-1">{errors.message.message}</p>}
      </div>
      <button 
        className="w-full bg-on-background hover:bg-primary text-white py-4 text-sm md:text-base font-bold uppercase tracking-widest transition-colors duration-300 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed" 
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting && <Spinner />}
        {isSubmitting ? "SENDING..." : "SUBMIT REQUEST"}
      </button>
    </form>
  );
}