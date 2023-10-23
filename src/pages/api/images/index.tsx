import type { NextApiRequest, NextApiResponse } from "next";
import { imageData } from "src/data/imageData";
import { ImageDataProps } from "src/types";

type ResponseData = {
    images: ImageDataProps[];
};

export default function handler(
    req: NextApiRequest,

    res: NextApiResponse<ResponseData>
) {
    res.status(200).json({ images: imageData });
}
