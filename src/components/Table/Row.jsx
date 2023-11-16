import { motion } from "framer-motion";
import { useRef } from "react";

function Row({ children, updated, setUpdateProductId }) {
  const ref = useRef(null)
  
  const variants = {
    default: { opacity: 1, transform: "translateY(0)" },
    updated: { backgroundColor: "rgba(0,0,0,0.7)" },
  }

  return (
    <motion.tr
      ref={ref}
      animate={updated ? "updated" : "default"}
      variants={variants}
      className="border-b last:border-transparent border-gray-700 transition-colors"
      initial={updated || { opacity: 0, transform: "translateY(-30px)"}}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onAnimationComplete={(e) => {
        if(e === "updated"){
          setTimeout(() => {
            ref.current.style.backgroundColor = "transparent";
            setUpdateProductId({id: null});
          }, 300)
        }
      }}
    >
      {children}
    </motion.tr>
  );
}

export default Row;
