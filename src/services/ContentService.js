/**
 * Content Service
 * Handles static content like terms, privacy policy, etc.
 */
class ContentService {
  /**
   * Get Terms and Conditions
   */
  getTermsAndConditions() {
    return {
      title: 'Terms and Conditions',
      lastUpdated: '2026-01-01',
      sections: [
        {
          heading: '1. Acceptance of Terms',
          content:
            'By accessing and using this dating application, you accept and agree to be bound by the terms and provision of this agreement.',
        },
        {
          heading: '2. Use License',
          content:
            'Permission is granted to temporarily use this application for personal, non-commercial purposes. You must be at least 18 years old to use this service.',
        },
        {
          heading: '3. User Conduct',
          content:
            'You agree not to use the service to: (a) upload or transmit any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable; (b) impersonate any person or entity; (c) forge headers or manipulate identifiers; (d) upload or transmit any material that contains viruses or any other computer code designed to interrupt, destroy or limit the functionality of any computer software or hardware.',
        },
        {
          heading: '4. Account Security',
          content:
            'You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.',
        },
        {
          heading: '5. Content Ownership',
          content:
            'You retain all rights to the content you upload. However, by uploading content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and display such content in connection with the service.',
        },
        {
          heading: '6. Privacy',
          content:
            'Your use of the application is also governed by our Privacy Policy. Please review our Privacy Policy to understand our practices.',
        },
        {
          heading: '7. Termination',
          content:
            'We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever.',
        },
        {
          heading: '8. Limitation of Liability',
          content:
            'In no event shall the application, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages.',
        },
        {
          heading: '9. Changes to Terms',
          content:
            'We reserve the right to modify or replace these Terms at any time. It is your responsibility to check these Terms periodically for changes.',
        },
        {
          heading: '10. Contact Us',
          content:
            'If you have any questions about these Terms, please contact us at support@datingapp.com',
        },
      ],
    };
  }

  /**
   * Get Privacy Policy
   */
  getPrivacyPolicy() {
    return {
      title: 'Privacy Policy',
      lastUpdated: '2026-01-01',
      sections: [
        {
          heading: '1. Information We Collect',
          content:
            'We collect information you provide directly to us, including: name, email address, phone number, date of birth, gender, photos, location data, and other profile information. We also collect information about your usage of the service.',
        },
        {
          heading: '2. How We Use Your Information',
          content:
            'We use the information we collect to: (a) provide, maintain, and improve our services; (b) process transactions and send related information; (c) send you technical notices, updates, security alerts; (d) respond to your comments and questions; (e) provide customer service; (f) match you with other users.',
        },
        {
          heading: '3. Information Sharing',
          content:
            'We share your information with other users as part of the matching service. We do not sell your personal information to third parties. We may share information with service providers who perform services on our behalf.',
        },
        {
          heading: '4. Location Information',
          content:
            'We collect and use your location information to provide location-based features and to match you with nearby users. You can control location sharing through your device settings.',
        },
        {
          heading: '5. Data Security',
          content:
            'We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.',
        },
        {
          heading: '6. Data Retention',
          content:
            'We retain your information for as long as your account is active or as needed to provide you services. You can request deletion of your account at any time.',
        },
        {
          heading: '7. Your Rights',
          content:
            'You have the right to: (a) access your personal information; (b) correct inaccurate information; (c) delete your information; (d) object to processing; (e) data portability; (f) withdraw consent.',
        },
        {
          heading: '8. Cookies and Tracking',
          content:
            'We use cookies and similar tracking technologies to track activity on our service and hold certain information to improve and analyze our service.',
        },
        {
          heading: "9. Children's Privacy",
          content:
            'Our service is not intended for users under the age of 18. We do not knowingly collect information from children under 18.',
        },
        {
          heading: '10. Changes to Privacy Policy',
          content:
            'We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.',
        },
        {
          heading: '11. Contact Us',
          content:
            'If you have any questions about this Privacy Policy, please contact us at privacy@datingapp.com',
        },
      ],
    };
  }

  /**
   * Get Community Guidelines
   */
  getCommunityGuidelines() {
    return {
      title: 'Community Guidelines',
      lastUpdated: '2026-01-01',
      sections: [
        {
          heading: 'Be Yourself',
          content:
            'Make sure your photos, age, and bio are true to who you are. Authenticity is key to building genuine connections.',
        },
        {
          heading: 'Stay Safe',
          content:
            "Don't be too quick to give out personal information. Meet in public places for first dates and let friends know your plans.",
        },
        {
          heading: 'Be Respectful',
          content:
            "Treat everyone with respect. Don't engage in harassment, hate speech, or discriminatory behavior.",
        },
        {
          heading: 'Be Proactive',
          content:
            'Report anyone who violates our terms. Block and report users who make you uncomfortable.',
        },
        {
          heading: 'Prohibited Content',
          content:
            'Do not post: nudity or sexual content, violence or graphic content, hate speech, spam or scams, illegal activities.',
        },
      ],
    };
  }
}

module.exports = new ContentService();

