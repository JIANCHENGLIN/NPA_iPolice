import { useFraudForm } from '../FraudFormContext';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';

export function PersonalInfoPage() {
  const { state, dispatch } = useFraudForm();

  // 身分證字號驗證
  const validateIdNumber = (id: string) => {
    const pattern = /^[A-Z][12]\d{8}$/;
    return pattern.test(id);
  };

  // 手機號碼驗證
  const validatePhone = (phone: string) => {
    const pattern = /^09\d{8}$/;
    return pattern.test(phone);
  };

  // Email驗證
  const validateEmail = (email: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const handleInputChange = (field: string, value: string) => {
    dispatch({ type: 'SET_FIELD', field: field as keyof typeof state, value });
  };

  const getValidationMessage = (field: string, value: string) => {
    switch (field) {
      case 'idNumber':
        if (value && !validateIdNumber(value)) {
          return '身分證字號格式不正確（例：A123456789）';
        }
        break;
      case 'phone':
        if (value && !validatePhone(value)) {
          return '手機號碼格式不正確（例：0912345678）';
        }
        break;
      case 'email':
        if (value && !validateEmail(value)) {
          return 'Email格式不正確';
        }
        break;
    }
    return '';
  };

  return (
    <div className="p-5 space-y-6">
      <h2 className="text-xl font-semibold" style={{ color: '#1C1C1E' }}>
        使用者基本資料
      </h2>

      {/* 姓名 */}
      <div className="space-y-2">
        <Label className="text-base font-medium">
          姓名 <span className="text-red-500">*</span>
        </Label>
        <Input
          placeholder="請輸入真實姓名"
          value={state.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
        />
      </div>

      {/* 性別 */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          性別 <span className="text-red-500">*</span>
        </Label>
        <RadioGroup 
          value={state.gender}
          onValueChange={(value) => handleInputChange('gender', value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="male" id="gender-male" />
            <Label htmlFor="gender-male">男</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="female" id="gender-female" />
            <Label htmlFor="gender-female">女</Label>
          </div>
        </RadioGroup>
      </div>

      {/* 出生年月日 */}
      <div className="space-y-2">
        <Label className="text-base font-medium">
          出生年月日 <span className="text-red-500">*</span>
        </Label>
        <Input
          type="date"
          value={state.birthDate}
          onChange={(e) => handleInputChange('birthDate', e.target.value)}
          max={new Date().toISOString().split('T')[0]} // 不能選擇未來日期
        />
      </div>

      {/* 身分證字號 */}
      <div className="space-y-2">
        <Label className="text-base font-medium">
          身分證字號 <span className="text-red-500">*</span>
        </Label>
        <Input
          placeholder="例：A123456789"
          value={state.idNumber}
          onChange={(e) => handleInputChange('idNumber', e.target.value.toUpperCase())}
          maxLength={10}
          className={
            state.idNumber && !validateIdNumber(state.idNumber) 
              ? 'border-red-500' 
              : ''
          }
        />
        {state.idNumber && (
          <p className={`text-sm ${
            validateIdNumber(state.idNumber) ? 'text-green-600' : 'text-red-500'
          }`}>
            {getValidationMessage('idNumber', state.idNumber) || '格式正確'}
          </p>
        )}
      </div>

      {/* 聯絡電話 */}
      <div className="space-y-2">
        <Label className="text-base font-medium">
          聯絡電話 <span className="text-red-500">*</span>
        </Label>
        <Input
          placeholder="例：0912345678"
          value={state.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          maxLength={10}
          className={
            state.phone && !validatePhone(state.phone) 
              ? 'border-red-500' 
              : ''
          }
        />
        {state.phone && (
          <p className={`text-sm ${
            validatePhone(state.phone) ? 'text-green-600' : 'text-red-500'
          }`}>
            {getValidationMessage('phone', state.phone) || '格式正確'}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label className="text-base font-medium">
          Email <span className="text-red-500">*</span>
        </Label>
        <Input
          type="email"
          placeholder="例：example@email.com"
          value={state.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className={
            state.email && !validateEmail(state.email) 
              ? 'border-red-500' 
              : ''
          }
        />
        {state.email && (
          <p className={`text-sm ${
            validateEmail(state.email) ? 'text-green-600' : 'text-red-500'
          }`}>
            {getValidationMessage('email', state.email) || '格式正確'}
          </p>
        )}
      </div>

      {/* 隱私聲明 */}
      <div className="p-4 bg-gray-50 rounded-md border border-gray-200">
        <h4 className="font-medium text-gray-800 mb-2">隱私保護聲明</h4>
        <p className="text-sm text-gray-600">
          您的個人資料僅用於詐騙案件調查與聯繫用途，將依據個人資料保護法進行保護。
          警政署不會將您的資料用於其他用途或提供給第三方。
        </p>
      </div>

      {/* 填寫提醒 */}
      <div className="p-4 bg-blue-50 rounded-md border border-blue-200">
        <h4 className="font-medium text-blue-800 mb-2">填寫提醒</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• 請務必填寫真實資料，以利警方聯繫調查</li>
          <li>• 身分證字號用於核實身分，不會對外公開</li>
          <li>• 聯絡電話將用於案件進度通知</li>
          <li>• Email將用於發送檢舉收據與後續通知</li>
        </ul>
      </div>
    </div>
  );
}