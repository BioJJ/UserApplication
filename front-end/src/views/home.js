import React from 'react';

import UsuarioService from '../app/service/usuarioService';
import LocalStorageService from '../app/service/LocalStorageService';

class Home extends React.Component {

    state = {
        usuario: []
    }

    constructor(){
        super();
        this.service =  new UsuarioService();
    }

    componentDidMount(){

       const usuario_logado = LocalStorageService.obterItem('_usuario_logado')
      // console.log(usuario_logado.findExist);
       
       this.service.UsuarioLogado(usuario_logado.findExist.id)
            .then(response => {
                console.log("autenticado: ", response.data)
                this.setState({usuario: response.data})
            }).catch(error =>{
                console.log(error.data)
            })
    }
    render() {
        return (
            <div className="jumbotron">
                <h1 className="display-3">Bem vindo! - {this.state.usuario.fullname}</h1>
                <p className="lead">Esse é seu sistema de gerenciamento.</p>
                {/* <p className="lead">Seu saldo para o mês atual é de R$ 5.325,21</p> */}
                <hr className="my-4"/>
                    <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                    <p className="lead">
                        <a className="btn btn-primary btn-lg" href="#/cadastrousuario" role="button">
                           <i className="pi pi-user-plus"></i>  Cadastrar Usuário</a>
                        <a className="btn btn-danger btn-lg" href="#/atualizarusuario" role="button">
                            <i  className="pi pi-user-edit"></i> Atualizar dados</a>
                    </p>
            </div>
        )
    }
}

export default Home;