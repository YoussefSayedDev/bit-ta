import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      console.error("Auth error:", error.message);
      return NextResponse.redirect(`${requestUrl.origin}/error`);
    }
  }

  // إعادة التوجيه للصفحة الرئيسية
  return NextResponse.redirect(requestUrl.origin);
}
