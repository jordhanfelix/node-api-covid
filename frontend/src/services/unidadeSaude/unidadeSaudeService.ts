import http from '../httpService';
import UnidadeSaudeDto from './dto/unidadeSaudeDto';

class UnidadeSaudeService {
  public async getList(): Promise<UnidadeSaudeDto[]> {
    let result = await http.get('api/pg-unidadeSaude');
    return result.data;
  }
}

export default new UnidadeSaudeService();
