import { Form, useFormikContext } from "formik";
import { FC } from "react";
import FormCustomButtons from "./FormCustomButtons";
import { FormTextInput } from "./FormTextInput";
import { FormSelectInputGroup } from "./FormSelectInputGroup";

import { FormEditorInput } from "./FormEditorInput";
import { FormAutoComplete } from "./FormAutoComplete";
import { FormCheckbox } from "./FormCheckbox";
import FormDatePicker from "./FormDatePicker";
import { Message } from "primereact/message";


export interface FieldConfig {
    name: string;
    label: string;
    type: "number" | "text" | "email" | "password" | "date" | "select" | "editor" | "autocomplete" | "checkbox";
    options?: any[];
    optionLabel?: string;
    placeholder?: string;
    disabled?: boolean | ((rowData?: any) => boolean);
    rowData?: any;
    gridSize?: "full" | "medium" | "quarter";
}

interface Props {
    fields: FieldConfig[];
    rowData?: any; // ✅ Recibe `rowData` para evaluar `disabled`
    onCancel: () => void;
    title?: string; // ✅ Agregamos `title`
}

const getGridClass = (gridSize?: string) => {
    switch (gridSize) {
        case "full":
            return "col-12"; // ✅ Ocupa 12 columnas en todos los tamaños
        case "medium":
            return "col-12 md:col-6"; // ✅ Ocupa 12 en xs, 6 en md y lg
        case "quarter":
            return "col-12 md:col-6 lg:col-4";
        default:
            return "col-12 md:col-6 lg:col-4";
    }
};

const DynamicFormFields: FC<Props> = ({ fields, rowData, onCancel, title = "Titulo" }) => {
    const formik = useFormikContext();

    if (!formik) {
        console.error("DynamicFormFields debe estar dentro de Formik.");
        return null;
    }

    return (
        <>


            <Form onSubmit={formik.handleSubmit}>
                {/* ✅ Sección de Título */}
                <div className="col-12">
                    {rowData ? (
                        <Message severity="warn" text={title} style={{ width: "100%", fontSize: "900", height: "3rem" }} />
                    ) : (
                        <Message severity="info" text={title} style={{ width: "100%", fontSize: "900", height: "3rem" }} />
                    )}
                </div>
                <div className="p-fluid formgrid grid mb-3">
                    {fields.map(({ name, label, type, options, optionLabel, placeholder, disabled, gridSize }) => {
                        const isDisabled = typeof disabled === "function" ? disabled(rowData) : disabled;
                        const columnClass = getGridClass(gridSize);

                        return (
                            <div key={name} className={`${columnClass} mt-2`}>
                                {type === "text" || type === "email" || type === "password" || type === "number" ? (
                                    <FormTextInput label={label} name={name} type={type} placeholder={placeholder} disabled={isDisabled} />
                                ) : type === "select" ? (
                                    <FormSelectInputGroup label={label} name={name} options={options || []} optionLabel={optionLabel || "label"} disabled={isDisabled} />
                                ) : type === "date" ? (
                                    <FormDatePicker label={label} name={name} disabled={isDisabled} />
                                ) : type === "editor" ? (
                                    <FormEditorInput label={label} name={name} />
                                ) : type === "autocomplete" ? (
                                    <FormAutoComplete label={label} name={name} options={options || []} optionLabel={optionLabel || "label"} />
                                ) : type === "checkbox" ? (
                                    <FormCheckbox label={label} name={name} />
                                ) : null}
                            </div>
                        );
                    })}
                </div>
                <FormCustomButtons onCancel={onCancel} />
            </Form>
        </>
    );
};

export default DynamicFormFields;
