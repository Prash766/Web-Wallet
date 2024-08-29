interface MnemonicsProps {
    word: string;
  }
  
  const Mnemonics: React.FC<MnemonicsProps> = ({ word }: MnemonicsProps) => {
    return (
      <div className="flex justify-center items-center w-full h-16 bg-slate-900 rounded-lg  text-white font-semibold shadow-lg border ">
        {word}
      </div>
    );
  };
  
  export default Mnemonics;
  