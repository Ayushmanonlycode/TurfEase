import React, { useState, useEffect } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/Authcontext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config/config";
import { 
  Button, 
  Text, 
  Box, 
  Image, 
  Flex, 
  Spinner, 
  useToast, 
  Badge, 
  Divider,
  VStack,
  HStack,
  Icon
} from "@chakra-ui/react";
import { FiMapPin, FiClock, FiCalendar, FiX } from "react-icons/fi";

export const Bookings = () => {
  const { user } = useUserAuth();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (!user) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    const fetchBooking = async () => {
      try {
        const bookingRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(bookingRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          console.log("Full user data:", userData);
          
          // Try multiple possible paths to booking data
          const bookingData = userData.data?.booking || userData.booking;
          
          if (bookingData) {
            console.log("Booking data found:", bookingData);
            setBooking(bookingData);
          } else {
            console.log("No booking data in user document");
            setError("No Bookings Found");
          }
        } else {
          console.log("User document doesn't exist");
          setError("No Bookings Found");
        }
      } catch (err) {
        console.error("Error fetching booking:", err);
        setError("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [user]);

  const handleCancel = async () => {
    if (!user) return;
    try {
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);
      
      if (docSnap.exists()) {
        const userData = docSnap.data();
        
        // Handle both possible data structures
        if (userData.data?.booking) {
          await updateDoc(userRef, {
            "data.booking": null,
          });
        } else if (userData.booking) {
          await updateDoc(userRef, {
            "booking": null,
          });
        }
      }
      
      toast({
        title: "Booking Cancelled",
        description: "Your booking has been successfully cancelled.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
        variant: "solid",
        containerStyle: {
          background: "#111",
          color: "#fff"
        }
      });
      
      setBooking(null);
      navigate("/turf");
    } catch (error) {
      toast({
        title: "Error Cancelling",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top"
      });
    }
  };

  // Helper function to check if a value exists and is not empty
  const hasValue = (value) => {
    return value !== undefined && value !== null && value !== '';
  };

  return (
    <Box bg="#0A0A0A" minH="100vh" color="white" py={4} px={4}>
      {/* Header with gradient background */}
      <Box 
        bg="linear-gradient(to right, #1A0505, #0A0A0A)" 
        py={4} 
        px={6} 
        borderRadius="lg" 
        mb={6}
        boxShadow="0 4px 12px rgba(255, 0, 0, 0.15)"
      >
        <Flex align="center" justify="space-between">
          <Link to="/turf">
            <Flex 
              align="center" 
              bg="rgba(255, 0, 0, 0.1)" 
              p={2} 
              borderRadius="full"
              _hover={{ bg: "rgba(255, 0, 0, 0.2)", transform: "translateX(-2px)" }}
              transition="all 0.3s ease"
            >
              <IoMdArrowRoundBack fontSize="24px" color="#FF0000" />
            </Flex>
          </Link>
          <Text 
            fontSize="24px" 
            fontWeight="bold" 
            color="#FF0000"
            textShadow="0 0 15px rgba(255, 0, 0, 0.3)"
          >
            Your Booking
          </Text>
          <Box w="24px"></Box> {/* Empty box for centered title */}
        </Flex>
      </Box>

      {loading ? (
        <Flex direction="column" justify="center" align="center" mt={10} h="50vh">
          <Spinner size="xl" color="red.500" thickness="4px" speed="0.65s" />
          <Text mt={4} color="gray.400">Loading your booking...</Text>
        </Flex>
      ) : error ? (
        <Flex 
          direction="column" 
          justify="center" 
          align="center" 
          mt={10} 
          p={8}
          h="50vh"
          bg="rgba(0, 0, 0, 0.4)"
          borderRadius="xl"
          border="1px solid rgba(255, 0, 0, 0.2)"
        >
          <Icon as={FiX} fontSize="48px" color="red.400" mb={4} />
          <Text textAlign="center" fontSize="xl" fontWeight="bold" color="red.400">
            {error}
          </Text>
          <Button 
            colorScheme="red" 
            variant="outline" 
            mt={6}
            onClick={() => navigate("/turf")}
          >
            Browse Turfs
          </Button>
        </Flex>
      ) : booking ? (
        <Box 
          textAlign="center" 
          mt={4} 
          p={6} 
          bg="linear-gradient(to bottom, #1A0505, #121212)" 
          borderRadius="xl" 
          maxW="480px" 
          mx="auto"
          boxShadow="0 10px 30px rgba(0, 0, 0, 0.5)"
          border="1px solid rgba(255, 0, 0, 0.1)"
        >
          <Badge 
            colorScheme="red" 
            variant="solid" 
            px={3} 
            py={1} 
            borderRadius="full" 
            mb={2}
          >
            Confirmed
          </Badge>
          
          <Text 
            fontSize="2xl" 
            fontWeight="bold" 
            color="#FF0000"
            mb={2}
          >
            {hasValue(booking.name) ? booking.name : "No Name Available"}
          </Text>
          
          <Box 
            borderRadius="lg" 
            overflow="hidden" 
            mt={4} 
            boxShadow="0 4px 20px rgba(255, 0, 0, 0.2)"
            position="relative"
          >
            <Image 
              src={hasValue(booking.image) ? booking.image : "https://via.placeholder.com/400x200?text=Turf+Image"} 
              alt="Turf" 
              w="full"
              h="200px"
              objectFit="cover"
              fallback={
                <Flex h="200px" bg="gray.800" justify="center" align="center">
                  <Text color="gray.500">Image Not Available</Text>
                </Flex>
              }
            />
          </Box>
          
          <Divider my={4} borderColor="rgba(255, 0, 0, 0.2)" />
          
          <VStack spacing={4} align="start" mt={4}>
            <HStack spacing={3}>
              <Icon as={FiMapPin} color="red.400" fontSize="18px" />
              <Text fontSize="md" textAlign="left">
                {hasValue(booking.address) ? booking.address : "Address Not Found"}
              </Text>
            </HStack>
            
            <HStack spacing={3}>
              <Icon as={FiClock} color="red.400" fontSize="18px" />
              <Text fontSize="md" textAlign="left">
                {hasValue(booking.time) ? booking.time : "Time Not Available"}
              </Text>
            </HStack>
            
            <HStack spacing={3}>
              <Icon as={FiCalendar} color="red.400" fontSize="18px" />
              <Text fontSize="md" textAlign="left">
                {hasValue(booking.Date) ? booking.Date : 
                 hasValue(booking.date) ? booking.date : "Date Not Available"}
              </Text>
            </HStack>
          </VStack>
          
          <Button 
            w="full"
            colorScheme="red" 
            mt={8} 
            size="lg" 
            onClick={handleCancel}
            borderRadius="lg"
            _hover={{ 
              transform: "translateY(-2px)", 
              boxShadow: "0 10px 15px -3px rgba(255, 0, 0, 0.3)"
            }}
            transition="all 0.3s ease"
          >
            Cancel Booking
          </Button>
        </Box>
      ) : (
        <Flex 
          direction="column" 
          justify="center" 
          align="center" 
          mt={10} 
          p={8}
          h="50vh"
          bg="rgba(0, 0, 0, 0.4)"
          borderRadius="xl"
          border="1px solid rgba(255, 0, 0, 0.2)"
        >
          <Text textAlign="center" fontSize="xl" fontWeight="bold" color="red.400">
            No active bookings found
          </Text>
          <Button 
            colorScheme="red" 
            mt={6}
            onClick={() => navigate("/turf")}
          >
            Book a Turf
          </Button>
        </Flex>
      )}
    </Box>
  );
};