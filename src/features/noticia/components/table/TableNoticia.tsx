import CustomBasicTable from "@components/common/table/basic-table/CustomBasicTable";
import { ICustomColumnItem } from "@components/common/table/basic-table/interfaces/custombasictable";
import { t } from "i18next";
import { lang } from "../../../../langs";

interface Props {
    data: any;
    isFetching: boolean;
    handleDelete: any;
}
export const TableNoticia = ({ data, isFetching, handleDelete }: Props) => {
    const columns: ICustomColumnItem[] = [
        { field: 'titulo', header: 'Titulo', sortable: true, filter: true, filterPlaceholder: 'Buscar Por ID', dataType: 'text' },
        { field: 'bajada', header: 'Linea de Bajada', sortable: true, filter: true, filterPlaceholder: 'Buscar Por ID', dataType: 'text' },
        { field: 'noticia', header: 'Noticia', sortable: true, filter: true, filterPlaceholder: 'Buscar Por ID', dataType: 'text' },
        { field: 'autor', header: 'Autor', sortable: true, filter: true, filterPlaceholder: 'Buscar Por ID', dataType: 'text' },
        { field: 'estado', header: 'Estado', sortable: true, filter: true, filterPlaceholder: 'Buscar Por ID', dataType: 'text' },
        { field: 'fecha', header: 'Fecha', sortable: true, filter: true, filterPlaceholder: 'Buscar Por ID', dataType: 'text' },
        { field: 'imgPortada', header: 'imgPortada', sortable: true, filter: true, filterPlaceholder: 'Buscar Por ID', dataType: 'text' },
        { field: 'imgMiniatura', header: 'imgMiniatura', sortable: true, filter: true, filterPlaceholder: 'Buscar Por ID', dataType: 'text' },
    ];
    return (
        <>
            <CustomBasicTable
                data={data.data}
                loading={isFetching}
                columns={columns}
                tableTitle={t(lang.Noticia.subTitle)}
                handleDelete={handleDelete}
                filterDisplay={'row'}
                rowsPerPageOptions={[10, 100, 1000]}
                rows={10}
            />
        </>
    );
};