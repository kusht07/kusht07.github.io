import React, { useState, useEffect } from 'react';

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
      await new Promise(resolve => setTimeout(resolve, 1000));

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
              <div className="absolute top-0 left-0 right-0 bottom-0 bg-white bg-opacity-70 flex justify-center items-center z-10">
                <div className="loader border-4 border-blue-200 border-t-4 border-t-blue-500 rounded-full w-10 h-10 animate-spin"></div>
              </div>
            )}
            <table className="min-w-full">
              <thead className="bg-primary-600">
                <tr>
                  <th className="py-3 px-6 text-left text-xs font-medium text-white uppercase tracking-wider">ID</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-white uppercase tracking-wider">Name</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-white uppercase tracking-wider">Age</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-white uppercase tracking-wider">Email</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-white uppercase tracking-wider">
                    <div className="flex items-center">
                      <span className="mr-2">Gender</span>
                      <select
                        value={genderFilter}
                        onChange={handleGenderFilterChange}
                        className="text-xs bg-primary-500 text-white border border-primary-200 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-primary-300"
                      >
                        <option value="all">All</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-white uppercase tracking-wider">Height (cm)</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-white uppercase tracking-wider">Weight (kg)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-primary-50 transition-colors duration-200">
                    <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-blue-800">{user.id}</td>
                    <td className="py-4 px-6 whitespace-nowrap text-sm">{`${user.firstName} ${user.lastName}`}</td>
                    <td className="py-4 px-6 whitespace-nowrap text-sm">{user.age}</td>
                    <td className="py-4 px-6 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800">{user.email}</td>
                    <td className="py-4 px-6 whitespace-nowrap text-sm capitalize">{user.gender}</td>
                    <td className="py-4 px-6 whitespace-nowrap text-sm">{user.height}</td>
                    <td className="py-4 px-6 whitespace-nowrap text-sm">{user.weight}</td>
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
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-primary-200 bg-white text-sm font-medium text-primary-500 hover:bg-primary-50 disabled:bg-gray-100 disabled:text-gray-400"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages || loading}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-primary-200 bg-white text-sm font-medium text-primary-500 hover:bg-primary-50 disabled:bg-gray-100 disabled:text-gray-400"
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