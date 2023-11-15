import { motion } from "framer-motion";

function Row({ children }) {
  return (
    <motion.tr
      className="border-b border-gray-700"
      initial={{ opacity: 0, transform: "translateY(-30px)" }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1, transform: "translateY(0)" }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.tr>
  );
}

export default Row;
