import React, { useEffect, useState } from "react";
import Card from "./Card";
import styled from "styled-components";
import axios from "axios";
import Input_Button from "./Input_Button";
const List_Cards = styled.div`
  width: 100vw;
  margin-top: 30px;
  max-width: 1600px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
  flex-direction: row;
  padding-bottom: 120px;
  .ListaDeConsultas {
    display: flex;
    flex-direction: column;
    align-items: center;

    .cover {
      position: fixed;
      bottom: 25px;
      right: 25px;
      width: 80px;
      height: 80px;
      display: flex;
      justify-content: center;
      padding: 5px;
      align-items: center;
      h1 {
        font-size: 50px;
        height: 80px;
      }
      background: rgba(228, 228, 228, 0.41);
      border-radius: 16px;
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(7.4px);
      -webkit-backdrop-filter: blur(7.4px);
      border: 1px solid rgba(68, 68, 68, 0.3);

      border-radius: 16px;
      cursor: pointer;
      :hover {
        background: rgba(90, 90, 90, 0.41);
        border-radius: 16px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(7.4px);
        -webkit-backdrop-filter: blur(7.4px);
        border: 1px solid rgba(90, 90, 90, 0.3);
        transition: 1s;
      }
      @media screen and (min-width: 600px) {
        position: inherit;
        width: 320px;
        height: 410px;
        h1 {
          font-size: 80px;
          height: 120px;
        }
      }
    }
  }
  @media screen and (min-width: 600px) {
    .ListaDeConsultas {
      width: fit-content;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
    }
  }
`;

function List(props) {
  // const [Consultas, SetConsultas] = useState([]);
  const [Database, setDatabase] = useState([]);
  const [showInputButton, setShowInputButton] = useState(false);
  const [validation, setValidation] = useState("");
  async function AddConsulta(symbolId) {
    await axios
      .get(
        `http://demo.intelitrader.com.br:5200/iwg/snapshot?q=${symbolId}&t=webgateway&c=0&minify=false`
      )
      .then((response) => {
        if (response.data.Value.length != 0) {
          setDatabase([...Database, response.data.Value]);
          setShowInputButton(false);
        } else {
          setValidation("Codigo invalido, tente novamente");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function removeConsulta(id) {
    let array = [...Database];
    array.splice(id, 1);
    setDatabase(array);
  }

  console.log(Database);
  return (
    <List_Cards>
      <div className="ListaDeConsultas">
        {Database.map((Item, index) => {
          return (
            <Card
              removeConsulta={removeConsulta}
              index={index}
              Database={Item}
              key={index}
            />
          );
        })}

        <div onClick={() => setShowInputButton(true)} className="cover">
          <h1>+</h1>
        </div>
      </div>

      {showInputButton ? (
        <Input_Button
          setValidation={setValidation}
          validation={validation}
          changeShow={setShowInputButton}
          show={showInputButton}
          AddConsulta={AddConsulta}
        />
      ) : (
        ""
      )}
    </List_Cards>
  );
}

export default List;
