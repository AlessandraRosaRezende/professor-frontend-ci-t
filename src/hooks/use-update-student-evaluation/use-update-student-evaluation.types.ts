export interface StudentEvaluation {
  aulas_lecionadas: number;
  aulas_atendidas: number;
  nota_p1: number;
  nota_p2: number;
}

export interface UseUpdateStudentEvaluationProps {
  classId: string;
  studentId: string;
  evaluation: StudentEvaluation;
}