import { api } from './api';

import type {
  Teacher,
  Year,
  Grade,
  Subject,
  Class,
  Departamento,
  Provincia,
  Municipio,
  School,
} from '@app/types';

interface SignUpReq {
  name: string
  lastName: string
  email: string
  password: string
}
export const signUp = async (data: SignUpReq): Promise<void> => {
  await api.post('signup', { json: data });
};

interface SignInReq {
  email: string
  password: string
}
interface SignInRes {
  teacher: Teacher
  jwt: string
}
export const signIn = async (data: SignInReq): Promise<SignInRes> => {
  const resp = await api.post('signin', { json: data });
  return await resp.json();
};

export const getYears = async (): Promise<Year[]> => {
  const resp = await api.get('years');
  return await resp.json();
};

interface GetGradesAndSubjectsRes {
  grades: Grade[]
  subjects: Subject[]
}
export const getGradesAndSubjects = async (): Promise<GetGradesAndSubjectsRes> => {
  const resp = await api.get('static');
  return await resp.json();
};

export const getClasses = async (): Promise<Class[]> => {
  const resp = await api.get('auth/classes');
  return await resp.json();
};

interface NewClassReq {
  gradeId: string
  subjectId: string
  schoolId: string
  yearId: string
  parallel: string
}
export const newClass = async (data: NewClassReq): Promise<Class[]> => {
  const resp = await api.post('auth/class', { json: data });
  return await resp.json();
};

export const getDepartamentos = async (): Promise<Departamento[]> => {
  const resp = await api.get('deps');
  return await resp.json();
};

export const getProvincias = async (depId: string): Promise<Provincia[]> => {
  const resp = await api.get(`provs/dep/${depId}`);
  return await resp.json();
};

export const getMunicipios = async (provId: string): Promise<Municipio[]> => {
  const resp = await api.get(`muns/prov/${provId}`);
  return await resp.json();
};

export const getSchools = async (munId: string): Promise<School[]> => {
  const resp = await api.get(`schools/mun/${munId}`);
  return await resp.json();
};
