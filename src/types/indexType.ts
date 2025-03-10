export interface Student {
  id: number;
  name: string;
  email: string;
  school?: string; // <-- Asegúrate de que esta propiedad exista
  school_id?: number | null | undefined;
}

export interface School {
  id: number;
  name: string;
  city: string;
}
