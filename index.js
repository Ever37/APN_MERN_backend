import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import conectarDB from './config/db.js';
import pacienteRoutes from './routes/pacienteRoutes.js';
import veterinarioRoutes from './routes/veterinarioRoutes.js';

const app = express();

app.use(express.json());

dotenv.config();

conectarDB();

const dominiosPermitidos = ["http://localhost:4000", "http://localhost:3000", process.env.FRONTEND_URL];

const corsOptions = {
  origin: function(origin, callback) {
    if (dominiosPermitidos.indexOf(origin) !== -1) {
      // El Origen del request está permitido
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  }
};

app.use(cors(corsOptions));

app.use('/api/veterinarios', veterinarioRoutes);
app.use('/api/pacientes', pacienteRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});