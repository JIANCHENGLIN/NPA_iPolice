import { useState, useEffect } from 'react';
import { useFraudForm } from '../FraudFormContext';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { fraudTypesData } from '../../../data/fraudTypes';
import { Search } from 'lucide-react';

export function CaseSummaryPage() {
  const { state, dispatch } = useFraudForm();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTypes, setFilteredTypes] = useState<string[]>([]);

  // 搜尋詐騙手法
  useEffect(() => {
    if (!searchTerm) {
      setFilteredTypes([]);
      return;
    }

    const results: string[] = [];
    fraudTypesData.categories.forEach(category => {
      category.items.forEach(item => {
        if (item.toLowerCase().includes(searchTerm.toLowerCase())) {
          results.push(item);
        }
      });
    });
    setFilteredTypes(results);
  }, [searchTerm]);

  const handleVictimStatusChange = (value: string) => {
    dispatch({ 
      type: 'SET_FIELD', 
      field: 'isVictim', 
      value: value === 'yes' 
    });
  };

  const handleFraudTypeChange = (value: string) => {
    dispatch({ 
      type: 'SET_FIELD', 
      field: 'fraudType', 
      value 
    });
    setSearchTerm(''); // 清除搜尋
    setFilteredTypes([]);
  };

  const handleSearchSelect = (fraudType: string) => {
    dispatch({ 
      type: 'SET_FIELD', 
      field: 'fraudType', 
      value: fraudType 
    });
    setSearchTerm('');
    setFilteredTypes([]);
  };

  const handleFraudChannelChange = (value: string) => {
    dispatch({ 
      type: 'SET_FIELD', 
      field: 'fraudChannel', 
      value 
    });
    // 如果不是選擇其他，清空其他詐騙管道的輸入
    if (value !== '其他') {
      dispatch({ 
        type: 'SET_FIELD', 
        field: 'otherFraudChannel', 
        value: '' 
      });
    }
  };

  const handleOtherChannelChange = (value: string) => {
    dispatch({ 
      type: 'SET_FIELD', 
      field: 'otherFraudChannel', 
      value 
    });
  };

  const fraudChannelOptions = [
    '接獲歹徒電話',
    '接獲手機簡訊',
    '接獲書面文件',
    '接獲電話語音',
    '網路詐騙',
    '直接與人交往',
    '其他'
  ];

  return (
    <div className="p-5 space-y-6">
      <h2 className="text-xl font-semibold" style={{ color: '#1C1C1E' }}>
        案情摘要
      </h2>

      {/* 受騙狀態確認 */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          您是否已遭受詐騙？ <span className="text-red-500">*</span>
        </Label>
        <RadioGroup 
          value={state.isVictim === null ? '' : state.isVictim ? 'yes' : 'no'}
          onValueChange={handleVictimStatusChange}
          className="space-y-2"
        >
          <div className={`flex items-center space-x-3 p-3 rounded-lg border-2 transition-colors ${
            state.isVictim === true 
              ? 'border-blue-500 bg-blue-50' 
              : state.isVictim === null 
                ? 'border-gray-200 bg-gray-50' 
                : 'border-gray-200 bg-white'
          }`}>
            <RadioGroupItem value="yes" id="victim-yes" />
            <Label htmlFor="victim-yes" className="cursor-pointer">是（已受騙）</Label>
          </div>
          <div className={`flex items-center space-x-3 p-3 rounded-lg border-2 transition-colors ${
            state.isVictim === false 
              ? 'border-blue-500 bg-blue-50' 
              : state.isVictim === null 
                ? 'border-gray-200 bg-gray-50' 
                : 'border-gray-200 bg-white'
          }`}>
            <RadioGroupItem value="no" id="victim-no" />
            <Label htmlFor="victim-no" className="cursor-pointer">否（未受騙，僅檢舉）</Label>
          </div>
        </RadioGroup>
      </div>

      {/* 詐騙手法分類選擇 */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          詐騙手法分類 <span className="text-red-500">*</span>
        </Label>
        
        {/* 搜尋框 */}
        <div className="relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="搜尋詐騙手法（如：投資、網拍等）"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 bg-white border border-gray-300"
            />
          </div>
          
          {/* 搜尋結果 */}
          {filteredTypes.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
              {filteredTypes.map((type, index) => (
                <button
                  key={index}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                  onClick={() => handleSearchSelect(type)}
                >
                  <span 
                    dangerouslySetInnerHTML={{
                      __html: type.replace(
                        new RegExp(searchTerm, 'gi'),
                        (match) => `<mark class="bg-yellow-200">${match}</mark>`
                      )
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 分類選擇器 */}
        <Select value={state.fraudType} onValueChange={handleFraudTypeChange}>
          <SelectTrigger>
            <SelectValue placeholder="請選擇詐騙手法分類" />
          </SelectTrigger>
          <SelectContent>
            {fraudTypesData.categories.map(category => (
              <div key={category.id}>
                <div className="px-2 py-1 text-sm font-medium text-gray-500 bg-gray-50">
                  {category.name}
                </div>
                {category.items.map(item => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </div>
            ))}
          </SelectContent>
        </Select>

        {/* 已選擇的詐騙手法 */}
        {state.fraudType && (
          <div className="p-3 bg-blue-50 rounded-md border border-blue-200">
            <div className="text-sm text-blue-800">
              <strong>已選擇：</strong>{state.fraudType}
            </div>
          </div>
        )}
      </div>

      {/* 詐騙管道 */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          詐騙管道 <span className="text-red-500">*</span>
        </Label>
        <RadioGroup 
          value={state.fraudChannel}
          onValueChange={handleFraudChannelChange}
          className="space-y-2"
        >
          {fraudChannelOptions.map((option) => (
            <div 
              key={option} 
              className={`flex items-center space-x-3 p-3 rounded-lg border-2 transition-colors ${
                state.fraudChannel === option 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <RadioGroupItem value={option} id={`channel-${option}`} />
              <Label htmlFor={`channel-${option}`} className="cursor-pointer flex-1">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
        
        {/* 其他詐騙管道輸入框 */}
        {state.fraudChannel === '其他' && (
          <div className="mt-3">
            <Input
              placeholder="請輸入其他詐騙管道"
              value={state.otherFraudChannel}
              onChange={(e) => handleOtherChannelChange(e.target.value)}
              className="w-full bg-white border border-gray-300"
            />
          </div>
        )}
      </div>

      {/* 填寫提示 */}
      <div className="p-4 bg-gray-50 rounded-md">
        <p className="text-sm text-gray-600">
          <strong>填寫提示：</strong><br />
          • 標有 <span className="text-red-500">*</span> 的欄位為必填<br />
          • 可使用搜尋功能快速找到詐騙手法<br />
          • 如不確定分類，可選擇「其他類」<br />
          • 請根據實際情況選擇詐騙管道
        </p>
      </div>
    </div>
  );
}