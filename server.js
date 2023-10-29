const http = require ("http"); // Import du package http d'Express
const app = require ("./app"); // Import de l'application app
const dotenv = require("dotenv").config(); // Import du package dotenv pour utiliser les varaibles d'environement
const server = http.createServer(app);// Création du server avec la méthode CreateServer qui sera appelée à chaque requete

// Paramétrage du port avec la méthode set()
const normalizePort = val =>{
    const port = parseInt(val, 10);
        if(isNaN(port)){
            return val;
        }
        if(port >=0){
            return port;
        }
        return false;
};

const port = normalizePort(process.env.PORT|| "3000");
app.set('port', port);

const errorHandler = error =>{
    if(error.syscall !== "listen"){
        throw Error; 
    }
    const adress = server.address();
    const bind = typeof adress === "string" ?"pipe"+adress : "port: " + port;
    switch(error.code){
        case "EACCES":
            console.error(bind + "requete priviligiée");
            process.exit(1);
            break;
        case "EADDRINUSE" : 
            console.error(bind+" est prêt pour être utilisé");
            process.exit(1);
            break;
            default:
                throw error;
    }
};

app.set("port", process.env.PORT);
server.listen(process.env.PORT ||3000);
console.log("Le serveur fonctione");