const http = require("http"); /*Import du pakage http*/
const app = require("./app"); /*Import de la méthode EXPRESS stokée dans la constante app*/

const normalizePort = val =>{
    const port = parseInt(val, 10);
    if(isNaN(port)){
        return val;
    }
    if(port >= 0){
        return port;
    }else{
        return false;
    }
    
};

const port = normalizePort(process.env.PORT || "3000"); /*Ecoute de l'environnement utilisé sinon c'est le port 3000 qui est écouté par défaut*/
app.set("port", port);

const errorHandler = error =>{
    if(error.syscall != "listen"){
        throw error;
    }
    const address = server.address();
    const bind = typeof address === "string" ? "pipe" + address : "port" + port;
    switch(error.code) {
        case "EACCES":
            console.error(bind + "requires elevated privileges.");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + "is already in use.");
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const server = http.createServer(app); /* constante contenant le résulat de la requête http traitée par EXPRESS*/

server.on("error", errorHandler);
server.on("listening", ()=>{
    const address = server.address();
    const bind = typeof address === "string" ? "pipe" + address : " port " + port;
    console.log("Linstening on" + bind);
});


server.listen(process.env.PORT || 3000); /* Le server utilise le port local ou le port 3000 par défaut*/


app.set("port", process.env.PORT || 3000); /*L'application utilise le port local ou le port 3000 par défaut*/

