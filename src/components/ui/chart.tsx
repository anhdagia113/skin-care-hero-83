
import React from "react";
import { Bar, Line, Pie } from "recharts";
import {
  BarChart as RechartsBarChart,
  LineChart as RechartsLineChart,
  PieChart as RechartsPieChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
  Cell
} from "recharts";

interface ChartProps {
  data: any[];
  className?: string;
}

// Bar Chart
interface BarChartProps extends ChartProps {
  index: string;
  categories: string[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
}

export const BarChart = ({
  data,
  index,
  categories,
  colors = ["#9333ea", "#e11d48", "#06b6d4"],
  valueFormatter = (value: number) => `${value}`,
  className
}: BarChartProps) => {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey={index}
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tickFormatter={valueFormatter}
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip 
            formatter={(value: number) => [valueFormatter(value), ""]}
            labelStyle={{ fontSize: 14, fontWeight: 600 }}
          />
          <Legend />
          {categories.map((category, i) => (
            <Bar
              key={category}
              dataKey={category}
              fill={colors[i % colors.length]}
              radius={[4, 4, 0, 0]}
              barSize={30}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Line Chart
interface LineChartProps extends ChartProps {
  index: string;
  categories: string[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
}

export const LineChart = ({
  data,
  index,
  categories,
  colors = ["#9333ea", "#e11d48", "#06b6d4"],
  valueFormatter = (value: number) => `${value}`,
  className
}: LineChartProps) => {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey={index}
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tickFormatter={valueFormatter}
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip 
            formatter={(value: number) => [valueFormatter(value), ""]}
            labelStyle={{ fontSize: 14, fontWeight: 600 }}
          />
          <Legend />
          {categories.map((category, i) => (
            <Line
              key={category}
              type="monotone"
              dataKey={category}
              stroke={colors[i % colors.length]}
              strokeWidth={2}
              dot={{ strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

// Pie Chart
interface PieChartProps extends ChartProps {
  index: string;
  category: string;
  colors?: string[];
  valueFormatter?: (value: number) => string;
}

export const PieChart = ({
  data,
  index,
  category,
  colors = ["#9333ea", "#10b981", "#f43f5e", "#06b6d4", "#f59e0b"],
  valueFormatter = (value: number) => `${value}`,
  className
}: PieChartProps) => {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={data}
            nameKey={index}
            dataKey={category}
            cx="50%"
            cy="50%"
            outerRadius={80}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            labelLine={true}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => [valueFormatter(value), ""]}
            labelStyle={{ fontSize: 14, fontWeight: 600 }}
          />
          <Legend />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
};
