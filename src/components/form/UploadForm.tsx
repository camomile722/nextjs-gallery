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
    Select,
    Text,
    Textarea,
} from "@chakra-ui/react";

import { useTranslation } from "react-i18next";
import { UploadFormProps } from "src/types";
import { UploadFileInput } from "./UploadFileInput";

export const UploadForm = ({
    images,
    setImages,
    onClose,
    isOpen,
}: UploadFormProps) => {
    const { t } = useTranslation();
    const [image, setImage] = useState({
        name: "",
        url: "",
    });

    const selectOptions = [
        { value: "people", label: t("common:categories.people") },
        { value: "fruits", label: t("common:categories.fruits") },
        { value: "mugs", label: t("common:categories.mug") },
        { value: "other", label: t("common:categories.other") },
    ];
    const validationSchema = Yup.object().shape({
        image: Yup.object().shape({
            name: Yup.string().required(t("common:validation.image")),
        }),
        tags: Yup.string().required(t("common:validation.tags")),
        category: Yup.string().required(t("common:validation.category")),
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
            setImage({ name: "", url: "" });
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
                <DrawerHeader px="0">{t("common:add_image")}</DrawerHeader>
                <form encType="file" onSubmit={formik.handleSubmit}>
                    <Flex gap={6} alignItems="center" flexDir="column">
                        <UploadFileInput
                            formik={formik}
                            setImage={setImage}
                            image={image}
                            setImages={setImages}
                        />

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
                                placeholder={t("common:tags")}
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
                                <option value="">{t("common:category")}</option>
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
                            {t("common:add")}
                        </Button>
                    </Flex>
                </form>
            </DrawerContent>
        </Drawer>
    );
};
