import React from 'react';

// Safely import recharts components
let BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer;

const RechartsWrapper = ({ data, entity1, entity2, comparisonType }) => {
  const [chartsLoaded, setChartsLoaded] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const loadCharts = async () => {
      try {
        const recharts = await import('recharts');
        BarChart = recharts.BarChart;
        Bar = recharts.Bar;
        XAxis = recharts.XAxis;
        YAxis = recharts.YAxis;
        CartesianGrid = recharts.CartesianGrid;
        Tooltip = recharts.Tooltip;
        Legend = recharts.Legend;
        ResponsiveContainer = recharts.ResponsiveContainer;
        setChartsLoaded(true);
      } catch (err) {
        console.error('Failed to load charts:', err);
        setError(err);
      }
    };

    loadCharts();
  }, []);

  if (error) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-lg text-red-600">Error loading chart components</div>
      </div>
    );
  }

  if (!chartsLoaded) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-lg text-gray-600">Loading chart...</div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-lg text-gray-600">No data available for chart</div>
      </div>
    );
  }

  try {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="stat" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar 
            dataKey={comparisonType === 'player' 
              ? `${entity1.first_name} ${entity1.last_name}` 
              : entity1.full_name
            } 
            fill="#f97316" 
          />
          <Bar 
            dataKey={comparisonType === 'player' 
              ? `${entity2.first_name} ${entity2.last_name}` 
              : entity2.full_name
            } 
            fill="#3b82f6" 
          />
        </BarChart>
      </ResponsiveContainer>
    );
  } catch (renderError) {
    console.error('Error rendering chart:', renderError);
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-lg text-red-600">Error rendering chart</div>
      </div>
    );
  }
};

export default RechartsWrapper;