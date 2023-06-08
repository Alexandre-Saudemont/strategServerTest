import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes';
import db from './models';
import dbConfig from './config/db.config';
import cors from 'cors';

// dotenv
dotenv.config();

const app = express();

// Configuration de cors
app.use(cors('*'));

// Configuration du Json
app.use(express.json());
app.use(express.urlencoded({extended: true}));

userRoutes(app);

app.get('/', (req, res) => {
	res.send('Bienvenue sur le serveur');
});

// Connection a la database mongo
db.mongoose
	.connect(`${dbConfig.DATABASE}`, {})
	.then((response) => {
		console.log('Connexion à MongoDB réussie');
	})
	.catch((error) => {
		console.error('Erreur de connexion à MongoDB :', error);
	});

// app listener
const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Serveur lancé sur le port ${port}`);
});
