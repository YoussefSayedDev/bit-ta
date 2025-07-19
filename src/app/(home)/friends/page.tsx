import { Header } from "@/components/layout/header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, TrendingUp, Trophy, UserPlus, Users } from "lucide-react";

const friends = [
  {
    id: 1,
    name: "أحمد محمد",
    avatar: "/placeholder.svg?height=50&width=50",
    rank: 1,
    points: 2850,
    solved: 145,
    level: "متقدم",
    status: "متصل",
  },
  {
    id: 2,
    name: "فاطمة علي",
    avatar: "/placeholder.svg?height=50&width=50",
    rank: 3,
    points: 2340,
    solved: 128,
    level: "متوسط",
    status: "غير متصل",
  },
  {
    id: 3,
    name: "محمد حسن",
    avatar: "/placeholder.svg?height=50&width=50",
    rank: 5,
    points: 1980,
    solved: 95,
    level: "متوسط",
    status: "متصل",
  },
  {
    id: 4,
    name: "سارة أحمد",
    avatar: "/placeholder.svg?height=50&width=50",
    rank: 8,
    points: 1650,
    solved: 78,
    level: "مبتدئ",
    status: "متصل",
  },
];

const suggestions = [
  {
    id: 5,
    name: "عمر خالد",
    avatar: "/placeholder.svg?height=50&width=50",
    points: 1420,
    solved: 65,
    mutualFriends: 3,
  },
  {
    id: 6,
    name: "نور محمود",
    avatar: "/placeholder.svg?height=50&width=50",
    points: 1890,
    solved: 89,
    mutualFriends: 2,
  },
];

export default function FriendsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">الأصدقاء</h1>
          <p className="text-gray-600">تابع تقدم أصدقائك وتنافس معهم</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">24</div>
                  <div className="text-sm text-gray-600">إجمالي الأصدقاء</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">7</div>
                  <div className="text-sm text-gray-600">
                    ترتيبك بين الأصدقاء
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">+15</div>
                  <div className="text-sm text-gray-600">نقاط هذا الأسبوع</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="friends" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="friends">أصدقائي</TabsTrigger>
            <TabsTrigger value="suggestions">اقتراحات</TabsTrigger>
          </TabsList>

          <TabsContent value="friends" className="space-y-6">
            {/* Search */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input placeholder="ابحث عن صديق..." className="pr-10" />
                  </div>
                  <Button>
                    <UserPlus className="w-4 h-4 ml-2" />
                    دعوة صديق
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Friends List */}
            <div className="space-y-4">
              {friends.map((friend) => (
                <Card
                  key={friend.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <Avatar className="w-12 h-12">
                            <AvatarImage
                              src={friend.avatar || "/placeholder.svg"}
                            />
                            <AvatarFallback>
                              {friend.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div
                            className={`absolute -bottom-1 -left-1 w-4 h-4 rounded-full border-2 border-white ${
                              friend.status === "متصل"
                                ? "bg-green-500"
                                : "bg-gray-400"
                            }`}
                          />
                        </div>

                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {friend.name}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Badge variant="outline" className="text-xs">
                              المرتبة #{friend.rank}
                            </Badge>
                            <span>•</span>
                            <span>{friend.points} نقطة</span>
                            <span>•</span>
                            <span>{friend.solved} مسألة محلولة</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge
                          className={
                            friend.level === "متقدم"
                              ? "bg-red-100 text-red-800"
                              : friend.level === "متوسط"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }
                        >
                          {friend.level}
                        </Badge>
                        <Button variant="outline" size="sm">
                          عرض الملف
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="suggestions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>أصدقاء مقترحون</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {suggestions.map((suggestion) => (
                    <div
                      key={suggestion.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage
                            src={suggestion.avatar || "/placeholder.svg"}
                          />
                          <AvatarFallback>
                            {suggestion.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {suggestion.name}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span>{suggestion.points} نقطة</span>
                            <span>•</span>
                            <span>{suggestion.solved} مسألة محلولة</span>
                            <span>•</span>
                            <span>
                              {suggestion.mutualFriends} أصدقاء مشتركون
                            </span>
                          </div>
                        </div>
                      </div>

                      <Button>
                        <UserPlus className="w-4 h-4 ml-2" />
                        إضافة صديق
                      </Button>
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
