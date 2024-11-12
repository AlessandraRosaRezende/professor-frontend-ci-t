import axios from 'axios';

export interface FetchClassStatusServiceParams {
  urlBase: string;
  classId: string;
}

export interface ClassStatusResponse {
  status: 'ABERTA' | 'EM_FECHAMENTO' | 'FECHADA';
}

export const fetchClassStatusService = async ({
  classId,
}: FetchClassStatusServiceParams): Promise<ClassStatusResponse> => {
  const urlBase = 'http://localhost:8080';
  const { data } = await axios.get<ClassStatusResponse>(`${urlBase}/class/${classId}/status`);
  return data;
};
