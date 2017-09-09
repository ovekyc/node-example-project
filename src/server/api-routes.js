import express from 'express';
import Controller from './controllers/controller';
const router = express.Router();

router.get('/', Controller.get);

export default router;
