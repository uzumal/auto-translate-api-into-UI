import { AppBar, Toolbar, Typography } from '@mui/material';

const footerStyle: React.CSSProperties = {
  backgroundColor: '#333', // お好みの色に変更
  color: 'white', // テキストの色を適切なものに変更
  textAlign: 'center',
};

const ModernFooter: React.FC = () => {
  return (
    <AppBar position="static" style={footerStyle}>
      <Toolbar>
        <Typography variant="body1">
          &copy; {new Date().getFullYear()} My Modern Website
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default ModernFooter;
