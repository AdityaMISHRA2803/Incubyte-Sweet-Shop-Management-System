import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getAllSweets,
  setFilters,
  clearFilters,
  deleteSweet,
  restockSweet,
} from '../features/sweets/sweetSlice';
import SweetCard from '../components/SweetCard';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sweets, isLoading, isError, message, filters } = useSelector(
    (state) => state.sweets
  );
  const { user } = useSelector((state) => state.auth);

  const [localFilters, setLocalFilters] = useState({
    name: '',
    category: '',
    minPrice: '',
    maxPrice: '',
  });

  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState(null); // 'edit', 'restock', 'delete'
  const [selectedSweet, setSelectedSweet] = useState(null);
  const [restockQuantity, setRestockQuantity] = useState('');

  useEffect(() => {
    dispatch(getAllSweets(filters));
  }, [dispatch, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters({
      ...localFilters,
      [name]: value,
    });
  };

  const handleApplyFilters = () => {
    dispatch(setFilters(localFilters));
  };

  const handleClearFilters = () => {
    setLocalFilters({
      name: '',
      category: '',
      minPrice: '',
      maxPrice: '',
    });
    dispatch(clearFilters());
  };

  const handleEdit = (sweet) => {
    setSelectedSweet(sweet);
    setActionType('edit');
    setShowActionModal(true);
  };

  const handleRestock = (sweet) => {
    setSelectedSweet(sweet);
    setActionType('restock');
    setRestockQuantity('');
    setShowActionModal(true);
  };

  const handleDelete = (sweetId) => {
    const sweet = sweets.find((s) => s._id === sweetId);
    setSelectedSweet(sweet);
    setActionType('delete');
    setShowActionModal(true);
  };

  const handleNavigateToAdmin = () => {
    setShowActionModal(false);
    navigate('/admin');
  };

  const handleConfirmAction = async () => {
    if (!selectedSweet) return;

    if (actionType === 'delete') {
      await dispatch(deleteSweet(selectedSweet._id));
      setShowActionModal(false);
    } else if (actionType === 'restock') {
      if (restockQuantity && parseInt(restockQuantity) > 0) {
        await dispatch(
          restockSweet({ id: selectedSweet._id, quantity: parseInt(restockQuantity) })
        );
        setShowActionModal(false);
        setRestockQuantity('');
      }
    } else if (actionType === 'edit') {
      // Navigate to admin panel for editing
      navigate('/admin');
    }
  };

  const handleCloseModal = () => {
    setShowActionModal(false);
    setSelectedSweet(null);
    setActionType(null);
    setRestockQuantity('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Sweet Shop Dashboard</h1>

          {/* Search and Filter Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Search & Filter</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={localFilters.name}
                  onChange={handleFilterChange}
                  placeholder="Search by name..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={localFilters.category}
                  onChange={handleFilterChange}
                  placeholder="Search by category..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Min Price
                </label>
                <input
                  type="number"
                  name="minPrice"
                  value={localFilters.minPrice}
                  onChange={handleFilterChange}
                  placeholder="Min price..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Price
                </label>
                <input
                  type="number"
                  name="maxPrice"
                  value={localFilters.maxPrice}
                  onChange={handleFilterChange}
                  placeholder="Max price..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </div>
            <div className="flex space-x-3 mt-4">
              <button
                onClick={handleApplyFilters}
                className="px-4 py-2 bg-pink-500 text-white rounded-md font-medium hover:bg-pink-600 transition"
              >
                Apply Filters
              </button>
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-400 transition"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {isError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {message}
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
            <p className="mt-4 text-gray-600">Loading sweets...</p>
          </div>
        )}

        {/* Sweets Grid */}
        {!isLoading && (
          <>
            {sweets.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No sweets found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sweets.map((sweet) => (
                  <SweetCard
                    key={sweet._id}
                    sweet={sweet}
                    onEdit={user?.role === 'admin' ? handleEdit : undefined}
                    onDelete={user?.role === 'admin' ? handleDelete : undefined}
                    onRestock={user?.role === 'admin' ? handleRestock : undefined}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* Admin Action Modal */}
        {showActionModal && selectedSweet && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold mb-4">
                {actionType === 'edit' && `Edit ${selectedSweet.name}`}
                {actionType === 'restock' && `Restock ${selectedSweet.name}`}
                {actionType === 'delete' && `Delete ${selectedSweet.name}`}
              </h2>

              {actionType === 'edit' && (
                <div className="mb-4">
                  <p className="text-gray-700 mb-4">
                    To edit this sweet, please navigate to the Admin Panel where you can modify
                    all details.
                  </p>
                </div>
              )}

              {actionType === 'restock' && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">
                    Current Quantity: <span className="font-semibold">{selectedSweet.quantity}</span>
                  </p>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity to Add
                  </label>
                  <input
                    type="number"
                    value={restockQuantity}
                    onChange={(e) => setRestockQuantity(e.target.value)}
                    min="1"
                    placeholder="e.g., 50"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              )}

              {actionType === 'delete' && (
                <div className="mb-4">
                  <p className="text-gray-700 mb-2">
                    Are you sure you want to delete <span className="font-semibold">{selectedSweet.name}</span>?
                  </p>
                  <p className="text-sm text-red-600">This action cannot be undone.</p>
                </div>
              )}

              <div className="flex flex-col space-y-3">
                <div className="flex space-x-3">
                  {actionType === 'restock' && (
                    <button
                      onClick={handleConfirmAction}
                      disabled={!restockQuantity || parseInt(restockQuantity) <= 0}
                      className="flex-1 px-4 py-2 bg-green-500 text-white rounded-md font-medium hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Restock
                    </button>
                  )}
                  {actionType === 'delete' && (
                    <button
                      onClick={handleConfirmAction}
                      className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md font-medium hover:bg-red-600 transition"
                    >
                      Confirm Delete
                    </button>
                  )}
                  {actionType === 'edit' && (
                    <button
                      onClick={handleNavigateToAdmin}
                      className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 transition"
                    >
                      Go to Admin Panel
                    </button>
                  )}
                  <button
                    onClick={handleCloseModal}
                    className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                </div>
                {(actionType === 'restock' || actionType === 'delete') && (
                  <button
                    onClick={handleNavigateToAdmin}
                    className="w-full px-4 py-2 bg-pink-500 text-white rounded-md font-medium hover:bg-pink-600 transition"
                  >
                    Navigate to Admin Panel
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

