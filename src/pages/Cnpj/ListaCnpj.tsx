import React, { ReactNode, useState } from 'react';
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
import { LayoutBaseDePagina } from '../../shared/layout';
import { DrawerProvider } from '../../shared/contexts';

interface ListaCnpjProps {
  children?: ReactNode; 
}
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

export const ListaCnpj: React.FC<ListaCnpjProps> = ({ children }) => {
  const [cnpj, setCnpj] = useState<string>('');
  const [dados, setDados] = useState<CNPJData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCnpj(event.target.value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    
    const numbersOnly = /^[0-9]*$/;

    if (numbersOnly.test(inputValue)) {
      setValue(inputValue);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setDados(null);

    try {
      const response = await axios.get<CNPJData>(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);
      const {
        razao_social,
        nome_fantasia,
        cep,
        logradouro,
        numero,
        bairro,
        municipio,
        uf,
        email,
        ddd_telefone_1,
        data_inicio_atividade,
        descricao_situacao_cadastral,

      } = response.data;


      setDados({
        cnpj,
        razao_social,
        nome_fantasia,
        cep,
        logradouro,
        numero,
        bairro,
        municipio,
        uf,
        email,
        ddd_telefone_1,
        data_inicio_atividade,
        descricao_situacao_cadastral

      });
      setEditMode(true);
    } catch (err) {
      setError('Ocorreu um erro ao buscar o CNPJ. Verifique se o CNPJ está correto.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (dados) {
      console.log('Valores salvos:', {
        razao_socia: dados.razao_social,
        nome_fantasia: dados.nome_fantasia,
        cep: dados.cep,
        logradouro: dados.logradouro,
        numero: dados.numero,
        bairro: dados.bairro,
        municipio: dados.municipio,
        uf: dados.uf,
        email: dados.email,
        ddd_telefone_1: dados.ddd_telefone_1,
        data_inicio_atividade: dados.data_inicio_atividade,
        descricao_situacao_cadastral: dados.descricao_situacao_cadastral,
      });
      setEditMode(false);
      setShowSnackbar(true);
    }
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
    <LayoutBaseDePagina titulo='Consultar CNPJ'>
      <DrawerProvider>
        <Container maxWidth="sm">
          <Box padding={3}>
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
            <Box display="flex" justifyContent="center" mt={2}>
              <CircularProgress />
            </Box>
          )}

          {dados && (
            <Box mt={4} padding={3}> 
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
      </DrawerProvider>
    </LayoutBaseDePagina>
  );
};

export default ListaCnpj;
