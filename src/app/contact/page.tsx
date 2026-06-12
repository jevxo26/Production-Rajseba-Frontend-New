"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle, 
  HelpCircle, 
  ChevronDown 
} from "lucide-react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

// Mock FAQ database
const MOCK_FAQS = [
  {
    question: "How do I book a service on Rajseba?",
    answer: "Booking is simple! Browse service categories on the homepage, select the specific service you need, choose a preferred date and time, and click 'Book Service'. Verified experts will be assigned to your request instantly."
  },
  {
    question: "Are your service professionals verified?",
    answer: "Yes, 100%. Every single service provider on our platform undergoes a rigorous multi-step vetting process, which includes criminal background checks, technical skill assessment tests, and professional reference reviews."
  },
  {
    question: "What happens if I am not satisfied with the work?",
    answer: "We stand behind our services with a 100% Quality Guarantee. If you are not satisfied with the quality of the completed service, please report it to our customer support within 24 hours, and we will send another expert or issue a refund."
  },
  {
    question: "Can I reschedule or cancel a booking?",
    answer: "Absolutely. You can reschedule or cancel any scheduled service up to 2 hours prior to the service time directly from your personal dashboard profile panel, or by calling our hotline support."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 90, damping: 15 }
  }
} as const;

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState.name && formState.email && formState.message) {
      setSubmitted(true);
      // Mock API call delay
      setTimeout(() => {
        setFormState({ name: "", email: "", phone: "", subject: "", message: "" });
      }, 500);
    }
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(prev => (prev === index ? null : index));
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 md:py-16 lg:py-20 relative overflow-hidden">
      
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-[#FF5A5F]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-[#FF5A5F]/3 blur-[125px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* ── HEADER BANNER ── */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <span className="text-xs font-black text-[#FF5A5F] uppercase tracking-widest bg-[#FFF0F1] px-3.5 py-1.5 rounded-full border border-rose-100/50">
            Get in touch
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mt-4 mb-4">
            We'd Love to Hear From You
          </h1>
          <p className="text-sm md:text-base text-slate-500 leading-relaxed">
            Have questions about our services, bookings, or want to partner with us? Reach out, and our team will get back to you shortly.
          </p>
        </div>

        {/* ── TWO COLUMN MAIN LAYOUT ── */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-20 items-stretch">
          
          {/* LEFT: Info Column (5 Cols) */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Info Card 1: Phone Hotline */}
            <motion.div variants={cardVariants} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs flex items-start gap-4">
              <span className="p-3.5 rounded-2xl bg-[#FFF0F1] text-[#FF5A5F] flex-shrink-0">
                <Phone className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm mb-1.5 uppercase tracking-wide">Customer Hotline</h3>
                <p className="text-base font-extrabold text-slate-800 hover:text-[#FF5A5F] transition-colors">
                  <a href="tel:+8809612725732">+880 9612-RAJSEBA</a>
                </p>
                <p className="text-xs text-slate-400 font-semibold mt-0.5">Alternative: +880 1712-345678</p>
              </div>
            </motion.div>

            {/* Info Card 2: Email */}
            <motion.div variants={cardVariants} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs flex items-start gap-4">
              <span className="p-3.5 rounded-2xl bg-[#FFF0F1] text-[#FF5A5F] flex-shrink-0">
                <Mail className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm mb-1.5 uppercase tracking-wide">Support Email</h3>
                <p className="text-base font-extrabold text-slate-800 hover:text-[#FF5A5F] transition-colors">
                  <a href="mailto:support@rajseba.com">support@rajseba.com</a>
                </p>
                <p className="text-xs text-slate-400 font-semibold mt-0.5">Corporate: info@rajseba.com</p>
              </div>
            </motion.div>

            {/* Info Card 3: Address */}
            <motion.div variants={cardVariants} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs flex items-start gap-4">
              <span className="p-3.5 rounded-2xl bg-[#FFF0F1] text-[#FF5A5F] flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm mb-1.5 uppercase tracking-wide">Main Headquarters</h3>
                <p className="text-sm font-semibold text-slate-700 leading-relaxed">
                  Level 4, House 24, Road 12, Banani,<br />Dhaka 1213, Bangladesh
                </p>
              </div>
            </motion.div>

            {/* Info Card 4: Hours & Socials */}
            <motion.div variants={cardVariants} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs flex flex-col justify-between flex-grow gap-6">
              <div className="flex items-start gap-4">
                <span className="p-3.5 rounded-2xl bg-[#FFF0F1] text-[#FF5A5F] flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm mb-1.5 uppercase tracking-wide">Working Hours</h3>
                  <p className="text-sm font-semibold text-slate-700">
                    Saturday - Thursday: 9:00 AM - 8:00 PM
                  </p>
                  <p className="text-xs text-slate-400 font-semibold mt-0.5">Friday Support Hotline: 10:00 AM - 5:00 PM</p>
                </div>
              </div>

              {/* Social Channels */}
              <div className="border-t border-slate-50 pt-4 flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Follow Us</span>
                <div className="flex gap-2.5">
                  <a href="#" className="w-9 h-9 rounded-xl border border-slate-100 bg-slate-50 hover:bg-[#FFF0F1] hover:border-[#FF5A5F] hover:text-[#FF5A5F] flex items-center justify-center text-slate-500 transition-all duration-200 active:scale-90">
                    <FaFacebookF className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-9 h-9 rounded-xl border border-slate-100 bg-slate-50 hover:bg-[#FFF0F1] hover:border-[#FF5A5F] hover:text-[#FF5A5F] flex items-center justify-center text-slate-500 transition-all duration-200 active:scale-90">
                    <FaTwitter className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-9 h-9 rounded-xl border border-slate-100 bg-slate-50 hover:bg-[#FFF0F1] hover:border-[#FF5A5F] hover:text-[#FF5A5F] flex items-center justify-center text-slate-500 transition-all duration-200 active:scale-90">
                    <FaInstagram className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-9 h-9 rounded-xl border border-slate-100 bg-slate-50 hover:bg-[#FFF0F1] hover:border-[#FF5A5F] hover:text-[#FF5A5F] flex items-center justify-center text-slate-500 transition-all duration-200 active:scale-90">
                    <FaLinkedinIn className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT: Form Column (7 Cols) */}
          <div className="lg:col-span-7 bg-white border border-slate-100 rounded-[32px] p-6 md:p-10 shadow-xs flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form 
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleFormSubmit}
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wide">Full Name</label>
                      <input 
                        type="text"
                        placeholder="Your full name"
                        value={formState.name}
                        onChange={e => setFormState(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full text-sm px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 outline-none focus:border-[#FF5A5F] focus:ring-2 focus:ring-[#FF5A5F]/10 transition-all"
                        required
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wide">Email Address</label>
                      <input 
                        type="email"
                        placeholder="your@email.com"
                        value={formState.email}
                        onChange={e => setFormState(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full text-sm px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 outline-none focus:border-[#FF5A5F] focus:ring-2 focus:ring-[#FF5A5F]/10 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wide">Phone Number</label>
                      <input 
                        type="text"
                        placeholder="+880 1XXX-XXXXXX"
                        value={formState.phone}
                        onChange={e => setFormState(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full text-sm px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 outline-none focus:border-[#FF5A5F] focus:ring-2 focus:ring-[#FF5A5F]/10 transition-all"
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wide">Subject</label>
                      <input 
                        type="text"
                        placeholder="How can we help?"
                        value={formState.subject}
                        onChange={e => setFormState(prev => ({ ...prev, subject: e.target.value }))}
                        className="w-full text-sm px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 outline-none focus:border-[#FF5A5F] focus:ring-2 focus:ring-[#FF5A5F]/10 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wide">Message Content</label>
                    <textarea 
                      placeholder="Write your message details here..."
                      rows={5}
                      value={formState.message}
                      onChange={e => setFormState(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full text-sm px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 outline-none focus:border-[#FF5A5F] focus:ring-2 focus:ring-[#FF5A5F]/10 transition-all resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#FF5A5F] hover:bg-[#FF4449] text-white text-sm font-extrabold py-3.5 rounded-xl border-none transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="submit-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center space-y-5 py-8"
                >
                  <div className="mx-auto w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 shadow-xs">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-extrabold text-slate-900">Message Received!</h3>
                    <p className="text-sm text-slate-500 max-w-sm mx-auto">
                      Thank you for contacting us. Our support team will review your query and get in touch within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="bg-slate-100 hover:bg-slate-250 text-slate-700 text-xs font-extrabold px-6 py-3 rounded-xl border-none transition-all active:scale-95 cursor-pointer mt-2"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* ── FAQ SECTION ACCORDION ── */}
        <div className="max-w-4xl mx-auto border-t border-slate-100 pt-16">
          <div className="text-center mb-10">
            <span className="text-[#FF5A5F] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-1.5">
              <HelpCircle className="w-4 h-4" />
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Need Answers Quickly?
            </h2>
          </div>

          <div className="space-y-4">
            {MOCK_FAQS.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div 
                  key={index}
                  className="bg-white border border-slate-100 rounded-2xl overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-800 hover:text-[#FF5A5F] transition-colors duration-200 outline-none border-none cursor-pointer"
                  >
                    <span className="text-sm md:text-base">{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#FF5A5F]" : ""}`} />
                  </button>
                  
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-1 text-slate-500 text-xs md:text-sm leading-relaxed border-t border-slate-50">
                      {faq.answer}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
