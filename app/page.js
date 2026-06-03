'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="scroll-area">
            <div style={{ position: 'relative', width: '100%', height: '220px', borderRadius: '25px', overflow: 'hidden', marginBottom: '25px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
              <Image
                src="/hero.png"
                alt="Samsung Lions Park"
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
              <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', background: 'linear-gradient(transparent, rgba(0,76,161,0.9))', padding: '20px' }}>
                <h1 style={{ margin: 0, fontSize: '22px', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>최강삼성 승리하리라! 🦁</h1>
                <p style={{ margin: '5px 0 0 0', fontSize: '13px', opacity: 0.9 }}>라팍의 푸른 사자들이 포효한다</p>
              </div>
            </div>

            <div className="glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ margin: 0, color: 'var(--accent-silver)' }}>오늘의 BIG 매치</h2>
                <span className="live-pill">LIVE 18:30</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: '20px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '32px', marginBottom: '5px' }}>🦁</div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold' }}>삼성</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: '900', color: 'rgba(255,255,255,0.4)' }}>VS</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '32px', marginBottom: '5px' }}>🗼</div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold' }}>LG</div>
                </div>
              </div>
              <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>📍 대구 삼성 라이온즈 파크</p>
            </div>

            <div className="glass-card">
              <h2 style={{ color: 'var(--accent-silver)' }}>삼갤 실시간 민심 🔥</h2>
              <div style={{ fontSize: '14px', lineHeight: '1.8' }}>
                <p style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '8px 0' }}>
                  <strong>익명:</strong> "오늘 선발 라인업 애미없노 ㅋㅋㅋ 그래도 믿어본다"
                </p>
                <p style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '8px 0' }}>
                  <strong>푸른피의사자:</strong> "구자욱 오늘 연타석 홈런각 잡혔다 가즈아ㅏㅏ"
                </p>
                <p style={{ padding: '8px 0' }}>
                  <strong>라팍주민:</strong> "벌써부터 라팍 앞 치킨 냄새 오지네... 직관러 부럽다"
                </p>
              </div>
            </div>

            <div className="glass-card" style={{ background: 'linear-gradient(to right, rgba(7, 76, 161, 0.4), rgba(0, 51, 102, 0.4))' }}>
              <h3 style={{ fontSize: '15px' }}>📢 셈글(Semgle) 공지</h3>
              <p style={{ fontSize: '13px', marginTop: '5px' }}>수원 한봄고 빅데이터정보과 기능반 '셈글' 단체응원 이벤트 예정!</p>
            </div>

            <div style={{ height: '20px' }}></div>
          </div>
        );
      case 'match':
        return (
          <div className="scroll-area">
            <h1 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>경기 일정 <span style={{ fontSize: '18px' }}>⚾</span></h1>
            {['2026.06.04 (목)', '2026.06.05 (금)', '2026.06.06 (토)', '2026.06.07 (일)'].map((date, idx) => (
              <div key={idx} className="glass-card" style={{ borderLeft: idx === 0 ? '4px solid #fff' : '1px solid var(--glass-border)' }}>
                <p style={{ fontWeight: 'bold', fontSize: '16px', color: idx === 0 ? '#fff' : 'rgba(255,255,255,0.8)' }}>{date}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                  <span style={{ fontSize: '15px' }}>{idx === 0 ? 'LG 트윈스 (라팍)' : 'SSG 랜더스 (문학)'}</span>
                  <span style={{ fontWeight: 'bold', background: 'rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '15px' }}>
                    {idx > 1 ? '17:00' : '18:30'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        );
      case 'rank':
        return (
          <div className="scroll-area">
            <h1>시즌 순위 <span style={{ fontSize: '18px' }}>🏆</span></h1>
            <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white' }}>
                <thead style={{ background: 'rgba(255,255,255,0.1)' }}>
                  <tr>
                    <th style={{ padding: '15px', textAlign: 'left', fontSize: '14px' }}>순위</th>
                    <th style={{ padding: '15px', textAlign: 'left', fontSize: '14px' }}>팀</th>
                    <th style={{ padding: '15px', textAlign: 'right', fontSize: '14px' }}>승률</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { rank: 1, name: '삼성', icon: '🦁', rate: '0.638', active: true },
                    { rank: 2, name: 'KIA', icon: '🐯', rate: '0.591' },
                    { rank: 3, name: 'LG', icon: '🗼', rate: '0.542' },
                    { rank: 4, name: '한화', icon: '🦅', rate: '0.511' },
                    { rank: 5, name: '두산', icon: '🐻', rate: '0.498' }
                  ].map((team) => (
                    <tr key={team.rank} style={{
                      background: team.active ? 'rgba(7, 76, 161, 0.4)' : 'transparent',
                      borderBottom: '1px solid rgba(255,255,255,0.05)'
                    }}>
                      <td style={{ padding: '18px 15px', fontWeight: team.active ? 'bold' : 'normal' }}>{team.rank}</td>
                      <td style={{ padding: '18px 15px' }}>{team.icon} {team.name}</td>
                      <td style={{ padding: '18px 15px', textAlign: 'right' }}>{team.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '11px', opacity: 0.5 }}>※ 2026 KBO 공식 기록 기준</p>
          </div>
        );
      case 'more':
        return (
          <div className="scroll-area">
            <h1>더보기 <span style={{ fontSize: '18px' }}>⚙️</span></h1>

            <div className="glass-card">
              <h2 style={{ fontSize: '16px', color: 'var(--accent-silver)' }}>선한 능력으로 🕊️</h2>
              <p style={{ fontStyle: 'italic', fontSize: '13px', lineHeight: '1.6', color: 'rgba(255,255,255,0.9)' }}>
                "그 선한 능력에 우리 에워싸여 보호받으며 살아가리...<br />
                주 언제나 우리와 함께 계셔 하루 또 하루 늘 새로워라."
              </p>
              <p style={{ textAlign: 'right', marginTop: '10px', fontSize: '12px', opacity: 0.7 }}>— 디트리히 본회퍼</p>
            </div>

            <div className="glass-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ width: '55px', height: '55px', borderRadius: '50%', background: 'linear-gradient(45deg, #074CA1, #001f3f)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '24px', border: '2px solid rgba(255,255,255,0.3)' }}>🦁</div>
                <div>
                  <p style={{ fontWeight: 'bold', fontSize: '17px', margin: 0 }}>이호세 (Rhee Hose)</p>
                  <p style={{ fontSize: '12px', opacity: 0.7, margin: '3px 0 0 0' }}>Semgle Cloud Computing</p>
                </div>
              </div>
            </div>

            <div className="glass-card">
              <h2 style={{ fontSize: '16px' }}>앱 설정</h2>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '12px 0' }}>
                <span>푸시 알림</span>
                <span style={{ color: '#4CAF50', fontWeight: 'bold' }}>ON</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0' }}>
                <span>테마</span>
                <span>리퀴드 글래스</span>
              </div>
            </div>

            <div className="glass-button" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}>
              호주 이민 정보 상담 🌏
            </div>

            <div style={{ textAlign: 'center', marginTop: '40px', opacity: 0.4, fontSize: '10px', lineHeight: '2' }}>
              <p>본 앱은 대한민국 자유민주주의를 사랑하는 팬의 작품입니다.</p>
              <p>Designed and Built by Rhee Hose</p>
              <p>고양이민주주의 (Cat Democracy) 🐈</p>
              <p>© 2026 Samsung Lions Blue Blood Project</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100px', background: 'linear-gradient(to bottom, rgba(0,31,63,0.5), transparent)', pointerEvents: 'none', zIndex: 10 }}></div>

      {renderContent()}

      <nav className="bottom-nav">
        {[
          { id: 'home', icon: '🏠', label: '홈' },
          { id: 'match', icon: '⚾', label: '경기' },
          { id: 'rank', icon: '📊', label: '순위' },
          { id: 'more', icon: '⚙️', label: '설정' }
        ].map((tab) => (
          <div
            key={tab.id}
            className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="nav-icon" style={{ fontSize: activeTab === tab.id ? '22px' : '20px', transition: 'all 0.3s' }}>
              {tab.icon}
            </span>
            <span style={{ fontWeight: activeTab === tab.id ? 'bold' : 'normal' }}>{tab.label}</span>
          </div>
        ))}
      </nav>

      <style jsx global>{`
        .live-pill {
          font-size: 11px;
          background: #ff3b30;
          padding: 3px 10px;
          border-radius: 20px;
          color: white;
          font-weight: 800;
          box-shadow: 0 0 10px rgba(255, 59, 48, 0.5);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.6; }
          100% { opacity: 1; }
        }

        .scroll-area::-webkit-scrollbar {
          width: 0px;
        }
      `}</style>
    </>
  );
}
