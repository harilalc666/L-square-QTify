// import { useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  List,
  PaginationItem,
  Modal,
  TextField,
  MenuItem,
  Select
} from "@mui/material";
import { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ChartComponent from "./components/pie-chart";
import FoodIcon from "./assets/food.svg";
import MovieIcon from "./assets/movie.svg";
import AutoIcon from "./assets/auto.svg";
import Barchart from "./components/bar-chart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const getLocalData = (key, defaultValue) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
};
const setLocalData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

function App() {
  // State for expenses and wallet
  const [expenses, setExpenses] = useState(() => getLocalData("expenses", []));
  const [wallet, setWallet] = useState(() => getLocalData("wallet", 5000));
  const [incomeModalOpen, setIncomeModalOpen] = useState(false);
  const [incomeAmount, setIncomeAmount] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editIdx, setEditIdx] = useState(null);

  // Form state
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    date: "",
  });

  // Pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 3;
  const paginatedExpenses = expenses.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const pageCount = Math.ceil(expenses.length / itemsPerPage);

  // Persist to localStorage
  useEffect(() => {
    setLocalData("expenses", expenses);
    setLocalData("wallet", wallet);
  }, [expenses, wallet]);

  // Handle form input
  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add Income handler
  const handleAddIncome = (e) => {
    e.preventDefault();
    const amt = parseFloat(incomeAmount);
    if (!amt || amt <= 0) return;
    setWallet(wallet + amt);
    setIncomeAmount("");
    setIncomeModalOpen(false);
  };

  // Open modal for add/edit expenses
  const openModalForExpense = (idx = null) => {
    setEditIdx(idx);
    if (idx !== null) {
      setForm(expenses[idx]);
    } else {
      setForm({ title: "", price: "", category: "", date: "" });
    }
    setModalOpen(true);
  };

  // Add or Edit Expense
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.price || !form.category || !form.date) return;
    const amt = parseFloat(form.price);
    let newExpenses, newWallet;
    if (editIdx !== null) {
      // Edit
      const oldAmt = parseFloat(expenses[editIdx].price);
      newExpenses = expenses.map((exp, idx) => (idx === editIdx ? form : exp));
      newWallet = wallet + oldAmt - amt;
    } else {
      // Add
      newExpenses = [...expenses, form];
      newWallet = wallet - amt;
    }
    setExpenses(newExpenses);
    setWallet(newWallet);
    setModalOpen(false);
    setEditIdx(null);
    setForm({ title: "", price: "", category: "", date: "" });
  };

  // Delete Expense
  const handleDelete = (idx) => {
    const amt = parseFloat(expenses[idx].price);
    setWallet(wallet + amt);
    setExpenses(expenses.filter((_, i) => i !== idx));
  };

  // Calculate summary for charts
  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + parseFloat(exp.price);
    return acc;
  }, {});

  // Convert to array of objects for charts
  const chartData = Object.entries(categoryTotals).map(([category, amount]) => ({
    category,
    amount,
  }));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        px: { xs: 2, sm: 4, md: 6 },
        width: "100%",
        maxWidth: "1256px",
        mx: "auto",
        height: "100%",
      }}
    >
      <h1 style={{ color: "white" }}>Expense Tracker</h1>
      {/* display card component to add income and expenses */}
      <Box
        sx={{
          backgroundColor: "#626262",
          width: "100%",
          flexWrap: "wrap",
          display: "flex",
          gap: "30px",
          justifyContent: "start",
          alignItems: "center",
          paddingLeft: "20px",
          py: 2,
        }}
      >
        <CardComponent
          title="Wallet Balance"
          amount={`₹${wallet}`}
          buttonValue="Add Income"
          buttonColor="#89E148"
          onButtonClick={() => setIncomeModalOpen(true)}
        />
        <CardComponent
          title="Expenses"
          amount={`₹${expenses.reduce((sum, exp) => sum + parseFloat(exp.price), 0)}`}
          buttonValue="Add Expense"
          buttonColor="#FF4747"
          onButtonClick={() => openModalForExpense()}
        />
        <Box sx={{ width: { xs: "100%", sm: "300px" }, height: "200px", marginLeft: "20px" }}>
          <ChartComponent data={chartData} />
        </Box>
      </Box>

      {/* Add Income Modal */}
      <Modal open={incomeModalOpen} onClose={() => setIncomeModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: { xs: 2, sm: 4 },
            borderRadius: 3,
            minWidth: 300,
            width: { xs: "90vw", sm: 400 },
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
          component="form"
          onSubmit={handleAddIncome}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            Add Balance
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              placeholder="Income Amount"
              name="incomeAmount"
              type="number"
              value={incomeAmount}
              onChange={(e) => setIncomeAmount(e.target.value)}
              required
              fullWidth
              inputProps={{ min: 1 }}
              sx={{
                background: "#fff",
                borderRadius: 2,
              }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                background: "#FFC940",
                color: "#222",
                fontWeight: 600,
                px: 3,
                borderRadius: 2,
                boxShadow: "none",
                "&:hover": { background: "#FFD966" },
              }}
            >
              Add Balance
            </Button>
            <Button
              type="button"
              variant="contained"
              onClick={() => setIncomeModalOpen(false)}
              sx={{
                background: "#E0E0E0",
                color: "#222",
                fontWeight: 600,
                px: 3,
                borderRadius: 2,
                boxShadow: "none",
                "&:hover": { background: "#bdbdbd" },
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Expense Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: { xs: 2, sm: 4 },
            borderRadius: 3,
            minWidth: 320,
            width: { xs: "95vw", sm: 500 },
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
          component="form"
          onSubmit={handleFormSubmit}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            {editIdx !== null ? "Edit Expense" : "Add Expenses"}
          </Typography>
          {/* All fields in a single Box for test compatibility */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              placeholder="Title"
              name="title"
              value={form.title}
              onChange={handleFormChange}
              required
              fullWidth
              sx={{ background: "#fff", borderRadius: 2 }}
              inputProps={{ "data-testid": "expense-title-input" }}
            />
            <TextField
              placeholder="Price"
              name="price"
              type="number"
              value={form.price}
              onChange={handleFormChange}
              required
              fullWidth
              inputProps={{ min: 1, "data-testid": "expense-price-input" }}
              sx={{ background: "#fff", borderRadius: 2 }}
            />
            <Select 
              placeholder="Select Category"
              name="category"
              value={form.category}
              onChange={handleFormChange}
              required
              select
              fullWidth
              sx={{ background: "#fff", borderRadius: 2 }}
              inputProps={{ "data-testid": "expense-category-dropdown" }}
            >
              <MenuItem value="Food">Food</MenuItem>
              <MenuItem value="Entertainment">Entertainment</MenuItem>
              <MenuItem value="Travel">Travel</MenuItem>
              {/* Add more categories as needed */}
            </Select >
            <TextField
              placeholder="dd/mm/yyyy"
              name="date"
              type="date"
              value={form.date}
              onChange={handleFormChange}
              required
              fullWidth
              InputLabelProps={{ shrink: true }}
              sx={{ background: "#fff", borderRadius: 2 }}
              inputProps={{ "data-testid": "expense-date-input" }}
            />
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                background: "#FFC940",
                color: "#222",
                fontWeight: 600,
                px: 4,
                borderRadius: 2,
                boxShadow: "none",
                "&:hover": { background: "#FFD966" },
              }}
            >
              {editIdx !== null ? "Update" : "Add Expense"}
            </Button>
            <Button
              type="button"
              variant="contained"
              onClick={() => setModalOpen(false)}
              sx={{
                background: "#E0E0E0",
                color: "#222",
                fontWeight: 600,
                px: 4,
                borderRadius: 2,
                boxShadow: "none",
                "&:hover": { background: "#bdbdbd" },
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* main container bottom */}
      <Box
        sx={{
          width: "100%",
          mt: 6,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          justifyContent: "space-between",
        }}
      >
        {/* recent transaction container */}
        <Box sx={{ width: { xs: "100%", md: "65%" } }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              fontStyle: "italic",
              fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" },
              mb: 2,
            }}
          >
            Recent Transactions
          </Typography>
          <Box sx={{ backgroundColor: "white", borderRadius: "10px" }}>
            <List>
              {paginatedExpenses.length === 0
                ? "No Transactions!"
                : paginatedExpenses.map((tx, idx) => (
                    <ListItem
                      key={idx}
                      divider
                      sx={{ flexWrap: "wrap", justifyContent: "space-between" }}
                    >
                      <ListItemIcon>
                        {tx.category === "Food" && (
                          <img src={FoodIcon} alt="food" />
                        )}
                        {tx.category === "Entertainment" && (
                          <img src={MovieIcon} alt="movie" />
                        )}
                        {tx.category === "Travel" && (
                          <img src={AutoIcon} alt="auto" />
                        )}
                      </ListItemIcon>
                      <ListItemText primary={tx.title} secondary={tx.date} />
                      <Typography sx={{ color: "#FFA500", fontWeight: "bold" }}>
                        ₹{tx.price}
                      </Typography>
                      <IconButton
                        size="small"
                        sx={{
                          mx: 1,
                          p: { xs: 0.5, sm: 1 },
                        }}
                        onClick={() => handleDelete((page - 1) * itemsPerPage + idx)}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        sx={{
                          background: "#FFD700",
                          color: "#fff",
                          "&:hover": { background: "#FFC107" },
                        }}
                        onClick={() => openModalForExpense((page - 1) * itemsPerPage + idx)}
                      >
                        <EditIcon />
                      </IconButton>
                    </ListItem>
                  ))}
            </List>
            {paginatedExpenses.length !== 0 && (
              <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
                <Pagination
                  count={pageCount}
                  page={page}
                  onChange={(_, value) => setPage(value)}
                  shape="rounded"
                  color="primary"
                  renderItem={(item) => (
                    <PaginationItem
                      slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                      {...item}
                    />
                  )}
                />
              </Box>
            )}
          </Box>
        </Box>

        {/* top expenses container */}
        <Box sx={{ width: { xs: "100%", md: "35%" } }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              fontStyle: "italic",
              fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" },
              mb: 2,
            }}
          >
            Top Expenses
          </Typography>
          <Box sx={{ backgroundColor: "white", borderRadius: "10px" }}>
            <Barchart data={chartData} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function CardComponent({ title, amount, buttonValue, buttonColor, onButtonClick }) {
  return (
    <Card
      sx={{
        width: { xs: "100%", sm: "300px", md: "300px" },
        height: "auto",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
        backgroundColor: "#dbd7d7",
        borderRadius: "15px",
      }}
    >
      <CardContent sx={{ padding: "0px" }}>
        <Typography>{`${title}: ${amount}`}</Typography>
      </CardContent>
      <CardActions>
        <Button
          type="button"
          variant="contained"
          sx={{ backgroundColor: `${buttonColor}` }}
          onClick={onButtonClick}
        >
          + {buttonValue}
        </Button>
      </CardActions>
    </Card>
  );
}

export default App;
