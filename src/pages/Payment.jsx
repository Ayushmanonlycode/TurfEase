import React, { useEffect, useState } from 'react'
import { IoMdArrowRoundBack } from "react-icons/io"
import { Link } from 'react-router-dom'
import { useUserAuth } from '../context/Authcontext'
import { ref, onValue } from "firebase/database"
import { database } from '../firebase-config/config'
import { 
  Checkbox, 
  Button, 
  Text, 
  Flex,
  Box,
  Heading,
  VStack,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Divider,
  Badge
} from '@chakra-ui/react'
import { FaQrcode, FaMoneyBillWave, FaCheckCircle } from "react-icons/fa"
import { motion } from "framer-motion"
import { PopoverProfile } from '../components/Popover' // Add this import

const MotionBox = motion(Box)
const MotionButton = motion(Button)

export const Payment = () => {
  const { user } = useUserAuth()
  const [name, setName] = useState("")
  const [time, setTime] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const getUserData = (uid) => {
    const userRef = ref(database, "users/" + uid)
    onValue(userRef, (snapshot) => {
      const data = snapshot.val()
      if (data === null) {
        return "No DATA Found"
      } else {
        const bookingName = data.data
        setName(bookingName.booking.name)
        setTime(bookingName.time)
      }
    })
  }

  useEffect(() => {
    if (user) {
      getUserData(user.uid)
    }
  }, [user])

  const handlePaymentSubmit = () => {
    if (!paymentMethod) {
      toast({
        title: "Payment Required",
        description: "Please select a payment method",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
        variant: "solid",
      })
      return
    }
    onOpen()
  }

  return (
    <Box minH="100vh" bg="gray.900">
      {/* Navigation */}
      <Flex 
        as="nav" 
        p={4} 
        bg="black" 
        boxShadow="0 4px 6px -1px rgba(255, 0, 0, 0.1), 0 2px 4px -1px rgba(255, 0, 0, 0.06)"
        alignItems="center" 
        justifyContent="space-between"
        borderBottom="1px solid"
        borderColor="red.800"
      >
        <Link to="/turf">
          <MotionBox
            p={2}
            borderRadius="md"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <IoMdArrowRoundBack size="24px" color="#E53E3E" />
          </MotionBox>
        </Link>
        <Heading 
          as="h2" 
          size="md" 
          color="red.500"
          textTransform="uppercase"
          letterSpacing="1px"
        >
          {name || "Booking Details"}
        </Heading>
        <PopoverProfile email={user?.email} />
      </Flex>

      {/* Payment Content */}
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        maxW="md" 
        mx="auto" 
        mt={8} 
        p={8} 
        bg="gray.800" 
        borderRadius="xl" 
        boxShadow="dark-lg"
        border="1px solid"
        borderColor="red.700"
      >
        <VStack spacing={6} align="stretch">
          <Heading 
            as="h3" 
            size="lg" 
            textAlign="center" 
            color="red.400"
            textTransform="uppercase"
            letterSpacing="1px"
          >
            Select Payment Method
          </Heading>

          <Divider borderColor="red.700" />

          <MotionBox
            borderWidth="1px" 
            borderRadius="lg" 
            p={4}
            borderColor={paymentMethod === "qr" ? "red.500" : "gray.700"}
            bg={paymentMethod === "qr" ? "blackAlpha.500" : "gray.700"}
            whileHover={{ scale: 1.02 }}
            cursor="pointer"
            onClick={() => setPaymentMethod("qr")}
          >
            <Checkbox 
              size="lg" 
              colorScheme="red" 
              isChecked={paymentMethod === "qr"}
              onChange={() => setPaymentMethod("qr")}
            >
              <Flex align="center" ml={2}>
                <FaQrcode size="20px" color="#E53E3E" />
                <Text ml={3} fontSize="lg" color="white" fontWeight="semibold">
                  Pay with QR
                </Text>
              </Flex>
            </Checkbox>
          </MotionBox>

          <MotionBox
            borderWidth="1px" 
            borderRadius="lg" 
            p={4}
            borderColor={paymentMethod === "cash" ? "red.500" : "gray.700"}
            bg={paymentMethod === "cash" ? "blackAlpha.500" : "gray.700"}
            whileHover={{ scale: 1.02 }}
            cursor="pointer"
            onClick={() => setPaymentMethod("cash")}
          >
            <Checkbox 
              size="lg" 
              colorScheme="red" 
              isChecked={paymentMethod === "cash"}
              onChange={() => setPaymentMethod("cash")}
            >
              <Flex align="center" ml={2}>
                <FaMoneyBillWave size="20px" color="#E53E3E" />
                <Text ml={3} fontSize="lg" color="white" fontWeight="semibold">
                  Pay with Cash
                </Text>
              </Flex>
            </Checkbox>
          </MotionBox>

          <MotionButton
            colorScheme="red" 
            size="lg" 
            onClick={handlePaymentSubmit}
            isDisabled={!paymentMethod}
            mt={6}
            py={6}
            fontSize="lg"
            fontWeight="bold"
            textTransform="uppercase"
            letterSpacing="1px"
            borderRadius="lg"
            boxShadow="0 4px 6px -1px rgba(255, 0, 0, 0.3), 0 2px 4px -1px rgba(255, 0, 0, 0.2)"
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "0 7px 14px rgba(255, 0, 0, 0.3), 0 3px 6px rgba(255, 0, 0, 0.2)"
            }}
            _active={{
              transform: "translateY(0)"
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Confirm Payment
          </MotionButton>
        </VStack>
      </MotionBox>

      {/* Confirmation Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg="blackAlpha.800" backdropFilter="blur(5px)" />
        <ModalContent 
          bg="gray.800" 
          border="1px solid" 
          borderColor="red.700"
          borderRadius="xl"
        >
          <ModalHeader color="red.400" textTransform="uppercase">
            <Flex align="center">
              <FaCheckCircle color="#E53E3E" style={{ marginRight: "10px" }} />
              Booking Confirmed!
            </Flex>
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Text fontSize="lg" color="white">
                Thank you for booking <Badge colorScheme="red" fontSize="md">{name}</Badge>
              </Text>
              <Text color="gray.300">
                <strong>Time Slot:</strong> {time}
              </Text>
              <Text color="gray.300">
                <strong>Payment Method:</strong> {paymentMethod === "qr" ? "QR Code" : "Cash"}
              </Text>
              <Text mt={4} color="gray.400" fontSize="sm">
                A confirmation has been sent to your registered email.
              </Text>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Link to="/turf">
              <Button 
                colorScheme="red" 
                variant="outline"
                _hover={{ bg: "red.800" }}
              >
                Back to Home
              </Button>
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}