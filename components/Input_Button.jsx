import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ContainerAddConsulta = styled.div`
  width: 100vw;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  background: #ffffff22;
  backdrop-filter: blur(2.2px);
  display: ${(props) => (props.changeDisplay ? "flex" : "none")};
  div {
    width: 300px;
    height: 180px;
    padding: 15px;
    background-color: white;
    display: flex;
    border-radius: 15px;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    .AddButton {
      width: 200px;
      border-radius: 5px;
      height: 40px;
      cursor: pointer;
    }
    .InputSymbol {
      width: 200px;
      height: 40px;
      padding: 5px;
      border-radius: 5px;
      font-size: 16px;
      text-transform: uppercase;
    }
  }
  @media screen and (min-width: 600px) {
  }
`;

function Input_Button(props) {
  const [symbol, Setsymbol] = useState("");
  return (
    <ContainerAddConsulta changeDisplay={props.show}>
      <div>
        <button className="closeButton" onClick={() => {props.changeShow(false)
        props.setValidation("")
        }}>
          X
        </button>
        <h4>{props.validation}</h4>
        <h3>Insira o codigo do Ativo</h3>
        <input
          className="InputSymbol"
          type="text"
          value={symbol}
          onChange={(e) => Setsymbol(e.target.value)}
        />
        <button className="AddButton" onClick={() => {props.AddConsulta(symbol)
         props.setValidation("")}}>
          Consultar
        </button>
      </div>
    </ContainerAddConsulta>
  );
}

export default Input_Button;
