/**
 * Client-side API utilities for making requests to backend
 */

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  details?: any;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

export async function apiFetch<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const url = `${API_BASE}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || "Request failed",
        details: data.details,
      };
    }

    return data;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Network error",
    };
  }
}

// Products API
export async function getProducts(
  category?: string,
  limit = 50,
  offset = 0
): Promise<ApiResponse<any[]>> {
  const params = new URLSearchParams({
    limit: String(limit),
    offset: String(offset),
  });
  if (category) params.append("category", category);

  return apiFetch(`/api/products?${params.toString()}`);
}

export async function getProduct(id: number): Promise<ApiResponse> {
  return apiFetch(`/api/products/${id}`);
}

export async function createProduct(data: any): Promise<ApiResponse> {
  return apiFetch("/api/products", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateProduct(id: number, data: any): Promise<ApiResponse> {
  return apiFetch(`/api/products/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deleteProduct(id: number): Promise<ApiResponse> {
  return apiFetch(`/api/products/${id}`, {
    method: "DELETE",
  });
}

// Blog API
export async function getBlogPosts(
  published = false,
  limit = 50,
  offset = 0
): Promise<ApiResponse<any[]>> {
  const params = new URLSearchParams({
    published: String(published),
    limit: String(limit),
    offset: String(offset),
  });

  return apiFetch(`/api/blog?${params.toString()}`);
}

export async function getBlogPost(slug: string): Promise<ApiResponse> {
  return apiFetch(`/api/blog/${slug}`);
}

export async function createBlogPost(data: any): Promise<ApiResponse> {
  return apiFetch("/api/blog", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateBlogPost(slug: string, data: any): Promise<ApiResponse> {
  return apiFetch(`/api/blog/${slug}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deleteBlogPost(slug: string): Promise<ApiResponse> {
  return apiFetch(`/api/blog/${slug}`, {
    method: "DELETE",
  });
}

// Portfolio API
export async function getPortfolioImages(): Promise<ApiResponse<any[]>> {
  return apiFetch("/api/portfolio");
}

export async function getPortfolioImage(id: number): Promise<ApiResponse> {
  return apiFetch(`/api/portfolio/${id}`);
}

export async function createPortfolioImage(data: any): Promise<ApiResponse> {
  return apiFetch("/api/portfolio", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updatePortfolioImage(id: number, data: any): Promise<ApiResponse> {
  return apiFetch(`/api/portfolio/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deletePortfolioImage(id: number): Promise<ApiResponse> {
  return apiFetch(`/api/portfolio/${id}`, {
    method: "DELETE",
  });
}

// Auth API
export async function login(username: string, password: string): Promise<ApiResponse> {
  return apiFetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export async function logout(): Promise<ApiResponse> {
  return apiFetch("/api/auth/logout", {
    method: "POST",
  });
}

export async function verifySession(): Promise<ApiResponse> {
  return apiFetch("/api/auth/verify");
}

// Backup API
export async function exportDatabase(): Promise<Blob | null> {
  try {
    const response = await fetch("/api/backup/export");
    if (!response.ok) return null;
    return await response.blob();
  } catch (error) {
    console.error("Failed to export database:", error);
    return null;
  }
}

export async function downloadImagesBackup(): Promise<Blob | null> {
  try {
    const response = await fetch("/api/backup/download-images");
    if (!response.ok) return null;
    return await response.blob();
  } catch (error) {
    console.error("Failed to download images backup:", error);
    return null;
  }
}
