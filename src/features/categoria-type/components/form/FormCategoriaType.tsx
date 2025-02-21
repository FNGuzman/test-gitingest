import { CategoriaTypePatchDTO, CategoriaTypePostDTO } from "@features/categoria-type/model/dtos/categoriaType.dto";
import { CategoriaTypeApi } from "@features/categoria-type/service/categoriaType.service";
import { Formik, FormikHelpers } from "formik";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { useCallback, useEffect } from "react";
import { useModuleContext } from "../../../../hooks/useModules";
import UseQueryMutation from "../../../../hooks/useQueryMutation";
import { fieldValidations } from "./fieldValidations/field.validations";
import FormFields from "./FormFields";
interface FormTypeActionsProps {
    refetch: () => void;
    title?: string;
}
const FormCategoriaType: React.FC<FormTypeActionsProps> = ({ refetch, title = 'Titulo' }) => {
    const { setRowData, rowData, visible, setVisible } = useModuleContext();
    const postCategoriaType = UseQueryMutation({
        requestFn: (data: CategoriaTypePostDTO) => CategoriaTypeApi.create(data),
    });

    const patchCategoriaType = UseQueryMutation({
        requestFn: (data: CategoriaTypePatchDTO) => CategoriaTypeApi.update(data),
    });

    const onSave = useCallback(
        async (values: CategoriaTypePostDTO, { setSubmitting }: FormikHelpers<CategoriaTypePostDTO>) => { // ✅ Ahora usa `FormikHelpers`
            try {
                if (rowData) {
                    await patchCategoriaType.mutateAsync({ id: rowData.id, ...values });
                } else {
                    await postCategoriaType.mutateAsync(values);
                }
                refetch();
                setVisible(false);
                setRowData(undefined);
            } finally {
                setSubmitting(false);
            }
        },
        [rowData, patchCategoriaType, postCategoriaType, refetch, setVisible, setRowData]
    );



    useEffect(() => {
        if (!visible) {
            setRowData(undefined);
        }
    }, [visible, setRowData]);

    const initialValues: CategoriaTypePostDTO = {
        nombre: rowData?.nombre ?? "",
    };

    return (
        <>
            <div className="grid mb-5">
                <div className="col-12">
                    <Button icon="pi pi-arrow-left" rounded text onClick={() => { setVisible(false); setRowData(undefined); }} />
                </div>
                <div className="col-12">
                    {
                        rowData ? (
                            <Message severity="warn" text={title} style={{
                                width: '100%',
                                fontSize: '900',
                                height: '3rem'
                            }} />
                        ) : (
                            <Message severity="info" text={title} style={{
                                width: '100%',
                                fontSize: '900',
                                height: '3rem'
                            }} />
                        )
                    }
                </div>
            </div>
            <Formik
                initialValues={initialValues}
                validationSchema={fieldValidations}
                onSubmit={onSave}
            >
                {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <FormFields />
                    </form>
                )}
            </Formik>

        </>
    );
};

export default FormCategoriaType;