const Alert = ({
  hideDisplay,
  onClose,
  message,
}: {
  onClose: () => void;
  message: string;
  hideDisplay: boolean;
}) => {
  return (
    <>
      <div
        className={`absolute inset-0 ${
          hideDisplay ? "block opacity-100" : "hidden opacity-0"
        }  h-full w-full bg-black/35 transition-all duration-500`}
      />
      <main
        onClick={onClose}
        className={`absolute h-full w-full ${
          hideDisplay ? "block opacity-100" : "hidden opacity-0"
        }  flex justify-center items-center transition-all duration-1000`}
      >
        <div className="bg-white w-64 h-32 p-4 rounded-md shadow-md ">
          <h5 className="dark:text-black ">{message}</h5>
          <hr />
          <br />
          <p className="dark:text-black">Tap anywhere to close.</p>
        </div>
      </main>
    </>
  );
};

export default Alert;
