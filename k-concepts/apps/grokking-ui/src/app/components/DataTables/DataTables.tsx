import React, { useState, useEffect } from 'react';
import './DataTables.css';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  gender: string;
  height: number;
  weight: number;
}

const DataTables: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [genderFilter, setGenderFilter] = useState('all');
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    fetchUsers();
  }, [currentPage, genderFilter]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const skip = (currentPage - 1) * ITEMS_PER_PAGE;
      let url = `https://dummyjson.com/users?limit=${ITEMS_PER_PAGE}&skip=${skip}`;
      
      if (genderFilter !== 'all') {
        url += `&filter=gender:${genderFilter}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();

      // Simulate a minimum 2-second loading time
      await new Promise(resolve => setTimeout(resolve, 2000));

      setUsers(data.users);
      setTotalPages(Math.ceil(data.total / ITEMS_PER_PAGE));
      setLoading(false);
    } catch (err) {
      setError('Error fetching users');
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleGenderFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGenderFilter(event.target.value);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-8">User Data Table</h2>
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="overflow-x-auto relative">
            {loading && (
              <div className="loading-overlay">
                <div className="loader"></div>
              </div>
            )}
            <table className="data-table">
              <thead className="table-header">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Email</th>
                  <th>
                    <div className="flex items-center">
                      <span className="mr-2">Gender</span>
                      <select
                        value={genderFilter}
                        onChange={handleGenderFilterChange}
                        className="gender-filter"
                      >
                        <option value="all">All</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                  </th>
                  <th>Height (cm)</th>
                  <th>Weight (kg)</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="font-medium text-blue-800">{user.id}</td>
                    <td>{`${user.firstName} ${user.lastName}`}</td>
                    <td>{user.age}</td>
                    <td className="text-blue-600 hover:text-blue-800">{user.email}</td>
                    <td className="capitalize">{user.gender}</td>
                    <td>{user.height}</td>
                    <td>{user.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-gray-50 px-4 py-3 border-t border-blue-200 sm:px-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1 || loading}
                    className="pagination-button"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages || loading}
                    className="pagination-button"
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTables;