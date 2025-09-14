import { ServiceCard } from '../types/navigation';

// 打詐防騙服務卡片
export const antiFraudServices: ServiceCard[] = [
  {
    id: 'report-165',
    label: '165檢舉/報案',
    path: '/anti-fraud/report-165',
    description: '線上詐騙案件檢舉報案'
  },
  {
    id: 'suspicious-analysis',
    label: '可疑訊息分析',
    path: '/anti-fraud/suspicious-analysis',
    description: '分析可疑簡訊或網址'
  },
  {
    id: 'dashboard',
    label: '打詐儀錶板',
    path: '/anti-fraud/dashboard',
    description: '查看詐騙統計資料'
  },
  {
    id: 'news',
    label: '新聞快訊',
    path: '/anti-fraud/prevention/news',
    description: '最新反詐騙新聞'
  },
  {
    id: 'qa',
    label: '反詐騙QA',
    path: '/anti-fraud/prevention/qa',
    description: '常見詐騙問答'
  },
  {
    id: 'high-risk-companies',
    label: '高風險業者',
    path: '/anti-fraud/prevention/high-risk-companies',
    description: '高風險投資業者名單'
  },
  {
    id: 'fake-investment',
    label: '假投資網站',
    path: '/anti-fraud/prevention/fake-investment',
    description: '假投資網站黑名單'
  }
];

// 交通服務卡片
export const trafficServices: ServiceCard[] = [
  {
    id: 'query-road-info',
    label: '查詢路況',
    path: '/traffic/road-info/query',
    description: '即時路況查詢'
  },
  {
    id: 'report-road-info',
    label: '通報路況',
    path: '/traffic/road-info/report',
    description: '回報路況狀況'
  },
  {
    id: 'speed-camera',
    label: '測速點查詢',
    path: '/traffic/road-info/speed-camera',
    description: '查詢測速照相位置'
  },
  {
    id: 'accident-handling',
    label: '車損事故處理',
    path: '/traffic/accident/handling',
    description: '交通事故處理指南'
  },
  {
    id: 'accident-data',
    label: '交通事故資料申請',
    path: '/traffic/accident/data-application',
    description: '申請事故相關文件'
  },
  {
    id: 'towing-query',
    label: '違規拖吊查詢',
    path: '/traffic/violation/towing-query',
    description: '查詢車輛拖吊資訊'
  },
  {
    id: 'call-taxi',
    label: '呼叫計程車',
    path: '/traffic/violation/call-taxi',
    description: '緊急叫車服務'
  }
];

// 查詢服務卡片
export const queryServices: ServiceCard[] = [
  {
    id: 'accepted-cases',
    label: '受理案件查詢',
    path: '/query/case/accepted',
    description: '查詢案件辦理進度'
  },
  {
    id: 'missing-person',
    label: '失蹤人口查詢',
    path: '/query/case/missing-person',
    description: '失蹤人口協尋'
  },
  {
    id: 'wanted-platform',
    label: '通緝犯查詢平臺',
    path: '/query/case/wanted-platform',
    description: '通緝犯資料查詢'
  },
  {
    id: 'stolen-query',
    label: '失竊車輛查詢',
    path: '/query/vehicle/stolen-query',
    description: '查詢失竊車輛'
  },
  {
    id: 'radio-search',
    label: '警廣協尋失車',
    path: '/query/vehicle/radio-search',
    description: '廣播協尋車輛'
  },
  {
    id: 'lost-found',
    label: '拾得遺失物',
    path: '/query/lost-found',
    description: '遺失物招領查詢'
  }
];

// 申請服務卡片
export const applicationServices: ServiceCard[] = [
  {
    id: 'police-record',
    label: '警察刑事紀錄證明書',
    path: '/application/certificate/police-record',
    description: '良民證線上申請'
  },
  {
    id: 'mountain-permit',
    label: '入山申請',
    path: '/application/certificate/mountain-permit',
    description: '登山入山許可申請'
  },
  {
    id: 'missing-person-radio',
    label: '警廣協尋失蹤人口',
    path: '/application/missing-person-radio',
    description: '申請廣播協尋'
  },
  {
    id: 'assembly-permit',
    label: '集會遊行申請',
    path: '/application/assembly-permit',
    description: '集會遊行許可申請'
  },
  {
    id: 'fingerprint-elimination',
    label: '指紋建檔/排除',
    path: '/application/fingerprint-elimination',
    description: '指紋資料處理'
  },
  {
    id: 'foreign-spouse',
    label: '外籍配偶歸化',
    path: '/application/foreign-spouse',
    description: '外籍配偶歸化申請'
  }
];

// 資訊服務卡片
export const informationServices: ServiceCard[] = [
  {
    id: 'important-news',
    label: '重要公告',
    path: '/information/news/important',
    description: '重要警政公告'
  },
  {
    id: 'general-news',
    label: '一般消息',
    path: '/information/news/general',
    description: '一般警政消息'
  },
  {
    id: 'crime-prevention',
    label: '犯罪預防',
    path: '/information/safety-education/crime-prevention',
    description: '犯罪預防宣導'
  },
  {
    id: 'traffic-safety',
    label: '交通安全',
    path: '/information/safety-education/traffic-safety',
    description: '交通安全教育'
  },
  {
    id: 'home-security',
    label: '居家安全',
    path: '/information/safety-education/home-security',
    description: '居家安全防護'
  },
  {
    id: 'laws-regulations',
    label: '法規資訊',
    path: '/information/laws-regulations',
    description: '相關法規查詢'
  },
  {
    id: 'statistics',
    label: '統計資料',
    path: '/information/statistics',
    description: '警政統計資料'
  }
];