// PetRegisterPage.js
import React from 'react';
import styled from '@emotion/styled';
import { Paper, Typography, TextField, Button } from '@mui/material';

const PaperStyled = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(2),
}));

const Form = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const TextFieldStyled = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(1),
  width: '80%',
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2),
  width: '50%',
}));

const TestPage = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes agregar la lógica para registrar una mascota
  };

  return (
    <PaperStyled>
      <Typography variant="h4" align="center">
        Registrar una mascota
      </Typography>
      <Form onSubmit={handleSubmit}>
        <TextFieldStyled
          label="Nombre"
          variant="outlined"
          required
        />
        <TextFieldStyled
          label="Edad"
          variant="outlined"
          type="number"
          required
        />
        <TextFieldStyled
          label="Especie"
          variant="outlined"
          required
        />
        <TextFieldStyled
          label="Raza"
          variant="outlined"
          required
        />
        <ButtonStyled
          variant="contained"
          color="primary"
          type="submit"
        >
          Registrar
        </ButtonStyled>
      </Form>
    </PaperStyled>
  );
};

export default TestPage;
