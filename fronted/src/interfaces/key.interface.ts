export interface FormData {
  username: string;
  website: string;
  password: string;
}

export interface Key extends FormData {
  id: number;
}

export interface GKey {
  password: string;
}
