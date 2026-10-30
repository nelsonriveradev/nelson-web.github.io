export interface ProjectsData {
  uid: number;
  name: string;
  icon?: string;
  description?: string;
  caseContent: string;
  link: string;
  img: string;
  screenshots?: string[];
  toolsUse: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
