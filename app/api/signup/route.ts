import { NextRequest, NextResponse } from 'next/server'
import mailchimp from '@mailchimp/mailchimp_marketing'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY!)

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY!,
  server: process.env.MAILCHIMP_SERVER!,
})

export async function POST(request: NextRequest) {
  try {
    const { name, email } = await request.json()

    console.log('Signup form submission:', { name, email })

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Add to Mailchimp
    try {
      console.log('Attempting to add to Mailchimp...')
      const listId = process.env.MAILCHIMP_AUDIENCE_ID!
      
      await mailchimp.lists.addListMember(listId, {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: name.split(' ')[0] || name,
          LNAME: name.split(' ').slice(1).join(' ') || '',
        },
      })
    } catch (mailchimpError: any) {
      console.error('Mailchimp error:', mailchimpError)
      // Continue even if Mailchimp fails - we still want to send notification
    }

    // Send notification email via Resend
    try {
      console.log('Attempting to send email via Resend...')
      const result = await resend.emails.send({
        from: 'Grace Woodlands <notifications@gracewoodlands.com>',
        to: [process.env.NOTIFICATION_EMAIL!],
        subject: '🔔 New Newsletter Signup',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px;">
                <tr>
                  <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                      <!-- Header -->
                      <tr>
                        <td style="background-color: #AE8F63; padding: 30px; text-align: center;">
                          <img src="https://gracewoodlands.com/wp-content/uploads/2024/01/Grace-Church-Logo-White.png" alt="Grace Church" style="max-width: 200px; height: auto;">
                        </td>
                      </tr>
                      
                      <!-- Content -->
                      <tr>
                        <td style="padding: 40px 30px;">
                          <h2 style="margin: 0 0 20px 0; color: #493824; font-size: 24px; font-weight: 700;">New Newsletter Signup</h2>
                          <p style="margin: 0 0 20px 0; color: #666; font-size: 16px; line-height: 1.5;">Someone just signed up for updates on the Grace Woodlands website.</p>
                          
                          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9f9f9; border-radius: 6px; padding: 20px; margin: 20px 0;">
                            <tr>
                              <td>
                                <p style="margin: 0 0 10px 0; color: #493824; font-size: 14px; font-weight: 600;">Name:</p>
                                <p style="margin: 0 0 20px 0; color: #333; font-size: 16px;">${name}</p>
                                
                                <p style="margin: 0 0 10px 0; color: #493824; font-size: 14px; font-weight: 600;">Email:</p>
                                <p style="margin: 0; color: #333; font-size: 16px;">${email}</p>
                              </td>
                            </tr>
                          </table>
                          
                          <p style="margin: 20px 0 0 0; color: #999; font-size: 14px;">This contact has been added to your Mailchimp list.</p>
                        </td>
                      </tr>
                      
                      <!-- Footer -->
                      <tr>
                        <td style="background-color: #f9f9f9; padding: 20px 30px; text-align: center; border-top: 1px solid #e0e0e0;">
                          <p style="margin: 0; color: #999; font-size: 12px;">Grace Church | 24400 Interstate 45 N, The Woodlands, TX 77386</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
          </html>
        `,
      })
      console.log('Email sent successfully via Resend:', result)
    } catch (resendError: any) {
      console.error('Resend error:', resendError)
      console.error('Resend error details:', JSON.stringify(resendError, null, 2))
      // Continue even if email notification fails
    }

    return NextResponse.json({
      success: true,
      message: 'Thanks for signing up for the latest updates!',
    })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Failed to process signup. Please try again.' },
      { status: 500 }
    )
  }
}

