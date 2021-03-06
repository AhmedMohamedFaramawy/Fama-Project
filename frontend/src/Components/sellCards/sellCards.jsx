import React from "react";
import axios from "axios";
//import Button from "@mui/material/Button";
//import "./Cards.css";
//import Modal from "@mui/material/Modal";
import { useState } from "react";
//import Box from "@mui/material/Box";
//import Typography from "@mui/material/Typography";
import jwt from "jsonwebtoken";
//import Grid from "@mui/material/Grid";
//import CardActions from "@mui/material/CardActions";
//import "./FlightCards.css";

const SellCards = (filter) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSell = (id) => {
    console.log("the buy id is:", id);
    console.log("the token value is:", localStorage.getItem("token"));
    const tokens = jwt.verify(
      localStorage.getItem("token"),
      "adafgjs7ng7dk7s6ng5kf5s1nbk8sf7n8dk9sn9s2fgad"
    );
    console.log("The LocalStorage token is :", tokens);
    const users = tokens.username;

    const newData = {
      users: users,
      id: id,
    };
    axios.put("http://localhost:5000/SellTokens", newData, {
      headers: { authorization: "Bearer " + localStorage.getItem("token") },
    });
  };

  console.log("filter is", filter.filter);
  return (
    <div class="cards-section">
      {filter.filter.map((filters) => (
        <div className="col rcorners1" key={filters._id}>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{filters.actualName}</h5>
              <p className="card-text">{filters.cardName}</p>
              <p>Tokens in circulation {filters.tokensInCirculation}</p>
              <p>Market Cap {filters.marketCap}</p>
              <p>Price {filters.price}</p>
              <button
                onClick={(e) => {
                  console.log(e);
                  onSell(filters._id);
                  handleClose();
                }}
              >
                Sell Token
              </button>
            </div>
          </div>
        </div>
      ))}
      ;
    </div>
  );
};

export default SellCards;
