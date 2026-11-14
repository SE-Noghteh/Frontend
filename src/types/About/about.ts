export type AboutSideTone = "peach" | "blue" | "green";

export interface AboutStory {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  quote: string;
  concernsTitle: string;
  concerns: string[];
}

export type AboutPrincipleIcon = "shield" | "eye" | "scale" | "lock";

export interface AboutPrinciple {
  id: number;
  tone: AboutSideTone;
  icon: AboutPrincipleIcon;
  title: string;
  description: string;
}

export interface AboutHighlight {
  value: string;
  label: string;
}
