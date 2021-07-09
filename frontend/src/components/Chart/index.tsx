import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, CartesianGrid } from 'recharts';
import Title from '../Title';

// Generate Sales Data
function createData(time: any, amount: any) {
  return { time, amount };
}

const data = [
  createData('09:00', 23),
  createData('11:00', 15),
  createData('13:00', 12),
  createData('15:00', 30),
  createData('17:00', 16),
  createData('19:00', 23),
];

export default function Chart() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Agendamentos por hora</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Agendamentos
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}