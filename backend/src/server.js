const app = require('./app');
const { port, nodeEnv } = require('./config');

app.listen(port, () => {
  console.log(`KPCT API listening on http://localhost:${port} (${nodeEnv})`);
});
