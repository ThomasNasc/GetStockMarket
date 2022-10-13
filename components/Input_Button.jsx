import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ContainerAddConsulta = styled.div`
  width: 100vw;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  background: #ffffff22;
  backdrop-filter: blur(2.2px);
  display: ${(props) => (props.changeDisplay ? "flex" : "none")};
  form {
    width: 350px;
    height: 300px;
    padding: 15px;
    background-color: #03314b;
    display: flex;
    border-radius: 15px;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    h4 {
      text-transform: uppercase;
      color: #ff0000;
    }
    h3 {
      text-transform: uppercase;
      color: white;
    }
    .AddButton {
      width: 150px;
      border-radius: 5px;
      height: 40px;
      cursor: pointer;
      background-color: #03314b;
      color: white;
      font-weight: 700;
      border: 1px solid white;
      :hover {
        background-color: white;
        color: #03314b;

        border: 3px solid #03314b white;
      }
    }
    .InputSymbol {
      width: 150px;
      height: 50px;
      padding: 5px;
      border-radius: 5px;
      font-size: 16px;
      text-transform: uppercase;
    }
    .closeButton {
      width: 35px;
      height: 35px;
      align-self: flex-end;
      border: none;
      border-radius: 30px;
      background-color: #ffffff;
      color: #020202;
      cursor: pointer;
      :hover {
        background-color: #03314b;
        color: white;
      }
    }
  }
  @media screen and (min-width: 600px) {
  }
`;

function Input_Button(props) {
  const [symbol, Setsymbol] = useState("");

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();

        // 👇️ call submit function here

        props.AddConsulta(symbol);
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [symbol]);

  return (
    <ContainerAddConsulta changeDisplay={props.show}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.AddConsulta(symbol);
        }}
      >
        <button
          className="closeButton"
          onClick={() => {
            props.changeShow(false);
            props.setValidation("");
          }}
        >
          X
        </button>
        <h4>{props.validation}</h4>
        <h3>Insira o codigo do Ativo</h3>
        <input
          placeholder="Symbol..."
          className="InputSymbol"
          type="text"
          value={symbol}
          onChange={(e) => Setsymbol(e.target.value)}
        />
        <button className="AddButton" type="submit">
          Consultar
        </button>
      </form>
    </ContainerAddConsulta>
  );
}

export default Input_Button;
