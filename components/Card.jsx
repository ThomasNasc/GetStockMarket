import React, { useEffect, useState } from "react";
import styled from "styled-components";
const Card_container = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  padding: 10px;
  @media screen and (min-width: 600px) {
    width: 400px;
  }
  .Container_Info {
    width: 100%;
    height: max-content;
    padding: 10px;
    /* From https://css.glass */
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(7.7px);
    -webkit-backdrop-filter: blur(7.7px);
    border: 1px solid rgba(183, 158, 158, 1);

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
        color: #ffffff16;
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
          font-size: 40px;
          color: ${(props) => (props.colorNetChg ? "green" : "red")};
        }
        .arrow-up {
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          position: absolute;
          top: 50%;
          transform: translateY(40%);
          right: 125px;
          border-bottom: 15px solid
            ${(props) => (props.colorNetChg ? "green" : "red")};
          margin-right: 10px;
        }
      }
    }
    .Tables_Bid_Ask {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      .tableLite {
        padding: 10px;
        border-spacing: 0px 3px;
        width: 48%;
        text-align: center;
        background-color: #03314b;
        border-radius: 16px;
        color: #1dcc98;
        tr {
          /* From https://css.glass */
          background: rgba(255, 255, 255, 0.23);
          border-radius: 16px;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(6.8px);
          -webkit-backdrop-filter: blur(6.8px);
          border: 1px solid rgba(255, 255, 255, 0.76);
          td {
            padding: 2px;
          }
        }
      }
    }
  }
`;

function Card(props) {
  console.log(props);

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
      </div>
    </Card_container>
  );
}

export default Card;
