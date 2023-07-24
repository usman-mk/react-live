import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    FormErrorMessage,
    useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { LoginFormInput } from "../../types/login-form-input.type";
import { LoginErrorResponse } from "../../types/login.type";
import { useAppDispatch } from "../../app/hooks";
import { loginThunk } from "../../features/auth/authSlide";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const toast = useToast();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // schema validation
    const schema = yup.object().shape({
        email: yup
            .string()
            .required("Please enter email")
            .email("Email not work"),
        password: yup
            .string()
            .required("Please enter password")
            .min(6, "min 6 charactor"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormInput>({
        resolver: yupResolver(schema),
        mode: "all",
    });
    // button submit
    const onSubmit = async (data: LoginFormInput) => {
        try {
            // unwrap for get response
            const result = await dispatch(loginThunk(data)).unwrap();
            if (result.access_token) {
                toast({
                    title: "Login success",
                    position: "top-right",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                navigate("/dashboard");
            }
            
        } catch (error: any) {
            let err: LoginErrorResponse = error;
            toast({
                title: "Login failed",
                description: err.message,
                position: "top-right",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };
    return (
        <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
        >
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"}>Sign in to your account</Heading>
                    <Text fontSize={"lg"} color={"gray.600"}>
                        to enjoy all of our cool{" "}
                        <Link color={"blue.400"}>features</Link> ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow={"lg"}
                    p={8}
                >
                    <Stack spacing={4}>
                        <form onSubmit={handleSubmit(onSubmit)} noValidate>
                            <FormControl id="email" isInvalid={errors.email}>
                                <FormLabel>Email address</FormLabel>
                                <Input
                                    type="email"
                                    {...register("email", { required: true })}
                                />
                                {errors.email && (
                                    <FormErrorMessage>
                                        {errors.email?.message}
                                    </FormErrorMessage>
                                )}
                            </FormControl>
                            <FormControl
                                id="password"
                                isInvalid={errors.password}
                            >
                                <FormLabel>Password</FormLabel>
                                <Input
                                    type="password"
                                    {...register("password", {
                                        required: true,
                                    })}
                                />
                                {errors.password && (
                                    <FormErrorMessage>
                                        {errors.password?.message}
                                    </FormErrorMessage>
                                )}
                            </FormControl>
                            <Stack spacing={10}>
                                <Stack
                                    direction={{ base: "column", sm: "row" }}
                                    align={"start"}
                                    justify={"space-between"}
                                >
                                    <Checkbox>Remember me</Checkbox>
                                    <Link color={"blue.400"}>
                                        Forgot password?
                                    </Link>
                                </Stack>
                                <Button
                                    isLoading={isSubmitting}
                                    type="submit"
                                    bg={"blue.400"}
                                    color={"white"}
                                    _hover={{
                                        bg: "blue.500",
                                    }}
                                >
                                    Sign in
                                </Button>
                            </Stack>
                        </form>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}
