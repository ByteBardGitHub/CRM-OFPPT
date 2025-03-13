import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import type { FC } from "react";
import {
  Breadcrumb,
  Button,
  Table,
} from "flowbite-react";
import {
  HiOutlineExclamationCircle,
  HiPencilAlt,
  HiTrash,
} from "react-icons/hi";

const Zona1Page: FC = function () {
  return (
    <NavbarSidebarLayout>
      <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
        <div className="mb-1 w-full">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Zona 1 Products
          </h1>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                <Table.Head className="bg-gray-100 dark:bg-gray-700">
                  <Table.HeadCell>Nom</Table.HeadCell>
                  <Table.HeadCell>Catégorie</Table.HeadCell>
                  <Table.HeadCell>Lieu</Table.HeadCell>
                  <Table.HeadCell>Niveau de stock</Table.HeadCell>
                  <Table.HeadCell>Consommation</Table.HeadCell>
                  <Table.HeadCell>État</Table.HeadCell>
                  <Table.HeadCell>Action</Table.HeadCell>
                </Table.Head>
                <Table.Body className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  <Table.Row>
                    <Table.Cell>Carrot</Table.Cell>
                    <Table.Cell>Vegetable</Table.Cell>
                    <Table.Cell>Fruit et Legumes</Table.Cell>
                    <Table.Cell>25kg</Table.Cell>
                    <Table.Cell>Quotidienne</Table.Cell>
                    <Table.Cell className="text-green-500">Bon</Table.Cell>
                    <Table.Cell>
                      <Button size="xs" icon={HiPencilAlt} />
                      <Button size="xs" icon={HiTrash} />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Tomate</Table.Cell>
                    <Table.Cell>Vegetable</Table.Cell>
                    <Table.Cell>Fruit et Legumes</Table.Cell>
                    <Table.Cell>45kg</Table.Cell>
                    <Table.Cell>Hebdomadaire</Table.Cell>
                    <Table.Cell className="text-green-500">Bon</Table.Cell>
                    <Table.Cell>
                      <Button size="xs" icon={HiPencilAlt} />
                      <Button size="xs" icon={HiTrash} />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Onion</Table.Cell>
                    <Table.Cell>Vegetable</Table.Cell>
                    <Table.Cell>Fruit et Legumes</Table.Cell>
                    <Table.Cell>5kg</Table.Cell>
                    <Table.Cell>Hebdomadaire</Table.Cell>
                    <Table.Cell className="text-yellow-500">Endommagé</Table.Cell>
                    <Table.Cell>
                      <Button size="xs" icon={HiPencilAlt} />
                      <Button size="xs" icon={HiTrash} />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Cucumber</Table.Cell>
                    <Table.Cell>Vegetable</Table.Cell>
                    <Table.Cell>Fruit et Legumes</Table.Cell>
                    <Table.Cell>35kg</Table.Cell>
                    <Table.Cell>Quotidienne</Table.Cell>
                    <Table.Cell className="text-green-500">Bon</Table.Cell>
                    <Table.Cell>
                      <Button size="xs" icon={HiPencilAlt} />
                      <Button size="xs" icon={HiTrash} />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Potato</Table.Cell>
                    <Table.Cell>Vegetable</Table.Cell>
                    <Table.Cell>Fruit et Legumes</Table.Cell>
                    <Table.Cell>90kg</Table.Cell>
                    <Table.Cell>Hebdomadaire</Table.Cell>
                    <Table.Cell className="text-green-500">Bon</Table.Cell>
                    <Table.Cell>
                      <Button size="xs" icon={HiPencilAlt} />
                      <Button size="xs" icon={HiTrash} />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Aubergine</Table.Cell>
                    <Table.Cell>Vegetable</Table.Cell>
                    <Table.Cell>Fruit et Legumes</Table.Cell>
                    <Table.Cell>40kg</Table.Cell>
                    <Table.Cell>Quotidienne</Table.Cell>
                    <Table.Cell className="text-green-500">Bon</Table.Cell>
                    <Table.Cell>
                      <Button size="xs" icon={HiPencilAlt} />
                      <Button size="xs" icon={HiTrash} />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Green Peas</Table.Cell>
                    <Table.Cell>Vegetable</Table.Cell>
                    <Table.Cell>Fruit et Legumes</Table.Cell>
                    <Table.Cell>2kg</Table.Cell>
                    <Table.Cell>Hebdomadaire</Table.Cell>
                    <Table.Cell className="text-yellow-500">Endommagé</Table.Cell>
                    <Table.Cell>
                      <Button size="xs" icon={HiPencilAlt} />
                      <Button size="xs" icon={HiTrash} />
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </NavbarSidebarLayout>
  );
};

export default Zona1Page;
