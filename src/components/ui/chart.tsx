
import React from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const COLORS = ['#f472b6', '#e879f9', '#c084fc', '#a78bfa', '#818cf8', '#60a5fa'];

interface ChartData {
  name: string;
  [key: string]: string | number;
}

// Bar Chart Component
export interface BarChartProps {
  data: ChartData[];
  layout?: 'vertical' | 'horizontal';
  dataKey?: string;
}

export const BarChart = ({ 
  data, 
  layout = 'horizontal',
  dataKey = 'value'
}: BarChartProps) => {
  // Determine the data keys to display as bars (all except 'name')
  const keys = Object.keys(data[0] || {}).filter(key => key !== 'name');
  const defaultKey = keys.length > 0 ? keys[0] : 'value';
  const actualDataKey = dataKey in data[0] ? dataKey : defaultKey;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart
        data={data}
        layout={layout}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        {layout === 'horizontal' ? (
          <>
            <XAxis dataKey="name" />
            <YAxis />
          </>
        ) : (
          <>
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" />
          </>
        )}
        <Tooltip />
        <Legend />
        <Bar dataKey={actualDataKey} fill="#f472b6" radius={[4, 4, 0, 0]} />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

// Line Chart Component
export interface LineChartProps {
  data: ChartData[];
  dataKey?: string;
}

export const LineChart = ({ 
  data,
  dataKey = 'value'
}: LineChartProps) => {
  // Determine the data keys to display as lines (all except 'name')
  const keys = Object.keys(data[0] || {}).filter(key => key !== 'name');
  const defaultKey = keys.length > 0 ? keys[0] : 'value';
  const actualDataKey = dataKey in data[0] ? dataKey : defaultKey;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line 
          type="monotone" 
          dataKey={actualDataKey} 
          stroke="#f472b6" 
          activeDot={{ r: 8 }} 
          strokeWidth={2}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

// Pie Chart Component
export interface PieChartProps {
  data: ChartData[];
  dataKey?: string;
  nameKey?: string;
}

export const PieChart = ({ 
  data,
  dataKey = 'value',
  nameKey = 'name'
}: PieChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey={dataKey}
          nameKey={nameKey}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};
