import { ShelterCard } from './ShelterCard';
import { useAirRaidShelter } from '../../contexts/AirRaidShelterContext';
import { Loader2, MapPin } from 'lucide-react';

export function ShelterList() {
  const { state } = useAirRaidShelter();

  if (state.locationStatus === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <Loader2 className="h-8 w-8 animate-spin mb-4" />
        <p>正在載入附近的避難場所...</p>
      </div>
    );
  }

  if (state.shelters.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <MapPin className="h-12 w-12 mb-4 text-gray-300" />
        <p className="text-center">
          目前沒有找到避難場所<br />
          請檢查您的位置或嘗試搜尋其他區域
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* 列表標題 */}
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg">
          最近的避難場所
        </h2>
        <div className="text-sm text-gray-500">
          共 {state.shelters.length} 個
        </div>
      </div>

      {/* 避難場所列表 */}
      <div className="space-y-3">
        {state.shelters.map((shelter) => (
          <ShelterCard key={shelter.id} shelter={shelter} />
        ))}
      </div>
    </div>
  );
}