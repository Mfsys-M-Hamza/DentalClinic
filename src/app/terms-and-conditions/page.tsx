import type { Metadata } from "next";
import { clinicConfig } from "@/clinic-config";
import { medicalDisclaimer } from "@/data/content";
import { buildMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/sections/LegalPage";

const { name, contact } = clinicConfig;

export const metadata: Metadata = buildMetadata({
  title: "Terms and Conditions",
  description: `The terms that apply when you use the ${name} website and request appointments.`,
  path: "/terms-and-conditions",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms and Conditions"
      path="/terms-and-conditions"
      updated="September 2026"
      intro={`By using the ${name} website you agree to the terms below. Please read them carefully.`}
      sections={[
        {
          heading: "General information only",
          body: [medicalDisclaimer],
        },
        {
          heading: "Appointment requests",
          body: [
            "Submitting a request through this website, or sending a message on WhatsApp, does not create a confirmed appointment. An appointment is confirmed only when a member of the clinic team replies and agrees a date and time with you.",
            "Please contact us as early as possible if you need to change or cancel an appointment.",
          ],
        },
        {
          heading: "Emergencies",
          body: [
            `If you have a dental emergency, call ${contact.emergencyPhone}. If you have difficulty breathing or swallowing, or a serious injury, contact your local emergency service immediately. Do not rely on this website or on WhatsApp messages in an emergency.`,
          ],
        },
        {
          heading: "Treatment and results",
          body: [
            "Treatment options, suitability, costs and outcomes depend on your individual circumstances and will be discussed with you by a qualified dental professional. Images and descriptions on this website are illustrative and do not guarantee any particular result.",
          ],
        },
        {
          heading: "Intellectual property",
          body: [
            `The content of this website, including text, images and logos, belongs to ${name} or its licensors and may not be copied or reused without permission.`,
          ],
        },
        {
          heading: "Third-party services",
          body: [
            "This website links to third-party services such as WhatsApp, Google Maps and social media. We are not responsible for the content or practices of those services.",
          ],
        },
        {
          heading: "Limitation of liability",
          body: [
            "We make reasonable efforts to keep the information on this website accurate, but we do not guarantee that it is complete or up to date. To the extent permitted by law, we are not liable for loss arising from reliance on the website's content.",
          ],
        },
        {
          heading: "Changes to these terms",
          body: ["We may update these terms from time to time. The date at the top of this page shows when they were last changed."],
        },
        {
          heading: "Contact",
          body: [`Questions about these terms? Contact ${name} on ${contact.phone}.`],
        },
      ]}
    />
  );
}
