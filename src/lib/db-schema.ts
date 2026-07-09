import { z } from "zod";

// Product schemas
export const ProductInsertSchema = z.object({
  slug: z.string().min(1).toLowerCase(),
  name: z.string().min(1),
  type: z.string().min(1),
  category: z.string().min(1),
  price: z.string().min(1),
  rating: z.number().min(0).max(5).optional(),
  description: z.string().optional(),
  short_description: z.string().optional(),
  link: z.string().url().optional(),
  main_image: z.string().optional(),
});

export const ProductUpdateSchema = ProductInsertSchema.partial();

export const ProductSchema = ProductInsertSchema.extend({
  id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Product = z.infer<typeof ProductSchema>;
export type ProductInsert = z.infer<typeof ProductInsertSchema>;
export type ProductUpdate = z.infer<typeof ProductUpdateSchema>;

// Product image schemas
export const ProductImageInsertSchema = z.object({
  product_id: z.number(),
  image_path: z.string().min(1),
  image_type: z.enum(["gallery", "before_after"]),
  display_order: z.number().optional(),
});

export const ProductImageSchema = ProductImageInsertSchema.extend({
  id: z.number(),
  created_at: z.string(),
});

export type ProductImage = z.infer<typeof ProductImageSchema>;
export type ProductImageInsert = z.infer<typeof ProductImageInsertSchema>;

// Product software schemas
export const ProductSoftwareInsertSchema = z.object({
  product_id: z.number(),
  software_name: z.string().min(1),
  software_image: z.string().optional(),
});

export const ProductSoftwareSchema = ProductSoftwareInsertSchema.extend({
  id: z.number(),
});

export type ProductSoftware = z.infer<typeof ProductSoftwareSchema>;
export type ProductSoftwareInsert = z.infer<typeof ProductSoftwareInsertSchema>;

// Blog post schemas
export const BlogPostInsertSchema = z.object({
  slug: z.string().min(1).toLowerCase(),
  title: z.string().min(1),
  excerpt: z.string().optional(),
  content: z.string().min(1),
  featured_image: z.string().optional(),
  published: z.boolean().default(false),
});

export const BlogPostUpdateSchema = BlogPostInsertSchema.partial();

export const BlogPostSchema = BlogPostInsertSchema.extend({
  id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type BlogPost = z.infer<typeof BlogPostSchema>;
export type BlogPostInsert = z.infer<typeof BlogPostInsertSchema>;
export type BlogPostUpdate = z.infer<typeof BlogPostUpdateSchema>;

// Site content schemas
export const SiteContentInsertSchema = z.object({
  section_key: z.string().min(1),
  content_data: z.string().min(1),
});

export const SiteContentUpdateSchema = z.object({
  content_data: z.string().min(1),
});

export const SiteContentSchema = SiteContentInsertSchema.extend({
  id: z.number(),
  updated_at: z.string(),
});

export type SiteContent = z.infer<typeof SiteContentSchema>;
export type SiteContentInsert = z.infer<typeof SiteContentInsertSchema>;
export type SiteContentUpdate = z.infer<typeof SiteContentUpdateSchema>;

// Admin user schemas
export const AdminUserInsertSchema = z.object({
  username: z.string().min(3).max(50),
  password_hash: z.string().min(1),
  email: z.string().email().optional(),
});

export const AdminUserSchema = AdminUserInsertSchema.extend({
  id: z.number(),
  created_at: z.string(),
});

export const AdminUserPublicSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string().optional(),
});

export type AdminUser = z.infer<typeof AdminUserSchema>;
export type AdminUserInsert = z.infer<typeof AdminUserInsertSchema>;
export type AdminUserPublic = z.infer<typeof AdminUserPublicSchema>;

// Login schema
export const LoginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export type Login = z.infer<typeof LoginSchema>;

// API response schemas
export const ApiResponseSchema = <T extends z.ZodTypeAny>(schema: T) =>
  z.object({
    success: z.boolean(),
    data: schema.optional(),
    error: z.string().optional(),
  });

export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(schema: T) =>
  z.object({
    success: z.boolean(),
    data: z.array(schema),
    total: z.number(),
    page: z.number(),
    limit: z.number(),
  });
