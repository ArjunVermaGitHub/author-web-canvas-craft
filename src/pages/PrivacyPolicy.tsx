import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="public-site">
      <Helmet><title>Privacy Policy — Raghav Kartikeya: Fantasy with Roots</title><meta name="description" content="Privacy Policy for riturajverma.com." /><link rel="canonical" href="https://www.riturajverma.com/privacy" /><meta property="og:url" content="https://www.riturajverma.com/privacy" /></Helmet>
      <Header />

      <main className="book-section">
        <div className="site-container">
          <h1 className="section-heading mb-4">Privacy Policy</h1>
          <p className="text-left text-book-amber mb-2">Website: riturajverma.com</p>
          <p className="text-left text-book-light/70 text-sm mb-12">
            Effective date: 31 July 2026
            <span className="mx-2">·</span>
            Last updated: 31 July 2026
          </p>

          <div className="space-y-10 text-book-light/90 leading-relaxed">
            <section>
              <h2 className="text-2xl font-serif text-book-gold mb-4">1. Who we are</h2>
              <p className="mb-4">
                This website (&quot;Site&quot;) is operated by Rituraj Verma (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;),
                author of the Raghav Kartikeya series, operating from Mumbai, Maharashtra, India.
              </p>
              <p className="mb-2">
                <span className="text-book-amber">Contact for privacy matters:</span>{' '}
                <a href="mailto:privacy@riturajverma.com" className="text-book-gold hover:text-book-amber underline underline-offset-2">
                  privacy@riturajverma.com
                </a>
              </p>
              <p className="mb-4">
                <span className="text-book-amber">Postal address:</span>{' '}
                A-202, Zeon building, Ajmera I-Land, Wadala, Mumbai
              </p>
              <p>
                We are the data fiduciary / data controller for personal data collected through this Site
                and through our advertising and social media channels.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-book-gold mb-4">2. Scope</h2>
              <p className="mb-4">
                This policy explains what personal data we collect when you visit riturajverma.com, sign up
                for our mailing list, download a sample chapter, interact with our ads on Facebook or
                Instagram, or contact us. It also explains how we work with Meta Platforms, Inc. (&quot;Meta&quot;)
                and other advertising and analytics partners.
              </p>
              <p>
                This policy does <em>not</em> cover third-party sites we link to — including Amazon, other
                book retailers, and social platforms — which operate under their own privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-book-gold mb-4">3. Information we collect</h2>

              <h3 className="text-xl font-serif text-book-amber mb-3">3.1 Information you give us</h3>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  Name, email address, and (where you choose to provide it) phone number, when you
                  subscribe to the newsletter, request a free sample chapter, enter a giveaway, or submit
                  a contact or enquiry form.
                </li>
                <li>
                  Information you submit through a Meta Lead Ad form (typically name and email, pre-filled
                  by Meta from your profile and confirmed by you).
                </li>
                <li>
                  Your Instagram or Facebook username and message content if you contact us via DM,
                  comment, or an automated comment-to-DM flow.
                </li>
                <li>Any other information you voluntarily include in a message to us.</li>
              </ul>

              <h3 className="text-xl font-serif text-book-amber mb-3">3.2 Information collected automatically</h3>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  IP address, approximate location derived from it, browser type, device type, operating
                  system, and language settings.
                </li>
                <li>
                  Pages viewed, links and buttons clicked, referring URL, time spent on pages, and outbound
                  clicks to retailer sites.
                </li>
                <li>
                  Cookie identifiers and similar device identifiers set by us and by our partners (see
                  Section 5).
                </li>
              </ul>

              <h3 className="text-xl font-serif text-book-amber mb-3">3.3 Information from third parties</h3>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  Aggregated and event-level advertising data from Meta, including ad impressions, clicks,
                  and conversion events attributed to our campaigns.
                </li>
                <li>
                  Aggregated audience and engagement insights from Instagram and Facebook Page Insights.
                </li>
                <li>Aggregated campaign reporting accessed through our analytics tooling.</li>
              </ul>
              <p>
                We do not collect payment card details on this Site. Book purchases are completed on
                third-party retailer platforms, which handle payment data under their own terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-book-gold mb-4">4. How we use your information</h2>
              <p className="mb-3">We use personal data to:</p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  Deliver what you asked for — sample chapters, newsletters, launch announcements, and
                  replies to your enquiries.
                </li>
                <li>Operate, secure, and improve the Site.</li>
                <li>
                  Measure and improve our advertising: understanding which ads lead to sample-chapter
                  downloads, newsletter signups, and book purchases.
                </li>
                <li>
                  Build and refine advertising audiences, including Custom Audiences and Lookalike
                  Audiences on Meta (see Section 6).
                </li>
                <li>Comply with legal obligations and enforce our terms.</li>
              </ul>
              <p>
                <span className="text-book-amber">Legal bases (where GDPR or comparable law applies):</span>{' '}
                consent (marketing emails, non-essential cookies, advertising measurement); legitimate
                interests (site security, basic analytics, defending legal claims); contract (fulfilling a
                request you made); and legal obligation. Where Indian law applies, we process personal data
                on the basis of your consent or a legitimate use permitted under the Digital Personal Data
                Protection Act, 2023.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-book-gold mb-4">5. Cookies and similar technologies</h2>
              <p className="mb-4">
                We use cookies, pixels, SDKs, local storage, and similar technologies to run the Site and
                to measure advertising.
              </p>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-left text-sm border border-book-medium">
                  <thead>
                    <tr className="bg-book-medium/60 text-book-amber">
                      <th className="p-3 border-b border-book-medium font-serif">Category</th>
                      <th className="p-3 border-b border-book-medium font-serif">Purpose</th>
                      <th className="p-3 border-b border-book-medium font-serif">Examples</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-book-medium/60">
                      <td className="p-3 align-top">Strictly necessary</td>
                      <td className="p-3 align-top">Site delivery, security, load balancing</td>
                      <td className="p-3 align-top">Hosting/session cookies</td>
                    </tr>
                    <tr className="border-b border-book-medium/60">
                      <td className="p-3 align-top">Analytics</td>
                      <td className="p-3 align-top">Understanding traffic and content performance</td>
                      <td className="p-3 align-top">Hosting and Meta advertising insights</td>
                    </tr>
                    <tr>
                      <td className="p-3 align-top">Advertising</td>
                      <td className="p-3 align-top">Measuring ad performance, retargeting, audience building</td>
                      <td className="p-3 align-top">Meta Pixel (Facebook / Instagram)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                You can control cookies through our cookie banner (where shown), your browser settings, or
                your device&apos;s ad-tracking controls. Blocking non-essential cookies will not stop you from
                reading or browsing the Site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-book-gold mb-4">
                6. Meta Pixel, Conversions API, and Custom Audiences
              </h2>
              <p className="mb-4">
                We advertise on Facebook and Instagram, and this Site uses the <em>Meta Pixel</em>.
              </p>
              <p className="mb-3 text-book-amber">What this means in practice:</p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  When you visit the Site, the Meta Pixel may collect your IP address, browser and device
                  information, the pages you view, and actions you take (for example, clicking through to
                  a retailer, downloading a sample chapter, or submitting a form), together with a cookie
                  identifier.
                </li>
                <li>
                  This information is transmitted to Meta, which may match it against a Facebook or
                  Instagram account and use it to report on our ad performance and to show you our ads or
                  related ads.
                </li>
                <li>
                  Where we use Meta&apos;s <em>Conversions API</em>, some of the same event information is sent
                  to Meta from our server rather than from your browser. Any contact information used for
                  matching (such as an email address) is <strong>hashed before transmission</strong>.
                </li>
                <li>
                  We may create <em>Custom Audiences</em> by uploading hashed customer or subscriber lists
                  to Meta, or by using website visitor events, so that we can reach you or people similar
                  to you (<em>Lookalike Audiences</em>) with our ads.
                </li>
                <li>
                  We do <em>not</em> sell your personal data, and we do not share sensitive categories of
                  data with Meta.
                </li>
              </ul>
              <p className="mb-4">
                Meta processes this data as an independent controller for some purposes and as our
                processor for others, under Meta&apos;s Business Tools Terms and Data Processing Terms. You can
                review Meta&apos;s practices and manage your ad settings here:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  Meta Privacy Policy:{' '}
                  <a
                    href="https://www.facebook.com/privacy/policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-book-gold hover:text-book-amber underline underline-offset-2 break-all"
                  >
                    https://www.facebook.com/privacy/policy
                  </a>
                </li>
                <li>
                  Meta Ad Preferences:{' '}
                  <a
                    href="https://www.facebook.com/adpreferences"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-book-gold hover:text-book-amber underline underline-offset-2 break-all"
                  >
                    https://www.facebook.com/adpreferences
                  </a>
                </li>
                <li>
                  Meta &quot;Off-Facebook Activity&quot; / Activity Off Meta Technologies tool:{' '}
                  <a
                    href="https://www.facebook.com/off_facebook_activity"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-book-gold hover:text-book-amber underline underline-offset-2 break-all"
                  >
                    https://www.facebook.com/off_facebook_activity
                  </a>
                </li>
              </ul>
              <p className="mb-3 text-book-amber">How to opt out of this advertising processing:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Adjust your Meta ad settings and disconnect off-platform activity using the links above.</li>
                <li>
                  Decline advertising cookies in our cookie banner, or block third-party cookies in your
                  browser.
                </li>
                <li>
                  Use industry opt-out tools such as youronlinechoices.eu (EU) or optout.aboutads.info (US).
                </li>
                <li>
                  Email us at{' '}
                  <a href="mailto:privacy@riturajverma.com" className="text-book-gold hover:text-book-amber underline underline-offset-2">
                    privacy@riturajverma.com
                  </a>{' '}
                  to be removed from our marketing audiences.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-book-gold mb-4">7. Meta Lead Ads</h2>
              <p>
                If you submit your details through a lead form inside Facebook or Instagram, Meta passes
                that information to us. We use it only to send you the material you requested (for example,
                a sample chapter) and, where you have consented, our newsletter and launch updates. You can
                unsubscribe at any time via the link in every email or by writing to us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-book-gold mb-4">8. Email marketing</h2>
              <p>
                We send newsletters and book announcements only to people who have opted in. Every email
                includes a one-click unsubscribe. We store subscriber details securely in our database
                (MongoDB) and deliver emails through an SMTP email service provider, which may also
                provide open and click tracking where enabled.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-book-gold mb-4">9. Sharing your information</h2>
              <p className="mb-3">We share personal data only with:</p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  <em>Advertising and analytics partners:</em> Meta Platforms (Facebook and Instagram
                  advertising, Pixel, and related measurement tools).
                </li>
                <li>
                  <em>Service providers:</em> our website host (Vercel), database provider (MongoDB), and
                  our SMTP email service provider used to send mailing-list messages.
                </li>
                <li>
                  <em>Professional advisers</em> and, where required, law enforcement or regulators.
                </li>
                <li>
                  <em>A successor entity</em>, in the event of a business transfer.
                </li>
              </ul>
              <p>We do not sell or rent personal data.</p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-book-gold mb-4">10. International transfers</h2>
              <p>
                Our partners, including Meta and our hosting and email providers, may process data outside
                India, including in the United States and the European Union. Such transfers rely on
                appropriate safeguards, including Standard Contractual Clauses where required.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-book-gold mb-4">11. Retention</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Newsletter and sample-chapter subscriber data: until you unsubscribe, plus a short
                  suppression record so we do not re-contact you.
                </li>
                <li>Enquiry correspondence: up to 24 months.</li>
                <li>
                  Advertising and analytics data: as per the retention periods of the respective platforms;
                  Custom Audience source lists are refreshed and stale records removed at least every 12
                  months.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-book-gold mb-4">12. Your rights</h2>
              <p className="mb-4">
                Depending on where you live, you may have the right to access, correct, update, or delete
                your personal data; to withdraw consent; to object to or restrict processing; to data
                portability; and to nominate another person to exercise your rights on your behalf (under
                India&apos;s DPDP Act, 2023).
              </p>
              <p className="mb-4">
                To exercise any of these, email{' '}
                <a href="mailto:privacy@riturajverma.com" className="text-book-gold hover:text-book-amber underline underline-offset-2">
                  privacy@riturajverma.com
                </a>
                . We will respond within the timeframe required by applicable law.
              </p>
              <p>
                <span className="text-book-amber">Grievance Officer (India):</span> Rituraj Verma,{' '}
                <a href="mailto:privacy@riturajverma.com" className="text-book-gold hover:text-book-amber underline underline-offset-2">
                  privacy@riturajverma.com
                </a>
                , A-202, Zeon building, Ajmera I-Land, Wadala, Mumbai. If you are not satisfied with our
                response, you may escalate to the Data Protection Board of India. If you are in the EU or
                UK, you may complain to your local supervisory authority.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-book-gold mb-4">13. Children</h2>
              <p>
                Our books are written for young adult readers, but this Site and our advertising are
                directed at adults — parents, guardians, teachers, and readers aged 18 and over. We do not
                knowingly collect personal data from children under 18 without verifiable parental consent,
                and our Meta ad audiences are configured to exclude users under 18. If you believe a child
                has provided us personal data, contact us at{' '}
                <a href="mailto:privacy@riturajverma.com" className="text-book-gold hover:text-book-amber underline underline-offset-2">
                  privacy@riturajverma.com
                </a>{' '}
                and we will delete it promptly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-book-gold mb-4">14. Security</h2>
              <p>
                We use reasonable technical and organisational measures, including HTTPS, access controls,
                and vetted processors, to protect personal data. No method of transmission over the
                internet is completely secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-book-gold mb-4">15. Third-party links</h2>
              <p>
                The Site links to Amazon and other retailers, and to our social media profiles. We are not
                responsible for their content or privacy practices. Review their policies before providing
                personal data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-book-gold mb-4">16. Changes to this policy</h2>
              <p>
                We may update this policy from time to time. The &quot;Last updated&quot; date above reflects the
                most recent version. Material changes will be notified on the Site or by email where
                appropriate. This policy remains in effect until it is replaced by an updated version.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-book-gold mb-4">17. Contact</h2>
              <p>
                Rituraj Verma
                <br />
                A-202, Zeon building, Ajmera I-Land, Wadala, Mumbai
                <br />
                <a href="mailto:privacy@riturajverma.com" className="text-book-gold hover:text-book-amber underline underline-offset-2">
                  privacy@riturajverma.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
