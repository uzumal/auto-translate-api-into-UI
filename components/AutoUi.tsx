import { Container, Typography, Paper } from '@mui/material';

const Content2: React.FC = () => {
  return (
    <Container>
      <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
        <Typography variant="h4">
          Content 2 Awaits You
        </Typography>
        <Typography>
          Dive into the second section of our amazing content.
        </Typography>
      </Paper>
    </Container>
  );
};

export default Content2;
