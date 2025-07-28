import z from 'zod';
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
export const legendCreateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  date: z.string().min(1, 'Date is required'),
  description: z.string().min(1, 'Description is required'),
  image: z
    .custom<FileList>((val) => val instanceof FileList && val.length > 0, {
      message: 'Image is required',
    })
    .transform((val) => val[0])
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: 'Only JPG, PNG, or WEBP images are allowed',
    }),
  category_id: z.string().min(1, 'Category is required'),
  district_id: z.string().min(1, 'District is required'),
  province_id: z.string().min(1, 'Province is required'),
  canton_id: z.string().min(1, 'Canton is required'),
});

export const legendUpdateSchema = z.object({
  id: z.number().int(),
  name: z.string().min(1, 'Name is required'),
  date: z.string().min(1, 'Date is required'),
  image: z
    .custom<FileList>((val) => val instanceof FileList && val.length > 0, {
      message: 'Image is required',
    })
    .transform((val) => val[0])
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: 'Only JPG, PNG, or WEBP images are allowed',
    })
    .optional(),
  description: z.string().min(1, 'Description is required'),
  category_id: z.string().min(1, 'Category is required'),
  district_id: z.string().min(1, 'District is required'),
  province_id: z.string().min(1, 'Province is required'),
  canton_id: z.string().min(1, 'Canton is required'),
});
