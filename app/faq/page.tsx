import { Faq3 } from "@/components/faq3";

export default function faq() {
    const faqItems = [
        {
          id: "faq-1",
          question: "What is the return policy?",
          answer:
            "You can return any item within 30 days of purchase for a full refund, provided it is in its original condition.",
        },
        {
          id: "faq-2",
          question: "How do I track my order?",
          answer:
            "Once your order is shipped, you will receive an email with a tracking number. You can use this number on our website to track your order.",
        },
        {
          id: "faq-3",
          question: "Do you offer international shipping?",
          answer:
            "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary depending on the destination.",
        },
        {
          id: "faq-4",
          question: "Can I change my order after it has been placed?",
          answer:
            "You can change your order within 24 hours of placing it by contacting our customer service team.",
        },
        {
          id: "faq-5",
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards, PayPal, and Apple Pay.",
        },
        {
          id: "faq-6",
          question: "How can I contact customer support?",
          answer:
            "You can reach our customer support team via email at support@example.com or by calling 1-800-123-4567.",
        },
        {
          id: "faq-7",
          question: "Are there any discounts for bulk purchases?",
          answer:
            "Yes, we offer discounts for bulk purchases. Please contact our sales team for more information.",
        },
      ];
    const Faq3Data = {
        heading: "Frequently asked questions",
        description: "Find answers to common questions about our products. Can't find what you're looking for? Contact our support team.",
        items: faqItems,
        supportHeading: "Need more support?",
        supportDescription: "Our dedicated support team is here to help you with any questions or concerns. Get in touch with us for personalized assistance.",
        supportButtonText: "Contact Support",
        supportButtonUrl: "https://www.beautylook.top/",
    }

    return (
      <div>
        <Faq3 {...Faq3Data}/>
      </div>
    );
  }
  