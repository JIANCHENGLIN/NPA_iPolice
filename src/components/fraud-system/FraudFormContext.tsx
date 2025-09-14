import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// 表單狀態介面
export interface FraudFormData {
  // 案情摘要
  isVictim: boolean | null;
  fraudType: string;
  fraudChannel: string;
  otherFraudChannel: string;
  
  // 詐騙資料
  phones: Array<{
    suspiciousPhone: string;
    victimPhone: string;
    callDate: string;
  }>;
  accounts: Array<{
    bankCode: string;
    accountNumber: string;
  }>;
  gameCards: Array<{
    company: string;
    serialNumber: string;
  }>;
  barcodes: Array<{
    code1: string;
    code2: string;
    code3: string;
  }>;
  
  // 檔案上傳
  files: File[];
  
  // 案情說明
  description: string;
  relatedOrganization: string;
  
  // 基本資料
  name: string;
  gender: 'male' | 'female' | '';
  birthDate: string;
  idNumber: string;
  phone: string;
  email: string;
  
  // 地址資訊
  currentAddress: {
    county: string;
    district: string;
    village: string;
    detail: string;
  };
  registeredAddress: {
    county: string;
    district: string;
    village: string;
    detail: string;
  };
  sameAsCurrentAddress: boolean;
  
  // 驗證
  captchaCompleted: boolean;
}

// 初始狀態
const initialState: FraudFormData = {
  isVictim: null,
  fraudType: '',
  fraudChannel: '',
  otherFraudChannel: '',
  phones: [],
  accounts: [],
  gameCards: [],
  barcodes: [],
  files: [],
  description: '',
  relatedOrganization: '',
  name: '',
  gender: '',
  birthDate: '',
  idNumber: '',
  phone: '',
  email: '',
  currentAddress: {
    county: '',
    district: '',
    village: '',
    detail: ''
  },
  registeredAddress: {
    county: '',
    district: '',
    village: '',
    detail: ''
  },
  sameAsCurrentAddress: false,
  captchaCompleted: false
};

// Action 類型
type FraudFormAction = 
  | { type: 'SET_FIELD'; field: keyof FraudFormData; value: any }
  | { type: 'ADD_PHONE'; phone: FraudFormData['phones'][0] }
  | { type: 'REMOVE_PHONE'; index: number }
  | { type: 'ADD_ACCOUNT'; account: FraudFormData['accounts'][0] }
  | { type: 'REMOVE_ACCOUNT'; index: number }
  | { type: 'ADD_GAME_CARD'; gameCard: FraudFormData['gameCards'][0] }
  | { type: 'REMOVE_GAME_CARD'; index: number }
  | { type: 'ADD_BARCODE'; barcode: FraudFormData['barcodes'][0] }
  | { type: 'REMOVE_BARCODE'; index: number }
  | { type: 'ADD_FILE'; file: File }
  | { type: 'REMOVE_FILE'; index: number }
  | { type: 'LOAD_DRAFT'; data: Partial<FraudFormData> }
  | { type: 'RESET_FORM' };

// Reducer
function fraudFormReducer(state: FraudFormData, action: FraudFormAction): FraudFormData {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    
    case 'ADD_PHONE':
      return { ...state, phones: [...state.phones, action.phone] };
    
    case 'REMOVE_PHONE':
      return { ...state, phones: state.phones.filter((_, i) => i !== action.index) };
    
    case 'ADD_ACCOUNT':
      return { ...state, accounts: [...state.accounts, action.account] };
    
    case 'REMOVE_ACCOUNT':
      return { ...state, accounts: state.accounts.filter((_, i) => i !== action.index) };
    
    case 'ADD_GAME_CARD':
      return { ...state, gameCards: [...state.gameCards, action.gameCard] };
    
    case 'REMOVE_GAME_CARD':
      return { ...state, gameCards: state.gameCards.filter((_, i) => i !== action.index) };
    
    case 'ADD_BARCODE':
      return { ...state, barcodes: [...state.barcodes, action.barcode] };
    
    case 'REMOVE_BARCODE':
      return { ...state, barcodes: state.barcodes.filter((_, i) => i !== action.index) };
    
    case 'ADD_FILE':
      return { ...state, files: [...state.files, action.file] };
    
    case 'REMOVE_FILE':
      return { ...state, files: state.files.filter((_, i) => i !== action.index) };
    
    case 'LOAD_DRAFT':
      return { ...state, ...action.data };
    
    case 'RESET_FORM':
      return initialState;
    
    default:
      return state;
  }
}

// Context
interface FraudFormContextType {
  state: FraudFormData;
  dispatch: React.Dispatch<FraudFormAction>;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  saveDraft: () => void;
  loadDraft: () => void;
}

const FraudFormContext = createContext<FraudFormContextType | undefined>(undefined);

// Provider
export function FraudFormProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(fraudFormReducer, initialState);
  const [currentPage, setCurrentPage] = React.useState(1);

  const saveDraft = () => {
    try {
      const draftData = { ...state };
      // 移除檔案因為無法序列化
      const { files, ...serializableData } = draftData;
      localStorage.setItem('fraudFormDraft', JSON.stringify(serializableData));
    } catch (error) {
      console.error('儲存草稿失敗:', error);
    }
  };

  const loadDraft = () => {
    try {
      const draft = localStorage.getItem('fraudFormDraft');
      if (draft) {
        const draftData = JSON.parse(draft);
        dispatch({ type: 'LOAD_DRAFT', data: draftData });
      }
    } catch (error) {
      console.error('載入草稿失敗:', error);
    }
  };

  const value = {
    state,
    dispatch,
    currentPage,
    setCurrentPage,
    saveDraft,
    loadDraft
  };

  return (
    <FraudFormContext.Provider value={value}>
      {children}
    </FraudFormContext.Provider>
  );
}

// Hook
export function useFraudForm() {
  const context = useContext(FraudFormContext);
  if (context === undefined) {
    throw new Error('useFraudForm must be used within a FraudFormProvider');
  }
  return context;
}