import { APITemplateSchemaType } from '@/lib/constants/formSchemas/APITemplate.schema';
import { useForm } from 'react-hook-form';

export default function useAPITemplateForm() {
  const form = useForm<APITemplateSchemaType>({
    defaultValues: {
      apiName: '',
      requestFormat: {
        headers: '',
        body: '',
      },
      responseFormat: {
        status: '',
        body: '',
      },
      examples: '',
      additionalPrompt: '',
    },
  });

  return {
    form,
  };
}
