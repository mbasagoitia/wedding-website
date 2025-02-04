import { motion } from 'framer-motion';

const Alert = ({ content, onClose }) => {
  const { title, message } = content;

  return (
    <>
      <div className="alert-overlay" onClick={onClose}></div>

      <motion.div
        className="custom-alert"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <h1>{title}</h1>
        <p>{message}</p>
        <button className="close-btn" onClick={onClose}>Close</button>
      </motion.div>
    </>
  );
};

export default Alert;
