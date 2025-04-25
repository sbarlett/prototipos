import { Button, Typography } from "@mui/material";
import WrapperLayout from "../components/layout/WrapperLayout";

export const About = () => {
  return (
    <WrapperLayout>
      {" "}
      <Typography variant="h4" gutterBottom>
        About
      </Typography>
      <Typography>Esta es la página de información.</Typography>
      <Button
        variant="outlined"
        sx={{ mt: 2 }}
        onClick={() => console.log("Click en About")}
      >
        Ver más info
      </Button>
    </WrapperLayout>
  );
};
