import { motion } from 'framer-motion';

import ContactForm from '../../components/contact-form/ContactForm';
import MapEmbed    from '../../components/map-embed/MapEmbed';
import './Contact.css';

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const Contact = () => (
  <div className="contact">

    {/* ── Page header ── */}
    <section className="contact__hero">
      <div className="container contact__hero-inner">
        <motion.h1
          className="contact__hero-title"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          Say Hello ✦
        </motion.h1>
        <motion.p
          className="contact__hero-subtitle"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
        >
          Have a question, collaboration idea, or just want to share the love?
          We'd be delighted to hear from you.
        </motion.p>
      </div>
    </section>

    {/* ── Main content ── */}
    <section className="contact__body section">
      <div className="container">
        <div className="contact__grid">

          {/* Left — form */}
          <motion.div
            className="contact__form-col"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.15 }}
          >
            <h2 className="contact__col-heading">Send us a message</h2>
            <ContactForm />
          </motion.div>

          {/* Right — info + map */}
          <motion.div
            className="contact__info-col"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.25 }}
          >
            <div className="contact__info-cards">

              <div className="contact__info-card">
                <span className="contact__info-icon" aria-hidden="true">📍</span>
                <div>
                  <h3 className="contact__info-label">Address</h3>
                  <p className="contact__info-value">
                    1-6-1 Osaki, Shinagawa-ku,<br />Tokyo 141-8603, Japan
                  </p>
                </div>
              </div>

              <div className="contact__info-card">
                <span className="contact__info-icon" aria-hidden="true">✉︎</span>
                <div>
                  <h3 className="contact__info-label">Email</h3>
                  <p className="contact__info-value">hello@sanrio-fanstore.com</p>
                </div>
              </div>

              <div className="contact__info-card">
                <span className="contact__info-icon" aria-hidden="true">🕐</span>
                <div>
                  <h3 className="contact__info-label">Response time</h3>
                  <p className="contact__info-value">Within 2 business days</p>
                </div>
              </div>
            </div>

            <MapEmbed />
          </motion.div>

        </div>
      </div>
    </section>
  </div>
);

export default Contact;
