export default function HomeFaq() {
  const faqs = [
    ["Who is it for?", 'Readers aged 10 and up, and adults who love Indian mythology. The hero is nine; the adventure is big enough for older readers.'],
    ['Is it a complete story?', 'It is Book 1 of a series and ends on a cliffhanger. Book 2, The Moonwell, is being written.'],
    ['Is the signed copy the same book as on Amazon?', 'Yes, the same Qurate Books paperback, signed with your message inside.'],
    ['When will it arrive?', 'Within 5 days anywhere in India.'],
    ['Can I pay cash on delivery?', 'No — UPI, card or netbanking via Razorpay with instant confirmation.'],
    ['Is there an ebook?', 'Yes, on Kindle; links at the bottom.'],
  ];
  return <section className="band-section"><div className="site-container"><h2 className="page-heading">Before you order</h2><div className="max-w-3xl">{faqs.map(([question, answer]) => <details key={question} className="border-b border-accent/35 py-2"><summary className="cursor-pointer min-h-11 py-3 text-accent font-semibold">{question}</summary><p className="text-secondary leading-relaxed pb-4">{answer}</p></details>)}</div></div></section>;
}
