import {
  ComposedChart,
  Bar,
  YAxis,
  XAxis,
  ResponsiveContainer,
  LabelList,
} from 'recharts';

const data = [
  { name: 'entertainment', value: 800 },
  { name: 'travel', value: 967 },
  { name: 'food', value: 1098 },
];

const Barchart = () => {
  return (
    <ResponsiveContainer width="100%" height={230}>
      <ComposedChart
        layout="vertical"
        data={data}
        margin={{
          left: 20
        }}
      >
        <XAxis type="number" hide />
        <YAxis
          dataKey="name"
          type="category"
          axisLine={false}
          tick={false} // Hide Y axis labels
          width={100}
        />
        <Bar dataKey="value" barSize={20} fill="#413ea0" radius={[0, 10, 10, 0]}>
          <LabelList
            dataKey="name"
            position="left"
            offset={10}
            style={{ fill: '#222', fontWeight: 'bold', textTransform: 'capitalize' }}
          />
        </Bar>
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default Barchart;