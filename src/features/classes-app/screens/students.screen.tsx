import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardContent, CircularProgress, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useListStudentsFromClassById } from '../../../hooks/use-list-students-from-class-by-id/use-list-students-from-class-by-id.hook';
import { GradeDrawer } from '../components/grade-drawer/grade-drawer.component';
import { UseListStudentsFromClassByIdResult } from '../../../hooks/use-list-students-from-class-by-id/use-list-students-from-class-by-id.types';

export const StudentsScreen: React.FC = () => {
  const { classId } = useParams<{ classId: string }>();
  const navigate = useNavigate();
  const { result: studentsInfo, loading, error } = useListStudentsFromClassById({ classId: classId! });
  const [selectedStudent, setSelectedStudent] = useState<UseListStudentsFromClassByIdResult | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleStudentClick = (student: UseListStudentsFromClassByIdResult) => {
    setSelectedStudent(student);
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setSelectedStudent(null);
  };

  const handleEvaluationUpdate = () => {
    if (classId) {
      window.location.reload();
    }
  };

  const handleBackClick = () => {
    navigate('/');
  };

  const urlBase = 'http://localhost:8080';

  return (
    <Box sx={{ padding: '40px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <IconButton onClick={handleBackClick} sx={{ marginRight: '2px' }}>
          <ArrowBackIcon />
          <Typography variant="h6"> Voltar </Typography>
        </IconButton>
        <Typography variant="h5" sx={{ marginBottom: '20px', marginTop: '20px' }}>
          Alunos da Turma: {classId}
        </Typography>
      </Box>

      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}

      {studentsInfo && studentsInfo.length > 0 ? (
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="flex-start"
          gap={2}
        >
          {studentsInfo.map((student) => (
            <Box
              key={student.id}
              sx={{
                width: { xs: '100%', sm: '45%', md: '30%' },
                padding: '1rem'
              }}
            >
              <Card
                onClick={() => handleStudentClick(student)}
                sx={{
                  cursor: 'pointer',
                  height: '100%',
                  boxShadow: 2,
                  '&:hover': {
                    boxShadow: 6,
                    transform: 'translateY(-2px)',
                    transition: 'all 0.2s'
                  }
                }}
              >
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {student.name}
                  </Typography>
                  <Typography color="textSecondary">
                    RA: {student.id}
                  </Typography>
                  <Typography color="textSecondary">
                    Status: {student.status}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      ) : (
        !loading && <Typography>Nenhum aluno encontrado.</Typography>
      )}

      {selectedStudent && (
        <GradeDrawer
          open={drawerOpen}
          onClose={handleDrawerClose}
          student={selectedStudent}
          onEvaluationUpdate={handleEvaluationUpdate}
          urlBase={urlBase}
        />
      )}
    </Box>
  );
};
