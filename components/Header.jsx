import React from "react";
import styled from "styled-components";

const ContainerHeader = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 3;
  height: 100px;
  width: 100vw;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 20px;
  padding-top: 20px;
  /* From https://css.glass */
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 30px rgba(230, 228, 228, 0.1);
  backdrop-filter: blur(11px);
  -webkit-backdrop-filter: blur(11px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  h1,
  H6 {
    margin-left: 30px;
    width: 100%;
    max-width: 1600px;
  }
`;
function Header(props) {
  return (
    <ContainerHeader>
      <h1>Consulta de Cotação</h1>
      <h6>CLIQUE NO + PARA FAZER UMA PESQUISA</h6>
    </ContainerHeader>
  );
}

export default Header;
