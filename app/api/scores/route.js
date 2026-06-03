import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // 2026-06-03 기준으로 실제 데이터를 가져오기 위해 현재 날짜를 YYYYMMDD 형식으로 변환하거나, 
        // 실제 시즌 중인 과거 날짜(예: 20240603)로 조회하여 데이터 형식을 확인합니다.
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const todayStr = `${year}${month}${day}`;

        const response = await fetch(`https://api-gw.sports.naver.com/schedule/games?date=${todayStr}&category=kbaseball`, {
            next: { revalidate: 0 }
        });

        const data = await response.json();

        // 삼성 라이온즈 경기 필터링
        const lionsGame = data.result?.games?.find(g =>
            g.homeTeamName === "삼성" || g.awayTeamName === "삼성"
        );

        if (lionsGame) {
            return NextResponse.json({
                success: true,
                hasGame: true,
                game: {
                    home: lionsGame.homeTeamName,
                    away: lionsGame.awayTeamName,
                    homeScore: lionsGame.homeTeamScore,
                    awayScore: lionsGame.awayTeamScore,
                    status: lionsGame.statusInfo,
                    inning: lionsGame.inning || "",
                    isLive: lionsGame.statusCode === "LIVE",
                    startTime: lionsGame.gameDateTime ? lionsGame.gameDateTime.split('T')[1].substring(0, 5) : ""
                }
            });
        } else {
            // 경기가 없는 경우 'hasGame: false' 반환
            return NextResponse.json({
                success: true,
                hasGame: false,
                message: "오늘은 예정된 삼성 라이온즈 경기가 없습니다."
            });
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
