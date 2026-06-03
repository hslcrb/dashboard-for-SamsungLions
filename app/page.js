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

  const fetchScores = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/scores');
      const data = await res.json();
      if (data.success) {
        setHasGame(data.hasGame);
        setScoreData(data.game || null);
      }
    } catch (err) {
      console.error("데이터 로드 실패:", err);
      setHasGame(false);
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  }, []);

  useEffect(() => {
    fetchScores().then(() => setIsLoading(false));
    const interval = setInterval(fetchScores, 30000); // 30초 간격 갱신
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
          <Image src="/logo.svg" alt="Lions Logo" fill style={{ filter: 'brightness(0) invert(1)' }} className="loading-pulse" />
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
                <Image src="/logo.svg" alt="Samsung Lions" fill style={{ objectFit: 'contain', objectPosition: 'left' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(7, 76, 161, 0.05)', padding: '6px 14px', borderRadius: '100px' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#074CA1' }}>FAN DASHBOARD</span>
              </div>
            </div>

            {hasGame && scoreData ? (
              <div className={`premium-card ${isRefreshing ? 'refreshing' : ''}`}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className={scoreData.isLive ? "live-dot" : "inactive-dot"}></span>
                    <span style={{ fontSize: '13px', fontWeight: '900', color: scoreData.isLive ? '#FF3B30' : '#8E8E93' }}>
                      {scoreData.isLive ? 'LIVE' : 'GAME INFO'}
                    </span>
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: '#8E8E93' }}>{matchTime}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{ position: 'relative', width: '30px', height: '24px', margin: '0 auto 8px' }}>
                      <Image src="/logo.svg" alt="Lions" fill style={{ objectFit: 'contain' }} />
                    </div>
                    <div className="score-number">{scoreData.homeScore ?? 0}</div>
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: '200', color: '#EEE', padding: '0 10px' }}>VS</div>
                  <div style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: '900', color: '#333', marginBottom: '12px' }}>{scoreData.away}</div>
                    <div className="score-number dark">{scoreData.awayScore ?? 0}</div>
                  </div>
                </div>

                <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #F2F4F7', textAlign: 'center' }}>
                  <p style={{ fontSize: '14px', color: '#1A1A1A', fontWeight: '800' }}>
                    {scoreData.status} {scoreData.inning && `| ${scoreData.inning}`}
                  </p>
                </div>
              </div>
            ) : (
              <div className="premium-card" style={{ padding: '60px 24px', textAlign: 'center' }}>
                <h2 style={{ fontSize: '18px', color: '#333', margin: 0 }}>오늘은 경기가 없습니다</h2>
                <p style={{ fontSize: '13px', color: '#999', marginTop: '8px' }}>추후 일정을 확인해 주세요</p>
              </div>
            )}

            <div className="premium-card">
              <h2 style={{ fontSize: '17px', marginBottom: '15px', fontWeight: '800' }}>팬 브리핑</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ padding: '12px 16px', background: '#F8F9FA', borderRadius: '16px' }}>
                  <p style={{ color: '#333', fontWeight: '600', fontSize: '14px' }}>차기 경기 선발 및 티켓 정보 확인</p>
                </div>
                <div style={{ padding: '12px 16px', background: '#F8F9FA', borderRadius: '16px' }}>
                  <p style={{ color: '#333', fontWeight: '600', fontSize: '14px' }}>라이온즈 파크 방문 시 주의사항 안내</p>
                </div>
              </div>
            </div>

            <button className="action-button" onClick={fetchScores}>
              {isRefreshing ? '데이터 동기화 중...' : '데이터 갱신'}
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
                <span style={{ fontSize: '12px', color: '#074CA1', fontWeight: '900' }}>{m.date}</span>
                <h2 style={{ margin: '4px 0 0 0', fontSize: '18px' }}>{m.vs}</h2>
                <p>{m.place}</p>
              </div>
            ))}
          </div>
        );
      case 'rank':
        return (
          <div className="scroll-area animate-fade">
            <h1 style={{ marginBottom: '32px' }}>순위표</h1>
            <div className="premium-card" style={{ padding: '0', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#F8F9FA' }}>
                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px' }}>순위</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px' }}>팀</th>
                    <th style={{ padding: '16px', textAlign: 'right', fontSize: '12px' }}>승률</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ background: 'rgba(7, 76, 161, 0.04)' }}>
                    <td style={{ padding: '20px 16px', fontWeight: '900' }}>1</td>
                    <td style={{ padding: '20px 16px', fontWeight: '700' }}>삼성 라이온즈</td>
                    <td style={{ padding: '20px 16px', textAlign: 'right', fontWeight: '900' }}>0.658</td>
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
            <div className="premium-card" style={{ padding: '40px 24px', textAlign: 'center' }}>
              <div style={{ position: 'relative', width: '100px', height: '80px', margin: '0 auto 24px' }}>
                <Image src="/logo.svg" alt="Lions Logo" fill style={{ objectFit: 'contain' }} />
              </div>
              <h2 style={{ margin: '0 0 6px 0', fontSize: '20px' }}>LIONS FAN DASHBOARD</h2>
              <p style={{ fontSize: '12px', color: '#999' }}>팬 메이드 데이터 프로젝트 v1.2.6</p>
            </div>
            <div style={{ textAlign: 'center', marginTop: '60px', opacity: 0.2, fontSize: '9px' }}>
              <p>이 대시보드는 삼성 라이온즈 공식 서비스가 아닙니다.</p>
              <p>© 2026 FAN PROJECT</p>
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
            <div style={{ width: '22px', height: '22px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
        .premium-card.refreshing { opacity: 0.6; transform: scale(0.995); }
        @keyframes pulse { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(1.4); } 100% { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
}
