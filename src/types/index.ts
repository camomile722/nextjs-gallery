export interface ImageDataProps {
    id: string;
    image: {
        name: string;
        url: string;
    };
    tags: string;
    category: string;
    likes: number;
}
export interface GalleryProps {
    images: ImageDataProps[];
    setImages: React.Dispatch<React.SetStateAction<ImageDataProps[]>>;
    onOpen: () => void;
    onClose: () => void;
    isOpen: boolean;
    isLoading: boolean;
}

export interface ImageItemProps {
    item: ImageDataProps;
    onModalOpen: () => void;
    setSelectedImage: React.Dispatch<React.SetStateAction<any>>;
    deleteItem: () => void;
}
export interface ImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedImage?: ImageDataProps;
    setSelectedImage: (image: ImageDataProps) => void;
    isFiltered: boolean;
    images: ImageDataProps[];
    filteredImages: ImageDataProps[];
}
export interface CustomTooltipProps {
    children: React.ReactNode;
    label: string;
}
export interface UploadFormProps {
    images: ImageDataProps[];
    setImages: React.Dispatch<React.SetStateAction<ImageDataProps[]>>;
    onClose: () => void;
    isOpen: boolean;
}

export interface CategoriesProps {
    filterCategory: (category: string) => () => void;
    resetFilter: () => void;
    activeCategory: string;
}

export interface ControlItemButtonsProps {
    deleteItem: () => void;
    item: ImageDataProps;
}
export interface CustomInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

export interface LayoutProps {
    children: React.ReactNode;
    metaTitle: string;
    metaDescription: string;
}

export interface FormValues {
    id: string;
    image: {
        name: string;
        url: string;
    };
    tags: string;
    category: string;
    likes: number;
}
