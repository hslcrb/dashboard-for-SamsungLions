import "./globals.css";

export const metadata = {
  title: "삼성 라이온즈 팬 대시보드",
  description: "최강삼성 라이온즈 팬들을 위한 실시간 경기 데이터 대시보드",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link rel="stylesheet" as="style" crossOrigin="true" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
