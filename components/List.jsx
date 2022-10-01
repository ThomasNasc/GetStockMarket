import React, { useEffect, useState } from "react";
import Card from "./Card";
import styled from "styled-components";
import axios from "axios";
import Input_Button from "./Input_Button";
const List_Cards = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #000000;
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    width: 100px;
    height: 100px;
    border: 1px solid red;
    border-radius: 16px;
    background-color: #ffacac;
  }
`;

function List(props) {
  // const [Consultas, SetConsultas] = useState([]);
  const [Database, setDatabase] = useState([]);

  async function AddConsulta(symbolId) {
    await axios
      .get(
        `http://demo.intelitrader.com.br:5200/iwg/snapshot?q=${symbolId}&t=webgateway&c=0&minify=false`
      )
      .then((response) => {
        if (response.data.Value.length != 0) {
          setDatabase([...Database, response.data.Value]);
        } else {
          throw new Error("Valor invalido");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  console.log(Database);
  return (
    <List_Cards>
      {Database.map((Item, index) => {
        return <Card Database={Item} key={index}  />;
      })}

      <Input_Button AddConsulta={AddConsulta} />
    </List_Cards>
  );
}

export default List;
