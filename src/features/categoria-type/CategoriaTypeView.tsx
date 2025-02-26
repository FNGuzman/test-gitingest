import { useFeatureModule } from "@hooks/useFeatureModule";
import { CategoriaTypeApi } from "@features/categoria-type/service/categoriaType.service";
import DynamicFormFields, { FieldConfig } from "@components/common/forms/DynamicFormFields";
import { TableCategoriaType } from "./components/table/TableCategoriaType";
import { fieldValidations } from "./components/form/fieldValidations/field.validations";
import { CrudPage } from "@components/common/cruds/CurdPage";

const CategoriaTypeView = () => {
  const feature = useFeatureModule(CategoriaTypeApi, "categoriaType");
  const formFields: FieldConfig[] = [
    { name: "nombre", label: "Nombre", type: "text", gridSize: "full" },
  ];
  return (
    <CrudPage
      moduleKey="categoriaType"
      FormComponent={DynamicFormFields}
      TableComponent={TableCategoriaType}
      formFields={formFields}
      validationSchema={fieldValidations}
      {...feature}
    />
  );
};

export default CategoriaTypeView;
