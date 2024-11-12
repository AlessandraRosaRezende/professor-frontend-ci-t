import React, { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
  Alert,
  CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useUpdateStudentEvaluation } from '../../../../hooks/use-update-student-evaluation/use-update-student-evaluation.hook';

interface GradeDrawerProps {
  open: boolean;
  onClose: () => void;
  student: {
    name: string;
    id: string;
    status: string;
  };
  onEvaluationUpdate: () => void;
  urlBase: string;
}

export const GradeDrawer: React.FC<GradeDrawerProps> = ({
  open,
  onClose,
  student,
  onEvaluationUpdate,
  urlBase
}) => {
  const [formData, setFormData] = useState({
    aulas_lecionadas: '',
    aulas_atendidas: '',
    nota_p1: '',
    nota_p2: ''
  });

  const [formErrors, setFormErrors] = useState({
    aulas_lecionadas: '',
    aulas_atendidas: '',
    nota_p1: '',
    nota_p2: ''
  });

  const { updateEvaluation, loading, error } = useUpdateStudentEvaluation();

  const validateForm = (): boolean => {
    const newErrors = {
      aulas_lecionadas: '',
      aulas_atendidas: '',
      nota_p1: '',
      nota_p2: ''
    };

    let isValid = true;

    if (!formData.aulas_lecionadas) {
      newErrors.aulas_lecionadas = 'Campo obrigatório';
      isValid = false;
    } else if (Number(formData.aulas_lecionadas) <= 0) {
      newErrors.aulas_lecionadas = 'Deve ser maior que zero';
      isValid = false;
    }

    if (!formData.aulas_atendidas) {
      newErrors.aulas_atendidas = 'Campo obrigatório';
      isValid = false;
    } else if (Number(formData.aulas_atendidas) < 0) {
      newErrors.aulas_atendidas = 'Não pode ser negativo';
      isValid = false;
    } else if (Number(formData.aulas_atendidas) > Number(formData.aulas_lecionadas)) {
      newErrors.aulas_atendidas = 'Não pode ser maior que aulas lecionadas';
      isValid = false;
    }

    if (!formData.nota_p1) {
      newErrors.nota_p1 = 'Campo obrigatório';
      isValid = false;
    } else if (Number(formData.nota_p1) < 0 || Number(formData.nota_p1) > 10) {
      newErrors.nota_p1 = 'Deve estar entre 0 e 10';
      isValid = false;
    }

    if (!formData.nota_p2) {
      newErrors.nota_p2 = 'Campo obrigatório';
      isValid = false;
    } else if (Number(formData.nota_p2) < 0 || Number(formData.nota_p2) > 10) {
      newErrors.nota_p2 = 'Deve estar entre 0 e 10';
      isValid = false;
    }

    setFormErrors(newErrors);
    return isValid;
  };

  const handleChange = (field: keyof typeof formData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));

    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    const evaluation = {
      aulas_lecionadas: Number(formData.aulas_lecionadas),
      aulas_atendidas: Number(formData.aulas_atendidas),
      nota_p1: Number(formData.nota_p1),
      nota_p2: Number(formData.nota_p2)
    };

    const success = await updateEvaluation({
      urlBase,
      studentId: student.id,
      evaluation
    });

    if (success) {
      onEvaluationUpdate();
      onClose();
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{ '& .MuiDrawer-paper': { width: { xs: '100%', sm: 400 } } }}
    >
      <Box sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Lançar Notas e Frequência</Typography>
          <IconButton onClick={onClose} disabled={loading}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Typography variant="subtitle1" gutterBottom>
          Aluno: {student.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          RA: {student.id}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom sx={{ mb: 3 }}>
          Situação atual: {student.status}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" noValidate>
          <TextField
            fullWidth
            label="Aulas Lecionadas"
            type="number"
            value={formData.aulas_lecionadas}
            onChange={handleChange('aulas_lecionadas')}
            error={!!formErrors.aulas_lecionadas}
            helperText={formErrors.aulas_lecionadas}
            disabled={loading}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Aulas Atendidas"
            type="number"
            value={formData.aulas_atendidas}
            onChange={handleChange('aulas_atendidas')}
            error={!!formErrors.aulas_atendidas}
            helperText={formErrors.aulas_atendidas}
            disabled={loading}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Nota P1"
            type="number"
            value={formData.nota_p1}
            onChange={handleChange('nota_p1')}
            error={!!formErrors.nota_p1}
            helperText={formErrors.nota_p1}
            disabled={loading}
            margin="normal"
            inputProps={{ step: "0.1" }}
          />

          <TextField
            fullWidth
            label="Nota P2"
            type="number"
            value={formData.nota_p2}
            onChange={handleChange('nota_p2')}
            error={!!formErrors.nota_p2}
            helperText={formErrors.nota_p2}
            disabled={loading}
            margin="normal"
            inputProps={{ step: "0.1" }}
          />
        </Box>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading}
          sx={{ mt: 4 }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Lançar Notas e Frequência'
          )}
        </Button>
      </Box>
    </Drawer>
  );
};
