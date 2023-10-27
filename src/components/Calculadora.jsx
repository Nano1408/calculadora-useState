import { useState } from "react";
import Boton from "./Boton";
import "./calculadora.css";
import Switch from "./Switch";

const Calculadora = () => {
  const [data, setData] = useState({ operacion: "", resultado: "" });

  const operaciones = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
    "%": (a) => a / 100,
    "+/-": (a) => -a,
  };

  const escritura = (e) => {
    const valor = e.target.innerText;

    if (data.operacion.includes("error")) {
      setData({ resultado: "", operacion: valor });
    } 
    
    else if (valor === "+/-" && data.operacion !== "") {
      setData({
        operacion:
          data.operacion[0] === "-"
            ? data.operacion.slice(1)
            : "-" + data.operacion,
      });
    } 
    
    else if (
      data.resultado !== "" &&
      data.operacion === "" &&
      operaciones[valor]
    ) {
      setData({ resultado: "", operacion: data.resultado + valor });
    } 
    
    else if (data.operacion.length < 10) {
      setData({ operacion: data.operacion + valor });
    }
  };

  const deleted = () => {
    setData({ ...data, operacion: data.operacion.slice(0, -1) });
  };

  const limpiar = () => {
    setData({ resultado: "", operacion: "" });
  };

  const resultado = () => {
    try {
      let resultado = "";
      if (data.operacion.includes("%")) {
        const valores = data.operacion.split("%");
        resultado = eval(`${valores[1]}*(${valores[0]}/100)`);
      } else {
        resultado = eval(data.operacion);
      }
      setData({ ...data, resultado, operacion: "" });
    } catch (error) {
      setData({ ...data, operacion: "error" });
    }
  };

  return (
    <main>
      <Switch />
      <span className="resultado">{data.resultado}</span>
      <span className="display">{data.operacion}</span>
      <Boton texto="C" clase="gris" handleClick={limpiar} />
      <Boton texto="+/-" clase="gris" handleClick={escritura} />
      <Boton texto="%" clase="gris" handleClick={escritura} />
      <Boton texto="/" clase="operacion" handleClick={escritura} />
      <Boton texto="7" clase="numero" handleClick={escritura} />
      <Boton texto="8" clase="numero" handleClick={escritura} />
      <Boton texto="9" clase="numero" handleClick={escritura} />
      <Boton texto="*" clase="operacion" handleClick={escritura} />
      <Boton texto="4" clase="numero" handleClick={escritura} />
      <Boton texto="5" clase="numero" handleClick={escritura} />
      <Boton texto="6" clase="numero" handleClick={escritura} />
      <Boton texto="-" clase="operacion" handleClick={escritura} />
      <Boton texto="1" clase="numero" handleClick={escritura} />
      <Boton texto="2" clase="numero" handleClick={escritura} />
      <Boton texto="3" clase="numero" handleClick={escritura} />
      <Boton texto="+" clase="operacion" handleClick={escritura} />
      <Boton texto="." clase="numero" handleClick={escritura} />
      <Boton texto="0" clase="numero" handleClick={escritura} />
      <Boton texto="<x" clase="numero" handleClick={deleted} />
      <Boton texto="=" clase="operacion" handleClick={resultado} />
      <div className="guion-phone"></div>
    </main>
  );
};

export default Calculadora;
