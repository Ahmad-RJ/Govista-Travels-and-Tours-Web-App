import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export async function sendEmail(
  name,
  email,
  destination,
  tourDate,
  numPeople,
  numDays,
  totalCost,
  phone
) {
  try {
    console.log("Preparing to send email to:", email);
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Tour Booking Confirmation - GoVista',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <div style="background-color: #3b82f6; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0;">GoVista</h1>
            <p style="color: white; margin: 5px 0 0 0;">Travel Booking Confirmation</p>
          </div>

          <div style="padding: 30px 20px;">
            <h2 style="color: #3b82f6; margin-top: 0;">Thank You for Booking!</h2>
            <p>Dear <strong>${name}</strong>,</p>
            <p>Your booking for a tour to <strong>${destination}</strong> has been received and is being processed.</p>

            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1f2937; margin-top: 0;">Booking Details:</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #6b7280;"><strong>Name:</strong></td>
                  <td style="padding: 8px 0;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280;"><strong>Email:</strong></td>
                  <td style="padding: 8px 0;">${email}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280;"><strong>Phone:</strong></td>
                  <td style="padding: 8px 0;">${phone}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280;"><strong>Destination:</strong></td>
                  <td style="padding: 8px 0;">${destination}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280;"><strong>Tour Date:</strong></td>
                  <td style="padding: 8px 0;">${tourDate}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280;"><strong>Number of People:</strong></td>
                  <td style="padding: 8px 0;">${numPeople}</td>
                </tr>
              </table>
            </div>

            <div style="background-color: #dbeafe; border-left: 4px solid #3b82f6; padding: 15px; margin: 20px 0;">
              <p style="margin: 0; color: #1e40af;">
                <strong>Important:</strong> Our travel team will contact you within 24 hours to finalize your itinerary and discuss accommodation options, activities, and payment details.
              </p>
            </div>

            <p>We look forward to making your journey unforgettable!</p>
            <p style="margin-top: 30px;">Best regards,<br><strong>The GoVista Team</strong></p>
          </div>

          <div style="background-color: #f9fafb; padding: 20px; border-radius: 0 0 10px 10px; text-align: center; border-top: 1px solid #e0e0e0;">
            <p style="margin: 0; color: #6b7280; font-size: 14px;">Contact Us</p>
            <p style="margin: 5px 0; color: #6b7280; font-size: 12px;">
              Email: support@govista.com | Phone: +92 300 1234567
            </p>
            <p style="margin: 5px 0; color: #6b7280; font-size: 12px;">
              Visit: www.govista.com
            </p>
          </div>
        </div>
      `,
    };

    console.log("Sending email to:", email);
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    return { success: true, message: 'Email sent successfully' };
  } catch (err) {
    console.error('Email sending failed:', err);
    return { success: false, message: 'Failed to send email', error: err.message };
  }
}

