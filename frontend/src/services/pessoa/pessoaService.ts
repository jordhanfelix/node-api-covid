import http from '../httpService';
import PessoaDto from '../pessoa/dto/pessoaDto';

class PessoaService {
  public async create(input: PessoaDto): Promise<PessoaDto> {
    let result = await http.post('api/pg-pessoa/create', input);
    return result.data;
  }
}

export default new PessoaService();
