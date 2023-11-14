import { FaArrowRight } from "react-icons/fa6";
import LinkButton from "./LinkButton";

type Props = {
  linkTo: string;
  linkText: string;
};

function EmptyView({ linkTo, linkText }: Props) {
  return (
    <div className="flex flex-col items-center justify-center px-3 py-5 mx-2 my-3">
      <h1 className="px-3 py-3 font-serif text-3xl text-amber-500 text-md dark:text-amber-300">
        נראה שאין פה כלום
      </h1>
      <LinkButton to={linkTo}>
        <FaArrowRight />
        <span>{linkText}</span>
      </LinkButton>
    </div>
  );
}

export default EmptyView;
