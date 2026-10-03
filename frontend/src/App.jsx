import { BrowserRouter, Routes, Route } from "react-router-dom";


import CustomerLayout from "./components/customer/CustomerLayout";
import AdminLayout from "./components/admin/AdminLayout";


import Hero from "./components/Hero";
import About from "./components/About";
import Gallery from "./components/Gallery";
import WhyChooseUs from "./components/WhyChooseUs";
import Testimonials from "./components/Testimonials";
import BookingCTA from "./components/BookingCTA";
import Footer from "./components/Footer";



import AdminDashboard from "./pages/AdminDashboard";
import AdminServices from "./pages/AdminServices";
import AdminPackages from "./pages/AdminPackages";
import AdminCustomers from "./pages/AdminCustomers";
import AdminBookings from "./pages/AdminBookings";

import ServicesPackages from "./pages/ServicesPackages";
import Booking from "./pages/Booking";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyBookings from "./pages/MyBookings"


function Home() {
  return (
    <>
      <main>
        <Hero />
        <About />
        <Gallery />
        <WhyChooseUs />
        <Testimonials />
        <BookingCTA />
      </main>

      <Footer />
    </>
  );
}


function App() {
  return (
    <BrowserRouter>

      

      <Routes>

        {/* =========================
            CUSTOMER / PUBLIC PAGES
        ========================== */}

        {/* Homepage */}
        <Route
          path="/"
          element={
          <CustomerLayout>
          <Home/>
          </CustomerLayout>
          }
        />

        {/* Services & Packages */}
        <Route
          path="/services"
          element={<ServicesPackages />}
        />

        {/* Booking */}
        <Route
          path="/booking"
          element={<Booking />}
        />

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Register */}
        <Route
          path="/register"
          element={<Register />}
        />


        {/* =========================
            ADMIN PAGES
        ========================== */}

       
          <Route
            path="/admin"
            element={
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            }
          />

          <Route
            path="/admin/services"
            element={
              <AdminLayout>
                <AdminServices />
              </AdminLayout>
            }
          />

          <Route
            path="/admin/packages"
            element={
              <AdminLayout>
                <AdminPackages />
              </AdminLayout>
            }
          />

          <Route
            path="/admin/bookings"
            element={
              <AdminLayout>
                <AdminBookings />
              </AdminLayout>
            }
          />

          <Route
            path="/adminCustomers"
            element={
              <AdminLayout>
                <AdminCustomers />
              </AdminLayout>
            }
          />

          <Route path="/my-bookings" element={<MyBookings />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;