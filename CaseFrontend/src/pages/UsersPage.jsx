import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  setRole,
  setMeslekList,
  setPage,
  setSort,
  setName,
  setSurname,
  setTckn,
} from "../redux/usersSlice";

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Button,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";

export default function UsersPage() {
  const dispatch = useDispatch();
  const {
    loading,
    data,
    error,
    filters,
    pagination,
    sort,
  } = useSelector((state) => state.users);

  const role = localStorage.getItem("role");
  
  const MESLEK_OPTIONS = ["Mühendis", "Doktor", "Öğretmen", "Yazar", "Yazılımcı"];

  useEffect(() => {
    dispatch(fetchUsers());
  }, [filters, pagination.page, sort, dispatch]);

  const handleSort = (col) => {
    let direction = "asc";
    if (sort.sortKey === col && sort.sortDirection === "asc") {
      direction = "desc";
    }
    dispatch(setSort({ sortKey: col, sortDirection: direction }));
  };

  if (loading) return <div className="flex justify-center mt-20">Yükleniyor...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">Beklenmedik bir hata oluştu.</div>;

  return (
    <div className="w-full h-[90vh] pb-10 bg-[#f9f9f9] overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-4 py-8 h-full flex flex-col">

        <div className="bg-white w-full p-4 mb-6 rounded-xl shadow-md grid grid-cols-1 md:grid-cols-3 gap-4 relative">

          <div className="md:col-span-3 flex justify-start mb-2">
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {
                if (role !== "admin") {
                  toast.error("Bu işlemi gerçekleştirmek için yetkiniz yok.");
                } else {
                  toast.success("Meslek grubu ekleme sayfası yakında eklenecek!");
                }
              }}
              className="!bg-indigo-600 !text-sm !py-1 !px-3 !rounded-md"
            >
              Meslek Grubu Ekle
            </Button>
          </div>
          <div className="md:col-span-4 flex justify-start gap-2">
            
              <FormControl className="flex" fullWidth size="small">
                <TextField
                  label="Ad"
                  value={filters.name}
                  size="small"
                  onChange={(e) => dispatch(setName(e.target.value))}
                />
              </FormControl>

              <FormControl className="flex" fullWidth size="small">
                <TextField
                  label="Soyad"
                  value={filters.surname}
                  size="small"
                  onChange={(e) => dispatch(setSurname(e.target.value))}
                />
              </FormControl>

              <FormControl className="flex" fullWidth size="small">
                <TextField
                  label="TCKN"
                  value={filters.tckn}
                  size="small"
                  onChange={(e) => dispatch(setTckn(e.target.value))}
                  inputProps={{ maxLength: 11 }}
                />
              </FormControl>

              <FormControl className="flex" fullWidth size="small">
                <InputLabel>Rol</InputLabel>
                <Select
                  value={filters.role}
                  onChange={(e) => dispatch(setRole(e.target.value))}
                  className="!text-sm"
                >
                  <MenuItem value="">Hepsi</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="user">User</MenuItem>
                </Select>
              </FormControl>

              <FormControl className="flex" fullWidth size="small">
                <InputLabel>Meslek</InputLabel>
                <Select
                  multiple
                  value={filters.meslekList}
                  onChange={(e) => dispatch(setMeslekList(e.target.value))}
                  renderValue={(selected) => selected.join(", ")}
                  className="!text-sm"
                >
                  {MESLEK_OPTIONS.map((item) => (
                    <MenuItem key={item} value={item}>
                      <Checkbox
                        size="small"
                        checked={filters.meslekList.includes(item)}
                      />
                      <ListItemText primary={item} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            
          </div>
        </div>

        <TableContainer 
          component={Paper}
          className="shadow-xl rounded-xl w-[1200px] mx-auto"
          sx={{
            maxHeight: 500,
            overflowY: "auto",
            overflowX: "auto",
          }}
        >
          <Table>
            <TableHead>
              <TableRow className="bg-indigo-600">
                {["name", "surname", "tckn", "meslek", "role"].map((col) => (
                  <TableCell key={col} className="text-white font-bold">
                    <TableSortLabel
                      active={sort.sortKey === col}
                      direction={sort.sortDirection}
                      onClick={() => handleSort(col)}
                      style={{ color: "white" }}
                    >
                      {col.toUpperCase()}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            {data?.length === 0 ? (
              <TableBody>
                <TableRow>
                  <TableCell
                    colSpan={5}
                    align="center"
                    className="py-10 text-gray-600 font-semibold"
                  >
                    Veri bulunamadı.
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row._id} className="hover:bg-gray-100">
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.surname}</TableCell>
                    <TableCell>{row.tckn}</TableCell>
                    <TableCell>{row.meslek}</TableCell>
                    <TableCell
                      className={
                        row.role === "admin" ? "text-red-700 font-semibold" : ""
                      }
                    >
                      {row.role}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>

        <div className="flex justify-center mt-6">
          <Pagination
            count={Math.ceil(pagination.total / pagination.limit)}
            page={pagination.page}
            onChange={(e, value) => dispatch(setPage(value))}
            color="primary"
          />
        </div>

      </div>
    </div>
  );
}
