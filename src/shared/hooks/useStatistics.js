import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { getAllMovements as getAllMovementsRequest, getBestSellers as getBestSellersRequest, getLowStockProducts as getLowStockProductsRequest, getWeeklyInventoryMovements as getWeeklyInventoryMovementsRequest } from "../../services/api";
export const useStatistics = () => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const getMovements = async () => {
    setIsLoading(true);

    const response = await getAllMovementsRequest();

    if (response.error) {
      toast({
        title: "Get movements Failed",
        description:
          response.error?.response?.data || "An error occurred during get",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }
    const movements = response.data.movements;
    return movements;
  };

  const getBestSellers = async () => {
    setIsLoading(true);

    const response = await getBestSellersRequest();

    if (response.error) {
      toast({
        title: "Get products Failed",
        description:
        response.error?.response?.data || "An error occurred during get",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }
    const products = response.data.productos
    return products;
  };

  const getLowStockProducts = async () => {
    setIsLoading(true);

    const response = await getLowStockProductsRequest();

    if (response.error) {
      toast({
        title: "Get products Failed",
        description:
        response.error?.response?.data || "An error occurred during get",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }
    const products = response.data.productos
    return products;
  };

  const getWeeklyInventoryMovements  = async () => {
    setIsLoading(true);

    const response = await getWeeklyInventoryMovementsRequest();

    if (response.error) {
      toast({
        title: "Get products Failed",
        description:
        response.error?.response?.data || "An error occurred during get",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }
    const movements = response.data.movements
    return movements;
  };



  return {
    getMovements,
    getWeeklyInventoryMovements,
    getBestSellers,
    getLowStockProducts,
    isLoading,
  };
};
