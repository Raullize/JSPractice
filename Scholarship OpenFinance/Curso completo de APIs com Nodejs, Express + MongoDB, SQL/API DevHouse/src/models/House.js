import { Schema, model } from 'mongoose';

/**
 * Schema do modelo House
 * Define a estrutura dos dados de imóveis no MongoDB
 */
const HouseSchema = new Schema({
  // Nome do arquivo da imagem de capa
  thumbnail: {
    type: String,
    required: true
  },
  // Descrição do imóvel
  description: {
    type: String,
    required: true
  },
  // Preço do aluguel
  price: {
    type: Number,
    required: true
  },
  // Localização do imóvel
  location: {
    type: String,
    required: true
  },
  // Status de disponibilidade
  status: {
    type: Boolean,
    required: true,
    default: true
  },
  // Referência ao usuário dono do imóvel
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Data de criação do registro
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: {
    virtuals: true
  }
});

HouseSchema.virtual('thumbnail_url').get(function(){
  return `http://localhost:3333/files/${this.thumbnail}`;
})

// Exporta o modelo House
export default model('House', HouseSchema);