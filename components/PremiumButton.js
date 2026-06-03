'use client';

import { motion } from 'framer-motion';

export default function PremiumButton({ children, onClick, className = "", style = {} }) {
    return (
        <motion.button
            className={`premium-btn-base ${className}`}
            onClick={onClick}
            style={{
                position: 'relative',
                overflow: 'hidden',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                ...style
            }}
            whileHover="hover"
            whileTap="tap"
        >
            <span style={{ position: 'relative', zIndex: 2 }}>{children}</span>

            {/* Dynamic Fill Overlay */}
            <motion.div
                className="btn-fill-overlay"
                variants={{
                    hover: { x: '10%' },
                    tap: { x: '100%', transition: { duration: 0.4, ease: "circOut" } }
                }}
                initial={{ x: '-100%' }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)',
                    zIndex: 1
                }}
            />

            {/* Liquid Pulse Effect */}
            <motion.div
                className="btn-pulse"
                variants={{
                    tap: {
                        scale: [1, 2],
                        opacity: [0.3, 0],
                        transition: { duration: 0.5 }
                    }
                }}
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    background: 'rgba(255, 255, 255, 0.4)',
                    borderRadius: 'inherit',
                    zIndex: 1,
                    opacity: 0
                }}
            />

            <style jsx>{`
        .premium-btn-base {
          background: #074CA1;
          color: white;
          border-radius: 16px;
          padding: 16px;
          font-weight: 800;
          font-size: 15px;
          width: 100%;
          transition: background 0.3s ease;
          font-family: inherit;
        }
        .premium-btn-base:hover {
          background: #063d82;
        }
      `}</style>
        </motion.button>
    );
}
