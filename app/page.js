'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { HomeIcon, MatchIcon, RankIcon, MoreIcon } from '../components/Icons';

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');
  const [matchTime, setMatchTime] = useState('00:00:00');
  const [isLoading, setIsLoading] = useState(true);
  const [scoreData, setScoreData] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

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
    fetchScores().then(() => setIsLoading(false));
    const interval = setInterval(fetchScores, 10000);
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
                <div style={{ position: 'relative', width: '14px', height: '14px' }}>
                  <Image src="/logo.svg" alt="Lion" fill />
                </div>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#074CA1' }}>LIVE UPDATES</span>
              </div>
            </div>

            <div className={`premium-card ${isRefreshing ? 'refreshing' : ''}`}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="live-dot"></span>
                  <span style={{ fontSize: '13px', fontWeight: '900', color: '#FF3B30', letterSpacing: '0.5px' }}>
                    {scoreData?.isLive ? 'LIVE MATCH' : 'GAME RESULT'}
                  </span>
                </div>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#8E8E93' }}>{matchTime}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ textAlign: 'center', flex: 1 }}>
                  <div style={{ position: 'relative', width: '30px', height: '24px', margin: '0 auto 8px' }}>
                    <Image src="/logo.svg" alt="Home" fill style={{ objectFit: 'contain' }} />
                  </div>
                  <div className="score-number">{scoreData?.homeScore ?? 0}</div>
                </div>
                <div style={{ fontSize: '16px', fontWeight: '200', color: '#EEE', padding: '0 10px' }}>VS</div>
                <div style={{ textAlign: 'center', flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: '900', color: '#333', marginBottom: '12px', letterSpacing: '1px' }}>{scoreData?.away || 'OPPONENT'}</div>
                  <div className="score-number dark">{scoreData?.awayScore ?? 0}</div>
                </div>
              </div>

              <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #F2F4F7', textAlign: 'center' }}>
                <p style={{ fontSize: '13px', color: '#1A1A1A', fontWeight: '700' }}>
                  {scoreData?.status} | {scoreData?.inning}
                </p>
                <p style={{ fontSize: '10px', color: '#BBB', marginTop: '4px' }}>10초 간격 실시간 정밀 트래킹 중</p>
              </div>
            </div>

            <div className="premium-card">
              <h2 style={{ fontSize: '18px', marginBottom: '20px' }}>팬 게시판 실시간 급상승</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { user: "라이온즈심장", text: "오늘 타격감 미쳤다 진짜 ㅋㅋㅋㅋ 우승각 임" },
                  { user: "블루피사자", text: "구자욱 복귀하니까 팀 분위기 확 사네 진짜 캡틴" },
                  { user: "승리요정", text: "원태인 오늘 투구는 진짜 예술 그 자체였다" }
                ].map((post, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ width: '32px', height: '32px', background: '#F8F9FA', borderRadius: '10px', flexShrink: 0, position: 'relative', padding: '6px' }}>
                      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                        <Image src="/logo.svg" alt="L" fill style={{ objectFit: 'contain' }} />
                      </div>
                    </div>
                    <div>
                      <span style={{ fontSize: '12px', fontWeight: '900', color: '#333' }}>{post.user}</span>
                      <p style={{ fontSize: '13px', color: '#555', marginTop: '3px', lineHeight: '1.4' }}>{post.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="action-button" onClick={fetchScores}>즉시 새로고침</button>
            <div style={{ height: '30px' }}></div>
          </div>
        );
      case 'match':
        return (
          <div className="scroll-area animate-fade">
            <h1 style={{ marginBottom: '32px' }}>경기 일정</h1>
            {[
              { date: '2026.06.04', vs: 'LG 트윈스', place: '대구', status: '진행예정' },
              { date: '2026.06.05', vs: 'SSG 랜더스', place: '인천', status: '진행예정' }
            ].map((m, i) => (
              <div key={i} className="premium-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '12px', color: '#074CA1', fontWeight: '900' }}>{m.date}</span>
                  <h2 style={{ margin: '4px 0 0 0', fontSize: '18px' }}>{m.vs}</h2>
                  <p style={{ fontSize: '12px', color: '#999' }}>{m.place} | {m.status}</p>
                </div>
                <div style={{ background: '#F8F9FA', padding: '10px 16px', borderRadius: '14px', fontSize: '16px', fontWeight: '900', color: '#1A1A1A' }}>18:30</div>
              </div>
            ))}
          </div>
        );
      case 'rank':
        return (
          <div className="scroll-area animate-fade">
            <h1 style={{ marginBottom: '32px' }}>통합 순위</h1>
            <div className="premium-card" style={{ padding: '0', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#F8F9FA' }}>
                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', color: '#8E8E93', fontWeight: '900' }}>RANK</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', color: '#8E8E93', fontWeight: '900' }}>TEAM</th>
                    <th style={{ padding: '16px', textAlign: 'right', fontSize: '12px', color: '#8E8E93', fontWeight: '900' }}>WIN RATE</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { r: 1, t: '삼성', w: 48, l: 25, isMe: true },
                    { r: 2, t: 'KIA', w: 44, l: 30 },
                    { r: 3, t: 'LG', w: 41, l: 33 }
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #F0F2F5', background: row.isMe ? 'rgba(7, 76, 161, 0.03)' : 'transparent' }}>
                      <td style={{ padding: '22px 16px', fontWeight: '900', color: row.isMe ? '#074CA1' : '#1A1A1A' }}>{row.r}</td>
                      <td style={{ padding: '22px 16px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {row.isMe && <div style={{ position: 'relative', width: '18px', height: '14px' }}><Image src="/logo.svg" alt="L" fill /></div>}
                        {row.t} 라이온즈
                      </td>
                      <td style={{ padding: '22px 16px', textAlign: 'right', fontSize: '14px', fontWeight: '900', color: row.isMe ? '#074CA1' : '#1A1A1A' }}>{(row.w / (row.w + row.l)).toFixed(3)}</td>
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
            <h1 style={{ marginBottom: '32px' }}>정보 및 설정</h1>
            <div className="premium-card" style={{ padding: '40px 24px', textAlign: 'center' }}>
              <div style={{ position: 'relative', width: '100px', height: '80px', margin: '0 auto 24px' }}>
                <Image src="/logo.svg" alt="Official Logo" fill style={{ objectFit: 'contain' }} />
              </div>
              <h2 style={{ margin: '0 0 6px 0', fontSize: '22px' }}>라이온즈 대시보드</h2>
              <p style={{ fontSize: '13px', color: '#999', fontWeight: '500' }}>Authorized Fan Edition v1.2.5</p>
            </div>

            <div className="premium-card">
              <h2 style={{ fontSize: '16px', marginBottom: '18px', fontWeight: '800' }}>데이터 및 보안</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #F8F9FA' }}>
                  <span style={{ fontSize: '14px', fontWeight: '700' }}>알림 설정</span>
                  <div style={{ width: '44px', height: '24px', background: '#074CA1', borderRadius: '100px', position: 'relative' }}>
                    <div style={{ position: 'absolute', right: '3px', top: '3px', width: '18px', height: '18px', background: '#fff', borderRadius: '50%' }}></div>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
                  <span style={{ fontSize: '14px', fontWeight: '700' }}>데이터 엔드포인트</span>
                  <span style={{ fontSize: '12px', color: '#074CA1', fontWeight: '900' }}>OFFICIAL API</span>
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '60px', opacity: 0.15, fontSize: '10px', letterSpacing: '1px' }}>
              <p>삼성 라이온즈 대시보드 시스템</p>
              <p>© 2026 LIONS FANS PROJECT</p>
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
          font-size: 58px;
          color: #074CA1;
          font-weight: 950;
          letter-spacing: -3px;
          line-height: 1;
        }

        .score-number.dark { color: #1A1A1A; }

        .premium-card.refreshing { opacity: 0.6; transform: scale(0.99); }

        @keyframes pulse { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(1.4); } 100% { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
}
