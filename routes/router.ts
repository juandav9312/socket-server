import {Router, Response, Request} from 'express';
import Server from '../clases/server';

const router = Router();
const server = Server.instance;

router.get('/mensajes', (req: Request, res: Response) => {
    res.json({
        ok: true,
        mensaje: 'esta bien'
    })
});

router.post('/mensajes', (req: Request, res: Response) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    const payload = {
        de: de,
        cuerpo: cuerpo
    }

    server.io.emit('mensaje-nuevo', payload);
    
    res.json({
        ok: true,
        mensaje: cuerpo,
        de: de
    })
});

router.post('/mensajes/:id', (req: Request, res: Response) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    

    const payload = {
        de: de,
        cuerpo: cuerpo
    }

    server.io.in(id).emit('mensaje-privado', payload);

    res.json({
        ok: true,
        mensaje: cuerpo,
        de: de,
        id: id
    })
});

export default router;