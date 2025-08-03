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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

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
      sx={{
        display: "flex",
        flexDirection: "column",
        px: { xs: 2, sm: 4, md: 6 },
        width: "100%",
        maxWidth: "1256px",
        mx: "auto", // center horizontally
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
        <Box sx={{ width: { xs: "100%", sm: "300px" }, height: "200px", marginLeft: "20px" }}>
          <ChartComponent />
        </Box>
      </Box>

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
            {" "}
            Recent Transactions
          </Typography>
          <Box sx={{ backgroundColor: "white", borderRadius: "10px" }}>
            <List>
              {paginatedTransactions.map((tx, idx) => (
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
                  <ListItemText primary={tx.name} secondary={tx.date} />
                  <Typography sx={{ color: "#FFA500", fontWeight: "bold" }}>
                    ₹{tx.amount}
                  </Typography>
                  <IconButton
                    size="small"
                    sx={{
                      mx: 1,
                      p: { xs: 0.5, sm: 1 },
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
        <Button variant="contained" sx={{ backgroundColor: `${buttonColor}` }}>
          + {buttonValue}
        </Button>
      </CardActions>
    </Card>
  );
}

export default App;
