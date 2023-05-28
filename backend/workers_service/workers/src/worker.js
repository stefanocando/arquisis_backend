const { Worker, Job } = require('bullmq');
const crypto = require('crypto');
const axios = require('axios');

function calculateHash(deposit_token, challenge_id, secret) {
  const hashInput = `deposit_token=${deposit_token}&challenge_id=${challenge_id}&secret=${secret}`;
  return crypto.createHash('sha256').update(hashInput).digest('hex');
}

async function postMethod(job_result, url) {
  try {
    const response = await axios.post(url, job_result, {
      headers: {'Content-Type': 'application/json'}
    });
    console.log('Respuesta del servidor:', response.data);
  } catch (error) {
      console.error('Error al enviar la solución:', error);
  }
}

/**
 *
 * @param {Job} job
 */
async function processor(job) {
  console.log('Trabajo recibido:', job);
  const { deposit_token, challenges } = job.data;
  let secrets = [];
  for (const challenge of challenges) {
    const { challenge_id, challenge_hash } = challenge;

    let secret = 1;
    while (true) {
      const currentHash = await calculateHash(deposit_token, challenge_id, secret);
      if (currentHash === challenge_hash) {
        const solvedChallenge = {
          "challenge_id": challenge_id,
          "secret": secret
        }
        secrets.push(solvedChallenge);
        break;
      }
      secret++;

      if (secret > 500000) {
        console.log(`No se pudo encontrar el secret para el challenge_id ${challenge_id}`);
        break;
      }
    }
  }
  const solution = {
    "deposit_token": deposit_token,
    "challenges": secrets
  }
  return solution;
}

const connection = {
  host: 'redis',
  port: 6379,
  password: '12345678',
};

const worker = new Worker('Cryptographic Test', processor, {
  autorun: false,
  connection: connection,
});

console.log('Worker iniciado.');

worker.on('completed', (job) => {
  console.log('Trabajo completado:', job.id, job.returnvalue);
  const job_result = job.returnvalue;
  const url = 'https://api.legit.capital/v1/challenges/solution';

  postMethod(job_result, url);
});

worker.on("failed", (job, error) => {
  console.log(`Worker completed job ${job.id} with error ${error}`);
});

worker.on("error", (err) => {
  console.error(err);
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
