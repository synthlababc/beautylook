import { Faq3 } from "@/components/faq3";

export default function faq() {
  const faqItems = [
    {
      id: "faq-1",
      question: "How do I use the Micro Infusion System Properly?",
      answer:
        "1. Fill the system by securely placing serum inside the vial and twisting on the needle head with the cap on. 2. Flip the vial upside down for 2 minutes to help serum flow into the needle chamber. 3. Prime the needles by gently pressing the center pin onto a clean surface until serum appears at the needle tips. 4. Apply by lightly tapping the device on skin—don’t press too hard. 5. If serum remains in the vial after treatment, unscrew the top and apply it with clean fingers to avoid waste.",
    },
    {
      id: "faq-2",
      question: "When will I see results?",
      answer:
        "Notable improvements—such as enhanced radiance, diminished fine lines and a rejuvenated complexion—are often visible within 1–2 days. Multiple sessions yield cumulative benefits over time, especially when used before a big event, and regular skincare helps maintain these results.",
    },
    {
      id: "faq-3",
      question: "How often can I do the treatment?",
      answer:
        "It’s recommended to perform Micro‑Infusion every 1–2 weeks for optimal results.",
    },
    {
      id: "faq-4",
      question: "How do I open the Serum ampoule/ vial?",
      answer:
        "1. Grip the serum vial firmly and locate the arrow on the cap, then flip it open from the arrow‑end. 2. Bend back the silver seal until it nearly snaps off, then peel it away and discard. 3. Remove the rubber stopper and pour serum into your Micro‑Infusion device.",
    },
    {
      id: "faq-5",
      question: "Can I micro‑infuse around the eyes?",
      answer:
        "Yes, you can—but be very gentle and use light pressure. Only do one pass around the eye area, and closely monitor your skin’s reaction as sensitivities vary.",
    },
    {
      id: "faq-6",
      question: "Can I treat my neck?",
      answer:
        "Yes—using the Micro‑Infusion device on your neck can help reduce fine lines, rejuvenate the skin, smooth creases, and promote a firmer, more youthful appearance.",
    },
    {
      id: "faq-7",
      question: "How do I clean the Micro Infusion device?",
      answer:
        "1. Twist off the needle head (with cap still attached) and safely dispose of it. 2. Rinse the chamber gently with water and a mild cleanser. 3. Let it air‑dry completely on a clean surface. 4. When ready, attach a new needle head with clean hands, keeping its cap on until use.",
    },
  ];
  const Faq3Data = {
    heading: "Frequently asked questions",
    description: "Find answers to common questions about our products. Can't find what you're looking for? Contact our support team.",
    items: faqItems,
    supportHeading: "Need more support?",
    supportDescription: "Our dedicated support team is here to help you with any questions or concerns. Get in touch with us for personalized assistance.",
    supportButtonText: "Contact Support Email: contact@beautylook.top",
    supportButtonUrl: "https://www.beautylook.top/",
  }

  return (
    <div>
      <Faq3 {...Faq3Data} />
    </div>
  );
}
