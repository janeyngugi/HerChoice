import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Card = ({ children, className, hover = false, ...props }) => {
    const baseStyles = "bg-white rounded-[2rem] shadow-sm border border-slate-100 p-6";
    const hoverStyles = hover ? "transition-shadow hover:shadow-md" : "";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className={twMerge(clsx(baseStyles, hoverStyles, className))}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default Card;
