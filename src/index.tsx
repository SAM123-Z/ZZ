import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Home } from "./screens/Home/Home";
import { Categories } from "./screens/Categories/Categories";
import { Restaurants } from "./screens/Restaurants/Restaurants";
import { CheckoutConfirmation } from "./screens/Checkout/CheckoutConfirmation";
import { OrderSuccess } from "./screens/Checkout/OrderSuccess";
import { HeaderSection } from "./screens/Home/sections/HeaderSection";
import { FooterSection } from "./screens/Home/sections/FooterSection/FooterSection";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { FeedbackPage } from "./screens/Feedback/FeedbackPage";
import { RestaurantSignup } from "./screens/RestaurantSignup";
import { RestaurantDashboard } from "./screens/RestaurantDashboard/RestaurantDashboard";
import { Profile } from "./screens/Profile/Profile";

const AppContent = () => {
  const location = useLocation();
  const isDashboard = location.pathname === '/restaurant-dashboard';
  const isRestaurantSignup = location.pathname === '/restaurant-signup';

  return (
    <div className="flex flex-col min-h-screen">
      {!isDashboard && <HeaderSection />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/checkout" element={<CheckoutConfirmation />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/restaurant-signup" element={<RestaurantSignup />} />
          <Route path="/restaurant-dashboard" element={<RestaurantDashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
      {!isDashboard && !isRestaurantSignup && <FooterSection />}
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);