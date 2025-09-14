// 避難場所資料類型定義
export interface ShelterData {
  id: string;                    // 設施編號
  name: string;                  // 避難場所名稱
  type: ShelterType;             // 建築類型
  address: string;               // 完整地址
  district: string;              // 行政區域
  capacity: number;              // 容納人數
  floors: number;                // 地下樓層數
  coordinates: {                 // 座標資訊
    lat: number;
    lng: number;
  };
  jurisdiction: string;          // 管轄單位
  serialNumber: string;          // 設施編號 (顯示用)
  
  // 計算屬性
  distance?: number;             // 距離 (km)
  walkingTime?: number;          // 步行時間 (分鐘)
}

export type ShelterType = 'school' | 'government' | 'hospital' | 'building';

// 建築類型對應
export const shelterTypeMap = {
  school: '學校',
  government: '政府機關', 
  hospital: '醫院',
  building: '大型建築'
};

export const shelterTypeIcons = {
  school: '🏫',
  government: '🏛️',
  hospital: '🏥', 
  building: '🏢'
};

// 假資料
export const mockShelterData: ShelterData[] = [
  {
    id: 'QQA00015',
    name: '大潭國小',
    type: 'school',
    address: '屏東縣東港鎮大潭里02鄰大潭路93號',
    district: '東港鎮',
    capacity: 582,
    floors: 1,
    coordinates: { 
      lat: 22.4564725978914, 
      lng: 120.495503715639 
    },
    jurisdiction: '東港分局',
    serialNumber: 'QQA00015'
  },
  {
    id: 'QQA00016', 
    name: '東港分局',
    type: 'government',
    address: '屏東縣東港鎮中山路108號',
    district: '東港鎮',
    capacity: 200,
    floors: 2,
    coordinates: { 
      lat: 22.4621, 
      lng: 120.4532 
    },
    jurisdiction: '東港分局',
    serialNumber: 'QQA00016'
  },
  {
    id: 'QQA00017',
    name: '東港醫院', 
    type: 'hospital',
    address: '屏東縣東港鎮中正路一段210號',
    district: '東港鎮',
    capacity: 800,
    floors: 3,
    coordinates: { 
      lat: 22.4598, 
      lng: 120.4475 
    },
    jurisdiction: '東港分局',
    serialNumber: 'QQA00017'
  },
  {
    id: 'QQA00018',
    name: '東港高中',
    type: 'school',
    address: '屏東縣東港鎮興東里12鄰中山路658號',
    district: '東港鎮',
    capacity: 1200,
    floors: 2,
    coordinates: { 
      lat: 22.4651, 
      lng: 120.4489 
    },
    jurisdiction: '東港分局',
    serialNumber: 'QQA00018'
  },
  {
    id: 'QQA00019',
    name: '東港鎮公所',
    type: 'government',
    address: '屏東縣東港鎮中山路5號',
    district: '東港鎮',
    capacity: 300,
    floors: 1,
    coordinates: { 
      lat: 22.4612, 
      lng: 120.4521 
    },
    jurisdiction: '東港分局',
    serialNumber: 'QQA00019'
  },
  {
    id: 'QQA00020',
    name: '東港漁會',
    type: 'building',
    address: '屏東縣東港鎮豐漁街10號',
    district: '東港鎮',
    capacity: 450,
    floors: 1,
    coordinates: { 
      lat: 22.4588, 
      lng: 120.4511 
    },
    jurisdiction: '東港分局',
    serialNumber: 'QQA00020'
  },
  {
    id: 'QQA00021',
    name: '東港國中',
    type: 'school',
    address: '屏東縣東港鎮中山路38號',
    district: '東港鎮',
    capacity: 960,
    floors: 2,
    coordinates: { 
      lat: 22.4635, 
      lng: 120.4498 
    },
    jurisdiction: '東港分局',
    serialNumber: 'QQA00021'
  },
  {
    id: 'QQA00022',
    name: '東港圖書館',
    type: 'building',
    address: '屏東縣東港鎮光復路三段128號',
    district: '東港鎮',
    capacity: 180,
    floors: 1,
    coordinates: { 
      lat: 22.4618, 
      lng: 120.4467 
    },
    jurisdiction: '東港分局',
    serialNumber: 'QQA00022'
  }
];

// 計算兩點間距離 (簡化版，實際專案應使用更精確的地理計算)
export function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // 地球半徑 (km)
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// 計算步行時間 (假設步行速度為5km/h)
export function calculateWalkingTime(distance: number): number {
  return Math.ceil((distance / 5) * 60); // 分鐘
}

// 根據用戶位置計算距離並排序
export function getSheltersWithDistance(
  userLat: number, 
  userLng: number, 
  shelters: ShelterData[] = mockShelterData
): ShelterData[] {
  return shelters
    .map(shelter => {
      const distance = calculateDistance(userLat, userLng, shelter.coordinates.lat, shelter.coordinates.lng);
      const walkingTime = calculateWalkingTime(distance);
      return {
        ...shelter,
        distance: Math.round(distance * 10) / 10, // 精確到小數點後一位
        walkingTime
      };
    })
    .sort((a, b) => (a.distance || 0) - (b.distance || 0));
}