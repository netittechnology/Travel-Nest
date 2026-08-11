import { Route, useLocation, Navigate } from "react-router-dom";
import useAuthStore from "./lib/authStore";

/* common */
import AppToast from "./common/AppToast";
import AnimatedRoutes from "./common/AnimatedRoutes";
import ScrollToTop from "./common/ScrollToTop";
import ScrollToTopButton from "./common/ScrollToTopButton";

/* layouts */
import FullPageLayout from "./layouts/FullPageLayout";
import AdminLayout from "./layouts/AdminLayout";

/* Protected Route */
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";

/* Pages */
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import AdminDashboard from "./pages/Dashboard";
import DestinationList from "./pages/manageDestinations/DestinationList";
import AddDestination from "./pages/manageDestinations/AddDestination";
import EditDestination from "./pages/manageDestinations/EditDestination";
import TourList from "./pages/manageTours/TourList";
import AddTour from "./pages/manageTours/AddTour";
import EditTour from "./pages/manageTours/EditTour";
import AddHotel from "./pages/manageHotel/AddHotel";
import EditHotel from "./pages/manageHotel/EditHotel";
import HotelList from "./pages/manageHotel/HotelList";
import AddBlog from "./pages/manageBlogs/AddBlog";
import EditBlog from "./pages/manageBlogs/EditBlog";
import BlogList from "./pages/manageBlogs/BlogList";
import AddExperience from "./pages/manageExperiences/AddExperience";
import EditExperience from "./pages/manageExperiences/EditExperience";
import ExperienceList from "./pages/manageExperiences/ExperienceList";
import AddGalleryImage from "./pages/manageGallery/AddGalleryImage";
import GalleryList from "./pages/manageGallery/GalleryList";
import TourBooking from "./pages/manageBookings/TourBooking";
import TourReview from "./pages/TourReview";
import AddUser from "./pages/manageUsers/AddUser";
import UserList from "./pages/manageUsers/UserList";
import TailorMadeTourBooking from "./pages/manageBookings/TailorMadeTourBooking";

export default function App() {
  const user = useAuthStore((s) => s.user);
  const accessToken = useAuthStore((s) => s.accessToken);
  const isHydrated = useAuthStore((s) => s.isHydrated);
  const isAuthLoading = useAuthStore((s) => s.isAuthLoading);
  const isLoggedIn = Boolean(user && accessToken);
  const role = user?.role;
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
        <Route
          path="/"
          element={
            isLoggedIn && role === "ADMIN" ? (
              <Navigate to="/admin/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        
        {/* ================= ADMIN ROUTES ================= */}
        {/* Admin Login */}
        <Route
          path="/login"
          element={
            isLoggedIn && role === "ADMIN" ? (
              <Navigate to="/admin/dashboard" replace />
            ) : (
              <AdminLogin />
            )
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route element={<ProtectedAdminRoute />}>
          <Route element={<AdminLayout />}>
            {/* Admin Dashboard */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            {/* Admin Destinations */}
            <Route path="/admin/destinations" element={<DestinationList />} />
            <Route
              path="/admin/destinations/add"
              element={<AddDestination />}
            />
            <Route
              path="/admin/destinations/edit/:id"
              element={<EditDestination />}
            />
            {/* Admin Tours */}
            <Route path="/admin/tours" element={<TourList />} />
            <Route path="/admin/tours/add" element={<AddTour />} />
            <Route path="/admin/tours/edit/:id" element={<EditTour />} />
            {/* Admin Hotles */}
            <Route path="/admin/hotels" element={<HotelList />} />
            <Route path="/admin/hotels/add" element={<AddHotel />} />
            <Route path="/admin/hotels/edit/:id" element={<EditHotel />} />
            {/* Admin Blogs */}
            <Route path="/admin/blogs" element={<BlogList />} />
            <Route path="/admin/blogs/add" element={<AddBlog />} />
            <Route path="/admin/blogs/edit/:id" element={<EditBlog />} />
            {/* Admin Experiences */}
            <Route path="/admin/experiences" element={<ExperienceList />} />
            <Route path="/admin/experiences/add" element={<AddExperience />} />
            <Route
              path="/admin/experiences/edit/:id"
              element={<EditExperience />}
            />
            {/* Admin Gallery */}
            <Route path="/admin/gallery" element={<GalleryList />} />
            <Route path="/admin/gallery/add" element={<AddGalleryImage />} />
            {/* Admin Tour Booking */}
            <Route path="/admin/tour-booking" element={<TourBooking />} />
            {/* Admin Tour Review */}
            <Route path="/admin/tour-reviews" element={<TourReview />} />
            {/* Admin Management */}
            <Route path="/admin/users" element={<UserList />} />
            <Route path="/admin/users/add" element={<AddUser />} />
            {/* Admin Tailor Made Tour Booking */}
            <Route
              path="/admin/tailor-made-tour-booking"
              element={<TailorMadeTourBooking />}
            />
          </Route>
        </Route>

        {/* ================= AUTH / FALLBACK ================= */}
        <Route element={<FullPageLayout />}>
          <Route path="*" element={<NotFound />} />
        </Route>
      </AnimatedRoutes>

      <ScrollToTopButton />
    </div>
  );
}
