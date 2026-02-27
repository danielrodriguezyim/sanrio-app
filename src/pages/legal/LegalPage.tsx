import { useLocation } from 'react-router-dom';
import { motion }       from 'framer-motion';

import { ROUTES } from '../../router/routes';
import './LegalPage.css';

interface LegalSection {
  heading: string;
  body:    string;
}

interface LegalContent {
  title:    string;
  updated:  string;
  intro:    string;
  sections: LegalSection[];
}

const TOS_CONTENT: LegalContent = {
  title:   'Terms of Service',
  updated: 'January 1, 2025',
  intro:   'By accessing or using this website, you agree to be bound by these Terms of Service. Please read them carefully before proceeding.',
  sections: [
    {
      heading: '1. Use of the Site',
      body:    'This site is intended for personal, non-commercial use only. You may not reproduce, distribute, or create derivative works from any content without prior written permission from Sanrio Co., Ltd.',
    },
    {
      heading: '2. Intellectual Property',
      body:    'All characters, logos, artwork, and content displayed on this website are the exclusive property of Sanrio Co., Ltd. and are protected by applicable intellectual property laws worldwide.',
    },
    {
      heading: '3. Limitation of Liability',
      body:    'To the fullest extent permitted by law, Sanrio shall not be liable for any indirect, incidental, or consequential damages arising from your use of this website.',
    },
    {
      heading: '4. Changes to Terms',
      body:    'We reserve the right to update these Terms at any time. Continued use of the site following any changes constitutes your acceptance of the revised Terms.',
    },
  ],
};

const PRIVACY_CONTENT: LegalContent = {
  title:   'Privacy Policy',
  updated: 'January 1, 2025',
  intro:   'We are committed to protecting your personal information. This policy explains what data we collect, how we use it, and your rights in relation to it.',
  sections: [
    {
      heading: '1. Information We Collect',
      body:    'We may collect your name, email address, and message content when you use our contact form. We also collect anonymous usage data through cookies to improve your experience.',
    },
    {
      heading: '2. How We Use Your Data',
      body:    'Your data is used solely to respond to your enquiries and to improve our services. We do not sell or share your personal information with third parties for marketing purposes.',
    },
    {
      heading: '3. Data Retention',
      body:    'Contact messages are retained for up to 12 months. You may request deletion of your data at any time by contacting us directly.',
    },
    {
      heading: '4. Your Rights',
      body:    'Depending on your location, you may have the right to access, correct, or erase your personal data. Please reach out via our Contact page to exercise these rights.',
    },
  ],
};

const LegalPage = () => {
  const { pathname } = useLocation();
  const content = pathname === ROUTES.PRIVACY ? PRIVACY_CONTENT : TOS_CONTENT;

  return (
    <div className="legal-page">
      <section className="legal-page__hero">
        <div className="container legal-page__hero-inner">
          <motion.h1
            className="legal-page__title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {content.title}
          </motion.h1>
          <motion.p
            className="legal-page__updated"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Last updated: {content.updated}
          </motion.p>
        </div>
      </section>

      <section className="legal-page__body section">
        <div className="container container--narrow">
          <motion.p
            className="legal-page__intro"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
          >
            {content.intro}
          </motion.p>

          <div className="legal-page__sections">
            {content.sections.map((section, index) => (
              <motion.div
                key={section.heading}
                className="legal-page__section"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.07 }}
              >
                <h2 className="legal-page__section-heading">{section.heading}</h2>
                <p className="legal-page__section-body">{section.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LegalPage;
