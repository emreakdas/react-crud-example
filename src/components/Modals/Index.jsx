import { useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "@/store/slice/modalsSlice";
import DangerButton from "@/components/Buttons/DangerButton";
import { CloseIcon } from "@/components/Icons";

function Modal() {
  const { modalContent } = useSelector((state) => state.modals);
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      setTimeout(() => {
        document.body.style.overflow = "auto";
      }, 200);
    };
  }, []);

  return (
    <div>
      <motion.div
        animate={{ right: 0 }}
        exit={{ right: "-300px" }}
        transition={{ duration: 0.2 }}
        className="fixed top-0 right-[-300px] h-full w-[300px] bg-white shadow z-20"
      >
        <div className="p-1 text-right flex justify-end border-b">
          <DangerButton onClick={() => dispatch(closeModal())}>
            <CloseIcon />
          </DangerButton>
        </div>
        <div className="p-3">{modalContent}</div>
      </motion.div>
      <div
        className="fixed inset-0 bg-black opacity-60 z-10"
        onClick={() => dispatch(closeModal())}
      ></div>
    </div>
  );
}

export default Modal;
