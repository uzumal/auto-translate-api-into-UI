import { AppBar, Toolbar, Typography } from '@mui/material';

const headerStyle: React.CSSProperties = {
  backgroundColor: '#333', // お好みの色に変更
  color: 'white', // テキストの色を適切なものに変更
  textAlign: 'center',
};

const ModernHeader: React.FC = () => {
  return (
    <AppBar position="static" style={headerStyle}>
      <Toolbar>
        <Typography variant="h6">
          My Modern Website
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default ModernHeader;
