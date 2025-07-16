type RectangleButtonProps = {
  icon: string;
  text: string;
  onClick?: () => void;
  transparent?: boolean;
};

const RectangleButton = ({ icon, text, onClick, transparent }: RectangleButtonProps) => {
  return (
    <div 
      onClick={onClick}
      className={`inline-flex justify-center items-center flex-grow-0 flex-shrink-0 h-[48px] gap-2 px-4 py-2 rounded 
      ${transparent ? 'bg-white/40 text-white' : 'bg-white text-black'}
      hover:opacity-70 transition-opacity cursor-pointer`}
    >
      <img src={`/icons/${icon}.svg`} alt={`${icon} Icon`} width={32} height={32} />
      <p className="flex-grow-0 flex-shrink-0 text-lg font-medium text-left">
        {text}
      </p>
    </div>
  );
};

export default RectangleButton;
