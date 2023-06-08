import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
require('dotenv').config();
import jwt from 'jsonwebtoken';

const controller = {
	// Récupération de tous les utilisateurs
	getAll: async (req, res) => {
		try {
			const allUsers = await User.find();
			return res.status(200).json(allUsers);
		} catch (error) {
			console.error(`Erreur lors de la récupération des utilisateurs : ${error}`);
			return res.status(500).json({error: 'Erreur lors de la récupération des utilisateurs'});
		}
	},

	// Création d'un utilisateur
	createUser: async (req, res) => {
		try {
			const {email, password} = req.body;
			const userCheckEmail = await User.findOne({email: email.toLowerCase()});
			if (userCheckEmail) {
				return res.status(401).json('Email existant, veuillez en saisir un autre');
			}

			const hashedPassword = await bcrypt.hash(password, 10);

			const newUser = new User({
				email: email.toLowerCase(),
				password: hashedPassword,
			});

			await newUser.save();

			res.status(201).json('Compte créé avec succès !');
		} catch (error) {
			console.error(`Erreur lors de l'enregistrement de l'utilisateur :`, error);
			res.status(500).json('Erreur lors de la création du compte');
		}
	},

	// Connection d'un utilisateur
	login: async (req, res) => {
		try {
			const {email} = req.body;

			const getUser = await User.findOne({
				email: email.toLowerCase(),
			});

			if (!getUser) {
				return res.status(401).json({
					error: 'Identifiant invalide',
				});
			}

			if (getUser) {
				const checkPassword = await bcrypt.compare(req.body.password, getUser.password);

				if (!checkPassword) {
					return res.status(401).json({
						error: 'Mot de passe invalide',
					});
				}
			}

			const token = jwt.sign(
				{
					userEmail: getUser.email,
					userId: getUser.id,
				},
				process.env.accesTokenSecret,
				{
					expiresIn: '24h',
				},
			);

			return res.status(200).json({
				success: 'Utilisateur connecté',
				token,
			});
		} catch (error) {
			console.error(`Erreur lors de la connexion de l'utilisateur :`, error);
			res.status(401).json('Erreur lors de la connexion');
		}
	},
};

export default controller;
