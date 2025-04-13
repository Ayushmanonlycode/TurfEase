import { Input, Button, Divider, Alert, Flex, Box, Text, Image } from '@chakra-ui/react';
import React, { useState } from 'react';
import loginBg from "../images/maxresdefault.jpg";
import googleimg from "../images/search.png";
import facebookimg from "../images/facebook.png"; // Make sure to add this import
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/Authcontext";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [facebookLoading, setFacebookLoading] = useState(false);
    const { login, googleSignIn, facebookSignIn } = useUserAuth(); // Fixed variable names to match context
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        try {
            await login(email, pass);
            navigate("/turf");
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const signInWithGoogle = async () => {
        setGoogleLoading(true);
        setError("");
        try {
            await googleSignIn(); // Changed to match context
            navigate("/turf");
        } catch (err) {
            setError(err.message);
        } finally {
            setGoogleLoading(false);
        }
    };

    const signInWithFacebook = async () => {
        setFacebookLoading(true); // Changed from setGoogleLoading
        setError("");
        try {
            await facebookSignIn(); // Changed to match context
            navigate("/turf");
        } catch (err) {
            setError(err.message);
        } finally {
            setFacebookLoading(false); // Changed from setGoogleLoading
        }
    };

    return (
        <Flex minH="100vh" width="100vw" overflow="hidden">
            {/* Background Image */}
            <Box
                display={{ base: "none", md: "block" }}
                width="50%"
                position="relative"
            >
                <Image
                    src={loginBg}
                    alt="Login background"
                    objectFit="cover"
                    width="100%"
                    height="100%"
                />
                <Box
                    position="absolute"
                    top={0}
                    left={0}
                    width="100%"
                    height="100%"
                    bg="rgba(0,0,0,0.4)"
                />
            </Box>

            {/* Login Form */}
            <Flex
                width={{ base: "100%", md: "50%" }}
                p={8}
                direction="column"
                justify="center"
                align="center"
                bg="white"
            >
                <Box width="100%" maxW="400px">
                    <Text fontSize="2xl" fontWeight="bold" mb={6} textAlign="center">
                        LOGIN TO YOUR ACCOUNT
                    </Text>

                    {error && (
                        <Alert status="error" mb={4} borderRadius="md">
                            {error}
                        </Alert>
                    )}

                    <form onSubmit={handleSignIn}>
                        <Box mb={4}>
                            <Text fontWeight="medium" mb={2}>
                                Email Address
                            </Text>
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                size="lg"
                                required
                                focusBorderColor="red.500"
                            />
                        </Box>

                        <Box mb={6}>
                            <Text fontWeight="medium" mb={2}>
                                Password
                            </Text>
                            <Input
                                type="password"
                                placeholder="Enter your password"
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                                size="lg"
                                required
                                focusBorderColor="red.500"
                            />
                        </Box>

                        <Button
                            colorScheme="red"
                            width="100%"
                            size="lg"
                            type="submit"
                            isLoading={isLoading}
                            mb={4}
                        >
                            Login
                        </Button>
                    </form>

                    <Flex align="center" mb={4}>
                        <Divider flex={1} />
                        <Text px={2} color="gray.500">OR</Text>
                        <Divider flex={1} />
                    </Flex>

                    <Button
                        width="100%"
                        variant="outline"
                        size="lg"
                        onClick={signInWithGoogle}
                        isLoading={googleLoading}
                        leftIcon={<Image src={googleimg} alt="Google" boxSize="20px" />}
                        mb={4}
                    >
                        Continue with Google
                    </Button>

                    <Button
                        width="100%"
                        variant="outline"
                        size="lg"
                        onClick={signInWithFacebook}
                        isLoading={facebookLoading}
                        leftIcon={<Image src={facebookimg} alt="Facebook" boxSize="20px" />}
                        mb={6}
                    >
                        Continue with Facebook
                    </Button>

                    <Text textAlign="center">
                        Don't have an account?{" "}
                        <Link to="/signup" style={{ color: "#E53E3E", fontWeight: "medium" }}>
                            Sign Up
                        </Link>
                    </Text>
                </Box>
            </Flex>
        </Flex>
    );
};