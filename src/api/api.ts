import { PostgrestError } from "@supabase/supabase-js";
import { AddInputsData } from "../components/ui/AddInputs/AddInputs";
import { supabase } from "../config/supabaseClient";

type FormResponse = {
  data: {
    id: string;
    organization_id: string;
    created_by: string;
    title: string;
    description: string;
  } | null;
  error: PostgrestError | null;
}

export const createUser = async (session: any) => {
  return await supabase
    .from("users")
    .select("organization_id")
    .eq("user_id", session.user.id)
    .single();
};

export const getSession = async () => {
  return await supabase.auth.getSession();
};

export const fetchUserData = async (userId?: string) => {
  return await supabase.from("users").select().eq("user_id", userId).single();
};

// organization

export const createOrganization = async (
  organizationData: { name: string; description?: string },
  userId: string
) => {
  return await supabase
    .from("organizations")
    .insert([
      {
        organization_name: organizationData.name,
        organization_description: organizationData.description,
        created_by: userId,
      },
    ])
    .select()
    .single();
};

export const updateOrganization = async (orgId: string, userId: string) => {
  return await supabase
    .from("users")
    .update({ organization_id: orgId })
    .eq("user_id", userId);
};

export const fetchOrganization = async (userId: string) => {
  return await supabase
    .from("organizations")
    .select("id, organization_name, form_id")
    .eq("created_by", userId)
    .single();
};

// forms

export const fetchAllForms = async (organizationId: String) => {
  const { data: formsData, error: formsError } = await supabase
    .from("forms")
    .select()
    .eq("organization_id", organizationId)
    .single();

  return { formsData, formsError };
};

export const submitForm = async (
  organizationId: string,
  currentUserId: string,
  formData: { title: string; description: string }
): Promise<FormResponse> => {
  // First check if the organization already has a form
  const { data: existingForm, error: checkError } = await supabase
    .from("forms")
    .select()
    .eq("organization_id", organizationId)
    .single();

  if (checkError && checkError.code !== 'PGRST116') {
    return { data: null, error: checkError };
  }

  if (existingForm) {
    return { data: existingForm, error: null };
  }

  // Create a new form
  const { data, error } = await supabase
    .from("forms")
    .insert([
      {
        organization_id: organizationId,
        created_by: currentUserId,
        title: formData.title,
        description: formData.description,
      },
    ])
    .select()
    .single();

  return { data, error };
};


export const addInputToForm = async () => {};

export const fetchFormData = async (formId?: string) => {
  const { data: formInputsData, error: formInputsError } = await supabase
    .from("form_inputs")
    .select()
    .order("input_order", { ascending: true })
    .eq("form_id", formId);

  const { data: formInfoData, error: formInfoError } = await supabase
    .from("forms")
    .select("title, description")
    .eq("id", formId)
    .single();

  return { formInputsData, formInfoData, formInputsError, formInfoError };
};

export const addFormInput = async (formId: string, data: AddInputsData) => {
  const { data: maxOrderData, error: maxOrderError } = await supabase
    .from("form_inputs")
    .select("input_order")
    .eq("form_id", formId)
    .order("input_order", { ascending: false })
    .limit(1);

  if (maxOrderError) throw maxOrderError;

  const newOrder =
    maxOrderData && maxOrderData.length > 0
      ? maxOrderData[0].input_order + 1
      : 1;

  const { error: addInputError } = await supabase.from("form_inputs").insert([
    {
      form_id: formId,
      label: data.labelInput,
      placeholder: data.placeholderInput,
      input_order: newOrder,
    },
  ]);

  if (addInputError) throw addInputError;
};
