import FormCustomButtons from "@components/common/forms/FormCustomButtons";
import { FormTextInput } from "@components/common/forms/FormTextInput";
import { CategoriaTypePostDTO } from "@features/categoria-type/model/dtos/categoriaType.dto";
import { Form, useFormikContext } from "formik";
import { t } from "i18next";
import { FC } from "react";
import { lang } from "../../../../langs";

const FormFields: FC = () => {
    const { handleSubmit } = useFormikContext<CategoriaTypePostDTO>();


    return (
        <Form onSubmit={handleSubmit}>
            <div className="p-fluid formgrid grid mb-3">
                <div className="col-12 md:col-6  lg:col-4">
                    <FormTextInput label={t(lang.Category.form.name)} name={'nombre'}
                    />
                </div>


            </div>
            <FormCustomButtons />


        </Form>
    )
}

export default FormFields