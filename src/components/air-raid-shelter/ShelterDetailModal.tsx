import { Navigation, MapPin, Users, Building, Hash, Map, Heart, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Separator } from '../ui/separator';
import { ShelterData, shelterTypeMap, shelterTypeIcons } from '../../data/airRaidShelters';
import { useAirRaidShelter } from '../../contexts/AirRaidShelterContext';

interface ShelterDetailModalProps {
  shelter: ShelterData | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ShelterDetailModal({ shelter, isOpen, onClose }: ShelterDetailModalProps) {
  const { openNavigation } = useAirRaidShelter();

  if (!shelter) return null;

  const handleNavigation = () => {
    openNavigation(shelter);
    onClose();
  };

  const handleShowMap = () => {
    // 模擬顯示地圖位置
    const { lat, lng } = shelter.coordinates;
    const mapUrl = `https://maps.google.com/?q=${lat},${lng}`;
    window.open(mapUrl, '_blank');
  };

  const handleAddToFavorites = () => {
    // 模擬加入收藏
    console.log('加入收藏:', shelter.name);
    // 這裡可以實作加入收藏的邏輯
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[350px] max-h-[600px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-xl">{shelterTypeIcons[shelter.type]}</span>
            {shelter.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* 基本資訊區 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-sm">
                {shelterTypeMap[shelter.type]}
              </Badge>
              {shelter.distance && (
                <div className="text-right">
                  <div className="font-semibold text-lg" style={{ color: '#003087' }}>
                    {shelter.distance.toFixed(1)}km
                  </div>
                  {shelter.walkingTime && (
                    <div className="text-sm text-gray-500">
                      步行約{shelter.walkingTime}分鐘
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-gray-400" />
                <span>可容納：<strong>{shelter.capacity}人</strong></span>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium">{shelter.address}</div>
                  <div className="text-sm text-gray-500 mt-1">
                    管轄：{shelter.jurisdiction}
                  </div>
                </div>
              </div>
            </div>

            {/* 主要操作按鈕 */}
            <Button
              onClick={handleNavigation}
              className="w-full gap-2 h-12"
              style={{ backgroundColor: '#FF3B30' }}
            >
              <Navigation className="h-5 w-5" />
              立即導航
            </Button>
          </div>

          <Separator />

          {/* 詳細資訊區 */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Building className="h-4 w-4" />
              詳細資訊
            </h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">建築類型：</span>
                <span className="font-medium">{shelterTypeMap[shelter.type]}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">地下樓層：</span>
                <span className="font-medium">{shelter.floors}層</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">設施編號：</span>
                <span className="font-medium font-mono">{shelter.serialNumber}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">座標：</span>
                <span className="font-medium font-mono text-xs">
                  {shelter.coordinates.lat.toFixed(4)}, {shelter.coordinates.lng.toFixed(4)}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* 次要操作按鈕 */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={handleShowMap}
              className="gap-2"
            >
              <Map className="h-4 w-4" />
              顯示地圖位置
            </Button>
            
            <Button
              variant="outline"
              onClick={handleAddToFavorites}
              className="gap-2"
            >
              <Heart className="h-4 w-4" />
              加入常用清單
            </Button>
          </div>

          {/* 使用提示 */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600">
              <strong>使用提示：</strong><br />
              • 避難場所資訊僅供參考，實際開放狀況請以現場為準<br />
              • 緊急時刻請優先選擇最近的避難場所<br />
              • 建議平時熟悉附近避難路線
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}