'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
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
    const loadingTimeout = setTimeout(() => setIsLoading(false), 600);
    return () => { clearInterval(timer); clearTimeout(loadingTimeout); };
  }, []);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', background: '#074CA1' }}>
        <div style={{ position: 'relative', width: '80px', height: '80px' }}>
          <Image src="/logo.svg" alt="Lions Logo" fill style={{ filter: 'brightness(0) invert(1)' }} className="loading-logo" />
        </div>
        <style jsx>{`
          .loading-logo {
            animation: pulse 1.5s ease-in-out infinite;
          }
          @keyframes pulse { 0% { transform: scale(0.95); opacity: 0.6; } 50% { transform: scale(1.05); opacity: 1; } 100% { transform: scale(0.95); opacity: 0.6; } }
        `}</style>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="scroll-area animate-fade">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 0 28px 0' }}>
              <div style={{ position: 'relative', width: '120px', height: '40px' }}>
                <Image src="/logo.svg" alt="Samsung Lions" fill style={{ objectFit: 'contain', objectPosition: 'left' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(7, 76, 161, 0.05)', padding: '6px 12px', borderRadius: '100px' }}>
                <LionIcon size={14} color="#074CA1" />
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#074CA1', letterSpacing: '0.5px' }}>OFFICIAL APP</span>
              </div>
            </div>

            <div className="premium-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '8px', height: '8px', background: '#FF3B30', borderRadius: '50%', boxShadow: '0 0 12px rgba(255, 59, 48, 0.6)' }}></span>
                  <span style={{ fontSize: '13px', fontWeight: '800', color: '#FF3B30', letterSpacing: '0.5px' }}>LIVE SCORE</span>
                </div>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#1A1A1A' }}>{matchTime}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' }}>
                <div style={{ textAlign: 'center', flex: 1 }}>
                  <div style={{ width: '40px', height: '30px', position: 'relative', margin: '0 auto 10px' }}>
                    <Image src="/logo.svg" alt="Samsungs" fill style={{ objectFit: 'contain' }} />
                  </div>
                  <div style={{ fontSize: '48px', color: '#074CA1', fontWeight: '900', letterSpacing: '-2px' }}>12</div>
                </div>
                <div style={{ fontSize: '16px', fontWeight: '200', color: '#DDD', margin: '0 20px' }}>VS</div>
                <div style={{ textAlign: 'center', flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: '800', color: '#333', marginBottom: '14px' }}>TWINS</div>
                  <div style={{ fontSize: '48px', color: '#333', fontWeight: '900', letterSpacing: '-2px' }}>5</div>
                </div>
              </div>
              <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #F0F2F5' }}>
                <p style={{ fontSize: '12px', textAlign: 'center', color: '#8E8E93', fontWeight: '500' }}>라팍 파크하단 지정석 관람 중 | 9회말 무사 1,2루</p>
              </div>
            </div>

            <div className="premium-card">
              <h2 style={{ fontSize: '17px', color: '#1A1A1A', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                팬 커뮤니티 실시간 반응
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { user: "라이온즈심장", text: "오늘 타선 폭발 실화냐? ㄷㄷ 대구 온 보람 있네" },
                  { user: "블루피의사자", text: "구자욱 연타석 홈런 가즈아ㅏㅏㅏ 무조건 이긴다" },
                  { user: "승리요정", text: "오늘 원태인 폼 미쳤음.. 9이닝 가자!" }
                ].map((post, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', borderBottom: i < 2 ? '1px solid #F8F9FA' : 'none', paddingBottom: i < 2 ? '16px' : '0' }}>
                    <div style={{ width: '36px', height: '36px', background: '#F0F2F5', borderRadius: '12px', flexShrink: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <LionIcon size={16} color="#074CA1" />
                    </div>
                    <div>
                      <span style={{ fontSize: '12px', fontWeight: '800', color: '#333' }}>{post.user}</span>
                      <p style={{ fontSize: '13px', color: '#444', marginTop: '3px', lineHeight: '1.5' }}>{post.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="action-button" style={{ boxShadow: '0 8px 20px rgba(7, 76, 161, 0.2)' }}>
              공식 티켓 예매하기
            </button>
          </div>
        );
      case 'match':
        return (
          <div className="scroll-area animate-fade">
            <h1 style={{ marginBottom: '32px' }}>경기 일정</h1>
            {[
              { date: '2026.06.04', vs: 'LG 트윈스', place: '대구', time: '18:30', isHome: true },
              { date: '2026.06.05', vs: 'SSG 랜더스', place: '인천', time: '18:30', isHome: false },
              { date: '2026.06.06', vs: 'SSG 랜더스', place: '인천', time: '17:00', isHome: false }
            ].map((m, i) => (
              <div key={i} className="premium-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: m.isHome ? '4px solid #074CA1' : '1px solid rgba(0,0,0,0.05)' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '12px', color: '#074CA1', fontWeight: '800', letterSpacing: '0.5px' }}>{m.date}</span>
                    {m.isHome && <span style={{ fontSize: '10px', background: '#074CA1', color: '#fff', padding: '1px 5px', borderRadius: '4px', fontWeight: '700' }}>HOME</span>}
                  </div>
                  <h2 style={{ margin: 0, fontSize: '18px' }}>{m.vs}</h2>
                  <p style={{ fontSize: '12px', color: '#999', marginTop: '2px' }}>{m.place} {m.isHome ? '라이온즈 파크' : '원정 매정'}</p>
                </div>
                <div style={{ background: '#F0F2F5', padding: '10px 16px', borderRadius: '14px', fontSize: '16px', fontWeight: '800', color: '#1A1A1A' }}>{m.time}</div>
              </div>
            ))}
          </div>
        );
      case 'rank':
        return (
          <div className="scroll-area animate-fade">
            <h1 style={{ marginBottom: '32px' }}>시즌 통합 순위</h1>
            <div className="premium-card" style={{ padding: '0', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#F8F9FA' }}>
                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', color: '#8E8E93', fontWeight: '800', letterSpacing: '0.5px' }}>RANK</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', color: '#8E8E93', fontWeight: '800', letterSpacing: '0.5px' }}>TEAM</th>
                    <th style={{ padding: '16px', textAlign: 'right', fontSize: '12px', color: '#8E8E93', fontWeight: '800', letterSpacing: '0.5px' }}>WIN RATE</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { r: 1, t: '삼성', w: 48, l: 25, isMe: true },
                    { r: 2, t: 'KIA', w: 44, l: 30 },
                    { r: 3, t: 'LG', w: 41, l: 33 },
                    { r: 4, t: '두산', w: 39, l: 35 }
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #F0F2F5', background: row.isMe ? 'rgba(7, 76, 161, 0.04)' : 'transparent' }}>
                      <td style={{ padding: '20px 16px', fontWeight: '900', color: row.isMe ? '#074CA1' : '#1A1A1A' }}>{row.r}</td>
                      <td style={{ padding: '20px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {row.isMe && <div style={{ width: '16px', height: '16px', position: 'relative' }}><Image src="/logo.svg" alt="L" fill /></div>}
                        <span style={{ fontWeight: '700' }}>{row.t} 라이온즈</span>
                      </td>
                      <td style={{ padding: '20px 16px', textAlign: 'right', fontSize: '14px', fontWeight: '800', color: row.isMe ? '#074CA1' : '#1A1A1A' }}>{(row.w / (row.w + row.l)).toFixed(3)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '11px', color: '#BBB' }}>※ 2026 KBO 공식 기록 데이터</p>
          </div>
        );
      case 'more':
        return (
          <div className="scroll-area animate-fade">
            <h1 style={{ marginBottom: '32px' }}>설정</h1>
            <div className="premium-card" style={{ padding: '32px 24px', textAlign: 'center' }}>
              <div style={{ position: 'relative', width: '80px', height: '60px', margin: '0 auto 20px' }}>
                <Image src="/logo.svg" alt="Official Logo" fill style={{ objectFit: 'contain' }} />
              </div>
              <h2 style={{ margin: '0 0 4px 0', fontSize: '20px' }}>삼성 라이온즈 공식 앱</h2>
              <p style={{ fontSize: '13px', color: '#999' }}>Version 1.2.0 (Stable)</p>
            </div>

            <div className="premium-card">
              <h2 style={{ fontSize: '16px', marginBottom: '18px' }}>환경 설정</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #F8F9FA' }}>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>경기 알림 푸시</span>
                  <div style={{ width: '44px', height: '24px', background: '#074CA1', borderRadius: '100px', position: 'relative' }}>
                    <div style={{ position: 'absolute', right: '3px', top: '3px', width: '18px', height: '18px', background: '#fff', borderRadius: '50%' }}></div>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>데이터 소스</span>
                  <span style={{ fontSize: '12px', color: '#074CA1', fontWeight: '700' }}>KBO OFFICIAL API</span>
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '60px', opacity: 0.2, fontSize: '10px', letterSpacing: '0.5px' }}>
              <p>삼성 라이온즈 대시보드 프로젝트</p>
              <p>© 2026 Samsung Lions Fans Project</p>
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
            <div style={{ width: '24px', height: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {tab.icon}
            </div>
            <span>{tab.label}</span>
          </div>
        ))}
      </nav>
    </div>
  );
}
