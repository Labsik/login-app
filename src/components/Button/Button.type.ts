export type Props = {
  onClick: () => void;
  variant: "primary" | "secondary";
  children: React.ReactNode;
  disabled?: boolean;
};
