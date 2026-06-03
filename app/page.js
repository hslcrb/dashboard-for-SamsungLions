'use client';

import { useState, useEffect } from 'react';
import { HomeIcon, MatchIcon, RankIcon, MoreIcon, LionIcon } from '../components/Icons';

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');
  const [matchTime, setMatchTime] = useState('00:00:00');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setMatchTime(now.toLocaleTimeString('ko-KR', { hour12: false }));
    }, 1000);
    const loadingTimeout = setTimeout(() => setIsLoading(false), 500);
    return () => { clearInterval(timer); clearTimeout(loadingTimeout); };
  }, []);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', background: '#074CA1' }}>
        <div className="premium-loader"></div>
        <style jsx>{`
          .premium-loader {
            width: 40px;
            height: 40px;
            border: 3px solid rgba(255, 255, 255, 0.1);
            border-top: 3px solid #fff;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
          }
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="scroll-area animate-fade">
            <div style={{ padding: '0 0 24px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <LionIcon size={14} color="#074CA1" />
                <p style={{ color: '#074CA1', fontWeight: 'bold', fontSize: '11px', margin: 0, letterSpacing: '1px' }}>SAMSUNG LIONS FAN APP</p>
              </div>
              <h1 style={{ margin: 0 }}>삼성 라이온즈 대시보드</h1>
            </div>

            <div className="premium-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '8px', height: '8px', background: '#FF3B30', borderRadius: '50%', boxShadow: '0 0 10px rgba(255, 59, 48, 0.5)' }}></span>
                  <span style={{ fontSize: '13px', fontWeight: '800', color: '#FF3B30' }}>LIVE SCORE</span>
                </div>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#1A1A1A' }}>{matchTime}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: '#888', marginBottom: '10px' }}>SAMSUNG</div>
                  <div style={{ fontSize: '42px', color: '#074CA1', fontWeight: '900' }}>10</div>
                </div>
                <div style={{ fontSize: '18px', fontWeight: '200', color: '#EEE' }}>VS</div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: '#888', marginBottom: '10px' }}>LG</div>
                  <div style={{ fontSize: '42px', color: '#333', fontWeight: '900' }}>4</div>
                </div>
              </div>
              <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #F5F5F5' }}>
                <p style={{ fontSize: '12px', textAlign: 'center', color: '#999' }}>2026.06.03 | 대구 삼성 라이온즈 파크</p>
              </div>
            </div>

            <div className="premium-card">
              <h2 style={{ fontSize: '16px', marginBottom: '20px' }}>팬 커뮤니티 실시간 반응</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { user: "라이온즈팬", text: "오늘 경기 타선 폭발했네 시원하다!" },
                  { user: "블루피", text: "올해는 진짜 다르다 우승 가자" },
                  { user: "라팍지기", text: "오늘 경기장 분위기 미쳤음 ㅋㅋ" }
                ].map((post, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ width: '32px', height: '32px', background: '#F8F9FA', borderRadius: '10px', flexShrink: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <LionIcon size={12} color="#074CA1" />
                    </div>
                    <div>
                      <span style={{ fontSize: '12px', fontWeight: '800', color: '#333' }}>{post.user}</span>
                      <p style={{ fontSize: '13px', color: '#555', marginTop: '2px', lineHeight: '1.4' }}>{post.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="action-button">공식 홈페이지 바로가기</button>
          </div>
        );
      case 'match':
        return (
          <div className="scroll-area animate-fade">
            <h1 style={{ marginBottom: '32px' }}>경기 일정</h1>
            {[
              { date: '2026.06.04', vs: 'LG 트윈스', place: '대구', time: '18:30', home: true },
              { date: '2026.06.05', vs: 'SSG 랜더스', place: '인천', time: '18:30', home: false },
              { date: '2026.06.06', vs: 'SSG 랜더스', place: '인천', time: '17:00', home: false }
            ].map((m, i) => (
              <div key={i} className="premium-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '12px', color: '#074CA1', fontWeight: '800' }}>{m.date}</span>
                  <h2 style={{ margin: 0, fontSize: '17px' }}>{m.vs}</h2>
                  <p style={{ fontSize: '12px', color: '#999' }}>{m.place} {m.home ? '(홈)' : '(원정)'}</p>
                </div>
                <div style={{ background: '#F8F9FA', padding: '8px 12px', borderRadius: '12px', fontSize: '15px', fontWeight: '800' }}>{m.time}</div>
              </div>
            ))}
          </div>
        );
      case 'rank':
        return (
          <div className="scroll-area animate-fade">
            <h1 style={{ marginBottom: '32px' }}>리그 순위</h1>
            <div className="premium-card" style={{ padding: '0', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#F8F9FA' }}>
                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', color: '#666', fontWeight: '800' }}>순위</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', color: '#666', fontWeight: '800' }}>팀</th>
                    <th style={{ padding: '16px', textAlign: 'right', fontSize: '12px', color: '#666', fontWeight: '800' }}>승률</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { r: 1, t: '삼성', w: 45, l: 26, s: true },
                    { r: 2, t: 'KIA', w: 42, l: 29 },
                    { r: 3, t: 'LG', w: 38, l: 33 },
                    { r: 4, t: '한화', w: 35, l: 36 }
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #F0F0F0', background: row.s ? 'rgba(7, 76, 161, 0.04)' : 'transparent' }}>
                      <td style={{ padding: '20px 16px', fontWeight: '900', color: row.s ? '#074CA1' : '#333' }}>{row.r}</td>
                      <td style={{ padding: '20px 16px', fontWeight: '700' }}>{row.t} 라이온즈</td>
                      <td style={{ padding: '20px 16px', textAlign: 'right', fontSize: '13px', fontWeight: '600' }}>{(row.w / (row.w + row.l)).toFixed(3)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'more':
        return (
          <div className="scroll-area animate-fade">
            <h1 style={{ marginBottom: '32px' }}>설정</h1>
            <div className="premium-card">
              <h2 style={{ fontSize: '16px' }}>앱 설정</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #F5F5F5' }}>
                  <span style={{ fontSize: '14px', fontWeight: '600' }}>실시간 알림</span>
                  <div style={{ width: '40px', height: '22px', background: '#074CA1', borderRadius: '100px', position: 'relative' }}>
                    <div style={{ position: 'absolute', right: '2px', top: '2px', width: '18px', height: '18px', background: '#fff', borderRadius: '50%' }}></div>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' }}>
                  <span style={{ fontSize: '14px', fontWeight: '600' }}>버전 정보</span>
                  <span style={{ fontSize: '13px', color: '#999' }}>v1.0.0</span>
                </div>
              </div>
            </div>

            <div className="premium-card">
              <h2 style={{ fontSize: '16px' }}>공지사항</h2>
              <p style={{ fontSize: '13px', color: '#666' }}>2026 시즌 하반기 경기 예매 일정 안내</p>
            </div>

            <div style={{ textAlign: 'center', marginTop: '60px', opacity: 0.2, fontSize: '10px' }}>
              <p>삼성 라이온즈 팬 대시보드 프로젝트</p>
              <p>© 2026 Samsung Lions Fans</p>
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="app-container">
      {renderContent()}
      <nav className="bottom-nav">
        {[
          { id: 'home', icon: <HomeIcon />, label: '홈' },
          { id: 'match', icon: <MatchIcon />, label: '일정' },
          { id: 'rank', icon: <RankIcon />, label: '순위' },
          { id: 'more', icon: <MoreIcon />, label: '설정' }
        ].map((tab) => (
          <div key={tab.id} className={`nav-item ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
            {tab.icon}
            <span>{tab.label}</span>
          </div>
        ))}
      </nav>
    </div>
  );
}
