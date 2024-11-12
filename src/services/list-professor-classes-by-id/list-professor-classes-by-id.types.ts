export interface ApiResponseBody {
  code: string;
  courseId: string;
  professorId: string;
  campus: string;
  period: string;
  modality: string;
}

export interface listProfessorClassesByIdServiceInput {
  urlBase: string;
  professorId: string;
}

export type listProfessorClassesByIdServiceResult = ApiResponseBody[];

export type ListProfessorClassesByIdService = (
  params: listProfessorClassesByIdServiceInput,
) => Promise<listProfessorClassesByIdServiceResult>;

export interface ClassWithStatus extends ApiResponseBody {
  status?: 'ABERTA' | 'EM_FECHAMENTO' | 'FECHADA';
}

export interface UseListProfessorClassesByIdResult {
  classes: ClassWithStatus[] | null;
  loading: boolean;
  error: string | null;
}