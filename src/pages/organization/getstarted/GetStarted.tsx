import { Package } from "lucide-react";
import Button from "../../../components/ui/Button/Button";
import CreateOrganization from "../../../components/ui/create/CreateOrganization";
import { useState } from "react";

function GetStarted() {
  const [showPopup, setShowPopup] = useState(false);

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-white">
      <div
        className="absolute right-0 top-0 h-full w-1/2 hidden md:block bg-blue-50"
        style={{
          borderRadius: "0 0 0 100%",
        }}
      />

      <div className="flex flex-col justify-between h-full max-w-6xl px-8 py-8 bg-blue-50 md:bg-white">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-between rounded">
            <Package className="h-10 w-10 text-blue-600" />
          </div>
          <span className="text-xl font-semibold text-blue-600">Bolt</span>
        </div>

        <div className="mt-32 max-w-2xl">
          <h1 className="text-[2.75rem] font-bold leading-tight tracking-tight sm:text-6xl text-gray-600">
            Proceed to add your organization
          </h1>
          <Button
            onClick={handleOpenPopup}
            className="mt-10 border-2 border-gray-600 text-gray-600 hover:bg-blue-600  hover:border-blue-600 hover:text-white transition ease-out"
          >
            Click here
          </Button>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-end">
              <button
                onClick={handleClosePopup}
                className="text-gray-500 text-2xl hover:text-blue-700"
              >
                ✕
              </button>
            </div>
            <CreateOrganization />
          </div>
        </div>
      )}
    </div>
  );
}

export default GetStarted;
