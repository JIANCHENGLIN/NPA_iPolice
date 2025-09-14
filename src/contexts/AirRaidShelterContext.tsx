import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { ShelterData, getSheltersWithDistance, mockShelterData } from '../data/airRaidShelters';

// 狀態介面
export interface AirRaidState {
  // 位置資訊
  userLocation: {
    lat: number;
    lng: number;
    address: string;
  } | null;
  
  // 避難場所資料
  shelters: ShelterData[];
  selectedShelter: ShelterData | null;
  
  // UI 狀態
  viewMode: 'map' | 'list';
  isLoading: boolean;
  showDetail: boolean;
  locationStatus: 'idle' | 'loading' | 'success' | 'error';
  
  // 搜尋狀態
  searchQuery: string;
  searchResults: ShelterData[];
}

// 初始狀態
const initialState: AirRaidState = {
  userLocation: null,
  shelters: [],
  selectedShelter: null,
  viewMode: 'map',
  isLoading: false,
  showDetail: false,
  locationStatus: 'idle',
  searchQuery: '',
  searchResults: []
};

// Action 類型
type AirRaidAction = 
  | { type: 'SET_USER_LOCATION'; location: AirRaidState['userLocation'] }
  | { type: 'SET_SHELTERS'; shelters: ShelterData[] }
  | { type: 'SET_SELECTED_SHELTER'; shelter: ShelterData | null }
  | { type: 'SET_VIEW_MODE'; mode: 'map' | 'list' }
  | { type: 'SET_LOADING'; isLoading: boolean }
  | { type: 'SET_SHOW_DETAIL'; show: boolean }
  | { type: 'SET_LOCATION_STATUS'; status: AirRaidState['locationStatus'] }
  | { type: 'SET_SEARCH_QUERY'; query: string }
  | { type: 'SET_SEARCH_RESULTS'; results: ShelterData[] }
  | { type: 'CLEAR_SEARCH' };

// Reducer
function airRaidReducer(state: AirRaidState, action: AirRaidAction): AirRaidState {
  switch (action.type) {
    case 'SET_USER_LOCATION':
      return { ...state, userLocation: action.location };
    
    case 'SET_SHELTERS':
      return { ...state, shelters: action.shelters };
    
    case 'SET_SELECTED_SHELTER':
      return { ...state, selectedShelter: action.shelter };
    
    case 'SET_VIEW_MODE':
      return { ...state, viewMode: action.mode };
    
    case 'SET_LOADING':
      return { ...state, isLoading: action.isLoading };
    
    case 'SET_SHOW_DETAIL':
      return { ...state, showDetail: action.show };
    
    case 'SET_LOCATION_STATUS':
      return { ...state, locationStatus: action.status };
    
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.query };
    
    case 'SET_SEARCH_RESULTS':
      return { ...state, searchResults: action.results };
    
    case 'CLEAR_SEARCH':
      return { ...state, searchQuery: '', searchResults: [] };
    
    default:
      return state;
  }
}

// Context
interface AirRaidContextType {
  state: AirRaidState;
  dispatch: React.Dispatch<AirRaidAction>;
  getCurrentLocation: () => Promise<void>;
  selectShelter: (shelter: ShelterData) => void;
  openNavigation: (shelter: ShelterData) => void;
  searchShelters: (query: string) => void;
  clearSearch: () => void;
}

const AirRaidContext = createContext<AirRaidContextType | undefined>(undefined);

// Provider
export function AirRaidShelterProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(airRaidReducer, initialState);

  // 獲取用戶位置
  const getCurrentLocation = async () => {
    dispatch({ type: 'SET_LOCATION_STATUS', status: 'loading' });
    
    try {
      // 模擬定位 (實際專案中使用 navigator.geolocation)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 模擬位置資料 (東港鎮中心)
      const mockLocation = {
        lat: 22.4612,
        lng: 120.4521,
        address: '屏東縣東港鎮中山路'
      };
      
      dispatch({ type: 'SET_USER_LOCATION', location: mockLocation });
      dispatch({ type: 'SET_LOCATION_STATUS', status: 'success' });
      
      // 計算距離並更新避難場所列表
      const sheltersWithDistance = getSheltersWithDistance(
        mockLocation.lat, 
        mockLocation.lng
      );
      dispatch({ type: 'SET_SHELTERS', shelters: sheltersWithDistance });
      
    } catch (error) {
      console.error('定位失敗:', error);
      dispatch({ type: 'SET_LOCATION_STATUS', status: 'error' });
      
      // 定位失敗時使用預設資料
      dispatch({ type: 'SET_SHELTERS', shelters: mockShelterData });
    }
  };

  // 選擇避難場所
  const selectShelter = (shelter: ShelterData) => {
    dispatch({ type: 'SET_SELECTED_SHELTER', shelter });
    dispatch({ type: 'SET_SHOW_DETAIL', show: true });
  };

  // 開啟導航
  const openNavigation = (shelter: ShelterData) => {
    const { lat, lng } = shelter.coordinates;
    
    // 檢測用戶裝置
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);
    
    let url = '';
    
    if (isIOS) {
      // iOS 優先使用 Apple Maps，備用 Google Maps
      url = `maps://maps.google.com/maps?daddr=${lat},${lng}&dirflg=w`;
      const fallbackUrl = `https://maps.google.com/maps?daddr=${lat},${lng}&dirflg=w`;
      
      // 嘗試開啟 Apple Maps，失敗則開啟 Google Maps
      window.location.href = url;
      setTimeout(() => {
        window.open(fallbackUrl, '_blank');
      }, 500);
    } else if (isAndroid) {
      // Android 使用 Google Maps
      url = `google.navigation:q=${lat},${lng}&mode=w`;
      const fallbackUrl = `https://maps.google.com/maps?daddr=${lat},${lng}&dirflg=w`;
      
      try {
        window.location.href = url;
      } catch {
        window.open(fallbackUrl, '_blank');
      }
    } else {
      // 桌面版使用 Google Maps 網頁版
      url = `https://maps.google.com/maps?daddr=${lat},${lng}&dirflg=w`;
      window.open(url, '_blank');
    }
  };

  // 搜尋避難場所
  const searchShelters = (query: string) => {
    dispatch({ type: 'SET_SEARCH_QUERY', query });
    
    if (!query.trim()) {
      dispatch({ type: 'SET_SEARCH_RESULTS', results: [] });
      return;
    }
    
    const results = state.shelters.filter(shelter => 
      shelter.name.toLowerCase().includes(query.toLowerCase()) ||
      shelter.address.toLowerCase().includes(query.toLowerCase()) ||
      shelter.district.toLowerCase().includes(query.toLowerCase())
    );
    
    dispatch({ type: 'SET_SEARCH_RESULTS', results });
  };

  // 清除搜尋
  const clearSearch = () => {
    dispatch({ type: 'CLEAR_SEARCH' });
  };

  // 組件初始化時獲取位置
  useEffect(() => {
    getCurrentLocation();
  }, []);

  const value = {
    state,
    dispatch,
    getCurrentLocation,
    selectShelter,
    openNavigation,
    searchShelters,
    clearSearch
  };

  return (
    <AirRaidContext.Provider value={value}>
      {children}
    </AirRaidContext.Provider>
  );
}

// Hook
export function useAirRaidShelter() {
  const context = useContext(AirRaidContext);
  if (context === undefined) {
    throw new Error('useAirRaidShelter must be used within a AirRaidShelterProvider');
  }
  return context;
}