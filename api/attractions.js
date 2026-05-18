// api/attractions.js
export default async function handler(req, res) {
  // Vercel 환경변수에 등록한 API_KEY를 가져옵니다.
  const SERVICE_KEY = process.env.SERVICE_KEY;
  const { pageNo = 1, numOfRows = 10 } = req.query;

  // 공공데이터포털 API URL (행정안전부_전국어린이놀이시설정보서비스)
  const baseUrl = 'https://apis.data.go.kr/1741000/pfc3/getPfctInfo3';
  
  // 인증키는 이미 인코딩되어 있을 수 있으므로 decode 후 사용하거나 그대로 사용 여부 확인이 필요할 수 있습니다.
  const url = `${baseUrl}?serviceKey=${SERVICE_KEY}&pageNo=${pageNo}&numOfRows=${numOfRows}&type=json`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`공공데이터 API 응답 오류: ${response.status}`);
    }
    const data = await response.json();
    
    // 클라이언트에 결과 반환
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: '데이터를 가져오는 중 오류가 발생했습니다.', details: error.message });
  }
}
