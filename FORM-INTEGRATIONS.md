# Form Integrations Documentation

## Overview
This document describes the form integrations set up for the Grace Woodlands website, including Mailchimp newsletter signups and Resend email notifications.

## Forms Integrated

### 1. **Sign Up for Updates** (Newsletter Signup)
- **Location**: Main signup section on homepage
- **Fields**: Name, Email
- **Integrations**:
  - ✅ Mailchimp: Adds contact to mailing list
  - ✅ Resend: Sends internal notification email
- **Success Message**: "Thanks for signing up for the latest updates!"

### 2. **Contact Us Form**
- **Location**: Contact section on homepage
- **Fields**: First Name, Last Name, Email, Message
- **Integrations**:
  - ✅ Resend: Sends internal notification email with message details
- **Success Message**: "Thank you for your message! We'll get back to you soon."

### 3. **Plan Your Visit Modal**
- **Location**: Modal popup (triggered by "Plan Your Visit" button)
- **Fields**: Name, Phone, Email
- **Integrations**:
  - ✅ Resend: Sends internal notification email
- **Success Message**: Confirmation screen with visit details

---

## API Configuration

All API keys and sensitive configuration are stored in `.env.local` (not committed to git).

### Environment Variables Required

Create a `.env.local` file in the project root with:

```env
# Mailchimp Configuration
MAILCHIMP_API_KEY=your_mailchimp_api_key
MAILCHIMP_SERVER=us14
MAILCHIMP_AUDIENCE_ID=your_audience_id

# Resend Configuration
RESEND_API_KEY=your_resend_api_key

# Notification Email
NOTIFICATION_EMAIL=your_notification_email
```

### Current Configuration Status
- **Mailchimp**: ✅ Configured with audience ID
- **Resend Domain**: `gracewoodlands.com` ✅ Verified
- **From Address**: `notifications@gracewoodlands.com`

---

## API Routes Created

### `/api/signup` (POST)
Handles newsletter signups with Mailchimp integration.

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Thanks for signing up for the latest updates!"
}
```

### `/api/contact` (POST)
Handles contact form submissions.

**Request Body**:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "message": "Hello, I have a question..."
}
```

**Response**:
```json
{
  "success": true,
  "message": "Thank you for your message! We'll get back to you soon."
}
```

### `/api/plan-visit` (POST)
Handles visit planning submissions.

**Request Body**:
```json
{
  "name": "John Doe",
  "phone": "(555) 123-4567",
  "email": "john@example.com"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Thank you! We're excited to see you at Grace Church!"
}
```

---

## Email Notification Templates

All notification emails include:
- Grace Church logo (from gracewoodlands.com)
- Brand colors (gold #AE8F63, brown #493824)
- Professional internal notification styling
- Submitted form data in a clean, readable format
- Footer with church address

### Email Subjects:
- Newsletter Signup: "🔔 New Newsletter Signup"
- Contact Form: "📧 New Contact Form Message"
- Plan Visit: "🏛️ New Visit Planned"

---

## Configuration Status

### ✅ Mailchimp - CONFIGURED
- Audience ID: `8ca40fc576`
- API configured and working

### ✅ Resend - CONFIGURED
- Domain: `gracewoodlands.com` (verified)
- All API routes updated to use production domain

## Next Steps

### 1. Update Notification Recipients (When Ready for Production)
Currently all notifications go to `jonathan@jpierce.dev`. To change:
- Edit each API route file
- Update the `to` field in the `resend.emails.send()` call
- Can add multiple recipients: `to: ['email1@example.com', 'email2@example.com']`
- Files to update:
  - `/app/api/signup/route.ts` (line ~48)
  - `/app/api/contact/route.ts` (line ~24)
  - `/app/api/plan-visit/route.ts` (line ~24)

### 2. Test the Forms
1. Visit http://localhost:3000
2. Fill out each form
3. Check that:
   - Success messages appear
   - Emails arrive at jonathan@jpierce.dev
   - Contacts appear in Mailchimp (for signup form)

---

## Files Modified/Created

### Created:
- `/app/api/signup/route.ts` - Newsletter signup API
- `/app/api/contact/route.ts` - Contact form API
- `/app/api/plan-visit/route.ts` - Plan visit API
- `/types/mailchimp.d.ts` - TypeScript definitions for Mailchimp

### Modified:
- `/components/pages/Home.tsx` - Updated form handlers to call APIs
- `/package.json` - Added dependencies

### Dependencies Added:
- `@mailchimp/mailchimp_marketing` - Mailchimp API client
- `resend` - Email sending service

---

## Troubleshooting

### Mailchimp Errors
- **"Invalid List ID"**: Update the list ID in `/app/api/signup/route.ts`
- **"API Key Invalid"**: Verify the API key is correct and active

### Resend Errors
- **"Domain not verified"**: Verify gracewoodlands.com in Resend dashboard
- **"Invalid API Key"**: Check that the API key is correct

### Form Not Submitting
- Check browser console for errors
- Verify API routes are accessible at `/api/*`
- Check server logs for detailed error messages

