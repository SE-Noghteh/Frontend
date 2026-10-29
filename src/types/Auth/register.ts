export interface Skill {
    id: string;
    title: string;
    category: string;
    isDisabled?: boolean;
  }

export interface RegisterBasicInfo {
    firstName: string;
    lastName: string;
    nationalCode: string;
    gender: string;
    province: string;
    city: string;
    postalCode: string;
    address: string;
    birthDay: string;
    birthMonth: string;
    birthYear: string;
    skills: Skill[];
  }