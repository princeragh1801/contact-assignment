import { Button, TablePagination } from "@mui/material";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditModal from "./components/EditModal";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ConfirmDialog from "./components/ConfirmModal";
import { deleteContact, getContacts, healthCheck } from "./services/contactService";
import toast from "react-hot-toast";
import Loader from "./components/Loader";
import TableSortLabel from '@mui/material/TableSortLabel';

function App() {
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [contacts, setContacts] = React.useState([]);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('firstName');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [search, setSearch] = React.useState("");
  const [debouncedSearch, setDebouncedSearch] = React.useState(search);
  const [totalItems, setTotalItems] = React.useState(1);
  const [deletingId, setDeletingId] = React.useState();
  const [selectedContact, setSelectedContact] = React.useState(null)
  const [loading, setLoading] = React.useState(false);
  const [confirmOperation, setConfirmOperation] = React.useState(false)
  const [noContent, setNoContent] = React.useState(false)
  // Function to fetch contacts
  const fetchContacts = async () => {
    try {
      setLoading(true)
      const response = await getContacts({
        page: page + 1,
        limit: rowsPerPage,
        sortOrder: order,
        sortBy: orderBy,
        search: debouncedSearch,
      });
      console.log("Response: ", response);
      if (response.status) {
        setContacts(response.data.contacts);
        setTotalItems(response.data.totalItems);
        setNoContent(response.data.contacts.length > 0 ? false : true)
      }
    } catch (error) {
      console.error("Error occurred while fetching contacts: ", error);
    }finally{
      setLoading(false)
    }
  };
  const handleDelete = async()=>{
    try {
      console.log("ID : ", deletingId)
      const response = await deleteContact(deletingId);
      console.log("Response : ", response);
      if(response.status){

        setOpenDialog(false)
        toast.success(response.message);
        await fetchContacts()
      }else{
        toast.error(response.message)
      }
    } catch (error) {
      console.error("Error occured while deleting ", error);
    }
  }
  const handleSort = (column) => {
    if(!noContent){
      const isAsc = orderBy === column && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(column);
    }else{
      // is this good or not
      toast.error("Nothing to display. No need to sort data.")
    }
    
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    fetchContacts();
  }, [page, order, orderBy, rowsPerPage, debouncedSearch]);

  React.useEffect(()=>{
    if(confirmOperation){
      fetchContacts();
    }
  },[confirmOperation])

  // Debounce search input
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(0)
    }, 500); // 500ms debounce time
    
    return () => clearTimeout(timer); // Clear timeout on component unmount or re-run
  }, [search]);
  // if(loading){
  //   return <Loader/>
  // }
  return (
    <div className="w-full p-4 space-y-4">
      {/* Heading */}
      <h1 className="text-2xl text-green-800 font-bold capitalize">Contact List</h1>

      {/* Search and Add Button */}
      <div className="flex items-center justify-between">
        {/* Search Box */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="border border-gray-300 rounded-md p-2 w-1/2"
        />
        {/* Add Button */}
        <Button color="success" className="text-green-800" variant="outlined" onClick={() => {
          setConfirmOperation(false)
          setSelectedContact(null)
          setOpen(true)
          }}>
          Add
        </Button>
      </div>

      {/* Table */}
      {
        loading ? <Loader message="Fetching contacts..." className='mt-10' /> :
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
  <TableContainer component={Paper} style={{ maxHeight: 500 }}>
    <Table stickyHeader sx={{ minWidth: 650 }} aria-label="sticky table">
      <TableHead>
        <TableRow>
          <TableCell align="left">S.No.</TableCell>
          <TableCell align="left" sortDirection={orderBy === 'firstName' ? order : false}>
            <TableSortLabel
              active={orderBy === 'firstName'}
              direction={orderBy === 'firstName' ? order : 'asc'}
              onClick={() => handleSort('firstName')}
              hideSortIcon={noContent}
            >
              First Name
            </TableSortLabel>
          </TableCell>
          <TableCell align="left" sortDirection={orderBy === 'lastName' ? order : false}>
            <TableSortLabel
              active={orderBy === 'lastName'}
              direction={orderBy === 'lastName' ? order : 'asc'}
              onClick={() => handleSort('lastName')}
              hideSortIcon={noContent}
            >
              Last Name
            </TableSortLabel>
          </TableCell>
          <TableCell align="left" sortDirection={orderBy === 'email' ? order : false}>
            <TableSortLabel
              active={orderBy === 'email'}
              direction={orderBy === 'email' ? order : 'asc'}
              onClick={() => handleSort('email')}
              hideSortIcon={noContent}
            >
              Email
            </TableSortLabel>
          </TableCell>
          <TableCell align="left" sortDirection={orderBy === 'phoneNumber' ? order : false}>
            <TableSortLabel
              active={orderBy === 'phoneNumber'}
              direction={orderBy === 'phoneNumber' ? order : 'asc'}
              onClick={() => handleSort('phoneNumber')}
              hideSortIcon={noContent}
            >
              Phone Number
            </TableSortLabel>
          </TableCell>
          <TableCell align="left" sortDirection={orderBy === 'company' ? order : false}>
            <TableSortLabel
              active={orderBy === 'company'}
              direction={orderBy === 'company' ? order : 'asc'}
              onClick={() => handleSort('company')}
              hideSortIcon={noContent}
            >
              Company
            </TableSortLabel>
          </TableCell>
          <TableCell align="left" sortDirection={orderBy === 'jobTitle' ? order : false}>
            <TableSortLabel
              active={orderBy === 'jobTitle'}
              direction={orderBy === 'jobTitle' ? order : 'asc'}
              onClick={() => handleSort('jobTitle')}
              hideSortIcon={noContent}
            >
              Job Title
            </TableSortLabel>
          </TableCell>
          <TableCell align="left">Actions</TableCell>
        </TableRow>
      </TableHead>
     { !noContent ? <TableBody>
        {contacts.map((row, index) => (
          <TableRow key={index}>
            <TableCell align="left">{page * rowsPerPage + index + 1}</TableCell>
            <TableCell align="left">{row.firstName}</TableCell>
            <TableCell align="left">{row.lastName}</TableCell>
            <TableCell align="left">{row.email}</TableCell>
            <TableCell align="left">{row.phoneNumber}</TableCell>
            <TableCell align="left">{row.company}</TableCell>
            <TableCell align="left">{row.jobTitle}</TableCell>
            <TableCell align="left">
              <DeleteIcon
                className="cursor-pointer mr-2"
                onClick={() => {
                  setDeletingId(row._id);
                  setOpenDialog(true);
                }}
              />
              <EditIcon
                className="cursor-pointer"
                onClick={() => {
                  setConfirmOperation(false)
                  setSelectedContact(row);
                  setOpen(true);
                }}
              />
            </TableCell>
          </TableRow>
        )) }
        
      </TableBody> :
      <div className="mx-auto p-4">
      <p>No content to display</p>
    </div>}
    </Table>
  </TableContainer>
  <TablePagination
    rowsPerPageOptions={[5, 10, 25]}
    component="div"
    count={totalItems}
    rowsPerPage={rowsPerPage}
    page={page}
    onPageChange={handleChangePage}
    onRowsPerPageChange={handleChangeRowsPerPage}
  />
</div>
      }


      {open && <EditModal setOpen={setOpen} open={open} contact={selectedContact} setConfirmOperation={setConfirmOperation} />}
      {openDialog && <ConfirmDialog open={openDialog} setOpen={setOpenDialog} onConfirm={handleDelete} />}
    </div>
  );
}

export default App;
