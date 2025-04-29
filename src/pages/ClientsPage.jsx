import {SideBar} from "../components/dashboard/SideBar"
import {TopBar} from "../components/dashboard/TopBar"
import UserCard from "../components/user/UserCard"
import { Box } from "@chakra-ui/react"
const ClientsPage = () => {

    return (
        <>
        <SideBar/>
        <TopBar/>
        <Box ml="350px" p="50">
            <UserCard/>
        </Box>

        </>
    )
}

export default ClientsPage