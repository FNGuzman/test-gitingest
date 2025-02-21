import { useModuleContext } from "@hooks/useModules";
import useQueryApi from "@hooks/useQueryApi";
import UseQueryMutation from "@hooks/useQueryMutation";
import { t } from "i18next";
import toast from "react-hot-toast";
import { lang } from "../langs";
import { confirmDialog } from "primereact/confirmdialog";

export const useFeatureModule = (apiService: any, moduleKey: string) => {
    const { rowData, startToolbarTemplate, visible, resetModuleState } = useModuleContext();
    const { data, isFetching, refetch } = useQueryApi<Response>(
        moduleKey,
        apiService.getAll
    );
    const getLangMessage = (key: string, path: string) => {
        return path.split(".").reduce((acc: any, part) => acc?.[part], lang[key as keyof typeof lang]) || "Mensaje no encontrado";
    };
    const deleteMutation = UseQueryMutation({
        requestFn: apiService.delete,
        options: {
            onError() {
                toast.error(t(getLangMessage(moduleKey, "messages.deletedError")));
            },
            onSuccess: () => {
                refetch();
                toast.success(t(getLangMessage(moduleKey, "messages.deletedSuccess")));
            },
        },
    });

    const handleDelete = (id: number) => {
        confirmDialog({
            message: t(lang.common.labels.deleteMessage),
            header: t(lang.common.labels.deleteMessageTitle),
            icon: "pi pi-exclamation-triangle text-yellow-500",
            acceptClassName: "p-button-danger",
            acceptLabel: t(lang.common.actions.confirm),
            rejectLabel: t(lang.common.actions.cancel),
            accept: async () => {
                await deleteMutation.mutateAsync(id);
            },
        });
    };
    return {
        data,
        isFetching,
        refetch,
        rowData,
        startToolbarTemplate,
        visible,
        resetModuleState,
        handleDelete,
    };
};
