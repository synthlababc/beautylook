// import { Faq3 } from "@/components/faq3";

// export default function faq() {
//   const faqItems = [
//     {
//       id: "faq-1",
//       question: "How do I use the Micro Infusion System Properly?",
//       answer:
//         "1. Fill the system by securely placing serum inside the vial and twisting on the needle head with the cap on. 2. Flip the vial upside down for 2 minutes to help serum flow into the needle chamber. 3. Prime the needles by gently pressing the center pin onto a clean surface until serum appears at the needle tips. 4. Apply by lightly tapping the device on skin—don’t press too hard. 5. If serum remains in the vial after treatment, unscrew the top and apply it with clean fingers to avoid waste.",
//     },
//     {
//       id: "faq-2",
//       question: "When will I see results?",
//       answer:
//         "Notable improvements—such as enhanced radiance, diminished fine lines and a rejuvenated complexion—are often visible within 1–2 days. Multiple sessions yield cumulative benefits over time, especially when used before a big event, and regular skincare helps maintain these results.",
//     },
//     {
//       id: "faq-3",
//       question: "How often can I do the treatment?",
//       answer:
//         "It’s recommended to perform Micro‑Infusion every 1–2 weeks for optimal results.",
//     },
//     {
//       id: "faq-4",
//       question: "How do I open the Serum ampoule/ vial?",
//       answer:
//         "1. Grip the serum vial firmly and locate the arrow on the cap, then flip it open from the arrow‑end. 2. Bend back the silver seal until it nearly snaps off, then peel it away and discard. 3. Remove the rubber stopper and pour serum into your Micro‑Infusion device.",
//     },
//     {
//       id: "faq-5",
//       question: "Can I micro‑infuse around the eyes?",
//       answer:
//         "Yes, you can—but be very gentle and use light pressure. Only do one pass around the eye area, and closely monitor your skin’s reaction as sensitivities vary.",
//     },
//     {
//       id: "faq-6",
//       question: "Can I treat my neck?",
//       answer:
//         "Yes—using the Micro‑Infusion device on your neck can help reduce fine lines, rejuvenate the skin, smooth creases, and promote a firmer, more youthful appearance.",
//     },
//     {
//       id: "faq-7",
//       question: "How do I clean the Micro Infusion device?",
//       answer:
//         "1. Twist off the needle head (with cap still attached) and safely dispose of it. 2. Rinse the chamber gently with water and a mild cleanser. 3. Let it air‑dry completely on a clean surface. 4. When ready, attach a new needle head with clean hands, keeping its cap on until use.",
//     },
//   ];
//   const Faq3Data = {
//     heading: "Frequently asked questions",
//     description: "Find answers to common questions about our products. Can't find what you're looking for? Contact our support team.",
//     items: faqItems,
//     supportHeading: "Need more support?",
//     supportDescription: "Our dedicated support team is here to help you with any questions or concerns. Get in touch with us for personalized assistance.",
//     supportButtonText: "Contact Support Email: contact@beautylook.top",
//     supportButtonUrl: "https://www.beautylook.top/",
//   }

//   return (
//     <div>
//       <Faq3 {...Faq3Data} />
//     </div>
//   );
// }

"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function MicroInfusionGuidePage() {
  return (
    <div className="container mx-auto py-12 space-y-12 max-w-4xl">
      <header className="text-center space-y-6">
        <Badge variant="secondary" className="text-sm font-medium mb-2">
          HOME TREATMENT GUIDE
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
          Complete Guide to the Micro‑Infusion System
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Unlock radiant skin at home with our step‑by‑step micro‑infusion treatment guide.
        </p>
      </header>

      <Tabs defaultValue="pre" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-muted/50">
          <TabsTrigger value="pre" className="py-4 data-[state=active]:bg-rose-50 data-[state=active]:text-rose-600">
            Pre‑Treatment
          </TabsTrigger>
          <TabsTrigger value="infusion" className="py-4 data-[state=active]:bg-rose-50 data-[state=active]:text-rose-600">
            Micro‑Infusion Guide
          </TabsTrigger>
          <TabsTrigger value="post" className="py-4 data-[state=active]:bg-rose-50 data-[state=active]:text-rose-600">
            Post‑Treatment
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pre" className="pt-6">
          <Card className="border-0 shadow-none">
            <CardHeader>
              <h2 className="text-2xl font-semibold text-rose-800">Before You Begin</h2>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-rose-100 text-rose-600 mt-0.5 flex-shrink-0">
                    1
                  </div>
                  <span>Tie your hair back and keep it out of your face.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-rose-100 text-rose-600 mt-0.5 flex-shrink-0">
                    2
                  </div>
                  <span>Double cleanse thoroughly to remove all makeup, oil, and residue.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-rose-100 text-rose-600 mt-0.5 flex-shrink-0">
                    3
                  </div>
                  <span>Wash your hands and clean your device to avoid cross‑contamination.</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="infusion" className="pt-6">
          <Card className="border-0 shadow-none">
            <CardHeader>
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-rose-800">Micro‑Infusion: 10 Minutes Every 1–2 Weeks</h2>
                <p className="text-sm text-muted-foreground">
                  Follow these steps for optimal results and safety
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 rounded-lg bg-rose-50/50 border border-rose-100">
                <h3 className="font-semibold text-lg flex items-center gap-2 text-rose-700">
                  <span className="flex items-center justify-center h-6 w-6 rounded-full bg-rose-100 text-rose-600">
                    1
                  </span>
                  Prepare & Open Serum Vial
                </h3>
                <p className="mt-2 ml-8 text-muted-foreground">
                  Flip open the vial cap, remove the aluminum seal and rubber stopper to access the serum.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-rose-50/50 border border-rose-100">
                <h3 className="font-semibold text-lg flex items-center gap-2 text-rose-700">
                  <span className="flex items-center justify-center h-6 w-6 rounded-full bg-rose-100 text-rose-600">
                    2
                  </span>
                  Load Serum into Device
                </h3>
                <p className="mt-2 ml-8 text-muted-foreground">
                  Pour serum into the chamber. Screw on the needle head—slightly loose to allow airflow but no leaks. Let it stand 2 minutes to flow into needles.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-rose-50/50 border border-rose-100">
                <h3 className="font-semibold text-lg flex items-center gap-2 text-rose-700">
                  <span className="flex items-center justify-center h-6 w-6 rounded-full bg-rose-100 text-rose-600">
                    3
                  </span>
                  Prime the Needles
                </h3>
                <p className="mt-2 ml-8 text-muted-foreground">
                  Press the pin against a clean surface until serum appears at the needle tips.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-rose-50/50 border border-rose-100">
                <h3 className="font-semibold text-lg flex items-center gap-2 text-rose-700">
                  <span className="flex items-center justify-center h-6 w-6 rounded-full bg-rose-100 text-rose-600">
                    4
                  </span>
                  Tap Serum into Your Skin
                </h3>
                <p className="mt-2 ml-8 text-muted-foreground">
                  Lightly tap in 50% overlapping grid pattern for even coverage.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-rose-50/50 border border-rose-100">
                <h3 className="font-semibold text-lg flex items-center gap-2 text-rose-700">
                  <span className="flex items-center justify-center h-6 w-6 rounded-full bg-rose-100 text-rose-600">
                    5
                  </span>
                  Use Leftover Serum
                </h3>
                <p className="mt-2 ml-8 text-muted-foreground">
                  Unscrew and gently apply any serum remaining in the vial to face and neck.
                </p>
              </div>
            </CardContent>
          </Card>

          <Accordion type="multiple" defaultValue={["howto"]} className="mt-6">
            <AccordionItem value="howto" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline font-medium py-4">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rose-600">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                  <span>How to Get the Best Results</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <ol className="space-y-3 ml-2">
                  <li className="flex items-start gap-3">
                    <span className="flex items-center justify-center h-5 w-5 rounded-full bg-rose-100 text-rose-600 text-xs mt-0.5 flex-shrink-0">1</span>
                    <span>Use one serum vial with each micro‑infusion session.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex items-center justify-center h-5 w-5 rounded-full bg-rose-100 text-rose-600 text-xs mt-0.5 flex-shrink-0">2</span>
                    <span>Apply full serums at ~12 and ~24 hours after treatment.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex items-center justify-center h-5 w-5 rounded-full bg-rose-100 text-rose-600 text-xs mt-0.5 flex-shrink-0">3</span>
                    <span>Repeat weekly using fresh needles.</span>
                  </li>
                </ol>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>

        <TabsContent value="post" className="pt-6">
          <Card className="border-0 shadow-none">
            <CardHeader>
              <h2 className="text-2xl font-semibold text-rose-800">Post‑Treatment Guidelines</h2>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-rose-700">Immediate Aftercare</h3>
                  <ul className="space-y-3">
                    {[
                      "Do NOT wash your face for the rest of the day.",
                      "Avoid makeup for 24 hours; if necessary, opt for gentle, sensitive‑skin formulas.",
                      "Stay out of direct sunlight for 24–48 hours—use sunscreen if needed.",
                      "Skip all strong actives (acids, retinol, Vitamin C) and scrubs for 2–3 days.",
                      "Avoid pools, saunas, and heavy sweat for 24 hours.",
                      "Do not touch or rub your skin; cleanse gently the next day."
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rose-500 mt-0.5 flex-shrink-0">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="8" x2="12" y2="12"></line>
                          <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-rose-700">Post‑Treatment Care</h3>
                  <ul className="space-y-3">
                    {[
                      "Cleanse with a mild, non‑irritating cleanser.",
                      "Moisturize gently to soothe redness.",
                      "Avoid makeup and harsh skincare for 24 hours.",
                      "No heavy workouts, sweating, or chlorinated water for 24 hours.",
                      "Expect results in 2–3 days as your skin heals and glows."
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rose-500 mt-0.5 flex-shrink-0">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-center text-rose-800">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full space-y-2">
          {[
            {
              value: "results",
              question: "When will I see results?",
              answer: "Expect noticeable radiance and reduced fine lines within 1–2 days. Consistent use adds cumulative benefits."
            },
            {
              value: "frequency",
              question: "How often should I use it?",
              answer: "Recommended every 1–2 weeks for optimal results."
            },
            {
              value: "pain",
              question: "Does it hurt?",
              answer: "It's virtually painless—like a tiny pinprick with 0.25 mm gold-plated needles."
            },
            {
              value: "cleanup",
              question: "How do I clean the device?",
              answer: "Dispose of the needle head, wash chamber with mild cleanser, air dry, and attach a new head for next session."
            },
            {
              value: "benefits",
              question: "Benefits of micro‑infusion?",
              answer: "Boosts collagen, enhances serum absorption (up to 300%), firms skin, and smooths fine lines—no downtime."
            },
            {
              value: "eye",
              question: "Can I use it around eyes or neck?",
              answer: "Yes, but apply gently and with light taps. Avoid active acne or sensitive areas."
            },
            {
              value: "difference",
              question: "Micro‑infusion vs micro‑needling roller?",
              answer: "Micro‑infusion delivers active serums deeper via hollow needles—more effective than rollers and safer for at‑home use."
            }
          ].map((item) => (
            <AccordionItem key={item.value} value={item.value} className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline font-medium py-4">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <div className="text-center space-y-6 bg-rose-50/50 rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-rose-800">Safety & Maintenance</h2>
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-left text-sm">
          {[
            "Use fresh needle heads—single-use only.",
            "Patch test before use and consult a professional for skin concerns.",
            "Not intended to diagnose or treat medical conditions.",
            "Keep out of reach of children; avoid sensitive or broken skin.",
            "Store dry and hygienically between uses.",
            "Sunscreen is essential post-treatment."
          ].map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rose-500 mt-0.5 flex-shrink-0">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <span className="text-muted-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}