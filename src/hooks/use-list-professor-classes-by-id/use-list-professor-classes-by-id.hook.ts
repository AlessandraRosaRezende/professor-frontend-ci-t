import { useState, useEffect } from 'react';
import { listProfessorClassesByIdService } from '../../services/list-professor-classes-by-id/list-professor-classes-by-id.service';
import { ClassWithStatus, listProfessorClassesByIdServiceInput, UseListProfessorClassesByIdResult } from '../../services/list-professor-classes-by-id/list-professor-classes-by-id.types';
import { fetchClassStatusService } from '../../services/fetch-class-status/fetch-class-status.service';

export const useListProfessorClassesById = ({
  professorId,
}: listProfessorClassesByIdServiceInput): UseListProfessorClassesByIdResult => {
  const [classes, setClasses] = useState<ClassWithStatus[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const urlBase = 'http://localhost:8080';

  useEffect(() => {
    const fetchClassesWithStatus = async () => {
      setLoading(true);
      setError(null);

      try {
        const classData = await listProfessorClassesByIdService({
          urlBase,
          professorId,
        });

        const classesWithStatus = await Promise.all(
          classData.map(async (classe) => {
            try {
              const { status } = await fetchClassStatusService({urlBase, classId: classe.code});
              return { ...classe, status };
            } catch {
              return { ...classe, status: undefined };
            }
          })
        );

        setClasses(classesWithStatus);
      } catch {
        setError('Erro ao carregar as turmas');
      } finally {
        setLoading(false);
      }
    };

    if (professorId) {
      fetchClassesWithStatus();
    }
  }, [urlBase, professorId]);

  return { classes, loading, error };
};
