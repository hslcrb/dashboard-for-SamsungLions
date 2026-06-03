'use client';

import { motion } from 'framer-motion';

export default function PremiumButton({ children, onClick, style = {} }) {
    return (
        <motion.button
            className="premium-action-btn"
            onClick={onClick}
            style={{
                ...style,
                willChange: 'transform, opacity', /* 하드웨어 가속 유도 */
            }}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
        >
            <span className="btn-text">{children}</span>

            {/* 최적화된 영롱한 블루 메쉬 그라데이션 (filter: blur 제거하여 성능 확보) */}
            <motion.div
                className="mesh-gradient-overlay"
                variants={{
                    initial: { opacity: 0 },
                    hover: { opacity: 1 },
                    tap: { opacity: 0.7 }
                }}
                transition={{ duration: 0.2, ease: "linear" }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `
            radial-gradient(at 0% 0%, rgba(7, 76, 161, 0.8) 0%, transparent 70%),
            radial-gradient(at 100% 0%, rgba(79, 172, 254, 0.6) 0%, transparent 70%),
            radial-gradient(at 100% 100%, rgba(0, 242, 254, 0.4) 0%, transparent 70%),
            radial-gradient(at 0% 100%, rgba(7, 76, 161, 0.6) 0%, transparent 70%)
          `,
                    pointerEvents: 'none',
                    zIndex: 1
                }}
            />

            {/* 단순화된 광택 효과 (CSS 애니메이션 활용으로 메인 스레드 부하 감소) */}
            <div className="shine-layer" />

            <style jsx>{`
        .premium-action-btn {
          position: relative;
          overflow: hidden;
          will-change: transform;
        }
        .shine-layer {
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
          z-index: 2;
          pointer-events: none;
          transition: none;
        }
        .premium-action-btn:hover .shine-layer {
          animation: fastShine 1.2s infinite linear;
        }
        @keyframes fastShine {
          0% { left: -100%; }
          100% { left: 150%; }
        }
      `}</style>
        </motion.button>
    );
}
