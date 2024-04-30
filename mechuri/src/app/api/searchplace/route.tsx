import { NextRequest } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET(req: NextRequest) {
  try {
    // const query = req.nextUrl.searchParams.get('query');
    console.log(req.nextUrl.searchParams);
    const keyword = req.nextUrl.searchParams.get('query');
    const currentPage = req.nextUrl.searchParams.get('page');
    const pageSize = req.nextUrl.searchParams.get('size');
    const currentLng = req.nextUrl.searchParams.get('x');
    const currentLat = req.nextUrl.searchParams.get('y');
    const radius = req.nextUrl.searchParams.get('radius');

    // const requestBody = await req.json();
    const url = `https://dapi.kakao.com/v2/local/search/keyword?query=${keyword}&page=${currentPage}&size=${pageSize}&x=${currentLng}&y=${currentLat}&radius=${radius}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_RESTAPI_APIKEY}`,
      },
    });
    const data = await response.json();

    return new Response(JSON.stringify(data));
  } catch {
    return new Response(JSON.stringify({ error: '에러' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
