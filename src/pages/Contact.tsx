import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import {
  ArrowUpRight,
  Send,
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  Loader2,
  Instagram,
  Linkedin,
  Twitter
} from "lucide-react";

/* ================= CONTACT PAGE ================= */

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    budget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log("Form submitted:", formData);
    setIsSubmitting(false);
    setSubmitted(true);

    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        budget: "",
        message: "",
      });
      setSubmitted(false);
    }, 4000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email Us",
      value: "hello@midis.in",
      href: "mailto:hello@midis.in",
      description: "We'll respond within 24 hours"
    },
    {
      icon: Phone,
      label: "Call Us",
      value: "+91 98765 43210",
      href: "tel:+919876543210",
      description: "Mon-Fri, 9AM to 6PM IST"
    },
    {
      icon: MapPin,
      label: "Visit Us",
      value: "New Delhi, India",
      href: "#",
      description: "Schedule a meeting"
    },
    {
      icon: Clock,
      label: "Working Hours",
      value: "Mon - Fri",
      href: "#",
      description: "9:00 AM - 6:00 PM IST"
    }
  ];

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" }
  ];

  return (
    <main className="min-h-screen bg-white selection:bg-orange-600 selection:text-white overflow-x-hidden">
      <Navigation />

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[70vh] bg-[#0C0E12] flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-orange-600/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]" />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 text-center px-6"
        >
          <span className="text-orange-500 text-[11px] font-black uppercase tracking-[0.3em] mb-6 block">
            Get In Touch
          </span>

          <h1 className="text-[12vw] md:text-[10vw] lg:text-[8vw] font-black text-white leading-[0.9] tracking-tighter uppercase mb-8">
            LET'S CREATE
            <br />
            <span className="inline-flex items-center gap-4">
              TOGETHER
              <motion.div
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-[8vw] h-[8vw] max-w-[80px] max-h-[80px] bg-orange-600 rounded-2xl flex items-center justify-center"
              >
                <ArrowUpRight className="text-white w-[4vw] h-[4vw] max-w-[40px] max-h-[40px]" />
              </motion.div>
            </span>
          </h1>

          <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Have a project in mind? We'd love to hear about it. Let's discuss how we can help bring your vision to life.
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 flex flex-col items-center gap-3"
        >
          <span className="text-white/30 text-[10px] uppercase tracking-[0.3em] font-bold">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent"
          />
        </motion.div>
      </section>

      {/* ================= CONTACT INFO CARDS ================= */}
      <section className="relative -mt-16 z-20 px-6 md:px-12 lg:px-24 mb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.label}
                href={info.href}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group bg-white rounded-3xl p-8 shadow-xl shadow-black/5 border border-gray-100 hover:border-orange-200 hover:shadow-orange-500/10 transition-all duration-500"
              >
                <div className="w-14 h-14 bg-gray-50 group-hover:bg-orange-600 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500">
                  <info.icon className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                </div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">{info.label}</p>
                <p className="text-xl font-bold text-[#0C0E12] mb-1">{info.value}</p>
                <p className="text-sm text-gray-400">{info.description}</p>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= MAIN FORM SECTION ================= */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

            {/* Left Column - Info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 lg:sticky lg:top-32"
            >
              <span className="text-[10px] font-black text-orange-600 uppercase tracking-[0.2em] mb-4 block">
                Start A Project
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0C0E12] leading-[0.95] tracking-tight uppercase mb-8">
                TELL US ABOUT <br />
                <span className="text-orange-600">YOUR VISION</span>
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-12 max-w-md">
                Fill out the form and our team will get back to you within 24 hours to discuss how we can help transform your ideas into reality.
              </p>

              {/* Trust Indicators */}
              <div className="space-y-6 mb-12">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-[#0C0E12]">Quick Response</p>
                    <p className="text-sm text-gray-400">We respond within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-bold text-[#0C0E12]">Free Consultation</p>
                    <p className="text-sm text-gray-400">No commitment required</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-bold text-[#0C0E12]">Expert Team</p>
                    <p className="text-sm text-gray-400">15+ years combined experience</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Follow Us</p>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-[#0C0E12] hover:border-[#0C0E12] transition-all duration-300 group"
                    >
                      <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-7"
            >
              <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-2xl shadow-black/5 border border-gray-100">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="py-20 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", duration: 0.6 }}
                        className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8"
                      >
                        <CheckCircle className="w-12 h-12 text-green-600" />
                      </motion.div>
                      <h3 className="text-3xl font-black text-[#0C0E12] mb-4">Message Sent!</h3>
                      <p className="text-gray-500 text-lg">We'll get back to you within 24 hours.</p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="space-y-8"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div className="relative">
                          <label className={`absolute left-0 transition-all duration-300 pointer-events-none ${focusedField === 'name' || formData.name
                            ? 'text-[10px] font-bold text-orange-600 -top-2 uppercase tracking-[0.2em]'
                            : 'text-gray-400 top-4'
                            }`}>
                            Your Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('name')}
                            onBlur={() => setFocusedField(null)}
                            required
                            className="w-full bg-transparent border-b-2 border-gray-200 py-4 focus:border-orange-600 outline-none transition-all text-[#0C0E12] font-medium"
                          />
                        </div>

                        {/* Email */}
                        <div className="relative">
                          <label className={`absolute left-0 transition-all duration-300 pointer-events-none ${focusedField === 'email' || formData.email
                            ? 'text-[10px] font-bold text-orange-600 -top-2 uppercase tracking-[0.2em]'
                            : 'text-gray-400 top-4'
                            }`}>
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField(null)}
                            required
                            className="w-full bg-transparent border-b-2 border-gray-200 py-4 focus:border-orange-600 outline-none transition-all text-[#0C0E12] font-medium"
                          />
                        </div>

                        {/* Phone */}
                        <div className="relative">
                          <label className={`absolute left-0 transition-all duration-300 pointer-events-none ${focusedField === 'phone' || formData.phone
                            ? 'text-[10px] font-bold text-orange-600 -top-2 uppercase tracking-[0.2em]'
                            : 'text-gray-400 top-4'
                            }`}>
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('phone')}
                            onBlur={() => setFocusedField(null)}
                            className="w-full bg-transparent border-b-2 border-gray-200 py-4 focus:border-orange-600 outline-none transition-all text-[#0C0E12] font-medium"
                          />
                        </div>

                        {/* Company */}
                        <div className="relative">
                          <label className={`absolute left-0 transition-all duration-300 pointer-events-none ${focusedField === 'company' || formData.company
                            ? 'text-[10px] font-bold text-orange-600 -top-2 uppercase tracking-[0.2em]'
                            : 'text-gray-400 top-4'
                            }`}>
                            Company Name
                          </label>
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('company')}
                            onBlur={() => setFocusedField(null)}
                            className="w-full bg-transparent border-b-2 border-gray-200 py-4 focus:border-orange-600 outline-none transition-all text-[#0C0E12] font-medium"
                          />
                        </div>
                      </div>

                      {/* Budget */}
                      <div className="relative">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] block mb-3">
                          Project Budget
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {['< ₹50K', '₹50K - ₹2L', '₹2L - ₹5L', '₹5L+'].map((budget) => (
                            <button
                              key={budget}
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, budget }))}
                              className={`py-3 px-4 rounded-full text-sm font-bold transition-all duration-300 ${formData.budget === budget
                                ? 'bg-orange-600 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                              {budget}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Message */}
                      <div className="relative">
                        <label className={`absolute left-0 transition-all duration-300 pointer-events-none ${focusedField === 'message' || formData.message
                          ? 'text-[10px] font-bold text-orange-600 -top-2 uppercase tracking-[0.2em]'
                          : 'text-gray-400 top-4'
                          }`}>
                          Tell us about your project *
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('message')}
                          onBlur={() => setFocusedField(null)}
                          required
                          rows={4}
                          className="w-full bg-transparent border-b-2 border-gray-200 py-4 focus:border-orange-600 outline-none transition-all text-[#0C0E12] font-medium resize-none"
                        />
                      </div>

                      {/* Submit Button */}
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full md:w-auto bg-[#0C0E12] text-white px-12 py-5 rounded-full font-black uppercase text-[11px] tracking-[0.15em] flex items-center justify-center gap-4 hover:bg-orange-600 transition-all duration-500 disabled:opacity-70 disabled:cursor-not-allowed group"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                          </>
                        )}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= MAP / CTA SECTION ================= */}
      <section className="relative h-[60vh] min-h-[500px] bg-[#0C0E12] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
            alt="Office"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C0E12] via-[#0C0E12]/80 to-transparent" />
        </div>

        <div className="relative z-10 h-full flex items-center px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h2 className="text-5xl md:text-7xl font-black text-white leading-[0.95] tracking-tight uppercase mb-6">
              READY TO START <br />
              <span className="text-orange-600">YOUR PROJECT?</span>
            </h2>
            <p className="text-white/60 text-lg mb-8 max-w-md">
              Let's schedule a call to discuss your goals and how we can help you achieve them.
            </p>
            <motion.a
              href="mailto:hello@midis.in"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-white text-[#0C0E12] px-10 py-5 rounded-full font-black uppercase text-[11px] tracking-[0.15em] hover:bg-orange-600 hover:text-white transition-all duration-300"
            >
              Get In Touch
              <ArrowUpRight className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}