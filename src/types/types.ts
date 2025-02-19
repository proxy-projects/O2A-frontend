export interface FormInput {
    id: string;
    label: string;
    placeholder: string;
    required: boolean;
    type?: string;
    minLength?: number;
  }
  
  export interface FormState {
    title: string;
    description: string;
    inputs: FormInput[];
    isLoading: boolean;
    error: string | null;
  }