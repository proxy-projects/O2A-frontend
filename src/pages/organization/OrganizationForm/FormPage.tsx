import { useParams } from "react-router-dom";
import { fetchFormData } from "../../../api/api";
import { useEffect, useState } from "react";
import Spinner from "../../../components/ui/Spinner/Spinner";
import { IconButton, Stack, TextField, Tooltip } from "@mui/material";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import AddInputs from "../../../components/ui/AddInputs/AddInputs";

interface FormData {
  title: string;
  description: string;
}

interface FormInputsData {
  label: string;
  placeholder: string;
}

function FormPage() {
  const [formData, setFormData] = useState<FormData | null>();
  const [formInputsData, setFormInputsData] = useState<
    FormInputsData[] | null
  >();
  const [isInputVisible, setIsInputVisible] = useState<boolean>(false);

  const { id } = useParams();

  const showInputs = async () => {
    setIsInputVisible(true);
  };

  useEffect(() => {
    const getFormData = async () => {
      const { formInfoData, formInputsData } = await fetchFormData(id);
      setFormData(formInfoData);
      setFormInputsData(formInputsData);
    };

    getFormData();
  }, []);

  if (!formData) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-gray-100 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-3/4 max-w-4xl mx-auto">
        <div className="relative flex items-center bg-gray-500 rounded-lg p-6">
          <div className="flex-1 max-w-xl w-full border rounded-xl shadow-xl bg-white p-8 space-y-6  transition-shadow duration-300">
            <h1 className="text-center text-3xl font-bold text-gray-900 mb-4 tracking-tight">
              {formData?.title}
            </h1>
            <p className="text-center text-gray-700 text-lg leading-relaxed font-medium">
              {formData?.description}
            </p>
          </div>

          <Stack direction="column" className="absolute -right-16 space-y-3">
            <Tooltip title="Add input" placement="right">
              <IconButton
                aria-label="add input"
                color="success"
                className="hover:scale-110 transition-transform duration-200"
                onClick={showInputs}
              >
                <AddCircle />
              </IconButton>
            </Tooltip>
            <Tooltip title="delete form" placement="right">
              <IconButton
                aria-label="delete form"
                color="secondary"
                className="hover:scale-110 transition-transform duration-200"
              >
                <RemoveCircle />
              </IconButton>
            </Tooltip>
          </Stack>
        </div>

        <div className="flex flex-col py-4">
          {formInputsData?.map((input, index) => (
            <div className="w-full" key={index}>
              <TextField
                id="outlined-disabled"
                label={input.label}
                placeholder={input.placeholder}
                sx={{ my: 1.5, width: '100%' }}
                defaultValue={input.placeholder}
                disabled
              />
            </div>
          ))}
        </div>

        {isInputVisible && (
          <div className="w-full mt-8 p-4 bg-white shadow-md">
            <AddInputs setIsInputVisible={setIsInputVisible} formId={id} />
          </div>
        )}
      </div>
    </div>
  );
}

export default FormPage;
