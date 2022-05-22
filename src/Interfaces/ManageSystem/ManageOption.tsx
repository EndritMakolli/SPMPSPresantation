import { Link } from "react-router-dom";

interface Props {
  image: string;
  text: string;
  link: string;
}

export const ManageOption = ({ image, text, link }: Props) => {
  return (
    <article className="manage-option">
      <img src={image} alt={text} />
      <span>
        <Link to={link}>{text}</Link>
      </span>
    </article>
  );
};
