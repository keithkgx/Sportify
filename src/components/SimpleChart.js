import React from 'react';

const SimpleChart = ({ data, entity1, entity2, comparisonType }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-lg text-gray-600">No data available for chart</div>
      </div>
    );
  }

  const entity1Name = comparisonType === 'player' 
    ? `${entity1.first_name} ${entity1.last_name}` 
    : entity1.full_name;
  
  const entity2Name = comparisonType === 'player' 
    ? `${entity2.first_name} ${entity2.last_name}` 
    : entity2.full_name;

  return (
    <div className="h-96 p-4">
      <div className="space-y-4">
        {data.map((item, index) => {
          const value1 = parseFloat(item[entity1Name]) || 0;
          const value2 = parseFloat(item[entity2Name]) || 0;
          const maxValue = Math.max(value1, value2);
          
          return (
            <div key={index} className="space-y-2">
              <h4 className="font-semibold text-gray-700">{item.stat}</h4>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="w-32 text-sm text-orange-600 font-medium">{entity1Name}:</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-6">
                    <div 
                      className="bg-orange-500 h-6 rounded-full flex items-center justify-end pr-2"
                      style={{ width: `${maxValue > 0 ? (value1 / maxValue) * 100 : 0}%`, minWidth: '60px' }}
                    >
                      <span className="text-white text-xs font-medium">{value1}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-32 text-sm text-blue-600 font-medium">{entity2Name}:</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-6">
                    <div 
                      className="bg-blue-500 h-6 rounded-full flex items-center justify-end pr-2"
                      style={{ width: `${maxValue > 0 ? (value2 / maxValue) * 100 : 0}%`, minWidth: '60px' }}
                    >
                      <span className="text-white text-xs font-medium">{value2}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SimpleChart;