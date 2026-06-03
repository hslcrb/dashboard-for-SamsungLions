'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { HomeIcon, MatchIcon, RankIcon, MoreIcon } from '../components/Icons';
import { motion, AnimatePresence } from 'framer-motion';
import PremiumButton from '../components/PremiumButton';

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');
  const [matchTime, setMatchTime] = useState('00:00:00');
  const [isLoading, setIsLoading] = useState(true);
  const [scoreData, setScoreData] = useState(null);
  const [hasGame, setHasGame] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // 드래그 제한을 위한 컨테이너 참조
  const constraintsRef = useRef(null);

  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener('contextmenu', handleContextMenu);

    const githubUrl = "https://github.com/hslcrb/dashboard-for-SamsungLions";
    const msg = `본 프로젝트는 오픈 소스로 공개되어 있습니다. 소스 코드는 아래 주소에서 확인해 주세요:\n${githubUrl}`;

    let devtoolsOpen = false;
    const threshold = 160;

    const checkDevTools = () => {
      const widthDiff = window.outerWidth - window.innerWidth > threshold;
      const heightDiff = window.outerHeight - window.innerHeight > threshold;

      if ((widthDiff || heightDiff) && !devtoolsOpen) {
        devtoolsOpen = true;
        console.clear();
        console.log(`%c${msg}`, "color: #074CA1; font-size: 14px; font-weight: bold; padding: 10px;");
        alert(msg);
        (function () {
          (function a() {
            debugger;
            setTimeout(a, 100);
          })();
        })();
      }
    };

    window.addEventListener('resize', checkDevTools);
    console.log(`%cLion Spirits: ${githubUrl}`, "color: #074CA1; font-weight: bold;");

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('resize', checkDevTools);
    };
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

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="scroll-area" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#FFFFFF' }}>
          <div className="logo-wrapper">
            <Image src="/logo.svg" alt="최강삼성! 라이온즈" title="최강삼성! 라이온즈" width={110} height={90} priority />
            <div className="glint-effect"></div>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'home': return (
        <div className="scroll-area animate-fade">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', padding: '0 0 32px 0' }}>
            <div style={{ position: 'relative', width: '130px', height: '44px' }}>
              <Image src="/logo.svg" alt="최강삼성! 라이온즈" title="최강삼성! 라이온즈" fill style={{ objectFit: 'contain', objectPosition: 'left' }} />
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '11px', fontWeight: '900', color: '#074CA1', letterSpacing: '1px', marginBottom: '2px' }}>최강삼성 승리하리라</div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#8E8E93', tabularNums: true }}>{matchTime}</div>
            </div>
          </div>
          {hasGame && scoreData ? (
            <div className={`premium-card ${isRefreshing ? 'refreshing' : ''}`}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className={scoreData.isLive ? "live-dot" : "inactive-dot"}></span>
                  <span style={{ fontSize: '14px', fontWeight: '950', color: scoreData.isLive ? '#FF3B30' : '#1A1A1A' }}>{scoreData.isLive ? '라이브 중계' : '최근 경기'}</span>
                </div>
                <div style={{ fontSize: '11px', fontWeight: '800', color: '#BBB' }}>KBO 공식 데이터</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ textAlign: 'center', flex: 1 }}>
                  <div style={{ position: 'relative', width: '36px', height: '28px', margin: '0 auto 12px' }}>
                    <Image src="/logo.svg" alt="최강삼성! 라이온즈" title="최강삼성! 라이온즈" fill style={{ objectFit: 'contain' }} />
                  </div>
                  <div className="score-number">{scoreData.homeScore ?? 0}</div>
                </div>
                <div style={{ fontSize: '20px', fontWeight: '100', color: '#DDD', padding: '0 10px' }}>:</div>
                <div style={{ textAlign: 'center', flex: 1 }}>
                  <div style={{ fontSize: '15px', fontWeight: '950', color: '#333', marginBottom: '15px' }}>{scoreData.away}</div>
                  <div className="score-number dark">{scoreData.awayScore ?? 0}</div>
                </div>
              </div>
              <div className="card-footer-info">
                <p>{scoreData.status} {scoreData.inning && `| ${scoreData.inning}`}</p>
                <p className="sync-info">실시간 매치 데이터 동기화 중 (30초 간격)</p>
              </div>
            </div>
          ) : (
            <div className="premium-card empty-state">
              <div style={{ position: 'relative', width: '40px', height: '40px', margin: '0 auto 20px', opacity: 0.1 }}>
                <Image src="/logo.svg" alt="최강삼성! 라이온즈" title="최강삼성! 라이온즈" fill style={{ objectFit: 'contain' }} />
              </div>
              <h2 style={{ fontSize: '18px', margin: 0, fontWeight: '900', color: '#1A1A1A' }}>오늘은 예정된 경기가 없습니다</h2>
              <p style={{ fontSize: '13px', color: '#999', marginTop: '10px' }}>팬 여러분, 내일 경기를 준비해 주세요!</p>
            </div>
          )}
          <div className="premium-card">
            <h2 className="section-title">라이온즈 최신 소식</h2>
            <div className="simple-list">
              <div className="list-item">라이온즈 파크 주말 경기 입장권 매진</div>
              <div className="list-item">선수단 컨디션 점검 및 훈련 리포트 발간</div>
            </div>
          </div>
          <div style={{ marginTop: '10px' }}>
            <PremiumButton onClick={fetchScores}>
              {isRefreshing ? '데이터 동기화 중...' : '데이터 수동 새로고침'}
            </PremiumButton>
          </div>
          <div style={{ height: '30px' }}></div>
        </div>
      );
      case 'match': return (
        <div className="scroll-area animate-fade">
          <h1 className="page-title">경기 일정</h1>
          {[
            { date: '2026.06.04', vs: 'LG 트윈스', place: '대구 라이온즈 파크' },
            { date: '2026.06.05', vs: 'SSG 랜더스', place: '인천 SSG 랜더스 필드' }
          ].map((m, i) => (
            <div key={i} className="premium-card schedule-row">
              <div className="date-tag">{m.date}</div>
              <div className="game-info"><h2>{m.vs}</h2><p>{m.place}</p></div>
            </div>
          ))}
        </div>
      );
      case 'rank': return (
        <div className="scroll-area animate-fade">
          <h1 className="page-title">리그 순위</h1>
          <div className="premium-card table-wrapper">
            <table>
              <thead><tr><th>순위</th><th>팀 명</th><th style={{ textAlign: 'right' }}>승률</th></tr></thead>
              <tbody><tr className="highlight-row"><td>1</td><td>삼성 라이온즈</td><td style={{ textAlign: 'right' }}>0.658</td></tr></tbody>
            </table>
          </div>
        </div>
      );
      case 'more': return (
        <div className="scroll-area animate-fade">
          <h1 className="page-title">정보 및 설정</h1>
          <div className="premium-card about-card">
            <div className="about-logo"><Image src="/logo.svg" alt="최강삼성! 라이온즈" title="최강삼성! 라이온즈" fill style={{ objectFit: 'contain' }} /></div>
            <h2>라이언즈 팬 대시보드</h2>
            <p>Lion Spirits Fan Project v1.4.4</p>
            <div style={{ marginTop: '20px' }}>
              <PremiumButton onClick={() => setShowDetails(true)}>기술 스택 자세히 보기</PremiumButton>
            </div>
          </div>
          <div className="disclaimer"><p>본 대시보드는 공개된 데이터를 사용하는 팬 메이드 프로젝트입니다.</p><p>© 2026 최강삼성 팬 프로젝트</p></div>
        </div>
      );
      default: return null;
    }
  };

  return (
    <div className="app-container" ref={constraintsRef}>
      {renderContent()}
      <nav className="bottom-nav">
        {[{ id: 'home', icon: <HomeIcon />, label: '홈' }, { id: 'match', icon: <MatchIcon />, label: '일정' }, { id: 'rank', icon: <RankIcon />, label: '순위' }, { id: 'more', icon: <MoreIcon />, label: '정보' }].map((tab) => (
          <div key={tab.id} className={`nav-item ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
            <div className="icon-wrapper">{tab.icon}</div><span>{tab.label}</span>
          </div>
        ))}
      </nav>

      <AnimatePresence>
        {showDetails && (
          <>
            <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowDetails(false)} />

            {/* 
              과도한 상승 방지 대책: 
              1. constraintsRef(부모 컨테이너)를 기준으로 드래그 영역을 물리적으로 제한.
              2. dragElastic을 0으로 설정하여 한계점을 절대 넘지 못하게 함.
              3. % 단위 대신 px 단위를 혼합하여 계산 오차 방지.
            */}
            <motion.div
              className="bottom-sheet"
              initial={{ y: 800 }}
              animate={{ y: 0 }}
              exit={{ y: 800 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 600 }}
              dragElastic={0} // 한계점 돌파 절대 금지
              onDragEnd={(e, info) => {
                if (info.offset.y > 200 || info.velocity.y > 600) setShowDetails(false);
              }}
              transition={{ type: "spring", damping: 35, stiffness: 250 }}
              style={{
                height: '75vh', /* 적절한 높이로 하향 조정 */
                position: 'fixed',
                bottom: '-20vh', /* 하단 끊김 방지를 위해 아래로 더 길게 구성 */
                zIndex: 1001,
                background: 'white',
                paddingBottom: '20vh'
              }}
            >
              <div className="sheet-handle" />
              <div className="sheet-content">
                <h3 className="sheet-title">Software Specifications</h3>
                <div className="spec-list">
                  <div className="spec-row"><span className="spec-label">Core Engine</span><span className="spec-value">Next.js v16.2.7</span></div>
                  <div className="spec-row"><span className="spec-label">Base Font</span><span className="spec-value">에이투지체 (A2z)</span></div>
                  <div className="spec-row"><span className="spec-label">Interaction</span><span className="spec-value">Framer Motion v11</span></div>
                  <div className="spec-row"><span className="spec-label">Deployment</span><span className="spec-value">Vercel Edge</span></div>
                  <div className="spec-row"><span className="spec-label">Developer</span><span className="spec-value">Rhee Hose (이호세)</span></div>
                </div>
                <div style={{ marginTop: '32px', textAlign: 'center' }}>
                  <a href="https://noonnu.cc/font_page/1778" target="_blank" rel="noopener noreferrer" className="no-underline-link">에이투지체 공식 다운로드</a>
                </div>
                <div style={{ marginTop: '32px' }}>
                  <PremiumButton onClick={() => setShowDetails(false)}>닫기</PremiumButton>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx global>{`
        #vercel-live-feedback, .vercel-toolbar { display: none !important; }
        .live-dot { width: 8px; height: 8px; background: #FF3B30; border-radius: 50%; box-shadow: 0 0 10px rgba(255, 59, 48, 0.6); animation: pulse 1.5s infinite; }
        .inactive-dot { width: 8px; height: 8px; background: #C0C0C0; border-radius: 50%; }
        .score-number { font-size: 64px; color: #074CA1; font-weight: 950; letter-spacing: -3px; line-height: 1; }
        .score-number.dark { color: #1A1A1A; }
        .premium-card.refreshing { opacity: 0.5; transform: scale(0.995); }
        .sync-info { font-size: 10px; color: #999; font-weight: 600; margin-top: 8px; }
        .card-footer-info { margin-top: 28px; padding-top: 18px; border-top: 1px solid #F0F2F5; text-align: center; }
        .card-footer-info p { font-size: 15px; color: #1A1A1A; font-weight: 900; margin: 0; }
        .empty-state { padding: 80px 24px; text-align: center; }
        .section-title { font-size: 16px; margin-bottom: 20px; font-weight: 900; color: #1A1A1A; letter-spacing: 0.5px; }
        .list-item { padding: 18px; background: #F8F9FA; border-radius: 20px; color: #1A1A1A; font-weight: 700; font-size: 14px; margin-bottom: 12px; transition: all 0.2s; }
        .page-title { font-size: 26px; font-weight: 900; color: #074CA1; margin-bottom: 32px; letter-spacing: -0.5px; }
        .date-tag { font-size: 12px; color: #074CA1; font-weight: 950; margin-bottom: 6px; }
        .table-wrapper table { width: 100%; border-collapse: collapse; }
        .table-wrapper th { padding: 16px; text-align: left; font-size: 11px; font-weight: 900; color: #BBB; letter-spacing: 1px; }
        .highlight-row td { padding: 24px 16px; font-weight: 900; font-size: 15px; }
        .about-card { padding: 60px 24px; text-align: center; }
        .about-logo { position: relative; width: 120px; height: 90px; margin: 0 auto 28px; }
        .disclaimer { text-align: center; margin-top: 80px; opacity: 0.2; font-size: 10px; font-weight: 700; }
        .modal-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.5); backdrop-filter: blur(4px); z-index: 1000; }
        .bottom-sheet { border-radius: 32px 32px 0 0; box-shadow: 0 -10px 40px rgba(0,0,0,0.15); touch-action: none; overflow: hidden; }
        .sheet-handle { width: 36px; height: 5px; background: #DDD; border-radius: 10px; margin: 12px auto 32px; cursor: grab; }
        .sheet-title { font-size: 18px; font-weight: 900; color: #074CA1; margin-bottom: 28px; text-align: center; }
        .spec-list { background: #F8F9FA; border-radius: 20px; padding: 8px 20px; }
        .spec-row { display: flex; justify-content: space-between; padding: 16px 0; border-bottom: 1px solid #EEE; font-size: 14px; gap: 40px; }
        .spec-row:last-child { border-bottom: none; }
        .spec-label { color: #8E8E93; font-weight: 700; flex-shrink: 0; }
        .spec-value { color: #1A1A1A; font-weight: 800; text-align: right; word-break: break-all; }
        .no-underline-link { text-decoration: none !important; color: #074CA1; font-weight: 800; }
        @keyframes pulse { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(1.4); } 100% { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
}
