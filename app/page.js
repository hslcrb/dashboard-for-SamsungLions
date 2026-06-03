'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { HomeIcon, MatchIcon, RankIcon, MoreIcon } from '../components/Icons';

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');
  const [matchTime, setMatchTime] = useState('00:00:00');
  const [isLoading, setIsLoading] = useState(true);
  const [scoreData, setScoreData] = useState(null);
  const [hasGame, setHasGame] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // 우클릭 금지 처리 (Disable right-click)
  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  const fetchScores = useCallback(async () => {
    setIsRefreshing(true);
    try {
      // 실제 프로젝트 API 엔드포인트 호출 (네이버 스포츠 API 기반)
      const res = await fetch('/api/scores');
      const data = await res.json();
      if (data.success) {
        setHasGame(data.hasGame);
        setScoreData(data.game || null);
      }
    } catch (err) {
      console.error("실시간 데이터 동기화 실패:", err);
      setHasGame(false);
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  }, []);

  useEffect(() => {
    fetchScores().then(() => setIsLoading(false));
    // 30초마다 실제 API 통신 (Real API fetch every 30s)
    const interval = setInterval(fetchScores, 30000);
    const clock = setInterval(() => {
      const now = new Date();
      setMatchTime(now.toLocaleTimeString('ko-KR', { hour12: false }));
    }, 1000);
    return () => { clearInterval(interval); clearInterval(clock); };
  }, [fetchScores]);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', background: '#074CA1' }}>
        <div style={{ position: 'relative', width: '60px', height: '60px' }}>
          <Image src="/logo.svg" alt="Lions" fill style={{ filter: 'brightness(0) invert(1)' }} className="loading-pulse" />
        </div>
        <style jsx>{`
          .loading-pulse { animation: pulse 1.2s ease-in-out infinite; }
          @keyframes pulse { 0% { opacity: 0.5; transform: scale(0.9); } 50% { opacity: 1; transform: scale(1.1); } 100% { opacity: 0.5; transform: scale(0.9); } }
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
                <Image src="/logo.svg" alt="Lions Dashboard" fill style={{ objectFit: 'contain', objectPosition: 'left' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(7, 76, 161, 0.05)', padding: '6px 14px', borderRadius: '100px' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#074CA1' }}>REAL-TIME SYNC</span>
              </div>
            </div>

            {hasGame && scoreData ? (
              <div className={`premium-card ${isRefreshing ? 'refreshing' : ''}`}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className={scoreData.isLive ? "live-dot" : "inactive-dot"}></span>
                    <span style={{ fontSize: '13px', fontWeight: '950', color: scoreData.isLive ? '#FF3B30' : '#8E8E93' }}>
                      {scoreData.isLive ? 'LIVE' : 'SCORE'}
                    </span>
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: '#8E8E93' }}>{matchTime}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{ position: 'relative', width: '32px', height: '26px', margin: '0 auto 10px' }}>
                      <Image src="/logo.svg" alt="Lions" fill style={{ objectFit: 'contain' }} />
                    </div>
                    <div className="score-number">{scoreData.homeScore ?? 0}</div>
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: '200', color: '#EEE', padding: '0 10px' }}>VS</div>
                  <div style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: '900', color: '#333', marginBottom: '14px' }}>{scoreData.away}</div>
                    <div className="score-number dark">{scoreData.awayScore ?? 0}</div>
                  </div>
                </div>

                <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #F2F4F7', textAlign: 'center' }}>
                  <p style={{ fontSize: '14px', color: '#1A1A1A', fontWeight: '900' }}>
                    {scoreData.status} {scoreData.inning && `| ${scoreData.inning}`}
                  </p>
                  <p style={{ fontSize: '10px', color: '#074CA1', fontWeight: '700', marginTop: '8px', opacity: 0.6 }}>
                    30초 간격으로 공식 KBO 데이터 동기화 중
                  </p>
                </div>
              </div>
            ) : (
              <div className="premium-card" style={{ padding: '60px 24px', textAlign: 'center' }}>
                <h2 style={{ fontSize: '18px', color: '#333', margin: 0, fontWeight: '800' }}>오늘은 경기가 없습니다</h2>
                <p style={{ fontSize: '13px', color: '#999', marginTop: '8px' }}>데이터 소스: Naver Sports API</p>
                <div className="action-button" style={{ marginTop: '24px', display: 'inline-block', width: 'auto', padding: '12px 32px' }} onClick={fetchScores}>
                  새로 갱신
                </div>
              </div>
            )}

            <div className="premium-card">
              <h2 style={{ fontSize: '17px', marginBottom: '15px', fontWeight: '900' }}>대시보드 알림</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ padding: '15px', background: '#F8F9FA', borderRadius: '18px' }}>
                  <p style={{ color: '#1A1A1A', fontWeight: '700', fontSize: '14px' }}>경기 결과 및 기록 실시간 업데이트 완료</p>
                </div>
                <div style={{ padding: '15px', background: '#F8F9FA', borderRadius: '18px' }}>
                  <p style={{ color: '#1A1A1A', fontWeight: '700', fontSize: '14px' }}>라팍 주관 경기 예매 안내 공지</p>
                </div>
              </div>
            </div>

            <button className="action-button" style={{ opacity: isRefreshing ? 0.7 : 1 }} onClick={fetchScores}>
              {isRefreshing ? '데이터 동기화 중...' : '데이터 수동 동기화'}
            </button>
            <div style={{ height: '30px' }}></div>
          </div>
        );
      case 'match':
        return (
          <div className="scroll-area animate-fade">
            <h1 style={{ marginBottom: '32px' }}>경기 일정</h1>
            {[
              { date: '2026.06.04', vs: 'LG 트윈스', place: '대구' },
              { date: '2026.06.05', vs: 'SSG 랜더스', place: '인천' }
            ].map((m, i) => (
              <div key={i} className="premium-card">
                <span style={{ fontSize: '12px', color: '#074CA1', fontWeight: '950' }}>{m.date}</span>
                <h2 style={{ margin: '6px 0 0 0', fontSize: '19px' }}>{m.vs}</h2>
                <p style={{ color: '#999', fontSize: '13px' }}>{m.place}</p>
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
                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '900' }}>RANK</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '900' }}>TEAM</th>
                    <th style={{ padding: '16px', textAlign: 'right', fontSize: '12px', fontWeight: '900' }}>RATE</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ background: 'rgba(7, 76, 161, 0.04)' }}>
                    <td style={{ padding: '22px 16px', fontWeight: '950', color: '#074CA1' }}>1</td>
                    <td style={{ padding: '22px 16px', fontWeight: '800' }}>삼성 라이온즈</td>
                    <td style={{ padding: '22px 16px', textAlign: 'right', fontWeight: '950' }}>0.658</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'more':
        return (
          <div className="scroll-area animate-fade">
            <h1>정보</h1>
            <div className="premium-card" style={{ padding: '48px 24px', textAlign: 'center' }}>
              <div style={{ position: 'relative', width: '110px', height: '80px', margin: '0 auto 24px' }}>
                <Image src="/logo.svg" alt="Lions Logo" fill style={{ objectFit: 'contain' }} />
              </div>
              <h2 style={{ margin: '0 0 8px 0', fontSize: '22px', fontWeight: '900' }}>LIONS FAN DASHBOARD</h2>
              <p style={{ fontSize: '13px', color: '#BBB' }}>Version 1.2.7 | Fan Edition</p>
            </div>
            <div style={{ textAlign: 'center', marginTop: '60px', opacity: 0.15, fontSize: '9px', fontWeight: '700' }}>
              <p>본 서비스의 데이터는 네이버 스포츠 API를 통해 실시간으로 제공됩니다.</p>
              <p>© 2026 FAN PROJECT | ALL RIGHTS RESERVED</p>
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
          { id: 'more', icon: <MoreIcon />, label: '정보' }
        ].map((tab) => (
          <div key={tab.id} className={`nav-item ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
            <div style={{ width: '24px', height: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {tab.icon}
            </div>
            <span>{tab.label}</span>
          </div>
        ))}
      </nav>

      <style jsx global>{`
        .live-dot { width: 8px; height: 8px; background: #FF3B30; border-radius: 50%; box-shadow: 0 0 10px rgba(255, 59, 48, 0.6); animation: pulse 1.5s infinite; }
        .inactive-dot { width: 8px; height: 8px; background: #8E8E93; border-radius: 50%; }
        .score-number { font-size: 58px; color: #074CA1; font-weight: 950; letter-spacing: -3px; line-height: 1; }
        .score-number.dark { color: #1A1A1A; }
        .premium-card.refreshing { opacity: 0.5; transform: scale(0.99); }
        @keyframes pulse { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(1.4); } 100% { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
}
