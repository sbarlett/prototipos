import { Button, Typography } from "@mui/material";
import WrapperLayout from "../components/layout/WrapperLayout";

export const Home = () => {
  return (
    <WrapperLayout>
      <Typography variant="h4" gutterBottom>
        Home
      </Typography>
      <Typography>Bienvenido a la página principal.</Typography>
      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={() => alert("Click en Home")}
      >
        Buton
      </Button>
    </WrapperLayout>
  );
};
