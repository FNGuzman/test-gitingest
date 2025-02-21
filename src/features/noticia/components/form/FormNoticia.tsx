
import { Formik } from "formik";
import { t } from "i18next";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { useModuleContext } from "../../../../hooks/useModules";
import UseQueryMutation from "../../../../hooks/useQueryMutation";
import { lang } from "../../../../langs";
import { NoticiaApi } from "@features/noticia/service/noticia.service";
import { NoticiaPatchDTO, NoticiaPostDTO } from "@features/noticia/model/dtos/noticia.dto";
import FormFields from "./FormFields";


interface FormTypeActionsProps {
    refetch: () => void;
    title?: string;
}
const FormNoticia: React.FC<FormTypeActionsProps> = ({ refetch, title = 'Titulo' }) => {
    const { setRowData, rowData, visible, setVisible } = useModuleContext();

    const postNoticia = UseQueryMutation({
        requestFn: NoticiaApi.postNoticia,
        options: {
            onError: () => {
                toast.error(t(lang.Noticia.messages.createdError));
            },
            onSuccess: () => {
                toast.success(t(lang.Noticia.messages.createdSuccess));
                setVisible(false);
                setRowData(undefined);
                refetch();
            },
        },
    });

    const patchNoticia = UseQueryMutation({
        requestFn: NoticiaApi.patchNoticia,
        options: {
            onError: () => {
                toast.error(t(lang.Noticia.messages.updatedError));
            },
            onSuccess: () => {
                toast.success(t(lang.Noticia.messages.updatedSuccess));
                setVisible(false);
                setRowData(undefined);
                refetch();
            },
        },
    });

    const onSave = useCallback(
        async (values: NoticiaPostDTO, setSubmitting: (isSubmitting: boolean) => void) => {
            try {
                if (!values.imgMiniatura || !values.imgPortada) {
                    toast.error("Debes subir ambas imágenes.");
                    return;
                }
                if (rowData) {
                    const req: NoticiaPatchDTO = {
                        id: rowData.id,
                        ...values,
                    };
                    await patchNoticia.mutateAsync(req);
                } else {
                    await postNoticia.mutateAsync(values);
                }
            } finally {
                setSubmitting(false);
            }
        },
        [rowData, patchNoticia, postNoticia]
    );

    useEffect(() => {
        if (!visible) {
            setRowData(undefined);
        }
    }, [visible, setRowData]);

    const initialValues: NoticiaPostDTO = {

        titulo: rowData?.titulo ?? "",
        pagina: 1,
        autor: rowData?.titulo ?? "",
        bajada: rowData?.bajada ?? "",
        categoria: 1,
        estado: rowData?.estado ?? "",
        fecha: rowData?.fecha ?? "",
        imgMiniatura: rowData?.imgMiniatura ?? "",
        imgPortada: rowData?.imgPortada ?? "",
        noticia: rowData?.noticia ?? ""
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

export default FormNoticia;