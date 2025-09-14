import { Header } from '../Header';
import { Breadcrumb } from '../Breadcrumb';
import { AirRaidShelterProvider, useAirRaidShelter } from '../../contexts/AirRaidShelterContext';
import { SearchBar } from '../air-raid-shelter/SearchBar';
import { LocationStatus } from '../air-raid-shelter/LocationStatus';
import { ViewToggle } from '../air-raid-shelter/ViewToggle';
import { MapView } from '../air-raid-shelter/MapView';
import { ShelterList } from '../air-raid-shelter/ShelterList';
import { ShelterDetailModal } from '../air-raid-shelter/ShelterDetailModal';

interface AirRaidShelterPageProps {
  onMenuClick: () => void;
}

function AirRaidShelterContent({ onMenuClick }: AirRaidShelterPageProps) {
  const { state, dispatch, openNavigation } = useAirRaidShelter();

  const handleCloseDetail = () => {
    dispatch({ type: 'SET_SHOW_DETAIL', show: false });
    dispatch({ type: 'SET_SELECTED_SHELTER', shelter: null });
  };

  return (
    <div className="w-[393px] h-[852px] mx-auto bg-white overflow-hidden relative flex flex-col">
      {/* 狀態列區域 */}
      <div className="w-full h-[59px] bg-white"></div>
      
      {/* Header */}
      <Header onMenuClick={onMenuClick} />
      
      {/* 麵包屑導航 */}
      <Breadcrumb />
      
      {/* 主要內容區域 */}
      <div className="flex-1 overflow-y-auto scrollbar-hide" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="bg-white min-h-full">
          {/* 搜尋區域 */}
          <SearchBar />
          
          {/* 位置狀態 */}
          <LocationStatus />
          
          {/* 視圖切換 */}
          <ViewToggle />
          
          {/* 內容區域 */}
          <div className="px-4 pb-6">
            {state.viewMode === 'map' ? (
              <div className="space-y-4">
                {/* 地圖視圖 */}
                <MapView />
                
                {/* 底部避難場所列表 */}
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <h3 className="font-semibold mb-3">最近的避難場所</h3>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {state.shelters.slice(0, 3).map((shelter) => (
                      <div 
                        key={shelter.id}
                        className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer"
                        onClick={() => {
                          dispatch({ type: 'SET_SELECTED_SHELTER', shelter });
                          dispatch({ type: 'SET_SHOW_DETAIL', show: true });
                        }}
                      >
                        <div className="flex-1">
                          <div className="font-medium">{shelter.name}</div>
                          <div className="text-sm text-gray-600">
                            容納：{shelter.capacity}人 | {shelter.district}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium" style={{ color: '#003087' }}>
                            {shelter.distance?.toFixed(1)}km
                          </div>
                          <button 
                            className="text-xs px-2 py-1 rounded"
                            style={{ backgroundColor: '#003087', color: 'white' }}
                            onClick={(e) => {
                              e.stopPropagation();
                              openNavigation(shelter);
                            }}
                          >
                            導航
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* 列表視圖 */
              <ShelterList />
            )}
          </div>
        </div>
      </div>

      {/* 詳細資訊彈窗 */}
      <ShelterDetailModal
        shelter={state.selectedShelter}
        isOpen={state.showDetail}
        onClose={handleCloseDetail}
      />
    </div>
  );
}

export function AirRaidShelterPage({ onMenuClick }: AirRaidShelterPageProps) {
  return (
    <AirRaidShelterProvider>
      <AirRaidShelterContent onMenuClick={onMenuClick} />
    </AirRaidShelterProvider>
  );
}