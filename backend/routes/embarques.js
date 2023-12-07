const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Rota para cadastrar embarque
router.post('/cadastrar', async (req, res, next) => {
  const clienteId = Number(req.body.clienteId);
  const valorDaPassagem = 5;  // Valor padrão da passagem

  try {
    // Use uma transação Prisma para garantir atomicidade
    const novoEmbarque = await prisma.$transaction(async (prisma) => {
      // Consulte a tabela cliente para obter informações sobre a isenção e o saldo
      const cliente = await prisma.cliente.findUnique({
        where: { id: clienteId },
      });

      // Verifique se o cliente existe
      if (!cliente) {
        throw new Error('Cliente não encontrado');
      }

      // Verifique se o cliente tem saldo suficiente
      if (cliente.isencao !== 1 && cliente.saldo < valorDaPassagem) {
        throw new Error('Saldo insuficiente');
      }

      // Execute a inserção no banco de dados usando Prisma
      const embarque = await prisma.embarque.create({
        data: {
          cliente_id: clienteId,
          horario: new Date(),
        },
      });

      // Atualize o saldo do cliente se necessário usando decrement
      if (cliente.isencao !== 1) {
        await prisma.cliente.update({
          where: { id: clienteId },
          data: {
            saldo: {
              decrement: valorDaPassagem,
            },
          },
        });
      }

      return embarque;
    });

    // Envie uma resposta de sucesso
    res.status(201).json({ message: 'Embarque cadastrado com sucesso!', embarque: novoEmbarque });
  } catch (error) {
    console.error('Erro ao cadastrar embarque:', error);
    if (error.message === 'Cliente não encontrado') {
      res.status(404).json({ error: 'Cliente não encontrado' });
    } else if (error.message === 'Saldo insuficiente') {
      res.status(402).json({ error: 'Saldo insuficiente' }); // 402 Payment Required
    } else {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  } 
});

module.exports = router;
