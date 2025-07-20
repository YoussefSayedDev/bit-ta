"use client";

import type React from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/auth-context";
import { signInWithProvider, signUp } from "@/lib/api/auth";
import { AlertCircle, Code, Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    university: "",
    major: "",
    academicYear: "",
    programmingLevel: "",
    bio: "",
    agreeToTerms: false,
    subscribeNewsletter: false,
  });

  const router = useRouter();
  const { user } = useAuth();

  // إعادة توجيه المستخدم المسجل دخوله
  if (user) {
    router.push("/");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // التحقق من تطابق كلمات المرور
    if (formData.password !== formData.confirmPassword) {
      setError("كلمات المرور غير متطابقة");
      setLoading(false);
      return;
    }

    // التحقق من الموافقة على الشروط
    if (!formData.agreeToTerms) {
      setError("يجب الموافقة على شروط الاستخدام");
      setLoading(false);
      return;
    }

    try {
      await signUp({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        phone: formData.phone,
        university: formData.university,
        major: formData.major,
        academicYear: formData.academicYear,
        programmingLevel: formData.programmingLevel,
        bio: formData.bio,
      });

      // إعادة توجيه للصفحة الرئيسية
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ في إنشاء الحساب");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignUp = async (provider: "google" | "facebook") => {
    try {
      await signInWithProvider(provider);
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ في التسجيل");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Code className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-800">
              منصة البرمجة
            </span>
          </Link>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-800">
              إنشاء حساب جديد
            </CardTitle>
            <p className="text-gray-600">انضم إلى مجتمع المبرمجين العرب</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">الاسم الكامل *</Label>
                  <Input
                    id="fullName"
                    placeholder="أدخل اسمك الكامل"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="أدخل بريدك الإلكتروني"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">كلمة المرور *</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="أدخل كلمة مرور قوية"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      required
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

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">تأكيد كلمة المرور *</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="أعد إدخال كلمة المرور"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">رقم الهاتف</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="أدخل رقم هاتفك"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>

              {/* Academic Information */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  المعلومات الأكاديمية
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="university">
                      الجامعة/المؤسسة التعليمية
                    </Label>
                    <Input
                      id="university"
                      placeholder="اسم الجامعة أو المؤسسة"
                      value={formData.university}
                      onChange={(e) =>
                        setFormData({ ...formData, university: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="major">التخصص</Label>
                    <Input
                      id="major"
                      placeholder="تخصصك الأكاديمي"
                      value={formData.major}
                      onChange={(e) =>
                        setFormData({ ...formData, major: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="year">السنة الدراسية</Label>
                    <Select
                      value={formData.academicYear}
                      onValueChange={(value) =>
                        setFormData({ ...formData, academicYear: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر السنة الدراسية" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="السنة الأولى">
                          السنة الأولى
                        </SelectItem>
                        <SelectItem value="السنة الثانية">
                          السنة الثانية
                        </SelectItem>
                        <SelectItem value="السنة الثالثة">
                          السنة الثالثة
                        </SelectItem>
                        <SelectItem value="السنة الرابعة">
                          السنة الرابعة
                        </SelectItem>
                        <SelectItem value="السنة الخامسة">
                          السنة الخامسة
                        </SelectItem>
                        <SelectItem value="خريج">خريج</SelectItem>
                        <SelectItem value="أخرى">أخرى</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="level">مستواك في البرمجة</Label>
                    <Select
                      value={formData.programmingLevel}
                      onValueChange={(value) =>
                        setFormData({ ...formData, programmingLevel: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر مستواك" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="مبتدئ">مبتدئ</SelectItem>
                        <SelectItem value="متوسط">متوسط</SelectItem>
                        <SelectItem value="متقدم">متقدم</SelectItem>
                        <SelectItem value="خبير">خبير</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Interests */}
              <div className="space-y-2">
                <Label htmlFor="interests">الاهتمامات الأخرى (اختياري)</Label>
                <Textarea
                  id="interests"
                  placeholder="اكتب عن اهتماماتك في مجال التكنولوجيا والبرمجة..."
                  className="min-h-[80px]"
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                />
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, agreeToTerms: !!checked })
                  }
                  required
                />
                <Label
                  htmlFor="terms"
                  className="text-sm text-gray-600 leading-relaxed"
                >
                  أوافق على{" "}
                  <Link href="/terms" className="text-blue-600 hover:underline">
                    شروط الاستخدام
                  </Link>{" "}
                  و{" "}
                  <Link
                    href="/privacy"
                    className="text-blue-600 hover:underline"
                  >
                    سياسة الخصوصية
                  </Link>
                </Label>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="newsletter"
                  checked={formData.subscribeNewsletter}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, subscribeNewsletter: !!checked })
                  }
                />
                <Label htmlFor="newsletter" className="text-sm text-gray-600">
                  أرغب في تلقي النشرة الإخبارية والتحديثات
                </Label>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin ml-2" />
                    جاري إنشاء الحساب...
                  </>
                ) : (
                  "إنشاء الحساب"
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">أو</span>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => handleSocialSignUp("google")}
              >
                <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                التسجيل بـ Google
              </Button>

              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => handleSocialSignUp("facebook")}
              >
                <svg
                  className="w-5 h-5 ml-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                التسجيل بـ Facebook
              </Button>
            </div>

            <div className="text-center">
              <span className="text-gray-600">لديك حساب بالفعل؟ </span>
              <Link
                href="/login"
                className="text-blue-600 hover:underline font-medium"
              >
                تسجيل الدخول
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
