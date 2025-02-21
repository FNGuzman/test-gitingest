import { CategoriaTypeApi } from "@features/categoria-type/service/categoriaType.service";
import { ClienteApi } from "@features/cliente/service/cliente.service";
import { MarcaTypeApi } from "@features/marca-type/service/marcaType.service";
import { MetodoPagoApi } from "@features/metodo-pago/service/metodoPago.service";
import { PresentacionTypeApi } from "@features/presentacion-type/service/presentacionType.service";
import { TablasAfipApi } from "@features/tablas-afip/service/tablasAfip.service";

interface SelectEntityConfig {
    apiService: () => Promise<any>; // API que devuelve las opciones
    labelField: string; // Campo que se usará como label en el select
    valueField: string; // Campo que se usará como value en el select
}

const selectEntitiesConfig: Record<string, SelectEntityConfig> = {
    marcaType: {
        apiService: MarcaTypeApi.getMarcaTypeSearch,
        labelField: "nombre", // Campo que se mostrará en el select
        valueField: "id", // Campo que se usará como valor del select
    },
    categoriaType: {
        apiService: CategoriaTypeApi.getCategoriaTypeSearch,
        labelField: "nombre", // Campo que se mostrará en el select
        valueField: "id", // Campo que se usará como valor del select
    },
    presentacionType: {
        apiService: PresentacionTypeApi.getPresentacionTypeSearch,
        labelField: "nombre",
        valueField: "id",
    },
    ivaType: {
        apiService: TablasAfipApi.getTipoAlicuota,
        labelField: "desc",
        valueField: "id"
    },
    cliente: {
        apiService: ClienteApi.getClienteSearch,
        labelField: "nombre",
        valueField: "id"
    },
    metodoPago: {
        apiService: MetodoPagoApi.getMetodoPagoSearch,
        labelField: "nombre",
        valueField: "id"
    },
    tipoDocumento: {
        apiService: TablasAfipApi.getTipoDocumento,
        labelField: "desc",
        valueField: "id"
    }


};

export default selectEntitiesConfig;
