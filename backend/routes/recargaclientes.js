const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Rota para recarregar saldo do cliente
router.post("/recarregar-saldo", async (req, res) => {
  const clienteId = Number(req.body.clienteId);
  const valorRecarga = Number(req.body.valorRecarga);

  try {
    // Use o método "increment" do Prisma para recarregar o saldo diretamente no banco de dados
    const clienteAtualizado = await prisma.cliente.update({
      where: { id: clienteId },
      data: {
        saldo: {
          increment: valorRecarga,
        },
      },
    });

    // Envie uma resposta de sucesso
    res
      .status(200)
      .json({
        message: "Saldo recarregado com sucesso!",
        cliente: clienteAtualizado,
      });
  } catch (error) {
    console.error("Erro ao recarregar saldo:", error);
    if (error.code === "P2025") {
      // Código de erro específico para cliente não encontrado
      res.status(404).json({ error: "Cliente não encontrado" });
    } else {
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
});

module.exports = router;
