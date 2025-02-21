import { useModuleContext } from "@hooks/useModules";
import useQueryApi from "@hooks/useQueryApi";
import UseQueryMutation from "@hooks/useQueryMutation";
import { DashboardLayout } from "@layout/DashboardLayout";
import { t } from "i18next";
import { confirmDialog } from "primereact/confirmdialog";
import toast from "react-hot-toast";
import { lang } from "../../../langs";
import { TableSeccionDestacada } from "./components/table/TableSeccionDestacada";
import FormSeccionDestacada from "./components/form/FormSeccionDestacada";
import { useEffect } from "react";
import { SeccionDestacadaApi } from "./service/seccion-destacada.service";


const SeccionDestacadaView = () => {
    const { rowData, startToolbarTemplate, visible, resetModuleState } = useModuleContext();
    const { data, isFetching, refetch } = useQueryApi<Response>(
        "SeccionDestacada",
        SeccionDestacadaApi.getSeccionDestacadaSearch
    );

    useEffect(() => {
        resetModuleState();
    }, []);

    const deleteSeccionDestacada = UseQueryMutation({
        requestFn: SeccionDestacadaApi.deleteSeccionDestacada,
        options: {
            onError() {
                toast.error(t(lang.SeccionDestacada.messages.deletedError));
            },
            onSuccess: () => {
                refetch();
                toast.success(t(lang.SeccionDestacada.messages.deletedSuccess));
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
                await deleteSeccionDestacada.mutateAsync({ id });
            },
            reject: () => {
                // Maneja la cancelación si es necesario
            },
        });
    };


    return (
        <DashboardLayout>
            <div className='text-3xl mt-2 mb-2'>
                {t(lang.SeccionDestacada.title)}
            </div>
            <div className="card">
                {
                    visible ? (
                        <>
                            <FormSeccionDestacada
                                title={rowData ? `${t(lang.SeccionDestacada.edit)}` : `${t(lang.SeccionDestacada.new)}`} refetch={refetch}
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
                                <TableSeccionDestacada
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

export default SeccionDestacadaView;