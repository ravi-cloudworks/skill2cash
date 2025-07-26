import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

export async function GET(request: NextRequest, { params }: { params: { token: string } }) {
  try {
    // Verify JWT token
    const payload = jwt.verify(params.token, process.env.JWT_SECRET!) as any

    // Check download limits
    const downloadRecord = await getDownloadRecord(payload.orderId)
    if (downloadRecord.downloads_used >= 3) {
      return NextResponse.json({ error: "Download limit exceeded" }, { status: 403 })
    }

    // Fetch file from GitHub private repo
    const fileResponse = await fetch(payload.downloadUrl, {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        Accept: "application/octet-stream",
      },
    })

    if (!fileResponse.ok) {
      throw new Error("File not found")
    }

    // Track download
    await trackDownload(payload.orderId, request.ip)

    // Stream file to user
    const fileBuffer = await fileResponse.arrayBuffer()

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${payload.fileName}"`,
      },
    })
  } catch (error) {
    console.error("Download error:", error)
    return NextResponse.json({ error: "Invalid or expired download link" }, { status: 403 })
  }
}

async function getDownloadRecord(orderId: string) {
  // This would fetch from database
  return { downloads_used: 0 }
}

async function trackDownload(orderId: string, ip: string | null) {
  // This would update database
  console.log(`Download tracked for order ${orderId} from IP ${ip}`)
}
