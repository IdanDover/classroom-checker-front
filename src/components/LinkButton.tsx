import { Link } from "react-router-dom";

type Props = {
  to: string;
  children: React.ReactNode;
  target?: string | undefined;
};

function LinkButton({ to, children, target }: Props) {
  return (
    <Link
      className="flex items-center justify-center py-3 space-x-2 text-blue-600 underline dark:text-blue-300"
      to={to}
      target={target}
    >
      {children}
    </Link>
  );
}

export default LinkButton;
