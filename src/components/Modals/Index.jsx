import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "@/store/slice/modalsSlice";
import { useEffect } from "react";
import DangerButton from "@/components/Buttons/DangerButton";
import { CloseIcon } from "@/components/Icons";

function Modal() {
  const { modalContent } = useSelector((state) => state.modals);
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <div className="fixed top-0 right-0 h-full w-[300px] bg-white shadow z-20">
        <div className="p-1 text-right flex justify-end border-b">
          <DangerButton onClick={() => dispatch(closeModal())}>
            <CloseIcon />
          </DangerButton>
        </div>
        <div className="p-3">{modalContent}</div>
      </div>
      <div
        className="fixed inset-0 bg-black opacity-60 z-10"
        onClick={() => dispatch(closeModal())}
      ></div>
    </>
  );
}

export default Modal;
