import React from 'react';
import { Box, Card, CardContent, CircularProgress, Typography } from '@mui/material';
import { useListProfessorClassesById } from '../../../hooks/use-list-professor-classes-by-id/use-list-professor-classes-by-id.hook';
import { useNavigate } from 'react-router-dom';

export const ClassesScreen: React.FC = () => {
  const navigate = useNavigate();
  const urlBase = 'http://localhost:8080';
  const { classes, loading, error } = useListProfessorClassesById({ urlBase, professorId: 'PROF001' });

  const handleCardClick = (classId: string) => {
    navigate(`/class/${classId}`);
  };

  return (
    <Box sx={{ padding: '90px' }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ marginBottom: '20px', marginTop: '-20px' }}>
        Turmas
      </Typography>

      {loading && <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />}
      {error && <Typography color="error">{error}</Typography>}
      
      {classes && (
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="flex-start"
          gap={2}
        >
          {classes.map((classe) => (
            <Box
              key={classe.courseId}
              sx={{
                width: { xs: '100%', sm: '45%', md: '30%' },
                padding: '1rem'
              }}
            >
              <Card onClick={() => handleCardClick(classe.code)} sx={{ cursor: 'pointer', height: '100%', boxShadow: 2 }}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {classe.code}
                  </Typography>
                  <Typography color="textSecondary">
                    Disciplina: {classe.courseId}
                  </Typography>
                  <Typography color="textSecondary">
                    Campus: {classe.campus}
                  </Typography>
                  <Typography color="textSecondary">
                    Período: {classe.period}
                  </Typography>
                  <Typography color="textSecondary">
                    Modalidade: {classe.modality}
                  </Typography>
                  <Typography color="textSecondary">
                    Status: {classe.status || 'Desconhecido'}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
