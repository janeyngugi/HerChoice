import React from 'react';
import { Book, HelpCircle, Shield, Gavel, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';

const Education = () => {
    const faqs = [
        {
            question: "What should I do immediately after an assault?",
            answer: "Your safety is the priority. Get to a safe place. If you need urgent medical attention, go to a hospital. Try not to shower or change clothes if you plan to report to police, as this preserves evidence. Call a trusted friend or helpline."
        },
        {
            question: "How do I report an incident?",
            answer: "You can report to the nearest police station (Gender Desk). You can also report anonymously through our app to help us track patterns. For legal action, an official police report (OB Number) is required."
        },
        {
            question: "What is the P3 Form?",
            answer: "The P3 form is a medical examination form filled by a doctor and used as evidence in court. It details the injuries sustained and is crucial for prosecution."
        },
        {
            question: "Is counseling available for free?",
            answer: "Yes, many organizations offer free counseling. Check our 'Find Help' section for NGOs and government centers providing free psychosocial support."
        }
    ];

    const rights = [
        {
            icon: Shield,
            title: "Right to Protection",
            desc: "You have the right to be protected from further violence and intimidation."
        },
        {
            icon: Gavel,
            title: "Right to Legal Aid",
            desc: "You are entitled to legal representation and a fair hearing in court."
        },
        {
            icon: HeartHandshake,
            title: "Right to Dignity",
            desc: "You must be treated with respect and sensitivity by all officers and medical staff."
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Education & Support</h1>
                <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                    Knowledge is power. Understanding your rights and the available resources is the first step towards justice and healing.
                </p>
            </div>

            {/* Rights Section */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
                {rights.map((item, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <Card className="text-center h-full hover:shadow-md transition-shadow">
                            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <item.icon size={32} className="text-primary" />
                            </div>
                            <h3 className="font-bold text-lg text-slate-900 mb-2">{item.title}</h3>
                            <p className="text-slate-600">{item.desc}</p>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* FAQs Section */}
            <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                    <HelpCircle className="text-secondary" /> Frequently Asked Questions
                </h2>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + (index * 0.1) }}
                        >
                            <Card className="p-6">
                                <h3 className="font-bold text-slate-900 mb-2 text-lg">{faq.question}</h3>
                                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Education;
