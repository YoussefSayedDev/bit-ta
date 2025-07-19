"use client";

import type React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AdminGuardProps {
  children: React.ReactNode;
}

export function AdminGuard({ children }: AdminGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    // محاكاة التحقق من صلاحيات الإدارة
    const checkAdminAuth = () => {
      const adminToken = localStorage.getItem("admin_token");
      const isAdmin = adminToken === "admin_authenticated"; // محاكاة بسيطة

      if (!isAdmin) {
        router.push("/admin/login");
        return;
      }

      setIsAuthenticated(true);
    };

    checkAdminAuth();
  }, [router]);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-blue-600 animate-pulse" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              جاري التحقق من الصلاحيات
            </h2>
            <p className="text-gray-600">يرجى الانتظار...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              غير مصرح بالوصول
            </h2>
            <p className="text-gray-600">ليس لديك صلاحية للوصول لهذه الصفحة</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}
