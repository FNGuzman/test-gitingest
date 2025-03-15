
import { comisiones, productos } from "../../../constants/products";
import { useSimulador } from "../../../hooks/useSimulador";
import Header from "./components/Header";
import PlanAccion from "./components/PlanAccion";
import VentaResumen from "./components/VentaResumen";

const SimuladorMetas = () => {
    const {
        objetivo,
        setObjetivo,
        productoSeleccionado,
        setProductoSeleccionado,
        comisionSeleccionada,
        setComisionSeleccionada,
        montoAVender,
        volumenCarrera,
        totalVentas,
        gananciaNeta,
        datosAccion,
        nivelVendedor,
        valorUSD,
        ticketPromedio,
        mes
    } = useSimulador();

    return (
        <div className="p-1">
            {/* Cabecera con Avatar, Selects, Nivel, Mes, Ticket Promedio y Valor del Dólar */}
            <Header
                nivelVendedor={nivelVendedor?.label || "Desconocido"}
                gananciaNeta={gananciaNeta}
                mes={mes}
                ticketPromedio={ticketPromedio}
                valorUSD={valorUSD}
                productoSeleccionado={productoSeleccionado}
                setProductoSeleccionado={setProductoSeleccionado}
                comisionSeleccionada={comisionSeleccionada}
                setComisionSeleccionada={setComisionSeleccionada}
                productos={productos}
                comisiones={comisiones}
            />


            {/* Input de Objetivo */}
            <div className="p-3">
                <label className="text-sm font-semibold text-gray-700 block">
                    ¿Cuánto quiero ganar este mes en mi Venta Personal?
                </label>
                <input
                    type="number"
                    value={objetivo}
                    onChange={(e) => setObjetivo(e.target.value)}
                    className="bg-gray-200 p-2 rounded-lg text-sm outline-none w-full mt-1 text-right font-semibold"
                    placeholder="Ingrese su objetivo en $"
                />
            </div>
            {/* Resumen de Ventas */}
            <VentaResumen
                montoAVender={montoAVender}
                volumenCarrera={volumenCarrera}
                totalVentas={totalVentas}
                gananciaNeta={gananciaNeta}
            />

            {/* Plan de Acción */}
            <PlanAccion datosAccion={datosAccion} />
        </div>
    );
};

export default SimuladorMetas;
