import { MapPin, RefreshCw, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { useAirRaidShelter } from '../../contexts/AirRaidShelterContext';

export function LocationStatus() {
  const { state, getCurrentLocation } = useAirRaidShelter();

  const getStatusIcon = () => {
    switch (state.locationStatus) {
      case 'loading':
        return <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'success':
        return <MapPin className="h-4 w-4 text-green-500" />;
      default:
        return <MapPin className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusText = () => {
    switch (state.locationStatus) {
      case 'loading':
        return '正在定位中...';
      case 'error':
        return '定位失敗，點擊重試';
      case 'success':
        return state.userLocation ? `您的位置：${state.userLocation.address}` : '定位成功';
      default:
        return '點擊獲取位置';
    }
  };

  const getStatusColor = () => {
    switch (state.locationStatus) {
      case 'loading':
        return 'text-blue-600';
      case 'error':
        return 'text-red-600';
      case 'success':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="px-4 py-3 bg-white border-b border-gray-200">
      <Button
        variant="ghost"
        onClick={getCurrentLocation}
        disabled={state.locationStatus === 'loading'}
        className={`w-full justify-start gap-2 h-auto p-2 ${getStatusColor()}`}
      >
        {getStatusIcon()}
        <span className="text-sm">{getStatusText()}</span>
      </Button>
    </div>
  );
}