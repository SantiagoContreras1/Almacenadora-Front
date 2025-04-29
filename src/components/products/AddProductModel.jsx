import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  Input,
  Select,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useSuppliers } from "../../shared/hooks/useSuppliers";
import { useCategories } from "../../shared/hooks/useCategories";
import { useEffect, useState } from "react";

export const AddProductModal = ({ isOpen, onClose, handleSaveProduct }) => {
  const { register, handleSubmit, reset } = useForm();
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const { getCategories } = useCategories();
  const { getSuppliers } = useSuppliers();

  useEffect(() => {
    const fetchData = async () => {
      const catData = await getCategories();
      const provData = await getSuppliers();
      setCategories(catData || []);
      setSuppliers(provData || []);
    };

    if (isOpen) {
      fetchData();
      reset();
    }
  }, [isOpen, reset]);

  const onSubmit = (data) => {
    console.log(data)
    handleSaveProduct(data);
    reset();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Registrar Nuevo Producto</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <Input
              placeholder="Nombre del producto"
              mb="3"
              {...register("name", { required: true })}
            />

            <Select
              placeholder="Seleccione una categoría"
              mb="3"
              {...register("category", { required: true })}
            >
              {categories.map((cat) => (
                <option key={cat.uid} value={cat.uid}>
                  {cat.name}
                </option>
              ))}
            </Select>

            <Input
              placeholder="Cantidad en stock"
              type="number"
              mb="3"
              {...register("stock", { required: true, valueAsNumber: true })}
            />

            <Input
              placeholder="Precio"
              type="number"
              mb="3"
              {...register("price", { required: true })}
            />
            <Select
              placeholder="Seleccione un proveedor"
              mb="3"
              {...register("proveedor", { required: true })}
            >
              {suppliers.map((sup) => (
                <option key={sup.uid} value={sup.uid}>
                  {sup.nombre}
                </option>
              ))}
            </Select>

            <Input
              placeholder="Fecha de entrada"
              type="date"
              mb="3"
              {...register("entryDate", { required: true })}
            />

            <Input
              placeholder="Descripción del producto"
              mb="3"
              {...register("description")}
            />
          </ModalBody>

          <ModalFooter>
            <Button type="submit" colorScheme="teal" mr={3}>
              Guardar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
