import Autor from "../models/Autor";

const getAll = async (req, res) => {
  try {
    const autores = await Autor.findAll();
    return res.status(200).send(autores);
  } catch (error) {
    return res.status(500).send({
      message: error.message
    })
  }
}

const getById = async (req, res) => {
  try {
    let { id } = req.params;

    //garante que o id só vai ter NUMEROS;
    id = id.replace(/\D/g, '');
    if (!id) {
      return res.status(400).send({
        message: 'Informe um id válido para consulta'
      });
    }

    let autor = await Autor.findOne({
      where: {
        id
      }
    });

    if (!autor) {
      return res.status(400).send({
        message: `Não foi encontrado autor com o id ${id}`
      });
    }

    return res.status(200).send(autor);
  } catch (error) {
    return res.status(500).send({
      message: error.message
    })
  }
}

const persistir = async (req, res) => {
  try {
    let { id } = req.params;
    //caso nao tenha id, cria um novo registro
    if (!id) {
      return await create(req.body, res)
    }   

    return await update(id, req.body, res)
  } catch (error) {
    return res.status(500).send({
      message: error.message
    })
  }
}

const create = async (dados, res) => {
  let { nome, email } = dados;

  let autorExiste = await Autor.findOne({
    where: {
        email,
    }
  });

  if (autorExiste) {
    return res.status(400).send({
      message: 'Já existe um autor cadastrada com esse nome'
    })
  }

  let autor = await Autor.create({
    nome,
    email,
  });
  return res.status(201).send(autor)
}

const update = async (id, dados, res) => {
  let { nome, email } = dados;
  let autor = await Autor.findOne({
    where: {
      id
    }
  });

  if (!autor) {
    return res.status(400).send({ type: 'error', message: `Não foi encontrada autor com o id ${id}` })
  }

  //TODO: desenvolver uma lógica pra validar todos os campos
  //que vieram para atualizar e entao atualizar
 Object.keys(dados).forEach(field => autor[field] = dados[field]);

  await autor.save();
  return res.status(200).send({
    message: `Dados do autor ${dados.nome} atualizado com sucesso`,
    data: autor
  });
}

const deletar = async (req, res) => {
  try {
    let { id } = req.body;
    //garante que o id só vai ter NUMEROS;
    id = id ? id.toString().replace(/\D/g, '') : null;
    if (!id) {
      return res.status(400).send({
        message: 'Informe um id válido para deletar o autor'
      });
    }

    let autor = await Autor.findOne({
      where: {
        id
      }
    });

    if (!autor) {
      return res.status(400).send({ message: `Não foi encontrado autor com o id ${id}` })
    }

    await autor.destroy();
    return res.status(200).send({
      message: `Autor com id ${id} deletado com sucesso`
    })
  } catch (error) {
    return res.status(500).send({
      message: error.message
    })
  }
}

export default {
  getAll,
  getById,
  persistir,
  deletar
};