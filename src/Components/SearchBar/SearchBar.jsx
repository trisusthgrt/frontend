import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import {
  Container,
  InputAdornment,
  TextField,
  Typography,
  Box,
  Paper,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { getAllProducts } from "../../Constants/Constant";
import { useTranslation } from "react-i18next";
// import i18n from "i18next";
import axios from "axios";

// Set up i18n configuration

// SearchBar component
const SearchBar = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [lang, setlang] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAllProducts(setData);
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const newFilteredData = data.filter(
      (item) =>
        (item.name &&
          item.name.toLowerCase().includes(event.target.value.toLowerCase())) ||
        (item.type &&
          item.type.toLowerCase().includes(event.target.value.toLowerCase())) ||
        (item.brand &&
          item.brand
            .toLowerCase()
            .includes(event.target.value.toLowerCase())) ||
        (item.category &&
          item.category
            .toLowerCase()
            .includes(event.target.value.toLowerCase())) ||
        (item.author &&
          item.author
            .toLowerCase()
            .includes(event.target.value.toLowerCase())) ||
        (item.description &&
          item.description
            .toLowerCase()
            .includes(event.target.value.toLowerCase())) ||
        (item.gender &&
          item.gender.toLowerCase().includes(event.target.value.toLowerCase()))
    );
    setFilteredData(newFilteredData);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const fetchdata = async () => {
    let productsAll = {};
    // try {
    //   const response = await axios.get("http://localhost:5000/search", {
    //     params: {
    //       language: lang,
    //       product: searchTerm,
    //     },
    //   });
    //   setSearchTerm(response.data.translated_product);
    //   console.log(response.data);
    // } catch (error) {
    //   console.error("Error fetching data:", error);
    // }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/product/fetchproduct/category/${searchTerm}`,
        {}
      );
      productsAll = response.data;
      console.log(response.data);
      //response.data.map(async (prod) => {
    //     try {
    //       const resp = await axios.get("http://localhost:5000/translate", {
    //         params: {
    //           language: lang,
    //           product: prod.product_name,
    //         },
    //       });
    //       prod.product_name = resp.data.translated_product;
    //       console.log("It is ", response.data);
    //     } catch (error) {
    //       console.error("Error fetching data:", error);
    //     }
    //   });
      console.log("It is final ", productsAll);

      navigate("product/type/a", { state: response.data });

      //console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: 5,
      }}
    >
      {/* Language Dropdown */}
      <div style={{ marginBottom: "10px" }}>
        <label htmlFor="language">Language:</label>
        <select
          id="language"
          onChange={(e) => setlang(e.target.value)}
          defaultValue="en"
        >
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
          <option value="od">ଓଡ଼ିଆ</option>
        </select>
      </div>

      {/* Search Bar */}
      <TextField
        id="search"
        type="search"
        label={t("searchPlaceholder")}
        value={searchTerm}
        onChange={handleSearch}
        sx={{ width: { xs: 350, sm: 500, md: 800 } }}
        InputProps={{
          endAdornment: <button onClick={fetchdata}>Search</button>,
        }}
      />

      {/* Display Filtered Data */}
      {searchTerm.length > 0 && (
        <Box
          sx={{
            width: { xs: 350, sm: 500, md: 800 },
            overflowY: "scroll",
            height: "200px",
          }}
        >
          <Stack spacing={0}>
            {filteredData.length === 0 ? (
              <Typography variant="h6" textAlign="center" margin="25px 0">
                {t("productNotFound")}
              </Typography>
            ) : (
              filteredData.map((products) => (
                <Link
                  to={`/Detail/type/${products.type}/${products._id}`}
                  key={products._id}
                >
                  <Item
                    sx={{
                      borderRadius: 0,
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "2px 15px",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body2">
                      {" "}
                      {products.name.slice(0, 35)}
                    </Typography>
                    <img
                      src={products.image}
                      alt={products.name}
                      style={{ width: 55, height: 65 }}
                    />
                  </Item>
                </Link>
              ))
            )}
          </Stack>
        </Box>
      )}
    </Container>
  );
};

export default SearchBar;
