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
import { fieldValidations } from "./fieldValidations/field.validations";
import { handleApiError } from "@helpers/errorHandler";
import { ErrorApiResponse } from "@helpers/errorHandler";
import { AxiosError } from "axios";
import { TagTypeApi } from "@features/tag-type/service/tagType.service";
import { TagTypePatchDTO, TagTypePostDTO } from "@features/tag-type/model/dtos/tagType.dto";
interface FormTypeActionsProps {
    refetch: () => void;
    title?: string;
}
const FormTagType: React.FC<FormTypeActionsProps> = ({ refetch, title = 'Titulo' }) => {
    const { setRowData, rowData, visible, setVisible } = useModuleContext();
    const postTagType = UseQueryMutation({
        requestFn: TagTypeApi.postTagType,
        options: {
            onError: (error: AxiosError<unknown>) => {
                handleApiError(error as AxiosError<ErrorApiResponse>, {
                    createdError: t(lang.Tag.messages.createdError),
                    unknownError: t(lang.Tag.messages.unknownError)
                });
            },
            onSuccess: () => {
                toast.success(t(lang.Tag.messages.createdSuccess));
                setVisible(false);
                setRowData(undefined);
                refetch();
            },
        },
    });

    const patchCategoriaType = UseQueryMutation({
        requestFn: TagTypeApi.patchTagType,
        options: {
            onError: (error: AxiosError<unknown>) => {
                handleApiError(error as AxiosError<ErrorApiResponse>, {
                    createdError: t(lang.Tag.messages.updatedError),
                    unknownError: t(lang.Tag.messages.unknownError)
                });
            },
            onSuccess: () => {
                toast.success(t(lang.Tag.messages.updatedSuccess));
                setVisible(false);
                setRowData(undefined);
                refetch();
            },
        },
    });

    const onSave = useCallback(
        async (values: TagTypePostDTO, setSubmitting: (isSubmitting: boolean) => void) => {
            try {
                if (rowData) {
                    const req: TagTypePatchDTO = {
                        id: rowData.id,
                        ...values,
                    };

                    await patchCategoriaType.mutateAsync(req);
                } else {

                    await postTagType.mutateAsync(values);

                }
            } finally {
                setSubmitting(false);
            }
        },
        [rowData, patchCategoriaType, postTagType]
    );

    useEffect(() => {
        if (!visible) {
            setRowData(undefined);
        }
    }, [visible, setRowData]);

    const initialValues: TagTypePostDTO = {
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

export default FormTagType;