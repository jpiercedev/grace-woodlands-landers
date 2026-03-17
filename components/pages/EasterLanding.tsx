'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

const overviewCards = [
  {
    title: 'The Presence of God',
    description:
      'We are a church that prioritizes the presence of God and believes in the power of prayer.',
  },
  {
    title: "The Truth of God's Word",
    description:
      "We unashamedly preach God's Word and stand firmly on its truth.",
  },
  {
    title: 'A Church for You',
    description:
      "If you're looking for a place grounded in God's presence and truth… GRACE IS FOR YOU!",
  },
]

const galleryImages = [
  { src: '/images/promo/0F8A4089-Enhanced-NR.jpg', alt: 'Grace Woodlands community gathering' },
  { src: '/images/promo/0F8A4230-Enhanced-NR.jpg', alt: 'Worship at Grace Woodlands' },
  { src: '/images/promo/0F8A4588-Enhanced-NR.jpg', alt: 'Grace Woodlands congregation' },
  { src: '/images/promo/0F8A4662-Enhanced-NR.jpg', alt: 'Community at Grace Woodlands' },
  { src: '/images/promo/0F8A8091-2.jpg', alt: 'Grace Woodlands service moment' },
  { src: '/images/promo/0F8A8176.jpg', alt: 'People connecting at Grace Woodlands' },
  { src: '/images/promo/0F8A8241.jpg', alt: 'Grace Woodlands Easter celebration' },
  { src: '/images/promo/0F8A8636.jpg', alt: 'Worship experience at Grace Woodlands' },
  { src: '/images/promo/0F8A8876.jpg', alt: 'Grace Woodlands church family' },
  { src: '/images/promo/0F8A8935-crop.jpg', alt: 'Easter at Grace Woodlands' },
]

const aboutLinks = [
  { label: 'Who We Are', href: 'https://gracewoodlands.com/about/' },
  { label: 'Values', href: 'https://gracewoodlands.com/values/' },
  { label: 'Leadership Team', href: 'https://gracewoodlands.com/leadership/' },
  { label: 'Grace International', href: 'https://gracewoodlands.com/grace-international/' },
  { label: 'Grace Latino', href: 'https://gracewoodlands.com/grace-latino/' },
  { label: 'Business Directory', href: 'https://gracewoodlands.com/business-directory/' },
]

const ministriesLinks = [
  { label: 'Grace Kids', href: 'https://gracewoodlands.com/grace-kids/' },
  { label: 'Anthem Youth', href: 'https://gracewoodlands.com/anthem/' },
  { label: 'Faith Votes', href: 'https://gracewoodlands.com/faith-votes/' },
  { label: 'PrimeTime Seniors', href: 'https://gracewoodlands.com/primetime/' },
  { label: 'Pastoral Care', href: 'https://gracewoodlands.com/pastoral-care/' },
  { label: 'More Ministries', href: 'https://gracewoodlands.com/ministries/' },
]

const joinUsLinks = [
  { label: 'Events', href: 'https://gracewoodlands.com/events/' },
  { label: 'Groups & Classes', href: 'https://gracewoodlands.com/groups/' },
  { label: 'Volunteer', href: 'https://gracewoodlands.com/volunteer/' },
  { label: 'Give', href: 'https://gracewoodlands.com/give/' },
]

const mediaLinks = [
  { label: 'Sermons', href: 'https://gracewoodlands.com/sermons/' },
  { label: 'Watch Live', href: 'https://gracewoodlands.com/live/' },
]

export default function EasterLanding() {
  const [newsletterData, setNewsletterData] = useState({ name: '', email: '' })
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false)
  const [newsletterMessage, setNewsletterMessage] = useState('')
  const [newsletterMessageType, setNewsletterMessageType] = useState<'success' | 'error' | ''>('')

  const [contactData, setContactData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  })
  const [contactSubmitting, setContactSubmitting] = useState(false)
  const [contactMessage, setContactMessage] = useState('')
  const [contactMessageType, setContactMessageType] = useState<'success' | 'error' | ''>('')

  useEffect(() => {
    const els = document.querySelectorAll('.scroll-animate')
    if (!els.length) return
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view')
          observer.unobserve(entry.target)
        }
      }),
      { threshold: 0.12 }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setNewsletterSubmitting(true)
    setNewsletterMessage('')
    setNewsletterMessageType('')

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newsletterData),
      })

      const data = await response.json()

      if (response.ok) {
        setNewsletterMessage(data.message || 'Thanks for signing up!')
        setNewsletterMessageType('success')
        setNewsletterData({ name: '', email: '' })
      } else {
        setNewsletterMessage(data.error || 'Something went wrong. Please try again.')
        setNewsletterMessageType('error')
      }
    } catch {
      setNewsletterMessage('Failed to sign up. Please try again.')
      setNewsletterMessageType('error')
    } finally {
      setNewsletterSubmitting(false)
    }
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setContactSubmitting(true)
    setContactMessage('')
    setContactMessageType('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData),
      })

      const data = await response.json()

      if (response.ok) {
        setContactMessage(data.message || 'Thank you for your message! We will get back to you soon.')
        setContactMessageType('success')
        setContactData({ firstName: '', lastName: '', email: '', message: '' })
      } else {
        setContactMessage(data.error || 'Something went wrong. Please try again.')
        setContactMessageType('error')
      }
    } catch {
      setContactMessage('Failed to send message. Please try again.')
      setContactMessageType('error')
    } finally {
      setContactSubmitting(false)
    }
  }

  return (
    <div className="easter-page">
      <div className="easter-announcement-bar">
        <p>Celebrate Easter at Grace • He Is Risen!</p>
      </div>

      <header className="easter-header">
        <div className="container easter-header-inner">
          <Link href="/">
            <img
              src="/images/general/Grace Church LOGO wide.webp"
              alt="Grace Woodlands"
              className="easter-logo"
            />
          </Link>
          <nav className="easter-header-links" aria-label="Easter page sections">
            <a href="#service-times">Service Times</a>
            <a href="#map">Directions</a>
            <a href="#contact">Contact</a>
          </nav>
          <a href="#contact" className="easter-header-cta">Plan Your Visit</a>
        </div>
      </header>

      <section className="easter-hero-section">
        <div className="container easter-hero-container">
          <div className="easter-hero-copy">
            <img
              src="/images/raw/Logo.png"
              alt="Easter at Grace"
              className="easter-hero-logo"
            />
            <p>
              <strong>Join us on Sunday, April 5th at 9am or 11am</strong> for a powerful worship experience with the Grace Choir and an encouraging message from Pastor Steve Riggle. We have something for the whole family as we worship and celebrate our Risen Savior!
            </p>
            <div className="easter-hero-actions">
              <a href="#service-times" className="easter-primary-btn">See Service Times</a>
              <a href="#map" className="easter-secondary-btn">Get Directions</a>
            </div>
            <div className="easter-service-chips" aria-label="Key Easter details">
              <span>Good Friday • 7:00 PM</span>
              <span>Sunday • 9:00 AM, 11:00 AM &amp; 2:00 PM (Español)</span>
            </div>
          </div>

          <div className="easter-hero-card">
            <span className="easter-hero-card-label">Easter weekend at a glance</span>
            <h2>If you are looking for a church to celebrate the risen Christ and the hope He brings—where the presence of God is welcomed, the power of prayer is believed in, friendships are built, and God's Word is boldly preached…{' '}GRACE IS FOR YOU!</h2>
            <ul className="easter-hero-list">
              <li>
                <strong>Good Friday</strong>
                <span>April 3 • 7:00 PM - 8:30 PM</span>
              </li>
              <li>
                <strong>Easter Sunday</strong>
                <span>9:00 AM, 11:00 AM &amp; 2:00 PM (Español)</span>
              </li>
              <li>
                <strong>Location</strong>
                <span>24400 Interstate 45 N, Spring, TX 77386</span>
              </li>
            </ul>
            <a href="#contact" className="easter-inline-link">Have a question before you come? Reach out →</a>
          </div>
        </div>
      </section>

      <nav className="easter-quick-links" aria-label="Quick Easter links">
        <div className="container easter-quick-links-container">
          <a href="#good-friday" className="easter-quick-link">Good Friday</a>
          <a href="#easter-sunday" className="easter-quick-link">Easter Sunday</a>
          <a href="#map" className="easter-quick-link">Map &amp; Directions</a>
        </div>
      </nav>

      <section className="easter-section easter-overview-section">
        <div className="container">
          <div className="modern-event-container">
            <div className="modern-event-content">
              <div className="easter-section-heading scroll-animate">
                <span className="easter-section-kicker">What to expect</span>
                <h2>Grace is for You</h2>
              </div>
              <div className="easter-overview-grid">
                {overviewCards.map((card, i) => (
                  <article key={card.title} className={`easter-overview-card scroll-animate sa-delay-${i + 1}`}>
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </article>
                ))}
              </div>
            </div>
            <div className="photo-grid-5 scroll-animate sa-right" aria-hidden="true">
              <img src="/images/promo/0F8A4089-Enhanced-NR.jpg" alt="Grace Woodlands community gathering" className="photo-grid-main" />
              <img src="/images/promo/0F8A4230-Enhanced-NR.jpg" alt="Worship at Grace Woodlands" className="photo-grid-item" />
              <img src="/images/promo/0F8A4588-Enhanced-NR.jpg" alt="Grace Woodlands congregation" className="photo-grid-item" />
              <img src="/images/promo/0F8A4662-Enhanced-NR.jpg" alt="Community at Grace Woodlands" className="photo-grid-item" />
              <img src="/images/promo/0F8A8091-2.jpg" alt="Grace Woodlands service moment" className="photo-grid-item" />
            </div>
          </div>
        </div>
      </section>

      <section className="easter-section easter-feature-section" id="service-times">
        <div className="container">
          <div className="easter-section-heading scroll-animate">
            <span className="easter-section-kicker">Weekend details</span>
            <h2>Plan your Easter weekend at Grace.</h2>
            <p>
              Whether you want a reflective Good Friday gathering or a joyful Easter Sunday worship experience,
              Grace has space for you.
            </p>
          </div>

          <div className="easter-feature-grid">
            <article className="easter-feature-card easter-feature-card-dark scroll-animate sa-delay-1" id="good-friday">
              <span className="easter-feature-meta">Friday evening</span>
              <h3>Good Friday</h3>
              <p>
                Join us for a meaningful evening centered on the cross, reflection, and the hope that carries us into Easter Sunday.
              </p>
              <ul className="easter-feature-list">
                <li>April 3</li>
                <li>7:00 PM - 8:30 PM</li>
                <li>Helpful parking and easy campus access</li>
              </ul>
            </article>

            <article className="easter-feature-card scroll-animate sa-delay-2" id="easter-sunday">
              <span className="easter-feature-meta">Sunday morning</span>
              <h3>Easter Sunday</h3>
              <p>
                Celebrate the resurrection with worship, biblical teaching, and a church family ready to welcome you from the front door to the auditorium.
              </p>
              <ul className="easter-feature-list">
                <li>Sunday worship at 9:00 AM, 11:00 AM &amp; 2:00 PM (Español)</li>
                <li>Grace Kids available for families</li>
                <li>Come as you are</li>
              </ul>
            </article>

            <article className="easter-feature-card easter-feature-card-soft scroll-animate sa-delay-3">
              <span className="easter-feature-meta">First-time guests</span>
              <h3>Your first visit made simple</h3>
              <p>
                If you are new to Grace, we would love to help make your visit easy. Reach out ahead of time or just stop by and let our team help you find your next step.
              </p>
              <ul className="easter-feature-list">
                <li>Friendly hosts ready to help</li>
                <li>Fast, easy kids check-in for new families</li>
                <li>Questions? Use the contact form below</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="easter-section easter-gallery-section" id="gallery">
        <div className="container">
          <div className="modern-event-container modern-event-reverse">
            <div className="photo-grid-5 scroll-animate sa-left" aria-label="Grace Woodlands photo gallery">
              <img src="/images/promo/0F8A8176.jpg" alt="People connecting at Grace Woodlands" className="photo-grid-main" />
              <img src="/images/promo/0F8A8241.jpg" alt="Grace Woodlands Easter celebration" className="photo-grid-item" />
              <img src="/images/promo/0F8A8636.jpg" alt="Worship experience at Grace Woodlands" className="photo-grid-item" />
              <img src="/images/promo/0F8A8876.jpg" alt="Grace Woodlands church family" className="photo-grid-item" />
              <img src="/images/promo/0F8A8935-crop.jpg" alt="Easter at Grace Woodlands" className="photo-grid-item" />
            </div>
            <div className="modern-event-content easter-gallery-copy scroll-animate sa-delay-1">
              <span className="easter-section-kicker">Experience Easter at Grace</span>
              <h2>Grace Is For You</h2>
              <p>
                Grace Woodlands is a place where you can experience authentic worship, biblical teaching, and genuine community.
              </p>
              <ul className="easter-check-list">
                <li>Friendly environment for guests and families</li>
                <li>Gathering spaces built for connection before and after service</li>
                <li>A place to grow in your faith</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="easter-newsletter-map-section" id="map">
        <div className="container newsletter-map-container">
          <div className="easter-newsletter-card scroll-animate sa-left">
            <span className="easter-section-kicker">Stay connected</span>
            <h2>Get Easter updates and stay in the loop with Grace.</h2>
            <p>
              If you would like reminders, church news, or an easy way to stay connected after Easter, sign up here.
            </p>

            <form className="easter-newsletter-form" onSubmit={handleNewsletterSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                aria-label="Name"
                value={newsletterData.name}
                onChange={(e) => setNewsletterData((prev) => ({ ...prev, name: e.target.value }))}
                disabled={newsletterSubmitting}
                required
                className="easter-newsletter-input"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                aria-label="Email"
                value={newsletterData.email}
                onChange={(e) => setNewsletterData((prev) => ({ ...prev, email: e.target.value }))}
                disabled={newsletterSubmitting}
                required
                className="easter-newsletter-input"
              />
              <button type="submit" className="easter-newsletter-btn" disabled={newsletterSubmitting}>
                {newsletterSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>

            {newsletterMessage && (
              <p className={`easter-form-message ${newsletterMessageType}`}>
                {newsletterMessage}
              </p>
            )}
          </div>

          <div className="easter-map-card scroll-animate sa-right">
            <div className="easter-map-copy">
              <span className="easter-section-kicker">Find Grace</span>
              <h2>{"You've seen us from the freeway"}</h2>
              <p>24400 Interstate 45 N, Spring, TX 77386</p>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=24400+Interstate+45+N+Spring+TX+77386"
                target="_blank"
                rel="noopener noreferrer"
                className="easter-map-link"
              >
                Open Directions →
              </a>
            </div>

            <img
              src="/images/raw/Grace-Building-980x553.jpg"
              alt="Grace Woodlands Church Building"
              className="easter-building-img"
            />

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3452.1234567890123!2d-95.4401582!3d30.1173913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86473693bab7ce87%3A0xe41d74c9ac91fe49!2sGrace%20Woodlands!5e0!3m2!1sen!2sus!4v1702300000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Grace Woodlands Location"
              className="easter-map-frame"
            ></iframe>
          </div>
        </div>
      </section>

      <section className="contact-section easter-contact-section" id="contact">
        <div className="container">
          <div className="easter-contact-intro scroll-animate">
            <span className="easter-section-kicker">Questions before you come?</span>
            <h2>We would love to help you plan your Easter visit.</h2>
            <p>
              If there is anything we can answer ahead of Easter weekend, send us a note and our team will follow up.
            </p>
          </div>

          <div className="contact-content">
            <div className="contact-info scroll-animate sa-left sa-delay-1">
              <h3>CONTACT US</h3>
              <div className="contact-details">
                <div className="contact-item">
                  <h4>Email</h4>
                  <a href="mailto:info@gracewoodlands.com">info@gracewoodlands.com</a>
                </div>
                <div className="contact-item">
                  <h4>Phone</h4>
                  <a href="tel:+18323812306">(832) 381-2306</a>
                </div>
                <div className="contact-item">
                  <h4>Location</h4>
                  <address>24400 Interstate 45 N<br />Spring, TX 77386</address>
                </div>
                <div className="contact-item">
                  <h4>Follow Us</h4>
                  <div className="social-buttons">
                    <a href="https://facebook.com/gracewoodlands" target="_blank" rel="noopener noreferrer" className="social-pill-btn">
                      FOLLOW ON FACEBOOK
                    </a>
                    <a href="https://instagram.com/gracewoodlands" target="_blank" rel="noopener noreferrer" className="social-pill-btn">
                      FOLLOW ON INSTAGRAM
                    </a>
                    <a href="https://youtube.com/gracewoodlands" target="_blank" rel="noopener noreferrer" className="social-pill-btn">
                      SUBSCRIBE ON YOUTUBE
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-container scroll-animate sa-right sa-delay-2">
              <h3>GET IN TOUCH</h3>
              <form className="contact-form" onSubmit={handleContactSubmit}>
                <div className="form-row">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    aria-label="First Name"
                    value={contactData.firstName}
                    onChange={(e) => setContactData((prev) => ({ ...prev, firstName: e.target.value }))}
                    disabled={contactSubmitting}
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    aria-label="Last Name"
                    value={contactData.lastName}
                    onChange={(e) => setContactData((prev) => ({ ...prev, lastName: e.target.value }))}
                    disabled={contactSubmitting}
                    required
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  aria-label="Email"
                  value={contactData.email}
                  onChange={(e) => setContactData((prev) => ({ ...prev, email: e.target.value }))}
                  disabled={contactSubmitting}
                  required
                />
                <textarea
                  name="message"
                  placeholder="Message"
                  aria-label="Message"
                  rows={4}
                  value={contactData.message}
                  onChange={(e) => setContactData((prev) => ({ ...prev, message: e.target.value }))}
                  disabled={contactSubmitting}
                  required
                ></textarea>
                <button type="submit" className="contact-submit-btn" disabled={contactSubmitting}>
                  {contactSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                </button>
              </form>

              {contactMessage && (
                <p className={`contact-message ${contactMessageType}`}>
                  {contactMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="easter-footer">
        <div className="container easter-footer-grid">
          <div>
            <img
              src="/images/raw/Grace Church LOGO wide.png"
              alt="Grace Church"
              className="easter-footer-logo"
            />
          </div>

          <div>
            <h4>About</h4>
            <ul className="easter-footer-list">
              {aboutLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Ministries</h4>
            <ul className="easter-footer-list">
              {ministriesLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Join Us</h4>
            <ul className="easter-footer-list">
              {joinUsLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Media</h4>
            <ul className="easter-footer-list">
              {mediaLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Visit Grace</h4>
            <ul className="easter-footer-list">
              <li><a href="mailto:info@gracewoodlands.com">info@gracewoodlands.com</a></li>
              <li><a href="tel:+18323812306">(832) 381-2306</a></li>
              <li>24400 Interstate 45 N</li>
              <li>Spring, TX 77386</li>
            </ul>
          </div>
        </div>

        <div className="container easter-footer-bottom">
          <p>© {new Date().getFullYear()} Grace Church The Woodlands. All rights reserved.</p>
          <a href="https://gracewoodlands.com" target="_blank" rel="noopener noreferrer">gracewoodlands.com</a>
        </div>
      </footer>
    </div>
  )
}