// styles.js
import { styled } from '@mui/system';
import Container from '@mui/material/Container';


export const StyledHeader = styled('header')({
  background: 'linear-gradient(to right, #2193b0, #6dd5ed)', // グラデーション背景
    padding: '20px 0', // 上下の余白
    textAlign: 'center',
    color: 'white',
  });
  
export const StyledContainer = styled(Container)({
  background: 'rgba(255, 255, 255, 0.8)',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  borderRadius: '0.25rem',
  padding: '20px',
  marginTop: '20px',
  color: '#333',
  maxWidth: '1130px',
});

export const CustomForm = styled('form')({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr auto',
  gridColumnGap: '20px', // グリッドの列間の間隔
  gridRowGap: '20px', // グリッドの行間の間隔
  alignItems: 'center', // グリッドアイテムの垂直方向の配置
  margin: '20px 0', // フォームのマージン

  // レスポンシブデザインのための追加スタイル
  '@media (max-width: 600px)': {
    gridTemplateColumns: '1fr', // 小さい画面では1列に
    gridColumnGap: '10px',
    gridRowGap: '10px',
  },
});

export  const StyledFooter = styled('footer')({
    background: 'rgba(255, 255, 255, 0.8)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '1rem',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    textAlign: 'center',
  });