const server = require('./src/server');
const PORT = process.env.PORT || 3001;

server.listen(PORT, () =>
{
  console.log(`Servidor corriendo en el puerto:${PORT}`);
});