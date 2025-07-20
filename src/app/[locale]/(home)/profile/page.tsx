// تحديث صفحة الملف الشخصي لاستخدام البيانات الحقيقية
"use client";

import type React from "react";

import { AuthGuard } from "@/components/auth/auth-guard";
import { Header } from "@/components/layout/header";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/auth-context";
import { useUserStats } from "@/hooks/use-user-stats";
import { getUserBadges } from "@/lib/api/badges";
import { getUserSolutions } from "@/lib/api/solutions";
import { updateUser } from "@/lib/api/users";
import {
  Activity,
  AlertCircle,
  Award,
  Calendar,
  CheckCircle,
  Edit,
  GraduationCap,
  Loader2,
  Mail,
  Phone,
  Target,
  TrendingUp,
  Trophy,
} from "lucide-react";
import { useEffect, useState } from "react";

function ProfileContent() {
  const { user, refreshProfile } = useAuth();
  const { stats, loading: statsLoading } = useUserStats();
  const [badges, setBadges] = useState<any[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editData, setEditData] = useState({
    full_name: user?.user_metadata?.full_name || "",
    phone: user?.user_metadata?.phone || "",
    university: user?.user_metadata?.university || "",
    major: user?.user_metadata?.major || "",
    academic_year: user?.user_metadata?.academic_year || "",
    bio: user?.user_metadata?.bio || "",
  });

  useEffect(() => {
    if (user) {
      setEditData({
        full_name: user?.user_metadata.full_name,
        phone: user?.user_metadata.phone || "",
        university: user?.user_metadata.university || "",
        major: user?.user_metadata.major || "",
        academic_year: user?.user_metadata.academic_year || "",
        bio: user?.user_metadata.bio || "",
      });
    }
  }, [user]);

  useEffect(() => {
    async function fetchData() {
      if (!user) return;

      try {
        const [userBadges, solutions] = await Promise.all([
          getUserBadges(user.id),
          getUserSolutions(user.id, 5),
        ]);

        setBadges(userBadges);
        setRecentActivity(
          solutions.map((solution) => ({
            id: solution.id,
            type: "solved",
            title: `حل مسألة: ${solution.problem.title}`,
            points: solution.points_earned,
            date: new Date(solution.submitted_at).toLocaleDateString("ar"),
          }))
        );
      } catch (err) {
        console.error("Error fetching profile data:", err);
      }
    }

    fetchData();
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await updateUser(user.id, editData);
      await refreshProfile();
      setSuccess("تم تحديث الملف الشخصي بنجاح");
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ في التحديث");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            <Skeleton className="h-48 w-full" />
            <div className="grid grid-cols-5 gap-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-24" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage
                    src={
                      user?.user_metadata.avatar_url ||
                      "/placeholder.svg?height=96&width=96"
                    }
                  />
                  <AvatarFallback className="text-2xl">
                    {user?.user_metadata.full_name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute -bottom-2 -left-2 w-8 h-8 bg-white"
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </div>

              <div className="text-center md:text-right flex-1">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {user?.user_metadata.full_name}
                </h1>
                <p className="text-gray-600 mb-4">
                  {user?.user_metadata.major && user?.user_metadata.university
                    ? `${user?.user_metadata.major} - ${user?.user_metadata.university}`
                    : user?.user_metadata.university || "طالب برمجة"}
                </p>

                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    <span>{user?.email}</span>
                  </div>
                  {user?.user_metadata.phone && (
                    <div className="flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      <span>{user?.user_metadata.phone}</span>
                    </div>
                  )}
                  {user?.user_metadata.academic_year && (
                    <div className="flex items-center gap-1">
                      <GraduationCap className="w-4 h-4" />
                      <span>{user?.user_metadata.academic_year}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      انضم في{" "}
                      {new Date(
                        user?.user_metadata.created_at
                      ).toLocaleDateString("ar")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6 text-center">
              {statsLoading ? (
                <Skeleton className="h-8 w-16 mx-auto mb-2" />
              ) : (
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {stats?.totalSolved || 0}
                </div>
              )}
              <div className="text-sm text-gray-600">مسألة محلولة</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              {statsLoading ? (
                <Skeleton className="h-8 w-16 mx-auto mb-2" />
              ) : (
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {user?.user_metadata.points}
                </div>
              )}
              <div className="text-sm text-gray-600">نقطة</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              {statsLoading ? (
                <Skeleton className="h-8 w-16 mx-auto mb-2" />
              ) : (
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  #{user?.user_metadata.rank}
                </div>
              )}
              <div className="text-sm text-gray-600">الترتيب العام</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">
                {user?.user_metadata.streak_days}
              </div>
              <div className="text-sm text-gray-600">أيام متتالية</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-yellow-600 mb-1">
                {badges.length}
              </div>
              <div className="text-sm text-gray-600">شارة</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="edit">تعديل البيانات</TabsTrigger>
            <TabsTrigger value="activity">النشاط</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Badges */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    الشارات المكتسبة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {badges.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4">
                      {badges.slice(0, 4).map((userBadge) => (
                        <div
                          key={userBadge.id}
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${userBadge.badge.color
                              .replace("text-", "bg-")
                              .replace("-600", "-100")}`}
                          >
                            <Trophy
                              className={`w-4 h-4 ${userBadge.badge.color}`}
                            />
                          </div>
                          <span className="text-sm font-medium">
                            {userBadge.badge.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      لم تحصل على أي شارات بعد
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Progress Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    التقدم الشهري
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>المسائل المحلولة هذا الشهر</span>
                        <span className="font-medium">
                          {stats?.totalSolved || 0} / 20
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${Math.min(
                              ((stats?.totalSolved || 0) / 20) * 100,
                              100
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>النقاط المكتسبة</span>
                        <span className="font-medium">
                          {user?.user_metadata.points} / 500
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{
                            width: `${Math.min(
                              (user?.user_metadata.points / 500) * 100,
                              100
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="edit" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>تعديل البيانات الشخصية</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      {success}
                    </AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">الاسم الكامل</Label>
                      <Input
                        id="fullName"
                        value={editData.full_name}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            full_name: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">رقم الهاتف</Label>
                      <Input
                        id="phone"
                        value={editData.phone}
                        onChange={(e) =>
                          setEditData({ ...editData, phone: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="university">الجامعة</Label>
                      <Input
                        id="university"
                        value={editData.university}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            university: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="major">التخصص</Label>
                      <Input
                        id="major"
                        value={editData.major}
                        onChange={(e) =>
                          setEditData({ ...editData, major: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="year">السنة الدراسية</Label>
                      <Select
                        value={editData.academic_year}
                        onValueChange={(value) =>
                          setEditData({ ...editData, academic_year: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
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
                          <SelectItem value="خريج">خريج</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">نبذة شخصية</Label>
                    <Textarea
                      id="bio"
                      placeholder="اكتب نبذة مختصرة عن نفسك..."
                      className="min-h-[100px]"
                      value={editData.bio}
                      onChange={(e) =>
                        setEditData({ ...editData, bio: e.target.value })
                      }
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin ml-2" />
                          جاري الحفظ...
                        </>
                      ) : (
                        "حفظ التغييرات"
                      )}
                    </Button>
                    <Button type="button" variant="outline">
                      إلغاء
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  النشاط الأخير
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentActivity.length > 0 ? (
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-100">
                          <Target className="w-5 h-5 text-green-600" />
                        </div>

                        <div className="flex-1">
                          <div className="font-medium text-gray-800">
                            {activity.title}
                          </div>
                          <div className="text-sm text-gray-600">
                            {activity.date}
                          </div>
                        </div>

                        {activity.points && (
                          <Badge className="bg-green-100 text-green-800">
                            +{activity.points} نقطة
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    لا يوجد نشاط حديث
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <AuthGuard>
      <ProfileContent />
    </AuthGuard>
  );
}
