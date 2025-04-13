import React, { useState, useEffect } from "react";
import { 
  Button, 
  Input, 
  Flex, 
  Box, 
  Text, 
  Image, 
  Alert, 
  Divider,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  IconButton,
  useToast,
  useColorModeValue,
  usePrefersReducedMotion
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/Authcontext";
import loginBg from "../images/07d42d6b9422573054f93fdb259810f1.jpg";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { motion, AnimatePresence } from "framer-motion";
import { FaFutbol, FaUserPlus, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { PasswordStrengthMeter } from "../components/PasswordStrengthMeter";

const getMotionVariants = (prefersReducedMotion) => ({
  fadeIn: prefersReducedMotion ? {} : {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  },
  pulse: prefersReducedMotion ? {} : {
    scale: [1, 1.05, 1],
    transition: { duration: 2, repeat: Infinity }
  },
  buttonHover: prefersReducedMotion ? {} : { scale: 1.02 },
  buttonTap: prefersReducedMotion ? {} : { scale: 0.98 }
});

export const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [formValid, setFormValid] = useState(false);
    const { signup, googleSignIn, facebookSignIn } = useUserAuth();
    const navigate = useNavigate();
    const toast = useToast();
    const prefersReducedMotion = usePrefersReducedMotion();
    const motionVariants = getMotionVariants(prefersReducedMotion);

    const bgColor = useColorModeValue("gray.50", "gray.800");
    const cardBg = useColorModeValue("white", "gray.700");
    const textColor = useColorModeValue("gray.600", "gray.300");
    const brandColor = useColorModeValue("red.500", "red.300");

    useEffect(() => {
        const isValid = email.includes("@") && password.length >= 6;
        setFormValid(isValid);
    }, [email, password]);

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        
        try {
            await signup(email, password);
            toast({
                title: "Account created!",
                description: "Welcome to TurfEase!",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top",
                icon: <FaUserPlus />
            });
            navigate("/Login");
        } catch (err) {
            handleAuthError(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
            toast({
                title: "Signed in with Google",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            navigate("/dashboard");
        } catch (error) {
            handleAuthError(error);
        }
    };

    const handleFacebookSignIn = async () => {
        try {
            await facebookSignIn();
            toast({
                title: "Signed in with Facebook",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            navigate("/dashboard");
        } catch (error) {
            handleAuthError(error);
        }
    };

    const handleAuthError = (error) => {
        const errorMap = {
            "auth/email-already-in-use": "Email already in use",
            "auth/invalid-email": "Invalid email address",
            "auth/weak-password": "Password should be at least 6 characters",
            "auth/too-many-requests": "Too many attempts. Try again later.",
            "auth/popup-closed-by-user": "Sign in cancelled",
            "auth/account-exists-with-different-credential": "Account exists with different login method"
        };
        
        setError(errorMap[error.code] || "Authentication failed");
    };

    return (
        <Flex minH="100vh" width="100vw" bg={bgColor} position="relative" overflow="hidden">
            {/* Background elements */}
            {!prefersReducedMotion && (
                <>
                    <Box
                        as={motion.div}
                        animate={motionVariants.pulse}
                        position="absolute"
                        top="-50px"
                        right="-50px"
                        width="200px"
                        height="200px"
                        borderRadius="full"
                        bg="red.100"
                        filter="blur(80px)"
                        zIndex="0"
                    />
                    <Box
                        position="absolute"
                        bottom="-100px"
                        left="-100px"
                        width="300px"
                        height="300px"
                        borderRadius="full"
                        bg="red.50"
                        filter="blur(100px)"
                        zIndex="0"
                    />
                </>
            )}

            {/* Background Image */}
            <Box display={{ base: "none", md: "block" }} width="50%" position="relative" overflow="hidden" zIndex="1">
                <Image
                    src={loginBg}
                    alt="People enjoying sports"
                    objectFit="cover"
                    width="100%"
                    height="100%"
                    loading="eager"
                    decoding="async"
                />
                <Box position="absolute" top={0} left={0} width="100%" height="100%" bg="linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5))" />
                <Box position="absolute" bottom="8" left="8" right="8" color="white">
                    <Flex align="center" mb={2}>
                        <FaFutbol size="24px" />
                        <Text ml={2} fontSize="xl" fontWeight="bold">TurfEase</Text>
                    </Flex>
                    <Text fontSize="lg">Join thousands of sports enthusiasts</Text>
                </Box>
            </Box>

            {/* Signup Form */}
            <Flex width={{ base: "100%", md: "50%" }} p={{ base: 4, md: 8 }} direction="column" justify="center" align="center" zIndex="2">
                <motion.div initial="hidden" animate="visible" variants={motionVariants.fadeIn} style={{ width: '100%' }}>
                    <Box width="100%" maxW="md" bg={cardBg} p={{ base: 6, md: 8 }} borderRadius="xl" boxShadow="2xl" position="relative" overflow="hidden">
                        {!prefersReducedMotion && (
                            <Box position="absolute" top="-50px" right="-50px" width="150px" height="150px" borderRadius="full" bg="red.500" opacity="0.1" />
                        )}

                        <Box textAlign="center" mb={8}>
                            <Text fontSize="2xl" fontWeight="bold" mb={2} color={brandColor}>Create Your Account</Text>
                            <Text color={textColor}>Join TurfEase and start booking turfs</Text>
                        </Box>

                        <AnimatePresence>
                            {error && (
                                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                                    <Alert status="error" mb={6} borderRadius="md" variant="subtle" fontSize="sm">
                                        {error}
                                    </Alert>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <form onSubmit={handleSignup}>
                            <FormControl mb={5}>
                                <FormLabel fontWeight="medium">Email Address</FormLabel>
                                <Input
                                    type="email"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    size="lg"
                                    focusBorderColor={brandColor}
                                    autoComplete="email"
                                    bg={useColorModeValue("white", "gray.600")}
                                    isRequired
                                />
                            </FormControl>

                            <FormControl mb={5}>
                                <FormLabel fontWeight="medium">Password</FormLabel>
                                <InputGroup>
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="At least 6 characters"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        size="lg"
                                        focusBorderColor={brandColor}
                                        autoComplete="new-password"
                                        bg={useColorModeValue("white", "gray.600")}
                                        isRequired
                                    />
                                    <InputRightElement h="full">
                                        <IconButton
                                            variant="ghost"
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                            icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                                            onClick={() => setShowPassword(!showPassword)}
                                        />
                                    </InputRightElement>
                                </InputGroup>
                                <PasswordStrengthMeter password={password} />
                            </FormControl>

                            <Button
                                as={motion.button}
                                whileHover={motionVariants.buttonHover}
                                whileTap={motionVariants.buttonTap}
                                colorScheme="red"
                                width="100%"
                                size="lg"
                                type="submit"
                                isLoading={isLoading}
                                loadingText="Creating account..."
                                mb={6}
                                height="50px"
                                fontSize="lg"
                                isDisabled={!formValid}
                                leftIcon={<FaUserPlus />}
                            >
                                Sign Up
                            </Button>
                        </form>

                        <Divider my={6} borderColor="gray.200" />

                        <Text textAlign="center" mb={4} color={textColor}>Or sign up with</Text>
                        <Flex justify="center" gap={4} mb={6}>
                            <Button 
                                variant="outline" 
                                leftIcon={<FcGoogle />}
                                width="full"
                                maxW="200px"
                                onClick={handleGoogleSignIn}
                                isLoading={isLoading}
                            >
                                Google
                            </Button>
                            <Button 
                                variant="outline" 
                                leftIcon={<FaFacebook color="#1877F2" />}
                                width="full"
                                maxW="200px"
                                onClick={handleFacebookSignIn}
                                isLoading={isLoading}
                            >
                                Facebook
                            </Button>
                        </Flex>

                        <Text textAlign="center" color={textColor}>
                            Already have an account?{" "}
                            <Link to="/login" style={{ color: brandColor, fontWeight: "semibold" }}>
                                Log In
                            </Link>
                        </Text>
                    </Box>
                </motion.div>
            </Flex>
        </Flex>
    );
};