import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

interface MessageProps {
  contents: string;
  type: string;
}

export const Message = ({ contents, type }: MessageProps) => {
  return (
    <div className="message">
      <InfoOutlinedIcon fontSize="large" />
      <span>{contents}</span>
    </div>
  );
};
