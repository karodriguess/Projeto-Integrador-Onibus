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

/* GET api/clientes => lista todos os clientes */
router.get('/', async (req, res) => {
  try {
    
    const clientes = await prisma.cliente.findMany();
    res.status(200).json(clientes)

  } catch (exception) {
    console.log(exception.message)
    console.log(exception)
    let error = exceptionHandler(exception)
    res.status(error.code).json({
      error: error.message
    })
  }
});

/* GET api/clientes/3 => mostra apenas o cliente de id 3 */
router.get('/:id', async (req, res) => {
  try {
    
    const id = parseInt(req.params.id)

    const cliente = await prisma.cliente.findUnique({
      where: {
        id: id
      },
      select: {
        senha: false,
        nomeCompleto: true,
        cpf: true,
        email: true,
        nascimento: true,
        numeroTel: true,
        tipoCarteirinha: true,
        saldo: true
      }
    });
    res.status(200).json(cliente)

  } catch (exception) {
    let error = exceptionHandler(exception)
    res.status(error.code).json({
      error: error.message
    })
  }
});

/* POST api/clientes/cadastrar => cadastra um cliente */
router.post('/cadastrar', async (req, res) => {

  try {

    const dados = req.body
    console.log(req.body)

    const cliente = await prisma.cliente.create({
      data: dados
    })
    console.log(cliente)
    res.status(200).json(cliente)

  } catch (exception) {
    console.log(exception.message)
    console.log(exception)
    let error = exceptionHandler(exception)
    res.status(error.code).json({
      error: error.message
    })
  }
  
});

/* PUT api/clientes/atualizar/5 => atualiza TODOS OS DADOS do cliente de id 5 */
router.patch('/atualizar/:id', async (req, res) => {
  
  try {
    const id = parseInt(req.params.id)
    const dados = req.body

    const cliente = await prisma.cliente.update({
      data: dados,
      where: {
        id: id
      }
    })
    res.status(200).json(cliente)

  } catch (exception) {
    let error = exceptionHandler(exception)
    res.status(error.code).json({
      error: error.message
    })
  }

});

/* delete api/clientes/deletar/6 => deleta o cliente de id 6 */
router.delete('/deletar/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)

    const cliente = await prisma.cliente.delete({
      where: {
        id: id
      }
    })
    res.status(200).json(cliente)

  } catch (exception) {
    let error = exceptionHandler(exception)
    res.status(error.code).json({
      error: error.message
    })
  }
});

//              RELACIONAMENTO CLIENTE E VIAGEM

// GET /api/clientes/2/viagens => pega todas as viagens que o cliente de id 2 já embarcou
router.get('/:id/viagens', async (req, res) => {
  try {
    const id = parseInt(req.params.id)

    const clienteViagem = await prisma.viagemHasCliente.findMany({
      where: {
        cliente_id: id
      }
    });
    res.status(200).json(clienteViagem)

  } catch (exception) {
    let error = exceptionHandler(exception)
    res.status(error.code).json({
      error: error.message
    })
  }
})

// resposta pra rotas nao existentes
router.all('*', (req, res) => { 
  res.status(501).end()                     // codigo 501 = rota nao implementada
});

module.exports = router;
