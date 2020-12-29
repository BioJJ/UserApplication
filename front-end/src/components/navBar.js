import React from 'react';
import NavbarItem from './navBarItem';


import { AuthConsumer } from '../main/provedorAutenticacao'



function NavBar(props) {
    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
            <div className="container">
                <a href="https://github.com/BioJJ" className="navbar-brand">User Manager</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav">
                        <NavbarItem render={props.isUsuarioAutenticado} href="#/home" label="Home" />
                        <NavbarItem render={props.isUsuarioAutenticado} href="#/cadastrousuario" label="Usuarios" />
                        <NavbarItem render={props.isUsuarioAutenticado} onClick={props.deslogar} href="#/login" label="Sair" />
                    </ul>

                </div>
            </div>
        </div>
    )
}

export default () => (
    <AuthConsumer>
      {(context) => (
          <NavBar isUsuarioAutenticado={context.isAutenticado} deslogar={context.encerrarSessao} />
      )}
    </AuthConsumer>
  )