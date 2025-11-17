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

    console.log('Timed signup modal submission:', { name, email })

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Add to Mailchimp with high intent tag
    try {
      console.log('Attempting to add to Mailchimp...')
      const listId = process.env.MAILCHIMP_AUDIENCE_ID!
      const nameParts = name.split(' ')
      const firstName = nameParts[0]
      const lastName = nameParts.slice(1).join(' ') || ''

      const response = await mailchimp.lists.addListMember(listId, {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      })

      // Add high intent tag
      const subscriberHash = response.id
      await mailchimp.lists.updateListMemberTags(listId, subscriberHash, {
        tags: [{ name: 'Popup Modal - High Intent', status: 'active' }],
      })

      console.log('Successfully added to Mailchimp with high intent tag')
    } catch (mailchimpError: any) {
      console.error('Mailchimp error:', mailchimpError)
      // Continue even if Mailchimp fails
    }

    // Send HIGH INTENT notification email via Resend
    try {
      console.log('Attempting to send email via Resend...')
      const result = await resend.emails.send({
        from: 'Grace Woodlands <notifications@gracewoodlands.com>',
        to: ['jonathan@jpierce.dev', 'jpierce@gracewoodlands.com'],
        subject: '🔥 HIGH INTENT LEAD - Popup Modal Signup',
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
                          <div style="background-color: #ff4444; color: white; padding: 12px 20px; border-radius: 6px; margin-bottom: 20px; text-align: center; font-weight: 700; font-size: 16px;">
                            🔥 HIGH INTENT LEAD
                          </div>
                          <h2 style="margin: 0 0 20px 0; color: #493824; font-size: 24px; font-weight: 700;">New Popup Modal Signup</h2>
                          <p style="margin: 0 0 20px 0; color: #666; font-size: 16px; line-height: 1.5;">Someone signed up through the timed popup modal. <strong>This is a high-intent lead - they engaged within seconds of visiting!</strong></p>
                          
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
                          
                          <p style="margin: 20px 0 0 0; color: #999; font-size: 14px;">Reach out to welcome them! Contact: <a href="mailto:${email}" style="color: #AE8F63; text-decoration: none;">${email}</a></p>
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
      // Continue even if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Thanks for signing up for the latest updates!',
    })
  } catch (error: any) {
    console.error('Signup modal error:', error)
    return NextResponse.json(
      { error: 'Failed to sign up. Please try again.' },
      { status: 500 }
    )
  }
}

