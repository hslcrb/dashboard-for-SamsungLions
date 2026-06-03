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

  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, []);

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
      console.error("데이터 동기화 실패:", err);
      setHasGame(false);
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await fetchScores();
      // 데이터 수신 즉시 로딩 해제
      setIsLoading(false);
    };
    init();

    const interval = setInterval(fetchScores, 30000);
    const clock = setInterval(() => {
      const now = new Date();
      setMatchTime(now.toLocaleTimeString('ko-KR', { hour12: false }));
    }, 1000);
    return () => { clearInterval(interval); clearInterval(clock); };
  }, [fetchScores]);

  // 프리미엄 로딩 화면 (커스텀 빛 효과)
  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="logo-wrapper">
          <Image src="/logo.svg" alt="Lions" width={120} height={100} priority />
          <div className="glint-effect"></div>
        </div>
        <style jsx>{`
          .loading-screen {
            position: fixed;
            top: 0; left: 0; width: 100vw; height: 100vh;
            background: #ffffff;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
          }
          .logo-wrapper {
            position: relative;
            overflow: hidden;
          }
          .glint-effect {
            position: absolute;
            top: -100%;
            left: -100%;
            width: 300%;
            height: 300%;
            background: linear-gradient(
              135deg,
              rgba(255, 255, 255, 0) 40%,
              rgba(255, 255, 255, 0.9) 50%,
              rgba(255, 255, 255, 0) 60%
            );
            transform: rotate(25deg);
            animation: moveGlint 2s infinite ease-in-out;
            pointer-events: none;
          }
          @keyframes moveGlint {
            0% { transform: translateY(-20%) translateX(-20%) rotate(25deg); }
            100% { transform: translateY(20%) translateX(20%) rotate(25deg); }
          }
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
              <div className="badge-fan">FAN DASHBOARD</div>
            </div>

            {hasGame && scoreData ? (
              <div className={`premium-card ${isRefreshing ? 'refreshing' : ''}`}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className={scoreData.isLive ? "live-dot" : "inactive-dot"}></span>
                    <span style={{ fontSize: '13px', fontWeight: '950', color: scoreData.isLive ? '#FF3B30' : '#8E8E93' }}>
                      {scoreData.isLive ? 'LIVE' : 'GAME'}
                    </span>
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: '#8E8E93' }}>{matchTime}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{ position: 'relative', width: '32px', height: '26px', margin: '0 auto 10px' }}>
                      <Image src="/logo.svg" alt="L" fill style={{ objectFit: 'contain' }} />
                    </div>
                    <div className="score-number">{scoreData.homeScore ?? 0}</div>
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: '200', color: '#EEE', padding: '0 10px' }}>VS</div>
                  <div style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: '900', color: '#333', marginBottom: '14px' }}>{scoreData.away}</div>
                    <div className="score-number dark">{scoreData.awayScore ?? 0}</div>
                  </div>
                </div>

                <div className="card-footer-info">
                  <p>{scoreData.status} {scoreData.inning && `| ${scoreData.inning}`}</p>
                  <p className="sync-text">30초 간격 실시간 자동 동기화</p>
                </div>
              </div>
            ) : (
              <div className="premium-card empty-state">
                <h2 style={{ fontSize: '18px', margin: 0, fontWeight: '800' }}>오늘은 경기가 없습니다</h2>
                <p style={{ fontSize: '13px', color: '#999', marginTop: '8px' }}>Naver Sports API 데이터 기준</p>
              </div>
            )}

            <div className="premium-card">
              <h2 className="section-title">최신 브리핑</h2>
              <div className="simple-list">
                <div className="list-item">라이온즈 파크 홈 경기 예매 일람 업데이트</div>
                <div className="list-item">주요 선수 기록 및 성적 실시간 집계 중</div>
              </div>
            </div>

            <button className="action-button" onClick={fetchScores}>
              {isRefreshing ? '데이터 갱신 중...' : '데이터 수동 갱신'}
            </button>
            <div style={{ height: '30px' }}></div>
          </div>
        );
      case 'match':
        return (
          <div className="scroll-area animate-fade">
            <h1>경기 일정</h1>
            {[
              { date: '2026.06.04', vs: 'LG 트윈스', place: '대구' },
              { date: '2026.06.05', vs: 'SSG 랜더스', place: '인천' }
            ].map((m, i) => (
              <div key={i} className="premium-card schedule-card">
                <span className="date-badge">{m.date}</span>
                <h2>{m.vs}</h2>
                <p>{m.place}</p>
              </div>
            ))}
          </div>
        );
      case 'rank':
        return (
          <div className="scroll-area animate-fade">
            <h1>시즌 성적</h1>
            <div className="premium-card table-card">
              <table>
                <thead>
                  <tr><th>순위</th><th>팀 명</th><th style={{ textAlign: 'right' }}>승률</th></tr>
                </thead>
                <tbody>
                  <tr className="highlight-row">
                    <td>1</td><td>삼성 라이온즈</td><td style={{ textAlign: 'right' }}>0.658</td>
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
            <div className="premium-card info-card">
              <div className="info-logo">
                <Image src="/logo.svg" alt="Lions" fill style={{ objectFit: 'contain' }} />
              </div>
              <h2>LIONS FAN DASHBOARD</h2>
              <p>개인 제작 팬 프로젝트 v1.2.8</p>
            </div>
            <div className="copyright-area">
              <p>본 서비스는 개인적으로 제작된 팬 프로젝트입니다.</p>
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
          { id: 'more', icon: <MoreIcon />, label: '더보기' }
        ].map((tab) => (
          <div key={tab.id} className={`nav-item ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
            <div className="nav-icon-box">{tab.icon}</div>
            <span>{tab.label}</span>
          </div>
        ))}
      </nav>

      <style jsx global>{`
        .live-dot { width: 8px; height: 8px; background: #FF3B30; border-radius: 50%; box-shadow: 0 0 10px rgba(255, 59, 48, 0.6); animation: pulse 1.5s infinite; }
        .inactive-dot { width: 8px; height: 8px; background: #8E8E93; border-radius: 50%; }
        .score-number { font-size: 58px; color: #074CA1; font-weight: 950; letter-spacing: -3px; line-height: 1; }
        .score-number.dark { color: #1A1A1A; }
        .premium-card.refreshing { opacity: 0.5; transform: scale(0.995); }
        .badge-fan { font-size: 11px; font-weight: 800; color: #074CA1; background: rgba(7, 76, 161, 0.05); padding: 6px 14px; border-radius: 100px; }
        .sync-text { font-size: 10px; color: #074CA1; font-weight: 700; marginTop: 8px; opacity: 0.6; }
        .card-footer-info { margin-top: 24px; padding-top: 16px; border-top: 1px solid #F2F4F7; text-align: center; }
        .card-footer-info p { font-size: 14px; color: #1A1A1A; font-weight: 900; margin: 0; }
        .empty-state { padding: 60px 24px; text-align: center; }
        .section-title { font-size: 17px; margin-bottom: 15px; font-weight: 900; }
        .list-item { padding: 15px; background: #F8F9FA; border-radius: 18px; color: #1A1A1A; font-weight: 700; font-size: 14px; margin-bottom: 10px; }
        .date-badge { font-size: 12px; color: #074CA1; font-weight: 950; }
        .table-card table { width: 100%; border-collapse: collapse; }
        .table-card th { padding: 16px; text-align: left; font-size: 12px; font-weight: 900; color: #8E8E93; }
        .highlight-row { background: rgba(7, 76, 161, 0.04); }
        .highlight-row td { padding: 22px 16px; font-weight: 800; }
        .info-card { padding: 48px 24px; text-align: center; }
        .info-logo { position: relative; width: 110px; height: 80px; margin: 0 auto 24px; }
        .copyright-area { text-align: center; marginTop: 60px; opacity: 0.15; font-size: 9px; font-weight: 700; }
        .nav-icon-box { width: 24px; height: 24px; display: flex; justifyContent: center; alignItems: center; }
        @keyframes pulse { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(1.4); } 100% { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
}
