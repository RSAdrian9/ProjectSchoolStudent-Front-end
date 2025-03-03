export interface Student {
  id: number;
  name: string;
  email: string;
  school_id?: number | null | undefined;
}

export interface School {
  id: number;
  name: string;
  city: string;
}
