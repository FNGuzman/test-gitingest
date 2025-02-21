import { Form, useFormikContext } from "formik";
import { t } from "i18next";
import { FC } from "react";
import { lang } from "../../../../../langs";
import { FormTextInput } from "@components/common/forms/FormTextInput";
import FormCustomButtons from "@components/common/forms/FormCustomButtons";
import { SeccionDestacadaPostDTO } from "../../model/dtos/seccion-destacada.dto";

const FormFields: FC = () => {
    const { handleSubmit } = useFormikContext<SeccionDestacadaPostDTO>();

    return (
        <Form onSubmit={handleSubmit}>
            <div className="p-fluid formgrid grid mb-3">
                <div className="col-12 md:col-6 lg:col-6">
                    <FormTextInput label={t(lang.SeccionDestacada.form.name)} name={'nombre'} />
                </div>

            </div>
            <FormCustomButtons />
        </Form>
    );
};

export default FormFields;