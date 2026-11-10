import { useState, type ChangeEvent, type FormEvent } from "react";
import "./Login.css";

// Ajusta la ruta según dónde guardes la imagen en tu proyecto
import fresa from "./assets/fondo/fresa-bliss.png";

// Definimos la estructura de los datos del formulario
interface DatosLogin {
  nombre: string;
  correo: string;
  telefono: string;
}

// Definimos las props que recibe el componente Login
interface LoginProps {
  onSubmit?: (datos: DatosLogin) => void;
  onGoogle?: () => void;
}

const CAMPOS = [
  { name: "nombre", label: "¿Cuál es tu nombre?", type: "text", auto: "name" },
  { name: "correo", label: "Escríbeme tu correo electrónico:", type: "email", auto: "email" },
  { name: "telefono", label: "Dime tu número telefónico:", type: "tel", auto: "tel" },
] as const;

// Estrellas del fondo de la tarjeta (x, y en px desde la esquina de la tarjeta; s = tamaño; r = giro)
const ESTRELLAS = [
  { x: 81, y: 34, s: 80, r: -12 },
  { x: 330, y: 29, s: 80, r: 8 },
  { x: 532, y: 64, s: 76, r: 14 },
  { x: -10, y: 164, s: 80, r: -20 },
  { x: 430, y: 177, s: 80, r: 6 },
  { x: 288, y: 599, s: 80, r: -4 },
  { x: 93, y: 664, s: 80, r: 10 },
  { x: 350, y: 744, s: 80, r: -10 },
];

export default function Login({ onSubmit, onGoogle }: LoginProps) {
  const [datos, setDatos] = useState<DatosLogin>({ nombre: "", correo: "", telefono: "" });

  const cambiar = (e: ChangeEvent<HTMLInputElement>) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const enviar = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(datos);
  };

  return (
    <div className="login">
      <div className="login__stage">
        {/* Fresa izquierda y derecha (la derecha es la misma imagen volteada) */}
        <img src={fresa} alt="" aria-hidden="true" className="login__fresa login__fresa--izq" />
        <img src={fresa} alt="" aria-hidden="true" className="login__fresa login__fresa--der" />

        <form className="login__card" onSubmit={enviar}>
          {ESTRELLAS.map((e, i) => (
            <i
              key={i}
              className="login__estrella"
              style={{
                left: e.x,
                top: e.y,
                width: e.s,
                height: e.s,
                transform: `translate(-50%, -50%) rotate(${e.r}deg)`,
              }}
            />
          ))}

          <h1 className="login__titulo">BLISS DESSERTS</h1>
          <span className="login__by">By Vale!</span>

          <div className="login__campos">
            {CAMPOS.map((c) => (
              <label key={c.name} className="login__campo">
                <span>{c.label}</span>
                <input
                  name={c.name}
                  type={c.type}
                  autoComplete={c.auto}
                  value={datos[c.name as keyof DatosLogin]}
                  onChange={cambiar}
                  required
                />
              </label>
            ))}
          </div>

          <button type="button" className="login__google" onClick={() => onGoogle?.()}>
            <b className="login__g" aria-hidden="true">G</b>
            <span>Acceder con Google</span>
          </button>

          {/* Permite enviar con Enter sin mostrar un botón que no está en el diseño */}
          <button type="submit" className="login__oculto" tabIndex={-1} aria-hidden="true" />
        </form>
      </div>
    </div>
  );
}