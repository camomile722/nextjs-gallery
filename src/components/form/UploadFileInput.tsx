import {
    Button,
    Flex,
    FormControl,
    FormHelperText,
    Input,
    Text,
} from "@chakra-ui/react";
import { FormikProps } from "formik";
import React, { useEffect } from "react";

import { Upload } from "src/theme/icons";
import { FormValues, ImageDataProps } from "src/types";
import { CustomTooltip } from "../tooltip/CustomTooltip";

export interface UploadFileInputProps {
    formik: FormikProps<FormValues>;
    setImage: (image: any) => void;
    image: { name: string; url: string };
    setImages: (images: ImageDataProps[]) => void;
}

export const UploadFileInput = ({
    formik,
    setImage,
    image,
    setImages,
}: UploadFileInputProps) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target?.files?.[0];
        if (selectedFile) {
            const newImage = {
                name: selectedFile.name,
                url: URL.createObjectURL(selectedFile),
            };
            setImage(newImage);
            formik.setFieldValue(
                "id",
                Date.now().toString(36) + Math.random().toString(36)
            );
            formik.setFieldValue("image", newImage);
            formik.setFieldValue("tags", formik.values.tags);
        }
    };
    useEffect(() => {
        formik.setFieldValue("image", image);
    }, [setImages, image]);
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
                    onChange={handleFileChange}
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
