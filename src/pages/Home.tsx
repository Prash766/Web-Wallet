import Mnemonics from "@/cards/Mnemonics";
import { CheckCheck, Copy } from "lucide-react";
import * as bip39 from "bip39";
import { useEffect, useState } from "react";
import { Buffer } from "buffer";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { MnemonicArray } from "@/atoms/MnemonicsAtom";

window.Buffer = Buffer;

const Home = () => {
  const [mnemonic, setMnemonic] = useRecoilState(MnemonicArray)
  const [isClicked, setIsClicked] = useState<boolean>(false);

  function handleMnemonics() {
    const generatedMnemonic = bip39.generateMnemonic();
    const arrayMnemonic: string[] = generatedMnemonic.split(" ");
    setMnemonic(arrayMnemonic);
  }

  function handleCopyClick() {
    if (mnemonic.length === 0) {
      toast.message("Generate the Mnemonics First");
      return;
    }

    setIsClicked(true);
  }

  useEffect(() => {
    if (isClicked && mnemonic.length > 0) {
      navigator.clipboard.writeText(mnemonic.join(" "))
        .then(() => {
          toast.success("Copied to Clipboard");
        })
        .catch(() => {
          toast.error("Failed to copy");
        })
        .finally(() => {
          setTimeout(() => {
            setIsClicked(false);
          }, 1500);
        });
    }
  }, [isClicked, mnemonic]);

  return (
    <div className="min-h-screen  bg-gray-900 text-white font-semibold p-8">
      <motion.div
        className="h-20 flex justify-center items-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.button
          onClick={handleMnemonics}
          className="p-8 shadow-lg border-2 bg-black rounded-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Generate Mnemonic
        </motion.button>
      </motion.div>

    {mnemonic.length>0?(  <motion.div
        className="grid grid-cols-4 gap-4 p-4 rounded-md h-72 shadow-md bg-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {mnemonic.map((word) => (
          <motion.div
            key={word}
            className="flex items-center justify-center rounded-lg "
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mnemonics word={word} />
          </motion.div>
        ))}
      </motion.div>):null}
{mnemonic.length>0?(
    <motion.div
    className="flex w-full justify-center mt-8"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <motion.button
      onClick={handleCopyClick}
      className="p-8 bg-black rounded-lg flex items-center"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {isClicked ? (
        <CheckCheck className="mr-4 -ml-4" />
      ) : (
        <Copy className="mr-4 -ml-4" />
      )}
      Copy to Clipboard
    </motion.button>
  </motion.div>
):null}
      
    </div>
  );
};

export default Home;
