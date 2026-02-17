import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className,
    onClick,
    type = 'button',
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center rounded-full font-bold transition-transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none shadow-sm";

    const variants = {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 focus:ring-secondary",
        outline: "border-2 border-primary text-primary hover:bg-primary/10 focus:ring-primary",
        ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-400",
        danger: "bg-danger text-danger-foreground hover:bg-danger/90 focus:ring-danger",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-5 py-2.5 text-base",
        lg: "px-6 py-3 text-lg",
    };

    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            type={type}
            className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
            onClick={onClick}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;
