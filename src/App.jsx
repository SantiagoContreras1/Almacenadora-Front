
import { Button, useToast } from '@chakra-ui/react'
import './App.css'

function App() {
  const toast = useToast()

  const handleClick = () => {
    toast({
      title: 'Cuenta creada.',
      description: 'Tu cuenta ha sido creada exitosamente.',
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
  }

  return (
    <>
      <div className="card">
        <Button colorScheme="teal" onClick={handleClick}>
          Cuenta creada
        </Button>
      </div>
    </>
  )
}

export default App
