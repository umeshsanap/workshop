
import React, { useState } from 'react';
import { X, User, Mail, Phone, GraduationCap, BookOpen, Calendar, Send, CheckCircle, Sparkles } from 'lucide-react';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  collegeName: string;
  course: string;
  year: string;
  branch: string;
  interests: string[];
  message: string;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    collegeName: '',
    course: '',
    year: '',
    branch: '',
    interests: [],
    message: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const interestOptions = [
    'Python Development',
    'Data Science',
    'Machine Learning',
    'Gen-AI / LLMs',
    'Web Development',
    'DevOps / Cloud',
    'Mobile Apps',
    'Internship'
  ];

  const yearOptions = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Passout'];
  
  const courseOptions = ['B.Tech', 'B.E.', 'BCA', 'MCA', 'M.Tech', 'B.Sc IT', 'M.Sc IT', 'Other'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call - In production, replace with actual API endpoint
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Log data (you can send this to your backend/Google Sheets/etc.)
    console.log('Registration Data:', formData);
    
    // Store in localStorage for demo purposes
    const registrations = JSON.parse(localStorage.getItem('futurebright_registrations') || '[]');
    registrations.push({ ...formData, timestamp: new Date().toISOString() });
    localStorage.setItem('futurebright_registrations', JSON.stringify(registrations));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      collegeName: '',
      course: '',
      year: '',
      branch: '',
      interests: [],
      message: ''
    });
    setIsSubmitted(false);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(5, 13, 24, 0.95)' }}
    >
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose}></div>
      
      {/* Modal */}
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl"
        style={{ 
          background: 'linear-gradient(135deg, rgba(10, 22, 40, 0.98), rgba(5, 13, 24, 0.98))',
          border: '1px solid rgba(0, 212, 255, 0.3)',
          boxShadow: '0 0 60px rgba(0, 212, 255, 0.2)'
        }}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 z-10"
          style={{ background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)' }}
        >
          <X size={20} className="text-slate-400" />
        </button>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
                style={{ background: 'rgba(46, 204, 113, 0.1)', border: '1px solid rgba(46, 204, 113, 0.3)', color: '#2ecc71' }}
              >
                <Sparkles size={14} />
                Connect With Us
              </div>
              <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                <span className="text-[#f5a623]">Register</span> <span className="text-[#00d4ff]">Now</span>
              </h2>
              <p className="text-slate-400">Fill in your details to stay connected with FutureBright</p>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#00d4ff]" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#0a1628] border border-[#00d4ff]/20 text-white placeholder-slate-500 focus:border-[#00d4ff] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#f5a623]" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your.email@example.com"
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#0a1628] border border-[#f5a623]/20 text-white placeholder-slate-500 focus:border-[#f5a623] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                  WhatsApp Number *
                </label>
                <div className="relative">
                  <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2ecc71]" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="+91 98765 43210"
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#0a1628] border border-[#2ecc71]/20 text-white placeholder-slate-500 focus:border-[#2ecc71] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* College Name */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                  College / University Name *
                </label>
                <div className="relative">
                  <GraduationCap size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#00d4ff]" />
                  <input
                    type="text"
                    name="collegeName"
                    value={formData.collegeName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your college name"
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#0a1628] border border-[#00d4ff]/20 text-white placeholder-slate-500 focus:border-[#00d4ff] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Course */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                  Course *
                </label>
                <div className="relative">
                  <BookOpen size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#f5a623]" />
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#0a1628] border border-[#f5a623]/20 text-white focus:border-[#f5a623] focus:outline-none transition-colors appearance-none cursor-pointer"
                  >
                    <option value="">Select Course</option>
                    {courseOptions.map(course => (
                      <option key={course} value={course}>{course}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Year */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                  Year *
                </label>
                <div className="relative">
                  <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2ecc71]" />
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#0a1628] border border-[#2ecc71]/20 text-white focus:border-[#2ecc71] focus:outline-none transition-colors appearance-none cursor-pointer"
                  >
                    <option value="">Select Year</option>
                    {yearOptions.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Branch */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                  Branch / Specialization
                </label>
                <input
                  type="text"
                  name="branch"
                  value={formData.branch}
                  onChange={handleInputChange}
                  placeholder="e.g., Computer Science, IT, Electronics..."
                  className="w-full px-4 py-3 rounded-xl bg-[#0a1628] border border-white/10 text-white placeholder-slate-500 focus:border-[#00d4ff] focus:outline-none transition-colors"
                />
              </div>

              {/* Interests */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
                  Areas of Interest (Select all that apply)
                </label>
                <div className="flex flex-wrap gap-2">
                  {interestOptions.map(interest => (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => handleInterestToggle(interest)}
                      className="px-4 py-2 rounded-full text-sm font-medium transition-all"
                      style={{
                        background: formData.interests.includes(interest) 
                          ? 'linear-gradient(135deg, #00d4ff, #2ecc71)' 
                          : 'rgba(10, 22, 40, 0.8)',
                        color: formData.interests.includes(interest) ? '#0a1628' : '#94a3b8',
                        border: formData.interests.includes(interest) 
                          ? 'none' 
                          : '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: formData.interests.includes(interest) 
                          ? '0 0 15px rgba(0, 212, 255, 0.4)' 
                          : 'none'
                      }}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                  Any Questions or Message? (Optional)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your goals, questions, or anything you'd like to know..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-[#0a1628] border border-white/10 text-white placeholder-slate-500 focus:border-[#00d4ff] focus:outline-none transition-colors resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                style={{
                  background: 'linear-gradient(135deg, #f5a623, #ff8c00)',
                  color: '#0a1628',
                  boxShadow: '0 0 30px rgba(245, 166, 35, 0.4)'
                }}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-[#0a1628] border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Submit Registration
                  </>
                )}
              </button>
            </div>

            {/* Privacy Note */}
            <p className="text-center text-xs text-slate-500 mt-4">
              By registering, you agree to receive updates from FutureBright IT Solutions about courses, workshops, and career opportunities.
            </p>
          </form>
        ) : (
          /* Success State */
          <div className="p-12 text-center">
            <div 
              className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ 
                background: 'rgba(46, 204, 113, 0.1)',
                border: '2px solid rgba(46, 204, 113, 0.3)',
                boxShadow: '0 0 40px rgba(46, 204, 113, 0.3)'
              }}
            >
              <CheckCircle size={48} className="text-[#2ecc71]" />
            </div>
            
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              <span className="text-[#2ecc71]">Thank You!</span>
            </h2>
            
            <p className="text-xl text-slate-300 mb-2">
              Welcome to the FutureBright Community, <span className="text-[#f5a623] font-bold">{formData.fullName}!</span>
            </p>
            
            <p className="text-slate-400 mb-8">
              We'll reach out to you soon on WhatsApp with exciting updates about AI workshops, courses, and career opportunities.
            </p>

            <div 
              className="inline-block p-6 rounded-2xl mb-8"
              style={{ background: 'rgba(0, 212, 255, 0.05)', border: '1px solid rgba(0, 212, 255, 0.2)' }}
            >
              <p className="text-sm text-slate-400 mb-2">Your Registration ID</p>
              <p className="text-2xl font-bold text-[#00d4ff]" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                FB-{Date.now().toString().slice(-6)}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  resetForm();
                  onClose();
                }}
                className="px-8 py-3 rounded-xl font-bold transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #00d4ff, #2ecc71)',
                  color: '#0a1628',
                  boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)'
                }}
              >
                Continue Exploring
              </button>
              <button
                onClick={resetForm}
                className="px-8 py-3 rounded-xl font-bold transition-all hover:scale-105"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white'
                }}
              >
                Register Another
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

