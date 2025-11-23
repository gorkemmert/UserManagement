import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState().users;

      let queryParams = {
        role: state.filters.role,
        name: state.filters.name,
        surname: state.filters.surname,
        tckn: state.filters.tckn,
        meslek: state.filters.meslekList.join(","),
        page: state.pagination.page,
        limit: state.pagination.limit,
        sortKey: state.sort.sortKey,
        sortDirection: state.sort.sortDirection,
      };

      queryParams = cleanParams(queryParams);

      const res = await axios.get("http://localhost:5000/user", {
        params: queryParams,
      });

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Hata oluştu");
    }
  }
);

const cleanParams = (obj) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => {
      if (value === undefined || value === null) return false;
      if (value === "") return false;
      if (Array.isArray(value) && value.length === 0) return false;
      return true;
    })
  );
};

const usersSlice = createSlice({
  name: "users",

  initialState: {
    loading: false,
    data: [],
    error: null,

    filters: {
      role: "",
      meslekList: [],
      name: "",
      surname: "",
      tckn: ""
    },

    pagination: {
      page: 1,
      limit: 10,
      total: 0,
    },

    sort: {
      sortKey: "",
      sortDirection: "asc",
    },
  },

  reducers: {
    setName: (state, action) => {
      state.filters.name = action.payload;
    },
    setSurname: (state, action) => {
      state.filters.surname = action.payload;
    },
    setTckn: (state, action) => {
      state.filters.tckn = action.payload;
    },
    setRole: (state, action) => {
      state.filters.role = action.payload;
      state.pagination.page = 1;
    },

    setMeslekList: (state, action) => {
      state.filters.meslekList = action.payload;
      state.pagination.page = 1;
    },

    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },

    setSort: (state, action) => {
      state.sort = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
        toast.info("Veri yükleniyor...",{autoClose:500 });   
      })

      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.pagination.total = action.payload.total;
        if(state.data.length !== 0){
          toast.success("Veriler Başarıyla Getirildi",{autoClose:500 });   
        }
        
      })

      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Bir Hata oluştu",{autoClose:500 });   
      });
  },
});

export const { setRole, setMeslekList, setPage, setSort, setName, setSurname, setTckn } =
  usersSlice.actions;

export default usersSlice.reducer;
