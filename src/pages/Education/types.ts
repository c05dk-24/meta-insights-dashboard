export interface EducationItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  category: string;
}

export interface Category {
  id: string;
  title: string;
  items: EducationItem[];
}