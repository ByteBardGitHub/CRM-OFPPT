import React, { useState } from "react";
import { 
  Button, 
  Table, 
  TextInput, 
  Label, 
  Card, 
  Dropdown, 
  Badge, 
  Textarea, 
  Select 
} from "flowbite-react";
import { 
  HiOutlineEye, 
  HiOutlinePencil, 
  HiOutlineTrash, 
  HiOutlinePlus, 
  HiOutlineDownload, 
  HiOutlineShare, 
  HiOutlineFilter, 
  HiOutlineArrowLeft, 
  HiOutlineSave, 
  HiDotsVertical 
} from "react-icons/hi";

// Define types for our data
interface AcademicRecord {
  subject: string;
  grade: string;
}

interface Student {
  id: number;
  name: string;
  phone: string;
  email: string;
  points: number;
  status: string;
  dateApplied: string;
  address: string;
  birthDate: string;
  parentName: string;
  parentPhone: string;
  previousSchool: string;
  academicRecords: AcademicRecord[];
}

// Sample data - in a real application, this would come from a database
const initialStudents: Student[] = [
  {
    id: 1,
    name: "Ahmed Benali",
    phone: "+212 612345678",
    email: "ahmed.benali@example.com",
    points: 85,
    status: "approved",
    dateApplied: "16 Mar 2025",
    address: "123 Rue Mohammed V, Casablanca",
    birthDate: "15 Apr 2007",
    parentName: "Karim Benali",
    parentPhone: "+212 612345679",
    previousSchool: "Lycée Al Khawarizmi",
    academicRecords: [
      { subject: "Mathematics", grade: "A" },
      { subject: "Physics", grade: "B+" },
      { subject: "French", grade: "A-" },
      { subject: "Arabic", grade: "A" },
      { subject: "History", grade: "B" },
    ],
  },
  {
    id: 2,
    name: "Fatima Zahra",
    phone: "+212 623456789",
    email: "fatima.zahra@example.com",
    points: 78,
    status: "approved",
    dateApplied: "14 Mar 2025",
    address: "45 Avenue Hassan II, Rabat",
    birthDate: "22 Jun 2007",
    parentName: "Nadia Zahra",
    parentPhone: "+212 623456780",
    previousSchool: "Collège Ibn Sina",
    academicRecords: [
      { subject: "Mathematics", grade: "B+" },
      { subject: "Physics", grade: "A-" },
      { subject: "French", grade: "B" },
      { subject: "Arabic", grade: "A" },
      { subject: "History", grade: "B+" },
    ],
  },
  {
    id: 3,
    name: "Youssef Amrani",
    phone: "+212 634567890",
    email: "youssef.amrani@example.com",
    points: 72,
    status: "approved",
    dateApplied: "14 Mar 2025",
    address: "78 Rue Ibn Battouta, Marrakech",
    birthDate: "10 Sep 2007",
    parentName: "Hassan Amrani",
    parentPhone: "+212 634567891",
    previousSchool: "École Al Fath",
    academicRecords: [
      { subject: "Mathematics", grade: "B" },
      { subject: "Physics", grade: "B" },
      { subject: "French", grade: "A" },
      { subject: "Arabic", grade: "B+" },
      { subject: "History", grade: "A-" },
    ],
  },
  {
    id: 4,
    name: "Laila Tazi",
    phone: "+212 645678901",
    email: "laila.tazi@example.com",
    points: 68,
    status: "waiting",
    dateApplied: "13 Mar 2025",
    address: "12 Avenue Mohammed VI, Tanger",
    birthDate: "05 Mar 2008",
    parentName: "Rachid Tazi",
    parentPhone: "+212 645678902",
    previousSchool: "Collège Al Massira",
    academicRecords: [
      { subject: "Mathematics", grade: "B-" },
      { subject: "Physics", grade: "C+" },
      { subject: "French", grade: "B+" },
      { subject: "Arabic", grade: "B" },
      { subject: "History", grade: "A" },
    ],
  },
  {
    id: 5,
    name: "Omar Alaoui",
    phone: "+212 656789012",
    email: "omar.alaoui@example.com",
    points: 65,
    status: "waiting",
    dateApplied: "12 Mar 2025",
    address: "56 Rue Allal Ben Abdellah, Fès",
    birthDate: "18 Nov 2007",
    parentName: "Samira Alaoui",
    parentPhone: "+212 656789013",
    previousSchool: "École Al Andalous",
    academicRecords: [
      { subject: "Mathematics", grade: "C+" },
      { subject: "Physics", grade: "B-" },
      { subject: "French", grade: "B" },
      { subject: "Arabic", grade: "B+" },
      { subject: "History", grade: "B" },
    ],
  },
  {
    id: 6,
    name: "Nadia Mansouri",
    phone: "+212 667890123",
    email: "nadia.mansouri@example.com",
    points: 62,
    status: "waiting",
    dateApplied: "11 Mar 2025",
    address: "34 Boulevard Zerktouni, Casablanca",
    birthDate: "27 Jan 2008",
    parentName: "Mohammed Mansouri",
    parentPhone: "+212 667890124",
    previousSchool: "Collège Ibn Khaldoun",
    academicRecords: [
      { subject: "Mathematics", grade: "C" },
      { subject: "Physics", grade: "C+" },
      { subject: "French", grade: "B+" },
      { subject: "Arabic", grade: "B" },
      { subject: "History", grade: "B-" },
    ],
  },
];

const Inscription: React.FC = () => {
  // State for managing views and data
  const [view, setView] = useState<'list' | 'details' | 'edit'>('list');
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [allSelected, setAllSelected] = useState(false);

  // Filter students based on search term and status filter
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          student.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Handle view student details
  const handleViewDetails = (student: Student) => {
    setCurrentStudent(student);
    setView('details');
  };

  // Handle edit student
  const handleEdit = (student: Student) => {
    setCurrentStudent({...student});
    setView('edit');
  };

  // Handle delete student
  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setStudents(students.filter(student => student.id !== id));
    }
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!currentStudent) return;
    
    const { name, value } = e.target;
    setCurrentStudent(prev => {
      if (!prev) return prev;
      return { ...prev, [name]: value };
    });
  };

  // Handle status change in dropdown
  const handleStatusChange = (value: string) => {
    if (!currentStudent) return;
    setCurrentStudent(prev => {
      if (!prev) return prev;
      return { ...prev, status: value };
    });
  };

  // Handle points change (ensure it's a number)
  const handlePointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentStudent) return;
    
    const value = parseInt(e.target.value) || 0;
    setCurrentStudent(prev => {
      if (!prev) return prev;
      return { ...prev, points: value };
    });
  };

  // Handle save changes
  const handleSaveChanges = () => {
    if (!currentStudent) return;
    
    setStudents(prev => 
      prev.map(student => 
        student.id === currentStudent.id ? currentStudent : student
      )
    );
    setView('details');
  };

  // Handle checkbox selection
  const handleSelectStudent = (id: number) => {
    if (selectedStudents.includes(id)) {
      setSelectedStudents(selectedStudents.filter(studentId => studentId !== id));
    } else {
      setSelectedStudents([...selectedStudents, id]);
    }
  };

  // Handle select all checkbox
  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map(student => student.id));
    }
    setAllSelected(!allSelected);
  };

  // Handle bulk actions
  const handleBulkAction = (action: string) => {
    if (action === 'approve' || action === 'waiting') {
      setStudents(prev => 
        prev.map(student => 
          selectedStudents.includes(student.id) 
            ? { ...student, status: action === 'approve' ? 'approved' : 'waiting' } 
            : student
        )
      );
    } else if (action === 'delete') {
      if (window.confirm(`Are you sure you want to delete ${selectedStudents.length} students?`)) {
        setStudents(prev => 
          prev.filter(student => !selectedStudents.includes(student.id))
        );
      }
    }
    setSelectedStudents([]);
    setAllSelected(false);
  };

  // Render badge based on status
  const renderStatusBadge = (status: string) => {
    const isApproved = status === 'approved';
    return (
      <Badge color={isApproved ? "success" : "warning"}>
        {isApproved ? 'Approved' : 'Waiting'}
      </Badge>
    );
  };

  // List View
  const renderListView = () => (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Student Pre-Inscription List</h1>
          <p className="text-gray-500">Manage boarding school applications and student status.</p>
        </div>
        <div className="flex gap-2">
          <Button color="light" size="sm">
            <HiOutlineShare className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button color="light" size="sm">
            <HiOutlineDownload className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <HiOutlinePlus className="mr-2 h-4 w-4" />
            New Student
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <TextInput
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={HiOutlineFilter}
          />
        </div>
        <Select
          id="status-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="approved">Approved</option>
          <option value="waiting">Waiting</option>
        </Select>
      </div>

      <div className="bg-white rounded-md border shadow-sm">
        <div className="p-4 border-b flex items-center gap-2">
          <Select
            id="bulk-action"
            onChange={(e) => handleBulkAction(e.target.value)}
          >
            <option value="none">Bulk Action</option>
            <option value="approve">Approve Selected</option>
            <option value="waiting">Set to Waiting</option>
            <option value="delete">Delete Selected</option>
          </Select>
          <Button color="light" size="sm">
            Apply
          </Button>
        </div>

        <Table>
          <Table.Head>
            <Table.HeadCell className="w-4">
              <input 
                type="checkbox" 
                className="rounded border-gray-300"
                checked={allSelected}
                onChange={handleSelectAll}
              />
            </Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Phone Number</Table.HeadCell>
            <Table.HeadCell>Points</Table.HeadCell>
            <Table.HeadCell>Date Applied</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Actions</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {filteredStudents.map((student) => (
              <Table.Row key={student.id} className="bg-white">
                <Table.Cell>
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300"
                    checked={selectedStudents.includes(student.id)}
                    onChange={() => handleSelectStudent(student.id)}
                  />
                </Table.Cell>
                <Table.Cell className="font-medium">{student.name}</Table.Cell>
                <Table.Cell>{student.phone}</Table.Cell>
                <Table.Cell>{student.points}</Table.Cell>
                <Table.Cell>{student.dateApplied}</Table.Cell>
                <Table.Cell>
                  {renderStatusBadge(student.status)}
                </Table.Cell>
                <Table.Cell>
                  <div className="flex justify-end gap-2">
                    <Button 
                      color="light" 
                      size="xs" 
                      title="View Details"
                      onClick={() => handleViewDetails(student)}
                    >
                      <HiOutlineEye className="h-4 w-4" />
                    </Button>
                    <Dropdown
                      label={<HiDotsVertical className="h-4 w-4" />}
                      arrowIcon={false}
                      color="light"
                      size="xs"
                    >
                      <Dropdown.Item onClick={() => handleViewDetails(student)}>
                        <HiOutlineEye className="h-4 w-4 mr-2" />
                        View Details
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleEdit(student)}>
                        <HiOutlinePencil className="h-4 w-4 mr-2" />
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={() => handleDelete(student.id)}>
                        <HiOutlineTrash className="h-4 w-4 mr-2 text-red-500" />
                        <span className="text-red-500">Delete</span>
                      </Dropdown.Item>
                    </Dropdown>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );

  // Details View
  const renderDetailsView = () => {
    if (!currentStudent) return null;
    
    return (
      <div className="container mx-auto py-6">
        <div className="mb-6">
          <Button 
            color="light" 
            className="flex items-center text-sm text-gray-500 hover:text-gray-900 p-0"
            onClick={() => setView('list')}
          >
            <HiOutlineArrowLeft className="mr-2 h-4 w-4" />
            Back to list
          </Button>
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Student Details</h1>
            <p className="text-gray-500">Complete information about the student application</p>
          </div>
          <div className="flex gap-2">
            <Button 
              color="light"
              onClick={() => handleEdit(currentStudent)}
            >
              <HiOutlinePencil className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button 
              color="failure"
              onClick={() => {
                handleDelete(currentStudent.id);
                setView('list');
              }}
            >
              <HiOutlineTrash className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <Card.Header>
              <h5 className="text-xl font-bold">Personal Information</h5>
              <p className="text-sm text-gray-500">Student's personal and contact details</p>
            </Card.Header>
            <Card.Body className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Full Name</p>
                  <p>{currentStudent.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Date of Birth</p>
                  <p>{currentStudent.birthDate}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone Number</p>
                  <p>{currentStudent.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email Address</p>
                  <p>{currentStudent.email}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm font-medium text-gray-500">Address</p>
                  <p>{currentStudent.address}</p>
                </div>
              </div>
            </Card.Body>
          </Card>
          
          <Card>
            <Card.Header>
              <h5 className="text-xl font-bold">Application Status</h5>
              <p className="text-sm text-gray-500">Current status and points</p>
            </Card.Header>
            <Card.Body className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Status</p>
                {renderStatusBadge(currentStudent.status)}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Points</p>
                <p className="text-2xl font-bold">{currentStudent.points}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Date Applied</p>
                <p>{currentStudent.dateApplied}</p>
              </div>
            </Card.Body>
          </Card>
          
          <Card className="md:col-span-2">
            <Card.Header>
              <h5 className="text-xl font-bold">Academic Records</h5>
              <p className="text-sm text-gray-500">Previous academic performance</p>
            </Card.Header>
            <Card.Body>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">Previous School</p>
                <p className="mb-4">{currentStudent.previousSchool}</p>
              </div>
              <div className="border rounded-md">
                <div className="grid grid-cols-2 font-medium p-3 border-b bg-gray-50">
                  <div>Subject</div>
                  <div>Grade</div>
                </div>
                {currentStudent.academicRecords.map((record, index) => (
                  <div key={index} className="grid grid-cols-2 p-3 border-b last:border-0">
                    <div>{record.subject}</div>
                    <div>{record.grade}</div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
          
          <Card>
            <Card.Header>
              <h5 className="text-xl font-bold">Parent/Guardian</h5>
              <p className="text-sm text-gray-500">Contact information</p>
            </Card.Header>
            <Card.Body className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Name</p>
                <p>{currentStudent.parentName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Phone Number</p>
                <p>{currentStudent.parentPhone}</p>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  };

  // Edit View
  const renderEditView = () => {
    if (!currentStudent) return null;
    
    return (
      <div className="container mx-auto py-6">
        <div className="mb-6">
          <Button 
            color="light" 
            className="flex items-center text-sm text-gray-500 hover:text-gray-900 p-0"
            onClick={() => setView('details')}
          >
            <HiOutlineArrowLeft className="mr-2 h-4 w-4" />
            Back to details
          </Button>
        </div>
        
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Edit Student</h1>
          <p className="text-gray-500">Update student information and application status</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <Card.Header>
              <h5 className="text-xl font-bold">Personal Information</h5>
              <p className="text-sm text-gray-500">Update student's personal details</p>
            </Card.Header>
            <Card.Body className="space-y-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="name" value="Full Name" />
                </div>
                <TextInput 
                  id="name" 
                  name="name" 
                  value={currentStudent.name} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="birthDate" value="Date of Birth" />
                </div>
                <TextInput 
                  id="birthDate" 
                  name="birthDate" 
                  value={currentStudent.birthDate} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="phone" value="Phone Number" />
                </div>
                <TextInput 
                  id="phone" 
                  name="phone" 
                  value={currentStudent.phone} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Email Address" />
                </div>
                <TextInput 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={currentStudent.email} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="address" value="Address" />
                </div>
                <Textarea 
                  id="address" 
                  name="address" 
                  value={currentStudent.address} 
                  onChange={handleChange} 
                  rows={3} 
                  required 
                />
              </div>
            </Card.Body>
          </Card>
          
          <div className="space-y-6">
            <Card>
              <Card.Header>
                <h5 className="text-xl font-bold">Application Details</h5>
                <p className="text-sm text-gray-500">Update application status and points</p>
              </Card.Header>
              <Card.Body className="space-y-4">
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="status" value="Status" />
                  </div>
                  <Select 
                    id="status" 
                    value={currentStudent.status} 
                    onChange={(e) => handleStatusChange(e.target.value)}
                  >
                    <option value="approved">Approved</option>
                    <option value="waiting">Waiting</option>
                  </Select>
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="points" value="Total Points" />
                  </div>
                  <TextInput 
                    id="points" 
                    name="points" 
                    type="number" 
                    value={currentStudent.points.toString()} 
                    onChange={handlePointsChange} 
                    required 
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="previousSchool" value="Previous School" />
                  </div>
                  <TextInput 
                    id="previousSchool" 
                    name="previousSchool" 
                    value={currentStudent.previousSchool} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              </Card.Body>
            </Card>
            
            <Card>
              <Card.Header>
                <h5 className="text-xl font-bold">Parent/Guardian Information</h5>
                <p className="text-sm text-gray-500">Update parent contact details</p>
              </Card.Header>
              <Card.Body className="space-y-4">
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="parentName" value="Parent Name" />
                  </div>
                  <TextInput 
                    id="parentName" 
                    name="parentName" 
                    value={currentStudent.parentName} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="parentPhone" value="Parent Phone" />
                  </div>
                  <TextInput 
                    id="parentPhone" 
                    name="parentPhone" 
                    value={currentStudent.parentPhone} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <Button 
            type="button" 
            className="w-full md:w-auto"
            onClick={handleSaveChanges}
          >
            <HiOutlineSave className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    );
  };

  // Render the appropriate view based on state
  return (
    <>
      {view === 'list' && renderListView()}
      {view === 'details' && renderDetailsView()}
      {view === 'edit' && renderEditView()}
    </>
  );
};

export default Inscription;