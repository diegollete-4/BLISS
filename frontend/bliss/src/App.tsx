import { useState } from "react";
import Login from "./Login";
import Catalogo from "./Catalogo";

export default function App() {
  // Estado para saber si el usuario ya inició sesión.
  // Empieza en 'false' para que lo primero en mostrarse sea el Login.
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Datos del usuario (opcional, por si quieres guardar su nombre)
  const [usuario, setUsuario] = useState(null);

  const handleLoginSubmit = (datos) => {
    console.log("Datos de login:", datos);
    setUsuario(datos);
    setIsLoggedIn(true); // Cambia el estado a verdadero para mostrar el catálogo
  };

  const handleGoogleLogin = () => {
    console.log("Accediendo con Google...");
    setIsLoggedIn(true);
  };

  return (
    <>
      {!isLoggedIn ? (
        // Si NO ha iniciado sesión, mostramos tu componente Login
        <Login 
          onSubmit={handleLoginSubmit} 
          onGoogle={handleGoogleLogin} 
        />
      ) : (
        // Si YA inició sesión, mostramos tu componente Catalogo
        <Catalogo />
      )}
    </>
  );
}