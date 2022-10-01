import React, { useEffect, useState } from "react";

function Input_Button(props) {
    const [symbol, Setsymbol] = useState("");
  return (
    <div>
      <input
        type="text"
        value={symbol}
        onChange={(e) => Setsymbol(e.target.value)}
      />
      <button onClick={() => props.AddConsulta(symbol)}>
        Clique Aqui Para Adicionar Consulta
      </button>
    </div>
  );
}

export default Input_Button;
