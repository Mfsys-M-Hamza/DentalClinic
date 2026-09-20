import type { Metadata } from "next";
import { clinicConfig } from "@/clinic-config";
import { buildMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/sections/LegalPage";

const { name, contact } = clinicConfig;

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: `How ${name} collects, uses and protects your personal information when you use this website.`,
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      path="/privacy-policy"
      updated="September 2026"
      intro={`${name} respects your privacy. This policy explains what information we collect through this website and how we use it.`}
      sections={[
        {
          heading: "Information we collect",
          body: [
            "When you use our appointment request form, you may provide your name, phone number, email address, preferred treatment, preferred dates and a short message about your dental concern.",
            "We may also collect basic, non-identifying technical information about how the website is used, such as pages visited and device type.",
          ],
        },
        {
          heading: "How the appointment form works",
          body: [
            "This website does not store the details you enter in the appointment form. When you submit the form, your details are placed into a WhatsApp message that opens on your device. The message is only sent to the clinic when you press Send in WhatsApp.",
            "Messages you send through WhatsApp are also subject to WhatsApp's own terms and privacy policy.",
          ],
        },
        {
          heading: "How we use your information",
          body: [
            "We use the information you send us to respond to your enquiry, arrange and manage appointments, and provide dental care. We do not sell your personal information.",
          ],
        },
        {
          heading: "Sharing your information",
          body: [
            "We only share your information with third parties where necessary to provide your care or where required by law.",
          ],
        },
        {
          heading: "Data retention and security",
          body: [
            "We keep personal information only for as long as needed for the purposes described above or as required by law, and we take reasonable steps to protect it.",
          ],
        },
        {
          heading: "Your rights",
          body: [
            "Depending on where you live, you may have rights to access, correct or delete your personal information, or to object to certain uses. To exercise these rights, contact us using the details below.",
          ],
        },
        {
          heading: "Third-party links and embedded content",
          body: [
            "This website includes an embedded Google Map and links to social media. These third parties may collect information according to their own privacy policies.",
          ],
        },
        {
          heading: "Contact us",
          body: [`If you have questions about this policy, contact ${name} on ${contact.phone}.`],
        },
      ]}
    />
  );
}
