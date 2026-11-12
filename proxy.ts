// DUMMY - role dibaca dari cookie plain "jmj_role", BUKAN token Sanctum sungguhan.
// TODO(auth-sungguhan): setelah backend Sanctum terpasang, ganti seluruh cara baca
// identitas di sini jadi verifikasi token asli (lihat KONVENSI-BACKEND.md bagian
// login) - cookie "jmj_role"/"jmj_identity_code" dihapus total, bukan disambung.
// Login sendiri diisi di features/auth/hooks/useLogin.ts (backlog-shared.md K11).

import { NextResponse, type NextRequest } from "next/server";
import { ROUTE_ROLES, resolveContentPath } from "@/lib/route-access";
import type { UserRole } from "@/lib/types/user";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const matchedRoute = Object.keys(ROUTE_ROLES).find(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (!matchedRoute) {
    return NextResponse.next();
  }

  const role = request.cookies.get("jmj_role")?.value as UserRole | undefined;

  if (!role) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const allowedRoles = ROUTE_ROLES[matchedRoute];
  if (!allowedRoles.includes(role)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const target = resolveContentPath(matchedRoute, pathname, role);
  if (target) {
    return NextResponse.rewrite(new URL(target, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/lapor-insiden/:path*",
    "/riwayat/:path*",
    "/work-order/:path*",
    "/dashboard/:path*",
    "/verifikasi-laporan/:path*",
    "/arsip-dokumen/:path*",
    "/pantauan-masa-tenggang/:path*",
    "/work-order-review/:path*",
    "/laporan/:path*",
    "/pemeliharaan/:path*",
  ],
};
