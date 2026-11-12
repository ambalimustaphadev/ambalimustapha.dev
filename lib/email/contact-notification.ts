// Notification email sent to the site owner when the contact form is submitted.
// Email clients (Gmail especially) strip <style> blocks in some contexts and
// ignore most modern CSS, so the layout is table-based with inline styles; the
// small <style> block only adds progressive enhancements for mobile widths.

export type ContactNotification = {
  name: string;
  email: string;
  message: string;
};

const SIGNATURE_NAME = "Mustapha Ambali";
const SIGNATURE_ROLE = "Software Developer";
const SIGNATURE_URL = "https://www.ambalimustapha.dev";
const SIGNATURE_URL_LABEL = "www.ambalimustapha.dev";

// Mirrors the site's dark theme and primary accent (styles/scss/default/_variables.scss).
const COLOR = {
  canvas: "#eef0f3",
  header: "#0f1218",
  headerMuted: "#8a93a3",
  accent: "#ff014f",
  card: "#ffffff",
  heading: "#141414",
  body: "#2a2d31",
  muted: "#5d6570",
  border: "#e4e7eb",
  messageBg: "#f6f7f9",
};

const FONT_STACK =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

/** Escapes text for safe use in HTML element content and double-quoted attributes. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Builds a mailto: URL addressed to the visitor. Every component is
 * percent-encoded (RFC 6068); "@" is left readable since it's valid there and
 * some clients mishandle "%40" in the address part.
 */
export function buildReplyMailto(email: string, name: string): string {
  const address = encodeURIComponent(email).replace(/%40/g, "@");
  const subject = encodeURIComponent(`Re: Your message to ${SIGNATURE_NAME}`);
  const body = encodeURIComponent(`Hi ${name},\n\n`);
  return `mailto:${address}?subject=${subject}&body=${body}`;
}

export function buildContactNotificationText({
  name,
  email,
  message,
}: ContactNotification): string {
  return [
    "NEW ENQUIRY",
    "You've got a new message from your portfolio.",
    "",
    "FROM",
    `Name:  ${name}`,
    `Email: ${email}`,
    "",
    "MESSAGE",
    message,
    "",
    `Reply to sender: ${email}`,
    "(Replying to this email also goes straight to them.)",
    "",
    "—",
    SIGNATURE_NAME,
    SIGNATURE_ROLE,
    SIGNATURE_URL,
  ].join("\n");
}

export function buildContactNotificationHtml({
  name,
  email,
  message,
}: ContactNotification): string {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  // Escape first, then turn newlines into <br> so line breaks survive in every client.
  const safeMessage = escapeHtml(message).replace(/\r\n|\r|\n/g, "<br>");
  const replyHref = escapeHtml(buildReplyMailto(email, name));
  const preheader = escapeHtml(
    `New enquiry from ${name}: ${message.slice(0, 90)}${message.length > 90 ? "…" : ""}`,
  );

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>New enquiry from ${safeName}</title>
<style>
  @media only screen and (max-width: 620px) {
    .ma-shell { padding: 16px 10px !important; }
    .ma-pad { padding-left: 22px !important; padding-right: 22px !important; }
    .ma-heading { font-size: 24px !important; line-height: 30px !important; }
    .ma-label { display: block !important; width: auto !important; padding-bottom: 2px !important; }
    .ma-value { display: block !important; width: auto !important; }
    .ma-button { display: block !important; text-align: center !important; }
  }
</style>
</head>
<body style="margin:0; padding:0; background-color:${COLOR.canvas}; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%;">
<div style="display:none; max-height:0; max-width:0; overflow:hidden; opacity:0; mso-hide:all; font-size:1px; line-height:1px; color:${COLOR.canvas};">${preheader}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${COLOR.canvas};">
  <tr>
    <td class="ma-shell" align="center" style="padding:32px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; width:100%; background-color:${COLOR.card}; border-radius:12px; overflow:hidden; border:1px solid ${COLOR.border};">

        <!-- Header -->
        <tr>
          <td class="ma-pad" style="background-color:${COLOR.header}; padding:28px 36px 32px; font-family:${FONT_STACK};">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="font-family:${FONT_STACK}; font-size:24px; line-height:28px; font-weight:800; letter-spacing:-0.5px; color:#ffffff;">MA<span style="color:${COLOR.accent};">.</span></td>
                <td align="right" style="font-family:${FONT_STACK}; font-size:12px; line-height:16px; color:${COLOR.headerMuted};">Portfolio contact form</td>
              </tr>
            </table>
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;">
              <tr>
                <td style="border:1px solid ${COLOR.accent}; border-radius:999px; padding:5px 12px; font-family:${FONT_STACK}; font-size:11px; line-height:14px; font-weight:700; letter-spacing:2px; color:${COLOR.accent};">&#9679;&nbsp; NEW ENQUIRY</td>
              </tr>
            </table>
            <h1 class="ma-heading" style="margin:16px 0 0; font-family:${FONT_STACK}; font-size:30px; line-height:36px; font-weight:700; letter-spacing:-0.5px; color:#ffffff;">You've got a new message.</h1>
            <p style="margin:8px 0 0; font-family:${FONT_STACK}; font-size:15px; line-height:22px; color:${COLOR.headerMuted};">Someone reached out through ambalimustapha.dev.</p>
          </td>
        </tr>
        <tr>
          <td style="height:3px; line-height:3px; font-size:3px; background-color:${COLOR.accent};">&nbsp;</td>
        </tr>

        <!-- Sender -->
        <tr>
          <td class="ma-pad" style="padding:32px 36px 8px; font-family:${FONT_STACK};">
            <p style="margin:0 0 14px; font-size:11px; line-height:14px; font-weight:700; letter-spacing:2px; color:${COLOR.muted};">FROM</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid ${COLOR.border};">
              <tr>
                <td class="ma-label" width="80" valign="top" style="width:80px; padding:12px 0; border-bottom:1px solid ${COLOR.border}; font-family:${FONT_STACK}; font-size:13px; line-height:20px; color:${COLOR.muted};">Name</td>
                <td class="ma-value" valign="top" style="padding:12px 0; border-bottom:1px solid ${COLOR.border}; font-family:${FONT_STACK}; font-size:15px; line-height:20px; font-weight:600; color:${COLOR.heading}; word-break:break-word;">${safeName}</td>
              </tr>
              <tr>
                <td class="ma-label" width="80" valign="top" style="width:80px; padding:12px 0; border-bottom:1px solid ${COLOR.border}; font-family:${FONT_STACK}; font-size:13px; line-height:20px; color:${COLOR.muted};">Email</td>
                <td class="ma-value" valign="top" style="padding:12px 0; border-bottom:1px solid ${COLOR.border}; font-family:${FONT_STACK}; font-size:15px; line-height:20px; font-weight:600; word-break:break-all;"><a href="${replyHref}" style="color:${COLOR.heading}; text-decoration:none;">${safeEmail}</a></td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Message -->
        <tr>
          <td class="ma-pad" style="padding:24px 36px 8px; font-family:${FONT_STACK};">
            <p style="margin:0 0 14px; font-size:11px; line-height:14px; font-weight:700; letter-spacing:2px; color:${COLOR.muted};">MESSAGE</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="background-color:${COLOR.messageBg}; border-left:3px solid ${COLOR.accent}; border-radius:8px; padding:20px 22px; font-family:${FONT_STACK}; font-size:15px; line-height:24px; color:${COLOR.body}; word-break:break-word;">${safeMessage}</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Reply -->
        <tr>
          <td class="ma-pad" style="padding:28px 36px 36px; font-family:${FONT_STACK};">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" class="ma-button" style="width:auto;">
              <tr>
                <td align="center" bgcolor="${COLOR.accent}" style="background-color:${COLOR.accent}; border-radius:8px;">
                  <a class="ma-button" href="${replyHref}" style="display:inline-block; padding:14px 28px; font-family:${FONT_STACK}; font-size:15px; line-height:18px; font-weight:700; color:#ffffff; text-decoration:none; border-radius:8px;">Reply to sender &rarr;</a>
                </td>
              </tr>
            </table>
            <p style="margin:14px 0 0; font-family:${FONT_STACK}; font-size:13px; line-height:20px; color:${COLOR.muted};">Or just hit reply. This email's Reply-To is set to the sender.</p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td class="ma-pad" style="background-color:${COLOR.header}; padding:24px 36px; font-family:${FONT_STACK};">
            <p style="margin:0; font-size:14px; line-height:20px; font-weight:700; color:#ffffff;">${SIGNATURE_NAME}<span style="color:${COLOR.accent};">.</span></p>
            <p style="margin:2px 0 0; font-size:13px; line-height:20px; color:${COLOR.headerMuted};">${SIGNATURE_ROLE}</p>
            <p style="margin:10px 0 0; font-size:13px; line-height:20px;"><a href="${SIGNATURE_URL}" style="color:${COLOR.accent}; text-decoration:none;">${SIGNATURE_URL_LABEL}</a></p>
          </td>
        </tr>

      </table>
      <p style="margin:16px 0 0; font-family:${FONT_STACK}; font-size:12px; line-height:18px; color:${COLOR.muted};">Sent automatically by the contact form on ambalimustapha.dev.</p>
    </td>
  </tr>
</table>
</body>
</html>`;
}
