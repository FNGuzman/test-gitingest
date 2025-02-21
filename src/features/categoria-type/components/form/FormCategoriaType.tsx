import { Formik } from "formik";
import { t } from "i18next";
import toast from "react-hot-toast";
import { useModuleContext } from "../../../../hooks/useModules";
import UseQueryMutation from "../../../../hooks/useQueryMutation";
import { lang } from "../../../../langs";
import { useCallback, useEffect } from "react";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import FormFields from "./FormFields";
import { CategoriaTypeApi } from "@features/categoria-type/service/categoriaType.service";
import { CategoriaTypePatchDTO, CategoriaTypePostDTO } from "@features/categoria-type/model/dtos/categoriaType.dto";
import { fieldValidations } from "./fieldValidations/field.validations";
import { ErrorApiResponse, handleApiError } from "@helpers/errorHandler";
import { AxiosError } from "axios";
interface FormTypeActionsProps {
    refetch: () => void;
    title?: string;
}
const FormCategoriaType: React.FC<FormTypeActionsProps> = ({ refetch, title = 'Titulo' }) => {
    const { setRowData, rowData, visible, setVisible } = useModuleContext();
    const postCategoriaType = UseQueryMutation({
        requestFn: CategoriaTypeApi.postCategoriaType,
        options: {
            onError: (error: AxiosError<unknown>) => {
                handleApiError(error as AxiosError<ErrorApiResponse>, {
                    createdError: t(lang.Category.messages.createdError),
                    unknownError: t(lang.Category.messages.unknownError)
                });
            },
            onSuccess: () => {
                toast.success(t(lang.Category.messages.createdSuccess));
                setVisible(false);
                setRowData(undefined);
                refetch();
            },
        },
    });

    const patchCategoriaType = UseQueryMutation({
        requestFn: CategoriaTypeApi.patchCategoriaType,
        options: {
            onError: (error: AxiosError<unknown>) => {
                handleApiError(error as AxiosError<ErrorApiResponse>, {
                    createdError: t(lang.Category.messages.updatedError),
                    unknownError: t(lang.Category.messages.unknownError)
                });
            },
            onSuccess: () => {
                toast.success(t(lang.Category.messages.updatedSuccess));
                setVisible(false);
                setRowData(undefined);
                refetch();
            },
        },
    });

    const onSave = useCallback(
        async (values: CategoriaTypePostDTO, setSubmitting: (isSubmitting: boolean) => void) => {
            try {
                if (rowData) {
                    const req: CategoriaTypePatchDTO = {
                        id: rowData.id,
                        ...values,
                    };

                    await patchCategoriaType.mutateAsync(req);
                } else {

                    await postCategoriaType.mutateAsync(values);

                }
            } finally {
                setSubmitting(false);
            }
        },
        [rowData, patchCategoriaType, postCategoriaType]
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
                onSubmit={(values, { setSubmitting }) => {
                    onSave(values, setSubmitting);
                }}
            >
                <>
                    <FormFields />
                </>
            </Formik>
        </>
    );
};

export default FormCategoriaType;