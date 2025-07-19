"use client";

import { AdminGuard } from "@/components/admin/admin-guard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Award,
  BookOpen,
  Edit,
  Eye,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Shield,
  Trash2,
  TrendingUp,
  Trophy,
  UserCheck,
  Users,
} from "lucide-react";

const stats = {
  totalUsers: 15420,
  activeUsers: 8950,
  totalProblems: 487,
  totalSolutions: 52340,
  newUsersThisMonth: 1250,
  growthRate: 12.5,
};

const recentUsers = [
  {
    id: 1,
    name: "أحمد محمد علي",
    email: "ahmed@example.com",
    university: "جامعة القاهرة",
    joinDate: "2024-01-20",
    status: "نشط",
    level: "متوسط",
    solved: 25,
  },
  {
    id: 2,
    name: "فاطمة حسن",
    email: "fatima@example.com",
    university: "جامعة الإسكندرية",
    joinDate: "2024-01-19",
    status: "نشط",
    level: "مبتدئ",
    solved: 8,
  },
  {
    id: 3,
    name: "محمد عبدالله",
    email: "mohammed@example.com",
    university: "الجامعة الأمريكية",
    joinDate: "2024-01-18",
    status: "غير نشط",
    level: "متقدم",
    solved: 67,
  },
];

const problems = [
  {
    id: 1,
    title: "جمع رقمين",
    difficulty: "مبتدئ",
    category: "رياضيات",
    points: 10,
    solved: 1250,
    status: "منشور",
  },
  {
    id: 2,
    title: "البحث في المصفوفة",
    difficulty: "متوسط",
    category: "مصفوفات",
    points: 25,
    solved: 850,
    status: "منشور",
  },
  {
    id: 3,
    title: "خوارزمية الترتيب السريع",
    difficulty: "متقدم",
    category: "خوارزميات",
    points: 50,
    solved: 320,
    status: "مسودة",
  },
];

const articles = [
  {
    id: 1,
    title: "دليل المبتدئين لتعلم البرمجة",
    author: "أحمد محمد",
    category: "تعليمي",
    publishDate: "2024-01-20",
    views: 2340,
    status: "منشور",
  },
  {
    id: 2,
    title: "أفضل الممارسات في كتابة الكود",
    author: "فاطمة علي",
    category: "تطوير",
    publishDate: "2024-01-18",
    views: 1890,
    status: "منشور",
  },
];

export default function AdminDashboard() {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-800">
                  لوحة تحكم الإدارة
                </span>
              </div>

              <Button
                variant="outline"
                onClick={() => {
                  localStorage.removeItem("admin_token");
                  window.location.href = "/admin/login";
                }}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                تسجيل الخروج
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              لوحة تحكم الإدارة
            </h1>
            <p className="text-gray-600">إدارة المنصة والمحتوى والمستخدمين</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">
                      {stats.totalUsers.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">
                      إجمالي المستخدمين
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <UserCheck className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">
                      {stats.activeUsers.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">
                      المستخدمون النشطون
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">
                      {stats.totalProblems}
                    </div>
                    <div className="text-sm text-gray-600">إجمالي المسائل</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">
                      +{stats.growthRate}%
                    </div>
                    <div className="text-sm text-gray-600">نمو هذا الشهر</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="users" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="users">المستخدمون</TabsTrigger>
              <TabsTrigger value="problems">المسائل</TabsTrigger>
              <TabsTrigger value="articles">المقالات</TabsTrigger>
              <TabsTrigger value="badges">الشارات</TabsTrigger>
              <TabsTrigger value="settings">الإعدادات</TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>إدارة المستخدمين</CardTitle>
                    <div className="flex gap-2">
                      <div className="relative">
                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          placeholder="البحث عن مستخدم..."
                          className="pr-10 w-64"
                        />
                      </div>
                      <Button variant="outline">
                        <Filter className="w-4 h-4 ml-2" />
                        تصفية
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>المستخدم</TableHead>
                        <TableHead>الجامعة</TableHead>
                        <TableHead>تاريخ الانضمام</TableHead>
                        <TableHead>المستوى</TableHead>
                        <TableHead>المسائل المحلولة</TableHead>
                        <TableHead>الحالة</TableHead>
                        <TableHead>الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="w-8 h-8">
                                <AvatarImage
                                  src={`/placeholder.svg?height=32&width=32`}
                                />
                                <AvatarFallback>
                                  {user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-sm text-gray-500">
                                  {user.email}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{user.university}</TableCell>
                          <TableCell>{user.joinDate}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                user.level === "متقدم"
                                  ? "default"
                                  : user.level === "متوسط"
                                  ? "secondary"
                                  : "outline"
                              }
                            >
                              {user.level}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.solved}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                user.status === "نشط" ? "default" : "secondary"
                              }
                            >
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="problems" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>إدارة المسائل</CardTitle>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      <Plus className="w-4 h-4 ml-2" />
                      إضافة مسألة جديدة
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>العنوان</TableHead>
                        <TableHead>المستوى</TableHead>
                        <TableHead>التصنيف</TableHead>
                        <TableHead>النقاط</TableHead>
                        <TableHead>عدد الحلول</TableHead>
                        <TableHead>الحالة</TableHead>
                        <TableHead>الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {problems.map((problem) => (
                        <TableRow key={problem.id}>
                          <TableCell className="font-medium">
                            {problem.title}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                problem.difficulty === "متقدم"
                                  ? "destructive"
                                  : problem.difficulty === "متوسط"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {problem.difficulty}
                            </Badge>
                          </TableCell>
                          <TableCell>{problem.category}</TableCell>
                          <TableCell>{problem.points}</TableCell>
                          <TableCell>{problem.solved}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                problem.status === "منشور"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {problem.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="articles" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>إدارة المقالات</CardTitle>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      <Plus className="w-4 h-4 ml-2" />
                      إضافة مقال جديد
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>العنوان</TableHead>
                        <TableHead>الكاتب</TableHead>
                        <TableHead>التصنيف</TableHead>
                        <TableHead>تاريخ النشر</TableHead>
                        <TableHead>المشاهدات</TableHead>
                        <TableHead>الحالة</TableHead>
                        <TableHead>الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {articles.map((article) => (
                        <TableRow key={article.id}>
                          <TableCell className="font-medium">
                            {article.title}
                          </TableCell>
                          <TableCell>{article.author}</TableCell>
                          <TableCell>{article.category}</TableCell>
                          <TableCell>{article.publishDate}</TableCell>
                          <TableCell>{article.views}</TableCell>
                          <TableCell>
                            <Badge variant="default">{article.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="badges" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>إدارة الشارات</CardTitle>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      <Plus className="w-4 h-4 ml-2" />
                      إضافة شارة جديدة
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card className="text-center">
                      <CardContent className="pt-6">
                        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Trophy className="w-8 h-8 text-yellow-600" />
                        </div>
                        <h3 className="font-bold text-gray-800 mb-2">
                          المبتدئ
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          حل أول مسألة برمجية
                        </p>
                        <div className="flex gap-2 justify-center">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="text-center">
                      <CardContent className="pt-6">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Award className="w-8 h-8 text-blue-600" />
                        </div>
                        <h3 className="font-bold text-gray-800 mb-2">
                          حلال المسائل
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          حل 10 مسائل برمجية
                        </p>
                        <div className="flex gap-2 justify-center">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="text-center">
                      <CardContent className="pt-6">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Trophy className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="font-bold text-gray-800 mb-2">السريع</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          حل مسألة في أقل من دقيقة
                        </p>
                        <div className="flex gap-2 justify-center">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      إعدادات عامة
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">اسم المنصة</label>
                      <Input defaultValue="منصة البرمجة العربية" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">وصف المنصة</label>
                      <Input defaultValue="منصة تعليمية لتعلم البرمجة وحل المسائل" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        البريد الإلكتروني للدعم
                      </label>
                      <Input defaultValue="support@platform.com" />
                    </div>
                    <Button className="w-full">حفظ الإعدادات</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>إحصائيات سريعة</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          مستخدمون جدد اليوم
                        </span>
                        <span className="font-bold">47</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          مسائل محلولة اليوم
                        </span>
                        <span className="font-bold">234</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          مقالات منشورة هذا الشهر
                        </span>
                        <span className="font-bold">12</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">معدل النشاط</span>
                        <span className="font-bold text-green-600">85%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AdminGuard>
  );
}
