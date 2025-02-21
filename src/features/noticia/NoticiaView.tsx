import { useModuleContext } from "@hooks/useModules";
import useQueryApi from "@hooks/useQueryApi";
import UseQueryMutation from "@hooks/useQueryMutation";
import { DashboardLayout } from "@layout/DashboardLayout";
import { t } from "i18next";
import { confirmDialog } from "primereact/confirmdialog";
import toast from "react-hot-toast";
import { lang } from "../../langs";

import { TableNoticia } from "./components/table/TableNoticia";
// import FormNoticia from "./components/form/FormNoticia";
import { useEffect } from "react";
import { NoticiaApi } from "./service/noticia.service";
import FormNoticia from "./components/form/FormNoticia";


const NoticiaView = () => {
    const { rowData, startToolbarTemplate, visible, resetModuleState } = useModuleContext();
    const { data, isFetching, refetch } = useQueryApi<Response>(
        "Noticia",
        NoticiaApi.getNoticiaSearch
    );

    useEffect(() => {
        resetModuleState();
    }, []);

    const deleteNoticia = UseQueryMutation({
        requestFn: NoticiaApi.deleteNoticia,
        options: {
            onError() {
                toast.error(t(lang.Noticia.messages.deletedError));
            },
            onSuccess: () => {
                refetch();
                toast.success(t(lang.Noticia.messages.deletedSuccess));
            },
        },
    });

    const handleDelete = (id: number) => {
        confirmDialog({
            message: t(lang.common.labels.deleteMessage),
            header: t(lang.common.labels.deleteMessageTitle),
            icon: 'pi pi-exclamation-triangle text-yellow-500',
            acceptClassName: 'p-button-danger',
            acceptLabel: t(lang.common.actions.confirm),
            rejectLabel: t(lang.common.actions.cancel),
            accept: async () => {
                await deleteNoticia.mutateAsync({ id });
            },
            reject: () => {
                // Maneja la cancelación si es necesario
            },
        });
    };


    return (
        <DashboardLayout>
            <div className='text-3xl mt-2 mb-2'>
                {t(lang.Noticia.title)}
            </div>
            <div className="card">
                {
                    visible ? (
                        <>
                            <FormNoticia
                                title={rowData ? `${t(lang.Noticia.edit)}` : `${t(lang.Noticia.new)}`} refetch={refetch}
                            />
                        </>
                    )
                        : (
                            <div>
                                <div className="grid">
                                    <div className="col-12">
                                        {startToolbarTemplate()}
                                    </div>
                                </div>
                                <TableNoticia
                                    data={data ?? []}
                                    isFetching={isFetching}
                                    handleDelete={handleDelete}
                                />
                            </div>
                        )
                }
            </div>
        </DashboardLayout>
    );
};

export default NoticiaView;