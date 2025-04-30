export interface Doctor {
  id: number;
  name: string;
  gender: string;
  specialization: string;
  experience: number;
  location: string;
  image_url: string;
  fees: number;
  language: string;
}

export interface FilterOptions {
  languages: string[];
  specializations: string[];
}
