import CustomBasicTable from "@components/common/table/basic-table/CustomBasicTable";
import { ICustomColumnItem } from "@components/common/table/basic-table/interfaces/custombasictable";
import { t } from "i18next";
import { lang } from "../../../../langs";

interface Props {
    data: any;
    isFetching: boolean;
    handleDelete: any;
}
export const TableModulo = ({ data, isFetching, handleDelete }: Props) => {
    const columns: ICustomColumnItem[] = [
        { field: 'nombre', header: 'ID', sortable: true, filter: true, filterPlaceholder: 'Buscar Por ID', dataType: 'text' },
        { field: 'iva', header: 'ID', sortable: true, filter: true, filterPlaceholder: 'Buscar Por ID', dataType: 'text' },
        { field: 'descripcion', header: 'ID', sortable: true, filter: true, filterPlaceholder: 'Buscar Por ID', dataType: 'text' },
        
    ];
    return (
        <>
            <CustomBasicTable
                data={data.data}
                loading={isFetching}
                columns={columns}
                tableTitle={t(lang.Modulo.subTitle)}
                handleDelete={handleDelete}
                filterDisplay={'row'}
                rowsPerPageOptions={[10, 100, 1000]}
                rows={10}
            />
        </>
    );
};