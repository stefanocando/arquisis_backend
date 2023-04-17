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
  console.log('Connected');
  client.subscribe('events/chile', () => {
    console.log(`Subscribe to topic`);
  });
});

client.on('message', async (topic, payload) => {
  let info = JSON.parse(payload);
  try {
    const response = await axios.post(
      'http://Server:8080/events',
      {
        info,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
});

module.exports = client;
