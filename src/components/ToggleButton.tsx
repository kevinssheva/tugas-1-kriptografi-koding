const ToggleButton = ({
  isEncrypt,
  setIsEncrypt,
}: {
  isEncrypt: boolean;
  setIsEncrypt: (isEncrypt: boolean) => void;
}) => {
  return (
    <div className="flex relative cursor-pointer">
      <p
        className={`${
          isEncrypt ? "font-semibold text-white" : "font-normal text-black"
        } z-20 w-[5rem] text-center transition py-1`}
        onClick={() => setIsEncrypt(true)}
      >
        Encrypt
      </p>
      <p
        className={`${
          !isEncrypt ? "font-semibold text-white" : "font-normal text-black"
        } z-20 w-[5rem] text-center transition py-1`}
        onClick={() => setIsEncrypt(false)}
      >
        Decrypt
      </p>
      <div
        className={`${
          !isEncrypt && "translate-x-full"
        } absolute bg-purple-700 w-1/2 h-full z-10 left-0 top-0 rounded-sm transition-all`}
      ></div>
    </div>
  );
};

export default ToggleButton;
