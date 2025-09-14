import { useState, useEffect } from 'react';

const messages = [
  {
    title: "重要通知",
    content: "警政署提醒您注意網路詐騙，切勿輕信陌生來電要求轉帳",
    time: "2024-03-15 10:30"
  },
  {
    title: "交通宣導",
    content: "春節連假期間，請遵守交通規則，確保行車安全",
    time: "2024-03-14 15:20"
  },
  {
    title: "防災資訊",
    content: "地震避難須知：地震發生時應立即蹲下、掩護、穩住",
    time: "2024-03-13 09:15"
  }
];

export function MessageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-[393px] h-[160px] px-5 py-4" style={{ backgroundColor: '#F8F9FA' }}>
      {/* 輪播容器 */}
      <div className="w-[353px] h-[128px] bg-white rounded-[12px] px-6 py-5 shadow-sm">
        <div className="h-full flex flex-col justify-between">
          <div>
            <h3 className="text-[16px] font-semibold mb-2" style={{ color: '#1C1C1E', lineHeight: '1.4' }}>
              {messages[currentIndex].title}
            </h3>
            <p className="text-[13px]" style={{ color: '#8E8E93', lineHeight: '1.5' }}>
              {messages[currentIndex].content}
            </p>
          </div>
          <p className="text-[13px]" style={{ color: '#A0A0A0' }}>
            {messages[currentIndex].time}
          </p>
        </div>
      </div>
      
      {/* 輪播指示器 */}
      <div className="flex justify-center mt-4 space-x-2">
        {messages.map((_, index) => (
          <button
            key={index}
            className="w-[6px] h-[6px] rounded-full transition-colors duration-200"
            style={{
              backgroundColor: index === currentIndex ? '#003087' : '#E5E5E7'
            }}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}