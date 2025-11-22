import { motion } from 'framer-motion';
import React from 'react';

const SectionWrapper = ({ children, id, className }) => {
  return (
    <motion.div
      id={id}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, type: 'spring', bounce: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default SectionWrapper;
