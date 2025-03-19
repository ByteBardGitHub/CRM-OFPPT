
import {
  Breadcrumb,
  Button,
  Checkbox,
  Label,
  Modal,
  Table,
  Textarea,
  TextInput,
} from "flowbite-react";
import type { FC } from "react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import {
  HiCog,
  HiDotsVertical,
  HiExclamationCircle,
  HiHome,
  HiOutlineExclamationCircle,
  HiPencilAlt,
  HiTrash,
  HiUpload,
} from "react-icons/hi";
import NavbarSidebarLayout from "../layouts/navbar-sidebar";
import { } from "flowbite-react";
import { useEffect } from "react";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Inscription: FC = function () {
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
        
              <Breadcrumb.Item>Inscriptions</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              All Inscriptions
            </h1>
          </div>
          <div className="block items-center sm:flex">
            <SearchForInscription />
            <div className="flex w-full items-center sm:justify-end">
              <AddInscriptionModal />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <InscriptionsTable />
            </div>
          </div>
        </div>
      </div>
    
    </NavbarSidebarLayout>
  );
};

const SearchForInscription: FC = function () {
  return (
    <form className="mb-4 sm:mb-0 sm:pr-3" action="#" method="GET">
      <Label htmlFor="Inscriptions-search" className="sr-only">
        Search
      </Label>
      <div className="relative mt-1 lg:w-64 xl:w-96">
        <TextInput
          id="Inscriptions-search"
          name="Inscriptions-search"
          placeholder="Search for Inscriptions"
        />
      </div>
    </form>
  );
};

const AddInscriptionModal: FC = function () {
  const [isOpen, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [birthDate, setBirthDate] = useState('');
  
  const [distance, setDistance] = useState(0);

  const [familyCriteria, setFamilyCriteria] = useState<string>('');
  const [schoolCriteria, setSchoolCriteria] = useState<string>('');
  const [socialCriteria, setSocialCriteria] = useState<string>('');
  const [physicalCriteria, setPhysicalCriteria] = useState<string>('');

  const [totalPoints, setTotalPoints] = useState<number>(0);

  const criteriaOptions = {
    "Critère familial": [
      { case: "Les parents sont vivants", points: 0 },
      { case: "Parents divorcés", points: 10 },
      { case: "Sa mère ou son père est mort", points: 10 }
    ],
    "Critère scolaire": [
      { case: "Niveau", points: 20 },
      { case: "Niveau technicien", points: 15 },
      { case: "Technicien", points: 10 },
      { case: "Technicien spécialisé", points: 5 }
    ],
    "Critère social": [
      { case: "Dispose d'une couverture santé", points: 0 },
      { case: "Il n'est pas obligé de le lui donner", points: 10 }
    ],
    "Critère physique": [
      { case: "Handicapé", points: 10 },
      { case: "Ne pas handicapé", points: 0 }
    ]
  };

  // Calculate points automatically when any criteria is selected
  useEffect(() => {
    const calculatePoints = () => {
      let points = 0;
      if (familyCriteria) points += criteriaOptions["Critère familial"].find(option => option.case === familyCriteria)?.points || 0;
      if (schoolCriteria) points += criteriaOptions["Critère scolaire"].find(option => option.case === schoolCriteria)?.points || 0;
      if (socialCriteria) points += criteriaOptions["Critère social"].find(option => option.case === socialCriteria)?.points || 0;
      if (physicalCriteria) points += criteriaOptions["Critère physique"].find(option => option.case === physicalCriteria)?.points || 0;

      setTotalPoints(points);
    };

    calculatePoints();
  }, [familyCriteria, schoolCriteria, socialCriteria, physicalCriteria]);

  const handleSubmit = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error("No auth token found");
      return;
    }

    const newInscription = {
      name,
      phone,
      email,
      address,
      birthDate,
      familyCriteria,
      schoolCriteria,
      socialCriteria,
      physicalCriteria,
      distance,
      totalPoints // Send the calculated points here
    };

    try {
      const response = await axios.post('http://localhost:3002/api/inscriptions/', newInscription, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Inscription created successfully:', response.data);

      // Show success notification
      toast.success("Inscription ajoutée avec succès!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setOpen(false); // Close the modal
    } catch (error) {
      console.error('Error creating inscription:', error);

      // Show error notification
      toast.error("Erreur lors de l'ajout de l'inscription. Essayez à nouveau.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <Button color="primary" onClick={() => setOpen(!isOpen)}>
        <FaPlus className="mr-3 text-sm" />
        Ajouter une inscription
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Ajouter une inscription</strong>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div>
                <Label htmlFor="name">Nom du stagiaire</Label>
                <TextInput
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="phone">Téléphone</Label>
                <TextInput
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="555123456"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <TextInput
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="johndoe@example.com"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="address">Adresse</Label>
                <TextInput
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="789 Maple Street"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="birthDate">Date de naissance</Label>
                <TextInput
                  id="birthDate"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  placeholder="2005-12-15"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="distance">Distance</Label>
                <TextInput
                  id="distance"
                  value={distance}
                  onChange={(e) => setDistance(Number(e.target.value))}
                  type="number"
                  placeholder="60"
                  className="mt-1"
                />
              </div>

              {/* Family Criteria */}
              <div>
                <Label>Critère familial</Label>
                <select
                  value={familyCriteria}
                  onChange={(e) => setFamilyCriteria(e.target.value)}
                  className="mt-1 block w-full"
                >
                  <option value="">Sélectionnez un critère familial</option>
                  {criteriaOptions["Critère familial"].map((option) => (
                    <option key={option.case} value={option.case}>
                      {option.case}
                    </option>
                  ))}
                </select>
              </div>

              {/* School Criteria */}
              <div>
                <Label>Critère scolaire</Label>
                <select
                  value={schoolCriteria}
                  onChange={(e) => setSchoolCriteria(e.target.value)}
                  className="mt-1 block w-full"
                >
                  <option value="">Sélectionnez un critère scolaire</option>
                  {criteriaOptions["Critère scolaire"].map((option) => (
                    <option key={option.case} value={option.case}>
                      {option.case}
                    </option>
                  ))}
                </select>
              </div>

              {/* Social Criteria */}
              <div>
                <Label>Critère social</Label>
                <select
                  value={socialCriteria}
                  onChange={(e) => setSocialCriteria(e.target.value)}
                  className="mt-1 block w-full"
                >
                  <option value="">Sélectionnez un critère social</option>
                  {criteriaOptions["Critère social"].map((option) => (
                    <option key={option.case} value={option.case}>
                      {option.case}
                    </option>
                  ))}
                </select>
              </div>

              {/* Physical Criteria */}
              <div>
                <Label>Critère physique</Label>
                <select
                  value={physicalCriteria}
                  onChange={(e) => setPhysicalCriteria(e.target.value)}
                  className="mt-1 block w-full"
                >
                  <option value="">Sélectionnez un critère physique</option>
                  {criteriaOptions["Critère physique"].map((option) => (
                    <option key={option.case} value={option.case}>
                      {option.case}
                    </option>
                  ))}
                </select>
              </div>

              {/* Display calculated points */}
              <div>
                <Label>Points totaux</Label>
                <div className="text-xl font-semibold">{totalPoints}</div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary" onClick={handleSubmit}>
            Ajouter l'inscription
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast Notifications Container */}
      <ToastContainer />
    </>
  );
};


const EditInscriptionModal: FC<{ inscriptionId: string }> = ({ inscriptionId }) => {
  const [isOpen, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    birthDate: '',
    criteriaPoints: {} as Record<string, number>,
    distance: '',
    status: '',
  });

  useEffect(() => {
    const fetchInscription = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Get token

        const response = await axios.get(`http://localhost:3002/api/inscriptions/${inscriptionId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFormData(response.data);
      } catch (err) {
        console.error('Error fetching inscription data:', err);
      }
    };

    if (inscriptionId) {
      fetchInscription();
    }
  }, [inscriptionId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCriteriaPointsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    try {
      const parsedCriteriaPoints = value ? JSON.parse(value) : {};
      // Validate if the parsedCriteriaPoints is an object
      if (typeof parsedCriteriaPoints === "object" && parsedCriteriaPoints !== null) {
        setFormData((prevData) => ({
          ...prevData,
          criteriaPoints: parsedCriteriaPoints,
        }));
      } else {
        console.error('Invalid criteriaPoints format');
      }
    } catch (err) {
      console.error('Invalid criteriaPoints format:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('authToken');

    const updatedData = {
    ...formData,
    distance: parseFloat(formData.distance),  // Ensure it's a number
    criteriaPoints: typeof formData.criteriaPoints === "string"
        ? JSON.parse(formData.criteriaPoints)
        : formData.criteriaPoints,
    };
      // Ensure points is calculated based on criteriaPoints
      updatedData.points = Object.values(updatedData.criteriaPoints).reduce((total, points) => total + points, 0);

      console.log('Sending PUT request with:', updatedData);

      const response = await axios.put(
        `http://localhost:3002/api/inscriptions/${inscriptionId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Updated inscription:', response.data);
      setOpen(false);
    } catch (err) {
      console.error('Error updating inscription:', err);
    }
  };

  return (
    <>
      <Button color="primary" onClick={() => setOpen(true)}>
        <HiPencilAlt className="mr-2 text-lg" />
        Edit item
      </Button>

      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Edit Inscription</strong>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div>
                <Label htmlFor="name">Inscription name</Label>
                <TextInput
                  id="name"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleInputChange}
                  placeholder="Apple iMac 27"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <TextInput
                  id="phone"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleInputChange}
                  placeholder="123-456-7890"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <TextInput
                  id="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleInputChange}
                  placeholder="example@example.com"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <TextInput
                  id="address"
                  name="address"
                  value={formData.address || ''}
                  onChange={handleInputChange}
                  placeholder="123 Main St."
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="birthDate">Birth Date</Label>
                <TextInput
                  id="birthDate"
                  name="birthDate"
                  value={formData.birthDate || ''}
                  onChange={handleInputChange}
                  placeholder="YYYY-MM-DD"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="criteriaPoints">Criteria Points</Label>
                <Textarea
                  id="criteriaPoints"
                  name="criteriaPoints"
                  value={JSON.stringify(formData.criteriaPoints) || ''}
                  onChange={handleCriteriaPointsChange}
                  placeholder="{'speed': 5, 'accuracy': 8}"
                  rows={3}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="distance">Distance</Label>
                <TextInput
                  id="distance"
                  name="distance"
                  value={formData.distance || ''}
                  onChange={handleInputChange}
                  placeholder="500m"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <TextInput
                  id="status"
                  name="status"
                  value={formData.status || ''}
                  onChange={handleInputChange}
                  placeholder="Active"
                  className="mt-1"
                />
              </div>
            </div>

            <Modal.Footer>
              <Button color="primary" type="submit">
                Save changes
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};




const DeleteInscriptionModal: FC<{ inscriptionId: string; onDelete: () => void }> = ({ inscriptionId, onDelete }) => {
  const [isOpen, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    try {
      setLoading(true);
      await axios.delete(`http://localhost:3002/api/inscriptions/${inscriptionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOpen(false);
      onDelete(); // Callback pour rafraîchir la liste après suppression
    } catch (err) {
      console.error("Error deleting inscription:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button color="failure" onClick={() => setOpen(true)}>
        <HiTrash className="mr-2 text-lg" />
        Delete item
      </Button>

      <Modal onClose={() => setOpen(false)} show={isOpen} size="md">
        <Modal.Header className="px-3 pt-3 pb-0">
          <span className="sr-only">Delete Inscription</span>
        </Modal.Header>
        <Modal.Body className="px-6 pb-6 pt-0">
          <div className="flex flex-col items-center gap-y-6 text-center">
            <HiOutlineExclamationCircle className="text-7xl text-red-600" />
            <p className="text-lg text-gray-500 dark:text-gray-300">
              Are you sure you want to delete this Inscription?
            </p>
            <div className="flex items-center gap-x-3">
              <Button color="failure" onClick={handleDelete} disabled={loading}>
                {loading ? "Deleting..." : "Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpen(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};


const InscriptionsTable: React.FC = () => {
  const [data, setData] = useState<any[]>([]); // Array of inscriptions
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchInscriptions = async () => {
      try {
        const token = localStorage.getItem("authToken");
        console.log("Auth Token: ", token); // Ensure this prints a valid token

        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await axios.get("http://localhost:3002/api/inscriptions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data); // Set the fetched data into state
      } catch (error: any) {
        setError("Failed to fetch inscriptions. Please try again.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchInscriptions();
  }, []);

  // Handle loading state and error message
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
      <Table.Head className="bg-gray-100 dark:bg-gray-700">
        <Table.HeadCell>Nom du stagiaire</Table.HeadCell>
        <Table.HeadCell>Téléphone</Table.HeadCell>
        <Table.HeadCell>Email</Table.HeadCell>
        <Table.HeadCell>Adresse</Table.HeadCell>
        <Table.HeadCell>Points</Table.HeadCell>
        <Table.HeadCell>Actions</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
        {data.map((inscription, index) => (
          <Table.Row key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
            <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
              <div className="text-base font-semibold text-gray-900 dark:text-white">
                {inscription.name}
              </div>
              <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                {inscription.email}
              </div>
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
              {inscription.phone}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
              {inscription.email}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
              {inscription.address}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
              {/* Ensure `criteriaPoints` exists and is an object before accessing its values */}
              {inscription.criteriaPoints
                ? Object.values(inscription.criteriaPoints).reduce(
                    (acc, points) => acc + points,
                    0
                  )
                : 0}
            </Table.Cell>
            <Table.Cell className="space-x-2 whitespace-nowrap p-4">
              <div className="flex items-center gap-x-3">
                <EditInscriptionModal inscriptionId={inscription._id} />
                <DeleteInscriptionModal inscriptionId={inscription._id} />
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default Inscription;
