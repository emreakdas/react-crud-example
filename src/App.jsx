import { Toaster } from "sonner";
import Modal from "@/components/Modals/Index";
import Products from "@/pages/Products";
import Users from "@/pages/Users";
import NotFound from "@/pages/NotFound";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";

function App() {
  const { openedModal } = useSelector((state) => state.modals);

  return (
    <>
      <Header />
      <div className="container px-3 mx-auto my-6">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/users" element={<Users />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {openedModal && <Modal />}
        <Toaster position="bottom-center" richColors />
      </div>
    </>
  );
}

export default App;
