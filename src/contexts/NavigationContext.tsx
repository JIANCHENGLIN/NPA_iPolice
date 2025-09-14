import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { NavigationState, NavigationStackItem, BreadcrumbItem, RouteConfig } from '../types/navigation';

// 路由配置
const routeConfigs: Record<string, RouteConfig> = {
  '/': {
    path: '/',
    title: '首頁',
    breadcrumbs: [],
    headerType: 'home'
  },
  '/emergency': {
    path: '/emergency',
    title: '緊急服務',
    breadcrumbs: [
      { label: '首頁', path: '/' },
      { label: '緊急服務' }
    ],
    headerType: 'detail'
  },
  '/anti-fraud': {
    path: '/anti-fraud',
    title: '打詐防騙',
    breadcrumbs: [
      { label: '首頁', path: '/' },
      { label: '打詐防騙' }
    ],
    headerType: 'detail'
  },
  '/anti-fraud/report-165': {
    path: '/anti-fraud/report-165',
    title: '165檢舉報案',
    breadcrumbs: [
      { label: '首頁', path: '/' },
      { label: '打詐防騙', path: '/anti-fraud' },
      { label: '165檢舉報案' }
    ],
    headerType: 'detail'
  },
  '/traffic': {
    path: '/traffic',
    title: '交通服務',
    breadcrumbs: [
      { label: '首頁', path: '/' },
      { label: '交通服務' }
    ],
    headerType: 'detail'
  },
  '/query': {
    path: '/query',
    title: '查詢服務',
    breadcrumbs: [
      { label: '首頁', path: '/' },
      { label: '查詢服務' }
    ],
    headerType: 'detail'
  },
  '/application': {
    path: '/application',
    title: '申請服務',
    breadcrumbs: [
      { label: '首頁', path: '/' },
      { label: '申請服務' }
    ],
    headerType: 'detail'
  },
  '/information': {
    path: '/information',
    title: '資訊服務',
    breadcrumbs: [
      { label: '首頁', path: '/' },
      { label: '資訊服務' }
    ],
    headerType: 'detail'
  },
  '/traffic/road-inquiry': {
    path: '/traffic/road-inquiry',
    title: '查詢路況',
    breadcrumbs: [
      { label: '首頁', path: '/' },
      { label: '交通服務', path: '/traffic' },
      { label: '查詢路況' }
    ],
    headerType: 'detail'
  },
  '/traffic/road-report': {
    path: '/traffic/road-report',
    title: '通報路況',
    breadcrumbs: [
      { label: '首頁', path: '/' },
      { label: '交通服務', path: '/traffic' },
      { label: '通報路況' }
    ],
    headerType: 'detail'
  },
  '/traffic/speed-camera': {
    path: '/traffic/speed-camera',
    title: '測速點查詢',
    breadcrumbs: [
      { label: '首頁', path: '/' },
      { label: '交通服務', path: '/traffic' },
      { label: '測速點查詢' }
    ],
    headerType: 'detail'
  },
  '/traffic/car-damage': {
    path: '/traffic/car-damage',
    title: '車損事故處理',
    breadcrumbs: [
      { label: '首頁', path: '/' },
      { label: '交通服務', path: '/traffic' },
      { label: '車損事故處理' }
    ],
    headerType: 'detail'
  },
  '/traffic/accident-application': {
    path: '/traffic/accident-application',
    title: '交通事故資料申請',
    breadcrumbs: [
      { label: '首頁', path: '/' },
      { label: '交通服務', path: '/traffic' },
      { label: '交通事故資料申請' }
    ],
    headerType: 'detail'
  },
  '/traffic/towing-inquiry': {
    path: '/traffic/towing-inquiry',
    title: '違規拖吊查詢',
    breadcrumbs: [
      { label: '首頁', path: '/' },
      { label: '交通服務', path: '/traffic' },
      { label: '違規拖吊查詢' }
    ],
    headerType: 'detail'
  },
  '/traffic/call-taxi': {
    path: '/traffic/call-taxi',
    title: '呼叫計程車',
    breadcrumbs: [
      { label: '首頁', path: '/' },
      { label: '交通服務', path: '/traffic' },
      { label: '呼叫計程車' }
    ],
    headerType: 'detail'
  },
  '/anti-fraud/suspicious-analysis': {
    path: '/anti-fraud/suspicious-analysis',
    title: '可疑訊息分析',
    breadcrumbs: [
      { label: '首頁', path: '/' },
      { label: '打詐防騙', path: '/anti-fraud' },
      { label: '可疑訊息分析' }
    ],
    headerType: 'detail'
  },
  '/anti-fraud/dashboard': {
    path: '/anti-fraud/dashboard',
    title: '打詐儀錶板',
    breadcrumbs: [
      { label: '首頁', path: '/' },
      { label: '打詐防騙', path: '/anti-fraud' },
      { label: '打詐儀錶板' }
    ],
    headerType: 'detail'
  },
  '/anti-fraud/prevention/news': {
    path: '/anti-fraud/prevention/news',
    title: '新聞快訊',
    breadcrumbs: [
      { label: '首頁', path: '/' },
      { label: '打詐防騙', path: '/anti-fraud' },
      { label: '新聞快訊' }
    ],
    headerType: 'detail'
  },
  '/anti-fraud/prevention/qa': {
    path: '/anti-fraud/prevention/qa',
    title: '反詐騙QA',
    breadcrumbs: [
      { label: '首頁', path: '/' },
      { label: '打詐防騙', path: '/anti-fraud' },
      { label: '反詐騙QA' }
    ],
    headerType: 'detail'
  },
  '/anti-fraud/prevention/high-risk-companies': {
    path: '/anti-fraud/prevention/high-risk-companies',
    title: '高風險業者',
    breadcrumbs: [
      { label: '首頁', path: '/' },
      { label: '打詐防騙', path: '/anti-fraud' },
      { label: '高風險業者' }
    ],
    headerType: 'detail'
  },
  '/anti-fraud/prevention/fake-investment': {
    path: '/anti-fraud/prevention/fake-investment',
    title: '假投資網站',
    breadcrumbs: [
      { label: '首頁', path: '/' },
      { label: '打詐防騙', path: '/anti-fraud' },
      { label: '假投資網站' }
    ],
    headerType: 'detail'
  },
  // 查詢服務子頁面
  '/query/case-inquiry': {
    path: '/query/case-inquiry',
    title: '受理案件查詢',
    breadcrumbs: [
      { label: '首頁', path: '/' },
      { label: '查詢服務', path: '/query' },
      { label: '受理案件查詢' }
    ],
    headerType: 'detail'
  },
  '/query/missing-person': {
    path: '/query/missing-person',
    title: '失蹤人口查詢',
    breadcrumbs: [
      { label: '首頁', path: '/' },
      { label: '查詢服務', path: '/query' },
      { label: '失蹤人口查詢' }
    ],
    headerType: 'detail'
  },
  '/query/wanted-platform': {
    path: '/query/wanted-platform',
    title: '通緝犯查詢平臺',
    breadcrumbs: [
      { label: '首頁', path: '/' },
      { label: '查詢服務', path: '/query' },
      { label: '通緝犯查詢平臺' }
    ],
    headerType: 'detail'
  },
  '/query/stolen-vehicle': {
    path: '/query/stolen-vehicle',
    title: '失竊車輛查詢',
    breadcrumbs: [
      { label: '首頁', path: '/' },
      { label: '查詢服務', path: '/query' },
      { label: '失竊車輛查詢' }
    ],
    headerType: 'detail'
  },
  '/query/radio-search': {
    path: '/query/radio-search',
    title: '警廣協尋失車',
    breadcrumbs: [
      { label: '首頁', path: '/' },
      { label: '查詢服務', path: '/query' },
      { label: '警廣協尋失車' }
    ],
    headerType: 'detail'
  },
  '/query/lost-found': {
    path: '/query/lost-found',
    title: '拾得遺失物',
    breadcrumbs: [
      { label: '首頁', path: '/' },
      { label: '查詢服務', path: '/query' },
      { label: '拾得遺失物' }
    ],
    headerType: 'detail'
  },
  // 申請服務子頁面
  '/application/police-record': {
    path: '/application/police-record',
    title: '警察刑事紀錄證明書',
    breadcrumbs: [
      { label: '首頁', path: '/' },
      { label: '申請服務', path: '/application' },
      { label: '警察刑事紀錄證明書' }
    ],
    headerType: 'detail'
  },
  '/application/mountain-permit': {
    path: '/application/mountain-permit',
    title: '入山申請',
    breadcrumbs: [
      { label: '首頁', path: '/' },
      { label: '申請服務', path: '/application' },
      { label: '入山申請' }
    ],
    headerType: 'detail'
  },
  '/application/missing-person-radio': {
    path: '/application/missing-person-radio',
    title: '警廣協尋失蹤人口',
    breadcrumbs: [
      { label: '首頁', path: '/' },
      { label: '申請服務', path: '/application' },
      { label: '警廣協尋失蹤人口' }
    ],
    headerType: 'detail'
  },
  // 資訊服務子頁面
  '/information/push-notification': {
    path: '/information/push-notification',
    title: '推播訊息',
    breadcrumbs: [
      { label: '首頁', path: '/' },
      { label: '資訊服務', path: '/information' },
      { label: '推播訊息' }
    ],
    headerType: 'detail'
  },
  '/information/police-radio': {
    path: '/information/police-radio',
    title: '收聽警廣',
    breadcrumbs: [
      { label: '首頁', path: '/' },
      { label: '資訊服務', path: '/information' },
      { label: '收聽警廣' }
    ],
    headerType: 'detail'
  },
  '/information/dispute-clarification': {
    path: '/information/dispute-clarification',
    title: '警政爭議訊息澄清',
    breadcrumbs: [
      { label: '首頁', path: '/' },
      { label: '資訊服務', path: '/information' },
      { label: '警政爭議訊息澄清' }
    ],
    headerType: 'detail'
  },
  '/information/flight-safety': {
    path: '/information/flight-safety',
    title: '出境飛安須知',
    breadcrumbs: [
      { label: '首頁', path: '/' },
      { label: '資訊服務', path: '/information' },
      { label: '出境飛安須知' }
    ],
    headerType: 'detail'
  },
  '/information/administrative-info': {
    path: '/information/administrative-info',
    title: '法規與行政資訊',
    breadcrumbs: [
      { label: '首頁', path: '/' },
      { label: '資訊服務', path: '/information' },
      { label: '法規與行政資訊' }
    ],
    headerType: 'detail'
  },
  '/information/police-regulations': {
    path: '/information/police-regulations',
    title: '警察法規',
    breadcrumbs: [
      { label: '首頁', path: '/' },
      { label: '資訊服務', path: '/information' },
      { label: '警察法規' }
    ],
    headerType: 'detail'
  },
  '/information/drunk-driving-law': {
    path: '/information/drunk-driving-law',
    title: '酒駕法令',
    breadcrumbs: [
      { label: '首頁', path: '/' },
      { label: '資訊服務', path: '/information' },
      { label: '酒駕法令' }
    ],
    headerType: 'detail'
  },
  '/information/police-medical': {
    path: '/information/police-medical',
    title: '警察醫療方案',
    breadcrumbs: [
      { label: '首頁', path: '/' },
      { label: '資訊服務', path: '/information' },
      { label: '警察醫療方案' }
    ],
    headerType: 'detail'
  },
  '/information/law-enforcement': {
    path: '/information/law-enforcement',
    title: '執法機關',
    breadcrumbs: [
      { label: '首頁', path: '/' },
      { label: '資訊服務', path: '/information' },
      { label: '執法機關' }
    ],
    headerType: 'detail'
  },
  '/information/npa-director-fb': {
    path: '/information/npa-director-fb',
    title: 'NPA署長室FB',
    breadcrumbs: [
      { label: '首頁', path: '/' },
      { label: '資訊服務', path: '/information' },
      { label: 'NPA署長室FB' }
    ],
    headerType: 'detail'
  },
  // 緊急服務子頁面
  '/emergency/air-raid': {
    path: '/emergency/air-raid',
    title: '防空避難',
    breadcrumbs: [
      { label: '首頁', path: '/' },
      { label: '防空避難' }
    ],
    headerType: 'detail'
  },
  '/emergency/travel-safety': {
    path: '/emergency/travel-safety',
    title: '守護出行',
    breadcrumbs: [
      { label: '首頁', path: '/' },
      { label: '守護出行' }
    ],
    headerType: 'detail'
  },
  // 使用攻略子頁面
  '/user-guide/privacy-policy': {
    path: '/user-guide/privacy-policy',
    title: '隱私權政策',
    breadcrumbs: [
      { label: '首頁', path: '/' },
      { label: '隱私權政策' }
    ],
    headerType: 'detail'
  },
  '/user-guide/push-settings': {
    path: '/user-guide/push-settings',
    title: '推播設定',
    breadcrumbs: [
      { label: '首頁', path: '/' },
      { label: '推播設定' }
    ],
    headerType: 'detail'
  },
  '/user-guide/user-authentication': {
    path: '/user-guide/user-authentication',
    title: '使用者認證',
    breadcrumbs: [
      { label: '首頁', path: '/' },
      { label: '使用者認證' }
    ],
    headerType: 'detail'
  },
  '/user-guide/operation-guide': {
    path: '/user-guide/operation-guide',
    title: '操作指南',
    breadcrumbs: [
      { label: '首頁', path: '/' },
      { label: '操作指南' }
    ],
    headerType: 'detail'
  }
};

// 動態生成路由配置的函數
const generateRouteConfig = (path: string): RouteConfig => {
  const segments = path.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [{ label: '首頁', path: '/' }];
  
  let currentPath = '';
  for (let i = 0; i < segments.length - 1; i++) {
    currentPath += '/' + segments[i];
    const config = routeConfigs[currentPath];
    if (config) {
      breadcrumbs.push({ label: config.title, path: currentPath });
    }
  }
  
  // 添加當前頁面（不含路徑）
  const lastSegment = segments[segments.length - 1];
  const title = lastSegment.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
  
  breadcrumbs.push({ label: title });

  return {
    path,
    title,
    breadcrumbs,
    headerType: 'detail'
  };
};

// 初始狀態
const initialState: NavigationState = {
  currentPath: '/',
  navigationStack: [{ path: '/', title: '首頁', timestamp: Date.now() }],
  breadcrumbs: []
};

// Action 類型
type NavigationAction = 
  | { type: 'NAVIGATE_TO'; path: string; title?: string }
  | { type: 'NAVIGATE_FROM_SIDEBAR'; path: string; customBreadcrumbs?: BreadcrumbItem[] }
  | { type: 'GO_BACK' }
  | { type: 'RESET_TO_HOME' };

// 生成統一的三層麵包屑
const generateUnifiedBreadcrumbs = (path: string): BreadcrumbItem[] => {
  // 統一的路徑映射，確保三層結構
  const pathMappings: Record<string, BreadcrumbItem[]> = {
    // 打詐防騙相關
    '/anti-fraud/report-165': [
      { label: '首頁', path: '/' },
      { label: '打詐防騙', path: '/anti-fraud' },
      { label: '165檢舉報案' }
    ],
    '/anti-fraud/suspicious-analysis': [
      { label: '首頁', path: '/' },
      { label: '打詐防騙', path: '/anti-fraud' },
      { label: '可疑訊息分析' }
    ],
    '/anti-fraud/dashboard': [
      { label: '首頁', path: '/' },
      { label: '打詐防騙', path: '/anti-fraud' },
      { label: '打詐儀錶板' }
    ],
    '/anti-fraud/prevention/news': [
      { label: '首頁', path: '/' },
      { label: '打詐防騙', path: '/anti-fraud' },
      { label: '新聞快訊' }
    ],
    '/anti-fraud/prevention/qa': [
      { label: '首頁', path: '/' },
      { label: '打詐防騙', path: '/anti-fraud' },
      { label: '反詐騙QA' }
    ],
    '/anti-fraud/prevention/high-risk-companies': [
      { label: '首頁', path: '/' },
      { label: '打詐防騙', path: '/anti-fraud' },
      { label: '高風險業者' }
    ],
    '/anti-fraud/prevention/fake-investment': [
      { label: '首頁', path: '/' },
      { label: '打詐防騙', path: '/anti-fraud' },
      { label: '假投資網站' }
    ],
    // 交通服務相關
    '/traffic/road-inquiry': [
      { label: '首頁', path: '/' },
      { label: '交通服務', path: '/traffic' },
      { label: '查詢路況' }
    ],
    '/traffic/road-report': [
      { label: '首頁', path: '/' },
      { label: '交通服務', path: '/traffic' },
      { label: '通報路況' }
    ],
    '/traffic/speed-camera': [
      { label: '首頁', path: '/' },
      { label: '交通服務', path: '/traffic' },
      { label: '測速點查詢' }
    ],
    '/traffic/car-damage': [
      { label: '首頁', path: '/' },
      { label: '交通服務', path: '/traffic' },
      { label: '車損事故處理' }
    ],
    '/traffic/accident-application': [
      { label: '首頁', path: '/' },
      { label: '交通服務', path: '/traffic' },
      { label: '交通事故資料申請' }
    ],
    '/traffic/towing-inquiry': [
      { label: '首頁', path: '/' },
      { label: '交通服務', path: '/traffic' },
      { label: '違規拖吊查詢' }
    ],
    '/traffic/call-taxi': [
      { label: '首頁', path: '/' },
      { label: '交通服務', path: '/traffic' },
      { label: '呼叫計程車' }
    ],
    // 查詢服務相關
    '/query/case-inquiry': [
      { label: '首頁', path: '/' },
      { label: '查詢服務', path: '/query' },
      { label: '受理案件查詢' }
    ],
    '/query/missing-person': [
      { label: '首頁', path: '/' },
      { label: '查詢服務', path: '/query' },
      { label: '失蹤人口查詢' }
    ],
    '/query/wanted-platform': [
      { label: '首頁', path: '/' },
      { label: '查詢服務', path: '/query' },
      { label: '通緝犯查詢平臺' }
    ],
    '/query/stolen-vehicle': [
      { label: '首頁', path: '/' },
      { label: '查詢服務', path: '/query' },
      { label: '失竊車輛查詢' }
    ],
    '/query/radio-search': [
      { label: '首頁', path: '/' },
      { label: '查詢服務', path: '/query' },
      { label: '警廣協尋失車' }
    ],
    '/query/lost-found': [
      { label: '首頁', path: '/' },
      { label: '查詢服務', path: '/query' },
      { label: '拾得遺失物' }
    ],
    // 申請服務相關
    '/application/police-record': [
      { label: '首頁', path: '/' },
      { label: '申請服務', path: '/application' },
      { label: '警察刑事紀錄證明書' }
    ],
    '/application/mountain-permit': [
      { label: '首頁', path: '/' },
      { label: '申請服務', path: '/application' },
      { label: '入山申請' }
    ],
    '/application/missing-person-radio': [
      { label: '首頁', path: '/' },
      { label: '申請服務', path: '/application' },
      { label: '警廣協尋失蹤人口' }
    ],
    // 資訊服務相關
    '/information/push-notification': [
      { label: '首頁', path: '/' },
      { label: '資訊服務', path: '/information' },
      { label: '推播訊息' }
    ],
    '/information/police-radio': [
      { label: '首頁', path: '/' },
      { label: '資訊服務', path: '/information' },
      { label: '收聽警廣' }
    ],
    '/information/dispute-clarification': [
      { label: '首頁', path: '/' },
      { label: '資訊服務', path: '/information' },
      { label: '警政爭議訊息澄清' }
    ],
    '/information/flight-safety': [
      { label: '首頁', path: '/' },
      { label: '資訊服務', path: '/information' },
      { label: '出境飛安須知' }
    ],
    '/information/administrative-info': [
      { label: '首頁', path: '/' },
      { label: '資訊服務', path: '/information' },
      { label: '法規與行政資訊' }
    ],
    '/information/police-regulations': [
      { label: '首頁', path: '/' },
      { label: '資訊服務', path: '/information' },
      { label: '警察法規' }
    ],
    '/information/drunk-driving-law': [
      { label: '首頁', path: '/' },
      { label: '資訊服務', path: '/information' },
      { label: '酒駕法令' }
    ],
    '/information/police-medical': [
      { label: '首頁', path: '/' },
      { label: '資訊服務', path: '/information' },
      { label: '警察醫療方案' }
    ],
    '/information/law-enforcement': [
      { label: '首頁', path: '/' },
      { label: '資訊服務', path: '/information' },
      { label: '執法機關' }
    ],
    '/information/npa-director-fb': [
      { label: '首頁', path: '/' },
      { label: '資訊服務', path: '/information' },
      { label: 'NPA署長室FB' }
    ],
    // 緊急服務相關
    '/emergency/air-raid': [
      { label: '首頁', path: '/' },
      { label: '防空避難' }
    ],
    '/emergency/travel-safety': [
      { label: '首頁', path: '/' },
      { label: '守護出行' }
    ]
  };

  return pathMappings[path] || routeConfigs[path]?.breadcrumbs || [];
};

// Reducer
function navigationReducer(state: NavigationState, action: NavigationAction): NavigationState {
  switch (action.type) {
    case 'NAVIGATE_TO': {
      let routeConfig = routeConfigs[action.path];
      if (!routeConfig) {
        // 如果沒有預定義的路由配置，動態生成一個
        routeConfig = generateRouteConfig(action.path);
      }

      const newStackItem: NavigationStackItem = {
        path: action.path,
        title: action.title || routeConfig.title,
        timestamp: Date.now()
      };

      // 檢查是否已在堆疊中，如果是則移除後續項目
      const existingIndex = state.navigationStack.findIndex(item => item.path === action.path);
      let newStack: NavigationStackItem[];
      
      if (existingIndex >= 0) {
        newStack = [...state.navigationStack.slice(0, existingIndex + 1)];
        newStack[existingIndex] = newStackItem;
      } else {
        newStack = [...state.navigationStack, newStackItem];
      }

      return {
        currentPath: action.path,
        navigationStack: newStack,
        breadcrumbs: routeConfig.breadcrumbs
      };
    }

    case 'NAVIGATE_FROM_SIDEBAR': {
      let routeConfig = routeConfigs[action.path];
      if (!routeConfig) {
        // 如果沒有預定義的路由配置，動態生成一個
        routeConfig = generateRouteConfig(action.path);
      }

      const newStackItem: NavigationStackItem = {
        path: action.path,
        title: routeConfig.title,
        timestamp: Date.now()
      };

      // 檢查是否已在堆疊中，如果是則移除後續項目
      const existingIndex = state.navigationStack.findIndex(item => item.path === action.path);
      let newStack: NavigationStackItem[];
      
      if (existingIndex >= 0) {
        newStack = [...state.navigationStack.slice(0, existingIndex + 1)];
        newStack[existingIndex] = newStackItem;
      } else {
        newStack = [...state.navigationStack, newStackItem];
      }

      // 使用統一的三層麵包屑
      const unifiedBreadcrumbs = action.customBreadcrumbs || generateUnifiedBreadcrumbs(action.path);

      return {
        currentPath: action.path,
        navigationStack: newStack,
        breadcrumbs: unifiedBreadcrumbs
      };
    }

    case 'GO_BACK': {
      if (state.navigationStack.length <= 1) {
        return state; // 已在首頁，無法返回
      }

      const newStack = state.navigationStack.slice(0, -1);
      const previousItem = newStack[newStack.length - 1];
      const routeConfig = routeConfigs[previousItem.path];

      return {
        currentPath: previousItem.path,
        navigationStack: newStack,
        breadcrumbs: routeConfig?.breadcrumbs || []
      };
    }

    case 'RESET_TO_HOME': {
      return {
        currentPath: '/',
        navigationStack: [{ path: '/', title: '首頁', timestamp: Date.now() }],
        breadcrumbs: []
      };
    }

    default:
      return state;
  }
}

// Context
interface NavigationContextType {
  state: NavigationState;
  navigateTo: (path: string, title?: string) => void;
  navigateFromSidebar: (path: string, customBreadcrumbs?: BreadcrumbItem[]) => void;
  goBack: () => void;
  resetToHome: () => void;
  getCurrentRouteConfig: () => RouteConfig | undefined;
  canGoBack: () => boolean;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

// Provider
export function NavigationProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(navigationReducer, initialState);

  const navigateTo = (path: string, title?: string) => {
    dispatch({ type: 'NAVIGATE_TO', path, title });
  };

  const navigateFromSidebar = (path: string, customBreadcrumbs?: BreadcrumbItem[]) => {
    dispatch({ type: 'NAVIGATE_FROM_SIDEBAR', path, customBreadcrumbs });
  };

  const goBack = () => {
    dispatch({ type: 'GO_BACK' });
  };

  const resetToHome = () => {
    dispatch({ type: 'RESET_TO_HOME' });
  };

  const getCurrentRouteConfig = () => {
    return routeConfigs[state.currentPath];
  };

  const canGoBack = () => {
    return state.navigationStack.length > 1;
  };

  const value = {
    state,
    navigateTo,
    navigateFromSidebar,
    goBack,
    resetToHome,
    getCurrentRouteConfig,
    canGoBack
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

// Hook
export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}