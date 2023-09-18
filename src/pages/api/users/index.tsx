import type { NextApiRequest, NextApiResponse } from "next";
import { ImageDataProps } from "src/components/Gallery";
import { imageData } from "src/data/imageData";

type ResponseData = {
    images: ImageDataProps[];
};

export default function handler(
    req: NextApiRequest,

    res: NextApiResponse<ResponseData>
) {
    res.status(200).json({ images: imageData });
}
