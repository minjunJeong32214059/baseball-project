import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({ date: '', homeTeam: '', awayTeam: '', result: '', memo: '' });

  useEffect(() => { fetchRecords(); }, []);

  const fetchRecords = async () => {
    const res = await axios.get('http://localhost:8081/api/records');
    setRecords(res.data);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8081/api/records', formData);
    setFormData({ date: '', homeTeam: '', awayTeam: '', result: '', memo: '' });
    fetchRecords();
  };

  const handleDelete = async (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      await axios.delete(`http://localhost:8081/api/records/${id}`);
      fetchRecords();
    }
  };

  // --- 승률 및 통계 로직 ---
  const wins = records.filter(r => r.result.includes('승리')).length;
  const draws = records.filter(r => r.result.includes('무승부')).length;
  const losses = records.filter(r => r.result.includes('패배')).length;
  
  // KBO 공식 승률: 승 / (승 + 패) -> 무승부는 계산에서 제외하여 승률 유지 효과
  const totalGamesForRate = wins + losses;
  const winRate = totalGamesForRate > 0 ? ((wins / totalGamesForRate) * 100).toFixed(1) : 0;

  return (
    <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto', fontFamily: 'sans-serif', backgroundColor: '#f4f7f6' }}>
      <h1 style={{ textAlign: 'center', color: '#071d49' }}>직관 승률 계산기</h1>
      
      {/* 통계 섹션 (글자 크기 및 비율 조정) */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '15px', 
        backgroundColor: '#071d49', 
        color: 'white', 
        padding: '25px 20px', // 패딩을 살짝 줄임
        borderRadius: '15px', 
        marginBottom: '30px', 
        textAlign: 'center',
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
      }}>
        <div style={{ fontSize: '1rem' }}>총 직관<br/>
          <strong style={{ fontSize: '1.6rem', display: 'block', marginTop: '5px' }}>{records.length}</strong>
        </div>
        <div style={{ fontSize: '1rem', color: '#ff4d4d' }}>승<br/>
          <strong style={{ fontSize: '1.6rem', display: 'block', marginTop: '5px' }}>{wins}</strong>
        </div>
        <div style={{ fontSize: '1rem', color: '#ffcc00' }}>무<br/>
          <strong style={{ fontSize: '1.6rem', display: 'block', marginTop: '5px' }}>{draws}</strong>
        </div>
        <div style={{ fontSize: '1rem', color: '#4d94ff' }}>패<br/>
          <strong style={{ fontSize: '1.6rem', display: 'block', marginTop: '5px' }}>{losses}</strong>
        </div>
        
        {/* 승률 표시 영역 */}
        <div style={{ 
          gridColumn: 'span 4', 
          marginTop: '15px', 
          borderTop: '1px solid #334b7a', 
          paddingTop: '15px', 
          fontSize: '1.1rem' 
        }}>
          현재 시즌 승률: <strong style={{ fontSize: '1.8rem', color: '#00ffcc', marginLeft: '10px' }}>{winRate}%</strong>
        </div>
      </div>

      {/* 입력 폼 */}
      <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <input type="date" name="date" value={formData.date} onChange={handleChange} required style={inputStyle} />
          <select name="result" value={formData.result} onChange={handleChange} required style={inputStyle}>
            <option value="">결과 선택</option>
            <option value="승리">승리</option>
            <option value="무승부">무승부</option>
            <option value="패배">패배</option>
          </select>
          <input type="text" name="homeTeam" placeholder="홈 팀" value={formData.homeTeam} onChange={handleChange} required style={inputStyle} />
          <input type="text" name="awayTeam" placeholder="어웨이 팀" value={formData.awayTeam} onChange={handleChange} required style={inputStyle} />
        </div>
        <input type="text" name="memo" placeholder="오늘 경기의 한 줄 평" value={formData.memo} onChange={handleChange} style={{ ...inputStyle, width: '100%', marginTop: '10px', boxSizing: 'border-box' }} />
        <button type="submit" style={{ width: '100%', marginTop: '15px', padding: '12px', backgroundColor: '#071d49', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>데이터 기록</button>
      </form>

      {/* 리스트 */}
      <div style={{ backgroundColor: 'white', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#f8f9fa' }}>
            <tr>
              <th style={thStyle}>날짜</th><th style={thStyle}>대진</th><th style={thStyle}>결과</th><th style={thStyle}>메모</th><th style={thStyle}>삭제</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r, idx) => (
              <tr key={r.id || idx} style={{ borderBottom: '1px solid #eee' }}>
                <td style={tdStyle}>{r.date}</td>
                <td style={tdStyle}>{r.homeTeam} vs {r.awayTeam}</td>
                <td style={{ 
                  ...tdStyle, 
                  color: r.result === '승리' ? '#ff4d4d' : r.result === '무승부' ? '#ffcc00' : '#4d94ff',
                  fontWeight: 'bold' 
                }}>{r.result}</td>
                <td style={tdStyle}>{r.memo}</td>
                <td style={tdStyle}><button onClick={() => handleDelete(r.id)} style={{ color: '#ccc', border: 'none', background: 'none', cursor: 'pointer' }}>X</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const inputStyle = { padding: '12px', borderRadius: '5px', border: '1px solid #ddd', fontSize: '14px' };
const thStyle = { padding: '15px', borderBottom: '2px solid #eee', color: '#666' };
const tdStyle = { padding: '15px', textAlign: 'center', color: '#333' };

export default App;