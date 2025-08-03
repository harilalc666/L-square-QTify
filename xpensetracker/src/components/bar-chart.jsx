import {
  ComposedChart,
  Bar,
  YAxis,
  XAxis,
  ResponsiveContainer,
  LabelList,
} from 'recharts';

// const data = [
//   { category: 'entertainment', amount: 800 },
//   { category: 'travel', amount: 967 },
//   { category: 'food', amount: 1098 },
// ];

const Barchart = ({ data }) => {
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
          dataKey="category"
          type="category"
          axisLine={false}
          tick={false} // Hide Y axis labels
          width={100}
        />
        <Bar dataKey="amount" barSize={20} fill="#413ea0" radius={[0, 10, 10, 0]}>
          <LabelList
            dataKey="category"
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