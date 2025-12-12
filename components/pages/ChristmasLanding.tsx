'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function ChristmasLanding() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Timed signup modal state
  const [showTimedSignupModal, setShowTimedSignupModal] = useState(false)
  const [timedSignupData, setTimedSignupData] = useState({ name: '', email: '' })
  const [timedSignupSubmitting, setTimedSignupSubmitting] = useState(false)
  const [timedSignupMessage, setTimedSignupMessage] = useState('')
  const [timedSignupMessageType, setTimedSignupMessageType] = useState<'success' | 'error' | ''>('')

  // Newsletter form state
  const [newsletterData, setNewsletterData] = useState({ name: '', email: '' })
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false)
  const [newsletterMessage, setNewsletterMessage] = useState('')
  const [newsletterMessageType, setNewsletterMessageType] = useState<'success' | 'error' | ''>('')

  // Newsletter form handler
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
    } catch (error) {
      setNewsletterMessage('Failed to sign up. Please try again.')
      setNewsletterMessageType('error')
    } finally {
      setNewsletterSubmitting(false)
    }
  }

  // Timed signup modal handler
  const handleTimedSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTimedSignupSubmitting(true)
    setTimedSignupMessage('')
    setTimedSignupMessageType('')

    try {
      const response = await fetch('/api/signup-modal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(timedSignupData),
      })

      const data = await response.json()

      if (response.ok) {
        setTimedSignupMessage(data.message || 'Thanks for signing up for Christmas updates!')
        setTimedSignupMessageType('success')
        setTimedSignupData({ name: '', email: '' })
        // Close modal after 2 seconds on success
        setTimeout(() => {
          setShowTimedSignupModal(false)
          setTimedSignupMessage('')
          setTimedSignupMessageType('')
        }, 2000)
      } else {
        setTimedSignupMessage(data.error || 'Something went wrong. Please try again.')
        setTimedSignupMessageType('error')
      }
    } catch (error) {
      setTimedSignupMessage('Failed to sign up. Please try again.')
      setTimedSignupMessageType('error')
    } finally {
      setTimedSignupSubmitting(false)
    }
  }

  const closeTimedSignupModal = () => {
    setShowTimedSignupModal(false)
    setTimedSignupMessage('')
    setTimedSignupMessageType('')
    setTimedSignupData({ name: '', email: '' })
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const shouldBeSticky = scrollTop > 50
      setIsScrolled(shouldBeSticky)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Timed modal effect - show after 3 seconds on first visit
  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem('hasSeenChristmasSignupModal')

    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setShowTimedSignupModal(true)
        sessionStorage.setItem('hasSeenChristmasSignupModal', 'true')
      }, 3000) // Show after 3 seconds

      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <div className="christmas-events-page">
      {/* ANNOUNCEMENT BAR */}
      <div className="christmas-announcement-bar">
        <p>JOIN US FOR CHRISTMAS AT GRACE • SPECIAL SERVICES & EVENTS THROUGHOUT DECEMBER</p>
      </div>

      {/* HERO SECTION */}
      <section className="christmas-hero-section">
        <div className="christmas-hero-content">
          <img
            src="https://gracewoodlands.com/wp-content/uploads/2024/12/LOGO_Christmas24.png"
            alt="Christmas at Grace"
            className="christmas-hero-logo"
          />
          <p className="christmas-hero-subtitle">Join us for special services and events throughout December</p>
          <p className="christmas-hero-info">More info at <a href="https://gracewoodlands.com" target="_blank" rel="noopener noreferrer">Gracewoodlands.com</a></p>
        </div>
      </section>

      {/* QUICK LINKS */}
      <nav className="christmas-quick-links">
        <div className="quick-links-container">
          <a href="#car-show" className="quick-link-btn">
            <span className="quick-link-date">DEC 13</span>
            <span className="quick-link-text">CAR SHOW</span>
          </a>
          <a href="#family-christmas" className="quick-link-btn">
            <span className="quick-link-date">DEC 17</span>
            <span className="quick-link-text">FAMILY CHRISTMAS</span>
          </a>
          <a href="#polar-express" className="quick-link-btn">
            <span className="quick-link-date">DEC 19</span>
            <span className="quick-link-text">POLAR EXPRESS</span>
          </a>
          <a href="#christmas-eve" className="quick-link-btn">
            <span className="quick-link-date">DEC 24</span>
            <span className="quick-link-text">CHRISTMAS EVE</span>
          </a>
        </div>
      </nav>

      {/* VIDEO CARDS SECTION */}
      <section className="christmas-video-cards-section" id="events">
        <div className="christmas-video-cards-container">
          <h2 className="christmas-section-title">Upcoming Events</h2>

          {/* VIDEO CARDS GRID - 4 cards with videos and CTAs */}
          <div className="video-cards-grid">

            {/* CAR SHOW VIDEO CARD */}
            <div className="video-card">
              <video
                className="video-card-video"
                poster="/images/raw/Christmas Car Show Photos-Web/0F8A0036.jpg"
                muted
                loop
                playsInline
              >
                <source src="https://www.dropbox.com/scl/fi/q66pgt84mi9wim3ifsxz3/CHRISTMAS-CAR-SHOW-2025-v-2_meaganvo.mp4?rlkey=n1d21ot2o7qnsboog60xa7iav&st=y0v4jtxi&dl=1" type="video/mp4" />
              </video>
              <div className="video-card-date">
                <span className="video-card-month">DEC</span>
                <span className="video-card-day">13</span>
              </div>
              <div className="video-card-overlay">
                <h3>Christmas Family Car Show</h3>
                <p>9am - 12pm</p>
                <a href="#car-show" className="video-card-btn">Learn More</a>
              </div>
            </div>

            {/* FAMILY CHRISTMAS VIDEO CARD */}
            <div className="video-card">
              <video
                className="video-card-video"
                poster="/images/raw/family christmas web/0F8A4374-Enhanced-NR.jpg"
                muted
                loop
                playsInline
              >
                <source src="https://www.dropbox.com/scl/fi/9ckutjtx6o0yww1hec3ar/Family-Christmas-2025_GW.mp4?rlkey=48gih5u2gv9f63xg5ecx5yz1v&st=14zpubj6&dl=1" type="video/mp4" />
              </video>
              <div className="video-card-date">
                <span className="video-card-month">DEC</span>
                <span className="video-card-day">17</span>
              </div>
              <div className="video-card-overlay">
                <h3>Family Christmas at Grace</h3>
                <p>6:45pm</p>
                <a href="#family-christmas" className="video-card-btn">Learn More</a>
              </div>
            </div>

            {/* POLAR EXPRESS VIDEO CARD */}
            <div className="video-card">
              <video
                className="video-card-video"
                poster="/images/raw/additional-photos/0F8A0953.jpg"
                muted
                loop
                playsInline
              >
                <source src="https://www.dropbox.com/scl/fi/to30w8u47yr640jimc8by/PROMO-Polar-Express-2025.mp4?rlkey=vxu7h38pmlcmbr1v937o0my27&st=70wz5pdn&dl=1" type="video/mp4" />
              </video>
              <div className="video-card-date">
                <span className="video-card-month">DEC</span>
                <span className="video-card-day">19</span>
              </div>
              <div className="video-card-overlay">
                <h3>Polar Express Movie Experience</h3>
                <p>6:30pm - 10pm</p>
                <a href="#polar-express" className="video-card-btn">Learn More</a>
              </div>
            </div>

            {/* CHRISTMAS EVE VIDEO CARD */}
            <div className="video-card">
              <img
                src="/images/raw/Grace Christmas Photos/DSC03056-Enhanced-NR.jpg"
                alt="Christmas Eve Services"
                className="video-card-video"
              />
              <div className="video-card-date">
                <span className="video-card-month">DEC</span>
                <span className="video-card-day">24</span>
              </div>
              <div className="video-card-overlay">
                <h3>Christmas Eve Services</h3>
                <p>2pm & 4pm</p>
                <a href="#christmas-eve" className="video-card-btn">Learn More</a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CAR SHOW SECTION */}
      <section className="car-show-modern" id="car-show">
        <div className="car-show-container">
          {/* Event Header - Tag & Name (appears first on mobile) */}
          <div className="event-header-mobile">
            <span className="event-tag-teal">🚗 Community Event</span>
            <h2>Christmas Family<br />Car Show At Grace</h2>
          </div>

          {/* Left side - Images */}
          <div className="car-show-image">
            <div className="photo-grid-4">
              <img src="/images/raw/Christmas Car Show Photos-Web/0F8A0036.jpg" alt="Christmas Car Show" className="photo-grid-main" />
              <img src="/images/raw/Christmas Car Show Photos-Web/0F8A0116.jpg" alt="Christmas Car Show" className="photo-grid-item" />
              <img src="/images/raw/Christmas Car Show Photos-Web/0F8A9951.jpg" alt="Christmas Car Show" className="photo-grid-item" />
              <img src="/images/raw/additional-photos/DJI_0243.jpg" alt="Christmas Car Show Full Lot" className="photo-grid-item" />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="car-show-content">
            <span className="event-tag-teal event-tag-desktop">🚗 Community Event</span>
            <h2 className="event-title-desktop">Christmas Family<br />Car Show At Grace</h2>

            <div className="event-meta-modern">
              <div className="meta-item">
                <span className="meta-icon">📅</span>
                <span className="meta-text">Saturday, December 13</span>
              </div>
              <div className="meta-item">
                <span className="meta-icon">⏰</span>
                <span className="meta-text">9am - 12pm</span>
              </div>
              <div className="meta-item">
                <span className="meta-icon">📍</span>
                <span className="meta-text">Grace Church</span>
              </div>
            </div>

            <p className="event-description-modern">
              Our Family Christmas Car Show at Grace is a fun, free, and family-friendly event where everyone is welcome—whether you love cars or have one to show!
            </p>

            <div className="features-grid">
              <div className="feature-item">🎄 Playscape, Carousel & Train</div>
              <div className="feature-item">🎅 Photos with Santa</div>
              <div className="feature-item">🏆 Best in Show: $200</div>
              <div className="feature-item">🎨 Best Decorated: $200</div>
              <div className="feature-item">🍔 Food vendors on site</div>
              <div className="feature-item">🎁 Cash prize drawings</div>
            </div>

            <div className="cta-area">
              <p className="free-admission">✨ Free Admission · All Welcome</p>
              <a href="https://gracewoodlands.com" target="_blank" rel="noopener noreferrer" className="modern-cta-btn">
                Register Your Car
                <span className="btn-arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAMILY CHRISTMAS SECTION */}
      <section className="modern-event-section modern-event-dark" id="family-christmas">
        <div className="modern-event-container modern-event-reverse">
          {/* Event Header - Tag & Name (appears first on mobile) */}
          <div className="event-header-mobile">
            <span className="event-tag">🎄 Family Service</span>
            <h2>Family Christmas<br />at Grace</h2>
          </div>

          <div className="photo-grid-4">
            <img src="/images/raw/family christmas web/0F8A4374-Enhanced-NR.jpg" alt="Family Christmas" className="photo-grid-main" />
            <img src="/images/raw/family christmas web/0F8A4428-Enhanced-NR.jpg" alt="Family Christmas" className="photo-grid-item" />
            <img src="/images/raw/family christmas web/0F8A4887-Enhanced-NR.jpg" alt="Family Christmas" className="photo-grid-item" />
            <img src="/images/raw/family christmas web/0F8A5025-Enhanced-NR.jpg" alt="Family Christmas" className="photo-grid-item" />
          </div>

          <div className="modern-event-content">
            <span className="event-tag event-tag-desktop">🎄 Family Service</span>
            <h2 className="event-title-desktop">Family Christmas<br />at Grace</h2>

            <div className="event-meta-modern">
              <div className="meta-item">
                <span className="meta-icon">📅</span>
                <span className="meta-text">Wednesday, December 17</span>
              </div>
              <div className="meta-item">
                <span className="meta-icon">⏰</span>
                <span className="meta-text">6:45pm</span>
              </div>
              <div className="meta-item">
                <span className="meta-icon">📍</span>
                <span className="meta-text">Grace Church</span>
              </div>
            </div>

            <p className="event-description-modern">
              Experience a Christmas like no other! Plus, after service, we'll have delicious cookies and hot cocoa waiting for you.
            </p>

            <div className="features-grid">
              <div className="feature-item">🎵 Christmas Carol sing-along</div>
              <div className="feature-item">📖 Memorable stories</div>
              <div className="feature-item">⛄ Texas-sized snowball fight</div>
              <div className="feature-item">🎁 Christmas surprises</div>
            </div>

            <p className="event-note-modern">
              This is a family service—kids will be in the service and love every minute! Childcare available for birth-K.
            </p>
          </div>
        </div>
      </section>

      {/* POLAR EXPRESS SECTION */}
      <section className="polar-express-modern" id="polar-express">
        <div className="polar-express-modern-container">
          {/* Event Header - Tag & Name (appears first on mobile) */}
          <div className="event-header-mobile">
            <span className="event-tag">🎄 Special Event</span>
            <h2>The Polar Express<br />Movie Experience</h2>
          </div>

          {/* Left side - Images */}
          <div className="polar-express-modern-image">
            <div className="photo-grid-5">
              <img src="/images/raw/additional-photos/0f8a0587.jpg" alt="Polar Express Experience" className="photo-grid-main" />
              <img src="/images/raw/additional-photos/0f8a0817.jpg" alt="Polar Express Experience" className="photo-grid-item" />
              <img src="/images/raw/additional-photos/0F8A0953.jpg" alt="Polar Express Experience" className="photo-grid-item" />
              <img src="/images/raw/additional-photos/0f8a1028.jpg" alt="Polar Express Experience" className="photo-grid-item" />
              <img src="/images/raw/additional-photos/0f8a0597.jpg" alt="Polar Express Experience" className="photo-grid-item" />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="polar-express-modern-content">
            <span className="event-tag event-tag-desktop">🎄 Special Event</span>
            <h2 className="event-title-desktop">The Polar Express<br />Movie Experience</h2>

            <div className="event-meta-modern">
              <div className="meta-item">
                <span className="meta-icon">📅</span>
                <span className="meta-text">Friday, December 19</span>
              </div>
              <div className="meta-item">
                <span className="meta-icon">⏰</span>
                <span className="meta-text">6:30pm - 10pm</span>
              </div>
              <div className="meta-item">
                <span className="meta-icon">📍</span>
                <span className="meta-text">Grace Church</span>
              </div>
            </div>

            <p className="event-description-modern">
              Come watch & experience The Polar Express! Attractions open at 6:30pm, the movie begins at 7:30pm, and attractions continue after the movie until 10pm.
            </p>

            <div className="features-grid">
              <div className="feature-item">🎬 Indoor & outdoor viewing</div>
              <div className="feature-item">☕ Hot cocoa & cookies</div>
              <div className="feature-item">⛄ Indoor snowball fight</div>
              <div className="feature-item">🎅 Pictures with Santa</div>
              <div className="feature-item">🚂 Train & carousel rides</div>
              <div className="feature-item">🎨 Elf workshop crafts</div>
            </div>

            <div className="cta-area">
              <p className="free-admission">✨ Free Admission · Limited Seating</p>
              <a href="https://gracewoodlands.churchcenter.com/registrations/events/2675029" target="_blank" rel="noopener noreferrer" className="modern-cta-btn">
                Register Your Family
                <span className="btn-arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CHRISTMAS EVE SECTION */}
      <section className="christmas-eve-modern" id="christmas-eve">
        <div className="christmas-eve-container">
          {/* Event Header - Tag & Name (appears first on mobile) */}
          <div className="event-header-mobile">
            <span className="event-tag-gold">✨ Christmas Eve</span>
            <h2>Christmas Eve<br />Services</h2>
          </div>

          <div className="christmas-eve-image">
            <div className="photo-grid-4">
              <img src="/images/raw/Grace Christmas Photos/DSC02639-Enhanced-NR.jpg" alt="Christmas Eve" className="photo-grid-main" />
              <img src="/images/raw/Grace Christmas Photos/DSC03056-Enhanced-NR.jpg" alt="Christmas Eve" className="photo-grid-item" />
              <img src="/images/raw/Grace Christmas Photos/DSC02693-Enhanced-NR.jpg" alt="Christmas Eve" className="photo-grid-item" />
              <img src="/images/raw/Grace Christmas Photos/DSC02798-Enhanced-NR.jpg" alt="Christmas Eve" className="photo-grid-item" />
            </div>
          </div>

          <div className="christmas-eve-content">
            <span className="event-tag-gold event-tag-desktop">✨ Christmas Eve</span>
            <h2 className="event-title-desktop">Christmas Eve<br />Services</h2>

            <div className="event-meta-modern">
              <div className="meta-item">
                <span className="meta-icon">📅</span>
                <span className="meta-text">December 24, 2025</span>
              </div>
              <div className="meta-item">
                <span className="meta-icon">⏰</span>
                <span className="meta-text">2pm & 4pm</span>
              </div>
              <div className="meta-item">
                <span className="meta-icon">📍</span>
                <span className="meta-text">Grace Church</span>
              </div>
            </div>

            <p className="event-description-modern">
              Join us this Christmas Eve as we celebrate the birth of our Savior—Christ the Lord! Bring your family and gather with us for a beautiful time of worship, prayer, a message of hope, and candlelight service.
            </p>

            <div className="christmas-eve-highlight">
              <span className="highlight-icon">✨</span>
              <div className="highlight-text">
                <strong>Family Services</strong>
                <p>Children's ministry provided for birth-K</p>
              </div>
            </div>

            <a href="https://www.google.com/maps/dir/?api=1&destination=24400+Interstate+45+N+The+Woodlands+TX+77386" target="_blank" rel="noopener noreferrer" className="modern-cta-btn-gold">
              Get Directions
              <span className="btn-arrow">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* NEWSLETTER & MAP SECTION */}
      <section className="newsletter-map-section">
        <div className="newsletter-map-container">
          {/* Left - Newsletter Signup */}
          <div className="newsletter-card-modern">
            <h2>GET REGULAR UPDATES</h2>
            <p>Receive the latest church news & updates via email</p>
            <form className="newsletter-form-modern" onSubmit={handleNewsletterSubmit}>
              <input
                type="text"
                placeholder="Name"
                required
                className="newsletter-input"
                value={newsletterData.name}
                onChange={(e) => setNewsletterData(prev => ({ ...prev, name: e.target.value }))}
                disabled={newsletterSubmitting}
              />
              <input
                type="email"
                placeholder="Email"
                required
                className="newsletter-input"
                value={newsletterData.email}
                onChange={(e) => setNewsletterData(prev => ({ ...prev, email: e.target.value }))}
                disabled={newsletterSubmitting}
              />
              <button type="submit" className="newsletter-submit-btn" disabled={newsletterSubmitting}>
                {newsletterSubmitting ? 'Subscribing...' : 'Subscribe!'}
              </button>
            </form>
            {newsletterMessage && (
              <p className={`newsletter-message ${newsletterMessageType}`} style={{ marginTop: '12px', textAlign: 'center', color: newsletterMessageType === 'success' ? '#4CAF50' : '#ff4444' }}>
                {newsletterMessage}
              </p>
            )}
          </div>

          {/* Right - Google Map */}
          <div className="map-card-modern">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3446.3876901850347!2d-95.43876892354867!3d30.19024501190918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8647355d0a9b0e6b%3A0x9d5e7a0e5b8b5b0f!2s24400%20I-45%2C%20Spring%2C%20TX%2077386!5e0!3m2!1sen!2sus!4v1702300000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '12px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Grace Church Location"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="christmas-footer">
        <div className="christmas-footer-container">
          <div className="footer-grid">
            <div className="footer-col">
              <img
                src="/images/general/Grace Church LOGO wide.webp"
                alt="Grace Church"
                className="footer-logo"
              />
              <p>Join us this Christmas season for special services and events celebrating the birth of our Savior, Jesus Christ.</p>
            </div>

            <div className="footer-col">
              <h4>Christmas Events</h4>
              <ul>
                <li><a href="#christmas-eve">Christmas Eve Services</a></li>
                <li><a href="#car-show">Christmas Car Show</a></li>
                <li><a href="#family-christmas">Family Christmas</a></li>
                <li><a href="#polar-express">Polar Express</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>About Grace</h4>
              <ul>
                <li><a href="https://gracewoodlands.com/about/" target="_blank" rel="noopener noreferrer">Who We Are</a></li>
                <li><a href="https://gracewoodlands.com/leadership/" target="_blank" rel="noopener noreferrer">Leadership</a></li>
                <li><a href="https://gracewoodlands.com/ministries/" target="_blank" rel="noopener noreferrer">Ministries</a></li>
                <li><a href="https://gracewoodlands.com/" target="_blank" rel="noopener noreferrer">Church Website</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Contact</h4>
              <p><strong>Office Hours:</strong> Mon-Fri 9am-5pm</p>
              <p>
                24400 Interstate 45 N<br />
                The Woodlands, TX 77386<br />
                <a href="tel:+18323812306">(832) 381-2306</a><br />
                <a href="mailto:info@gracewoodlands.com">info@gracewoodlands.com</a>
              </p>
              <div className="footer-social">
                <a href="https://www.facebook.com/gracewoodlands" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://www.instagram.com/gracewoodlands/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="https://www.youtube.com/gracewoodlands" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Grace Church. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* TIMED SIGNUP MODAL */}
      {showTimedSignupModal && (
        <div className="timed-signup-modal-overlay" onClick={closeTimedSignupModal}>
          <div className="timed-signup-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="timed-signup-modal-close" onClick={closeTimedSignupModal}>×</button>

            <h2>Stay Updated on Christmas Events!</h2>
            <p className="modal-subtitle">Get the latest updates about our Christmas services and events.</p>

            <form className="timed-signup-form" onSubmit={handleTimedSignupSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                aria-label="Full Name"
                value={timedSignupData.name}
                onChange={(e) => setTimedSignupData(prev => ({ ...prev, name: e.target.value }))}
                disabled={timedSignupSubmitting}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                aria-label="Email"
                value={timedSignupData.email}
                onChange={(e) => setTimedSignupData(prev => ({ ...prev, email: e.target.value }))}
                disabled={timedSignupSubmitting}
                required
              />
              <button type="submit" className="timed-signup-btn" disabled={timedSignupSubmitting}>
                {timedSignupSubmitting ? 'SIGNING UP...' : 'SIGN UP'}
              </button>
            </form>

            {timedSignupMessage && (
              <p className={`timed-signup-message ${timedSignupMessageType}`}>
                {timedSignupMessage}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
