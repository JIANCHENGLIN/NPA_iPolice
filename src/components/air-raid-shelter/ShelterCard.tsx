import { Navigation, MapPin, Users, Info } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ShelterData, shelterTypeMap, shelterTypeIcons } from '../../data/airRaidShelters';
import { useAirRaidShelter } from '../../contexts/AirRaidShelterContext';

interface ShelterCardProps {
  shelter: ShelterData;
}

export function ShelterCard({ shelter }: ShelterCardProps) {
  const { selectShelter, openNavigation } = useAirRaidShelter();

  const getDistanceColor = (distance?: number) => {
    if (!distance) return 'bg-gray-500';
    if (distance < 0.5) return 'bg-green-500';
    if (distance < 1.0) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
      {/* 標題列 */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{shelterTypeIcons[shelter.type]}</span>
          <div>
            <h3 className="font-semibold text-lg">{shelter.name}</h3>
            <Badge variant="outline" className="mt-1 text-xs">
              {shelterTypeMap[shelter.type]}
            </Badge>
          </div>
        </div>
        {shelter.distance && (
          <div className="text-right">
            <div className={`inline-flex items-center px-2 py-1 rounded text-white text-sm font-medium ${getDistanceColor(shelter.distance)}`}>
              {shelter.distance.toFixed(1)}km
            </div>
            {shelter.walkingTime && (
              <div className="text-xs text-gray-500 mt-1">
                步行約{shelter.walkingTime}分鐘
              </div>
            )}
          </div>
        )}
      </div>

      {/* 基本資訊 */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users className="h-4 w-4" />
          <span>可容納：{shelter.capacity}人</span>
        </div>
        <div className="flex items-start gap-2 text-sm text-gray-600">
          <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <span>{shelter.address}</span>
        </div>
        <div className="text-sm text-gray-500">
          管轄：{shelter.jurisdiction}
        </div>
      </div>

      {/* 操作按鈕 */}
      <div className="flex gap-2">
        <Button
          onClick={() => openNavigation(shelter)}
          className="flex-1 gap-2"
          style={{ backgroundColor: '#003087' }}
        >
          <Navigation className="h-4 w-4" />
          立即導航
        </Button>
        <Button
          variant="outline"
          onClick={() => selectShelter(shelter)}
          className="gap-2"
        >
          <Info className="h-4 w-4" />
          詳情
        </Button>
      </div>
    </div>
  );
}