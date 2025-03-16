import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import theme from "./flowbite-theme";
import { Flowbite } from "flowbite-react";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import DashboardPage from "./pages";
import SignInPage from "./pages/authentication/sign-in";
import ReclamationPage from "./pages/reclamation";
import FournisseursPage from "./pages/fournisseurs";
import FacturationPage from "./pages/facturation";
import PaiementPage from "./pages/paiement";
import StagiairesPage from "./pages/stagiaires";
import ChambresPage from "./pages/chambres";
import Zona1Page from "./pages/stock/zona1";
import Zona2Page from "./pages/stock/zona2";
import Zona3Page from "./pages/stock/zona3";
import Zona4Page from "./pages/stock/zona4";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute
import Settings from "./pages/settings";
import EcommerceProductsPage from "./pages/e-commerce/products";
import UserListPage from "./pages/users/list";
import Inscription from "./pages/Inscription";

const container = document.getElementById("root");

if (!container) {
  throw new Error("React root element doesn't exist!");
}

const root = createRoot(container);

root.render(
  <StrictMode>
    <Flowbite theme={{ theme }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/reclamation" element={<ReclamationPage />} />
            <Route path="/products" element={<EcommerceProductsPage />} />
            <Route path="/users" element={<UserListPage />} />
            <Route path="/fournisseurs" element={<FournisseursPage />} />
            <Route path="/facturation" element={<FacturationPage />} />
            <Route path="/paiement" element={<PaiementPage />} />
            <Route path="/stagiaires" element={<StagiairesPage />} />
            <Route path="/inscription" element={<Inscription />} />
            <Route path="/chambres" element={<ChambresPage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/stock/zona1" element={<Zona1Page />} />
            <Route path="/stock/zona2" element={<Zona2Page />} />
            <Route path="/stock/zona3" element={<Zona3Page />} />
            <Route path="/stock/zona4" element={<Zona4Page />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Flowbite>
  </StrictMode>
);
