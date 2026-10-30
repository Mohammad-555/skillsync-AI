/**
 * SkillSync Email Dispatch Service
 * Handles password reset OTP and verification email delivery via:
 * 1. Resend API (requires verified domain to send to external Gmail accounts)
 * 2. EmailJS (free client-side dispatch via personal Gmail, no domain required)
 * 3. Supabase Auth (built-in mailer or custom Gmail SMTP)
 */

import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

export const sendPasswordResetEmail = async (email, otp) => {
  const cleanEmail = (email || '').trim().toLowerCase();
  const resendApiKey = import.meta.env.VITE_RESEND_API_KEY;
  const emailjsServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const emailjsTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const emailjsPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  let resendSuccess = false;
  let resendError = null;
  let emailjsSuccess = false;
  let emailjsError = null;
  let supabaseSuccess = false;
  let supabaseError = null;

  // 1. Direct Resend API
  if (resendApiKey) {
    try {
      const fromEmail = import.meta.env.VITE_RESEND_FROM || 'SkillSync AI <onboarding@resend.dev>';
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [cleanEmail],
          subject: `Your SkillSync AI Verification Code: ${otp}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 540px; margin: 0 auto; padding: 2rem; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 24px;">
                <h1 style="color: #7c3aed; font-size: 24px; margin: 0; font-weight: 800;">SkillSync<span style="color: #10b981;">AI</span></h1>
              </div>
              <h2 style="color: #1e293b; font-size: 20px; font-weight: 700; margin-bottom: 12px;">Reset Your Password</h2>
              <p style="color: #475569; font-size: 15px; line-height: 1.6; margin-bottom: 24px;">
                We received a request to reset your SkillSync AI account password. Use the 6-digit verification code below to complete the reset:
              </p>
              <div style="background: #f8fafc; border: 2px dashed #cbd5e1; border-radius: 8px; padding: 18px; text-align: center; margin-bottom: 24px;">
                <span style="font-family: monospace; font-size: 36px; font-weight: 900; letter-spacing: 8px; color: #7c3aed;">${otp}</span>
              </div>
              <p style="color: #64748b; font-size: 13px; line-height: 1.5; margin-bottom: 0;">
                ⏱️ This code will expire in <strong>15 minutes</strong>. If you did not request a password reset, you can safely ignore this email.
              </p>
            </div>
          `
        })
      });

      const resData = await res.json();
      if (res.ok) {
        resendSuccess = true;
      } else {
        resendError = resData.message || 'Resend API rejected request';
        console.warn('Resend email error:', resData);
      }
    } catch (err) {
      resendError = err.message;
      console.warn('Resend fetch failed:', err);
    }
  }

  // 2. EmailJS Client-side dispatch (Direct Gmail delivery without custom domain)
  if (emailjsServiceId && emailjsTemplateId && emailjsPublicKey) {
    try {
      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          service_id: emailjsServiceId,
          template_id: emailjsTemplateId,
          user_id: emailjsPublicKey,
          template_params: {
            to_email: cleanEmail,
            otp_code: otp,
            expiry_minutes: 15,
            app_name: 'SkillSync AI'
          }
        })
      });

      if (res.ok) {
        emailjsSuccess = true;
      } else {
        const errorText = await res.text();
        emailjsError = errorText || 'EmailJS dispatch failed';
        console.warn('EmailJS error:', errorText);
      }
    } catch (err) {
      emailjsError = err.message;
      console.warn('EmailJS fetch failed:', err);
    }
  }

  // 3. Supabase Auth password reset dispatch
  if (isSupabaseConfigured()) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
        redirectTo: `${window.location.origin}/#reset-password`
      });

      if (!error) {
        supabaseSuccess = true;
      } else {
        supabaseError = error.message;
        console.warn('Supabase resetPasswordForEmail notice:', error);
      }
    } catch (err) {
      supabaseError = err.message;
      console.warn('Supabase auth reset error:', err);
    }
  }

  const dispatched = resendSuccess || emailjsSuccess || supabaseSuccess;

  return {
    success: dispatched,
    resendSuccess,
    resendError,
    emailjsSuccess,
    emailjsError,
    supabaseSuccess,
    supabaseError
  };
};
