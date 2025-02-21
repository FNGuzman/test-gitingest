
import { useFeatureModule } from "@hooks/useFeatureModule";
import { CategoriaTypeApi } from "@features/categoria-type/service/categoriaType.service";
import { TableCategoriaType } from "./components/table/TableCategoriaType";
import FormCategoriaType from "./components/form/FormCategoriaType";
import { CrudPage } from "@components/common/cruds/CRUDPage";


const CategoriaTypeView = () => {
  const feature = useFeatureModule(CategoriaTypeApi, "categoriaType");

  return (
    <CrudPage
      moduleKey="CategoriaType" // Aquí ya usamos moduleKey en lugar de titleKey
      FormComponent={FormCategoriaType}
      TableComponent={TableCategoriaType}
      {...feature}
    />
  );
};

export default CategoriaTypeView;