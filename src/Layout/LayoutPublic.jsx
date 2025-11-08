import React from 'react'
import { Outlet, useNavigation, useLocation } from 'react-router-dom'
import NavBar from '../components/NavBar'
import './LayoutPublic.css';

const LayoutPublic = () => {
  const navigation = useNavigation();
  const location = useLocation();

  // Detectar si la ruta actual es la raíz "/"
  const esInicio = location.pathname === "/";

  return (
    <>
      {/* Mostrar NavBar solo si no estamos en la pantalla de inicio */}
      {!esInicio && <NavBar />}

      <main className="container my-4">
        {navigation.state === "loading" && (
          <div className="alert alert-info text-center my-5">
            Cargando información...
          </div>
        )}
        <Outlet />
      </main>

      {/* Mostrar footer solo si no estamos en inicio */}
      {!esInicio && (
        <footer className="footer-utl text-center py-3 mt-auto">
        <p className="mb-0 text-white small">
            © 2025 Congreso TIC’s — Universidad Tecnológica de León <br />
            <span className="fw-light">Ser, saber, hacer</span>
        </p>
        </footer>
      )}
    </>
  )
}

export default LayoutPublic

