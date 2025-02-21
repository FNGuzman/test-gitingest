import { Form, useFormikContext } from "formik";
import { t } from "i18next";
import { FC } from "react";
import { lang } from "../../../../langs";
import { FormTextInput } from "@components/common/forms/FormTextInput";
import FormCustomButtons from "@components/common/forms/FormCustomButtons";
import { ModuloPostDTO } from "@features/serviceName/model/dtos/serviceName.dto";
import { FormSelect } from "@components/common/forms/FormSelect";

const FormFields: FC = () => {
    const { handleSubmit } = useFormikContext<ModuloPostDTO>();

    return (
        <Form onSubmit={handleSubmit}>
            <div className="p-fluid formgrid grid mb-3">
                <div className="col-12 md:col-6 lg:col-6">
                    <FormTextInput label={t(lang.Modulo.form.name)} name={'nombre'} />
                </div>
                <div className="col-12 md:col-6 lg:col-6">
                    <FormSelect
                </div>
            </div>
            <FormCustomButtons />
        </Form>
    );
};

export default FormFields;