'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { HomeIcon, MatchIcon, RankIcon, MoreIcon, LionIcon, DoveIcon } from '../components/Icons';

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');
  const [matchTime, setMatchTime] = useState('00:00:00');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setMatchTime(now.toLocaleTimeString('ko-KR', { hour12: false }));
    }, 1000);
    const loadingTimeout = setTimeout(() => setIsLoading(false), 800);
    return () => { clearInterval(timer); clearTimeout(loadingTimeout); };
  }, []);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', background: '#074CA1' }}>
        <div className="premium-loader"></div>
        <style jsx>{`
          .premium-loader {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(255, 255, 255, 0.1);
            border-top: 3px solid #fff;
            border-radius: 50%;
            animation: spin 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
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
                <LionIcon size={16} color="#074CA1" />
                <p style={{ color: '#074CA1', fontWeight: 'bold', fontSize: '12px', margin: 0, letterSpacing: '1px' }}>SAMSUNG LIONS OFFICIAL</p>
              </div>
              <h1 style={{ margin: 0 }}>승리의 라이온즈, 실시간 대시보드</h1>
            </div>

            <div className="premium-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '8px', height: '8px', background: '#FF3B30', borderRadius: '50%', boxShadow: '0 0 10px rgba(255, 59, 48, 0.5)' }}></span>
                  <span style={{ fontSize: '13px', fontWeight: '800', color: '#FF3B30' }}>LIVE</span>
                </div>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#1A1A1A' }}>{matchTime}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#666', marginBottom: '10px' }}>SAMSUNG</div>
                  <div style={{ fontSize: '42px', color: '#074CA1', fontWeight: '900' }}>10</div>
                </div>
                <div style={{ fontSize: '18px', fontWeight: '200', color: '#E0E0E0' }}>VERSUS</div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#666', marginBottom: '10px' }}>LG</div>
                  <div style={{ fontSize: '42px', color: '#333', fontWeight: '900' }}>4</div>
                </div>
              </div>
              <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #F5F5F5' }}>
                <p style={{ fontSize: '12px', textAlign: 'center', color: '#888' }}>라팍 파크 하단 지정석 | 9회말 무사 1, 2루</p>
              </div>
            </div>

            <div className="premium-card">
              <h2 style={{ fontSize: '16px', marginBottom: '20px' }}>삼갤 실시간 한줄평</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { user: "익명1", text: "오늘 경기 지면 사람 아님 ㅋㅋㅋ 이미 이겼죠?" },
                  { user: "푸른피", text: "가을 야구 냄새가 난다... 우승 적기다" },
                  { user: "셈글호세", text: "한봄고 응원단 도착 완료! 목 터져라 부른다" }
                ].map((post, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', background: '#F8F9FA', borderRadius: '12px', flexShrink: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <LionIcon size={14} color="#074CA1" />
                    </div>
                    <div>
                      <span style={{ fontSize: '12px', fontWeight: '800', color: '#333' }}>{post.user}</span>
                      <p style={{ fontSize: '13px', color: '#444', marginTop: '2px', lineHeight: '1.4' }}>{post.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="action-button">티켓 예매 바로가기</button>
          </div>
        );
      case 'match':
        return (
          <div className="scroll-area animate-fade">
            <h1 style={{ marginBottom: '32px' }}>시즌 경기 스케줄</h1>
            {[
              { date: '2026.06.04', vs: 'LG 트윈스', place: '라팍', time: '18:30', isHome: true },
              { date: '2026.06.05', vs: 'SSG 랜더스', place: '문학', time: '18:30', isHome: false },
              { date: '2026.06.06', vs: 'SSG 랜더스', place: '문학', time: '17:00', isHome: false }
            ].map((m, i) => (
              <div key={i} className="premium-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    {m.isHome && <div style={{ width: '6px', height: '6px', background: '#074CA1', borderRadius: '50%' }}></div>}
                    <span style={{ fontSize: '12px', color: '#074CA1', fontWeight: '800' }}>{m.date}</span>
                  </div>
                  <h2 style={{ margin: 0, fontSize: '17px' }}>{m.vs}</h2>
                  <p style={{ fontSize: '12px', color: '#999', marginTop: '2px' }}>{m.place} {m.isHome ? '(홈)' : '(원정)'}</p>
                </div>
                <div style={{ background: '#F8F9FA', padding: '8px 12px', borderRadius: '12px', fontSize: '15px', fontWeight: '800' }}>{m.time}</div>
              </div>
            ))}
          </div>
        );
      case 'rank':
        return (
          <div className="scroll-area animate-fade">
            <h1 style={{ marginBottom: '32px' }}>팀별 통합 순위</h1>
            <div className="premium-card" style={{ padding: '0', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#F8F9FA' }}>
                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', color: '#666', fontWeight: '800' }}>RANK</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', color: '#666', fontWeight: '800' }}>TEAM</th>
                    <th style={{ padding: '16px', textAlign: 'right', fontSize: '12px', color: '#666', fontWeight: '800' }}>WIN/RATE</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { r: 1, t: '삼성', w: 45, l: 26, cur: true },
                    { r: 2, t: 'KIA', w: 42, l: 29 },
                    { r: 3, t: 'LG', w: 38, l: 33 },
                    { r: 4, t: '한화', w: 35, l: 36 }
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #F0F0F0', background: row.cur ? 'rgba(7, 76, 161, 0.04)' : 'transparent' }}>
                      <td style={{ padding: '20px 16px', fontWeight: '900', color: row.cur ? '#074CA1' : '#333' }}>{row.r}</td>
                      <td style={{ padding: '20px 16px', fontWeight: '700' }}>{row.t === '삼성' ? '🦁 삼성' : row.t}</td>
                      <td style={{ padding: '20px 16px', textAlign: 'right', fontSize: '13px', fontWeight: '600' }}>{row.w}승 {row.l}패</td>
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
            <h1 style={{ marginBottom: '32px' }}>설정 및 프로필</h1>
            <div className="premium-card" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '18px', background: '#074CA1', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                <LionIcon size={30} color="#fff" />
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: '19px' }}>이호세 (Rhee Hose)</h2>
                <p style={{ margin: '4px 0 0 0', fontSize: '12px' }}>Semgle | 수원 한봄고 빅데이터정보과</p>
              </div>
            </div>

            <div className="premium-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <DoveIcon size={16} color="#074CA1" />
                <h2 style={{ margin: 0, fontSize: '14px', color: '#074CA1' }}>By Good Powers</h2>
              </div>
              <p style={{ fontStyle: 'italic', fontSize: '13px', color: '#444', lineHeight: '1.6' }}>
                "그 선한 능력에 우리 에워싸여 보호받으며 살아가리... 주 언제나 우리와 함께 계셔 하루 또 하루 늘 새로워라."
              </p>
              <div style={{ textAlign: 'right', marginTop: '8px', fontSize: '11px', color: '#999' }}>Dietrich Bonhoeffer</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="premium-card" style={{ marginBottom: 0, padding: '18px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: '700', fontSize: '14px' }}>알림 설정</span>
                  <div style={{ width: '44px', height: '24px', background: '#074CA1', borderRadius: '100px', position: 'relative' }}>
                    <div style={{ position: 'absolute', right: '3px', top: '3px', width: '18px', height: '18px', background: '#fff', borderRadius: '50%' }}></div>
                  </div>
                </div>
              </div>
              <div className="premium-card" style={{ marginBottom: 0, padding: '18px 24px' }}>
                <span style={{ fontWeight: '700', fontSize: '14px', color: '#FF3B30' }}>호주 이민 가이드 정보</span>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '60px', opacity: 0.3, fontSize: '10px' }}>
              <p>삼성라이온즈 크리에이티브 대시보드</p>
              <p>Developer Rhee Hose (Semgle)</p>
              <p>고양이민주주의 (Cat Democracy)</p>
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="app-container">
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: '#074CA1', zIndex: 1000 }}></div>
      {renderContent()}
      <nav className="bottom-nav">
        {[
          { id: 'home', icon: <HomeIcon />, label: '홈' },
          { id: 'match', icon: <MatchIcon />, label: '일정' },
          { id: 'rank', icon: <RankIcon />, label: '순위' },
          { id: 'more', icon: <MoreIcon />, label: '더보기' }
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
