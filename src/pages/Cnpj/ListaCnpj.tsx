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
      setEditMode(true); // Ativa o modo de edição após os dados serem carregados
    } catch (err) {
      setError('Ocorreu um erro ao buscar o CNPJ. Verifique se o CNPJ está correto.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    // Aqui você pode salvar os dados localmente, enviar para outra API, etc.
    console.log('Dados salvos:', dados);
    setEditMode(false); // Desativa o modo de edição após salvar
    setShowSnackbar(true); // Exibe a mensagem de confirmação de salvamento
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
    setShowSnackbar(false); // Fecha a mensagem de confirmação
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4} mb={2} padding={2}>
        <TextField
          fullWidth
          label="Digite o CNPJ"
          variant="outlined"
          value={cnpj}
          onChange={handleInputChange}
          error={Boolean(error)}
          helperText={error || ''}
          disabled={editMode} // Desabilita o campo de busca durante o modo de edição
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
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress />
        </Box>
      )}

      {dados && (
        <Box mt={4}>
          <Typography variant="h6">Editar Informações</Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Razão Social"
            name="razao_social"
            variant="outlined"
            value={dados.razao_social}
            onChange={handleFormChange}
            disabled={!editMode}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Nome Fantasia"
            name="nome_fantasia"
            variant="outlined"
            value={dados.nome_fantasia}
            onChange={handleFormChange}
            disabled={!editMode}
          />
          <TextField
            fullWidth
            margin="normal"
            label="CNPJ"
            name="cnpj"
            variant="outlined"
            value={dados.cnpj}
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
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSave}
            fullWidth
            sx={{ mt: 2 }}
            disabled={!editMode}
          >
            Salvar
          </Button>
        </Box>
      )}

      {/* Snackbar para feedback de salvamento */}
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
