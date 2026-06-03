'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { HomeIcon, MatchIcon, RankIcon, MoreIcon, LionIcon } from '../components/Icons';

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');
  const [matchTime, setMatchTime] = useState('00:00:00');
  const [isLoading, setIsLoading] = useState(true);
  const [scoreData, setScoreData] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // 실시간 데이터 가져오기 (Fetch real-time data)
  const fetchScores = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/scores');
      const data = await res.json();
      if (data.success) {
        setScoreData(data.game);
      }
    } catch (err) {
      console.error("데이터 로드 실패:", err);
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  }, []);

  useEffect(() => {
    // 초기 로딩
    fetchScores().then(() => setIsLoading(false));

    // 10초마다 갱신
    const interval = setInterval(fetchScores, 10000);

    // 시계 타이머
    const clock = setInterval(() => {
      const now = new Date();
      setMatchTime(now.toLocaleTimeString('ko-KR', { hour12: false }));
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(clock);
    };
  }, [fetchScores]);

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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 0 28px 0' }}>
              <div style={{ position: 'relative', width: '110px', height: '36px' }}>
                <Image src="/logo.svg" alt="Samsung Lions" fill style={{ objectFit: 'contain', objectPosition: 'left' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(7, 76, 161, 0.05)', padding: '6px 12px', borderRadius: '100px' }}>
                  <LionIcon size={14} color="#074CA1" />
                  <span style={{ fontSize: '11px', fontWeight: '800', color: '#074CA1' }}>LIVE UPDATES</span>
                </div>
              </div>
            </div>

            <div className={`premium-card ${isRefreshing ? 'refreshing' : ''}`}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="live-dot"></span>
                  <span style={{ fontSize: '13px', fontWeight: '800', color: '#FF3B30', letterSpacing: '0.5px' }}>
                    {scoreData?.isLive ? 'LIVE SCORE' : 'RECENT RESULT'}
                  </span>
                </div>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#999' }}>{matchTime}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ textAlign: 'center', flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: '800', color: '#074CA1', marginBottom: '12px' }}>{scoreData?.home || 'SAMSUNG'}</div>
                  <div className="score-number">{scoreData?.homeScore ?? 0}</div>
                </div>
                <div style={{ fontSize: '16px', fontWeight: '200', color: '#DDD', padding: '0 15px' }}>VS</div>
                <div style={{ textAlign: 'center', flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: '800', color: '#333', marginBottom: '12px' }}>{scoreData?.away || 'TWINS'}</div>
                  <div className="score-number dark">{scoreData?.awayScore ?? 0}</div>
                </div>
              </div>

              <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #F2F4F7', textAlign: 'center' }}>
                <p style={{ fontSize: '12px', color: '#666', fontWeight: '600' }}>
                  {scoreData?.status} | {scoreData?.inning}
                </p>
                <p style={{ fontSize: '10px', color: '#BBB', marginTop: '4px' }}>10초마다 자동 갱신 중</p>
              </div>
            </div>

            <div className="premium-card">
              <h2 style={{ fontSize: '17px', marginBottom: '20px' }}>오늘의 뉴스</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { title: "원태인, 리그 다승 단독 1위 질주", time: "2시간 전" },
                  { title: "구자욱 부상 복귀 후 맹타, '캡틴의 귀환'", time: "4시간 전" },
                  { title: "라이온즈 파크 주말 경기 매진 임박", time: "6시간 전" }
                ].map((news, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ fontWeight: '600', color: '#333', fontSize: '14px' }}>{news.title}</p>
                    <span style={{ fontSize: '11px', color: '#BBB' }}>{news.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <button className="action-button" onClick={fetchScores}>수동으로 갱신하기</button>
            <div style={{ height: '20px' }}></div>
          </div>
        );
      case 'match':
        return (
          <div className="scroll-area animate-fade">
            <h1>경기 일정</h1>
            {[
              { date: '2026.06.04', vs: 'LG 트윈스', place: '대구', status: '진행예정' },
              { date: '2026.06.05', vs: 'SSG 랜더스', place: '인천', status: '진행예정' }
            ].map((m, i) => (
              <div key={i} className="premium-card">
                <span style={{ fontSize: '12px', color: '#074CA1', fontWeight: '800' }}>{m.date}</span>
                <h2 style={{ margin: '4px 0 0 0' }}>{m.vs}</h2>
                <p>{m.place} | {m.status}</p>
              </div>
            ))}
          </div>
        );
      case 'rank':
        return (
          <div className="scroll-area animate-fade">
            <h1>시즌 성적</h1>
            <div className="premium-card" style={{ padding: '0', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#F8F9FA' }}>
                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px' }}>순위</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px' }}>팀</th>
                    <th style={{ padding: '16px', textAlign: 'right', fontSize: '12px' }}>승리</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ background: 'rgba(7, 76, 161, 0.04)' }}>
                    <td style={{ padding: '20px 16px', fontWeight: '900' }}>1</td>
                    <td style={{ padding: '20px 16px', fontWeight: '700' }}>삼성</td>
                    <td style={{ padding: '20px 16px', textAlign: 'right', fontWeight: '800' }}>48</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'more':
        return (
          <div className="scroll-area animate-fade">
            <h1>설정</h1>
            <div className="premium-card">
              <h2 style={{ fontSize: '16px' }}>앱 서비스 정보</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #F5F7F9' }}>
                  <span>버전</span>
                  <span style={{ color: '#074CA1', fontWeight: 'bold' }}>v1.2.5</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
                  <span>데이터 출처</span>
                  <span>네이버 스포츠 API (Real-time)</span>
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '60px', opacity: 0.2, fontSize: '10px' }}>
              <p>삼성 라이온즈 공식 팬 서비스</p>
              <p>© 2026 OFFICIAL APP PROJECT</p>
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

      <style jsx global>{`
        .live-dot {
          width: 8px;
          height: 8px;
          background: #FF3B30;
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(255, 59, 48, 0.6);
          animation: pulse 1.5s infinite;
        }

        .score-number {
          font-size: 52px;
          color: #074CA1;
          font-weight: 950;
          letter-spacing: -2px;
          line-height: 1;
        }

        .score-number.dark {
          color: #1A1A1A;
        }

        .premium-card.refreshing {
          opacity: 0.7;
          transform: scale(0.995);
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
