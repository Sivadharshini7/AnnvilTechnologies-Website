import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import studentImg from './assets/images/student.png'

const courses = [
  { certificationName: 'Accounting for Beginners', courseName: 'Foundations of Financial Accounting and Business Records', tag: 'Foundation' },
  { certificationName: 'Advanced Financial Accounting and Reporting', courseName: 'Advanced Accounting for Business Entities', tag: 'Advanced' },
  { certificationName: 'Essentials of Personal Finance', courseName: 'Personal Financial Planning and Wealth Management', tag: 'Finance' },
  { certificationName: 'Essentials of GST Compliance', courseName: 'Goods and Services Tax Compliance and Practice', tag: 'Taxation' },
  { certificationName: 'Applied Costing and Cost Control', courseName: 'Principles of Cost and Management Accounting', tag: 'Costing' },
  { certificationName: 'Essentials of Digital Statutory e-Filing', courseName: 'Digital Statutory Compliance and e-Governance Systems', tag: 'Compliance' },
  { certificationName: 'MS Office', courseName: 'Advanced MS Office and Data Productivity Suite', tag: 'Technology' },
  { certificationName: 'Corporate Accounting and Corporate Compliance', courseName: 'Applied Corporate Accounting and Compliance Practice', tag: 'Corporate' },
  { certificationName: 'Direct Taxation in India', courseName: 'Applied Direct Taxation and Income Tax Compliance', tag: 'Taxation' },
  { certificationName: 'Corporate Accounting', courseName: 'Practical Corporate Accounting and Financial Reporting', tag: 'Corporate' },
  { certificationName: 'Indian Taxation and Tally', courseName: 'Indian Taxation with Tally Integration', tag: 'Taxation' },
  { certificationName: 'Essentials of Cost Accounting', courseName: 'Cost Accounting Fundamentals and Applications', tag: 'Costing' },
]

const tagColors = {
  Foundation: { bg: 'rgba(124,58,237,0.12)', color: '#A78BFA', border: 'rgba(124,58,237,0.25)' },
  Advanced:   { bg: 'rgba(37,99,235,0.12)', color: '#60A5FA', border: 'rgba(37,99,235,0.25)' },
  Finance:    { bg: 'rgba(16,185,129,0.12)', color: '#34D399', border: 'rgba(16,185,129,0.25)' },
  Taxation:   { bg: 'rgba(245,158,11,0.12)', color: '#FBBF24', border: 'rgba(245,158,11,0.25)' },
  Compliance: { bg: 'rgba(239,68,68,0.12)', color: '#F87171', border: 'rgba(239,68,68,0.25)' },
  Costing:    { bg: 'rgba(20,184,166,0.12)', color: '#2DD4BF', border: 'rgba(20,184,166,0.25)' },
  Technology: { bg: 'rgba(99,102,241,0.12)', color: '#818CF8', border: 'rgba(99,102,241,0.25)' },
  Corporate:  { bg: 'rgba(236,72,153,0.12)', color: '#F472B6', border: 'rgba(236,72,153,0.25)' },
}

const CoursesPage = ({ onBack }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [scrolled, setScrolled] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)

    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)

    const style = document.createElement('style')
    style.textContent = `
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { background: #000; }
      @keyframes shimmer {
        0% { transform: translateX(-100%) }
        100% { transform: translateX(100%) }
      }
      @keyframes floatUp {
        0%, 100% { transform: translateY(0px) }
        50% { transform: translateY(-12px) }
      }
      @keyframes pulse {
        0%, 100% { opacity: 0.5 }
        50% { opacity: 1 }
      }
      @keyframes slideInLeft {
        0% { opacity: 0; transform: translateX(-30px); }
        100% { opacity: 1; transform: translateX(0); }
      }
      @keyframes glow {
        0%, 100% { box-shadow: 0 0 20px rgba(124,58,237,0.3); }
        50% { box-shadow: 0 0 40px rgba(124,58,237,0.6); }
      }
    `
    document.head.appendChild(style)

    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      setShowScrollTop(window.scrollY > 400)
    }
    const onResize = () => setIsMobile(window.innerWidth < 768)

    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const navStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
    height: 68,
    padding: isMobile ? '0 20px' : '0 80px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    background: scrolled ? 'rgba(0,0,0,0.98)' : 'rgba(0,0,0,0.6)',
    backdropFilter: 'blur(24px)',
    borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
    boxShadow: scrolled ? '0 1px 60px rgba(0,0,0,0.6)' : 'none',
    transition: 'all 0.4s ease',
  }

  const goToContact = () => {
    onBack()
    setTimeout(() => {
      const contactSection = document.getElementById('contact')
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' })
      }
    }, 300)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{ minHeight: '100vh', background: '#000', fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* NAVBAR */}
      <nav style={navStyle}>
        <motion.button
          onClick={onBack}
          whileHover={{ x: -3 }}
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 700, color: '#fff', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.3px', display: 'flex', alignItems: 'center', gap: 8 }}
        >
          <span style={{ fontSize: 14, opacity: 0.6 }}>←</span> Annvil Technologies
        </motion.button>
        <motion.button
          onClick={onBack}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          style={{ background: '#fff', color: '#000', borderRadius: 8, padding: '9px 22px', fontSize: 13, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, border: 'none', cursor: 'pointer', letterSpacing: '0.3px' }}
        >
          ← Back to Home
        </motion.button>
      </nav>

      {/* COMPACT HERO */}
      <section style={{
        position: 'relative',
        background: 'radial-gradient(ellipse 80% 100% at 50% 0%, rgba(124,58,237,0.22) 0%, transparent 55%), #000',
        overflow: 'hidden',
        padding: isMobile ? '100px 20px 44px' : '108px 80px 44px',
        textAlign: 'center',
      }}>
        {/* Decorative rings */}
        <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', border: '1px solid rgba(124,58,237,0.07)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: 700, height: 700, borderRadius: '50%', border: '1px solid rgba(37,99,235,0.04)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 680, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid rgba(124,58,237,0.35)', background: 'rgba(124,58,237,0.08)', borderRadius: 50, padding: '5px 14px', marginBottom: 18 }}
          >
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#A78BFA', animation: 'pulse 2s infinite' }} />
            <span style={{ fontSize: 10, fontWeight: 700, color: '#C4B5FD', letterSpacing: 2.5, fontFamily: "'DM Sans', sans-serif" }}>BFSI SSC ENDORSED PROGRAMS</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? 38 : 56, fontWeight: 700, color: '#fff', lineHeight: 1.05, letterSpacing: '-0.5px', marginBottom: 12 }}
          >
            Our Certification{' '}
            <span style={{ background: 'linear-gradient(135deg, #A78BFA, #60A5FA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Programs</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.14 }}
            style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, maxWidth: 460, margin: '0 auto 24px', fontWeight: 400 }}
          >
            Industry-aligned certifications endorsed by NCVET and BFSI Sector Skill Council of India
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ display: 'inline-flex', gap: 0, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, overflow: 'hidden' }}
          >
            {[['12+', 'Programs'], ['60–150', 'Hours'], ['BFSI SSC', 'Endorsed']].map(([val, label], i) => (
              <div key={i} style={{ padding: '18px 26px', textAlign: 'center', borderRight: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.1, type: 'spring', stiffness: 100 }}
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 700, color: '#fff' }}>
                  {val}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: i * 0.12 + 0.2 }}
                  style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 4, letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 600 }}>
                  {label}
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* COURSES LIST + STUDENT IMAGE */}
      <section style={{ background: '#000', padding: isMobile ? '44px 20px 80px' : '60px 80px 100px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 56, alignItems: 'flex-start' }}>

            {/* LEFT — Course list */}
            <div style={{ flex: 1.2 }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                style={{ marginBottom: 32 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <div style={{ width: 30, height: 2, background: 'linear-gradient(90deg, #7C3AED, #2563EB)', borderRadius: 2 }} />
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#7C3AED', letterSpacing: 2.5, textTransform: 'uppercase' }}>All Courses</span>
                </div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? 32 : 44, fontWeight: 700, color: '#fff', letterSpacing: '-0.3px', lineHeight: 1.1 }}>
                  All Certification Programs
                </h2>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.48)', marginTop: 10, fontWeight: 400 }}>
                  {courses.length} hand-picked programs · Government endorsed · Industry trusted
                </p>
              </motion.div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {courses.map((course, index) => {
                  const tc = tagColors[course.tag] || tagColors.Foundation
                  const isHovered = hoveredIndex === index
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -28 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-30px' }}
                      transition={{ duration: 0.5, delay: index * 0.033, ease: [0.22, 1, 0.36, 1] }}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      style={{
                        position: 'relative',
                        background: isHovered ? '#ffffff' : '#f9f9f9',
                        border: isHovered ? '1px solid rgba(124,58,237,0.35)' : '1px solid rgba(218,218,218,1)',
                        borderRadius: 16,
                        padding: '18px 20px',
                        cursor: 'default',
                        transition: 'all 0.28s cubic-bezier(0.22, 1, 0.36, 1)',
                        overflow: 'hidden',
                        boxShadow: isHovered ? '0 12px 40px rgba(124,58,237,0.15), 0 0 0 1px rgba(124,58,237,0.1)' : '0 1px 4px rgba(0,0,0,0.04)',
                        transform: isHovered ? 'translateY(-2px) scale(1.01)' : 'translateY(0) scale(1)',
                      }}
                    >
                      {/* Left accent bar */}
                      <div style={{
                        position: 'absolute', left: 0, top: 12, bottom: 12,
                        width: 3, borderRadius: '0 3px 3px 0',
                        background: isHovered ? `linear-gradient(180deg, ${tc.color}, rgba(37,99,235,0.7))` : 'transparent',
                        transition: 'background 0.28s',
                      }} />

                      {/* Shimmer */}
                      {isHovered && (
                        <div style={{
                          position: 'absolute', inset: 0,
                          background: 'linear-gradient(105deg, transparent 40%, rgba(124,58,237,0.035) 50%, transparent 60%)',
                          animation: 'shimmer 1.6s ease infinite',
                          pointerEvents: 'none',
                        }} />
                      )}

                      <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14 }}>
                        <div style={{ flex: 1 }}>
                          {/* Tag */}
                          <div style={{ marginBottom: 8 }}>
                            <motion.span
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3 }}
                              style={{
                                fontSize: 9, fontWeight: 700, letterSpacing: 1.2,
                                padding: '4px 10px', borderRadius: 50,
                                background: 'rgba(37,99,235,0.12)', color: '#60A5FA',
                                border: '1px solid rgba(37,99,235,0.25)',
                                fontFamily: "'DM Sans', sans-serif",
                                textTransform: 'uppercase',
                                display: 'inline-block',
                              }}>
                              {course.tag}
                            </motion.span>
                          </div>

                          {/* Certification name — larger */}
                          <h3 style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: 18,
                            fontWeight: 700,
                            color: isHovered ? '#080808' : '#1a1a1a',
                            lineHeight: 1.25,
                            transition: 'color 0.2s',
                            marginBottom: 4,
                            letterSpacing: '-0.2px',
                          }}>
                            {course.certificationName}
                          </h3>

                          {/* Course name */}
                          <p style={{ fontSize: 12.5, color: isHovered ? '#444' : '#666', lineHeight: 1.5, fontFamily: "'DM Sans', sans-serif", fontWeight: 400, transition: 'color 0.2s' }}>
                            {course.courseName}
                          </p>
                        </div>

                        {/* Arrow */}
                        <motion.div
                          animate={{ x: isHovered ? 0 : -8, opacity: isHovered ? 1 : 0 }}
                          transition={{ duration: 0.2 }}
                          style={{ color: tc.color, fontSize: 20, flexShrink: 0 }}
                        >
                          →
                        </motion.div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* RIGHT — Student Image Card only */}
            {!isMobile && (
              <div style={{ flex: 0.75, position: 'sticky', top: 96, height: 'fit-content' }}>
                <motion.div
                  initial={{ opacity: 0, x: 40, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    borderRadius: 24,
                    overflow: 'hidden',
                    border: '1px solid rgba(124,58,237,0.2)',
                    background: 'linear-gradient(160deg, #0a0a14 0%, #000 100%)',
                    position: 'relative',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
                  }}
                >
                  {/* Purple glow */}
                  <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 50% at 50% 90%, rgba(124,58,237,0.1) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 1 }} />

                  {/* Enrollment badge */}
                  <div style={{ position: 'absolute', top: 18, left: 18, zIndex: 3, display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 50, padding: '6px 14px' }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', animation: 'pulse 2s infinite' }} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.85)', letterSpacing: 1.2, fontFamily: "'DM Sans', sans-serif" }}>ENROLLMENTS OPEN</span>
                  </div>



                  {/* Student Image */}
                  <div style={{ position: 'relative', zIndex: 2, minHeight: 380, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', overflow: 'hidden' }}>
                    <img
                      src={studentImg}
                      alt="Student"
                      style={{
                        width: '100%',
                        maxHeight: 440,
                        objectFit: 'cover',
                        objectPosition: 'top center',
                        display: 'block',
                      }}
                      onError={(e) => { e.target.style.display = 'none' }}
                    />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 90, background: 'linear-gradient(to top, #060610, transparent)', zIndex: 3 }} />
                  </div>

                  {/* Enquiry button only */}
                  <div style={{ position: 'relative', zIndex: 4, padding: '20px 24px 24px', background: 'rgba(6,6,16,0.95)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: '0 20px 50px rgba(124,58,237,0.7)' }}
                      whileTap={{ scale: 0.95 }}
                      onClick={goToContact}
                      style={{
                        width: '100%',
                        background: 'linear-gradient(135deg, #7C3AED 0%, #2563EB 100%)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 14,
                        padding: '16px',
                        fontSize: 16,
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 700,
                        cursor: 'pointer',
                        letterSpacing: '0.5px',
                        transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                      }}
                    >
                      Enquiry →
                    </motion.button>
                  </div>
                </motion.div>

                {/* Floating mini stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12 }}
                >
                  {[
                    { num: '50+', label: 'Partner Institutions' },
                    { num: '5+', label: 'Years Excellence' },
                  ].map((s, i) => (
                    <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '14px', textAlign: 'center' }}>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700, color: '#fff' }}>{s.num}</div>
                      <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.4)', marginTop: 3, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase' }}>{s.label}</div>
                    </div>
                  ))}
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* MOBILE ENQUIRY */}
      {isMobile && (
        <section style={{ background: '#050505', padding: '40px 20px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={goToContact}
            style={{
              background: 'linear-gradient(135deg, #7C3AED, #2563EB)',
              color: '#fff', border: 'none', borderRadius: 12, padding: '15px 40px',
              fontSize: 15, fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
              cursor: 'pointer', letterSpacing: '0.4px',
              boxShadow: '0 8px 30px rgba(124,58,237,0.4)',
            }}
          >
            Enquiry →
          </motion.button>
        </section>
      )}

      {/* FOOTER */}
      <footer style={{ background: '#000', borderTop: '1px solid rgba(255,255,255,0.06)', padding: isMobile ? '36px 20px' : '44px 80px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20, marginBottom: 28, paddingBottom: 28, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 700, color: '#fff' }}>Annvil Technologies</div>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {['About', 'What We Provide', 'Courses', 'Partners', 'Contact Us'].map(label => (
                <button key={label} onClick={() => onBack()} style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", padding: 0, transition: 'color 0.2s', fontWeight: 400 }} onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}>
                  {label}
                </button>
              ))}
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', fontFamily: "'DM Sans', sans-serif" }}>Powered by Nergy Vidya</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontFamily: "'DM Sans', sans-serif" }}>© 2025 Annvil Technologies – Business Solutions and Systems PVT LTD</span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontFamily: "'DM Sans', sans-serif" }}>Certified by BFSI SSC</span>
          </div>
        </div>
      </footer>

      {/* SCROLL TO TOP */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ position: 'fixed', bottom: 28, right: 28, width: 46, height: 46, background: 'linear-gradient(135deg, #7C3AED, #2563EB)', borderRadius: 12, border: 'none', cursor: 'pointer', color: '#fff', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 24px rgba(124,58,237,0.45)', zIndex: 999 }}
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default CoursesPage