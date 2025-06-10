import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  gradient?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend,
  gradient = 'from-pink-500 to-purple-600'
}) => {
  return (
    <div className="bg-gray-800 rounded-xl p-3 sm:p-6 border border-gray-700 hover:border-gray-600 transition-all duration-200 transform hover:scale-105 hover:shadow-lg group">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className={`w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br ${gradient} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
          <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
        </div>
        {trend && (
          <div className={`text-xs sm:text-sm font-medium flex items-center space-x-1 ${trend.isPositive ? 'text-green-400' : 'text-red-400'}`}>
            <span>{trend.isPositive ? '↗' : '↘'}</span>
            <span>{trend.isPositive ? '+' : ''}{trend.value}%</span>
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <h3 className="text-lg sm:text-2xl font-bold text-white truncate group-hover:text-pink-400 transition-colors">{value}</h3>
        <p className="text-gray-400 text-xs sm:text-sm">{title}</p>
        {subtitle && (
          <p className="text-gray-500 text-xs">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default StatCard;