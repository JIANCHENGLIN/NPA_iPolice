import { Map, List } from 'lucide-react';
import { Button } from '../ui/button';
import { useAirRaidShelter } from '../../contexts/AirRaidShelterContext';

export function ViewToggle() {
  const { state, dispatch } = useAirRaidShelter();

  const handleModeChange = (mode: 'map' | 'list') => {
    dispatch({ type: 'SET_VIEW_MODE', mode });
  };

  return (
    <div className="flex bg-gray-100 rounded-lg p-1 mx-4 mb-4">
      <Button
        variant={state.viewMode === 'map' ? 'default' : 'ghost'}
        onClick={() => handleModeChange('map')}
        data-mode="map"
        className={`flex-1 gap-2 ${
          state.viewMode === 'map' 
            ? 'bg-white text-black shadow-sm' 
            : 'text-gray-600 hover:text-gray-800'
        }`}
      >
        <Map className="h-4 w-4" />
        地圖模式
      </Button>
      <Button
        variant={state.viewMode === 'list' ? 'default' : 'ghost'}
        onClick={() => handleModeChange('list')}
        data-mode="list"
        className={`flex-1 gap-2 ${
          state.viewMode === 'list' 
            ? 'bg-white text-black shadow-sm' 
            : 'text-gray-600 hover:text-gray-800'
        }`}
      >
        <List className="h-4 w-4" />
        列表模式
      </Button>
    </div>
  );
}