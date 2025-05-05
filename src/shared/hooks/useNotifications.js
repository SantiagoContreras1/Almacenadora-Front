import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { setNotifications } from "../../features/notifications/notificationSlice";
import { getNotifications as getNotificationsRequest } from "../../services/api";
import socket from "../../config/socket";

const getToastConfig = (type, message) => {
  switch (type) {
    case "Stock":
      return {
        title: "Stock bajo",
        description: message,
        status: "warning",
      };
    case "Vencimiento":
      return {
        title: "Próximo a vencer",
        description: message,
        status: "info",
      };
    case "Acción":
      return {
        title: "Acción realizada",
        description: message,
        status: "info",
      };
    default:
      return {
        title: "Notificación",
        description: message,
        status: "info",
      };
  }
};

export const useNotifications = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const notifications = useSelector((state) => state.notifications);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    socket.on("alerts", (data) => {
      const { lowStock, cercaExp } = data;

      if (lowStock.length > 0) {
        lowStock.forEach((product) => {
          const msg = `Producto "${product.name}" con stock bajo: ${product.stock}`;
          if (!notifications.find((notif) => notif.message === msg)) {
            dispatch(
              setNotifications({ type: "Stock", message: msg, product })
            );
            const toastConfig = getToastConfig("Stock", msg);
            toast({
              ...toastConfig,
              duration: 5000,
              isClosable: true,
              position: "top-right",
            });
          }
        });
      }

      if (cercaExp.length > 0) {
        cercaExp.forEach((product) => {
          const msg = `Producto "${
            product.name
          }" vence pronto (Fecha: ${new Date(
            product.vencimiento
          ).toLocaleDateString()})`;
          if (!notifications.find((notif) => notif.message === msg)) {
            dispatch(
              setNotifications({ type: "Vencimiento", message: msg, product })
            );
            const toastConfig = getToastConfig("Vencimiento", msg);
            toast({
              ...toastConfig,
              duration: 5000,
              isClosable: true,
              position: "top-right",
            });
          }
        });
      }
    });
    return () => {
      socket.off("alerts");
    };
  }, [dispatch, notifications, toast]);

  

  const getNotifications = async (limit, offset) => {
    setIsLoading(true);

    const response = await getNotificationsRequest(limit, offset);

    if (response.error) {
      console.log(response)
      toast({
        title: "Get notification Failed",
        description:
          response.error?.response?.data || "An error occurred getting notifications.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }
    const notifications = response.data.notifications;
    return notifications;
  };

  return {notifications, getNotifications, isLoading};
};


