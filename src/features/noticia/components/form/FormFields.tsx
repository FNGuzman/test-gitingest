import { Form, useFormikContext } from "formik";
import { t } from "i18next";
import { FC } from "react";
import { lang } from "../../../../langs";
import { FormTextInput } from "@components/common/forms/FormTextInput";
import FormCustomButtons from "@components/common/forms/FormCustomButtons";
import FormDatePicker from "@components/common/forms/FormDatePicker";
import { FormEditorInput } from "@components/common/forms/FormEditorInput";
import { NoticiaPostDTO } from "@features/noticia/model/dtos/noticia.dto";
import { FormFileUpload } from "@components/common/forms/FormFileUpload";


const FormFields: FC = () => {
    const { handleSubmit } = useFormikContext<NoticiaPostDTO>();

    return (
        <Form onSubmit={handleSubmit}>
            <div className="p-fluid formgrid grid mb-3">
                <div className="col-12 md:col-6 lg:col-6">
                    <FormTextInput label={t(lang.Noticia.form.title)} name={'titulo'} />
                </div>
                <div className="col-12 md:col-6 lg:col-6">
                    <FormTextInput label={t(lang.Noticia.form.dropLine)} name={'bajada'} />
                </div>
                <div className="col-12 md:col-6 lg:col-6 mt-2">
                    <FormTextInput label={t(lang.Noticia.form.autor)} name={'autor'} />
                </div>
                <div className="col-12 md:col-6 lg:col-6 mt-2">
                    <FormTextInput label={t(lang.Noticia.form.status)} name={'estado'} />
                </div>
                <div className="col-12 mt-2">
                    <FormDatePicker label={t(lang.Noticia.form.date)} name={'fecha'} />
                </div>
                <div className="col-12 md:col-6 lg:col-6 mt-2">
                    <FormFileUpload name="imgPortada" label={t(lang.Noticia.form.imgPortada)} accept="image/*" />

                </div>
                <div className="col-12 md:col-6 lg:col-6 mt-2">
                    <FormFileUpload name="imgMiniatura" label={t(lang.Noticia.form.imgMiniatura)} accept="image/*" />
                </div>
                <div className="col-12 mt-2">
                    <FormEditorInput label={t(lang.Noticia.form.news)} name={'noticia'} />
                </div>
            </div>
            <FormCustomButtons />
        </Form>
    );
};

export default FormFields;