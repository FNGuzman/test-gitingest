import { t } from "i18next";
import { lang } from "../../../../langs";
import { ICustomColumnItem } from "@components/common/table/basic-table/interfaces/custombasictable";
import CustomBasicTable from "@components/common/table/basic-table/CustomBasicTable";

interface Props {
    data: any;
    isFetching: boolean;
    handleDelete: any;
}
export const TableCategoriaType = ({ data, isFetching, handleDelete }: Props) => {
    const columns: ICustomColumnItem[] = [
        { field: 'nombre', header: 'Nombre', sortable: true, filter: true, filterPlaceholder: 'Buscar por nombre', dataType: 'text' },
    ];

    return (
        <>
            <CustomBasicTable
                data={data.data}
                loading={isFetching}
                columns={columns}
                tableTitle={t(lang.Category.subTitle)}
                handleDelete={handleDelete}
                filterDisplay={'row'}
                rowsPerPageOptions={[10, 100, 1000]}
                rows={10}
            />
        </>
    );
};