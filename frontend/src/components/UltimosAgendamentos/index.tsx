import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../Title';

// Generate Order Data
function createData(id: number, data: string, nome: string, unidadeSaude: string, necessidades_especiais: string, observacoes: string) {
  return { id, data, nome, unidadeSaude, necessidades_especiais, observacoes };
}

const rows = [
  createData(0, '30/06/2021', 'Elvis Presley', 'Igreja Evangélica Batista de Vitória', 'Sim', 'Nenhuma'),
  createData(1, '30/06/2021', 'Paul McCartney', 'US - Conquista', 'Não', 'Nenhuma'),
  createData(2, '30/06/2021', 'Tom Scholz', 'Ginásio UniSales', 'Não', 'Nenhuma'),
  createData(3, '30/06/2021', 'Michael Jackson', 'US - Centro', 'Não', 'Nenhuma'),
  createData(4, '01/07/2021', 'Bruce Springsteen', 'Ginásio UniSales', 'Não', 'Nenhuma'),
];

export default function Orders() {
  return (
    <React.Fragment>
      <Title>Últimos Agendamentos</Title>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Data</TableCell>
            <TableCell>Pessoa</TableCell>
            <TableCell>Unidade de Saúde</TableCell>
            <TableCell>Necessidades Especiais</TableCell>
            <TableCell>Observações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.data}</TableCell>
              <TableCell>{row.nome}</TableCell>
              <TableCell>{row.unidadeSaude}</TableCell>
              <TableCell>{row.necessidades_especiais}</TableCell>
              <TableCell>{row.observacoes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}