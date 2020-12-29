import ApiService from '../apiservices';

import ErroValidacao from '../exception/ErroValidacao'

class UsuarioService extends ApiService{

    constructor(){
        super('/user');
    }

    autenticar(credenciais){
        return this.post('/authenticate', credenciais);
    }

    UsuarioLogado(id){
        return this.get(`/${id}`);
    }

    salvar(usuario){
        return this.post('/', usuario);
    }

    atualizar(usuario){
        return this.put(`/${usuario.id}`, usuario);
    }

    deletar(id){
        return this.delete(`/${id}`)
    }

    validar(usuario){

        const erros =[];

        if(!usuario.nome){
            erros.push("O campo Nome é obrigatório.")
        }
        else if(!usuario.username){
            erros.push("O campo username é obrigatório.")
        }
        else if(!usuario.age){
            erros.push("O campo Age é obrigatório.")
        }
        if(!usuario.senha || !usuario.senhaRepeticao){
            erros.push('Digite a senha 2x.')

        }else if( usuario.senha !== usuario.senhaRepeticao ){
            erros.push('As senhas não batem.')
        }     

        if(erros && erros.length > 0){
            throw new ErroValidacao(erros);
        }
    }

}
export default UsuarioService;