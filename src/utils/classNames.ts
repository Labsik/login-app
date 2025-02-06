export type ClassNames = (staticArray?: string[]) => string;

export const classNames: ClassNames = (staticArray) => {
  return `${(staticArray || []).join(" ")}`.trim();
};
