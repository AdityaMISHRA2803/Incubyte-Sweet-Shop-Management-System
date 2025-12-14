import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sweetService } from './sweetService';

const initialState = {
  sweets: [],
  isLoading: false,
  isError: false,
  message: '',
  filters: {
    name: '',
    category: '',
    minPrice: '',
    maxPrice: '',
  },
};

// Get all sweets async thunk
export const getAllSweets = createAsyncThunk(
  'sweets/getAll',
  async (filters, thunkAPI) => {
    try {
      const response = await sweetService.getAllSweets(filters);
      if (response.success) {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(response.message);
      }
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Failed to fetch sweets';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create sweet async thunk (Admin only)
export const createSweet = createAsyncThunk(
  'sweets/create',
  async (sweetData, thunkAPI) => {
    try {
      const response = await sweetService.createSweet(sweetData);
      if (response.success) {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(response.message);
      }
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Failed to create sweet';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update sweet async thunk (Admin only)
export const updateSweet = createAsyncThunk(
  'sweets/update',
  async ({ id, updateData }, thunkAPI) => {
    try {
      const response = await sweetService.updateSweet(id, updateData);
      if (response.success) {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(response.message);
      }
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Failed to update sweet';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete sweet async thunk (Admin only)
export const deleteSweet = createAsyncThunk(
  'sweets/delete',
  async (id, thunkAPI) => {
    try {
      const response = await sweetService.deleteSweet(id);
      if (response.success) {
        return id; // Return ID for filtering
      } else {
        return thunkAPI.rejectWithValue(response.message);
      }
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Failed to delete sweet';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Purchase sweet async thunk
export const purchaseSweet = createAsyncThunk(
  'sweets/purchase',
  async ({ id, quantity }, thunkAPI) => {
    try {
      const response = await sweetService.purchaseSweet(id, quantity);
      if (response.success) {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(response.message);
      }
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Failed to purchase sweet';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Restock sweet async thunk (Admin only)
export const restockSweet = createAsyncThunk(
  'sweets/restock',
  async ({ id, quantity }, thunkAPI) => {
    try {
      const response = await sweetService.restockSweet(id, quantity);
      if (response.success) {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(response.message);
      }
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Failed to restock sweet';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const sweetSlice = createSlice({
  name: 'sweets',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        name: '',
        category: '',
        minPrice: '',
        maxPrice: '',
      };
    },
    clearError: (state) => {
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all sweets
      .addCase(getAllSweets.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getAllSweets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.sweets = action.payload;
      })
      .addCase(getAllSweets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Create sweet
      .addCase(createSweet.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createSweet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.sweets = [action.payload, ...state.sweets];
      })
      .addCase(createSweet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Update sweet
      .addCase(updateSweet.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(updateSweet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.sweets = state.sweets.map((sweet) =>
          sweet._id === action.payload._id ? action.payload : sweet
        );
      })
      .addCase(updateSweet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Delete sweet
      .addCase(deleteSweet.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(deleteSweet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.sweets = state.sweets.filter((sweet) => sweet._id !== action.payload);
      })
      .addCase(deleteSweet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Purchase sweet
      .addCase(purchaseSweet.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(purchaseSweet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.sweets = state.sweets.map((sweet) =>
          sweet._id === action.payload._id ? action.payload : sweet
        );
      })
      .addCase(purchaseSweet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Restock sweet
      .addCase(restockSweet.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(restockSweet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.sweets = state.sweets.map((sweet) =>
          sweet._id === action.payload._id ? action.payload : sweet
        );
      })
      .addCase(restockSweet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { setFilters, clearFilters, clearError } = sweetSlice.actions;
export default sweetSlice.reducer;

