import { useEffect, useState } from 'react';
import axios from 'axios';
import { listProfessorClassesByIdService } from "../../services/list-professor-classes-by-id/list-professor-classes-by-id.service";
import { UseListProfessorClassesByIdProps, UseListProfessorClassesByIdResult } from "./use-list-professor-classes-by-id.types";

export const useListProfessorClassesById = ({ professorId }: UseListProfessorClassesByIdProps) => {
  const [result, setResult] = useState<UseListProfessorClassesByIdResult[] | null>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClasses = async () => {
      setLoading(true);
      try {
        const response = await listProfessorClassesByIdService({
          urlBase: 'http://localhost:8080',
          professorId,
        });

        const classesWithStatus = await Promise.all(
          response.map(async (classe) => {
            try {
              const statusResponse = await axios.get<{ status: string }>(
                `http://localhost:8080/class/${classe.code}/status`
              );
              return { ...classe, status: statusResponse.data.status };
            } catch {
              return { ...classe, status: 'Erro ao carregar status' };
            }
          })
        );

        setResult(classesWithStatus);
      } catch (err) {
        console.log(err)
        setError(err instanceof Error ? err.message : 'Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    if (professorId) {
      fetchClasses();
    }
  }, [professorId]);

  return { result, loading, error };
}