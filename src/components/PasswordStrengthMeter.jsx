import { Box, Progress, Text, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const PasswordStrengthMeter = ({ password }) => {
    const [strength, setStrength] = useState(0);
    const [label, setLabel] = useState("");
    const [labelColor, setLabelColor] = useState("gray.500");

    const weakColor = useColorModeValue("red.500", "red.300");
    const mediumColor = useColorModeValue("yellow.500", "yellow.300");
    const strongColor = useColorModeValue("green.500", "green.300");

    useEffect(() => {
        if (!password) {
            setStrength(0);
            setLabel("");
            return;
        }

        // Simple strength calculation (you can enhance this)
        let score = 0;
        if (password.length >= 6) score += 1;
        if (password.length >= 8) score += 1;
        if (/[A-Z]/.test(password)) score += 1;
        if (/[0-9]/.test(password)) score += 1;
        if (/[^A-Za-z0-9]/.test(password)) score += 1;

        const strengthValue = Math.min(100, Math.max(0, score * 25));
        setStrength(strengthValue);

        // Set labels and colors
        if (strengthValue < 40) {
            setLabel("Weak");
            setLabelColor(weakColor);
        } else if (strengthValue < 70) {
            setLabel("Medium");
            setLabelColor(mediumColor);
        } else {
            setLabel("Strong");
            setLabelColor(strongColor);
        }
    }, [password, weakColor, mediumColor, strongColor]);

    return (
        <Box mt={2}>
            <Progress 
                value={strength} 
                size="xs" 
                colorScheme={
                    strength < 40 ? "red" : 
                    strength < 70 ? "yellow" : "green"
                } 
                borderRadius="full"
                mb={1}
            />
            {password && (
                <Text fontSize="sm" color={labelColor}>
                    Password strength: {label}
                </Text>
            )}
        </Box>
    );
    
    <Box mt={2} fontSize="sm" color="gray.500">
    <Text>Password must contain:</Text>
    <ul style={{ paddingLeft: "20px" }}>
        <li style={{ color: password.length >= 6 ? "green" : "inherit" }}>
            At least 6 characters
        </li>
        <li style={{ color: /[A-Z]/.test(password) ? "green" : "inherit" }}>
            One uppercase letter
        </li>
        <li style={{ color: /[0-9]/.test(password) ? "green" : "inherit" }}>
            One number
        </li>
    </ul>
</Box>

};