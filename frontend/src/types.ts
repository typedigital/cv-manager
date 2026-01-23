export interface CVBasics {
  name: { first: string, last: string };
  label: string;
  image: string;
  email: string;
  website: string;
  location: {
    address: string;
    postalCode: string;
    city: string;
    countryCode: string;
  };
  summary: string;
}

export interface SkillItem {
  name: string;
  level?: string;
}

export interface SkillCategory {
  category: string;
  items: SkillItem[];
}

export interface WorkExperience {
  company: string;
  location: string;
  position: string;
  startDate: string;
  endDate: string | null;
  current?: boolean;
  summary: string;
  techStack?: string[];
  companySize?: string;
}

export interface Education {
  institution: string;
  area: string;
  studyType: string;
  summary: string;
}

export interface CVStyle {
  colors?: {
    primary?: string;
    accent?: string;
    background?: string;
    secondaryBackground?: string;
  };
}

export interface CVData {
  basics: CVBasics;
  skills: SkillCategory[];
  work: WorkExperience[];
  education: Education[];
  experience?: string;
  style?: CVStyle;
}

export interface Html2PdfOptions {
  margin?: number | [number, number] | [number, number, number, number];
  filename?: string;
  image?: {
    type?: "jpeg" | "png" | "webp";
    quality?: number;
  };
  enableLinks?: boolean;
  html2canvas?: object;
  jsPDF?: {
    unit?: string;
    format?: string | [number, number];
    orientation?: "portrait" | "landscape";
  };
  pagebreak: { 
    mode: string[];
    avoid: string;
  };
}