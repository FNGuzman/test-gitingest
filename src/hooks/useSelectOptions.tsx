import { useEffect, useState, useMemo } from "react";
import useQueryApi from "./useQueryApi";
import selectEntitiesConfig from "@config/components/selectConfig";

interface IOptions {
    nombre?: string;
    value?: number;
}

const useSelectOptions = (
    entityName: keyof typeof selectEntitiesConfig,
    labelBuilder?: (item: any) => string
) => {
    const [options, setOptions] = useState<IOptions[]>([]);
    const entityConfig = useMemo(() => selectEntitiesConfig[entityName], [entityName]);

    const { data, isLoading, refetch } = useQueryApi<any>(
        entityName,
        entityConfig.apiService
    );

    useEffect(() => {
        const getDataArray = (responseData: any) => {
            if (Array.isArray(responseData)) return responseData;
            if (responseData?.data && Array.isArray(responseData.data)) return responseData.data;
            return [];
        };

        const dataArray = getDataArray(data);

        if (dataArray.length > 0) {
            const optionsData = dataArray.map((item: any) => ({
                nombre: labelBuilder
                    ? labelBuilder(item)
                    : item[entityConfig.labelField],
                value: item[entityConfig.valueField],
            }));

            if (JSON.stringify(optionsData) !== JSON.stringify(options)) {
                setOptions(optionsData);
            }
        }
    }, [data, labelBuilder, entityConfig.labelField, entityConfig.valueField, options]);

    return { options, isLoading, refetch };
};

export default useSelectOptions;
