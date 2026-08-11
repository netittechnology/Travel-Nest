import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import WhatsAppButton from "../common/WhatsAppButton";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="w-full flex-1 mx-auto">
        <Outlet />
      </main>

      <Footer />

      <WhatsAppButton />
    </div>
  );
}
