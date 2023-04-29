const mqtt = require('mqtt');
const axios = require('axios');
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

const connectUrl = `mqtt://passline.iic2173.net:9000`;
const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: 'students',
  password: 'iic2173-2023-1-students',
  reconnectPeriod: 1000,
});

client.on('connect', () => {
    console.log('Connected to the broker');
  client.subscribe('events/requests', () => {
    console.log(`Subscribe to topic requests`);
  });
});

client.on('message', async (topic, payload) => {
  let info = JSON.parse(payload);
  try {
    const response = await axios.post(
      'http://Server:8080/request',
      {
        info,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
});