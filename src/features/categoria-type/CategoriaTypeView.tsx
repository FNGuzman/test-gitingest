import { useModuleContext } from "@hooks/useModules";
import useQueryApi from "@hooks/useQueryApi";
import UseQueryMutation from "@hooks/useQueryMutation";
import { DashboardLayout } from "@layout/DashboardLayout";
import { t } from "i18next";
import { confirmDialog } from "primereact/confirmdialog";
import toast from "react-hot-toast";
import { lang } from "../../langs";
import { CategoriaTypeApi } from "./service/categoriaType.service";

import FormCategoriaType from "./components/form/FormCategoriaType";
import { useEffect } from "react";
import { TableCategoriaType } from "./components/table/TableFeat";
import { CategoriaTypeResponse } from "./model/entity/categoriaType.entity";


const CategoriaTypeView = () => {
  const { rowData, startToolbarTemplate, visible, resetModuleState } = useModuleContext();
  const { data, isFetching, refetch } = useQueryApi<CategoriaTypeResponse>(
    "CategoriaType",
    CategoriaTypeApi.getCategoriaTypeSearch
  );

  useEffect(() => {
    resetModuleState();
  }, []);

  const deleteCategoriaType = UseQueryMutation({
    requestFn: CategoriaTypeApi.deleteCategoriaType,
    options: {
      onError() {
        toast.error(t(lang.Category.messages.deletedError));
      },
      onSuccess: () => {
        refetch();
        toast.success(t(lang.Category.messages.deletedSuccess));
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
        await deleteCategoriaType.mutateAsync({ id });
      },
      reject: () => {
        // Maneja la cancelación si es necesario
      },
    });
  };


  return (
    <DashboardLayout>
      <div className="card">
        <div className='text-3xl mt-2 mb-2'>
          {t(lang.Category.title)}
        </div>
        {
          visible ? (
            <>
              <FormCategoriaType
                title={rowData ? `${t(lang.Category.edit)}` : `${t(lang.Category.new)}`} refetch={refetch}
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
                <TableCategoriaType
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

export default CategoriaTypeView;