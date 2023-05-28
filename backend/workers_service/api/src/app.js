const express = require('express');
const { Queue } = require('bullmq');
const { createBullBoard } = require("@bull-board/api");
const { BullMQAdapter } = require("@bull-board/api/bullMQAdapter");
const { ExpressAdapter } = require("@bull-board/express");

const app = express();
const queue = new Queue('Cryptographic Test', {
  connection: {
    host: 'redis',
    port: 6379,
    password: '12345678',
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

app.post('/job', async (req, res) => {
  try {
    const jobData = req.body;
    const job = await queue.add('challenge', jobData);
    res.json({ id: job.id });
  } catch (error) {
    console.error('Error al crear el trabajo:', error);
    res.sendStatus(500);
  }
});

app.get('/job/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const job = await queue.getJob(id);
    res.json({ job_result: job.returnvalue });
  } catch (error) {
    console.error('Error al obtener el trabajo:', error);
    res.sendStatus(500);
  }
});

app.get('/heartbeat', (req, res) => {
  res.json({ status: true });
});

app.listen(3000, () => {
  console.log('Servidor escuchando en puerto 3000');
});
