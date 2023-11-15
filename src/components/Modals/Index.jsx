import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "@/store/slice/modalsSlice";
import { useEffect } from "react";

function Modal() {
  const { modalContent } = useSelector((state) => state.modals);
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    }
  }, []);

  return (
    <>
      <div className="fixed top-0 right-0 h-full w-[400px] bg-white shadow z-20">
        <div className="p-1 text-right flex justify-end border-b">
          <button
            onClick={() => dispatch(closeModal())}
            className="bg-red-500 hover:bg-red-700 transition-colors text-sm text-white h-[32px] w-[32px] rounded grid place-items-center"
          >
            <svg width="16" height="16" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 21.32L21 3.32001" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 3.32001L21 21.32" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div className="p-3">{modalContent}</div>
      </div>
      <div className="fixed inset-0 bg-black opacity-60 z-10"></div>
    </>
  );
}

export default Modal;
