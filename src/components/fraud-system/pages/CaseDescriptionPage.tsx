import { useFraudForm } from '../FraudFormContext';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Input } from '../../ui/input';

export function CaseDescriptionPage() {
  const { state, dispatch } = useFraudForm();

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ 
      type: 'SET_FIELD', 
      field: 'description', 
      value: e.target.value 
    });
  };

  const handleOrganizationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ 
      type: 'SET_FIELD', 
      field: 'relatedOrganization', 
      value: e.target.value 
    });
  };

  const remainingChars = 500 - state.description.length;

  return (
    <div className="p-5 space-y-6">
      <h2 className="text-xl font-semibold" style={{ color: '#1C1C1E' }}>
        案情補充說明
      </h2>

      {/* 詳細說明 */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          詳細說明 <span className="text-red-500">*</span>
        </Label>
        <div className="space-y-2">
          <Textarea
            placeholder="請詳細描述詐騙經過，包括：
• 對方如何聯繫您
• 對方說了什麼內容
• 您採取了什麼行動
• 發生了什麼損失
• 其他重要細節"
            value={state.description}
            onChange={handleDescriptionChange}
            className="min-h-[200px] resize-none"
            maxLength={500}
          />
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">
              建議詳細描述詐騙手法和經過，有助於警方調查
            </span>
            <span 
              className={`${
                remainingChars < 50 ? 'text-red-500' : 'text-gray-500'
              }`}
            >
              {state.description.length}/500
            </span>
          </div>
        </div>
      </div>

      {/* 相關單位 */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          相關單位（選填）
        </Label>
        <Input
          placeholder="如有涉及特定機構或被假冒單位，請填寫（例：假冒中華電信客服）"
          value={state.relatedOrganization}
          onChange={handleOrganizationChange}
        />
        <p className="text-sm text-gray-500">
          例如：假冒銀行客服、假冒政府機關、假冒電信業者等
        </p>
      </div>

      {/* 填寫範例 */}
      <div className="p-4 bg-blue-50 rounded-md border border-blue-200">
        <h4 className="font-medium text-blue-800 mb-3">填寫範例</h4>
        <div className="text-sm text-blue-700 space-y-2">
          <p><strong>詐騙經過：</strong></p>
          <p>「今天下午2點接到自稱中華電信客服的電話，對方說我的門號涉及詐騙案件，需要配合調查。要求我提供個人資料和銀行帳戶資訊，並要求我到ATM操作轉帳...」</p>
          
          <p className="mt-3"><strong>相關單位：</strong></p>
          <p>「假冒中華電信客服」</p>
        </div>
      </div>

      {/* 提醒事項 */}
      <div className="p-4 bg-yellow-50 rounded-md border border-yellow-200">
        <h4 className="font-medium text-yellow-800 mb-2">重要提醒</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• 請盡量詳細描述，有助於警方辦案</li>
          <li>• 如有時間軸，請按順序說明</li>
          <li>• 避免填寫個人敏感資訊（如完整帳號密碼）</li>
          <li>• 如需要可在檔案上傳頁面補充相關證據</li>
        </ul>
      </div>
    </div>
  );
}