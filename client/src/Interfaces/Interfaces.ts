export interface IAccount {
  accountId: number;
  username: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface IAnswer {
  id: number;
  value: string;
  nie: string;
  questionId: number;
}

export interface IEvaluate {
  formId: number;
  teacherId: number;
}

export interface IForm {
  formId: number;
  title: string;
  description: string | null;
  level: string;
  date: Date;
  accessKey: string;
  state: string;
  name: string;
  email: string;
  comment: string | null;
  accountId: number;
  teachers?: ITeacher[] | [];
}

export interface IOption {
  optionId: number;
  value: string;
  questionId: number;
}

export interface IQuestion {
  questionId: number;
  title: string;
  formId: number;
  required: boolean;
  answerType: string;
  sectionId: number | null;
}

export interface ISection {
  sectionId: number;
  title: string;
}

export interface IStudent {
  nie: string;
  lastname: string;
  firstname: string;
  level: string;
}

export interface ITeacher {
  teacherId: number;
  lastname: string;
  firstname: string;
}
