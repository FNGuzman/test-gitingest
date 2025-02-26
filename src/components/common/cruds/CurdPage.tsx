import { useFormHandler } from "@hooks/useFormHandler"; // ✅ Importamos el hook de manejo de formulario
import { useLangValue } from "@hooks/useLangValue";
import { DashboardLayout } from "@layout/DashboardLayout";
import { Formik } from "formik";
import { t } from "i18next";
import * as Yup from "yup"; // ✅ Importamos Yup por compatibilidad
import { FieldConfig } from "../forms/DynamicFormFields";
interface Props {
    moduleKey: string;
    data: any;
    isFetching: boolean;
    visible: boolean;
    rowData: any;
    handleDelete: (id: number) => void;
    refetch: () => void;
    startToolbarTemplate: () => JSX.Element;
    resetModuleState: () => void;
    formFields: FieldConfig[];
    FormComponent: React.FC<{
        title?: string;
        refetch: () => void;
        fields: FieldConfig[];
        rowData?: any;
        onCancel: () => void;
    }>;
    TableComponent: React.FC<{ data: any; isFetching: boolean; handleDelete: (id: number) => void }>;
    createMutation: any;
    updateMutation: any;
    validationSchema?: Yup.ObjectSchema<any>;
}

export const CrudPage = ({
    moduleKey,
    data,
    isFetching,
    visible,
    rowData,
    handleDelete,
    refetch,
    startToolbarTemplate,
    resetModuleState,
    formFields,
    FormComponent,
    TableComponent,
    createMutation,
    updateMutation,
    validationSchema,
}: Props) => {
    const title = useLangValue(moduleKey, "title", moduleKey);
    const editLabel = useLangValue(moduleKey, "edit", "Editar");
    const newLabel = useLangValue(moduleKey, "new", "Nuevo");

    const onSave = useFormHandler({
        createMutation,
        updateMutation,
        refetch,
        closeForm: resetModuleState,
        rowData,
    });

    return (
        <DashboardLayout>
            <div className="text-3xl mt-2 mb-2">{t(title)}</div>
            <div className="card">
                {visible ? (
                    <>

                        <Formik
                            initialValues={rowData ?? formFields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})}
                            validationSchema={validationSchema}
                            onSubmit={onSave}
                        >
                            {() => (
                                <FormComponent
                                    title={rowData ? t(editLabel) : t(newLabel)}
                                    refetch={refetch}
                                    fields={formFields}
                                    rowData={rowData}
                                    onCancel={() => resetModuleState()}
                                />
                            )}
                        </Formik>
                    </>
                ) : (
                    <div>
                        <div className="grid">
                            <div className="col-12">{startToolbarTemplate()}</div>
                        </div>
                        <TableComponent data={data ?? []} isFetching={isFetching} handleDelete={handleDelete} />
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};
