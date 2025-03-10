import { ref, computed } from 'vue';

export interface ValidationRule {
  validator: (value: any) => boolean;
  message: string;
}

export interface FieldValidation {
  value: any;
  rules: ValidationRule[];
  touched: boolean;
  dirty: boolean;
}

export interface FormValidation {
  [key: string]: FieldValidation;
}

export function useFormValidation(initialValidation: FormValidation) {
  const validation = ref(initialValidation);
  
  const validateField = (fieldName: string): string[] => {
    const field = validation.value[fieldName];
    const errors: string[] = [];
    
    if (field.touched || field.dirty) {
      field.rules.forEach(rule => {
        if (!rule.validator(field.value)) {
          errors.push(rule.message);
        }
      });
    }
    
    return errors;
  };

  const validateAllFields = (): boolean => {
    let isValid = true;
    Object.keys(validation.value).forEach(fieldName => {
      const field = validation.value[fieldName];
      field.touched = true;
      const errors = validateField(fieldName);
      if (errors.length > 0) isValid = false;
    });
    return isValid;
  };

  const touchField = (fieldName: string) => {
    validation.value[fieldName].touched = true;
  };

  const dirtyField = (fieldName: string) => {
    validation.value[fieldName].dirty = true;
  };

  const updateField = (fieldName: string, value: any) => {
    validation.value[fieldName].value = value;
    validation.value[fieldName].dirty = true;
  };

  const errors = computed(() => {
    const fieldErrors: { [key: string]: string[] } = {};
    Object.keys(validation.value).forEach(fieldName => {
      fieldErrors[fieldName] = validateField(fieldName);
    });
    return fieldErrors;
  });

  const isValid = computed(() => {
    return Object.values(errors.value).every(fieldErrors => fieldErrors.length === 0);
  });

  return {
    validation,
    validateField,
    validateAllFields,
    touchField,
    dirtyField,
    updateField,
    errors,
    isValid
  };
}

// Common validation rules
export const rules = {
  required: (message = 'This field is required'): ValidationRule => ({
    validator: (value: any) => {
      if (value === null || value === undefined) return false;
      if (typeof value === 'string') return value.trim().length > 0;
      if (typeof value === 'number') return true;
      return false;
    },
    message
  }),
  minLength: (min: number, message = `Minimum length is ${min} characters`): ValidationRule => ({
    validator: (value: string) => value.length >= min,
    message
  }),
  maxLength: (max: number, message = `Maximum length is ${max} characters`): ValidationRule => ({
    validator: (value: string) => value.length <= max,
    message
  }),
  email: (message = 'Invalid email address'): ValidationRule => ({
    validator: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message
  })
};
