"use client";

import { useState } from "react"
import { auth } from "./firebase/firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {

  const [numero,setNumero] = useState("");
  const [disableInputNumber,setDisableInputNumber] = useState(false);
  const [disableInputCode,setDisableInputCode] = useState(false);
  const [code,setCode] = useState("");
  const [statut,setStatut] = useState(false);
  const [activeNumero,setActiveNumero] = useState(true);
  const [activeCode,setActiveCode] = useState(false);
  auth.languageCode = 'fr';

  const onCaptachVerify = () =>{
    if(!window.recaptchaVerifier){
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
        'size': 'invisible',
        'callback': (response) => {
          // onSendNumber();
          console.log("reponse");
        }
      });
    }
  }
  const onSendNumber = () => {
    onCaptachVerify();
    if(activeNumero){
    const recaptcha = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, numero, recaptcha).then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      toast.success(`Code envoye au numero ${numero}`);
      setDisableInputNumber(true);
      setActiveCode(true);
    }).catch((error) => {
      setActiveNumero(true);
      toast.error("code non envoyer");
    });
    }
    setActiveNumero(false);
  }
  const onSendCode = () =>{
    
    if(activeCode){
      confirmationResult.confirm(code).then((result) => {
        const user = result.user;
        toast.success("Votre numero a bien ete verifier");
        setStatut(true);
        setDisableInputCode(true);
      }).catch((error) => {
        toast.error("Le code n'est pas valide");
      });
    }
    setActiveCode(false);
  }
  return (
    <>
    <Toaster toastOptions={{duration : 4000}}/>
    {/* div statut */}
    <div className="flex flex-col items-center justify-between py-4">
          <h1 className="text-[36px] font-bold">Statut</h1>
          <h2 className={`${statut ? 'text-green-500' : 'text-red-900'} text-2xl font-bold`}>{statut ? 'Succes' : 'Non verifier'}</h2>
          <p></p>
          <p></p>
        </div>
        {/* fin div statut */}
      <div className="w-full max-w-[400px] gap-[10px] justify-center">
      {/* numero */}
        <div className="p-3 flex flex-col justify-center items-center gap-4">
          <input placeholder="Votre numero de telephone..." disabled={disableInputNumber} className="border rounded w-full py-3 px-2" onChange={(e) => {setNumero(e.target.value);console.log(numero)}}/>
          <button id="sign-in-button" className={`mt-3 ${activeNumero ? 'bg-cyan-600' : 'bg-gray-200' } py-3 px-2 rounded w-full text-white`} onClick={onSendNumber}>Envoyer le code</button>
        </div>
        {/* fin numero */}
        {/* code otp */}
        <div className="p-3 flex flex-col justify-center items-center gap-4">
          <input placeholder="Code du message..." disabled={disableInputCode} className="border rounded w-full py-3 px-2" onChange={(e) =>{setCode(e.target.value)}}/>
          <button className={`mt-3 ${activeCode ? 'bg-slate-600' : 'bg-gray-200'} py-3 px-2 rounded w-full text-white`} onClick={onSendCode}>Verifier mon numero</button>
        </div>
        {/* fin code otp */}
      </div>

      {/* <div id="recaptcha-container"></div> */}
    </>
  )
}
