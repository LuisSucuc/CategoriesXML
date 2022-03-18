import React from 'react'
import { Link } from "react-router-dom";

const NoMatch = () => {
  return (
      <div>
          <h2>Página no encontrada</h2>
          <p>
              <Link to="/categories">Ir a categorías</Link>
          </p>
      </div>
  )
}

export default NoMatch