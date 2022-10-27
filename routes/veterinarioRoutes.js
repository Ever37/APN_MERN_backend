import express from 'express';
import {
  actualizarPassword, actualizarPerfil, autenticar, comprobarToken, confirmar, nuevoPassword, olvidePassword, perfil,
  registrar
} from '../controllers/veterinarioController.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

// Area publica
router.post('/', registrar);
router.get('/confirmar/:token', confirmar);
router.post('/login', autenticar);
router.post('/olvide-password', olvidePassword);
// router.get('/olvide-password/:token', comprobarToken);
// router.post('/olvide-password/:token', nuevoPassword);
// Same
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword)

// Area privada
router.get('/perfil', checkAuth, perfil);
router.put('/perfil/:id', checkAuth, actualizarPerfil);
router.put('/actualizar-password', checkAuth, actualizarPassword);

export default router;
