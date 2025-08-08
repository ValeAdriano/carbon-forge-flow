import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { HelmetProvider } from "./components/SEO";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import Index from "./pages/Index";
import Marketplace from "./pages/Marketplace";
import ListingDetail from "./pages/ListingDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import SellerDashboard from "./pages/seller/Dashboard";
import SellerListings from "./pages/seller/Listings";
import SellerNewListing from "./pages/seller/NewListing";
import SellerOrders from "./pages/seller/Orders";
import SellerProfile from "./pages/seller/Profile";
import BuyerDashboard from "./pages/buyer/Dashboard";
import BuyerPurchases from "./pages/buyer/Purchases";
import BuyerProfile from "./pages/buyer/Profile";
import AdminPanel from "./pages/admin/Panel";
import AdminListingsModeration from "./pages/admin/ListingsModeration";
import AdminUsers from "./pages/admin/Users";
import AdminOrders from "./pages/admin/Orders";
import AdminSettings from "./pages/admin/Settings";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./routes/PrivateRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <AuthProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route element={<MainLayout />}> 
                  <Route index element={<Index />} />
                  <Route path="marketplace" element={<Marketplace />} />
                  <Route path="marketplace/:id" element={<ListingDetail />} />
                  <Route path="cart" element={<Cart />} />
                  <Route path="checkout" element={<Checkout />} />
                  <Route path="orders/:id/success" element={<OrderSuccess />} />

                  <Route path="auth/login" element={<Login />} />
                  <Route path="auth/register" element={<Register />} />

                  <Route path="seller" element={<PrivateRoute roles={["seller"]}><SellerDashboard /></PrivateRoute>} />
                  <Route path="seller/listings" element={<PrivateRoute roles={["seller"]}><SellerListings /></PrivateRoute>} />
                  <Route path="seller/new" element={<PrivateRoute roles={["seller"]}><SellerNewListing /></PrivateRoute>} />
                  <Route path="seller/orders" element={<PrivateRoute roles={["seller"]}><SellerOrders /></PrivateRoute>} />
                  <Route path="seller/profile" element={<PrivateRoute roles={["seller"]}><SellerProfile /></PrivateRoute>} />

                  <Route path="buyer" element={<PrivateRoute roles={["buyer"]}><BuyerDashboard /></PrivateRoute>} />
                  <Route path="buyer/purchases" element={<PrivateRoute roles={["buyer"]}><BuyerPurchases /></PrivateRoute>} />
                  <Route path="buyer/profile" element={<PrivateRoute roles={["buyer"]}><BuyerProfile /></PrivateRoute>} />

                  <Route path="admin" element={<PrivateRoute roles={["admin"]}><AdminPanel /></PrivateRoute>} />
                  <Route path="admin/listings" element={<PrivateRoute roles={["admin"]}><AdminListingsModeration /></PrivateRoute>} />
                  <Route path="admin/users" element={<PrivateRoute roles={["admin"]}><AdminUsers /></PrivateRoute>} />
                  <Route path="admin/orders" element={<PrivateRoute roles={["admin"]}><AdminOrders /></PrivateRoute>} />
                  <Route path="admin/settings" element={<PrivateRoute roles={["admin"]}><AdminSettings /></PrivateRoute>} />

                  <Route path="about" element={<About />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="terms" element={<Terms />} />
                  <Route path="privacy" element={<Privacy />} />

                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </CartProvider>
      </AuthProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
