var express = require('express');
var router = express.Router();

const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient({errorFormat: 'minimal'});

function exceptionHandler(e) {
  let error = {
    code: 500,
    message: 'internal server error'
  }
  
  if (
    e instanceof Prisma.PrismaClientKnownRequestError ||
    e instanceof Prisma.PrismaClientValidationError
  ) {
    error.code = 400;
    error.message = e.message
  }

  return error
}

/* GET api/linhas => lista todas as linhas */
router.get('/', async (req, res) => {
  try {
    
    const linhas = await prisma.linha.findMany();
    res.status(200).json(linhas)

  } catch (exception) {
    let error = exceptionHandler(exception)
    res.status(error.code).json({
      error: error.message
    })
  }
});

/* GET api/linhas/3 => mostra apenas a linha de id 3 */
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id

    const linha = await prisma.linha.findUnique({
      where: {
        id: id
      }
    });
    res.status(200).json(linha)

  } catch (exception) {
    let error = exceptionHandler(exception)
    res.status(error.code).json({
      error: error.message
    })
  }
});

/* POST api/linhas/cadastrar => cadastra uma linha */
router.post('/cadastrar', async (req, res) => {

  try {

    const dados = req.body

    const linha = await prisma.linha.create({
      data: dados
    })
    res.status(200).json(linha)

  } catch (exception) {
    let error = exceptionHandler(exception)
    res.status(error.code).json({
      error: error.message
    })
  }
  
});

/* PUT api/linhas/atualizar/5 => atualiza TODOS OS DADOS da linha de id 5 */
router.put('/atualizar/:id', async (req, res) => {
  
  try {
    const id = req.params.id
    const dados = req.body

    const linha = await prisma.linha.update({
      data: dados,
      where: {
        id: id
      }
    })
    res.status(200).json(linha)

  } catch (exception) {
    let error = exceptionHandler(exception)
    res.status(error.code).json({
      error: error.message
    })
  }

});

/* delete api/linhas/deletar/6 => deleta a linha de id 6 */
router.delete('/deletar/:id', async (req, res) => {
  try {
    const id = req.params.id

    const linha = await prisma.linha.delete({
      where: {
        id: id
      }
    })
    res.status(200).json(linha)

  } catch (exception) {
    let error = exceptionHandler(exception)
    res.status(error.code).json({
      error: error.message
    })
  }
});

// resposta pra rotas nao existentes
router.all('*', (req, res) => { 
  res.status(501).end()                     // codigo 501 = rota nao implementada
});

module.exports = router;
