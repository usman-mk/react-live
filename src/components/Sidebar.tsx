import {
    Box,
    CloseButton,
    Flex,
    useColorModeValue,
    Text,
    BoxProps,
} from "@chakra-ui/react";
import { FiHome, FiSettings } from "react-icons/fi";
import { MdOutlineMeetingRoom } from "react-icons/md";
import { IconType } from "react-icons";

import NavItem from "./NavItem";
import { useLocation } from "react-router-dom";

interface LinkItemProps {
    name: string;
    icon: IconType;
    url: string;
}
const LinkItems: Array<LinkItemProps> = [
    { name: "Home", icon: FiHome as IconType, url: "/dashboard" },
    {
        name: "Room",
        icon: MdOutlineMeetingRoom as IconType,
        url: "/dashboard/room",
    },
    {
        name: "Product",
        icon: FiSettings as IconType,
        url: "/dashboard/product",
    },
];

interface SidebarProps extends BoxProps {
    onClose: () => void;
}

const Sidebar = ({ onClose, ...rest }: SidebarProps) => {
    const location = useLocation();

    return (
        <Box
            transition="3s ease"
            bg={useColorModeValue("white", "gray.900")}
            borderRight="1px"
            borderRightColor={useColorModeValue("gray.200", "gray.700")}
            w={{ base: "full", md: 60 }}
            pos="fixed"
            h="full"
            {...rest}
        >
            <Flex
                h="20"
                alignItems="center"
                mx="8"
                justifyContent="space-between"
            >
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    Logo
                </Text>
                <CloseButton
                    display={{ base: "flex", md: "none" }}
                    onClick={onClose}
                />
            </Flex>
            {LinkItems.map((link) => (
                <NavItem
                    key={link.name}
                    icon={link.icon}
                    url={link.url}
                    active={location.pathname === link.url ? "link-active" : ""}
                >
                    {link.name}
                </NavItem>
            ))}
        </Box>
    );
};

export default Sidebar;
