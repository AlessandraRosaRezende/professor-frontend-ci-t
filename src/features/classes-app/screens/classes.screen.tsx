import React from 'react';
import { Box, Card, CardContent, CircularProgress, Typography } from "@mui/material";
import { useListProfessorClassesById } from '../../../hooks/use-list-professor-classes-by-id/use-list-professor-classes-by-id.hook';
import { useNavigate } from 'react-router-dom';

export const ClassesScreen: React.FC = () => {
  const navigate = useNavigate();
  const { result: classesInfo, loading, error } = useListProfessorClassesById({ professorId: 'PROF001' });

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

      {classesInfo && (
        <Box display="flex" flexWrap="wrap" justifyContent="flex-start" gap={2}>
          {classesInfo.map((classe) => (
            <Box key={classe.courseId} sx={{ width: { xs: '100%', sm: '45%', md: '30%' }, padding: '1rem' }}>
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
                    Status: {classe.status || 'Carregando...'}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {classe.status === 'ABERTA'
                      ? 'Nenhuma nota ou frequência foi lançada ainda.'
                      : classe.status === 'EM_FECHAMENTO'
                        ? 'Notas e frequências foram lançadas para alguns alunos.'
                        : classe.status === 'FECHADA'
                          ? 'Notas e frequências foram lançadas para todos os alunos.'
                          : null}
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
