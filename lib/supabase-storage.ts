import { supabase, createFileRecord, type FileUpload } from "./supabase"

export class SupabaseStorage {
  // Create storage buckets (run once during setup)
  static async createBuckets() {
    const buckets = [
      { name: "product-files", public: false },
      { name: "product-images", public: true },
      { name: "creator-avatars", public: true },
      { name: "product-previews", public: true },
    ]

    for (const bucket of buckets) {
      const { error } = await supabase.storage.createBucket(bucket.name, {
        public: bucket.public,
        fileSizeLimit: bucket.name === "product-files" ? 104857600 : 10485760, // 100MB for files, 10MB for images
        allowedMimeTypes:
          bucket.name === "product-files"
            ? [
                "application/pdf",
                "application/zip",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              ]
            : ["image/jpeg", "image/png", "image/webp"],
      })

      if (error && !error.message.includes("already exists")) {
        console.error(`Error creating bucket ${bucket.name}:`, error)
      }
    }
  }

  // Upload product main file (PDF, ZIP, DOCX)
  static async uploadProductFile(
    file: File,
    creatorId: string,
    productId: string,
  ): Promise<{ url: string; fileRecord: FileUpload }> {
    const fileExt = file.name.split(".").pop()
    const fileName = `${productId}-main.${fileExt}`
    const filePath = `${creatorId}/${fileName}`

    const { data, error } = await supabase.storage.from("product-files").upload(filePath, file, {
      upsert: true,
    })

    if (error) throw error

    // Create file record in database
    const fileRecord = await createFileRecord({
      file_name: fileName,
      file_path: data.path,
      file_size: file.size,
      file_type: file.type,
      bucket_name: "product-files",
      uploaded_by: creatorId,
      uploader_type: "creator",
      related_entity_type: "product",
      related_entity_id: productId,
      is_public: false,
    })

    return {
      url: data.path,
      fileRecord,
    }
  }

  // Upload product cover image
  static async uploadProductImage(
    file: File,
    creatorId: string,
    productId: string,
    type: "cover" | "preview" = "cover",
  ): Promise<{ url: string; fileRecord: FileUpload }> {
    const fileExt = file.name.split(".").pop()
    const fileName = `${productId}-${type}.${fileExt}`
    const filePath = `${creatorId}/${fileName}`
    const bucket = type === "cover" ? "product-images" : "product-previews"

    const { data, error } = await supabase.storage.from(bucket).upload(filePath, file, {
      upsert: true,
    })

    if (error) throw error

    // Create file record in database
    const fileRecord = await createFileRecord({
      file_name: fileName,
      file_path: data.path,
      file_size: file.size,
      file_type: file.type,
      bucket_name: bucket,
      uploaded_by: creatorId,
      uploader_type: "creator",
      related_entity_type: "product",
      related_entity_id: productId,
      is_public: true,
    })

    // Get public URL
    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(data.path)

    return {
      url: urlData.publicUrl,
      fileRecord,
    }
  }

  // Upload creator avatar
  static async uploadCreatorAvatar(file: File, creatorId: string): Promise<{ url: string; fileRecord: FileUpload }> {
    const fileExt = file.name.split(".").pop()
    const fileName = `${creatorId}-avatar.${fileExt}`
    const filePath = fileName

    const { data, error } = await supabase.storage.from("creator-avatars").upload(filePath, file, {
      upsert: true,
    })

    if (error) throw error

    // Create file record in database
    const fileRecord = await createFileRecord({
      file_name: fileName,
      file_path: data.path,
      file_size: file.size,
      file_type: file.type,
      bucket_name: "creator-avatars",
      uploaded_by: creatorId,
      uploader_type: "creator",
      related_entity_type: "creator",
      related_entity_id: creatorId,
      is_public: true,
    })

    // Get public URL
    const { data: urlData } = supabase.storage.from("creator-avatars").getPublicUrl(data.path)

    return {
      url: urlData.publicUrl,
      fileRecord,
    }
  }

  // Get secure download URL for product files
  static async getSecureDownloadUrl(filePath: string, expiresIn = 3600): Promise<string> {
    const { data, error } = await supabase.storage.from("product-files").createSignedUrl(filePath, expiresIn)

    if (error) throw error
    return data.signedUrl
  }

  // Delete file from storage and database
  static async deleteFile(bucket: string, filePath: string): Promise<void> {
    // Delete from storage
    const { error: storageError } = await supabase.storage.from(bucket).remove([filePath])
    if (storageError) throw storageError

    // Delete from database
    const { error: dbError } = await supabase.from("file_uploads").delete().eq("file_path", filePath)
    if (dbError) throw dbError
  }

  // Get file info from database
  static async getFileInfo(filePath: string): Promise<FileUpload | null> {
    const { data, error } = await supabase.from("file_uploads").select("*").eq("file_path", filePath).single()

    if (error) return null
    return data as FileUpload
  }

  // List files for a creator
  static async getCreatorFiles(creatorId: string): Promise<FileUpload[]> {
    const { data, error } = await supabase
      .from("file_uploads")
      .select("*")
      .eq("uploaded_by", creatorId)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data as FileUpload[]
  }

  // Get product files
  static async getProductFiles(productId: string): Promise<FileUpload[]> {
    const { data, error } = await supabase
      .from("file_uploads")
      .select("*")
      .eq("related_entity_type", "product")
      .eq("related_entity_id", productId)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data as FileUpload[]
  }
}

export const supabaseStorage = SupabaseStorage
