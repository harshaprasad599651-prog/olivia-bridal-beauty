import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Gallery from "./components/Gallery";
import WhyChooseUs from "./components/WhyChooseUs";
import Testimonials from "./components/Testimonials";
import BookingCTA from "./components/BookingCTA";
import Footer from "./components/Footer";

import ServicesPackages from "./pages/ServicesPackages";
import AdminDashboard from "./pages/AdminDashboard";
import AdminServices from "./pages/AdminServices";
import AdminPackages from "./pages/AdminPackages";
import Booking from "./pages/Booking";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminCustomers from "./pages/AdminCustomers";


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

      {/* Customer/Public Navigation */}
      <Navbar />

      <Routes>

        {/* =========================
            CUSTOMER / PUBLIC PAGES
        ========================== */}

        {/* Homepage */}
        <Route
          path="/"
          element={<Home />}
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

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        {/* Admin Services */}
        <Route
          path="/admin/services"
          element={<AdminServices />}
        />

        {/* Admin Packages */}
        <Route
          path="/admin/packages"
          element={<AdminPackages />}
        />

        {/* Admin Customers */}
        <Route
          path="/adminCustomers"
          element={<AdminCustomers />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;