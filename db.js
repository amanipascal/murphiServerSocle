const mongoose = require("mongoose");
const User = require('./models/User.model')
const connection = async () => {
    const url = process.env.DB_URL || "";

    try {
        // connection à mongodb / { autoIndex: true } {useNewUrlParser: true,  useUnifiedTopology: true} deprecated
        await mongoose.connect(url,)
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
    //recuperation de la connection
    const dbConnection = mongoose.connection;

    //ecoute sur l'evenement open. si la connection se passe bien
    dbConnection.once("open", (_) => {
        console.log(`Connected successfully to the mongodb database`);
    });
     //ecoute sur l'evenement error. si la connection echou (erreur)
    dbConnection.on("error", (err) => {
        console.error(`connection error: ${err}`);
    });
    // User.create({name: "amani", email: "pangues@gmail.com", password: "murphi"}).then(data => {
    //     console.log('Created data: ', data)
    // })
    return;
}

module.exports = connection;