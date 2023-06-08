import mongoose from "mongoose";

// Définition du schéma et du modèle pour les utilisateurs
const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
});

export default mongoose.model("User", UserSchema, 'users');