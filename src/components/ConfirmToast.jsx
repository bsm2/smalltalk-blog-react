import { toast } from "react-toastify";

export const confirmToast = (message, onConfirm) => {
  toast(
    ({ closeToast }) => (
      <div className="flex flex-col gap-4">
        <p className="text-gray-200 font-medium">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => {
              onConfirm();
              closeToast();
            }}
            className="btn px-4 py-2 rounded-lg font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            Yes
          </button>
          <button
            onClick={closeToast}
            className="btn px-4 py-2 rounded-lg font-medium bg-gray-700 text-gray-200 hover:bg-gray-600 transition-colors"
          >
            No
          </button>
        </div>
      </div>
    ),
    {
      autoClose: false,
      closeOnClick: false,
      draggable: false,
      closeButton: false,
      style: {
        backgroundColor: "#1F2937",
        fontSize: "20px", 
        padding: "20px 30px", 
        minWidth: "350px",
        maxWidth: "20rem", 
        borderRadius: "12px",
        margin: "5px",
      },
    }
  );
};
