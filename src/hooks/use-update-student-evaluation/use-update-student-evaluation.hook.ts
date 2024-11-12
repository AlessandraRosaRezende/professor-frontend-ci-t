import { useState } from 'react';
import { submitStudentEvaluationService } from '../../services/submit-student-evaluation/submit-student-evaluation.service';

interface UseUpdateStudentEvaluation {
  updateEvaluation: (params: {
    urlBase: string;
    studentId: string;
    evaluation: {
      aulas_lecionadas: number;
      aulas_atendidas: number;
      nota_p1: number;
      nota_p2: number;
    };
  }) => Promise<boolean>;
  loading: boolean;
  error: string | null;
}

export const useUpdateStudentEvaluation = (): UseUpdateStudentEvaluation => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateEvaluation = async ({
    urlBase,
    studentId,
    evaluation
  }: {
    urlBase: string;
    studentId: string;
    evaluation: {
      aulas_lecionadas: number;
      aulas_atendidas: number;
      nota_p1: number;
      nota_p2: number;
    };
  }) => {
    setLoading(true);
    setError(null);

    const success = await submitStudentEvaluationService({ urlBase, studentId, evaluation });

    setLoading(false);

    if (!success) {
      setError('Falha ao atualizar a avaliação.');
    }

    return success;
  };

  return { updateEvaluation, loading, error };
};
