const { Worker, Job } = require('bullmq');


/**
 *
 * @param {Job} job
 */
async function processor(job) {
  // Aquí puedes realizar cualquier operación que necesites con los datos del trabajo
  // jobData contiene la información necesaria para ejecutar el trabajo

  // Por ejemplo, puedes imprimir los datos en la consola
  console.log('Trabajo recibido:', job);

  // Simula un retraso de 2 segundos antes de finalizar el trabajo
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Marca el trabajo como completado
  return { result: 'Trabajo completado' };
}

const connection = {
  host: 'localhost',
  port: 6379,
  password: 'password',
};

const worker = new Worker('Cryptographic Test', processor, connection);

console.log('Worker iniciado.');

worker.on('completed', (job) => {
  console.log('Trabajo completado:', job.id, job.returnvalue);
});

worker.run();

async function shutdown() {
  console.log("Received SIGTERM signal. Gracefully shutting down...");

  // Perform cleanup or shutdown operations here
  await worker.close();
  // Once cleanup is complete, exit the process
  process.exit(0);
}
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
