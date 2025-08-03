import { Cell, Pie, PieChart, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Food', value: 400 },
  { name: 'Entertainment', value: 300 },
  { name: 'Travel', value: 300 },
];

const style = {
  bottom: 0,
  transform: 'translate(0, -50%)',
  lineHeight: '5px',
};

const RADIAN = Math.PI / 180;
const COLORS = ['#0088FE', '#00C49F', '#FFBB28']

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

export default function ChartComponent() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={199} height={199}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius="70%"
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      <Legend iconSize={10} layout="horizontal" verticalAlign="middle" wrapperStyle={style} />
      </PieChart>
    </ResponsiveContainer>
  );
}
