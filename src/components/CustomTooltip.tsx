import { Tooltip } from "@chakra-ui/react";

export interface CustomTooltipProps {
    children: React.ReactNode;
    label: string;
}

export const CustomTooltip = ({ children, label }: CustomTooltipProps) => {
    return (
        <Tooltip
            label={label}
            aria-label={label}
            placement="top-start"
            bg="gray.200"
            p="2"
            color="black"
            hasArrow
        >
            {children}
        </Tooltip>
    );
};
