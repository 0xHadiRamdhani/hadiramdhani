import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  if (!q) {
    return NextResponse.json({ error: "Missing query parameter" }, { status: 400 });
  }

  try {
    const res = await fetch(`https://urlscan.io/api/v1/search/?q=${encodeURIComponent(q)}`, {
      headers: {
        "Accept": "application/json"
      }
    });
    
    if (!res.ok) {
      throw new Error(`urlscan API responded with status: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch from urlscan.io" }, { status: 500 });
  }
}

