const express = require('express');
const { Queue } = require('bullmq');
const { createBullBoard } = require("@bull-board/api");
const { BullMQAdapter } = require("@bull-board/api/bullMQAdapter");
const { ExpressAdapter } = require("@bull-board/express");

const app = express();
const queue = new Queue('Cryptographic Test', {
  connection: {
    host: 'localhost',
    port: 6379,
    password: 'password',
  },
});

app.use(express.json());

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
  queues: [new BullMQAdapter(queue)],
  serverAdapter: serverAdapter,
});

app.use('/admin/queues', serverAdapter.getRouter());

app.post('/jobs', async (req, res) => {
  try {
    const jobData = req.body;

    // Agrega el trabajo a la cola
    const job = await queue.add('challenge', jobData.data);
    // Envía una respuesta de éxito
    res.sendStatus(200);
  } catch (error) {
    console.error('Error al crear el trabajo:', error);
    res.sendStatus(500);
  }
});

// Inicia el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor escuchando en puerto 3000');
});
