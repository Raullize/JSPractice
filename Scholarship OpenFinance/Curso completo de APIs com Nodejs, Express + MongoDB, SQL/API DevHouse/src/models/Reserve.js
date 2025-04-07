// Importação do Mongoose
import { Schema, model } from 'mongoose';

/**
 * Schema do modelo Reserve
 * Define a estrutura dos dados de reservas no MongoDB
 */
const ReserveSchema = new Schema({
  // Data da reserva
  date: {
    type: String,
    required: true
  },
  // Referência ao usuário que fez a reserva
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Referência ao imóvel reservado
  house: {
    type: Schema.Types.ObjectId,
    ref: 'House',
    required: true
  },
  // Data de criação do registro
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Exporta o modelo Reserve
export default model('Reserve', ReserveSchema);