type RoundButtonProps = {
  icon: string;
  text?: string;
  onClick?: () => void;
};

const RoundButton = ({ icon, text, onClick}: RoundButtonProps) => {
  return (
    <div 
      className={`inline-flex self-center justify-center items-center flex-grow-0 flex-shrink-0 h-[48px] w-[48px] gap-2 rounded-full 
      bg-white/40 text-white border-2 border-white/70 
      hover:opacity-80 transition-opacity cursor-pointer`}
    >
      <img src={`/icons/${icon}.svg`} alt={`${icon} Icon`} width={24} height={24} />
      {text && (
        <p className="flex-grow-0 flex-shrink-0 text-lg font-medium text-left">
          {text}
        </p>
      )}
    </div>
  );
};

export default RoundButton;
