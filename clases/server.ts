import express from 'express';
import { SERVER_PORT } from '../global/enviroment';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/sockets';

export default class Server {
    private static _instance: Server;
    public app: express.Application;
    public port: number;

    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor(){
        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server( this.app );
        this.io = socketIO( this.httpServer );
        this.escucharSockets();
    }

    public static get instance(){
        return this._instance || ( this._instance = new this());
    }

    private escucharSockets(){
        console.log('Escuchado conexiones');

        this.io.on('connection', cliente => {
            //console.log('Cliente conectado');
            console.log(cliente.id);

            //conectarCliente
            socket.conectarCliente(cliente, this.io);

            //configurar Usuario
            socket.configurarUsuario(cliente, this.io);

            //mensajes
            socket.mensaje(cliente, this.io);

            //desconectar
            socket.desconectar(cliente, this.io);

            socket.obtenerUsuarios(cliente, this.io);

        });

    }

    start( callback: any ){
        this.httpServer.listen( this.port, callback );
    }
}