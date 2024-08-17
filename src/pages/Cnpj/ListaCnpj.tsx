import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  CircularProgress,
  Typography,
  Box,
  Snackbar,
  Alert,
  Paper,
} from '@mui/material';

interface CNPJData {
  cnpj: string;
  razao_social: string;
  nome_fantasia: string;
  cep: string;
  logradouro: string;
  numero: string;
  bairro: string;
  municipio: string;
  uf: string;
  email: string;
  ddd_telefone_1: string;
  data_inicio_atividade: string;
  descricao_situacao_cadastral: string;
}

export const ListaCnpj: React.FC = () => {
  const [cnpj, setCnpj] = useState<string>('');
  const [dados, setDados] = useState<CNPJData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCnpj(event.target.value);
  };

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setDados(null);

    try {
      const response = await axios.get<CNPJData>(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);
      setDados(response.data);
      setEditMode(true);
    } catch (err) {
      setError('Ocorreu um erro ao buscar o CNPJ. Verifique se o CNPJ está correto.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {

    console.log('Dados salvos:', dados);
    setEditMode(false);
    setShowSnackbar(true);
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (dados) {
      setDados({
        ...dados,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  return (
    <Container maxWidth="md">
      <Box padding={2}>
        <TextField
          fullWidth
          label="Digite o CNPJ"
          variant="outlined"
          value={cnpj}
          onChange={handleInputChange}
          error={Boolean(error)}
          helperText={error || ''}
          disabled={editMode}
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        disabled={loading || cnpj.length !== 14 || editMode}
        fullWidth
      >
        Buscar
      </Button>

      {loading && (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      )}

      {dados && (
        <Box mt={4}>
          <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h5" color="primary">
              {dados.razao_social}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {dados.nome_fantasia}
            </Typography>
          </Paper>

          <Typography variant="h6">Editar Informações</Typography>

          <TextField
            fullWidth
            margin="normal"
            label="Data de Abertura"
            name="data_inicio_atividade"
            variant="outlined"
            value={dados.data_inicio_atividade}
            onChange={handleFormChange}
            disabled={!editMode}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Situação"
            name="descricao_situacao_cadastral"
            variant="outlined"
            value={dados.descricao_situacao_cadastral}
            onChange={handleFormChange}
            disabled={!editMode}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Número"
            name="numero"
            variant="outlined"
            value={dados.numero}
            onChange={handleFormChange}
            disabled={!editMode}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Logradouro"
            name="logradouro"
            variant="outlined"
            value={dados.logradouro}
            onChange={handleFormChange}
            disabled={!editMode}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Bairro"
            name="bairro"
            variant="outlined"
            value={dados.bairro}
            onChange={handleFormChange}
            disabled={!editMode}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Município"
            name="municipio"
            variant="outlined"
            value={dados.municipio}
            onChange={handleFormChange}
            disabled={!editMode}
          />
          <TextField
            fullWidth
            margin="normal"
            label="UF"
            name="uf"
            variant="outlined"
            value={dados.uf}
            onChange={handleFormChange}
            disabled={!editMode}
          />
          <TextField
            fullWidth
            margin="normal"
            label="CEP"
            name="cep"
            variant="outlined"
            value={dados.cep}
            onChange={handleFormChange}
            disabled={!editMode}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Telefone"
            name="ddd_telefone_1"
            variant="outlined"
            value={dados.ddd_telefone_1}
            onChange={handleFormChange}
            disabled={!editMode}
          />
          <TextField
            fullWidth
            margin="normal"
            label="E-mail"
            name="email"
            variant="outlined"
            value={dados.email}
            onChange={handleFormChange}
            disabled={!editMode}
          />
          <Box padding={1}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSave}
              fullWidth
              sx={{ mt: 4 }}
              disabled={!editMode}

            >
              Salvar
            </Button>
          </Box>
        </Box>
      )}


      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Dados salvos com sucesso!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ListaCnpj;
