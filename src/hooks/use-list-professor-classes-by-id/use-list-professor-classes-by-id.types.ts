export interface UseListProfessorClassesByIdProps {
  professorId: string;
}

export interface UseListProfessorClassesByIdResult {
  code: string;
  courseId: string;
  professorId: string;
  campus: string;
  period: string;
  modality: string;
  status?: string;
}

export type UseListProfessorClassesByIdHook = (
  params: UseListProfessorClassesByIdProps,
) => UseListProfessorClassesByIdResult;

