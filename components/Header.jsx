import React from "react";
import styled from "styled-components";

const ContainerHeader = styled.div`
  width: 100vw;
  color: white;
  max-width: 1600px;
  margin-left: auto;
  margin-right: auto;

  h1,
  H6 {
    margin-left: 30px;
  }
`;
function Header(props) {
  return (
    <ContainerHeader>
      <h1>Cotação de StockMarket</h1>
      <h6>CLIQUE NO + PARA FAZER UMA PESQUISA</h6>
    </ContainerHeader>
  );
}

export default Header;
