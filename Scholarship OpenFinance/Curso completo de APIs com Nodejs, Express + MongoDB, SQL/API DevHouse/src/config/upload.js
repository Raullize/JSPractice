import multer from 'multer';
import path from 'path';

/**
 * Configuração do Multer para upload de arquivos
 * Define como os arquivos serão armazenados no servidor
 */
export default {
  // Configuração do armazenamento
  storage: multer.diskStorage({
    // Define o diretório de destino dos uploads
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    // Define como o nome do arquivo será gerado
    filename: (req, file, cb) => {
      // Extrai a extensão do arquivo original
      const ext = path.extname(file.originalname);
      // Gera um nome único para o arquivo
      const name = path.basename(file.originalname, ext);
      // Retorna o nome final do arquivo
      cb(null, `${name}-${Date.now()}${ext}`);
    },
  }),
};