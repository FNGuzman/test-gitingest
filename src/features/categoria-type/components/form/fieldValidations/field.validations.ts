import { stringValidation } from "@components/common/forms/validations/string.validations";
import * as Yup from "yup";

export const fieldValidations = Yup.object().shape({
    nombre: stringValidation({
        isRequired: true,
        min: 3,
        max: 50,
        spaces: {
            allowEmpty: false,
            allowLeading: false,
            allowTrailing: false
        },
        customRegex: [{
            pattern: /^[a-zA-Z0-9\s]+$/,
            message: "Solo se permiten letras, números y espacios"
        }],
        trim: true
    }),
});
