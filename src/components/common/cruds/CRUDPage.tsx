import { useLangValue } from "@hooks/useLangValue";
import { DashboardLayout } from "@layout/DashboardLayout";
import { t } from "i18next";

interface Props {
    moduleKey: string;
    data: any;
    isFetching: boolean;
    visible: boolean;
    rowData: any;
    handleDelete: (id: number) => void;
    refetch: () => void;
    startToolbarTemplate: () => JSX.Element;
    FormComponent: React.FC<{ title?: string; refetch: () => void }>; // Ahora `title` es opcional
    TableComponent: React.FC<{ data: any; isFetching: boolean; handleDelete: (id: number) => void }>;
}

export const CrudPage = ({
    moduleKey, // Cambiado aquí también
    data,
    isFetching,
    visible,
    rowData,
    handleDelete,
    refetch,
    startToolbarTemplate,
    FormComponent,
    TableComponent,
}: Props) => {

    // Se usa moduleKey en lugar de titleKey
    const title = useLangValue(moduleKey, "title", moduleKey);
    const editLabel = useLangValue(moduleKey, "edit", "Editar");
    const newLabel = useLangValue(moduleKey, "new", "Nuevo");

    return (
        <DashboardLayout>
            <div className="text-3xl mt-2 mb-2">{t(title)}</div>
            <div className="card">
                {visible ? (
                    <FormComponent
                        title={rowData ? t(editLabel) : t(newLabel)}
                        refetch={refetch}
                    />
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
