import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Text,
  Alert,
  AlertIcon,
  Box,
  Input,
  SimpleGrid,
  useToast,
  Heading,
  Flex,
  Divider,
  Badge
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/Authcontext";
import { doc, setDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase-config/config"; // Make sure this imports Firestore
import { FaCalendarAlt, FaClock, FaCheck } from "react-icons/fa";

const availableTimes = [
  "5:00 AM",
  "7:00 AM",
  "9:00 AM",
  "4:00 PM",
  "6:00 PM",
  "8:00 PM",
  "10:00 PM"
];

export const TimeSelectModal = ({ turf, element, setTurfName, turfName }) => {
  const { user } = useUserAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isBooking, setIsBooking] = useState(false);
  const [bookedSlots, setBookedSlots] = useState([]);

  // Load existing bookings from Firestore
  useEffect(() => {
    if (!user) return;
    
    const bookingsRef = collection(db, "users");
    const unsubscribe = onSnapshot(bookingsRef, (snapshot) => {
      const bookings = [];
      snapshot.forEach((doc) => {
        bookings.push(doc.data());
      });
      setBookedSlots(bookings);
    });

    return () => unsubscribe();
  }, [user]);

  const isSlotBooked = (time) => {
    return bookedSlots.some(
      slot => slot.time === time && 
             slot.bookingDate === selectedDate && 
             slot.booking.name === turfName
    );
  };

  const handleBook = async () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Selection incomplete",
        description: "Please select both date and time",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (isSlotBooked(selectedTime)) {
      toast({
        title: "Slot already booked",
        description: "This time slot is no longer available",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsBooking(true);

    try {
      const bookingData = {
        booking: element,
        time: selectedTime,
        uid: user.uid,
        email: user.email,
        bookingDate: selectedDate
      };

      // Use Firestore's setDoc instead of Realtime Database's set
      await setDoc(doc(db, "users", user.uid), {
        data: bookingData
      });

      toast({
        title: "Successfully Booked!",
        description: `Your ${selectedTime} slot on ${selectedDate} is confirmed`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top"
      });

      setTimeout(() => {
        navigate("/payment");
      }, 2000);

    } catch (error) {
      console.error("Booking error:", error);
      toast({
        title: "Booking failed",
        description: "Please try again later",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top"
      });
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <>
      <Button
        colorScheme="red"
        size="lg"
        onClick={onOpen}
        _hover={{ transform: "scale(1.05)" }}
        transition="all 0.2s"
      >
        Book Now
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(5px)" />
        <ModalContent borderRadius="xl" overflow="hidden">
          <ModalHeader bg="red.600" color="white">
            <Flex align="center">
              <FaCalendarAlt style={{ marginRight: "10px" }} />
              Book {turfName}
            </Flex>
          </ModalHeader>
          <ModalCloseButton color="white" />
          
          <ModalBody py={6}>
            <Box mb={6}>
              <Flex align="center" mb={2}>
                <FaCalendarAlt color="#E53E3E" style={{ marginRight: "10px" }} />
                <Text fontWeight="bold" fontSize="lg">Select Date</Text>
              </Flex>
              <Input 
                type="date" 
                size="lg"
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setSelectedDate(e.target.value)}
                focusBorderColor="red.500"
              />
            </Box>

            <Box mb={6}>
              <Flex align="center" mb={4}>
                <FaClock color="#E53E3E" style={{ marginRight: "10px" }} />
                <Text fontWeight="bold" fontSize="lg">Select Time Slot</Text>
              </Flex>

              <SimpleGrid columns={[2, 3]} spacing={3}>
                {availableTimes.map((time) => (
                  <Button
                    key={time}
                    colorScheme={
                      isSlotBooked(time) ? "gray" : 
                      selectedTime === time ? "red" : "gray"
                    }
                    variant={
                      isSlotBooked(time) ? "outline" :
                      selectedTime === time ? "solid" : "outline"
                    }
                    onClick={() => !isSlotBooked(time) && setSelectedTime(time)}
                    size="lg"
                    isDisabled={isSlotBooked(time)}
                  >
                    {time}
                    {isSlotBooked(time) && (
                      <Badge ml={2} colorScheme="red">
                        Booked
                      </Badge>
                    )}
                  </Button>
                ))}
              </SimpleGrid>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button 
              colorScheme="red" 
              size="lg" 
              onClick={handleBook}
              isLoading={isBooking}
              leftIcon={<FaCheck />}
              isDisabled={!selectedDate || !selectedTime || isSlotBooked(selectedTime)}
            >
              BOOK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};