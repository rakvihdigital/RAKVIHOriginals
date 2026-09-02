"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "Private Salon Appointment",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const contactChannels = [
    {
      title: "Direct Client Inquiries",
      detail: "contact@rakvihoriginals.com",
      link: "mailto:contact@rakvihoriginals.com",
      desc: "For general inquiries, orders, and sizing assistance.",
    },
    {
      title: "Private Salon Appointments",
      detail: "+1 (212) 888-0018",
      link: "tel:+12128880018",
      desc: "Champagne styling sessions & bespoke atelier commissions.",
    },
    {
      title: "VIP WhatsApp Concierge",
      detail: "+33 1 42 68 00 18",
      link: "https://wa.me/33142680018",
      desc: "Instant priority messaging for registered collectors.",
    },
  ];

  const locations = [
    {
      city: "PARIS",
      address: "18 Place Vendôme, 75001 Paris, France",
      phone: "+33 1 42 68 00 18",
      hours: "Mon – Sat: 10:00 – 19:00 CET",
    },
    {
      city: "MILAN",
      address: "Via Montenapoleone 8, 20121 Milano, Italy",
      phone: "+39 02 7600 1818",
      hours: "Mon – Sat: 10:30 – 19:30 CET",
    },
    {
      city: "NEW YORK",
      address: "650 Madison Avenue, New York, NY 10022",
      phone: "+1 (212) 888-0018",
      hours: "Mon – Sat: 10:00 – 18:00 EST",
    },
    {
      city: "DUBAI",
      address: "Fashion Avenue, The Dubai Mall, Downtown Dubai",
      phone: "+971 4 362 7500",
      hours: "Sun – Thu: 10:00 – 22:00 GST",
    },
  ];

  const faqs = [
    {
      q: "How can I schedule a private viewing appointment?",
      a: "You may complete the inquiry form below or contact our VIP concierge directly via WhatsApp. An advisor will confirm your private salon slot within 2 hours.",
    },
    {
      q: "Do you offer bespoke leather monogramming and custom sizing?",
      a: "Yes. All RAKVIH handbags, footwear, and belts can be personalized with hand-painted initials, custom hardware engraving, or bespoke sizing created in our Italian ateliers.",
    },
    {
      q: "What are your international shipping and white-glove delivery terms?",
      a: "We provide fully insured worldwide courier delivery via secure armored transit, accompanied by a numbered certificate of authenticity and archival packaging.",
    },
  ];

  return (
    <main className="subpage-wrapper">
      {/* Hero */}
      <section className="subpage-hero">
        <div className="subpage-hero-inner">
          <div className="subpage-breadcrumbs">
            <Link href="/">Home</Link> <span>/</span> <span className="active">Contact Us</span>
          </div>
          <div className="hero-accent-line">
            <div className="accent-bar"></div>
            <span className="accent-label">Client Services</span>
          </div>
          <h1 className="subpage-title">
            CONTACT <span className="hero-title-stroke">US</span>
          </h1>
          <p className="subpage-subtitle">
            Our dedicated client advisors are at your service for private showroom appointments, bespoke commissions, and worldwide assistance.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="subpage-content-section">
        <div className="subpage-container">
          {/* Quick Channels Cards */}
          <div className="contact-channels-grid">
            {contactChannels.map((ch, idx) => (
              <a key={idx} href={ch.link} className="contact-channel-card">
                <span className="accent-label">Direct Channel</span>
                <h3>{ch.title}</h3>
                <p className="channel-detail">{ch.detail}</p>
                <span className="channel-desc">{ch.desc}</span>
              </a>
            ))}
          </div>

          {/* Form & Locations Grid */}
          <div className="contact-main-grid" style={{ marginTop: "5rem" }}>
            {/* Contact Form */}
            <div className="contact-form-card">
              <span className="accent-label">Get in Touch</span>
              <h2>Send An Inquiry</h2>

              {submitted ? (
                <div className="contact-success-box">
                  <div className="success-icon">✓</div>
                  <h3>Inquiry Received</h3>
                  <p>
                    Thank you for reaching out to RAKVIH Originals. A dedicated client advisor will review your message and respond within 2 hours.
                  </p>
                  <button
                    type="button"
                    className="hero-cta-pill"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ firstName: "", lastName: "", email: "", phone: "", subject: "Private Salon Appointment", message: "" });
                    }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form className="luxury-contact-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>First Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Eleanor"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Vance"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Email Address</label>
                      <input
                        type="email"
                        placeholder="e.g. eleanor@vance.com"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone / WhatsApp</label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Inquiry Subject</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    >
                      <option value="Private Salon Appointment">Private Salon Appointment (Paris / Milan / NY / Dubai)</option>
                      <option value="Bespoke Atelier Commission">Bespoke Monogramming / Atelier Commission</option>
                      <option value="Product Availability & Sizing">Product Availability & Sizing Consultation</option>
                      <option value="Customer Care & Delivery">Customer Care & Worldwide White-Glove Delivery</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Message</label>
                    <textarea
                      rows={4}
                      placeholder="Please detail your request, preferred dates, or specific collection inquiries..."
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    ></textarea>
                  </div>

                  <button type="submit" className="hero-cta-pill" style={{ width: "100%", textAlign: "center" }}>
                    Submit Message
                  </button>
                </form>
              )}
            </div>

            {/* Global Salons Directory */}
            <div className="contact-info-card">
              <span className="accent-label">Global Showrooms</span>
              <h2>Our Private Salons</h2>

              <div className="salon-locations-list">
                {locations.map((loc) => (
                  <div key={loc.city} className="salon-location-item">
                    <h4>{loc.city}</h4>
                    <p>{loc.address}</p>
                    <span className="salon-phone">{loc.phone}</span>
                    <span className="salon-hours">{loc.hours}</span>
                  </div>
                ))}
              </div>

              <div className="direct-concierge-pill" style={{ marginTop: "2rem" }}>
                <p>Direct Advisory Desk</p>
                <a href="mailto:contact@rakvihoriginals.com">contact@rakvihoriginals.com</a>
              </div>
            </div>
          </div>

          {/* Frequently Asked Questions */}
          <div className="contact-faqs-section" style={{ marginTop: "6rem" }}>
            <div className="about-pillars-header">
              <span className="accent-label">Assistance</span>
              <h2>Frequently Asked Questions</h2>
            </div>
            <div className="faqs-grid">
              {faqs.map((faq, idx) => (
                <div key={idx} className="faq-card">
                  <h4>{faq.q}</h4>
                  <p>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
