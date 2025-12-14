import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllSweets,
  createSweet,
  updateSweet,
  deleteSweet,
  restockSweet,
  clearError,
} from '../features/sweets/sweetSlice';
import SweetCard from '../components/SweetCard';

const AdminPanel = () => {
  const dispatch = useDispatch();
  const { sweets, isLoading, isError, message } = useSelector((state) => state.sweets);

  const [showModal, setShowModal] = useState(false);
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [editingSweet, setEditingSweet] = useState(null);
  const [restockingSweet, setRestockingSweet] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
  });
  const [restockQuantity, setRestockQuantity] = useState('');

  useEffect(() => {
    dispatch(getAllSweets());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOpenModal = () => {
    setEditingSweet(null);
    setFormData({
      name: '',
      category: '',
      price: '',
      quantity: '',
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingSweet(null);
    setFormData({
      name: '',
      category: '',
      price: '',
      quantity: '',
    });
  };

  const handleEdit = (sweet) => {
    setEditingSweet(sweet);
    setFormData({
      name: sweet.name,
      category: sweet.category,
      price: sweet.price,
      quantity: sweet.quantity,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sweetData = {
      ...formData,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity) || 0,
    };

    if (editingSweet) {
      await dispatch(updateSweet({ id: editingSweet._id, updateData: sweetData }));
    } else {
      await dispatch(createSweet(sweetData));
    }
    handleCloseModal();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this sweet?')) {
      await dispatch(deleteSweet(id));
    }
  };

  const handleOpenRestockModal = (sweet) => {
    setRestockingSweet(sweet);
    setRestockQuantity('');
    setShowRestockModal(true);
  };

  const handleCloseRestockModal = () => {
    setShowRestockModal(false);
    setRestockingSweet(null);
    setRestockQuantity('');
  };

  const handleRestock = async (e) => {
    e.preventDefault();
    if (restockingSweet && restockQuantity) {
      await dispatch(
        restockSweet({ id: restockingSweet._id, quantity: parseInt(restockQuantity) })
      );
      handleCloseRestockModal();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <button
            onClick={handleOpenModal}
            className="px-6 py-2 bg-pink-500 text-white rounded-md font-medium hover:bg-pink-600 transition"
          >
            + Add New Sweet
          </button>
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
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        )}

        {/* Sweets Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sweets.map((sweet) => (
              <SweetCard
                key={sweet._id}
                sweet={sweet}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onRestock={handleOpenRestockModal}
              />
            ))}
          </div>
        )}

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold mb-4">
                {editingSweet ? 'Edit Sweet' : 'Add New Sweet'}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., Chocolate Bar, Gummy Bears"
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
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., Chocolate, Gummies, Candy"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      min="0"
                      step="10"
                      placeholder="e.g., 50.00"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      required
                      min="0"
                      placeholder="e.g., 100"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                </div>
                <div className="flex space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-pink-500 text-white rounded-md font-medium hover:bg-pink-600 transition"
                  >
                    {editingSweet ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Restock Modal */}
        {showRestockModal && restockingSweet && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold mb-4">Restock {restockingSweet.name}</h2>
              <form onSubmit={handleRestock}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Quantity: {restockingSweet.quantity}
                  </label>
                  <label className="block text-sm font-medium text-gray-700 mb-1 mt-3">
                    Quantity to Add
                  </label>
                  <input
                    type="number"
                    value={restockQuantity}
                    onChange={(e) => setRestockQuantity(e.target.value)}
                    required
                    min="1"
                    placeholder="e.g., 50"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={handleCloseRestockModal}
                    className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-green-500 text-white rounded-md font-medium hover:bg-green-600 transition"
                  >
                    Restock
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;

