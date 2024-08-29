"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { EyeIcon, CopyIcon, CheckIcon } from "lucide-react";
import { toast } from "sonner";
import { Keypair } from "@solana/web3.js";
import { SolanaWallet } from "@/interfaces/Wallet";
import bs58 from "bs58";
import { useRecoilState, useRecoilValue } from "recoil";
import { SolanaWallets } from "@/atoms/Wallets";
import { MnemonicArray } from "@/atoms/MnemonicsAtom";

export default function Solana() {
  const [wallets, setWallets] = useRecoilState<SolanaWallet[]>(SolanaWallets);
  const mnemonic = useRecoilValue(MnemonicArray);

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isPrivateKeyDialogOpen, setIsPrivateKeyDialogOpen] = useState(false);
  const [selectedPrivateKey, setSelectedPrivateKey] = useState("");
  const [selectedPublicKey, setSelectedPublicKey] = useState("");
  const [isPublicClicked, setIsPublicClicked] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  function handleInputClick(publickey:string){
    setIsPublicClicked(true)
    setSelectedPublicKey(publickey)
  }

  const generateWallet = () => {
    if (mnemonic.length > 0) {
      const keypair = Keypair.generate();
      const secretKeyUint8Array: Uint8Array = keypair.secretKey;
      const publicKeyUint8Array: Uint8Array = keypair.publicKey.toBytes();

      const publicKeyBase58 = bs58.encode(publicKeyUint8Array);

      const secretKeyBase58 = bs58.encode(secretKeyUint8Array);

      setWallets((prevWallets) => [
        ...prevWallets,
        { publickey: publicKeyBase58, privatekey: secretKeyBase58 },
      ]);
    } else {
      toast.error("First generate the Mnemonics");
    }
  };

  const handleShowPrivateKey = (privateKey: string) => {
    setSelectedPrivateKey(privateKey);
    setIsAlertOpen(true);
  };

  const confirmShowPrivateKey = () => {
    setIsAlertOpen(false);
    setIsPrivateKeyDialogOpen(true);
  };

  const copyToClipboard = (text: string , key:string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    toast.success(`${key} key copied to the Clipboard`);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center">
      <div className="my-6  ">
        <Button
          onClick={generateWallet}
          className=" bg-black border-2  mb-4 h-18 px-8 py-4 text-lg transform transition-transform duration-200 ease-in-out hover:scale-110"
        >
          Generate New Wallet
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {wallets.map((wallet, index) => (
          <Card
            key={index}
            className="mb-4 transform transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-lg"
          >
            <CardHeader>
              <CardTitle className="text-xl font-bold">
                Wallet {index + 1}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor={`address-${index}`}>Public Address</Label>
                  <Input
                    onClick={()=> handleInputClick(wallet.publickey)}
                    id={`address-${index}`}
                    value={wallet.publickey}
                    readOnly
                    className="bg-gray-50 border-none cursor-default"
                  />
                </div>
                <div>
                  <Label htmlFor={`privateKey-${index}`}>Private Key</Label>
                  <div className="flex items-center">
                    <Input
                      id={`privateKey-${index}`}
                      value="••••••••••••••••"
                      type="text"
                      readOnly
                      className="bg-gray-50 border-none cursor-default"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="ml-2"
                      onClick={() => handleShowPrivateKey(wallet.privatekey)}
                    >
                      <EyeIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Show Private Key</AlertDialogTitle>
            <AlertDialogDescription>
              Don't share the private key with anyone. Are you sure you want to
              see it?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmShowPrivateKey}>
              Show Private Key
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog
        open={isPrivateKeyDialogOpen}
        onOpenChange={setIsPrivateKeyDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Private Key</DialogTitle>
            <DialogDescription>
              This is your private key. Never share it with anyone.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <Input value={selectedPrivateKey} readOnly className="bg-gray-50" />
          </div>
          <DialogFooter>
            <Button onClick={() => copyToClipboard(selectedPrivateKey, 'Private')}>
              {isCopied ? (
                <CheckIcon className="h-4 w-4 mr-2" />
              ) : (
                <CopyIcon className="h-4 w-4 mr-2" />
              )}
              {isCopied ? "Copied!" : "Copy to Clipboard"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog
        open={isPublicClicked}
        onOpenChange={setIsPublicClicked}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Public Key</DialogTitle>
       
          </DialogHeader>
          <div className="mt-4">
            <Input value={selectedPublicKey} readOnly className="bg-gray-50" />
          </div>
          <DialogFooter>
            <Button onClick={() => copyToClipboard(selectedPublicKey, 'Public')}>
              {isCopied ? (
                <CheckIcon className="h-4 w-4 mr-2" />
              ) : (
                <CopyIcon className="h-4 w-4 mr-2" />
              )}
              {isCopied ? "Copied!" : "Copy to Clipboard"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
    </div>
  );
}
