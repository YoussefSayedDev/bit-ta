"use client";

import type React from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Code, Eye, EyeOff, Shield } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // محاكاة عملية تسجيل الدخول
    setTimeout(() => {
      setIsLoading(false);
      // يمكن إضافة منطق التحقق هنا
      // window.location.href = "/admin"
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Code className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">منصة البرمجة</span>
          </Link>
        </div>

        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-2">
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">
              لوحة تحكم الإدارة
            </CardTitle>
            <p className="text-gray-600">تسجيل دخول المشرفين والإداريين</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="adminEmail">البريد الإلكتروني للإدارة</Label>
                <Input
                  id="adminEmail"
                  type="email"
                  placeholder="admin@platform.com"
                  required
                  className="bg-gray-50 border-gray-200 focus:bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="adminPassword">كلمة مرور الإدارة</Label>
                <div className="relative">
                  <Input
                    id="adminPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="أدخل كلمة مرور الإدارة"
                    required
                    className="bg-gray-50 border-gray-200 focus:bg-white"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="rememberAdmin" />
                  <Label
                    htmlFor="rememberAdmin"
                    className="text-sm text-gray-600"
                  >
                    تذكر جلسة الإدارة
                  </Label>
                </div>
                <Link
                  href="/admin/forgot-password"
                  className="text-sm text-red-600 hover:underline"
                >
                  نسيت كلمة المرور؟
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    جاري التحقق...
                  </div>
                ) : (
                  <>
                    <Shield className="w-4 h-4 ml-2" />
                    دخول لوحة التحكم
                  </>
                )}
              </Button>
            </form>

            {/* Security Notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium text-amber-800 mb-1">
                    تنبيه أمني
                  </div>
                  <div className="text-amber-700">
                    هذه الصفحة مخصصة للمشرفين والإداريين فقط. جميع محاولات
                    الدخول يتم تسجيلها ومراقبتها.
                  </div>
                </div>
              </div>
            </div>

            {/* Admin Features */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-3">
                صلاحيات لوحة التحكم:
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  إدارة المستخدمين والحسابات
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  إضافة وتعديل المسائل البرمجية
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  إدارة المحتوى والمقالات
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  مراقبة الإحصائيات والتقارير
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  إدارة الشارات والمكافآت
                </li>
              </ul>
            </div>

            <div className="text-center">
              <Link
                href="/"
                className="text-gray-600 hover:text-blue-600 text-sm"
              >
                ← العودة للصفحة الرئيسية
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-gray-400 text-sm">
          <p>© 2024 منصة البرمجة - لوحة تحكم الإدارة</p>
          <p className="mt-1">محمية بأعلى معايير الأمان</p>
        </div>
      </div>
    </div>
  );
}
