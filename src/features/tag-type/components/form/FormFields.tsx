import { Form, useFormikContext } from "formik";
import { t } from "i18next";
import { FC } from "react";
import { lang } from "../../../../langs";
import { FormTextInput } from "@components/common/forms/FormTextInput";
import FormCustomButtons from "@components/common/forms/FormCustomButtons";
import { MarcaTypePostDTO } from "@features/marca-type/model/dtos/marcaType.dto";

const FormFields: FC = () => {
    const { handleSubmit } = useFormikContext<MarcaTypePostDTO>();

    return (
        <Form onSubmit={handleSubmit}>
            <div className="p-fluid formgrid grid mb-3">
                <div className="col-12 md:col-12 lg:col-12">
                    <FormTextInput label={t(lang.Tag.form.name)} name={'nombre'} />
                </div>
            </div>
            <FormCustomButtons />
        </Form>
    );
};

export default FormFields;