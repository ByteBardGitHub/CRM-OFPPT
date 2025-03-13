import { Sidebar, TextInput } from "flowbite-react";
import type { FC } from "react";
import { useEffect, useState } from "react";
import {
  HiChartPie,
  HiClipboard,
  HiCollection,
  HiInformationCircle,
  HiLogin,
  HiPencil,
  HiSearch,
  HiShoppingBag,
  HiUsers,
  HiDocumentText,
  HiOfficeBuilding,
  HiCurrencyDollar,
  HiCreditCard,
  HiArchive,
  HiCog,
} from "react-icons/hi";

const ExampleSidebar: FC = function () {
  const [currentPage, setCurrentPage] = useState("");

  useEffect(() => {
    const newPage = window.location.pathname;

    setCurrentPage(newPage);
  }, [setCurrentPage]);

  return (
    <Sidebar aria-label="Sidebar with multi-level dropdown example">
      <div className="flex h-full flex-col justify-between py-2">
        <div>
          <form className="pb-3 md:hidden">
            <TextInput
              icon={HiSearch}
              type="search"
              placeholder="Search"
              required
              size={32}
            />
          </form>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                href="/"
                icon={HiChartPie}
                className={
                  "/" === currentPage ? "bg-gray-100 dark:bg-gray-700" : ""
                }
              >
                Dashboard
              </Sidebar.Item>
              <Sidebar.Item
                href="/e-commerce/products"
                icon={HiShoppingBag}
                className={
                  "/e-commerce/products" === currentPage
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }
              >
                Products
              </Sidebar.Item>
              <Sidebar.Item
                href="/users/list"
                icon={HiUsers}
                className={
                  "/users/list" === currentPage
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }
              >
                Users list
              </Sidebar.Item>
              <Sidebar.Item
                href="/reclamation"
                icon={HiDocumentText}
                className={
                  "/reclamation" === currentPage
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }
              >
                Reclamation
              </Sidebar.Item>
              <Sidebar.Item
                href="/fournisseurs"
                icon={HiOfficeBuilding}
                className={
                  "/fournisseurs" === currentPage
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }
              >
                Fournisseurs
              </Sidebar.Item>
              <Sidebar.Item
                href="/facturation"
                icon={HiCurrencyDollar}
                className={
                  "/facturation" === currentPage
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }
              >
                Facturation
              </Sidebar.Item>
              <Sidebar.Item
                href="/paiement"
                icon={HiCreditCard}
                className={
                  "/paiement" === currentPage
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }
              >
                Paiement
              </Sidebar.Item>
              <Sidebar.Collapse
                label="Stock"
                icon={HiArchive}
                open={currentPage.startsWith("/stock")}
              >
                <Sidebar.Item
                  href="/stock/zona1"
                  className={
                    "/stock/zona1" === currentPage
                      ? "bg-gray-100 dark:bg-gray-700"
                      : ""
                  }
                >
                  Zona 1
                </Sidebar.Item>
                <Sidebar.Item
                  href="/stock/zona2"
                  className={
                    "/stock/zona2" === currentPage
                      ? "bg-gray-100 dark:bg-gray-700"
                      : ""
                  }
                >
                  Zona 2
                </Sidebar.Item>
                <Sidebar.Item
                  href="/stock/zona3"
                  className={
                    "/stock/zona3" === currentPage
                      ? "bg-gray-100 dark:bg-gray-700"
                      : ""
                  }
                >
                  Zona 3
                </Sidebar.Item>
                <Sidebar.Item
                  href="/stock/zona4"
                  className={
                    "/stock/zona4" === currentPage
                      ? "bg-gray-100 dark:bg-gray-700"
                      : ""
                  }
                >
                  Zona 4
                </Sidebar.Item>
              </Sidebar.Collapse>
              <Sidebar.Item
                href="/stagiaires"
                icon={HiUsers}
                className={
                  "/stagiaires" === currentPage
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }
              >
                Stagiaires
              </Sidebar.Item>
              <Sidebar.Item
                href="/chambres"
                icon={HiOfficeBuilding}
                className={
                  "/chambres" === currentPage
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }
              >
                Chambres
              </Sidebar.Item>
              <Sidebar.Item href="/authentication/sign-in" icon={HiLogin}>
                Sign in
              </Sidebar.Item>
              <Sidebar.Item href="/authentication/sign-up" icon={HiPencil}>
                Sign up
              </Sidebar.Item>
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                href="/settings"
                icon={HiCog}
              >
                Settings
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </div>
      </div>
    </Sidebar>
  );
};

export default ExampleSidebar;
