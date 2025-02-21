import { Formik } from "formik";
import { t } from "i18next";
import toast from "react-hot-toast";
import { useModuleContext } from "../../../../../hooks/useModules";
import UseQueryMutation from "../../../../../hooks/useQueryMutation";
import { lang } from "../../../../../langs";
import { useCallback, useEffect } from "react";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { SeccionDestacadaApi } from "../../service/seccion-destacada.service";
import { SeccionDestacadaPatchDTO, SeccionDestacadaPostDTO } from "../../model/dtos/seccion-destacada.dto";
import FormFields from "./FormFields";

interface FormTypeActionsProps {
    refetch: () => void;
    title?: string;
}
const FormSeccionDestacada: React.FC<FormTypeActionsProps> = ({ refetch, title = 'Titulo' }) => {
    const { setRowData, rowData, visible, setVisible } = useModuleContext();

    const postSeccionDestacada = UseQueryMutation({
        requestFn: SeccionDestacadaApi.postSeccionDestacada,
        options: {
            onError: () => {
                toast.error(t(lang.SeccionDestacada.messages.createdError));
            },
            onSuccess: () => {
                toast.success(t(lang.SeccionDestacada.messages.createdSuccess));
                setVisible(false);
                setRowData(undefined);
                refetch();
            },
        },
    });

    const patchSeccionDestacada = UseQueryMutation({
        requestFn: SeccionDestacadaApi.patchSeccionDestacada,
        options: {
            onError: () => {
                toast.error(t(lang.SeccionDestacada.messages.updatedError));
            },
            onSuccess: () => {
                toast.success(t(lang.SeccionDestacada.messages.updatedSuccess));
                setVisible(false);
                setRowData(undefined);
                refetch();
            },
        },
    });

    const onSave = useCallback(
        async (values: SeccionDestacadaPostDTO, setSubmitting: (isSubmitting: boolean) => void) => {
            try {
                if (rowData) {
                    const req: SeccionDestacadaPatchDTO = {
                        id: rowData.id,
                        ...values,
                    };
                    await patchSeccionDestacada.mutateAsync(req);
                } else {
                    await postSeccionDestacada.mutateAsync(values);
                }
            } finally {
                setSubmitting(false);
            }
        },
        [rowData, patchSeccionDestacada, postSeccionDestacada]
    );

    useEffect(() => {
        if (!visible) {
            setRowData(undefined);
        }
    }, [visible, setRowData]);

    const initialValues: SeccionDestacadaPostDTO = {
        title: rowData.title ?? "",
        image: rowData.image ?? "",
        imagePosition: rowData.imagePosition ?? 'left',
        paginaId: rowData.paginaId ?? 1,
        text: rowData.text ?? "",
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
                // validationSchema={fieldValidations}
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

export default FormSeccionDestacada;