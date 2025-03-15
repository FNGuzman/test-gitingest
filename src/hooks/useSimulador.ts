import { useState, useEffect } from "react";
import { DatosAccion, TasaCierre } from "../interfaces/simulatorInterfaces";
import { productos, tasaCierre, valorDolar, factoresComision } from "../constants/products";

/** 📌 Definimos la estructura del estado del hook */
interface UseSimuladorState {
    objetivo: number | string;
    setObjetivo: (value: number | string) => void;
    productoSeleccionado: string;
    setProductoSeleccionado: (value: string) => void;
    comisionSeleccionada: number;
    setComisionSeleccionada: (value: number) => void;
    montoAVender: number;
    volumenCarrera: number;
    totalVentas: number;
    gananciaNeta: number;
    nivelVendedor?: TasaCierre;
    valorUSD: number;
    ticketPromedio: number;
    mes: string;
    datosAccion: DatosAccion[];
}

export const useSimulador = (): UseSimuladorState => {
    /** 📌 Estados del simulador */
    const [objetivo, setObjetivo] = useState<number | string>(""); // 🔹 Se mantiene al cambiar producto
    const [productoSeleccionado, setProductoSeleccionado] = useState<string>("");
    const [comisionSeleccionada, setComisionSeleccionada] = useState<number>(0);
    const [montoAVender, setMontoAVender] = useState(0);
    const [volumenCarrera, setVolumenCarrera] = useState(0);
    const [totalVentas, setTotalVentas] = useState(0);
    const [gananciaNeta, setGananciaNeta] = useState(0);

    /** 📌 Datos base */
    const nivelVendedor = tasaCierre.find((nivel) => nivel.label === "Semi Senior") || { label: "Desconocido", valor: 1 };
    const valorUSD = valorDolar[0]?.valor || 1;
    const ticketPromedio = 1500;
    const mes = new Date().toLocaleString("es-ES", { month: "long" });

    /** 📌 Factor de comisión basado en `comisionSeleccionada` */
    const factor = factoresComision[comisionSeleccionada] || 1;

    /** 📌 Calculamos la ganancia neta cuando cambia el producto o la comisión */
    useEffect(() => {
        const precioProducto = productos.find((p) => p.nombre === productoSeleccionado)?.precio || 0;
        setGananciaNeta(precioProducto > 0 && comisionSeleccionada > 0 ? (precioProducto / 1.21) * comisionSeleccionada : 0);
    }, [productoSeleccionado, comisionSeleccionada]);

    /** 📌 Calculamos el monto a vender, volumen de carrera y total de ventas */
    useEffect(() => {
        const precioProducto = productos.find((p) => p.nombre === productoSeleccionado)?.precio || 0;

        if (objetivo && !isNaN(Number(objetivo)) && Number(objetivo) > 0 && precioProducto && factor) {
            const nuevoMontoAVender = Number(objetivo) * 1.21 * factor;
            const nuevoVolumenCarrera = Number((nuevoMontoAVender / valorUSD).toFixed(3));
            const nuevoTotalVentas = Number((nuevoVolumenCarrera / ticketPromedio).toFixed(2));

            setMontoAVender(nuevoMontoAVender);
            setVolumenCarrera(nuevoVolumenCarrera);
            setTotalVentas(nuevoTotalVentas);
        }
    }, [objetivo, comisionSeleccionada, factor, productoSeleccionado]); // 🔹 Ahora también se recalcula cuando cambia `productoSeleccionado`

    /** 📌 Cálculo del plan de acción */
    const tasaCierreValor = nivelVendedor?.valor || 1;
    const minPresentacionesMes = Math.ceil(totalVentas / tasaCierreValor);
    const minPresentacionesSemana = Math.ceil(minPresentacionesMes / 4 + 1);

    const datosAccion: DatosAccion[] = [
        { titulo: "Nuevos Datos a Prospectar", valor: Math.ceil(totalVentas * 6), color: "bg-[var(--color-primary)]" },
        { titulo: "Mínimo Presentaciones x Mes", valor: minPresentacionesMes, color: "bg-[var(--color-secondary)]" },
        { titulo: "Mínimo Presentaciones x Sem.", valor: minPresentacionesSemana, color: "bg-[var(--color-accent)]" }
    ];

    return {
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
        nivelVendedor,
        valorUSD,
        ticketPromedio,
        mes,
        datosAccion,
    };
};
