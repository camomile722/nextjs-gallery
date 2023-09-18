import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
    Box,
    Button,
    Drawer,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    FormControl,
    FormHelperText,
    Input,
    Select,
    Text,
    Textarea,
} from "@chakra-ui/react";
import { ImageDataProps } from "./Gallery";
import { Upload } from "src/theme/icons";
import { CustomTooltip } from "./CustomTooltip";

export interface UploadFormProps {
    images: ImageDataProps[];
    setImages: React.Dispatch<React.SetStateAction<ImageDataProps[]>>;
    onOpen: () => void;
    onClose: () => void;
    isOpen: boolean;
}

export const UploadForm = ({
    images,
    setImages,
    onClose,
    onOpen,
    isOpen,
}: UploadFormProps) => {
    // const [keyInput, setKeyInput] = useState("");

    const [image, setImage] = useState({
        name: "",
        url: "",
    });

    const selectOptions = [
        { value: "people", label: "People" },
        { value: "fruits", label: "Fruits" },
        { value: "mugs", label: "Mugs" },
        { value: "other", label: "Other" },
    ];
    const validationSchema = Yup.object().shape({
        image: Yup.object().shape({
            name: Yup.string().required("Image is required"),
        }),
        tags: Yup.string().required("Tags are required"),
        category: Yup.string().required("Category is required"),
    });
    const formik = useFormik({
        initialValues: {
            id: Date.now().toString(36) + Math.random().toString(36),
            image: {
                name: "",
                url: "",
            },
            tags: "",
            category: "",
            likes: 0,
        },
        validationSchema,
        onSubmit: (values) => {
            console.log("Form submitted with values:", values);
            setImages([values, ...images]);
            onClose();
            formik.setErrors({});
            formik.resetForm();
        },
    });

    useEffect(() => {
        formik.setFieldValue("image", image);
    }, [setImages, image]);

    return (
        <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={() => {
                onClose();
                formik.setErrors({});
                formik.resetForm();
            }}
        >
            <DrawerOverlay />
            <DrawerContent p={6}>
                <DrawerCloseButton />
                <DrawerHeader px="0">Bild hinzufügen</DrawerHeader>
                <form encType="file" onSubmit={formik.handleSubmit}>
                    <Flex gap={6} alignItems="center" flexDir="column">
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
                                    onChange={(e) => {
                                        const selectedFile =
                                            e.target?.files?.[0];
                                        if (selectedFile) {
                                            const newImage = {
                                                name: selectedFile.name,
                                                url: URL.createObjectURL(
                                                    selectedFile
                                                ),
                                            };
                                            setImage(newImage);
                                            formik.setFieldValue(
                                                "id",
                                                Date.now().toString(36) +
                                                    Math.random().toString(36)
                                            );
                                            formik.setFieldValue(
                                                "image",
                                                newImage
                                            );
                                            formik.setFieldValue(
                                                "tags",
                                                formik.values.tags
                                            );
                                        }
                                    }}
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
                            {formik.touched.image &&
                                formik.errors.image?.name && (
                                    <FormHelperText color="red">
                                        {formik.errors.image.name}
                                    </FormHelperText>
                                )}
                        </FormControl>

                        {formik.values?.image.name !== "" ? (
                            <>
                                <Box width="100%">
                                    <Text textAlign="center" fontWeight={600}>
                                        Selected Files: <br />{" "}
                                    </Text>

                                    <Box
                                        height="60px"
                                        maxW="50px"
                                        overflowY="hidden"
                                        my={4}
                                        boxShadow="lg"
                                    >
                                        <img
                                            src={formik.values.image?.url}
                                            alt={formik.values.image?.name}
                                        />
                                    </Box>
                                </Box>
                            </>
                        ) : null}
                        <FormControl>
                            <Textarea
                                size="md"
                                name="tags"
                                placeholder="Tags eingeben"
                                onChange={formik.handleChange}
                                _focus={{
                                    borderColor: "gray.300",
                                    boxShadow: "sm",
                                    borderWidth: "2px",
                                }}
                            />

                            {formik.touched.tags && formik.errors.tags && (
                                <FormHelperText color="red">
                                    {formik.errors.tags}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl>
                            <Select
                                {...formik.getFieldProps("category")}
                                _focus={{
                                    borderColor: "gray.300",
                                    boxShadow: "sm",
                                    borderWidth: "2px",
                                }}
                            >
                                <option value="">Category</option>
                                {selectOptions?.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </Select>

                            {formik.touched.category &&
                                formik.errors.category && (
                                    <FormHelperText color="red">
                                        {formik.errors.category}
                                    </FormHelperText>
                                )}
                        </FormControl>
                        <Button
                            bg="#6C757D"
                            type="submit"
                            color="white"
                            display="block"
                            width="100%"
                        >
                            Hinzufügen
                        </Button>
                    </Flex>
                </form>
            </DrawerContent>
        </Drawer>
    );
};
