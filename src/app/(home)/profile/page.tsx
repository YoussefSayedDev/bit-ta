import { Header } from "@/components/layout/header";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Activity,
  Award,
  Calendar,
  Edit,
  GraduationCap,
  Mail,
  Phone,
  Star,
  Target,
  TrendingUp,
  Trophy,
} from "lucide-react";

const userStats = {
  totalSolved: 32,
  totalPoints: 1850,
  rank: 156,
  streak: 5,
  badges: 4,
};

const recentActivity = [
  {
    id: 1,
    type: "solved",
    title: "حل مسألة: جمع رقمين",
    points: 10,
    date: "منذ ساعتين",
  },
  {
    id: 2,
    type: "badge",
    title: "حصل على شارة: المثابر",
    date: "أمس",
  },
  {
    id: 3,
    type: "solved",
    title: "حل مسألة: البحث في المصفوفة",
    points: 25,
    date: "منذ يومين",
  },
];

const badges = [
  { name: "المبتدئ", icon: Star, color: "text-yellow-600" },
  { name: "حلال المسائل", icon: Target, color: "text-blue-600" },
  { name: "السريع", icon: Trophy, color: "text-green-600" },
  { name: "المثابر", icon: Award, color: "text-purple-600" },
];

export default function ProfilePage() {
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
                  <AvatarImage src="/placeholder.svg?height=96&width=96" />
                  <AvatarFallback className="text-2xl">أح</AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute -bottom-2 -left-2 w-8 h-8 bg-transparent"
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </div>

              <div className="text-center md:text-right flex-1">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  أحمد محمد علي
                </h1>
                <p className="text-gray-600 mb-4">
                  طالب هندسة حاسوب - جامعة القاهرة
                </p>

                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    <span>ahmed@example.com</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    <span>+20 123 456 7890</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GraduationCap className="w-4 h-4" />
                    <span>السنة الثالثة</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>انضم في يناير 2024</span>
                  </div>
                </div>
              </div>

              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Edit className="w-4 h-4 ml-2" />
                تعديل الملف الشخصي
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {userStats.totalSolved}
              </div>
              <div className="text-sm text-gray-600">مسألة محلولة</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {userStats.totalPoints}
              </div>
              <div className="text-sm text-gray-600">نقطة</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                #{userStats.rank}
              </div>
              <div className="text-sm text-gray-600">الترتيب العام</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">
                {userStats.streak}
              </div>
              <div className="text-sm text-gray-600">أيام متتالية</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-yellow-600 mb-1">
                {userStats.badges}
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
                  <div className="grid grid-cols-2 gap-4">
                    {badges.map((badge, index) => {
                      const IconComponent = badge.icon;
                      return (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                        >
                          <IconComponent className={`w-6 h-6 ${badge.color}`} />
                          <span className="text-sm font-medium">
                            {badge.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
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
                        <span className="font-medium">12 / 20</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: "60%" }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>النقاط المكتسبة</span>
                        <span className="font-medium">280 / 500</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: "56%" }}
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
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">الاسم الكامل</Label>
                    <Input id="fullName" defaultValue="أحمد محمد علي" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="ahmed@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">رقم الهاتف</Label>
                    <Input id="phone" defaultValue="+20 123 456 7890" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="university">الجامعة</Label>
                    <Input id="university" defaultValue="جامعة القاهرة" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="major">التخصص</Label>
                    <Input id="major" defaultValue="هندسة حاسوب" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="year">السنة الدراسية</Label>
                    <Select defaultValue="3">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">السنة الأولى</SelectItem>
                        <SelectItem value="2">السنة الثانية</SelectItem>
                        <SelectItem value="3">السنة الثالثة</SelectItem>
                        <SelectItem value="4">السنة الرابعة</SelectItem>
                        <SelectItem value="graduate">خريج</SelectItem>
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
                  />
                </div>

                <div className="flex gap-4">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    حفظ التغييرات
                  </Button>
                  <Button variant="outline">إلغاء</Button>
                </div>
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
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          activity.type === "solved"
                            ? "bg-green-100"
                            : "bg-yellow-100"
                        }`}
                      >
                        {activity.type === "solved" ? (
                          <Target className="w-5 h-5 text-green-600" />
                        ) : (
                          <Award className="w-5 h-5 text-yellow-600" />
                        )}
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
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
