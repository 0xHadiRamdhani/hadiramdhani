import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Karena ini hanya portofolio, kita melakukan mock pengiriman email sukses
    // dan tidak memerlukan integrasi backend/Resend yang sebenarnya.
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulasi network delay

    return NextResponse.json({ success: true, message: "Pesan berhasil dikirim (Mock)" });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
