import { type ClassValue, clsx } from "clsx"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { twMerge } from "tailwind-merge"
import { storage } from "./firebase"
import { v4 as uuidv4 } from "uuid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function uploadImage(image: File, bucket: string) {

  try {
    const photoRef = ref(storage, `${bucket}/${image.name + uuidv4()}`)

    await uploadBytes(photoRef, image)

    const downloadRef = await getDownloadURL(photoRef)

    return downloadRef
} catch (error) {
    console.error("Error uploading profile picture:", error);
    return;
}
}