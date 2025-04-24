import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import type { FC } from "react";


const Zona1Page: FC = function () {
  return (
    <NavbarSidebarLayout>
      <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
        <div className="mb-1 w-full">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
           Fruits
          </h1>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              
            </div>
          </div>
        </div>
      </div>
    </NavbarSidebarLayout>
  );
};

export default Zona1Page;
