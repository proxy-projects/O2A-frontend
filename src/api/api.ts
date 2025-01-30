import { supabase } from "../config/supabaseClient";

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
    .select("id")
    .eq("created_by", userId)
    .single();
};

export const submitForm = async (
  organizationId: string,
  currentUserId: string,
  formData: { title: string; description: string }
) => {
  return await supabase
    .from("forms")
    .insert([
      {
        organization_id: organizationId,
        created_by: currentUserId,
        title: formData.title,
        description: formData.description,
      },
    ])
    .single();
};
