
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

export interface ChartData {
  name: string;
  [key: string]: string | number;
}

// Bar Chart Component
export interface BarChartProps {
  data: ChartData[];
  layout?: 'vertical' | 'horizontal';
  dataKey?: string;
  // Add compatibility with AdminDashboardOverview props
  index?: string;
  categories?: string[];
  colors?: string[];
  valueFormatter?: (value: any) => string;
  className?: string;
}

export const BarChart = ({ 
  data, 
  layout = 'horizontal',
  dataKey = 'value',
  index,
  categories,
  colors,
  valueFormatter,
  className
}: BarChartProps) => {
  // Determine the data keys to display as bars (all except 'name')
  const keys = Object.keys(data[0] || {}).filter(key => key !== 'name' && key !== (index || 'name'));
  const defaultKey = keys.length > 0 ? keys[0] : 'value';
  
  // If categories are provided, use them instead of detecting from data
  const barsToRender = categories || [dataKey in data[0] ? dataKey : defaultKey];
  const nameKey = index || 'name';

  return (
    <ResponsiveContainer width="100%" height="100%" className={className}>
      <RechartsBarChart
        data={data}
        layout={layout}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        {layout === 'horizontal' ? (
          <>
            <XAxis dataKey={nameKey} />
            <YAxis />
          </>
        ) : (
          <>
            <XAxis type="number" />
            <YAxis dataKey={nameKey} type="category" />
          </>
        )}
        <Tooltip formatter={valueFormatter} />
        <Legend />
        {barsToRender.map((key, i) => (
          <Bar 
            key={key} 
            dataKey={key} 
            fill={colors ? colors[i % colors.length] : COLORS[i % COLORS.length]} 
            radius={[4, 4, 0, 0]} 
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

// Line Chart Component
export interface LineChartProps {
  data: ChartData[];
  dataKey?: string;
  // Add compatibility with AdminDashboardOverview props
  index?: string;
  categories?: string[];
  colors?: string[];
  valueFormatter?: (value: any) => string;
  className?: string;
}

export const LineChart = ({ 
  data,
  dataKey = 'value',
  index,
  categories,
  colors,
  valueFormatter,
  className
}: LineChartProps) => {
  // Determine the data keys to display as lines (all except 'name')
  const keys = Object.keys(data[0] || {}).filter(key => key !== 'name' && key !== (index || 'name'));
  const defaultKey = keys.length > 0 ? keys[0] : 'value';
  
  // If categories are provided, use them instead of detecting from data
  const linesToRender = categories || [dataKey in data[0] ? dataKey : defaultKey];
  const nameKey = index || 'name';

  return (
    <ResponsiveContainer width="100%" height="100%" className={className}>
      <RechartsLineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={nameKey} />
        <YAxis />
        <Tooltip formatter={valueFormatter} />
        <Legend />
        {linesToRender.map((key, i) => (
          <Line 
            key={key}
            type="monotone" 
            dataKey={key} 
            stroke={colors ? colors[i % colors.length] : COLORS[i % COLORS.length]} 
            activeDot={{ r: 8 }} 
            strokeWidth={2}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

// Pie Chart Component
export interface PieChartProps {
  data: ChartData[];
  dataKey?: string;
  nameKey?: string;
  // Add compatibility with AdminDashboardOverview props
  index?: string;
  category?: string;
  colors?: string[];
  valueFormatter?: (value: any) => string;
  className?: string;
}

export const PieChart = ({ 
  data,
  dataKey = 'value',
  nameKey = 'name',
  index,
  category,
  colors,
  valueFormatter,
  className
}: PieChartProps) => {
  // Use index as nameKey and category as dataKey if provided
  const actualNameKey = index || nameKey;
  const actualDataKey = category || dataKey;
  
  return (
    <ResponsiveContainer width="100%" height="100%" className={className}>
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey={actualDataKey}
          nameKey={actualNameKey}
          label={({ name, percent }) => {
            const formattedPercent = `${(percent * 100).toFixed(0)}%`;
            return valueFormatter ? `${name}: ${formattedPercent}` : `${name}: ${formattedPercent}`;
          }}
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={colors ? colors[index % colors.length] : COLORS[index % COLORS.length]} 
            />
          ))}
        </Pie>
        <Tooltip formatter={valueFormatter} />
        <Legend />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};
