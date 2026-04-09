import React, { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import CoursesPage from './CoursesPage'

// Image imports
import hero1 from './assets/images/hero1.jpeg'
import hero2 from './assets/images/hero2.jpeg'
import hero3 from './assets/images/hero3.jpeg'
import hero4 from './assets/images/hero4.jpeg'
import aboutImg from './assets/images/about.jpeg'
import annvilLogo from './assets/images/logo.png'
import brochure from './assets/files/Nergy_Vidya_Brochure.pdf'

const colors = {
  darkBg: '#0D0D0D',
  navWhite: '#FFFFFF',
  blue: '#2563EB',
  blueDark: '#1d4ed8',
  lightBg: '#F5F7FA',
  cardDark: '#111827',
  white: '#FFFFFF',
  textDark: '#111111',
  grey: '#6B7280',
  border: '#E5E7EB',
}

// ── SVG ICONS ──────────────────────────────────────────────────────────────
const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
)

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
)

const MapPinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
)

// ── NAVBAR ─────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const scrollToSection = (id) => {
    setMobileOpen(false)
    const element = document.getElementById(id)
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  const navLinks = [
    { label: 'About', id: 'about' },
    { label: 'What We Provide', id: 'what-we-provide' },
    { label: 'Certifications', id: 'certifications' },
    { label: 'Partners', id: 'partners' },
  ]

  return (
    <motion.nav style={{
      position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)',
      zIndex: 1000, background: colors.navWhite, borderRadius: '50px',
      padding: '10px 16px 10px 24px', display: 'flex', alignItems: 'center',
      gap: '40px', boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
      width: 'auto', whiteSpace: 'nowrap', fontFamily: 'Manrope, sans-serif',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
        <img src={annvilLogo} style={{ height: '36px', objectFit: 'contain' }}
          onError={e => { e.target.style.display = 'none' }} alt="Annvil Logo" />
        <span style={{ fontWeight: 800, fontSize: '20px', color: '#000', fontFamily: 'Syne, sans-serif' }}>
          Annvil Technologies
        </span>
      </div>

      <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        {navLinks.map(link => (
          <button key={link.id} onClick={() => scrollToSection(link.id)}
            style={{ background: 'none', border: 'none', fontSize: '15px', color: '#111', fontWeight: 500, cursor: 'pointer', fontFamily: 'Manrope, sans-serif' }}
            onMouseEnter={e => e.target.style.color = '#7C3AED'}
            onMouseLeave={e => e.target.style.color = '#111'}>
            {link.label}
          </button>
        ))}
      </div>

      <button onClick={() => scrollToSection('contact')}
        style={{ background: '#7C3AED', color: '#fff', border: 'none', borderRadius: '50px', padding: '12px 28px', fontWeight: 600, fontSize: '15px', cursor: 'pointer', fontFamily: 'Syne, sans-serif' }}
        onMouseEnter={e => e.currentTarget.style.background = '#6D28D9'}
        onMouseLeave={e => e.currentTarget.style.background = '#7C3AED'}>
        Contact Us →
      </button>
    </motion.nav>
  )
}

// ── COUNTER ────────────────────────────────────────────────────────────────
const CountUp = ({ end }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' })

  useEffect(() => {
    if (!isInView) return
    let current = 0
    const increment = end / 60
    const timer = setInterval(() => {
      current += increment
      if (current >= end) { setCount(end); clearInterval(timer) }
      else setCount(Math.floor(current))
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, end])

  return (
    <span ref={ref}>
      {count > 1000 ? (count / 100000).toFixed(1) + 'L+' : count > 100 ? count + '+' : count + '+'}
    </span>
  )
}

// ── HERO ───────────────────────────────────────────────────────────────────
const HeroSection = () => {
  const ref = useRef(null)
  return (
    <section id="home" ref={ref} style={{
      background: colors.darkBg, minHeight: '100vh',
      display: 'flex', alignItems: 'center',
      paddingTop: '80px', paddingLeft: '80px', paddingRight: '80px',
      fontFamily: 'Manrope, sans-serif', overflow: 'hidden',
    }}>
      <div style={{ display: 'flex', gap: '60px', alignItems: 'center', width: '100%' }}>
        <motion.div style={{ flex: '0 0 45%' }} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div style={{ border: '1px solid #333', borderRadius: '999px', padding: '6px 14px', fontSize: '13px', color: '#aaa', display: 'inline-block', marginBottom: '20px' }}>
            NEP 2020 Aligned | BFSI SSC Certified
          </div>
          <h1 style={{ fontSize: 'clamp(42px,5vw,68px)', fontWeight: 900, color: '#fff', lineHeight: 1.1, marginBottom: '24px', fontFamily: 'Manrope, sans-serif' }}>
            India's Leading Fintech Training Services Company
          </h1>
          <p style={{ fontSize: '17px', color: '#C0C0C0', lineHeight: 1.7, marginBottom: '36px', maxWidth: '480px' }}>
            Annvil Technologies bridges academia and industry with real-time, hands-on ecosystems that cultivate an efficient, job-ready commerce and finance workforce for India.
          </p>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '40px' }}>
            <motion.button onClick={() => document.getElementById('certifications').scrollIntoView({ behavior: 'smooth' })}
              style={{ background: colors.blue, color: '#fff', border: 'none', borderRadius: '8px', padding: '14px 28px', fontWeight: 600, fontSize: '16px', cursor: 'pointer', fontFamily: 'Manrope, sans-serif' }}
              whileHover={{ scale: 1.02 }}
              onMouseEnter={e => e.target.style.background = colors.blueDark}
              onMouseLeave={e => e.target.style.background = colors.blue}>
              Explore Programs
            </motion.button>
            <a href={brochure} download="Nergy_Vidya_Brochure.pdf" style={{ textDecoration: 'none' }}>
              <button style={{ border: '1px solid #555', color: '#fff', background: 'transparent', borderRadius: '8px', padding: '14px 28px', fontWeight: 600, fontSize: '16px', cursor: 'pointer', fontFamily: 'Manrope, sans-serif' }}
                onMouseEnter={e => { e.target.style.borderColor = colors.blue; e.target.style.color = colors.blue }}
                onMouseLeave={e => { e.target.style.borderColor = '#555'; e.target.style.color = '#fff' }}>
                Download Brochure
              </button>
            </a>
          </div>
        </motion.div>

        {/* Vertical image marquee */}
        <div style={{ flex: '0 0 50%', position: 'relative', height: '600px', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '120px', background: 'linear-gradient(to bottom,#0D0D0D,transparent)', zIndex: 2, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px', background: 'linear-gradient(to top,#0D0D0D,transparent)', zIndex: 2, pointerEvents: 'none' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', animation: 'scrollUp 18s linear infinite' }} className="marquee-vertical">
            {[
              { img: hero1, title: 'Industry-Institute Engagement Models' },
              { img: hero2, title: 'Fintech Labs' },
              { img: hero3, title: 'Training Programs for Students and Faculties' },
              { img: hero4, title: 'Industry-Academia Connects' },
              { img: hero1, title: 'Industry-Institute Engagement Models' },
              { img: hero2, title: 'Fintech Labs' },
              { img: hero3, title: 'Training Programs for Students and Faculties' },
              { img: hero4, title: 'Industry-Academia Connects' },
            ].map((card, idx) => (
              <div key={idx} style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', width: '100%', height: '200px', flexShrink: 0 }}>
                <img src={card.img} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} alt={card.title} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px', background: 'linear-gradient(to top,rgba(0,0,0,0.85),transparent)' }} />
                <h3 style={{ position: 'absolute', bottom: '16px', left: '20px', right: '20px', color: '#fff', fontFamily: 'Manrope, sans-serif', fontSize: '16px', fontWeight: 700, lineHeight: 1.3, margin: 0 }}>
                  {card.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── STATS ──────────────────────────────────────────────────────────────────
const StatsSection = () => {
  const ref = useRef(null)
  return (
    <motion.section ref={ref}
      style={{ background: colors.cardDark, padding: '48px 80px', display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap', gap: '40px', fontFamily: 'Manrope, sans-serif' }}
      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
      {[
        { value: 200000, label: 'Learners Skilled' },
        { value: 120, label: 'Experiential Tools' },
        { value: 5, label: 'Years of Excellence' },
        { value: 50, label: 'Partner Institutions' },
      ].map((stat, idx) => (
        <div key={idx} style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '42px', fontWeight: 900, color: colors.blue, marginBottom: '6px', fontFamily: 'Manrope, sans-serif' }}>
            <CountUp end={stat.value} />
          </div>
          <div style={{ fontSize: '14px', color: '#C0C0C0', fontWeight: 500 }}>{stat.label}</div>
        </div>
      ))}
    </motion.section>
  )
}

// ── ABOUT ──────────────────────────────────────────────────────────────────
const AboutSection = () => {
  const ref = useRef(null)
  return (
    <section id="about" ref={ref} style={{ background: colors.white, padding: '96px 80px', fontFamily: 'Manrope, sans-serif' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'start' }}>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <div style={{ fontSize: '12px', color: colors.blue, fontWeight: 700, letterSpacing: '2px', marginBottom: '12px' }}>ABOUT US</div>
          <h2 style={{ fontSize: '40px', fontWeight: 800, color: colors.textDark, lineHeight: 1.2, marginBottom: '20px', fontFamily: 'Manrope, sans-serif' }}>
            Bridging Commerce Education &amp; Industry
          </h2>
          <p style={{ fontSize: '16px', color: '#374151', lineHeight: 1.8, marginBottom: '32px' }}>
            Annvil Technologies bridges commerce education and industry application — equipping universities, colleges and training institutes with cutting-edge experiential tools and certified skill training. FinTech integrates finance and digital innovation to transform financial services. In India, its rapid growth has created a strong demand for a FinTech-ready workforce. Annvil bridges this gap by enabling institutions to align curriculum, faculty capabilities, and applied learning with evolving FinTech industry needs.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '32px' }}>
            {['NEP 2020 Aligned', 'BFSI SSC Certified', '2,00,000+ Learners'].map((stat, idx) => (
              <span key={idx} style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '50px', padding: '10px 20px', fontSize: '14px', color: '#1D4ED8', fontWeight: 600, whiteSpace: 'nowrap' }}>
                {stat}
              </span>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <img src={aboutImg} style={{ width: '100%', height: '500px', objectFit: 'cover', borderRadius: '20px', display: 'block' }} alt="About Annvil" />
        </motion.div>
      </div>
    </section>
  )
}

// ── WHAT WE PROVIDE ────────────────────────────────────────────────────────
const WhatWeProvideSection = () => {
  const ref = useRef(null)
  const [hoveredCard, setHoveredCard] = useState(null)

  const cards = [
    { src: hero1, heading: 'Industry-Institute Enablement Programs', description: 'We bridge the gap between academic commerce education and real industry requirements through structured enablement programs on Commerce & Finance.' },
    { src: hero2, heading: 'Hands-on and Real-Time Experience', description: 'We establish an industry working model inside academia with hands-on real-time experience that prepares students for actual workplace scenarios.' },
    { src: hero3, heading: 'Simulated Work Environment Programs', description: "Where industry meets academia — turning classrooms into the country's most powerful skill engine. Nergy Vidya's SL & IL Tech doesn't teach about industry. It puts learners inside it." },
    { src: hero4, heading: 'Efficient Workforce Creation', description: "We create an efficient workforce for the country and industry on Commerce & Finance — upskilling, reskilling and cross-skilling India's commerce graduates." },
  ]

  return (
    <section id="what-we-provide" ref={ref} style={{ background: '#000', padding: '96px 80px', fontFamily: 'Manrope, sans-serif' }}>
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} style={{ marginBottom: '60px' }}>
        <div style={{ fontSize: '12px', color: '#7C3AED', fontWeight: 700, letterSpacing: '2px', marginBottom: '12px' }}>WHAT WE PROVIDE</div>
        <h2 style={{ fontSize: '48px', fontWeight: 800, color: '#fff', marginBottom: '24px', fontFamily: 'Syne, sans-serif' }}>Our Core Offerings</h2>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {cards.map((card, idx) => (
          <motion.div key={idx}
            style={{ background: '#111', border: '1px solid', borderColor: hoveredCard === idx ? '#7C3AED' : '#222', borderRadius: '20px', overflow: 'hidden', minHeight: '380px', display: 'flex', flexDirection: 'column', cursor: 'pointer', transition: 'border-color 0.3s ease' }}
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: idx * 0.12 }} viewport={{ once: true }}
            whileHover={{ y: -6 }} onMouseEnter={() => setHoveredCard(idx)} onMouseLeave={() => setHoveredCard(null)}>
            <div style={{ height: '200px', overflow: 'hidden', flexShrink: 0 }}>
              <img src={card.src} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease', transform: hoveredCard === idx ? 'scale(1.05)' : 'scale(1)' }} alt={card.heading} />
            </div>
            <div style={{ padding: '28px 28px 32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ color: '#fff', fontFamily: 'Syne, sans-serif', fontSize: '19px', fontWeight: 700, lineHeight: 1.3, marginBottom: '12px' }}>{card.heading}</h3>
              <p style={{ color: '#B0B0B0', fontFamily: 'Manrope, sans-serif', fontSize: '14px', lineHeight: 1.7, flex: 1, margin: 0 }}>{card.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// ── CERTIFICATIONS ─────────────────────────────────────────────────────────
const CertificationsSection = ({ onExplore }) => {
  const ref = useRef(null)
  return (
    <section id="certifications" ref={ref} style={{ background: '#F8F7FF', padding: '96px 80px', fontFamily: 'Manrope, sans-serif' }}>
      <style>{`
        #certifications .course-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:20px; margin-top:48px; }
        #certifications .course-card { background:white; border:none; border-radius:20px; padding:32px 28px; min-height:160px; display:flex; flex-direction:column; justify-content:space-between; box-shadow:0 2px 12px rgba(0,0,0,0.06); position:relative; overflow:hidden; transition:all 0.3s ease; cursor:pointer; }
        #certifications .course-card .course-accent { position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,#7C3AED,#2563EB); border-radius:20px 20px 0 0; transition:all 0.3s ease; }
        #certifications .course-card:hover { box-shadow:0 16px 40px rgba(124,58,237,0.15); transform:translateY(-6px); }
        #certifications .course-title { color:#111; font-family:Syne,sans-serif; font-size:15px; font-weight:700; line-height:1.5; letter-spacing:-0.2px; margin-top:16px; }
        #certifications .course-bottom { display:flex; align-items:center; justify-content:space-between; margin-top:20px; }
        #certifications .course-pill { background:linear-gradient(135deg,#EDE9FE,#DBEAFE); color:#5B21B6; border-radius:50px; padding:5px 14px; font-size:11px; font-family:Manrope,sans-serif; font-weight:600; }
        @media(max-width:768px){#certifications .course-grid{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:480px){#certifications .course-grid{grid-template-columns:1fr;}}
      `}</style>

      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} style={{ marginBottom: '60px' }}>
        <div style={{ fontSize: '12px', color: colors.blue, fontWeight: 700, letterSpacing: '2px', marginBottom: '12px' }}>BFSI SSC OF INDIA CERTIFIED</div>
        <h2 style={{ fontSize: '38px', fontWeight: 800, color: colors.textDark, marginBottom: '16px', fontFamily: 'Manrope, sans-serif' }}>
          BFSI SSC Of INDIA Certified Learning Programs
        </h2>
        <p style={{ fontSize: '16px', color: '#374151', fontFamily: 'Manrope, sans-serif' }}>
          Certifications endorsed by NCVET &amp; BFSI Sector Skill Council of India under Ministry of Skill Development &amp; Entrepreneurship, Govt. of India.
        </p>
      </motion.div>

      <div className="course-grid">
        {[
          'Accounting for Beginners',
          'Advanced Financial Accounting & Reporting – AS Compliant',
          'Essentials of Personal Finance',
          'Essentials of GST Compliance / Customs',
          'Applied Costing & Cost Control',
          'Essentials of Digital Statutory e-Filing',
          'MS Office',
          'Corporate Accounting & Corporate Compliance',
          'Direct Taxation in India',
          'Indian Taxation & Tally',
          'Corporate Accounting',
          'Essentials of Cost Accounting',
        ].map((name, idx) => (
          <motion.div key={idx} className="course-card"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: idx * 0.04 }} viewport={{ once: true }} whileHover={{ y: -6 }}>
            <div className="course-accent" />
            <div className="course-title">{name}</div>
            <div className="course-bottom">
              <div className="course-pill">Certification</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ marginTop: '60px', textAlign: 'center' }}>
        <motion.button
          onClick={() => { window.scrollTo(0, 0); onExplore() }}
          style={{ background: '#7C3AED', color: '#fff', border: 'none', borderRadius: '50px', padding: '16px 40px', fontSize: '16px', fontFamily: 'Syne, sans-serif', fontWeight: 600, cursor: 'pointer' }}
          whileHover={{ scale: 1.02, y: -2 }}
          onMouseEnter={e => e.target.style.background = '#6D28D9'}
          onMouseLeave={e => e.target.style.background = '#7C3AED'}>
          Explore All Courses
        </motion.button>
      </div>
    </section>
  )
}

// ── PARTNERS ───────────────────────────────────────────────────────────────
const PartnersSection = () => {
  const ref = useRef(null)
  const topics = ['Income Tax','GST','Financial Accounting','Cost Accounting','Business Laws','MCA','FSSAI','DSC','EPF/ESIC','Import/Export','MSME','Corporate Laws','Financial Management']

  useEffect(() => {
    const existing = document.querySelector('#partners-marquee-style')
    if (existing) return
    const style = document.createElement('style')
    style.id = 'partners-marquee-style'
    style.textContent = `
      @keyframes marqueeLeft { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
      .partners-marquee-inner { display:flex; width:fit-content; animation:marqueeLeft 22s linear infinite; }
      .partners-marquee-inner:hover { animation-play-state:paused; }
    `
    document.head.appendChild(style)
    return () => { const el = document.querySelector('#partners-marquee-style'); if (el) el.remove() }
  }, [])

  return (
    <section id="partners" ref={ref} style={{ background: '#000', padding: '100px 80px', fontFamily: 'Manrope, sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <div style={{ fontSize: '12px', color: '#999', fontWeight: 700, letterSpacing: '3px' }}>PLATFORM</div>
          <h2 style={{ fontSize: '52px', fontWeight: 800, color: '#fff', marginTop: '12px', fontFamily: 'Manrope, sans-serif' }}>Powered by Nergy Vidya</h2>
          <p style={{ fontSize: '17px', color: '#C0C0C0', marginTop: '16px', maxWidth: '600px' }}>
            India's 1st SL &amp; IL Tech platform for commerce education. 120+ experiential tools. 2,00,000+ learners skilled.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px', marginTop: '48px' }}>
          {[
            { title: 'Innovative Cloud-Based Platform', description: 'Accessible anytime, anywhere through a secure and scalable cloud infrastructure built for institutions.' },
            { title: 'Dashboard to Monitor Student Progress', description: 'Real-time tracking of student performance, engagement and learning outcomes in one place.' },
            { title: 'Real-Life Simulations & Interactive Practice Tools', description: 'Promotes experiential learning with simulations that replicate actual government portals and industry workflows.' },
            { title: 'Certifications Endorsed by MEPSC, BFSI SSC & NCVET', description: 'All certifications are approved and endorsed by recognized national skill development bodies under Govt. of India.' },
            { title: 'Course Certificates with Government Endorsements', description: 'Learners receive certificates backed by BFSI SSC, NCVET and MEPSC — recognized by employers nationwide.' },
            { title: 'Digital India Mission Endorsed', description: 'Ministry of Skill Development and Entrepreneurship recommended our Essentials of Digital Statutory e-Filing course under the Digital India Mission by Govt. of India.' },
          ].map((card, idx) => (
            <motion.div key={idx}
              style={{ background: '#111', border: '1px solid #1f1f1f', borderRadius: '16px', padding: '32px 28px', transition: 'border-color 0.3s, transform 0.3s' }}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ borderColor: '#7C3AED', y: -4 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <div style={{ width: '40px', height: '3px', background: '#7C3AED', borderRadius: '2px', marginBottom: '20px' }} />
              <h3 style={{ color: '#fff', fontFamily: 'Syne, sans-serif', fontSize: '16px', fontWeight: 700, lineHeight: 1.4, marginBottom: '12px' }}>{card.title}</h3>
              <p style={{ color: '#A0A0A0', fontFamily: 'Manrope, sans-serif', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>{card.description}</p>
            </motion.div>
          ))}
        </div>

        <div style={{ marginTop: '60px', overflow: 'hidden', padding: '24px 0' }}>
          <div className="partners-marquee-inner">
            {[...topics, ...topics].map((topic, idx) => (
              <span key={idx} style={{ background: '#111', border: '1px solid #222', color: '#E0E0E0', borderRadius: '50px', padding: '10px 22px', fontSize: '13px', whiteSpace: 'nowrap', margin: '0 10px', flexShrink: 0 }}>
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── CONTACT ────────────────────────────────────────────────────────────────
const ContactSection = () => {
  const ref = useRef(null)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', institution: '', designation: '', interest: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.institution ||
      !formData.designation ||
      !formData.interest
    ) {
      setError('Please fill in all fields before submitting.')
      return
    }
    setError('')
    setLoading(true)

    emailjs.send(
      'service_13glyta',
      'template_qga3uz3',
      {
        from_name:   formData.name,
        from_email:  formData.email,
        phone:       formData.phone,
        institution: formData.institution,
        designation: formData.designation,
        interest:    formData.interest,
      },
      'EpvF2-AfO0ADuqSMu'
    )
    .then(() => {
      setSubmitted(true)
      setLoading(false)
      setFormData({
        name: '', email: '', phone: '',
        institution: '', designation: '', interest: ''
      })
      setTimeout(() => setSubmitted(false), 6000)
    })
    .catch((err) => {
      console.error('EmailJS error:', err)
      setError('Something went wrong. Please email us at info@annviltechnologies.com')
      setLoading(false)
    })
  }

  const inputStyle = {
    width: '100%', padding: '12px 16px', borderRadius: '8px',
    border: '1.5px solid #D1D5DB', fontSize: '15px', outline: 'none',
    fontFamily: 'Manrope, sans-serif', boxSizing: 'border-box',
    color: '#111', background: '#fff', transition: 'border-color 0.2s',
  }

  const labelStyle = {
    display: 'block', marginBottom: '8px', fontWeight: 600,
    fontSize: '14px', color: '#111', fontFamily: 'Manrope, sans-serif',
  }

  const contactItems = [
    { icon: <PhoneIcon />, label: 'Phone', value: '0422 4366636' },
    { icon: <MailIcon />, label: 'Email', value: 'info@annviltechnologies.com' },
    { icon: <MapPinIcon />, label: 'Coimbatore', value: '1st floor, PNR Edifice, 3A/1, GD Naidu Street, Race Course – 641018' },
    { icon: <MapPinIcon />, label: 'Delhi', value: 'Unit No.247, 2nd floor, D21 Corporate Park, Sector 21, Dwarka – 110077' },
  ]

  return (
    <section id="contact" ref={ref} style={{ background: colors.lightBg, padding: '96px 80px', fontFamily: 'Manrope, sans-serif' }}>
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} style={{ marginBottom: '60px', textAlign: 'center' }}>
        <div style={{ fontSize: '12px', color: colors.blue, fontWeight: 700, letterSpacing: '2px', marginBottom: '12px' }}>CONTACT US</div>
        <h2 style={{ fontSize: '38px', fontWeight: 800, color: colors.textDark, marginBottom: '16px', fontFamily: 'Manrope, sans-serif' }}>
          Let's Transform Your Commerce &amp; Finance Department
        </h2>
        <p style={{ fontSize: '16px', color: '#374151', fontFamily: 'Manrope, sans-serif', maxWidth: 560, margin: '0 auto' }}>
          Reach out for FDP registrations, institutional partnerships, demo requests. Our team responds within 24 hours.
        </p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        {/* Form */}
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                background: '#FEE2E2',
                border: '1px solid #FCA5A5',
                color: '#991B1B',
                padding: '14px 16px',
                borderRadius: '8px',
                textAlign: 'center',
                marginBottom: '16px',
                fontWeight: 600,
                fontFamily: 'Manrope, sans-serif',
                fontSize: '14px'
              }}
            >
              {error}
            </motion.div>
          )}
          {submitted && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              style={{ background: '#22c55e', color: '#fff', padding: '16px', borderRadius: '8px', textAlign: 'center', marginBottom: '16px', fontWeight: 600 }}>
              Thank you! We'll contact you within 24 hours.
            </motion.div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { name: 'name', label: 'Full Name', type: 'text' },
              { name: 'email', label: 'Email Address', type: 'email' },
              { name: 'phone', label: 'Phone Number', type: 'tel' },
              { name: 'institution', label: 'Institution / College Name', type: 'text' },
            ].map(field => (
              <div key={field.name}>
                <label style={labelStyle}>{field.label}</label>
                <input type={field.type} name={field.name} value={formData[field.name]} onChange={handleChange}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = colors.blue}
                  onBlur={e => e.target.style.borderColor = '#D1D5DB'} />
              </div>
            ))}

            <div>
              <label style={labelStyle}>Designation</label>
              <select name="designation" value={formData.designation} onChange={handleChange}
                style={{ ...inputStyle, cursor: 'pointer' }}
                onFocus={e => e.target.style.borderColor = colors.blue}
                onBlur={e => e.target.style.borderColor = '#D1D5DB'}>
                <option value="">Select Designation</option>
                <option value="hod">HoD</option>
                <option value="principal">Principal</option>
                <option value="faculty">Faculty</option>
                <option value="director">Director</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>I'm Interested In</label>
              <select name="interest" value={formData.interest} onChange={handleChange}
                style={{ ...inputStyle, cursor: 'pointer' }}
                onFocus={e => e.target.style.borderColor = colors.blue}
                onBlur={e => e.target.style.borderColor = '#D1D5DB'}>
                <option value="">Select Interest</option>
                <option value="fdp">FDP Registration</option>
                <option value="nergy">Nergy Vidya Integration</option>
                <option value="bfsi">BFSI Certification</option>
                <option value="demo">Platform Demo</option>
                <option value="partnership">Institutional Partnership</option>
                <option value="general">General Enquiry</option>
              </select>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                background: loading ? '#93C5FD' : colors.blue,
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '14px 28px',
                fontWeight: 700,
                fontSize: '16px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: 'Manrope, sans-serif',
                marginTop: '12px',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                transition: 'background 0.2s',
                opacity: loading ? 0.85 : 1,
              }}
              onMouseEnter={e => {
                if (!loading) e.currentTarget.style.background = colors.blueDark
              }}
              onMouseLeave={e => {
                if (!loading) e.currentTarget.style.background = colors.blue
              }}
            >
              {loading ? (
                <>
                  <span style={{
                    width: 18,
                    height: 18,
                    border: '2.5px solid rgba(255,255,255,0.3)',
                    borderTopColor: '#fff',
                    borderRadius: '50%',
                    display: 'inline-block',
                    animation: 'spin 0.7s linear infinite',
                    flexShrink: 0,
                  }} />
                  Sending your enquiry...
                </>
              ) : (
                'Submit Enquiry'
              )}
            </button>
          </div>
        </motion.div>

        {/* Contact info card with icons */}
        <motion.div
          style={{ background: '#0F172A', borderRadius: '20px', padding: '40px', color: '#fff', height: 'fit-content', border: '1px solid #1E293B' }}
          initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>

          <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '22px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
            Get in Touch
          </h3>
          <p style={{ fontSize: '14px', color: '#94A3B8', marginBottom: '32px', lineHeight: 1.6 }}>
            We'd love to hear from you. Our team is here to help.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {contactItems.map((item, idx) => (
              <div key={idx} style={{
                display: 'flex', gap: '14px', alignItems: 'flex-start',
                padding: '18px 0',
                borderBottom: idx < contactItems.length - 1 ? '1px solid #1E293B' : 'none',
              }}>
                <div style={{
                  width: '42px', height: '42px', background: '#1E293B', borderRadius: '10px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, color: '#60A5FA',
                }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px', fontFamily: 'Manrope, sans-serif' }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: '14px', color: '#E2E8F0', fontWeight: 500, lineHeight: 1.5, fontFamily: 'Manrope, sans-serif' }}>
                    {item.value}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '28px', background: '#1E293B', borderRadius: '10px', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />
            <span style={{ fontSize: '13px', color: '#CBD5E1', fontFamily: 'Manrope, sans-serif', fontWeight: 500 }}>
              We respond to all enquiries within 24 hours
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ── FOOTER ─────────────────────────────────────────────────────────────────
const Footer = () => {
  const scrollToSection = id => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer style={{ background: colors.darkBg, color: '#fff', padding: '48px 80px', fontFamily: 'Manrope, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src={annvilLogo} style={{ height: '32px', objectFit: 'contain' }} alt="Annvil" onError={e => { e.target.style.display = 'none' }} />
          <div style={{ fontWeight: 800, fontSize: '18px' }}>Annvil Technologies</div>
        </div>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          {['Home','About','What We Provide','Certifications','Partners','Contact'].map((link, idx) => (
            <button key={link}
              onClick={() => scrollToSection(['home','about','what-we-provide','certifications','partners','contact'][idx])}
              style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', fontSize: '14px', fontFamily: 'Manrope, sans-serif', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#fff'}
              onMouseLeave={e => e.target.style.color = '#9CA3AF'}>
              {link}
            </button>
          ))}
        </div>
        <div style={{ color: '#6B7280', fontSize: '14px' }}>Powered by Nergy Vidya</div>
      </div>
      <div style={{ borderTop: '1px solid #1F2937', marginBottom: '24px' }} />
      <div style={{ fontSize: '13px', color: '#6B7280', textAlign: 'center' }}>
        © 2025 Annvil Technologies – Business Solutions and Systems PVT LTD | Certified by BFSI SSC
      </div>
    </footer>
  )
}

// ── APP ────────────────────────────────────────────────────────────────────
export default function App() {
  const [showCourses, setShowCourses] = useState(false)

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'

    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800;900&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)

    const heroStyle = document.createElement('style')
    heroStyle.id = 'hero-marquee-style'
    heroStyle.textContent = `
      @keyframes scrollUp {
        0% { transform: translateY(0) }
        100% { transform: translateY(-50%) }
      }
      @keyframes spin {
        to { transform: rotate(360deg) }
      }
    `
    document.head.appendChild(heroStyle)

    return () => {
      if (link.parentNode) document.head.removeChild(link)
      const s = document.querySelector('#hero-marquee-style')
      if (s && s.parentNode) document.head.removeChild(s)
    }
  }, [])

  if (showCourses) return <CoursesPage onBack={() => setShowCourses(false)} />

  return (
    <div style={{ background: colors.darkBg }}>
      <Navbar />
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <WhatWeProvideSection />
      <CertificationsSection onExplore={() => setShowCourses(true)} />
      <PartnersSection />
      <ContactSection />
      <Footer />
    </div>
  )
}