import React, { useState } from "react";

const Faq = () => {
  const [open, setOpen] = useState(null);

  const toggleFAQ = (index) => {
    setOpen(open === index ? null : index);
  };

  const faqs = [
    {
      question: "What is the delivery time for medicines?",
      answer: "We deliver medicines within 2-5 business days depending on your location.",
    },
    {
      question: "Can I return purchased medicines?",
      answer: "Yes, you can return medicines within 7 days if they meet our return policy conditions.",
    },
    {
      "question": "How can I track my order?",
      "answer": "You can track your order using the 'Track Orders' option in our home page."
    }
    ,
  ];

  return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-lg font-semibold text-gray-700 flex items-center justify-between">
                <span>{faq.question}</span>
                <span className="text-blue-500 text-xl">{open === index ? "-" : "+"}</span>
              </h3>
              {open === index && <p className="text-gray-600 mt-4">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </div>
  );
};

export default Faq;
