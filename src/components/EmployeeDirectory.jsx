import { useState } from 'react';

const initialEmployees = [
  {
    id: 'EMP101',
    name: 'Suresh Kumar',
    department: 'Dairy Farming',
    gender: 'Male',
    phone: '9876543210',
    localAddress: 'Farm Quarters, Block A',
    permanentAddress: 'Village Rampur, Dist. Nadia'
  },
  {
    id: 'EMP102',
    name: 'Anjali Sharma',
    department: 'Crop Production',
    gender: 'Female',
    phone: '9876501234',
    localAddress: 'Farm Staff Hostel, Room 12',
    permanentAddress: 'Burdwan Sadar, West Bengal'
  },
  {
    id: 'EMP103',
    name: 'Bikram Ghosh',
    department: 'Poultry Management',
    gender: 'Male',
    phone: '9812345678',
    localAddress: 'Staff Quarter 4',
    permanentAddress: 'Barasat, North 24 Parganas'
  }
];

export default function EmployeeDirectory() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  
  // Form State
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    department: 'Dairy Farming',
    gender: 'Male',
    phone: '',
    localAddress: '',
    permanentAddress: ''
  });
  
  const [editingId, setEditingId] = useState(null);

  // Handle inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or Edit Employee
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.id || !formData.phone) {
      alert('Please fill out all required fields.');
      return;
    }

    if (editingId) {
      setEmployees(employees.map(emp => emp.id === editingId ? formData : emp));
      setEditingId(null);
    } else {
      if (employees.some(emp => emp.id === formData.id)) {
        alert('Employee ID must be unique!');
        return;
      }
      setEmployees([...employees, formData]);
    }

    setFormData({
      id: '',
      name: '',
      department: 'Dairy Farming',
      gender: 'Male',
      phone: '',
      localAddress: '',
      permanentAddress: ''
    });
  };

  // Start Editing
  const handleEdit = (emp) => {
    setEditingId(emp.id);
    setFormData(emp);
  };

  // Cancel Editing
  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      id: '',
      name: '',
      department: 'Dairy Farming',
      gender: 'Male',
      phone: '',
      localAddress: '',
      permanentAddress: ''
    });
  };

  // Delete Employee
  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  // Filtered employees
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = 
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.phone.includes(searchTerm);
    const matchesDept = selectedDept === 'All' || emp.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="assignment-container">
      <div className="directory-header">
        <h2>Farm Employee Directory</h2>
        <span className="count-pill">Total Active Employees: {employees.length}</span>
      </div>

      {/* Control Bar: Search and Department Filter */}
      <div className="control-bar">
        <input 
          type="text" 
          placeholder="Search by name, ID, or phone..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select 
          value={selectedDept} 
          onChange={(e) => setSelectedDept(e.target.value)}
          className="dept-select"
        >
          <option value="All">All Departments</option>
          <option value="Dairy Farming">Dairy Farming</option>
          <option value="Crop Production">Crop Production</option>
          <option value="Poultry Management">Poultry Management</option>
          <option value="Machinery & Maintenance">Machinery & Maintenance</option>
        </select>
      </div>

      {/* Employee Add / Edit Form */}
      <form onSubmit={handleSubmit} className="employee-form">
        <h3>{editingId ? 'Edit Employee Details' : 'Add New Farm Employee'}</h3>
        <div className="form-grid">
          <input 
            type="text" 
            name="id" 
            placeholder="Employee ID (e.g. EMP104)" 
            value={formData.id} 
            onChange={handleChange} 
            disabled={editingId !== null} 
            required 
          />
          <input 
            type="text" 
            name="name" 
            placeholder="Full Name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
          <select name="department" value={formData.department} onChange={handleChange}>
            <option value="Dairy Farming">Dairy Farming</option>
            <option value="Crop Production">Crop Production</option>
            <option value="Poultry Management">Poultry Management</option>
            <option value="Machinery & Maintenance">Machinery & Maintenance</option>
          </select>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input 
            type="tel" 
            name="phone" 
            placeholder="Phone Number" 
            value={formData.phone} 
            onChange={handleChange} 
            required 
          />
          <input 
            type="text" 
            name="localAddress" 
            placeholder="Local Address" 
            value={formData.localAddress} 
            onChange={handleChange} 
            required 
          />
          <input 
            type="text" 
            name="permanentAddress" 
            placeholder="Permanent Address" 
            value={formData.permanentAddress} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn">{editingId ? 'Save Changes' : 'Add Employee'}</button>
          {editingId && (
            <button type="button" onClick={handleCancelEdit} className="btn btn-secondary">
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Employees Table List */}
      <div className="table-responsive">
        <table className="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Dept</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>Local Address</th>
              <th>Permanent Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((emp) => (
                <tr key={emp.id}>
                  <td><strong>{emp.id}</strong></td>
                  <td>{emp.name}</td>
                  <td><span className="badge">{emp.department}</span></td>
                  <td>{emp.gender}</td>
                  <td>{emp.phone}</td>
                  <td>{emp.localAddress}</td>
                  <td>{emp.permanentAddress}</td>
                  <td className="actions-cell">
                    <button onClick={() => handleEdit(emp)} className="btn-table edit">Edit</button>
                    <button onClick={() => handleDelete(emp.id)} className="btn-table delete">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '1.5rem' }}>
                  No matching employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}