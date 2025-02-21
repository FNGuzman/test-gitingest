import { useModuleContext } from "@hooks/useModules";
import useQueryApi from "@hooks/useQueryApi";
import UseQueryMutation from "@hooks/useQueryMutation";
import { DashboardLayout } from "@layout/DashboardLayout";
import { t } from "i18next";
import { confirmDialog } from "primereact/confirmdialog";
import toast from "react-hot-toast";
import { lang } from "../../langs";
import { useEffect } from "react";
import { MarcaEntity } from "@features/producto/model/entity/producto.entity";
import { TagTypeApi } from "./service/tagType.service";
import FormTagType from "./components/form/FormMarcaType";
import { TableTagType } from "./components/table/TableTagType";


const TagTypeView = () => {
  const { rowData, startToolbarTemplate, visible, resetModuleState } = useModuleContext();
  const { data, isFetching, refetch } = useQueryApi<MarcaEntity>(
    "TagType",
    TagTypeApi.getTagTypeSearch
  );

  useEffect(() => {
    resetModuleState();
  }, []);

  const deleteTagType = UseQueryMutation({
    requestFn: TagTypeApi.deleteTagType,
    options: {
      onError() {
        toast.error(t(lang.Tag.messages.deletedError));
      },
      onSuccess: () => {
        refetch();
        toast.success(t(lang.Tag.messages.deletedSuccess));
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
        await deleteTagType.mutateAsync({ id });
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
          {t(lang.Tag.title)}
        </div>
        {
          visible ? (
            <>
              <FormTagType
                title={rowData ? `${t(lang.Tag.edit)}` : `${t(lang.Tag.new)}`} refetch={refetch}
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
                <TableTagType
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

export default TagTypeView;