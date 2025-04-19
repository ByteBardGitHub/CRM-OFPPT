/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Breadcrumb,
  Button,
  Checkbox,
  Label,
  Table,
  TextInput,
} from "flowbite-react";
import type { FC } from "react";
import { useState } from "react";
import {
  HiDocumentDownload,
  HiDotsVertical,
  HiHome,
  HiPlus,
} from "react-icons/hi";
import NavbarSidebarLayout from "../layouts/navbar-sidebar";

const FournisseursPage: FC = function () {
  return (
    <NavbarSidebarLayout isFooter={false}>
      <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
        <div className="mb-1 w-full">
          <div className="mb-4">
            <Breadcrumb className="mb-4">
              <Breadcrumb.Item href="#">
                <div className="flex items-center gap-x-3">
                  <HiHome className="text-xl" />
                  <span className="dark:text-white">Home</span>
                </div>
              </Breadcrumb.Item>
              <Breadcrumb.Item href="/fournisseurs">Fournisseurs</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              List Fournisseurs
            </h1>
          </div>
          <div className="sm:flex">
            <div className="mb-3 hidden items-center dark:divide-gray-700 sm:mb-0 sm:flex sm:divide-x sm:divide-gray-100">
              <form className="lg:pr-3">
                <Label htmlFor="fournisseurs-search" className="sr-only">
                  Search
                </Label>
                <div className="relative mt-1 lg:w-64 xl:w-96">
                  <TextInput
                    id="fournisseurs-search"
                    name="fournisseurs-search"
                    placeholder="Search for fournisseurs"
                  />
                </div>
              </form>
            </div>
            <div className="ml-auto flex items-center space-x-2 sm:space-x-3">
              <Button color="gray">
                <div className="flex items-center gap-x-3">
                  <HiDocumentDownload className="text-xl" />
                  <span>Export</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <FournisseursTable />
            </div>
          </div>
        </div>
      </div>
    </NavbarSidebarLayout>
  );
};

const FournisseursTable: FC = function () {

  const fournisseurs = [
    {
      name: "Robert Fox",
      email: "atlas.distribution@gmail.com",
      phone: "(+212) 555-0110",
      category: "Matériel",
      location: "Austin",
    },
    {
      name: "Cody Fisher",
      email: "maghreb@gmail.com",
      phone: "(+212) 555-0125",
      category: "Produits Conservés",
      location: "Orange",
    },
    {
      name: "Albert Flores",
      email: "agrosuppliers@gmail.com",
      phone: "(+212) 555-0127",
      category: "Produits Conservés",
      location: "Pembroke Pines",
    },
    {
      name: "Floyd Miles",
      email: "saharaproduits@gmail.com",
      phone: "(+212) 555-0128",
      category: "Matériel",
      location: "Fairfield",
    },
    {
      name: "Arlene McCoy",
      email: "primeurs@fruitsetlegumes.ma",
      phone: "(+212) 555-0114",
      category: "Fruits & Légumes",
      location: "Toledo",
    },
  ];

  return (
    <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
      <Table.Head className="bg-gray-100 dark:bg-gray-700">
        <Table.HeadCell>
          <Label htmlFor="select-all" className="sr-only">
            Select all
          </Label>
          <Checkbox id="select-all" name="select-all" />
        </Table.HeadCell>
        <Table.HeadCell>Name</Table.HeadCell>
        <Table.HeadCell>Email</Table.HeadCell>
        <Table.HeadCell>Phone</Table.HeadCell>
        <Table.HeadCell>Category</Table.HeadCell>
        <Table.HeadCell>Location</Table.HeadCell>
        <Table.HeadCell>Actions</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
        {fournisseurs.map((fournisseur, index) => (
          <Table.Row
            key={index}
            className="hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Table.Cell className="w-4 p-4">
              <div className="flex items-center">
                <Checkbox
                  aria-describedby={`checkbox-${index}`}
                  id={`checkbox-${index}`}
                />
                <label htmlFor={`checkbox-${index}`} className="sr-only">
                  checkbox
                </label>
              </div>
            </Table.Cell>
            <Table.Cell className="mr-12 flex items-center space-x-6 whitespace-nowrap p-4 lg:mr-0">
              <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                <div className="text-base font-semibold text-gray-900 dark:text-white">
                  {fournisseur.name}
                </div>
                <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  {fournisseur.email}
                </div>
              </div>
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
              {fournisseur.phone}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
              {fournisseur.category}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
              {fournisseur.location}
            </Table.Cell>
            <Table.Cell>
              <div className="flex items-center gap-x-3 whitespace-nowrap">
                <Button size="xs" color="gray">
                  Mail
                </Button>
                <Button size="xs" color="gray">
                  <HiDotsVertical className="text-xl" />
                </Button>
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default FournisseursPage;
