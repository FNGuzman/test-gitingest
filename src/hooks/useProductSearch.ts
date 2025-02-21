import { useState } from 'react';
import { ProductoApi } from '@features/producto/service/produto.service';
import { AxiosResponse } from 'axios';
import toast from 'react-hot-toast';

const useProductSearch = () => {
    const [isSearching, setIsSearching] = useState(false);

    const searchProduct = async (params: { codigoBarras?: string; nombre?: string }, callback: (data: any[]) => void) => {
        setIsSearching(true);
        try {
            const response: AxiosResponse<any> = await ProductoApi.getProductoSearchVenta(params);
            const data = response.data;

            if (data && Array.isArray(data.data) && data.data.length > 0) {
                callback(data.data); // Pasamos los datos a través del callback
            } else {
                toast.error('No se encontró un producto con ese parámetro.');
                callback([]); // Devolvemos un array vacío si no hay resultados
            }
        } catch (error) {
            toast.error('Hubo un error al buscar el producto.');
            callback([]); // Devolvemos un array vacío en caso de error
        } finally {
            setIsSearching(false);
        }
    };

    return { searchProduct, isSearching };
};


export default useProductSearch;
