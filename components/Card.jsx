import React, { useEffect, useState } from "react";
import styled from "styled-components";
const Card_container = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  padding: 5px;
  margin-bottom: 10px;
  @media screen and (min-width: 600px) {
    width: 320px;
    height: 410px;
  }
  .Container_Info {
    width: 100%;
    height: 410px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    background: #ffffff;
    border-radius: 16px;
:hover{
  transition: 1s;
  /* From https://css.glass */
background: rgba(255, 255, 255, 0.514);
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(12.1px);
-webkit-backdrop-filter: blur(12.1px);

}
    .close-Button {
      height: 30px;
      margin-left: auto;
      margin-right: auto;
      margin-top: 5px;
      width: 100px;
      border-radius: 5px;

      background-color: #03314b;
      color: white;
      font-weight: 700;
      cursor: pointer;
      :hover {
        color: #03314b;
        background-color: white;
        border: 3px solid #03314b;
      }
    }
    .InfoStock {
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: 10px;
      color: white;
      /* From https://css.glass */
      background: #03314b;
      border-radius: 16px;
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.76);

      h5 {
        font-weight: 400;
        color: #1dcc98;
      }
      h6 {
        font-weight: 300;
        color: #1dcc98;
        letter-spacing: 1px;
      }

      .backgroundSymbol {
        font-size: 90px;
        position: absolute;
        right: 0;
        top: 50%;
        color: #ffffff1d;
        z-index: -1;
        transform: translateY(-50%);
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }

      div {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        h1 {
          font-size: 35px;
          font-weight: 400;
        }
        .porcentagem {
          font-size: 25px;
          font-weight: 700;
          color: ${(props) => (props.colorNetChg ? "#48ff00" : "red")};
        }
        .arrow-up {
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          position: absolute;
          top: 50%;
          transform: translateY(30%);
          transform: ${(props) =>
            props.colorNetChg ? "0" : "rotateZ(180deg)"};
          right: 90px;
          border-bottom: 15px solid
            ${(props) => (props.colorNetChg ? "#48ff00" : "red")};
          margin-right: 10px;
        }
      }
    }
    .Tables_Bid_Ask {
      display: flex;
      justify-content: space-between;
      margin-top: 15px;
      tr:first-child td:first-child {
        border-top-left-radius: 10px;
      }
      tr:first-child td:last-child {
        border-top-right-radius: 10px;
      }

      tr:last-child td:first-child {
        border-bottom-left-radius: 10px;
      }
      tr:last-child td:last-child {
        border-bottom-right-radius: 10px;
      }
      .tableLite {
        padding: 5px;
        border-spacing: 0px 3px;
        width: 49%;
        height: 190px;
        text-align: center;
        background-color: #03314b;
        border-radius: 16px;

        thead {
          tr {
            td {
              color: #1dcc98;
              font-weight: 700;
            }
          }
        }
        tr {
          /* From https://css.glass */
          background: rgba(255, 255, 255, 0.23);
          border-radius: 16px;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(6.8px);
          -webkit-backdrop-filter: blur(6.8px);
          border: 1px solid rgba(255, 255, 255, 0.76);
          td {
            color: white;
            padding: 2px;
            font-size: 12px;
          }
        }
      }
    }
  }
`;

function Card(props) {
  const DatabaseAplied = props.Database.length != 0;
  const Properties = DatabaseAplied ? props.Database[0].Properties : [];
  const Book = DatabaseAplied ? props.Database[0].Book : [];
  return (
    <Card_container
      colorNetChg={DatabaseAplied ? Properties.NetChgPrevDay >= 0 : ""}
    >
      <div className="Container_Info">
        <div className="InfoStock">
          <h2 className="textInfo  "> {props.Database[0].Symbol}</h2>
          <h2 className="textInfo backgroundSymbol">
            {" "}
            {props.Database[0].Symbol}
          </h2>
          <h5 className="textInfo"> {Properties.SecurityDesc}</h5>
          <div>
            <h1 className="textInfo">
              R${"  "}
              {Properties.Price.toLocaleString("pt-BR", {
                currency: "BRL",
                style: "currency",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h1>
            <h1 className="textInfo porcentagem">
              <span className="arrow-up"></span> {Properties.NetChgPrevDay}%
            </h1>
          </div>
          <h6 className="textInfo">Lote: {Properties.MinOrderQty}</h6>
          <h6 className="textInfo">
            Ult.{" "}
            {new Date(
              new Date(props.Database[0].UpdateTime).getTime()
            ).toLocaleString("pt-BR")}
          </h6>
        </div>
        <div className="Tables_Bid_Ask">
          <table className="table_BID tableLite">
            <thead>
              <tr>
                <td>Corr.</td>
                <td>Qtd.</td>
                <td>Compra</td>
              </tr>
            </thead>
            <tbody>
              {Book.Bid.slice(0, 5).map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.Broker}</td>
                    <td>{item.Quantity}</td>
                    <td>
                      {item.Price.toLocaleString("pt-BR", {
                        currency: "BRL",
                        style: "currency",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <table className="table_ASK tableLite">
            <thead>
              <tr>
                <td>Venda.</td>
                <td>Qtd.</td>
                <td>Corr.</td>
              </tr>
            </thead>
            <tbody>
              {Book.Ask.slice(0, 5).map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      {item.Price.toLocaleString("pt-BR", {
                        currency: "BRL",
                        style: "currency",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td>{item.Quantity}</td>
                    <td>{item.Broker}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <button
          onClick={() => props.removeConsulta(props.index)}
          className="close-Button"
        >
          Fechar
        </button>
      </div>
    </Card_container>
  );
}

export default Card;
