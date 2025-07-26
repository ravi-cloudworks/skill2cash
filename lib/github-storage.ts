// GitHub API integration for secure file storage
export class GitHubStorage {
  private owner: string
  private repo: string
  private token: string

  constructor() {
    this.owner = process.env.GITHUB_OWNER || ""
    this.repo = process.env.GITHUB_PRIVATE_REPO || ""
    this.token = process.env.GITHUB_TOKEN || ""
  }

  async createProductRelease(userId: string, productId: string, files: File[]) {
    const tag = `${userId}-${productId}-v1.0`

    try {
      // Create GitHub release
      const releaseResponse = await fetch(`https://api.github.com/repos/${this.owner}/${this.repo}/releases`, {
        method: "POST",
        headers: {
          Authorization: `token ${this.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tag_name: tag,
          name: `${productId} Files`,
          body: `Digital product files for ${productId}`,
          draft: false,
          prerelease: false,
        }),
      })

      const release = await releaseResponse.json()

      // Upload files to release
      const uploadedFiles = []
      for (const file of files) {
        const uploadUrl = `https://uploads.github.com/repos/${this.owner}/${this.repo}/releases/${release.id}/assets?name=${file.name}`

        const uploadResponse = await fetch(uploadUrl, {
          method: "POST",
          headers: {
            Authorization: `token ${this.token}`,
            "Content-Type": "application/octet-stream",
          },
          body: file,
        })

        const uploadedFile = await uploadResponse.json()
        uploadedFiles.push({
          name: file.name,
          download_url: uploadedFile.browser_download_url,
          size: file.size,
        })
      }

      return {
        releaseId: release.id,
        tag,
        files: uploadedFiles,
      }
    } catch (error) {
      console.error("GitHub storage error:", error)
      throw new Error("Failed to store files")
    }
  }

  async deleteProductFiles(userId: string, productId: string) {
    const tag = `${userId}-${productId}-v1.0`

    try {
      // Get release by tag
      const releaseResponse = await fetch(
        `https://api.github.com/repos/${this.owner}/${this.repo}/releases/tags/${tag}`,
        {
          headers: {
            Authorization: `token ${this.token}`,
          },
        },
      )

      if (releaseResponse.ok) {
        const release = await releaseResponse.json()

        // Delete all assets
        for (const asset of release.assets) {
          await fetch(`https://api.github.com/repos/${this.owner}/${this.repo}/releases/assets/${asset.id}`, {
            method: "DELETE",
            headers: {
              Authorization: `token ${this.token}`,
            },
          })
        }

        // Delete release
        await fetch(`https://api.github.com/repos/${this.owner}/${this.repo}/releases/${release.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `token ${this.token}`,
          },
        })
      }
    } catch (error) {
      console.error("Error deleting files:", error)
    }
  }

  async getSecureDownloadUrl(userId: string, productId: string, fileName: string): Promise<string> {
    // Generate JWT token for secure download
    const payload = {
      userId,
      productId,
      fileName,
      exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 7 days
    }

    // This would use a proper JWT library in production
    const token = Buffer.from(JSON.stringify(payload)).toString("base64")

    return `/api/download/${token}`
  }
}

export const githubStorage = new GitHubStorage()
