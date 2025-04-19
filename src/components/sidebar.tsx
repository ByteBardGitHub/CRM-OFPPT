import { Sidebar, TextInput, Button } from "flowbite-react";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HiChartPie,
  HiClipboard,
  HiCollection,
  HiInformationCircle,
  HiSearch,
  HiShoppingBag,
  HiUsers,
  HiDocumentText,
  HiOfficeBuilding,
  HiCurrencyDollar,
  HiCreditCard,
  HiArchive,
  HiCog,
  HiLogout,
  HiBookOpen
} from "react-icons/hi";
import { motion } from "framer-motion";

const ExampleSidebar: FC = function () {
  const [currentPage, setCurrentPage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentPage(window.location.pathname);
  }, []);

  const handleSignOut = () => {
    // Supprimer les informations de session (ex: token)
    localStorage.removeItem("authToken");

    // Rediriger vers la page de connexion
    navigate("/");
  };

  return (
    <Sidebar aria-label="Sidebar with multi-level dropdown example">
      <div className="flex h-full flex-col justify-between py-2">
        <div>
          <form className="pb-3 md:hidden">
            <TextInput icon={HiSearch} type="search" placeholder="Search" required size={32} />
          </form>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item as={Link} to="/dashboard" icon={HiChartPie} className={currentPage === "/dashboard" ? "bg-gray-100 dark:bg-gray-700" : ""}>
                Dashboard
              </Sidebar.Item>
              <Sidebar.Item as={Link} to="/products" icon={HiShoppingBag} className={currentPage === "products" ? "bg-gray-100 dark:bg-gray-700" : ""}>
                Products
              </Sidebar.Item>
             
              <Sidebar.Item as={Link} to="/reclamation" icon={HiDocumentText} className={currentPage === "/reclamation" ? "bg-gray-100 dark:bg-gray-700" : ""}>
                Reclamation
              </Sidebar.Item>
              <Sidebar.Item as={Link} to="/fournisseurs" icon={HiOfficeBuilding} className={currentPage === "/fournisseurs" ? "bg-gray-100 dark:bg-gray-700" : ""}>
                Fournisseurs
              </Sidebar.Item>
              <Sidebar.Item as={Link} to="/facturation" icon={HiCurrencyDollar} className={currentPage === "/facturation" ? "bg-gray-100 dark:bg-gray-700" : ""}>
                Facturation
              </Sidebar.Item>
              <Sidebar.Item as={Link} to="/paiement" icon={HiCreditCard} className={currentPage === "/paiement" ? "bg-gray-100 dark:bg-gray-700" : ""}>
                Paiement
              </Sidebar.Item>

              <Sidebar.Collapse label="Stock" icon={HiArchive} open={currentPage.startsWith("/stock")}>
                  <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                ></motion.div>
                <Sidebar.Item as={Link} to="/stock/zona1" className={currentPage === "/stock/zona1" ? "bg-gray-100 dark:bg-gray-700" : ""}>
                  Zona 1
                </Sidebar.Item>
                <Sidebar.Item as={Link} to="/stock/zona2" className={currentPage === "/stock/zona2" ? "bg-gray-100 dark:bg-gray-700" : ""}>
                  Zona 2
                </Sidebar.Item>
                <Sidebar.Item as={Link} to="/stock/zona3" className={currentPage === "/stock/zona3" ? "bg-gray-100 dark:bg-gray-700" : ""}>
                  Zona 3
                </Sidebar.Item>
                <Sidebar.Item as={Link} to="/stock/zona4" className={currentPage === "/stock/zona4" ? "bg-gray-100 dark:bg-gray-700" : ""}>
                  Zona 4
                </Sidebar.Item>
              </Sidebar.Collapse>
              <Sidebar.Item as={Link} to="/stagiaires" icon={HiUsers} className={currentPage === "/stagiaires" ? "bg-gray-100 dark:bg-gray-700" : ""}>
                Stagiaires
              </Sidebar.Item>
              <Sidebar.Item as={Link} to="/chambres" icon={HiOfficeBuilding} className={currentPage === "/chambres" ? "bg-gray-100 dark:bg-gray-700" : ""}>
                Chambres
              </Sidebar.Item>
               <Sidebar.Item as={Link} to="/inscription" icon={HiBookOpen} className={currentPage === "/chambres" ? "bg-gray-100 dark:bg-gray-700" : ""}>
                Inscription
              </Sidebar.Item>
               <Sidebar.Item as={Link} to="/users" icon={HiUsers} className={currentPage === "/users/list" ? "bg-gray-100 dark:bg-gray-700" : ""}>
                Users list
              </Sidebar.Item>
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
              <Sidebar.Item as={Link} to="/settings" icon={HiCog}>
                Settings
              </Sidebar.Item>
              <Sidebar.Item onClick={handleSignOut} icon={HiLogout} style={{ cursor: "pointer", color: "red" }}>
                
                  Sign out
              </Sidebar.Item>
           
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </div>
      </div>
    </Sidebar>
  );
};

export default ExampleSidebar;
