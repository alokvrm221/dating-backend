const nodemailer = require('nodemailer');
const logger = require('./logger');

/**
 * Email Service
 */

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  /**
   * Send email
   * @param {Object} options - Email options
   */
  async sendEmail(options) {
    try {
      const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
      };

      const info = await this.transporter.sendMail(mailOptions);
      logger.info(`Email sent: ${info.messageId}`);
      return info;
    } catch (error) {
      logger.error(`Email send error: ${error.message}`);
      throw error;
    }
  }

  /**
   * Send welcome email
   */
  async sendWelcomeEmail(user) {
    const options = {
      to: user.email,
      subject: 'Welcome to Our Dating App!',
      html: `
        <h1>Welcome ${user.firstName}!</h1>
        <p>Thank you for joining our dating community.</p>
        <p>Start exploring and find your perfect match!</p>
      `,
    };

    return this.sendEmail(options);
  }

  /**
   * Send password reset email
   */
  async sendPasswordResetEmail(user, resetToken) {
    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

    const options = {
      to: user.email,
      subject: 'Password Reset Request',
      html: `
        <h1>Password Reset</h1>
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `,
    };

    return this.sendEmail(options);
  }

  /**
   * Send account deletion confirmation
   */
  async sendAccountDeletionEmail(user) {
    const options = {
      to: user.email,
      subject: 'Account Deleted',
      html: `
        <h1>Account Deleted</h1>
        <p>Your account has been successfully deleted.</p>
        <p>We're sorry to see you go. If you change your mind, you can always create a new account.</p>
      `,
    };

    return this.sendEmail(options);
  }
}

module.exports = new EmailService();

