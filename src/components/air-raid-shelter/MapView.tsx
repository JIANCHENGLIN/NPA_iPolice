import { useState, useRef, useCallback, useEffect } from 'react';
import { MapPin, Navigation, ZoomIn, ZoomOut, X } from 'lucide-react';
import { Button } from '../ui/button';
import { useAirRaidShelter } from '../../contexts/AirRaidShelterContext';
import { shelterTypeIcons } from '../../data/airRaidShelters';

interface ShelterCardProps {
  shelter: any;
  onClose: () => void;
  onNavigation: (shelter: any) => void;
  onDetail: (shelter: any) => void;
  isVisible: boolean;
}

function ShelterInfoCard({ shelter, onClose, onNavigation, onDetail, isVisible }: ShelterCardProps) {
  return (
    <div 
      className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
        isVisible 
          ? 'opacity-100 scale-100 z-[1000]' 
          : 'opacity-0 scale-90 pointer-events-none z-[1000]'
      }`}
      style={{
        width: '280px'
      }}
    >
      <div 
        className="bg-white border border-gray-100 relative"
        style={{ 
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
          borderColor: 'rgba(0,0,0,0.06)'
        }}
      >
        {/* 關閉按鈕 */}
        <button
          onClick={onClose}
          className="absolute w-8 h-8 bg-transparent border-none hover:bg-gray-100 flex items-center justify-center transition-colors duration-200"
          style={{
            top: '16px',
            right: '16px',
            color: '#9CA3AF',
            fontSize: '12pt',
            borderRadius: '6px'
          }}
        >
          ×
        </button>

        {/* 避難場所資訊 */}
        <div>
          {/* 標題 */}
          <h3 
            className="font-semibold leading-tight"
            style={{
              fontSize: '14pt',
              color: '#1C1C1E',
              marginBottom: '12px',
              paddingRight: '32px'
            }}
          >
            {shelter.name}
          </h3>
          
          {/* 距離資訊 */}
          <div 
            className="leading-normal"
            style={{
              marginBottom: '8px',
              fontSize: '12pt',
              color: '#6B7280'
            }}
          >
            距離：<span 
              className="font-bold"
              style={{ 
                fontSize: '12pt',
                color: '#6B7280'
              }}
            >
              {shelter.distance?.toFixed(1)}km
            </span>
          </div>
          
          {/* 容納資訊 */}
          <div 
            className="leading-normal"
            style={{
              marginBottom: '8px',
              fontSize: '12pt',
              color: '#6B7280'
            }}
          >
            容納：{shelter.capacity}人
          </div>
          
          {/* 分隔線 */}
          <hr 
            className="border-gray-200"
            style={{
              marginTop: '12px',
              marginBottom: '12px'
            }}
          />
          
          {/* 地址資訊 */}
          <div 
            className="leading-normal"
            style={{
              marginBottom: '8px',
              fontSize: '12pt',
              color: '#6B7280'
            }}
          >
            地址：{shelter.address}
          </div>
          
          {/* 導航按鈕 */}
          <button
            className="w-full border-none cursor-pointer transition-colors duration-200 hover:opacity-90 text-center"
            style={{
              height: '44px',
              backgroundColor: '#003087',
              color: 'white',
              borderRadius: '8px',
              fontSize: '12pt',
              marginTop: '16px'
            }}
            onClick={(e) => {
              e.stopPropagation();
              onNavigation(shelter);
              onClose();
            }}
          >
            導航
          </button>
        </div>
      </div>
    </div>
  );
}

export function MapView() {
  const { state, selectShelter, openNavigation } = useAirRaidShelter();
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isMapLoading, setIsMapLoading] = useState(false);
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.5));
  };

  const handleMarkerClick = useCallback((shelterId: string) => {
    setActiveCard(activeCard === shelterId ? null : shelterId);
  }, [activeCard]);

  const handleCloseCard = useCallback(() => {
    setActiveCard(null);
  }, []);

  const handleMapClick = useCallback((e: React.MouseEvent) => {
    // 點擊地圖空白區域關閉卡片
    if (e.target === e.currentTarget) {
      setActiveCard(null);
    }
  }, []);



  // ESC 鍵關閉卡片
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveCard(null);
      }
    };

    if (activeCard) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [activeCard]);

  // 模擬街道地圖背景
  return (
    <div className="relative">
      <div 
        ref={mapRef}
        className="relative h-80 mx-4 rounded-lg overflow-hidden border border-gray-200 shadow-sm cursor-pointer"
        style={{ position: 'relative' }}
        onClick={handleMapClick}
      >
        {/* 地圖載入狀態 */}
        {isMapLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
            <div className="text-center">
              <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">地圖載入中...</p>
            </div>
          </div>
        )}

        {/* 模擬街道地圖背景 */}
        <div 
          className="absolute inset-0 transition-transform transition-all duration-300"
          style={{ 
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'center center'
          }}
        >
          {/* 地圖底色 */}
          <div className="absolute inset-0 bg-green-50"></div>
          
          {/* 模擬街道線條 */}
          <svg className="absolute inset-0 w-full h-full" style={{ filter: `opacity(${0.6 + zoomLevel * 0.2})` }}>
            {/* 主要道路 (粗線) */}
            <line x1="0" y1="40%" x2="100%" y2="40%" stroke="#E5E7EB" strokeWidth="8" />
            <line x1="0" y1="60%" x2="100%" y2="60%" stroke="#E5E7EB" strokeWidth="6" />
            <line x1="30%" y1="0" x2="30%" y2="100%" stroke="#E5E7EB" strokeWidth="8" />
            <line x1="70%" y1="0" x2="70%" y2="100%" stroke="#E5E7EB" strokeWidth="6" />
            
            {/* 次要道路 (細線) */}
            <line x1="0" y1="20%" x2="100%" y2="20%" stroke="#F3F4F6" strokeWidth="4" />
            <line x1="0" y1="80%" x2="100%" y2="80%" stroke="#F3F4F6" strokeWidth="4" />
            <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#F3F4F6" strokeWidth="4" />
            <line x1="10%" y1="0" x2="10%" y2="100%" stroke="#F3F4F6" strokeWidth="3" />
            <line x1="90%" y1="0" x2="90%" y2="100%" stroke="#F3F4F6" strokeWidth="3" />
            
            {/* 小路 */}
            <line x1="0" y1="15%" x2="30%" y2="15%" stroke="#F9FAFB" strokeWidth="2" />
            <line x1="70%" y1="15%" x2="100%" y2="15%" stroke="#F9FAFB" strokeWidth="2" />
            <line x1="0" y1="75%" x2="30%" y2="75%" stroke="#F9FAFB" strokeWidth="2" />
            <line x1="70%" y1="75%" x2="100%" y2="75%" stroke="#F9FAFB" strokeWidth="2" />
          </svg>

          {/* 模擬建築區塊 */}
          <div className="absolute inset-0">
            {/* 建築物陰影效果 */}
            <div className="absolute bg-gray-100 rounded-sm shadow-sm" style={{ left: '5%', top: '10%', width: '20%', height: '25%' }}></div>
            <div className="absolute bg-gray-100 rounded-sm shadow-sm" style={{ left: '35%', top: '10%', width: '15%', height: '20%' }}></div>
            <div className="absolute bg-gray-100 rounded-sm shadow-sm" style={{ left: '75%', top: '5%', width: '20%', height: '30%' }}></div>
            <div className="absolute bg-gray-100 rounded-sm shadow-sm" style={{ left: '10%', top: '65%', width: '15%', height: '25%' }}></div>
            <div className="absolute bg-gray-100 rounded-sm shadow-sm" style={{ left: '75%', top: '70%', width: '20%', height: '25%' }}></div>
            <div className="absolute bg-gray-100 rounded-sm shadow-sm" style={{ left: '45%', top: '65%', width: '18%', height: '20%' }}></div>
          </div>

          {/* 模擬綠地公園 */}
          <div className="absolute bg-green-100 rounded-lg" style={{ left: '55%', top: '20%', width: '15%', height: '15%' }}></div>
          <div className="absolute bg-green-100 rounded-lg" style={{ left: '32%', top: '45%', width: '12%', height: '12%' }}></div>
        </div>

        {/* 地圖標記層 */}
        <div className="absolute inset-0" style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}>

          {/* 用戶位置標記 */}
          {state.userLocation && (
            <div 
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
              style={{ 
                left: '50%', 
                top: '50%'
              }}
            >
              <div className="relative">
                {/* 脈衝動畫外環 */}
                <div className="absolute inset-0 w-6 h-6 bg-blue-400 rounded-full animate-ping opacity-75"></div>
                <div className="absolute inset-0 w-8 h-8 bg-blue-300 rounded-full animate-ping opacity-50" style={{ animationDelay: '0.5s' }}></div>
                {/* 中心點 */}
                <div className="relative w-6 h-6 bg-blue-600 rounded-full border-3 border-white shadow-lg z-10 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          )}

          {/* 避難場所標記 */}
          {state.shelters.slice(0, 6).map((shelter, index) => {
            // 更合理的位置分佈
            const positions = [
              { x: 25, y: 30 }, // 大潭國小
              { x: 65, y: 25 }, // 東港分局
              { x: 45, y: 65 }, // 東港醫院
              { x: 75, y: 55 }, // 東港高中
              { x: 20, y: 70 }, // 東港鎮公所
              { x: 80, y: 35 }, // 東港漁會
            ];
            
            const position = positions[index] || { x: 50 + (index * 15), y: 50 + (index * 10) };
            const isActive = activeCard === shelter.id;
            
            return (
              <div
                key={shelter.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30 transition-all duration-200 ${
                  isActive ? 'scale-125' : 'hover:scale-110'
                }`}
                style={{ 
                  left: `${position.x}%`, 
                  top: `${position.y}%`
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleMarkerClick(shelter.id);
                }}
              >
                {/* 標記點 */}
                <div className="relative">
                  {/* 標記背景陰影 */}
                  <div className="absolute inset-0 w-10 h-10 bg-black rounded-full opacity-20 transform translate-x-0.5 translate-y-0.5"></div>
                  
                  {/* 主標記 */}
                  <div className={`relative w-10 h-10 rounded-full border-3 border-white shadow-lg flex items-center justify-center text-white transition-all duration-200 ${
                    isActive 
                      ? 'bg-red-600 ring-4 ring-red-200' 
                      : 'bg-red-500 hover:bg-red-600'
                  }`}>
                    <span className="text-lg">{shelterTypeIcons[shelter.type]}</span>
                  </div>
                  
                  {/* 標記下方的小三角 */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1 w-0 h-0 border-l-2 border-r-2 border-t-3 border-l-transparent border-r-transparent border-t-red-500"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 地圖控制項 */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-[100]">
          <Button
            size="sm"
            variant="outline"
            className="w-10 h-10 p-0 bg-white hover:bg-gray-50 shadow-md border-gray-300"
            onClick={handleZoomIn}
            disabled={zoomLevel >= 2}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="w-10 h-10 p-0 bg-white hover:bg-gray-50 shadow-md border-gray-300"
            onClick={handleZoomOut}
            disabled={zoomLevel <= 0.5}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
        </div>

        {/* 地圖說明 */}
        <div className="absolute top-4 left-4 bg-white rounded-lg p-2 shadow-md z-[100]">
          <div className="text-xs text-gray-600 mb-1">
            <span className="font-medium">模擬地圖視圖</span>
          </div>
          <div className="text-xs text-gray-500">
            點擊標記查看詳情
          </div>
        </div>

        {/* 圖例 */}
        <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-md z-[100]">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <div className="relative">
                <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white"></div>
                <div className="absolute inset-0 w-4 h-4 bg-blue-400 rounded-full animate-ping opacity-75"></div>
              </div>
              <span className="font-medium">您的位置</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>
              <span className="font-medium">避難場所</span>
            </div>
            <div className="text-xs text-gray-500 pt-1 border-t border-gray-200">
              縮放: {Math.round(zoomLevel * 100)}%
            </div>
          </div>
        </div>

        {/* 切換到列表模式建議 */}
        <div className="absolute bottom-4 right-4 z-[100]">
          <Button
            size="sm"
            variant="outline"
            className="bg-white shadow-md text-xs"
            onClick={() => {
              // 切換到列表模式
              document.querySelector('[data-mode="list"]')?.click();
            }}
          >
            切換列表模式
          </Button>
        </div>

        {/* 資訊卡片 - 在地圖容器內渲染 */}
        {state.shelters.find(s => s.id === activeCard) && (
          <ShelterInfoCard
            shelter={state.shelters.find(s => s.id === activeCard)!}
            isVisible={!!activeCard}
            onClose={handleCloseCard}
            onNavigation={openNavigation}
            onDetail={(shelter) => {
              selectShelter(shelter);
              setActiveCard(null);
            }}
          />
        )}
      </div>


    </div>
  );
}