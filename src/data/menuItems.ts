import { MenuItem } from '../types/navigation';

export const sidebarMenuItems: MenuItem[] = [
  {
    id: 'emergency',
    label: '緊急服務',
    path: '/emergency',
    children: [
      {
        id: 'report-services',
        label: '報案服務',
        children: [
          { id: 'call-110', label: '110電話報案', type: 'phone', phone: '110' },
          { id: 'call-113', label: '113保護專線', type: 'phone', phone: '113' },
          { id: 'call-165', label: '165反詐專線', type: 'phone', phone: '165' }
        ]
      },
      {
        id: 'air-raid-shelter',
        label: '防空避難',
        path: '/emergency/air-raid'
      },
      {
        id: 'travel-safety',
        label: '守護出行',
        path: '/emergency/travel-safety'
      }
    ]
  },
  {
    id: 'anti-fraud',
    label: '打詐防騙',
    path: '/anti-fraud',
    children: [
      { id: 'report-165', label: '165檢舉/報案', path: '/anti-fraud/report-165' },
      { id: 'suspicious-message', label: '可疑訊息分析', path: '/anti-fraud/suspicious-analysis' },
      { id: 'anti-fraud-dashboard', label: '打詐儀錶板', path: '/anti-fraud/dashboard' },
      {
        id: 'fraud-prevention-info',
        label: '防詐資訊',
        children: [
          { id: 'news', label: '新聞快訊', path: '/anti-fraud/prevention/news' },
          { id: 'fraud-qa', label: '反詐騙QA', path: '/anti-fraud/prevention/qa' },
          { id: 'high-risk-operators', label: '高風險業者', path: '/anti-fraud/prevention/high-risk-companies' },
          { id: 'fake-investment-sites', label: '假投資網站', path: '/anti-fraud/prevention/fake-investment' }
        ]
      }
    ]
  },
  {
    id: 'traffic',
    label: '交通服務',
    path: '/traffic',
    children: [
      {
        id: 'road-conditions',
        label: '路況資訊',
        children: [
          { id: 'road-inquiry', label: '查詢路況', path: '/traffic/road-inquiry' },
          { id: 'road-report', label: '通報路況', path: '/traffic/road-report' },
          { id: 'speed-camera', label: '測速點查詢', path: '/traffic/speed-camera' }
        ]
      },
      {
        id: 'traffic-accidents',
        label: '交通事故',
        children: [
          { id: 'car-damage', label: '車損事故處理', path: '/traffic/car-damage' },
          { id: 'accident-application', label: '交通事故資料申請', path: '/traffic/accident-application' }
        ]
      },
      {
        id: 'violation-handling',
        label: '違規處理',
        children: [
          { id: 'towing-inquiry', label: '違規拖吊查詢', path: '/traffic/towing-inquiry' },
          { id: 'call-taxi', label: '呼叫計程車', path: '/traffic/call-taxi' }
        ]
      }
    ]
  },
  {
    id: 'query',
    label: '查詢服務',
    path: '/query',
    children: [
      {
        id: 'case-inquiry',
        label: '案件查詢',
        children: [
          { id: 'case-progress', label: '受理案件查詢', path: '/query/case-inquiry' },
          { id: 'missing-person', label: '失蹤人口查詢', path: '/query/missing-person' },
          { id: 'wanted-criminal', label: '通緝犯查詢平臺', path: '/query/wanted-platform' }
        ]
      },
      {
        id: 'vehicle-theft',
        label: '車輛失竊',
        children: [
          { id: 'stolen-vehicle', label: '失竊車輛查詢', path: '/query/stolen-vehicle' },
          { id: 'radio-assistance', label: '警廣協尋失車', path: '/query/radio-search' }
        ]
      },
      {
        id: 'lost-found',
        label: '拾得遺失物',
        path: '/query/lost-found'
      }
    ]
  },
  {
    id: 'application',
    label: '申請服務',
    path: '/application',
    children: [
      {
        id: 'certificate-application',
        label: '證明申請',
        children: [
          { id: 'police-record', label: '警察刑事紀錄證明書', path: '/application/police-record' },
          { id: 'mountain-entry', label: '入山申請', path: '/application/mountain-permit' }
        ]
      },
      {
        id: 'radio-missing-person',
        label: '警廣協尋失蹤人口',
        path: '/application/missing-person-radio'
      }
    ]
  },
  {
    id: 'information',
    label: '資訊服務',
    path: '/information',
    children: [
      {
        id: 'information-reception',
        label: '資訊接收',
        children: [
          { id: 'push-notifications', label: '推播訊息', path: '/information/push-notification' },
          { id: 'police-radio', label: '收聽警廣', path: '/information/police-radio' },
          { id: 'dispute-clarification', label: '警政爭議訊息澄清', path: '/information/dispute-clarification' }
        ]
      },
      {
        id: 'departure-safety',
        label: '出境飛安須知',
        path: '/information/flight-safety'
      },
      {
        id: 'administrative-info-item',
        label: '法規與行政資訊',
        path: '/information/administrative-info'
      },
      {
        id: 'regulations-info',
        label: '法規與行政資訊',
        children: [
          { id: 'police-regulations', label: '警察法規', path: '/information/police-regulations' },
          { id: 'dui-laws', label: '酒駕法令', path: '/information/drunk-driving-law' },
          { id: 'police-medical', label: '警察醫療方案', path: '/information/police-medical' }
        ]
      },
      {
        id: 'agency-info',
        label: '機關資訊',
        children: [
          { id: 'law-enforcement', label: '執法機關', path: '/information/law-enforcement' },
          { id: 'npa-facebook', label: 'NPA署長室FB', path: '/information/npa-director-fb' }
        ]
      }
    ]
  },
  {
    id: 'other-apps',
    label: '其他APP',
    children: [
      {
        id: 'other-police-apps',
        label: '其他警政APP',
        children: [
          { id: 'taipei-police', label: '北市警政', type: 'external', url: 'https://apps.apple.com/tw/app/%E5%8C%97%E5%B8%82%E8%AD%A6%E6%94%BF/id598191163' },
          { id: 'new-taipei-ipolice', label: '新北iPolice', type: 'external', url: 'https://apps.apple.com/tw/app/%E6%96%B0%E5%8C%97%E5%B8%82ipolice/id529476006' },
          { id: 'taoyuan-police', label: '桃園警政', type: 'external', url: 'https://apps.apple.com/tw/app/%E6%A1%83%E5%9C%92%E8%AD%A6%E6%94%BF/id1131152588' }
        ]
      },
      {
        id: 'fire-disaster-prevention',
        label: '消防防災e點通',
        type: 'external',
        url: 'https://apps.apple.com/tw/app/%E6%B6%88%E9%98%B2%E9%98%B2%E7%81%BDe%E9%BB%9E%E9%80%9A/id1500403641'
      },
      {
        id: 'video-reporting',
        label: '視訊報案',
        type: 'external',
        url: 'https://apps.apple.com/tw/app/110%E8%A6%96%E8%A8%8A%E5%A0%B1%E6%A1%88/id1172052836'
      }
    ]
  },
  {
    id: 'user-guide',
    label: '使用攻略',
    children: [
      {
        id: 'privacy-policy',
        label: '隱私權政策',
        path: '/user-guide/privacy-policy'
      },
      {
        id: 'push-settings',
        label: '推播設定',
        path: '/user-guide/push-settings'
      },
      {
        id: 'user-authentication',
        label: '使用者認證',
        path: '/user-guide/user-authentication'
      },
      {
        id: 'operation-guide',
        label: '操作指南',
        path: '/user-guide/operation-guide'
      }
    ]
  }
];