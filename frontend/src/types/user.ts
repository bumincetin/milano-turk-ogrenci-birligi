export interface User {
  id: string;
  name: string;
  lastname: string;
  email: string;
  universityName?: string;
  universityDepartment?: string;
  universityClass?: string;
  linkedin?: string;
  twitter?: string;
  telephone?: string;
  description?: string;
  website?: string;
  position?: string;
  birthday?: string;
  username?: string;
  avatar?: {
    url: string;
    id: number;
  } | null;
} 