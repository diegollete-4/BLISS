import { useState } from "react";
import "./Catalogo.css";


import star1 from "./assets/fondo/Star_1.png";
import star2 from "./assets/fondo/Star_2.png";
import star3 from "./assets/fondo/Star_3.png";
import starFondo from "./assets/fondo/Star_fondo.png";

// Interface para TypeScript
interface PostreCardProps {
  nombre: string;
  descripcion: string;
  precio: number;
  imagen?: string;
  onComprar?: () => void;
}

const ESTRELLAS_TARJETA = [
  { src: star1, pos: "pos-a" },
  { src: star3, pos: "pos-b" },
  { src: star2, pos: "pos-c" },
  { src: star1, pos: "pos-d" },
];

export function PostreCard({ nombre, descripcion, precio, imagen, onComprar }: PostreCardProps) {
  return (
    <article className="postre-card">
      {ESTRELLAS_TARJETA.map((e) => (
        <img
          key={e.pos}
          src={e.src}
          alt=""
          aria-hidden="true"
          className={`postre-card__star ${e.pos}`}
        />
      ))}

      <div className="postre-card__img">
        {imagen ? <img src={imagen} alt={nombre} /> : <span>🍰</span>}
      </div>

      <div className="postre-card__body">
        <h2 className="postre-card__title">{nombre}</h2>
        <p className="postre-card__desc">{descripcion}</p>
        <div className="postre-card__row">
          <span className="postre-card__price">
            ${precio.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
          </span>
          <button className="postre-card__btn" onClick={onComprar}>
            Comprar
          </button>
        </div>
      </div>
    </article>
  );
}

const POSTRES = [
  {
    id: 1,
    nombre: "Cheesecake de fresa",
    descripcion:
      "Cremoso cheesecake tradicional sobre base de galleta con mantequilla, decorado con una deliciosa mermelada de fresa y fresas naturales rebanadas",
    precio: 199.99,
    imagen: "",
  },
  {
    id: 2,
    nombre: "Cheesecake de fresa",
    descripcion:
      "Cremoso cheesecake tradicional sobre base de galleta con mantequilla, decorado con una deliciosa mermelada de fresa y fresas naturales rebanadas",
    precio: 199.99,
    imagen: "",
  },
];

export default function Catalogo() {
  const [busqueda, setBusqueda] = useState("");

  const visibles = POSTRES.filter((p) =>
    (p.nombre + p.descripcion).toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="pagina">
      <img src={starFondo} alt="" aria-hidden="true" className="fondo-star" />

      <nav className="nav">
        <a href="/catalogo">INICIO</a>
        <a href="/catalogo">CATÁLOGO</a>
        <input
          type="search"
          placeholder="BUSCAR"
          aria-label="Buscar postres"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <a href="/contacto">CONTACTO</a>
        <a href="/historia">HISTORIA</a>
      </nav>

      <main className="lista">
        {visibles.map((p) => (
          <PostreCard
            key={p.id}
            {...p}
            onComprar={() => console.log("Comprar", p.id)}
          />
        ))}
      </main>
    </div>
  );
}