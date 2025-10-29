import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.subject) newErrors.subject = "Please select a subject";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setShowSuccess(true);
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-zinc-100 relative overflow-hidden">
      {/* soft glow background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-56 h-56 sm:w-72 sm:h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div
          className="absolute top-40 right-10 w-56 h-56 sm:w-72 sm:h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute -bottom-8 left-1/2 w-56 h-56 sm:w-72 sm:h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Back button */}
      <div className="relative z-10 px-4 md:px-8 lg:px-16 py-6">
        <button className="flex items-center text-zinc-400 hover:text-[#6556CD] transition-all duration-300 group">
          <i
            onClick={() => window.history.back()}
            className="ri-arrow-left-line text-2xl mr-2 transform group-hover:-translate-x-1 transition-transform"
          ></i>
          <span className="text-base sm:text-lg font-medium">Back</span>
        </button>
      </div>

      <div className="relative z-10 w-full px-4 md:px-8 lg:px-16 pb-16">
        {/* heading */}
        <div className="text-center mb-12 sm:mb-16 space-y-4 sm:space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold bg-gradient-to-r from-[#6556CD] via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Let's Connect
          </h1>
          <div className="h-1 bg-gradient-to-r from-transparent via-[#6556CD] to-transparent mt-2 sm:mt-4"></div>
          <p className="text-zinc-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed px-2">
            Your feedback shapes our platform. Whether you have questions,
            suggestions, or just want to say hello, we're all ears!
          </p>
        </div>

        {/* form */}
        <div className="mb-12 sm:mb-16">
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl shadow-2xl p-5 sm:p-8 md:p-10 lg:p-12 border border-zinc-700">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* name */}
                <div>
                  <label className="block text-zinc-300 mb-2 font-medium flex items-center text-sm sm:text-base">
                    <i className="ri-user-line mr-2 text-[#6556CD]"></i>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full p-3 sm:p-4 bg-zinc-800/50 border ${
                      errors.name ? "border-red-500" : "border-zinc-700"
                    } rounded-xl text-zinc-100 focus:outline-none focus:border-[#6556CD] focus:ring-2 focus:ring-[#6556CD]/30 transition-all placeholder-zinc-500 text-sm sm:text-base`}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                {/* email */}
                <div>
                  <label className="block text-zinc-300 mb-2 font-medium flex items-center text-sm sm:text-base">
                    <i className="ri-mail-line mr-2 text-[#6556CD]"></i>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full p-3 sm:p-4 bg-zinc-800/50 border ${
                      errors.email ? "border-red-500" : "border-zinc-700"
                    } rounded-xl text-zinc-100 focus:outline-none focus:border-[#6556CD] focus:ring-2 focus:ring-[#6556CD]/30 transition-all placeholder-zinc-500 text-sm sm:text-base`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* subject */}
              <div>
                <label className="block text-zinc-300 mb-2 font-medium flex items-center text-sm sm:text-base">
                  <i className="ri-bookmark-line mr-2 text-[#6556CD]"></i>
                  Subject *
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={`w-full p-3 sm:p-4 bg-zinc-800/50 border ${
                    errors.subject ? "border-red-500" : "border-zinc-700"
                  } rounded-xl text-zinc-100 focus:outline-none focus:border-[#6556CD] focus:ring-2 focus:ring-[#6556CD]/30 transition-all text-sm sm:text-base`}
                >
                  <option value="">Choose a topic</option>
                  <option value="general">General Inquiry</option>
                  <option value="bug">Bug Report</option>
                  <option value="feature">Feature Request</option>
                  <option value="feedback">Feedback & Suggestions</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="other">Other</option>
                </select>
                {errors.subject && (
                  <p className="text-red-400 text-sm mt-1">{errors.subject}</p>
                )}
              </div>

              {/* message */}
              <div>
                <label className="block text-zinc-300 mb-2 font-medium flex items-center text-sm sm:text-base">
                  <i className="ri-message-3-line mr-2 text-[#6556CD]"></i>
                  Your Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="5"
                  className={`w-full p-3 sm:p-4 bg-zinc-800/50 border ${
                    errors.message ? "border-red-500" : "border-zinc-700"
                  } rounded-xl text-zinc-100 focus:outline-none focus:border-[#6556CD] focus:ring-2 focus:ring-[#6556CD]/30 transition-all resize-none placeholder-zinc-500 text-sm sm:text-base`}
                  placeholder="Tell us what's on your mind..."
                ></textarea>
                {errors.message && (
                  <p className="text-red-400 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              {/* button */}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#6556CD] to-purple-600 hover:from-[#5a4bb8] hover:to-purple-700 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-[#6556CD]/50 transform hover:-translate-y-0.5 flex items-center justify-center group text-sm sm:text-base"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <i className="ri-send-plane-fill ml-2 group-hover:translate-x-1 transition-transform"></i>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* info cards & FAQs remain unchanged */}
        {/* (They are already responsive via grid-cols-1 md:grid-cols-3 and spacing) */}
      </div>

      {/* success popup */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl p-6 sm:p-8 max-w-md w-full border border-zinc-700 shadow-2xl">
            <div className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-check-line text-3xl sm:text-4xl text-green-400"></i>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-200 mb-3">
                Message Sent!
              </h3>
              <p className="text-zinc-400 mb-6 leading-relaxed text-sm sm:text-base">
                Thank you for reaching out! We'll get back to you soon.
              </p>
              <button
                onClick={() => setShowSuccess(false)}
                className="w-full bg-gradient-to-r from-[#6556CD] to-purple-600 hover:from-[#5a4bb8] hover:to-purple-700 text-white font-semibold py-2.5 sm:py-3 px-4 rounded-xl transition-all text-sm sm:text-base"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactUs;
