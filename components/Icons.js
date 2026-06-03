export const HomeIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 9.5L12 3L21 9.5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V9.5Z" />
        <path d="M9 21V12H15V21" />
    </svg>
);

export const MatchIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2C12 2 15 5 15 12C15 19 12 22 12 22" />
        <path d="M12 2C12 2 9 5 9 12C9 19 12 22 12 22" />
        <path d="M2 12H22" />
    </svg>
);

export const RankIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 20V10" />
        <path d="M12 20V4" />
        <path d="M6 20V14" />
    </svg>
);

export const MoreIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
        <circle cx="5" cy="12" r="1" />
    </svg>
);

export const LionIcon = ({ size = 24, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 10.39 4.47 8.89 5.29 7.63L16.37 18.71C15.11 19.53 13.61 20 12 20ZM18.71 16.37L7.63 5.29C8.89 4.47 10.39 4 12 4C16.41 4 20 7.59 20 12C20 13.61 19.53 15.11 18.71 16.37Z" fill={color} />
    </svg>
);

export const DoveIcon = ({ size = 24, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 10c0-4.418-3.582-8-8-8s-8 3.582-8 8c0 4.418 3.582 8 8 8s8-3.582 8-8z" />
        <path d="M12 22v-4" />
        <path d="M8 18l4 4 4-4" />
        <path d="M12 6v4" />
    </svg>
);
