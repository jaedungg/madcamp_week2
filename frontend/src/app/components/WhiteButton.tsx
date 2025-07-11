type WhiteButtonProps = {
  icon: string;
  text: string;
};

const WhiteButton = ({ icon, text}: WhiteButtonProps) => {
  return (
    <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-3 px-6 py-2 rounded bg-white">
      <img src={`/images/${icon}.svg`} alt={`${icon} Icon`} width={32} height={32} />
      <p className="flex-grow-0 flex-shrink-0 text-lg font-medium text-left text-black">
        {text}
      </p>
    </div>
  );
};

export default WhiteButton;
