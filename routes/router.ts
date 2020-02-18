import {Router, Response, Request} from 'express';
import Server from '../clases/server';
import { usuariosConectados } from '../sockets/sockets';

const router = Router();
const server = Server.instance;

//obtenerusuarios
router.get('/usuarios', (req: Request, res: Response) => {

    server.io.clients( (err: any, clientes: string[]) => {
        if(err){
            return res.json({
                ok: false,
                err
            })
        }

        return res.json({
            ok: true,
            clientes
        })

    })

});


//obtener usuario detalle
router.get('/detalle', (req: Request, res: Response) => {


        return res.json({
            ok: true,
            clientes: usuariosConectados.getLista()
        })

    

});


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