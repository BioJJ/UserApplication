const fs = require('fs');
const jwt =  require('jsonwebtoken');

const authConfig = require('../config/auth');

const readFile = () =>{
    const content = fs.readFileSync('./data/users.json', 'utf8');
    return (JSON.parse(content));
}

const writeFile = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync('./data/users.json', stringifyData, 'utf8')
}

function generateToken(params= {}){
    return jwt.sign( params, authConfig.secret,{
        expiresIn: 86400,  
      });
}

//Listar
exports.get = (req, res, next) => {
    const content = readFile();

    res.send(content);

    //res.status(200).send('Requisição recebida com sucesso!');
};


exports.getById = (req, res, next) => {

    const {id} = req.params;

    const content = readFile();
    
    const findExist = content.findIndex((user) => user.id === id);

    if(!findExist)
        return res.status(400).send({error: true, msg: 'id is wrong -  invalid login'});

    const usuario_logado= content[findExist];    
    res.send(usuario_logado);

   // res.status(200).send('Requisição recebida com sucesso!');
};

exports.post = (req, res, next) => {

    const { username, password, fullname,age } = req.body

    const AtualFile = readFile();

    //verifique se os campos userData estão faltando
    if (username == null || password == null || fullname == null || age == null) {
        return res.status(401).send({error: true, msg: 'User data missing'})
    }

    //verifique se o nome de usuário já existe
    const findExist = AtualFile.find( user => user.username === username )
    if (findExist) {
        return res.status(409).send({error: true, msg: 'username already exist'})
    }
    //criar um id aleatorio
    const id = Math.random().toString(32).substr(2,6);
    AtualFile.push({ id, username, password, fullname,age })

    //cadastrar
    writeFile(AtualFile);
    res.send({success: true, msg: 'User data added successfully',id, username, password, fullname,age,
        token: generateToken({username: AtualFile.username}), });

    //res.status(201).send('Requisição recebida com sucesso!');
};


exports.put = (req, res, next) => {
    //let id = req.params.id;
    const {id} = req.params;

    const { username, password, fullname,age } = req.body;

    const AtualFile = readFile();
    //procurar por id
    const findExist = AtualFile.findIndex((user) => user.id === id);

    const { id: cId, username: cUsername, password: cPassword, fullname: cFullname, age: cAge } = AtualFile[findExist];

    //Objeto que recebe o array atualizado | caso não seja todo atualizado receberar os dados antigos
    const newUser ={
        id: cId,
        username: username ? username: cUsername,
        password: password ? password: cPassword,
        fullname: fullname ? fullname: cFullname,
        age: age ? age: cAge,
    }

    //setar os dados atualizados
    AtualFile[findExist] = newUser;
    writeFile(AtualFile);
    res.send({success: true, msg: 'User data updated successfully'})
    res.send(newUser);
    //res.status(201).send(`Requisição recebida com sucesso! ${id}`);
};

exports.delete = (req, res, next) => {
    //let id = req.params.id;

    const {id} =  req.params;

    const AtualFile = readFile();

    //procurar por id
    const findExist = AtualFile.findIndex((user) => user.id === id)

    AtualFile.splice(findExist, 1);
    writeFile(AtualFile);

    res.send(AtualFile);
    res.send({success: true, msg: 'User removed successfully'})
   // res.status(200).send(`Requisição recebida com sucesso! ${id}`);
};

exports.autenticar = (req, res, next) =>{
    const{username, password} = req.body;

        const AtualFile = readFile();
    
        //verifique se o nome de usuário já existe
        const findExist = AtualFile.find( user => user.username === username && user.password === password);
    
        if(!findExist)
            return res.status(400).send({error: true, msg: 'username or password is wrong -  invalid login'});
        
            res.send({ findExist,
            token: generateToken({username: findExist.username}),
            });
}