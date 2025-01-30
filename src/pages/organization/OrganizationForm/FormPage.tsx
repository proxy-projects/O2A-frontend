import { useParams } from "react-router-dom";
import { fetchFormData } from "../../../api/api";
import { useEffect, useState } from "react";
import Spinner from "../../../components/ui/Spinner/Spinner";
import { Button, IconButton, Stack } from "@mui/material";
import { DeleteIcon } from "lucide-react";
import { AddCircle, AddTask, RemoveCircle } from "@mui/icons-material";

interface FormData {
  title: string;
  description: string;
}

function FormPage() {
  const [formData, setFormData] = useState<FormData | null>();

  const { id } = useParams();

  useEffect(() => {
    const getFormData = async () => {
      const { data } = await fetchFormData(id);
      setFormData(data);
    };

    getFormData();
  }, []);

  if (!formData) {
    return <Spinner />;
  }

  return (
<div className="flex items-start justify-center min-h-screen bg-gray-50 pt-10 space-x-2">
  <div className="max-w-xl w-1/2 border rounded-lg shadow-lg bg-white p-8 space-y-6">
    <h1 className="text-center text-3xl font-bold text-gray-800 mb-4">
      {formData?.title}
    </h1>
    <p className="text-center text-gray-600 text-lg leading-relaxed">
      {formData?.description}
    </p>
   
  </div>
 <Stack direction="column" spacing={1}>
    <IconButton aria-label="add input" color="success">
      <AddCircle />
    </IconButton>
    <IconButton aria-label="delete form" color="secondary">
      <RemoveCircle />
    </IconButton>
 </Stack>
</div>

  );
}

export default FormPage;
