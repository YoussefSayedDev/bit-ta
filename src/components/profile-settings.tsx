"use client";

import type React from "react";

import { useState } from "react";
// import type { User } from "@supabase/supabase-js";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { User } from "@/types";
import {
  ArrowLeft,
  Calendar,
  Camera,
  ExternalLink,
  GraduationCap,
} from "lucide-react";
// import { supabase } from "@/lib/supabase";

interface ProfileSettingsProps {
  user: User;
  onBack: () => void;
}

export function ProfileSettings({ user, onBack }: ProfileSettingsProps) {
  const [username, setUsername] = useState(user.user_metadata?.username || "");
  const [college, setCollege] = useState(user.user_metadata?.college || "");
  const [year, setYear] = useState(user.user_metadata?.year || "");
  const [codeforcesHandle, setCodeforcesHandle] = useState("");
  const [leetcodeHandle, setLeetcodeHandle] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    //   try {
    //     const { error } = await supabase.auth.updateUser({
    //       data: {
    //         username,
    //         college,
    //         year,
    //         codeforces_handle: codeforcesHandle,
    //         leetcode_handle: leetcodeHandle,
    //       },
    //     });

    //     if (error) throw error;
    //     setMessage("تم تحديث الملف الشخصي بنجاح!");
    //   } catch (error: any) {
    //     setMessage("حدث خطأ أثناء التحديث: " + error.message);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // const handleSignOut = async () => {
    //   await supabase.auth.signOut();
  };

  // Mock platform scores
  const platformScores = {
    codeforces: {
      total: 1847,
      current: 234,
      progress: 65,
    },
    leetcode: {
      total: 2156,
      current: 445,
      progress: 78,
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="flex items-center space-x-2 rtl:space-x-reverse mr-4"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>العودة</span>
            </Button>
            <h1 className="text-xl font-bold text-gray-900">
              إعدادات الملف الشخصي
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="relative inline-block mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" />
                    <AvatarFallback className="text-2xl">
                      {username.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <h3 className="text-lg font-semibold">
                  {username || "المستخدم"}
                </h3>
                <p className="text-sm text-gray-600">{user.email}</p>
                <div className="mt-4 space-y-2">
                  <Badge
                    variant="secondary"
                    className="flex items-center space-x-1 rtl:space-x-reverse"
                  >
                    <GraduationCap className="h-3 w-3" />
                    <span>{college || "غير محدد"}</span>
                  </Badge>
                  <Badge
                    variant="outline"
                    className="flex items-center space-x-1 rtl:space-x-reverse"
                  >
                    <Calendar className="h-3 w-3" />
                    <span>السنة {year || "غير محددة"}</span>
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Platform Scores */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">نقاط المنصات</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {codeforcesHandle && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Codeforces</span>
                      <ExternalLink className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">
                          السابق: {platformScores.codeforces.total}
                        </span>
                        <span className="font-medium">
                          الحالي: {platformScores.codeforces.current}
                        </span>
                      </div>
                      <Progress
                        value={platformScores.codeforces.progress}
                        className="h-2"
                      />
                    </div>
                  </div>
                )}

                {leetcodeHandle && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">LeetCode</span>
                      <ExternalLink className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">
                          السابق: {platformScores.leetcode.total}
                        </span>
                        <span className="font-medium">
                          الحالي: {platformScores.leetcode.current}
                        </span>
                      </div>
                      <Progress
                        value={platformScores.leetcode.progress}
                        className="h-2"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Settings Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>تحديث المعلومات الشخصية</CardTitle>
                <CardDescription>
                  قم بتحديث معلوماتك الشخصية وربط حساباتك على منصات البرمجة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">اسم المستخدم</Label>
                      <Input
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="اسم المستخدم"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">البريد الإلكتروني</Label>
                      <Input
                        id="email"
                        value={user.email || ""}
                        disabled
                        className="bg-gray-50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="college">الكلية</Label>
                      <Input
                        id="college"
                        value={college}
                        onChange={(e) => setCollege(e.target.value)}
                        placeholder="كلية الهندسة"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="year">السنة الدراسية</Label>
                      <Input
                        id="year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        placeholder="1"
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">ربط المنصات</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="codeforces">Codeforces Handle</Label>
                        <Input
                          id="codeforces"
                          value={codeforcesHandle}
                          onChange={(e) => setCodeforcesHandle(e.target.value)}
                          placeholder="your_handle"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="leetcode">LeetCode Handle</Label>
                        <Input
                          id="leetcode"
                          value={leetcodeHandle}
                          onChange={(e) => setLeetcodeHandle(e.target.value)}
                          placeholder="your_handle"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      type="button"
                      variant="destructive"
                      // onClick={handleSignOut}
                    >
                      تسجيل الخروج
                    </Button>
                    <Button type="submit" disabled={loading}>
                      {loading ? "جاري الحفظ..." : "حفظ التغييرات"}
                    </Button>
                  </div>
                </form>

                {message && (
                  <Alert className="mt-4">
                    <AlertDescription>{message}</AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
