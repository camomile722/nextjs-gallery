import {
    Button,
    Flex,
    FormControl,
    FormHelperText,
    Input,
    Text,
} from "@chakra-ui/react";

import React from "react";
import { Upload } from "src/theme/icons";
import { UploadFileInputProps } from "src/types";
import { CustomTooltip } from "../tooltip/CustomTooltip";

export const UploadFileInput = ({ formik }: UploadFileInputProps) => {
    const handleFileAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target?.files?.[0];
        if (selectedFile) {
            const newImage = {
                name: selectedFile.name,
                url: URL.createObjectURL(selectedFile),
            };
            formik.setFieldValue(
                "id",
                Date.now().toString(36) + Math.random().toString(36)
            );
            formik.setFieldValue("image", newImage);
        }
    };

    return (
        <FormControl>
            <Flex
                flexDir="column"
                alignItems="center"
                border="1px 
        dashed gray"
                p={8}
                width="100%"
            >
                <Input
                    type="file"
                    display="none" // Hide the default file input
                    onChange={handleFileAdd}
                    id="fileInput"
                    name="image"
                />

                <label htmlFor="fileInput">
                    <CustomTooltip label="Upload File">
                        <Button
                            as="span"
                            bg="none"
                            p={10}
                            fontWeight="400"
                            _hover={{
                                bg: "none",
                                cursor: "pointer",
                                opacity: "0.6",
                            }}
                        >
                            <Upload boxSize={10} />
                        </Button>
                    </CustomTooltip>
                    <Text textAlign="center">.PNG .JPG</Text>
                </label>
            </Flex>
            {formik.touched.image && formik.errors.image?.name && (
                <FormHelperText color="red">
                    {formik.errors.image.name}
                </FormHelperText>
            )}
        </FormControl>
    );
};
