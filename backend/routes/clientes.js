var express = require('express');
var router = express.Router();

const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient({ errorFormat: 'minimal' });



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

/* PUT api/clientes/atualizar/5 => atualiza TODOS OS DADOS do cliente de id 5 */
router.patch('/atualizar/:id', /*authenticateToken,*/ async (req, res) => {

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
    console.log(exception)
    let error = exceptionHandler(exception)
    res.status(error.code).json({
      error: error.message
    })
  }

});

router.patch('/recarregar/:idcliente', /*authenticateToken,*/ async (req, res) => {
  const id = parseInt(req.params.idcliente)
  const dados = req.body

  const cliente = await prisma.cliente.update({
    data: {
      saldo: {increment: dados.valor}
    },
    where: {
      id: id
    }
  })

  res.json(cliente)
})

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


router.patch('/onibusComum', async (req, res) => {
  const codCartao = req.body.codCartao
  let tarifa = 5

  try {
    const cliente = await prisma.cliente.findUnique({
      where: {
        codCartao: codCartao
      }
    });

    if (cliente.tipoCarteirinha == 'Estudante' && cliente.contador < 2 || cliente.tipoCarteirinha == 'PCD' || cliente.tipoCarteirinha == 'Idoso') {
      tarifa = 0

      const novoCliente = await prisma.cliente.update({
        data: {
          contador: { increment: 1 },
          saldo: { decrement: tarifa }
          //não importa o cliente, podemos sempre aumentar o contador, já que só olharemos esta coluna quando conveniente
        },
        where: {
          codCartao: codCartao
        }
      });
      return res.status(200).json({
        message: "Prossiga",
        tipoCarteirinha: cliente.tipoCarteirinha,
        id: cliente.id
      })

    } else if (cliente.tipoCarteirinha == 'Empresas' && cliente.saldo > tarifa / 2) {                                    // Alteração da tarifa baseando-se no tipo do cartão
      tarifa = tarifa / 2

      const novoCliente = await prisma.cliente.update({
        data: {
          contador: { increment: 1 },
          saldo: { decrement: tarifa }
          //não importa o cliente, podemos sempre aumentar o contador, já que só olharemos esta coluna quando conveniente
        },
        where: {
          codCartao: codCartao
        }
      });

      return res.status(200).json({
        message: "Prossiga",
        tipoCarteirinha: cliente.tipoCarteirinha,
        id: cliente.id
      })
    }

    if (cliente.saldo < tarifa / 2 && cliente.tipoCarteirinha == 'Empresas'|| cliente.saldo < tarifa && cliente.tipoCarteirinha == 'Comum' ) {
      return res.status(400).json({
        error: "Saldo insuficiente",                                 // Se saldo for menor que a tarifa fornecida, um erro aparece
        id: cliente.id
      });
    }

    if (cliente.tipoCarteirinha == 'Estudante' && cliente.contador >= 2) {
      return res.status(400).json({
        error: "Limite de passagens atingido",                       // aqui, caso o cliente seja um estudante E já tenha 2 passagens, ele será barrado
        id: cliente.id
      });
    }

    const novoCliente = await prisma.cliente.update({
      data: {
        contador: { increment: 1 },
        saldo: { decrement: tarifa }
        //não importa o cliente, podemos sempre aumentar o contador, já que só olharemos esta coluna quando conveniente
      },
      where: {
        codCartao: codCartao
      }
    });

    delete novoCliente.senha  //deletando senha por motivos de segurança
    res.json(novoCliente)

  } catch (exception) {
    console.log(exception)
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
