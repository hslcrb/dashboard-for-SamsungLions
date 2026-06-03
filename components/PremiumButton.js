'use client';

import { motion } from 'framer-motion';

export default function PremiumButton({ children, onClick, style = {} }) {
    return (
        <motion.button
            className="premium-action-btn"
            onClick={onClick}
            style={style}
            whileTap="tap"
            initial="initial"
            whileHover="hover"
        >
            <span className="btn-text">{children}</span>

            {/* 쫀득한 내부 채우기 애니메이션 */}
            <motion.div
                className="btn-filling"
                variants={{
                    initial: { x: '-100%', opacity: 0 },
                    hover: { x: '-80%', opacity: 0.1 },
                    tap: {
                        x: '0%',
                        opacity: 0.3,
                        transition: { duration: 0.3, ease: "easeOut" }
                    }
                }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 100%)',
                    pointerEvents: 'none',
                    zIndex: 1
                }}
            />

            {/* 액티브 펄스 효과 */}
            <motion.div
                className="btn-shine"
                variants={{
                    tap: {
                        scale: [0.8, 1.5],
                        opacity: [0.5, 0],
                        transition: { duration: 0.6 }
                    }
                }}
                initial={{ scale: 0, opacity: 0 }}
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    background: 'rgba(255,255,255,0.4)',
                    borderRadius: 'inherit',
                    pointerEvents: 'none',
                    zIndex: 0
                }}
            />
        </motion.button>
    );
}
