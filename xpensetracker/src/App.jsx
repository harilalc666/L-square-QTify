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
} from "@mui/material";
import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ChartComponent from "./components/pie-chart";
import FoodIcon from "./assets/food.svg";
import MovieIcon from "./assets/movie.svg";
import AutoIcon from "./assets/auto.svg";
import Barchart from "./components/bar-chart";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function App() {
  const [page, setPage] = useState(1);

  const transactions = [
    { name: "Samosa", date: "March 20, 2024", amount: 150, category: "Food" },
    {
      name: "Movie",
      date: "March 21, 2024",
      amount: 300,
      category: "Entertainment",
    },
    { name: "Auto", date: "March 22, 2024", amount: 50, category: "Travel" },
    { name: "Pass", date: "March 22, 2024", amount: 50, category: "Travel" },
    { name: "Premium", date: "March 22, 2024", amount: 50, category: "Travel" },
  ];
    
  const itemsPerPage = 3;
  const paginatedTransactions = transactions.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  const pageCount = Math.ceil(transactions.length / itemsPerPage);
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        marginLeft: "30px",
        width: "1256px",
        height: "781px",
      }}
    >
      <h1 style={{ color: "white" }}>Expense Tracker</h1>
      {/* display card component to add income and expenses */}
      <Box
        sx={{
          backgroundColor: "#626262",
          height: "269px",
          width: "1211px",
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          gap: "40px",
          paddingLeft: "40px",
        }}
      >
        <CardComponent
          title="Wallet Balance"
          amount={5000}
          buttonValue="Add Income"
          buttonColor="#89E148"
        />
        <CardComponent
          title="Expenses"
          amount={0}
          buttonValue="Add Expense"
          buttonColor="#FF4747"
        />
        <ChartComponent />
      </Box>

      {/* main container bottom */}
      <Box
        sx={{
          width: "1185px",
          height: "345px",
          marginTop: "77px",
          display: "flex",
          justifyContent: "space-evenly",
          gap: "30px",
        }}
      >
        {/* recent transaction container */}
        <Box sx={{ width: "738px", height: "345px" }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", fontStyle: "italic", mb: 2 }}
          >
            Recent Transactions
          </Typography>
          <Box sx={{ backgroundColor: "white", borderRadius: "10px" }}>
            <List>
              {paginatedTransactions.map((tx, idx) => (
                <ListItem key={idx} divider>
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
                  <ListItemText primary={tx.name} secondary={tx.date} />
                  <Typography sx={{ color: "#FFA500", fontWeight: "bold" }}>
                    ₹{tx.amount}
                  </Typography>
                  <IconButton
                    size="small"
                    sx={{
                      background: "#FF4747",
                      color: "#fff",
                      ml: 1,
                      mr: 1,
                      "&:hover": { background: "#d32f2f" },
                    }}
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
                  >
                    <EditIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
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
          </Box>
        </Box>

        {/* top expenses container */}
        <Box sx={{ width: "417px", height: "345px" }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", fontStyle: "italic", mb: 2 }}
          >
            Top Expenses
          </Typography>
          <Box sx={{ backgroundColor: "white", borderRadius: "10px" }}>
            <Barchart />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function CardComponent({ title, amount, buttonValue, buttonColor }) {
  return (
    <Card
      sx={{
        width: "760px",
        height: "181px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#dbd7d7",
        borderRadius: "15px",
      }}
    >
      <CardContent sx={{ padding: "0px" }}>
        <Typography>{`${title}: ${amount}`}</Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" sx={{ backgroundColor: `${buttonColor}` }}>
          + {buttonValue}
        </Button>
      </CardActions>
    </Card>
  );
}

export default App;
