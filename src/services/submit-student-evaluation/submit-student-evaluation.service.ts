import axios from 'axios';

interface SubmitStudentEvaluationService {
  urlBase: string;
  studentId: string;
  evaluation: Evaluation;
}

interface Evaluation {
  aulas_lecionadas: number;
  aulas_atendidas: number;
  nota_p1: number;
  nota_p2: number;
}

export const submitStudentEvaluationService = async ({
  urlBase,
  studentId,
  evaluation,
}: SubmitStudentEvaluationService): Promise<boolean> => {
  try {
    const response = await axios.post(`${urlBase}/students/${studentId}/evaluation`, evaluation);

    if (response.status === 200) {
      return true;
    } else {
      throw new Error('Erro ao atualizar a avaliação');
    }
  } catch (error) {
    console.error('Erro ao submeter a avaliação:', error);
    return false;
  }
};
