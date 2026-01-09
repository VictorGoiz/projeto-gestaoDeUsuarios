const db = require('../config/db')

// controller responsavel por listagem dos usuarios
exports.listarUsuarios = async (req,res) =>{

  try{
    const [usuarios] = await db.query(`
        SELECT id, nome, email, adm,
        DATE_FORMAT(dataCadastro, '%d/%m/%Y') AS dataCadastro
        FROM usuarios
    `);
    res.json(usuarios);
  }catch(err){
    console.error(err)
    res.status(500).json({ erro: 'Erro ao buscar usuários' });
  }

};
// controller para inserir usuario novo no banco
exports.cadastrarUsuarios = async (req,res) =>{
    try {
    const { nome, email, senha, admin } = req.body;
      console.log('passou por aqui')
    await db.query(
      'INSERT INTO usuarios (nome, email, senha, adm) VALUES (?, ?, ?, ?)',
      [nome, email, senha, admin ? 1 : 0]
    );

    res.status(201).json({ mensagem: 'Usuário criado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao criar usuário' });
  }

};

// controller responsavel por atualizar as informaçoes
exports.atualizarUsuarios = async (req,res) =>{

    const { nome, email, admin } = req.body;

    const [result] = await db.query(
        'UPDATE usuarios SET nome=?, email=?, adm=? WHERE id=?',
        [nome, email, admin ? 1 : 0, req.params.id]
    );

    if (!result.affectedRows) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    res.json({ mensagem: 'Usuário atualizado' });


};
// controller responsavel por deletar os usuarios

