import * as yup from "yup";
import type { authSchema } from "../../services/validation/auth.validation";

export type AuthFormData = yup.InferType<typeof authSchema>;