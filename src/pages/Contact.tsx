import { Button, Stack, TextField, Typography } from "@mui/material";
import WrapperLayout from "../components/layout/WrapperLayout";

export const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Formulario enviado");
  };
  return (
    <WrapperLayout>
      {" "}
      <Typography variant="h4" gutterBottom>
        Contact
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField label="Nombre" required />
          <TextField label="Email" type="email" required />
          <Button type="submit" variant="contained">
            Enviar
          </Button>
        </Stack>
      </form>
    </WrapperLayout>
  );
};
