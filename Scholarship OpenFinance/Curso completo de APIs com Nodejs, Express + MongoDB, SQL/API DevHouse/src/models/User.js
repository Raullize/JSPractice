// Importação do Mongoose
import { Schema, model } from 'mongoose';

/**
 * Schema do modelo User
 * Define a estrutura dos dados de usuário no MongoDB
 */
const UserSchema = new Schema({
  // Email do usuário (único e obrigatório)
  email: {
    type: String,
    required: true,
    unique: true
  },
  // Data de criação do registro
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Exporta o modelo User
export default model('User', UserSchema);