import React from 'react';

import Card from '../components/card';
import FormGroup from '../components/FormGroup';

import UsuarioService from '../app/service/usuarioService';
import { mensagemSucesso, mensagemErro } from '../components/toastr';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

import LocalStorageService from '../app/service/LocalStorageService';

class AtualizarUsuario extends React.Component{

         
    state = {
        id: '',
        nome : '',
        username: '', 
        age: '',
        senha: '',
        senhaRepeticao : '',
        showConfirmDialog: false,
       
       // usuario: []
    }

    componentDidMount(){

        const usuario_logado = LocalStorageService.obterItem('_usuario_logado')
        
        this.service.UsuarioLogado(usuario_logado.findExist.id)
             .then(response => {
               //  console.log(response.data.id)
              // this.setState({usuario: response.data})
                this.setState({id: usuario_logado.findExist.id});
                this.setState({nome: usuario_logado.findExist.fullname});
                this.setState({username: usuario_logado.findExist.username});
                this.setState({age: usuario_logado.findExist.age});
                this.setState({senha: usuario_logado.findExist.password});
                this.setState({senhaRepeticao: usuario_logado.findExist.password});
             }).catch(error =>{
                 console.log(error.data)
             })
    
        
} 

    constructor(){
        super();
        this.service = new UsuarioService();

    }
    
    validar(){
        const msgs =[];

        if(!this.state.nome){
            msgs.push("O campo Nome é obrigatório.")
        }
        else if(!this.state.username){
            msgs.push("O campo username é obrigatório.")
        }
        else if(!this.state.age){
            msgs.push("O campo Age é obrigatório.")
        }
        if(!this.state.senha || !this.state.senhaRepeticao){
            msgs.push('Digite a senha 2x.')

        }else if( this.state.senha !== this.state.senhaRepeticao ){
            msgs.push('As senhas não batem.')
        }     

        return msgs;
    }

    atualizar = () => {

        const usuario = {
            id: this.state.id,
            fullname: this.state.nome,
            username: this.state.username,
            age: this.state.age,
            password: this.state.senha
        }

        try{
            this.service.validar(usuario);
        }catch(erro){
            const msgs = erro.mensagens;
            msgs.forEach(msg => mensagemErro(msg));
            return false;
        }

        this.service.atualizar(usuario)
        .then( response => {
          // console.log(response.data);
           //LocalStorageService.adicionarItem('_usuario_logado', response.data);
            mensagemSucesso('Dados atualizados!')
            this.props.history.push('/home')
        }).catch(error => {
            mensagemErro(error.response.data)
        })

        console.log(this.state);

    }

    cancelar = () => {
        this.props.history.push('/home')
    }

    abrirConfirmacao = () => {
        this.setState({ showConfirmDialog : true })
    }
    cancelarDelecao = () => {
        this.setState({ showConfirmDialog : false })
    }

    deletar = () => {
        this.service
            .deletar(this.state.id)
            .then(response => {
                mensagemSucesso('Conta deletado com sucesso!')
                this.props.history.push('/login')
            }).catch(error => {
                mensagemErro('Ocorreu um erro ao tentar deletar a conta')
            })
    }

    render(){

        const footer = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} />
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} />
            </div>
        );
        return(

                <Card title="Atualizar dados">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                        <FormGroup label="Nome: *" htmlFor="inputNome">
                                <input type="text" 
                                       value={this.state.nome}
                                       id="inputNome" 
                                       className="form-control"
                                       name="nome"
                                       onChange={e => this.setState({nome: e.target.value})} />
                            </FormGroup>

                            <FormGroup label="Username: *" htmlFor="username">
                                <input type="text" 
                                value={this.state.username}
                                       id="username"
                                       className="form-control"
                                       name="username"
                                       onChange={e => this.setState({username: e.target.value})} />
                            </FormGroup>

                            <FormGroup label="Age: *" htmlFor="age">
                                <input type="text" 
                                        value={this.state.age}
                                       id="age"
                                       className="form-control"
                                       name="age"
                                       onChange={e => this.setState({age: e.target.value})} />
                            </FormGroup>

                            <FormGroup label="Senha: *" htmlFor="inputSenha">
                                <input type="password" 
                                value={this.state.senha}
                                       id="inputSenha"
                                       className="form-control"
                                       name="senha"
                                       onChange={e => this.setState({senha: e.target.value})} />
                            </FormGroup>

                            <FormGroup label="Repita a Senha: *" htmlFor="inputRepitaSenha">
                                <input type="password" 
                                value={this.state.senhaRepeticao}
                                       id="inputRepitaSenha"
                                       className="form-control"
                                       name="senha"
                                       onChange={e => this.setState({senhaRepeticao: e.target.value})} />
                            </FormGroup>

                            <button onClick={this.atualizar} type="button" className="btn btn-success">
                                <i className="pi pi-refresh"></i> Atualizar
                            </button>
                            <button  onClick={this.cancelar} type="button" className="btn btn-danger">
                                <i className="pi pi-times"></i> Cancelar
                            </button>
                            <button  onClick={this.abrirConfirmacao} type="button" className="btn btn-warning">
                                <i className="pi pi-power-off"></i> Deletar conta
                            </button>
                            
                        </div>
                    </div>
                </div>

                <div>
                <Dialog header="Apagar conta"
                        visible={this.state.showConfirmDialog} 
                        style={{ width: '50vw' }} 
                        modal={true}
                        footer={footer} 
                        onHide={() => this.setState({showConfirmDialog: false})}
                        >
                    Confirma a exclusão da sua conta?
                </Dialog>

                </div>
                </Card>
           
        )
    }
}

export default AtualizarUsuario;