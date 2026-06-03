'use client';

import { motion } from 'framer-motion';

export default function PremiumButton({ children, onClick, style = {} }) {
    return (
        <motion.button
            className="premium-action-btn"
            onClick={onClick}
            style={style}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
        >
            <span className="btn-text">{children}</span>

            {/* 영롱한 블루 메쉬 그라데이션 오버레이 (Hover 시 노출) */}
            <motion.div
                className="mesh-gradient-overlay"
                variants={{
                    initial: { opacity: 0 },
                    hover: { opacity: 1, transition: { duration: 0.4 } },
                    tap: { opacity: 0.8 }
                }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: `
            radial-gradient(at 0% 0%, #074CA1 0%, transparent 50%),
            radial-gradient(at 100% 0%, #4facfe 0%, transparent 50%),
            radial-gradient(at 100% 100%, #00f2fe 0%, transparent 50%),
            radial-gradient(at 0% 100%, #074CA1 0%, transparent 50%)
          `,
                    filter: 'blur(10px)',
                    pointerEvents: 'none',
                    zIndex: 1
                }}
            />

            {/* 미세한 광택 효과 */}
            <motion.div
                className="shine-effect"
                variants={{
                    hover: {
                        x: ['-100%', '100%'],
                        transition: { duration: 1.5, repeat: Infinity, ease: "linear" }
                    }
                }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '30%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                    zIndex: 2,
                    pointerEvents: 'none'
                }}
            />
        </motion.button>
    );
}
