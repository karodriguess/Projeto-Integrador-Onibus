const express = require('express');
const multer = require('multer');
const app = express();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')  // O diretório onde os arquivos serão armazenados
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)  // Nome do arquivo no servidor
    }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('foto'), (req, res) => {
    // Aqui você pode acessar o arquivo enviado através de req.file
    res.send('Upload de foto bem-sucedido!');
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
