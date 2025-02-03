export type ClassNames = (
  // dynamicObj: Record<string, boolean>,
  staticArray?: string[]
) => string;

export const classNames: ClassNames = (staticArray) => {
  return `${(staticArray || []).join(" ")}`.trim();
};
