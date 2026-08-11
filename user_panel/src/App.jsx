import { Route, useLocation, Navigate } from "react-router-dom";
import useAuthStore from "./lib/authStore";

/* common */
import AppToast from "./common/AppToast";
import AnimatedRoutes from "./common/AnimatedRoutes";
import ScrollToTop from "./common/ScrollToTop";
import ScrollToTopButton from "./common/ScrollToTopButton";

/* layouts */
import MainLayout from "./layouts/MainLayout";
import FullPageLayout from "./layouts/FullPageLayout";
import PageWithNavbar from "./layouts/PageWithNavbar";

/* User Pages */
import TailorMadeTours from "./pages/TailorMadeTours";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import Hotels from "./pages/Hotels";
import HotelDetails from "./pages/HotelDetails";
import Itineraries from "./pages/Itineraries";
import ItineraryDetails from "./pages/ItineraryDetails";
import Blogs from "./pages/Blogs";
import BlogDetails from "./pages/BlogDetails";
import Gallery from "./pages/Gallery";
import Experiences from "./pages/Experiences";
import ExperienceDetails from "./pages/ExperienceDetails";
import PrivayPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";

export default function App() {
  const isHydrated = useAuthStore((s) => s.isHydrated);
  const isAuthLoading = useAuthStore((s) => s.isAuthLoading);
  const location = useLocation();

  if (!isHydrated || isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="h-8 w-8 animate-spin rounded-full border-4 border-green-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <AppToast />
      <ScrollToTop />
      <AnimatedRoutes location={location}>

        {/* ================= MAIN SITE ================= */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/hotels/:id" element={<HotelDetails />} />
          <Route path="/itineraries" element={<Itineraries />} />
          <Route path="/itinerary/:slug" element={<ItineraryDetails />} />
          <Route path="/blog" element={<Blogs />} />
          <Route path="/blog/:slug" element={<BlogDetails />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/experience" element={<Experiences />} />
          <Route path="/experience/:id" element={<ExperienceDetails />} />
          <Route path="/custom-tours" element={<TailorMadeTours />} />
          <Route path="/privacy-policy" element={<PrivayPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsConditions />} />
        </Route>

        {/* ================= NAVBAR PAGES ================= */}
        <Route element={<PageWithNavbar />}></Route>

        {/* ================= AUTH / FALLBACK ================= */}
        <Route element={<FullPageLayout />}>
          <Route path="*" element={<NotFound />} />
        </Route>
      </AnimatedRoutes>

      <ScrollToTopButton />
    </div>
  );
}
