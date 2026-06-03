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
            <div style={{ position: 'relative', width: '100%', height: '200px', borderRadius: '20px', overflow: 'hidden', marginBottom: '25px' }}>
              <Image
                src="/hero.png"
                alt="Samsung Lions Park"
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
              <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', background: 'linear-gradient(transparent, rgba(0,0,0,0.8))', padding: '15px' }}>
                <h1 style={{ margin: 0, fontSize: '20px' }}>최강삼성 승리하리라 🦁</h1>
              </div>
            </div>

            <div className="glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ margin: 0 }}>오늘의 매치</h2>
                <span style={{ fontSize: '12px', background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '10px' }}>LIVE</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '28px' }}>🦁</div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold' }}>삼성</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: '800' }}>vs</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>18:30 시작</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '28px' }}>🗼</div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold' }}>LG</div>
                </div>
              </div>
              <p style={{ marginTop: '15px', textAlign: 'center', fontSize: '13px' }}>대구 삼성 라이온즈 파크 (홈)</p>
            </div>

            <div className="glass-card">
              <h2>삼갤 실시간 반응 🔥</h2>
              <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
                <p><strong>익명:</strong> "오늘 선발 누구냐? 제발 털리지 말자 ㅋㅋㅋㅋ"</p>
                <p><strong>라이온즈핵심:</strong> "구자욱 홈런 가즈아아아아아아"</p>
                <p><strong>우승은삼성:</strong> "라팍 치킨 땡긴다... 직관 부럽네"</p>
              </div>
              <div className="glass-button" style={{ marginTop: '15px', fontSize: '12px', padding: '8px' }}>
                글쓰기
              </div>
            </div>

            <div className="glass-card" style={{ background: 'rgba(7, 76, 161, 0.3)' }}>
              <h3>📢 공지사항</h3>
              <p style={{ fontSize: '13px' }}>수원 한봄고 학생들 단체관람 이벤트 예정!</p>
            </div>
          </div>
        );
      case 'match':
        return (
          <div className="scroll-area">
            <h1>경기 일정 ⚾</h1>
            <div className="glass-card">
              <p style={{ fontWeight: 'bold', fontSize: '16px' }}>2026.06.04 (목)</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                <span>LG 트윈스 (원정)</span>
                <span style={{ fontWeight: 'bold' }}>18:30</span>
              </div>
            </div>
            <div className="glass-card">
              <p style={{ fontWeight: 'bold', fontSize: '16px' }}>2026.06.05 (금)</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                <span>SSG 랜더스 (원정)</span>
                <span style={{ fontWeight: 'bold' }}>18:30</span>
              </div>
            </div>
            <div className="glass-card">
              <p style={{ fontWeight: 'bold', fontSize: '16px' }}>2026.06.06 (토)</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                <span>SSG 랜더스 (원정)</span>
                <span style={{ fontWeight: 'bold' }}>17:00</span>
              </div>
            </div>
            <div className="glass-card">
              <p style={{ fontWeight: 'bold', fontSize: '16px' }}>2026.06.07 (일)</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                <span>SSG 랜더스 (원정)</span>
                <span style={{ fontWeight: 'bold' }}>17:00</span>
              </div>
            </div>
          </div>
        );
      case 'rank':
        return (
          <div className="scroll-area">
            <h1>KBO 리그 순위 🏆</h1>
            <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white' }}>
                <thead style={{ background: 'rgba(255,255,255,0.1)' }}>
                  <tr>
                    <th style={{ padding: '15px', textAlign: 'left' }}>순위</th>
                    <th style={{ padding: '15px', textAlign: 'left' }}>팀</th>
                    <th style={{ padding: '15px', textAlign: 'right' }}>승률</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ background: 'rgba(7, 76, 161, 0.4)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <td style={{ padding: '15px', fontWeight: 'bold' }}>1</td>
                    <td style={{ padding: '15px' }}>🦁 삼성 라이온즈</td>
                    <td style={{ padding: '15px', textAlign: 'right' }}>0.638</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <td style={{ padding: '15px' }}>2</td>
                    <td style={{ padding: '15px' }}>🐯 KIA 타이거즈</td>
                    <td style={{ padding: '15px', textAlign: 'right' }}>0.591</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <td style={{ padding: '15px' }}>3</td>
                    <td style={{ padding: '15px' }}>🗼 LG 트윈스</td>
                    <td style={{ padding: '15px', textAlign: 'right' }}>0.542</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <td style={{ padding: '15px' }}>4</td>
                    <td style={{ padding: '15px' }}>🦅 한화 이글스</td>
                    <td style={{ padding: '15px', textAlign: 'right' }}>0.511</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '11px', opacity: 0.6 }}>2026년 6월 3일 기준</p>
          </div>
        );
      case 'more':
        return (
          <div className="scroll-area">
            <h1>더보기 ⚙️</h1>
            <div className="glass-card">
              <h2>사용자 정보</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--primary-blue)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '24px' }}>⚾</div>
                <div>
                  <p style={{ fontWeight: 'bold', fontSize: '16px', opacity: 1 }}>이호세 님</p>
                  <p style={{ fontSize: '12px' }}>레드 등급 멤버십</p>
                </div>
              </div>
            </div>

            <div className="glass-card">
              <h2>응원가 플레이어</h2>
              <p>현재 재생 중인 응원가 없음</p>
              <div className="glass-button" style={{ marginTop: '10px', fontSize: '12px' }}>
                전체 응원가 듣기
              </div>
            </div>

            <div className="glass-card">
              <h2>앱 설정</h2>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '10px 0' }}>
                <span>푸시 알림</span>
                <span>ON</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
                <span>테마</span>
                <span>글래스 (기본)</span>
              </div>
            </div>

            <div className="glass-card" style={{ background: 'rgba(255, 0, 0, 0.1)', border: '1px solid rgba(255, 0, 0, 0.2)' }}>
              <p style={{ color: '#ff8888', textAlign: 'center' }}>로그아웃</p>
            </div>

            <div style={{ textAlign: 'center', marginTop: '30px', opacity: 0.5, fontSize: '11px', lineHeight: '1.8' }}>
              <p>삼성라이온즈 크리에이티브 팬 앱</p>
              <p>Developer: Rhee Hose (Semgle)</p>
              <p>고양이민주주의 (Cat Democracy) - 🦁</p>
              <p>© 2026 Samsung Lions Fans Project</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {renderContent()}

      <nav className="bottom-nav">
        <div className={`nav-item ${activeTab === 'home' ? 'active' : ''}`} onClick={() => setActiveTab('home')}>
          <span className="nav-icon">🏠</span>
          <span>홈</span>
        </div>
        <div className={`nav-item ${activeTab === 'match' ? 'active' : ''}`} onClick={() => setActiveTab('match')}>
          <span className="nav-icon">⚾</span>
          <span>경기</span>
        </div>
        <div className={`nav-item ${activeTab === 'rank' ? 'active' : ''}`} onClick={() => setActiveTab('rank')}>
          <span className="nav-icon">📊</span>
          <span>순위</span>
        </div>
        <div className={`nav-item ${activeTab === 'more' ? 'active' : ''}`} onClick={() => setActiveTab('more')}>
          <span className="nav-icon">⚙️</span>
          <span>설정</span>
        </div>
      </nav>

      <style jsx global>{`
        body {
          margin: 0;
          background: linear-gradient(135deg, #001f3f 0%, #074CA1 100%);
          background-attachment: fixed;
        }
      `}</style>
    </>
  );
}
