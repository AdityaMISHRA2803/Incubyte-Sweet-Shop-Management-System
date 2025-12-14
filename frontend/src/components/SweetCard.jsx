import { useDispatch, useSelector } from 'react-redux';
import { purchaseSweet } from '../features/sweets/sweetSlice';
import { useState } from 'react';

const SweetCard = ({ sweet, onEdit, onDelete, onRestock }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.sweets);
  const [purchaseQuantity, setPurchaseQuantity] = useState(1);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  const handlePurchase = () => {
    if (purchaseQuantity > 0 && purchaseQuantity <= sweet.quantity) {
      dispatch(purchaseSweet({ id: sweet._id, quantity: purchaseQuantity }));
      setShowPurchaseModal(false);
      setPurchaseQuantity(1);
    }
  };

  const isOutOfStock = sweet.quantity === 0;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">{sweet.name}</h3>
            <p className="text-sm text-gray-500 capitalize">{sweet.category}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-pink-600">₹{sweet.price}</p>
            <p
              className={`text-sm font-semibold ${
                isOutOfStock ? 'text-red-600' : 'text-green-600'
              }`}
            >
              {isOutOfStock ? 'Out of Stock' : `Qty: ${sweet.quantity}`}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {user?.role !== 'admin' && (
            <button
              onClick={() => setShowPurchaseModal(true)}
              disabled={isOutOfStock || isLoading}
              className={`flex-1 px-4 py-2 rounded-md font-medium transition ${
                isOutOfStock || isLoading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-pink-500 text-white hover:bg-pink-600'
              }`}
            >
              {isOutOfStock ? 'Out of Stock' : 'Purchase'}
            </button>
          )}

          {user?.role === 'admin' && (
            <>
              <button
                onClick={() => onEdit(sweet)}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => onRestock(sweet)}
                className="flex-1 px-4 py-2 bg-green-500 text-white rounded-md font-medium hover:bg-green-600 transition"
              >
                Restock
              </button>
              <button
                onClick={() => onDelete(sweet._id)}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md font-medium hover:bg-red-600 transition"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>

      {/* Purchase Modal */}
      {showPurchaseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Purchase {sweet.name}</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity (Available: {sweet.quantity})
              </label>
              <input
                type="number"
                min="1"
                max={sweet.quantity}
                value={purchaseQuantity}
                onChange={(e) => setPurchaseQuantity(parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <p className="mt-2 text-sm text-gray-600">
                Total: ₹{sweet.price * purchaseQuantity}
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowPurchaseModal(false)}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handlePurchase}
                disabled={isLoading}
                className="flex-1 px-4 py-2 bg-pink-500 text-white rounded-md font-medium hover:bg-pink-600 transition disabled:opacity-50"
              >
                {isLoading ? 'Processing...' : 'Confirm Purchase'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SweetCard;

