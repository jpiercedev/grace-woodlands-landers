'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

type TeamMember = {
  name: string
  title: string
  bio: string
  email: string
  moreLink?: string
}

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showNavInHeader, setShowNavInHeader] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedTeamMember, setSelectedTeamMember] = useState<TeamMember | null>(null)

  // Signup form state
  const [signupData, setSignupData] = useState({ name: '', email: '' })
  const [signupSubmitting, setSignupSubmitting] = useState(false)
  const [signupMessage, setSignupMessage] = useState('')
  const [signupMessageType, setSignupMessageType] = useState<'success' | 'error' | ''>('')

  // Contact form state
  const [contactData, setContactData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  })
  const [contactSubmitting, setContactSubmitting] = useState(false)
  const [contactMessage, setContactMessage] = useState('')
  const [contactMessageType, setContactMessageType] = useState<'success' | 'error' | ''>('')

  // Plan Your Visit modal state
  const [showPlanVisitModal, setShowPlanVisitModal] = useState(false)
  const [planVisitData, setPlanVisitData] = useState({ name: '', phone: '', email: '' })
  const [planVisitSubmitting, setPlanVisitSubmitting] = useState(false)
  const [planVisitConfirmed, setPlanVisitConfirmed] = useState(false)

  // Timed signup modal state
  const [showTimedSignupModal, setShowTimedSignupModal] = useState(false)
  const [timedSignupData, setTimedSignupData] = useState({ name: '', email: '' })
  const [timedSignupSubmitting, setTimedSignupSubmitting] = useState(false)
  const [timedSignupMessage, setTimedSignupMessage] = useState('')
  const [timedSignupMessageType, setTimedSignupMessageType] = useState<'success' | 'error' | ''>('')

  // Video state
  const [isIntroVideoPlaying, setIsIntroVideoPlaying] = useState(false)

  // Form handlers
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSignupSubmitting(true)
    setSignupMessage('')
    setSignupMessageType('')

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupData),
      })

      const data = await response.json()

      if (response.ok) {
        setSignupMessage(data.message || 'Thanks for signing up for the latest updates!')
        setSignupMessageType('success')
        setSignupData({ name: '', email: '' })
      } else {
        setSignupMessage(data.error || 'Something went wrong. Please try again.')
        setSignupMessageType('error')
      }
    } catch (error) {
      setSignupMessage('Failed to sign up. Please try again.')
      setSignupMessageType('error')
    } finally {
      setSignupSubmitting(false)
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
        setContactMessage(data.message || 'Thank you for your message! We\'ll get back to you soon.')
        setContactMessageType('success')
        setContactData({ firstName: '', lastName: '', email: '', message: '' })
      } else {
        setContactMessage(data.error || 'Something went wrong. Please try again.')
        setContactMessageType('error')
      }
    } catch (error) {
      setContactMessage('Failed to send message. Please try again.')
      setContactMessageType('error')
    } finally {
      setContactSubmitting(false)
    }
  }

  const handlePlanVisitSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setPlanVisitSubmitting(true)

    try {
      const response = await fetch('/api/plan-visit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(planVisitData),
      })

      const data = await response.json()

      if (response.ok) {
        setPlanVisitConfirmed(true)
      } else {
        alert(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      alert('Failed to submit. Please try again.')
    } finally {
      setPlanVisitSubmitting(false)
    }
  }

  const closePlanVisitModal = () => {
    setShowPlanVisitModal(false)
    setPlanVisitConfirmed(false)
    setPlanVisitData({ name: '', phone: '', email: '' })
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
        setTimedSignupMessage(data.message || 'Thanks for signing up for the latest updates!')
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

  // Video handlers
  const handlePlayButtonClick = () => {
    setIsIntroVideoPlaying(true)
  }

  const handleVideoPlay = () => {
    setIsIntroVideoPlaying(true)
  }

  const handleVideoPause = () => {
    setIsIntroVideoPlaying(false)
  }

  // Team member modal handlers
  const openModal = (memberKey: string) => {
    const member = teamMembers[memberKey]
    if (member) {
      setSelectedTeamMember(member)
    }
  }

  const closeModal = () => {
    setSelectedTeamMember(null)
  }

  const teamMembers: Record<string, TeamMember> = {
    'steve-becky': {
      name: 'Steve & Becky Riggle',
      title: 'Founding Pastors',
      bio: 'Steve and Becky Riggle are the founding pastors of Grace Church. With decades of ministry experience, they have dedicated their lives to building the kingdom of God and developing leaders who will impact their generation for Christ.',
      email: '',
      moreLink: 'https://gracewoodlands.com/leadership/'
    },
    
    'josh': {
      name: 'Josh Pierce',
      title: 'Executive Pastor',
      bio: 'Josh serves as Executive Pastor, leading ministries and strategic initiatives to help grow and shepherd the Grace Church community.',
      email: ''
    },
    'sam-thomas': {
      name: 'Dr. Sam Thomas',
      title: 'Teaching Pastor',
      bio: 'Dr. Sam Thomas leads teaching and discipleship efforts, equipping the church through exposition of Scripture and pastoral care.',
      email: ''
    },
    'jason-nelson': {
      name: 'Dr. Jason J. Nelson',
      title: 'Associate Pastor',
      bio: 'Dr. Jason J. Nelson supports pastoral leadership and contributes to teaching and ministry development at Grace Church.',
      email: ''
    },
    'brooke': {
      name: 'Brooke Pierce',
      title: 'Outreach Pastor / Women\'s Ministry',
      bio: 'Brooke leads outreach and womens ministry initiatives, caring for families and mobilizing volunteers for community impact.',
      email: ''
    },
    'rachele': {
      name: 'Rachele Karmout',
      title: 'Family Life Pastor / Cathedral Life Centre',
      bio: 'Rachele focuses on family ministries and compassionate care through the Cathedral Life Centre programs.',
      email: ''
    },
    'rachel': {
      name: 'Rachel Santiago',
      title: 'Groups & Events Pastor',
      bio: 'Rachel organizes groups and events to help people connect, grow, and serve together in community.',
      email: ''
    },
    'stu-debbe': {
      name: 'Stu & Debbe Johnson',
      title: 'Associate Pastors',
      bio: 'Stu & Debbe serve as associate pastors with a focus on administration and global ministry partnerships.',
      email: ''
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const shouldBeSticky = scrollTop > 50
      setIsScrolled(shouldBeSticky)
      document.body.classList.toggle('sticky-header', shouldBeSticky)
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view')
        }
      })
    }, observerOptions)

    // Observe all scroll-animate elements
    const scrollElements = document.querySelectorAll('.scroll-animate')
    scrollElements.forEach(el => observer.observe(el))

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  // Timed modal effect - show after 3 seconds on first visit
  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem('hasSeenSignupModal')

    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setShowTimedSignupModal(true)
        sessionStorage.setItem('hasSeenSignupModal', 'true')
      }, 3000) // Show after 3 seconds

      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <div className="page">
      {/* ANNOUNCEMENT BANNER */}
      <div className="announcement-banner">
        <div className="container">
          <p>JOIN US SUNDAYS AT 9AM & 11AM • BRING YOUR FRIENDS!</p>
        </div>
      </div>

      {/* BRAND GOLD HEADER (mirrored from grace-at-the-circle Navigation) */}
      <header className={`gold-header ${isScrolled ? 'sticky' : ''} ${showNavInHeader ? 'with-nav' : ''}`}>
        <div className="container">
          <Link href="/">
            <img
              src="/images/general/Grace Church LOGO wide.webp"
              alt="Grace Church - The Woodlands, Texas"
              className="logo"
            />
          </Link>

          {showNavInHeader && (
            <>
              <nav className="header-nav desktop-nav">
                <a href="#about" className="nav-link">ABOUT</a>
                {/* <a href="#team" className="nav-link">OUR TEAM</a> */}
                <a href="https://gracewoodlands.com/ministries/" target="_blank" rel="noopener noreferrer" className="nav-link">MINISTRIES</a>
                <a href="https://gracewoodlands.com/" target="_blank" rel="noopener noreferrer" className="nav-link">CHURCH WEBSITE</a>
                <a href="#contact" className="nav-link">CONTACT</a>
                <a href="https://gracewoodlands.com/give" target="_blank" rel="noopener noreferrer" className="nav-link">GIVE</a>
              </nav>

              <button
                className="mobile-menu-toggle"
                onClick={() => setIsMobileMenuOpen(prev => !prev)}
                aria-label="Toggle mobile menu"
              >
                <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </button>
            </>
          )}

          {isMobileMenuOpen && (
            <div className="mobile-menu">
              <nav className="mobile-nav">
                <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>ABOUT</a>
                {/* <a href="#team" onClick={() => setIsMobileMenuOpen(false)}>OUR TEAM</a> */}
                <a href="https://gracewoodlands.com/ministries/" target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)}>MINISTRIES</a>
                <a href="https://gracewoodlands.com/" target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)}>CHURCH WEBSITE</a>
                <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>CONTACT</a>
                <a href="https://gracewoodlands.com/give" target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)}>GIVE</a>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* HERO */}
      <header className="hero video-hero">
        <div className="hero-video">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          >
            <source src="https://gracewoodlands.com/wp-content/uploads/2025/02/WEB-Intro-2024_SMALLFORWEB.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-copy">
            <p className="eyebrow">SUNDAYS AT 9AM & 11AM</p>
            <h1>JOIN US AT GRACE</h1>
            <p className="subhead" style={{ fontWeight: 800, letterSpacing: '0.6px' }}>A COURAGEOUS CHRISTIAN CHURCH</p>
            <p className="subhead">If you are looking for a church that prioritizes the presence of God, believes in the power of prayer, unashamedly preaches God’s Word, and stands up for Godly moral values… GRACE IS FOR YOU!</p>
          </div>
        </div>
      </header>

      {/* QUICK NAV */}
      <nav className="quick-nav">
        <div className="container">
          <Link href="#about" className="pill gold">ABOUT GRACE</Link>
          {/* <Link href="#team" className="pill gold">OUR TEAM</Link> */}
          <a href="https://gracewoodlands.com/ministries/" target="_blank" rel="noopener noreferrer" className="pill gold">MINISTRIES</a>
          <a href="https://gracewoodlands.com/" className="pill gold" target="_blank" rel="noopener noreferrer">CHURCH WEBSITE</a>
          <a href="https://gracewoodlands.com/give" target="_blank" rel="noopener noreferrer" className="pill gold">GIVE</a>
        </div>
      </nav>

      {/* INTRO IMAGE + COPY */}
      <section className="intro">
        <div className="container">
          <div className="two-col">
            <div className="intro-image">
              <div className="video-thumbnail">
                {!isIntroVideoPlaying && (
                  <div className="video-link" onClick={handlePlayButtonClick} style={{ cursor: 'pointer' }}>
                    <img
                      src="https://gracewoodlands.com/wp-content/uploads/2021/03/Grace-Building-980x553.jpg"
                      alt="Grace Church building in The Woodlands, Texas"
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'block',
                        objectFit: 'cover',
                        borderRadius: '8px'
                      }}
                    />
                    <div className="play-button">
                      <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="30" cy="30" r="30" fill="rgba(255, 255, 255, 0.9)"/>
                        <path d="M24 18L42 30L24 42V18Z" fill="#333"/>
                      </svg>
                    </div>
                  </div>
                )}
                {isIntroVideoPlaying && (
                  <div className="video-embed" style={{ position: 'relative', paddingTop: '56.25%' }}>
                    <iframe
                      title="Grace Church Intro"
                      src="https://player.vimeo.com/video/1130496866?autoplay=1&muted=0&title=0&byline=0&portrait=0"
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
              </div>
            </div>
            <div className="intro-copy">
              <h2 className="section-title tight">GRACE CHURCH</h2>
              <p>Join us at Grace Church this Sunday at 9am and 11am! We invite you to Grace to experience a fresh outpouring of the presence of God in one of our services.</p>
              <p>Plus, there are 50+ groups and classes to help you and your family grow in your faith, be equipped with a greater understanding of God's Word, and learn more about His purpose for your life.</p>
              <p>With ministries for everyone… kids, teenagers, men, women, young adults, married couples, singles, seniors, military veterans, and more… you'll find your place at Grace!</p>
              <div className="launch-announcement">
                <p className="launch-title">Join Us This Sunday @ 9am or 11am</p>
              </div>
              <button onClick={() => setShowPlanVisitModal(true)} className="pill signup-btn-red">LET US KNOW YOU'RE COMING</button>
            </div>
          </div>
        </div>
      </section>

      {/* LOCATION & SERVICES */}
      <section className="location scroll-animate" id="location">
        <div className="container">
          <div className="location-image">
            <div>
              <Image
                src="/images/church/Grace-Building-980x553-small.webp"
                alt="Grace Church building - 24400 Interstate 45 N, The Woodlands, TX 77386"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
          <div className="location-copy">
            <h3>LOCATION & SERVICES</h3>
            <div className="service-info">
              <div className="service-time">
                <h4>Service Times</h4>
                <p>Sundays at 9AM & 11AM</p>
              </div>
              <div className="address-info">
                <h4>Address</h4>
                <address>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=24400+Interstate+45+N+The+Woodlands+TX+77386"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="address-link"
                  >
                    24400 Interstate 45 N<br />
                    The Woodlands, TX 77386
                  </a>
                </address>
              </div>
            </div>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=24400+Interstate+45+N+The+Woodlands+TX+77386"
              target="_blank"
              rel="noopener noreferrer"
              className="pill gold"
            >
              Get Directions
            </a>
          </div>
        </div>
      </section>

      {/* SIGNUP */}
      <section className="signup scroll-animate" id="signup">
        <div className="container">
          <h3 className="signup-title">SIGN UP FOR UPDATES</h3>
          <p className="signup-sub">Stay up to date with information about events, services, and much more!</p>
          <form className="signup-form" onSubmit={handleSignupSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              aria-label="Full Name"
              value={signupData.name}
              onChange={(e) => setSignupData(prev => ({ ...prev, name: e.target.value }))}
              disabled={signupSubmitting}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              aria-label="Email"
              value={signupData.email}
              onChange={(e) => setSignupData(prev => ({ ...prev, email: e.target.value }))}
              disabled={signupSubmitting}
              required
            />
            <button type="submit" className="signup-btn-red" disabled={signupSubmitting}>
              {signupSubmitting ? 'SIGNING UP...' : 'SIGN UP'}
            </button>
          </form>
          {signupMessage && (
            <p className={`signup-message ${signupMessageType}`}>
              {signupMessage}
            </p>
          )}
        </div>
      </section>

      {/* ABOUT */}
      <section className="about scroll-animate" id="about">
        <div className="container">
          <div className="two-col">
            <div className="about-copy">
              <h3>Welcome to Grace Church</h3>
              <p>Grace Church is a courageous, multigenerational, family-focused church that is unapologetically biblical and conservative. We worship passionately, pray boldly, stand for truth, and look like Heaven. With ministries for every member of your family, we believe God's presence still transforms lives—and that every Christian should boldly impact the culture with their voice and their vote… making America great and Godly once again.</p>
              <p>We believe that in our fracturing society, every child deserves the foundation of a loving mom and dad shaping their life. We believe in the invaluable influence of grandparents pouring into their grandchildren, and the opportunity to grow up experiencing the power and presence of God. We are boldly pro-life because every life is sacred and created in the image of God, and we know God has a plan and purpose for each one of us -- and we want to help you discover and live out yours.</p>
              <p>We offer groups, classes, and pathways designed to help you grow deeper in your faith, build real relationships, and strengthen your walk with God. Whether you are new to Christ or mature in your faith, you'll find a place to grow at Grace.</p>
              <p>We'd love for you to join us this Sunday and experience what God is doing at Grace -- hope to see you and your family soon!</p>
            </div>
            <div className="about-media">
              <div className="media-collage">
                <div className="about-image wide">
                  <img src="/images/general/steve smile.jpeg" alt="Steve and Becky Riggle - Founding Pastors of Grace Church" />
                </div>

                <div className="about-image">
                  <img src="/images/general/GATC - girls1.jpeg" alt="Grace Church community worship and fellowship in The Woodlands, TX" />
                </div>

                <div className="about-image">
                  <img src="https://gracewoodlands.com/wp-content/uploads/2021/03/Grace-Building-980x553.jpg" alt="Grace Church building located at 24400 Interstate 45 N, The Woodlands, TX 77386" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOCATION & SERVICES */}

      {/* Featured section replaced with exact markup from the live site (converted to JSX) */}
      <section className="featured-hero et_pb_section et_pb_section_1 et_pb_with_background et_section_regular scroll-animate" id="featured-hero">
        <div className="featured-hero-bg" aria-hidden="true" style={{ backgroundImage: "url('/images/general/WEB-FFFFBG3.webp')" }}></div>
        <div className="container">
          <div className="et_pb_row et_pb_row_0">
            <div className="et_pb_column et_pb_column_4_4 et_pb_column_0 et_pb_css_mix_blend_mode_passthrough et-last-child">
              <div className="et_pb_module et_pb_image et_pb_image_0">
                <span className="et_pb_image_wrap centered-logo">
                  <img
                    fetchPriority="high"
                    decoding="async"
                    width="797"
                    height="705"
                    src="https://gracewoodlands.com/wp-content/uploads/2025/09/FFFFLogo.png"
                    alt="Family, Faith, Friends, and Freedom - Grace Church values"
                    title="Family, Faith, Friends, and Freedom"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR FOUNDATION */}
      <section className="foundation scroll-animate">
        <div className="container">
          <div className="foundation-content">
            <h2>OUR FOUNDATION</h2>
            <h3>WHO WE ARE</h3>
            <div className="foundation-list">
              <p>Unapologetically Biblical.</p>
              <p>Unashamedly bold and courageous.</p>
              <p>Pro-life, pro-family, pro-freedom.</p>
              <p>Rooted in prayer and the power of the Holy Spirit.</p>
              <p>Committed to building strong families and Godly marriages.</p>
              <p>Multigenerational and multiracial, united in Christ.</p>
              <p>Raising up bold pastors and leaders for this moment in America.</p>
              <p>Passionate in worship, lifting high the name of Jesus.</p>
              <p>Supporting missions in 130 nations through Grace International.</p>
              <p>Standing for truth and righteousness in our culture and nation.</p>
              <p>Engaged in our civic duty—voting biblical values and leading with conviction.</p>
            </div>
            <div className="foundation-statement">
              <p className="bold">We speak up. We stand up.</p>
              <p className="bold">We boldly proclaim God's Truth.</p>
            </div>
          </div>
        </div>
      </section>

      {/* OUR TEAM - HIDDEN FOR NOW */}
      {/* 
      <section className="team" id="team">
        <div className="container">
          <h3 style={{ textAlign: 'center', marginBottom: 'clamp(30px, 5vw, 50px)' }}>OUR TEAM</h3>
          <div className="team-grid">
            <div className="minicard team-member-card">
              <div className="placeholder headshot" onClick={() => openModal('steve-becky')} style={{ cursor: 'pointer', position: 'relative', overflow: 'hidden', borderRadius: '6px' }}>
                <img src="/images/team/steve-becky-09-25-thumbnail-thumbnail.webp" alt="Steve and Becky Riggle - Founding Pastors of Grace Church" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="caption">
                <div>Steve & Becky Riggle</div>
                <small>Founding Pastors</small>
                <button className="read-more-btn" onClick={() => openModal('steve-becky')}>Read More</button>
              </div>
            </div>

            

            <div className="minicard team-member-card">
              <div className="placeholder headshot" onClick={() => openModal('josh')} style={{ cursor: 'pointer', position: 'relative', overflow: 'hidden', borderRadius: '6px' }}>
                <img src="/images/team/josh-pierce-staff-small.jpeg" alt="Josh Pierce - Executive Pastor at Grace Church" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="caption">
                <div>Josh Pierce</div>
                <small>Executive Pastor</small>
                <button className="read-more-btn" onClick={() => openModal('josh')}>Read More</button>
              </div>
            </div>

            <div className="minicard team-member-card">
              <div className="placeholder headshot" onClick={() => openModal('sam-thomas')} style={{ cursor: 'pointer', position: 'relative', overflow: 'hidden', borderRadius: '6px' }}>
                <img src="/images/team/sam-thomas-staff-small.jpeg" alt="Dr. Sam Thomas - Teaching Pastor at Grace Church" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="caption">
                <div>Dr. Sam Thomas</div>
                <small>Teaching Pastor</small>
                <button className="read-more-btn" onClick={() => openModal('sam-thomas')}>Read More</button>
              </div>
            </div>

            <div className="minicard team-member-card">
              <div className="placeholder headshot" onClick={() => openModal('jason-nelson')} style={{ cursor: 'pointer', position: 'relative', overflow: 'hidden', borderRadius: '6px' }}>
                <img src="/images/team/jason-nelson-staff-small.jpeg" alt="Dr. Jason J. Nelson - Associate Pastor at Grace Church" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="caption">
                <div>Dr. Jason J. Nelson</div>
                <small>Associate Pastor</small>
                <button className="read-more-btn" onClick={() => openModal('jason-nelson')}>Read More</button>
              </div>
            </div>

            <div className="minicard team-member-card">
              <div className="placeholder headshot" onClick={() => openModal('brooke')} style={{ cursor: 'pointer', position: 'relative', overflow: 'hidden', borderRadius: '6px' }}>
                <img src="/images/team/brooke-pierce-staff-small.jpeg" alt="Brooke Pierce - Outreach Pastor and Women's Ministry Leader at Grace Church" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="caption">
                <div>Brooke Pierce</div>
                <small>Outreach Pastor / Women's Ministry</small>
                <button className="read-more-btn" onClick={() => openModal('brooke')}>Read More</button>
              </div>
            </div>

            <div className="minicard team-member-card">
              <div className="placeholder headshot" onClick={() => openModal('rachele')} style={{ cursor: 'pointer', position: 'relative', overflow: 'hidden', borderRadius: '6px' }}>
                <img src="/images/team/rachele-karmout-staff-small.jpeg" alt="Rachele Karmout - Family Life Pastor at Grace Church" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="caption">
                <div>Rachele Karmout</div>
                <small>Family Life Pastor / Cathedral Life Centre</small>
                <button className="read-more-btn" onClick={() => openModal('rachele')}>Read More</button>
              </div>
            </div>

            <div className="minicard team-member-card">
              <div className="placeholder headshot" onClick={() => openModal('rachel')} style={{ cursor: 'pointer', position: 'relative', overflow: 'hidden', borderRadius: '6px' }}>
                <img src="/images/team/rachel-santiago-staff-small.jpeg" alt="Rachel Santiago - Groups and Events Pastor at Grace Church" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="caption">
                <div>Rachel Santiago</div>
                <small>Groups & Events Pastor</small>
                <button className="read-more-btn" onClick={() => openModal('rachel')}>Read More</button>
              </div>
            </div>

            <div className="minicard team-member-card">
              <div className="placeholder headshot" onClick={() => openModal('stu-debbe')} style={{ cursor: 'pointer', position: 'relative', overflow: 'hidden', borderRadius: '6px' }}>
                <img src="/images/team/stu-debbe-staff-small.jpeg" alt="Stu and Debbe Johnson - Associate Pastors at Grace Church" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="caption">
                <div>Stu & Debbe Johnson</div>
                <small>Associate Pastors</small>
                <button className="read-more-btn" onClick={() => openModal('stu-debbe')}>Read More</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      */}

      {/* A Few Grace Messages - HIDDEN FOR NOW */}
      {/* 
      <section className="grace-messages">
        <div className="container">
          <h3 style={{ textAlign: 'center', marginBottom: 'clamp(30px, 5vw, 50px)' }}>A Few Messages at Grace</h3>
          <div className="messages-grid">
            <a href="https://www.youtube.com/watch?v=swEbTnTjysE" target="_blank" rel="noopener noreferrer" className="message-card">
              <div className="message-thumbnail">
                <div className="video-thumbnail-wrapper">
                  <img
                    src="https://img.youtube.com/vi/swEbTnTjysE/maxresdefault.jpg"
                    alt="Remember Charlie Kirk at Grace - Pastor Steve Riggle | September 10, 2025"
                    className="video-thumbnail-img"
                  />
                  <div className="play-button">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="message-info">
                <h4>Remember Charlie Kirk at Grace</h4>
                <p>Pastor Steve Riggle | September 10, 2025</p>
              </div>
            </a>

            <a href="https://www.youtube.com/watch?v=OvWTaLOknIY" target="_blank" rel="noopener noreferrer" className="message-card">
              <div className="message-thumbnail">
                <div className="video-thumbnail-wrapper">
                  <img
                    src="https://img.youtube.com/vi/OvWTaLOknIY/maxresdefault.jpg"
                    alt="Family, Faith, Friends, and Freedom - Pastor Steve Riggle | September 7, 2025"
                    className="video-thumbnail-img"
                  />
                  <div className="play-button">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="message-info">
                <h4>Family, Faith, Friends, and Freedom</h4>
                <p>Pastor Steve Riggle | September 7, 2025</p>
              </div>
            </a>

            <a href="https://www.youtube.com/watch?v=Znn7CIYbZKg" target="_blank" rel="noopener noreferrer" className="message-card">
              <div className="message-thumbnail">
                <div className="video-thumbnail-wrapper">
                  <img
                    src="https://img.youtube.com/vi/Znn7CIYbZKg/maxresdefault.jpg"
                    alt="God & Country 2025 - Grace Teaching Team | June 29, 2025"
                    className="video-thumbnail-img"
                  />
                  <div className="play-button">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="message-info">
                <h4>God & Country 2025</h4>
                <p>Grace Teaching Team | June 29, 2025</p>
              </div>
            </a>
          </div>
        </div>
      </section>
      */}

      {/* CONTACT SECTION */}
      <section className="contact-section scroll-animate" id="contact">
        <div className="container">
          <div className="contact-content">
            <div className="contact-info">
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
            <div className="contact-form-container">
              <h3>GET IN TOUCH</h3>
              <form className="contact-form" onSubmit={handleContactSubmit}>
                <div className="form-row">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    aria-label="First Name"
                    value={contactData.firstName}
                    onChange={(e) => setContactData(prev => ({ ...prev, firstName: e.target.value }))}
                    disabled={contactSubmitting}
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    aria-label="Last Name"
                    value={contactData.lastName}
                    onChange={(e) => setContactData(prev => ({ ...prev, lastName: e.target.value }))}
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
                  onChange={(e) => setContactData(prev => ({ ...prev, email: e.target.value }))}
                  disabled={contactSubmitting}
                  required
                />
                <textarea
                  name="message"
                  placeholder="Message"
                  aria-label="Message"
                  rows={4}
                  value={contactData.message}
                  onChange={(e) => setContactData(prev => ({ ...prev, message: e.target.value }))}
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

      {/* TEAM MEMBER MODAL */}
      {selectedTeamMember && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <h3>{selectedTeamMember.name}</h3>
            <h4>{selectedTeamMember.title}</h4>
            <p>{selectedTeamMember.bio}</p>
            {selectedTeamMember.email && (
              <p style={{ marginTop: '15px' }}>
                <strong>Email: </strong>
                <a
                  href={`mailto:${selectedTeamMember.email}`}
                  style={{
                    color: '#007bff',
                    textDecoration: 'none',
                    borderBottom: '1px solid #007bff'
                  }}
                  onMouseOver={(e) => (e.target as HTMLAnchorElement).style.textDecoration = 'underline'}
                  onMouseOut={(e) => (e.target as HTMLAnchorElement).style.textDecoration = 'none'}
                >
                  {selectedTeamMember.email}
                </a>
              </p>
            )}

            {selectedTeamMember.moreLink && (
              <p className="modal-cta-wrap">
                <a
                  href={selectedTeamMember.moreLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill gold modal-small"
                >
                  Learn More
                </a>
              </p>
            )}
          </div>
        </div>
      )}

      {/* FOOTER (mirrored from https://gracewoodlands.com) */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-top">
              {/* Brand / Description / Newsletter */}
              <div className="footer-brand">
                <img
                  src="/images/general/Grace Church LOGO wide.webp"
                  alt="Grace Church - The Woodlands, Texas"
                  className="footer-logo"
                />

                <div className="footer-signup">
                  <h4>Stay Connected</h4>
                  <form className="footer-signup-form" onSubmit={(e) => { e.preventDefault(); alert('Thanks — signup saved (placeholder)'); }}>
                    <input type="email" name="email" placeholder="Email address" aria-label="Email address" />
                    <button type="submit">Subscribe</button>
                  </form>
                </div>
              </div>

              {/* About */}
              <div className="footer-section">
                <h4>About</h4>
                <ul className="footer-links">
                  <li><a href="https://gracewoodlands.com/about/" target="_blank" rel="noopener noreferrer">Who We Are</a></li>
                  <li><a href="https://gracewoodlands.com/about/" target="_blank" rel="noopener noreferrer">Values</a></li>
                  <li><a href="https://gracewoodlands.com/leadership/" target="_blank" rel="noopener noreferrer">Leadership Team</a></li>
                  <li><a href="http://www.gracechurches.tv/" target="_blank" rel="noopener noreferrer">Grace International</a></li>
                  <li><a href="http://gracelatino.com/" target="_blank" rel="noopener noreferrer">Grace Latino</a></li>
                  <li><a href="https://www.christiansinbusiness.net/grace-woodlands-church/" target="_blank" rel="noopener noreferrer">Business Directory</a></li>
                </ul>
              </div>

              {/* Ministries */}
              <div className="footer-section">
                <h4>Ministries</h4>
                <ul className="footer-links">
                  <li><a href="https://gracewoodlands.com/kids/" target="_blank" rel="noopener noreferrer">Grace Kids</a></li>
                  <li><a href="https://gracewoodlands.com/youth/" target="_blank" rel="noopener noreferrer">Anthem Youth</a></li>
                  <li><a href="https://gracewoodlands.com/faithvotes/" target="_blank" rel="noopener noreferrer">Faith Votes</a></li>
                  <li><a href="https://gracewoodlands.com/project/primetime/" target="_blank" rel="noopener noreferrer">PrimeTime Seniors</a></li>
                  <li><a href="https://gracewoodlands.com/pastoral-care/" target="_blank" rel="noopener noreferrer">Pastoral Care</a></li>
                  <li><a href="https://gracewoodlands.com/ministries/" target="_blank" rel="noopener noreferrer">More Ministries</a></li>
                </ul>
              </div>

              {/* Join Us / Events / Give */}
              <div className="footer-section">
                <h4>Join Us</h4>
                <ul className="footer-links">
                  <li><a href="https://gracewoodlands.com/upcoming-events/" target="_blank" rel="noopener noreferrer">Events</a></li>
                  <li><a href="https://gracewoodlands.com/groups/" target="_blank" rel="noopener noreferrer">Groups &amp; Classes</a></li>
                  <li><a href="https://gracewoodlands.com/volunteer/" target="_blank" rel="noopener noreferrer">Volunteer</a></li>
                  <li><a href="https://gracewoodlands.com/give/" target="_blank" rel="noopener noreferrer">Give</a></li>
                  <li><a href="https://gracewoodlands.churchcenter.com/people/forms/420805" target="_blank" rel="noopener noreferrer">Get Baptized</a></li>
                </ul>
              </div>
            </div>

            <div className="footer-bottom-grid">
              {/* Contact */}
              <div className="footer-section footer-address">
                <h4>Contact</h4>
                <p style={{ margin: 0 }}><strong>Office Hours:</strong> Mon-Fri 9am-5pm</p>
                <p style={{ margin: '6px 0 0' }}>
                  24400 Interstate 45 N, The Woodlands, TX 77386<br />
                  <a href="tel:+18323812306" target="_blank" rel="noopener noreferrer">(832) 381-2306</a> • <a href="mailto:info@gracewoodlands.com" target="_blank" rel="noopener noreferrer">info@gracewoodlands.com</a>
                </p>

                <div className="footer-social" style={{ marginTop: '12px' }}>
                  <a className="social-icon" href="https://www.facebook.com/gracewoodlands" target="_blank" rel="noopener noreferrer" aria-label="Facebook">f</a>
                  <a className="social-icon" href="https://www.instagram.com/gracewoodlands/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">in</a>
                  <a className="social-icon" href="https://www.youtube.com/gracewoodlands" target="_blank" rel="noopener noreferrer" aria-label="YouTube">yt</a>
                </div>
              </div>

              {/* Media */}
              <div className="footer-section">
                <h4>Media</h4>
                <ul className="footer-links">
                  <li><a href="https://subsplash.com/gracewatchonline/watch" target="_blank" rel="noopener noreferrer">Sermons</a></li>
                  <li><a href="https://gracewoodlands.online.church/" target="_blank" rel="noopener noreferrer">Watch Live</a></li>
                  <li><a href="https://forgepastors.com/" target="_blank" rel="noopener noreferrer">FORGE Program</a></li>
                  <li><a href="https://www.cathedrallifecentre.com/" target="_blank" rel="noopener noreferrer">Cathedral Life Centre</a></li>
                  <li><a href="https://gm.giftlegacy.com/" target="_blank" rel="noopener noreferrer">Legacy Giving</a></li>
                </ul>
              </div>

              {/* Related Ministries (from Grace at The Circle) */}
              <div className="footer-section">
                <h4>Related Ministries</h4>
                <ul className="footer-links">
                  <li><a href="https://www.gracewoodlands.com" target="_blank" rel="noopener noreferrer">Grace Church</a></li>
                  <li><a href="https://www.gracechurches.tv" target="_blank" rel="noopener noreferrer">Grace International</a></li>
                  <li><a href="https://www.forgepastors.com" target="_blank" rel="noopener noreferrer">Forge Pastors</a></li>
                  <li><a href="https://www.theforgejournal.com" target="_blank" rel="noopener noreferrer">Forge Journal</a></li>
                  <li><a href="https://www.cathedrallifecentre.com" target="_blank" rel="noopener noreferrer">Life Centre</a></li>
                  <li><a href="https://www.uspastorcouncil.org" target="_blank" rel="noopener noreferrer">US Pastor Council</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-copyright">
              <small>&copy; {new Date().getFullYear()} Grace Church. All rights reserved.</small>
            </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <a href="https://gracewoodlands.com/privacy-policy/" className="footer-link" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
              <a href="https://gracewoodlands.com/terms/" className="footer-link" target="_blank" rel="noopener noreferrer">Terms</a>
            </div>
          </div>
        </div>
      </footer>

      {/* PLAN YOUR VISIT MODAL */}
      {showPlanVisitModal && (
        <div className="plan-visit-modal-overlay" onClick={closePlanVisitModal}>
          <div className="plan-visit-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="plan-visit-modal-close" onClick={closePlanVisitModal}>×</button>
            
            {!planVisitConfirmed ? (
              <>
                <h2>Let Us Know You're Coming</h2>
                <p className="modal-subtitle">Let us know you're coming! Fill in your details below.</p>
                
                <form className="plan-visit-form" onSubmit={handlePlanVisitSubmit}>
                  <div className="form-group">
                    <label htmlFor="visit-name">Full Name</label>
                    <input
                      id="visit-name"
                      type="text"
                      placeholder="Your Name"
                      value={planVisitData.name}
                      onChange={(e) => setPlanVisitData(prev => ({ ...prev, name: e.target.value }))}
                      required
                      disabled={planVisitSubmitting}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="visit-phone">Phone Number</label>
                    <input
                      id="visit-phone"
                      type="tel"
                      placeholder="(XXX) XXX-XXXX"
                      value={planVisitData.phone}
                      onChange={(e) => setPlanVisitData(prev => ({ ...prev, phone: e.target.value }))}
                      required
                      disabled={planVisitSubmitting}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="visit-email">Email Address</label>
                    <input
                      id="visit-email"
                      type="email"
                      placeholder="your@email.com"
                      value={planVisitData.email}
                      onChange={(e) => setPlanVisitData(prev => ({ ...prev, email: e.target.value }))}
                      required
                      disabled={planVisitSubmitting}
                    />
                  </div>
                  
                  <button type="submit" className="plan-visit-submit-btn" disabled={planVisitSubmitting}>
                    {planVisitSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
                  </button>
                </form>
              </>
            ) : (
              <div className="plan-visit-confirmation">
                <div className="confirmation-icon">✓</div>
                <h2>Thank You!</h2>
                <p>We're excited to see you at Grace Church!</p>
                <p className="confirmation-details">
                  We've received your information and will be in touch soon at <strong>{planVisitData.phone}</strong> or <strong>{planVisitData.email}</strong>.
                </p>
                <p className="confirmation-service-info">
                  Join us this Sunday at <strong>9AM or 11AM</strong><br />
                  <span style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', marginTop: '12px', display: 'block' }}>24400 Interstate 45 N<br />The Woodlands, TX 77386</span>
                </p>
                <button onClick={closePlanVisitModal} className="plan-visit-close-btn">
                  CLOSE
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TIMED SIGNUP MODAL */}
      {showTimedSignupModal && (
        <div className="plan-visit-modal-overlay" onClick={closeTimedSignupModal}>
          <div className="plan-visit-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="plan-visit-modal-close" onClick={closeTimedSignupModal}>×</button>

            {timedSignupMessageType !== 'success' ? (
              <>
                <h2>Stay Connected</h2>
                <p className="modal-subtitle">Sign up for the latest updates from Grace Church!</p>

                <form className="plan-visit-form" onSubmit={handleTimedSignupSubmit}>
                  <div className="form-group">
                    <label htmlFor="timed-signup-name">Full Name</label>
                    <input
                      id="timed-signup-name"
                      type="text"
                      placeholder="Your Name"
                      value={timedSignupData.name}
                      onChange={(e) => setTimedSignupData(prev => ({ ...prev, name: e.target.value }))}
                      required
                      disabled={timedSignupSubmitting}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="timed-signup-email">Email Address</label>
                    <input
                      id="timed-signup-email"
                      type="email"
                      placeholder="your@email.com"
                      value={timedSignupData.email}
                      onChange={(e) => setTimedSignupData(prev => ({ ...prev, email: e.target.value }))}
                      required
                      disabled={timedSignupSubmitting}
                    />
                  </div>

                  {timedSignupMessage && (
                    <div className={`signup-message ${timedSignupMessageType}`}>
                      {timedSignupMessage}
                    </div>
                  )}

                  <button type="submit" className="plan-visit-submit-btn" disabled={timedSignupSubmitting}>
                    {timedSignupSubmitting ? 'SIGNING UP...' : 'SIGN UP'}
                  </button>
                </form>
              </>
            ) : (
              <div className="plan-visit-confirmation">
                <div className="confirmation-icon">✓</div>
                <h2>Thank You!</h2>
                <p>You're all signed up for updates from Grace Church!</p>
                <p className="confirmation-details">
                  We'll keep you informed about upcoming events, messages, and ways to get connected.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

