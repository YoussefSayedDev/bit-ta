"use client";

import { AuthGuard } from "@/components/auth/auth-guard";
import { Header } from "@/components/layout/header";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/auth-context";
import {
  acceptFriendRequest,
  getFriendRequests,
  getFriends,
  rejectFriendRequest,
  sendFriendRequest,
  suggestFriends,
} from "@/lib/api/friendships";
import { searchUsers } from "@/lib/api/users";
import {
  AlertCircle,
  CheckCircle,
  Search,
  Trophy,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

function FriendsContent() {
  const { user } = useAuth();
  const [friends, setFriends] = useState<any[]>([]);
  const [friendRequests, setFriendRequests] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const [friendsData, requestsData, suggestionsData] = await Promise.all([
        getFriends(user.id),
        getFriendRequests(user.id),
        suggestFriends(user.id, 6),
      ]);

      setFriends(friendsData);
      setFriendRequests(requestsData);
      setSuggestions(suggestionsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setSearchLoading(true);
      const results = await searchUsers(query, 10);
      // تصفية النتائج لاستبعاد المستخدم الحالي والأصدقاء الحاليين
      const filteredResults = results.filter(
        (result) =>
          result.id !== user?.id &&
          !friends.some((friend) => friend.friend.id === result.id)
      );
      setSearchResults(filteredResults);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSendRequest = async (friendId: string) => {
    if (!user) return;

    try {
      await sendFriendRequest(user.id, friendId);
      // إزالة المستخدم من الاقتراحات والنتائج
      setSuggestions((prev) => prev.filter((s) => s.id !== friendId));
      setSearchResults((prev) => prev.filter((s) => s.id !== friendId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ في إرسال الطلب");
    }
  };

  const handleAcceptRequest = async (requestId: string) => {
    try {
      await acceptFriendRequest(requestId);
      await fetchData(); // إعادة تحميل البيانات
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ في قبول الطلب");
    }
  };

  const handleRejectRequest = async (requestId: string) => {
    try {
      await rejectFriendRequest(requestId);
      setFriendRequests((prev) => prev.filter((req) => req.id !== requestId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ في رفض الطلب");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-24" />
            ))}
          </div>

          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-20" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">الأصدقاء</h1>
          <p className="text-gray-600">تابع تقدم أصدقائك وتنافس معهم</p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">
                    {friends.length}
                  </div>
                  <div className="text-sm text-gray-600">إجمالي الأصدقاء</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <UserPlus className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">
                    {friendRequests.length}
                  </div>
                  <div className="text-sm text-gray-600">طلبات الصداقة</div>
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
                  <div className="text-2xl font-bold text-gray-800">
                    {friends.length > 0
                      ? Math.ceil(
                          friends.reduce((acc, f) => acc + f.friend.rank, 0) /
                            friends.length
                        )
                      : 0}
                  </div>
                  <div className="text-sm text-gray-600">
                    متوسط ترتيب الأصدقاء
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="friends" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="friends">
              أصدقائي ({friends.length})
            </TabsTrigger>
            <TabsTrigger value="requests">
              الطلبات ({friendRequests.length})
            </TabsTrigger>
            <TabsTrigger value="suggestions">اقتراحات</TabsTrigger>
          </TabsList>

          <TabsContent value="friends" className="space-y-6">
            {/* Search */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="ابحث عن مستخدمين..."
                      className="pr-10"
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Search Results */}
            {searchQuery && (
              <Card>
                <CardHeader>
                  <CardTitle>نتائج البحث</CardTitle>
                </CardHeader>
                <CardContent>
                  {searchLoading ? (
                    <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                        <Skeleton key={i} className="h-16" />
                      ))}
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="space-y-4">
                      {searchResults.map((user) => (
                        <div
                          key={user.id}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div className="flex items-center gap-4">
                            <Avatar className="w-12 h-12">
                              <AvatarImage
                                src={user.avatar_url || "/placeholder.svg"}
                              />
                              <AvatarFallback>
                                {user.full_name
                                  .split(" ")
                                  .map((n: string) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>

                            <div>
                              <h3 className="font-semibold text-gray-800">
                                {user.full_name}
                              </h3>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <span>{user.university || "غير محدد"}</span>
                                <span>•</span>
                                <span>{user.programming_level}</span>
                              </div>
                            </div>
                          </div>

                          <Button onClick={() => handleSendRequest(user.id)}>
                            <UserPlus className="w-4 h-4 ml-2" />
                            إضافة صديق
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      لا توجد نتائج
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Friends List */}
            {friends.length > 0 ? (
              <div className="space-y-4">
                {friends.map((friendship) => (
                  <Card
                    key={friendship.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar className="w-12 h-12">
                            <AvatarImage
                              src={
                                friendship.friend.avatar_url ||
                                "/placeholder.svg"
                              }
                            />
                            <AvatarFallback>
                              {friendship.friend.full_name
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>

                          <div>
                            <h3 className="font-semibold text-gray-800">
                              {friendship.friend.full_name}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Badge variant="outline" className="text-xs">
                                المرتبة #{friendship.friend.rank}
                              </Badge>
                              <span>•</span>
                              <span>{friendship.friend.points} نقطة</span>
                              <span>•</span>
                              <Badge
                                className={
                                  friendship.friend.programming_level ===
                                  "متقدم"
                                    ? "bg-red-100 text-red-800"
                                    : friendship.friend.programming_level ===
                                      "متوسط"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-green-100 text-green-800"
                                }
                              >
                                {friendship.friend.programming_level}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <Button variant="outline" size="sm">
                          عرض الملف
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    لا يوجد أصدقاء
                  </h3>
                  <p className="text-gray-600">
                    ابحث عن مستخدمين وأضفهم كأصدقاء!
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="requests" className="space-y-6">
            {friendRequests.length > 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>طلبات الصداقة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {friendRequests.map((request) => (
                      <div
                        key={request.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <Avatar className="w-12 h-12">
                            <AvatarImage
                              src={
                                request.user.avatar_url || "/placeholder.svg"
                              }
                            />
                            <AvatarFallback>
                              {request.user.full_name
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>

                          <div>
                            <h3 className="font-semibold text-gray-800">
                              {request.user.full_name}
                            </h3>
                            <div className="text-sm text-gray-600">
                              {request.user.university || "غير محدد"}
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleAcceptRequest(request.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="w-4 h-4 ml-2" />
                            قبول
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRejectRequest(request.id)}
                          >
                            <X className="w-4 h-4 ml-2" />
                            رفض
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <UserPlus className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    لا توجد طلبات
                  </h3>
                  <p className="text-gray-600">لا توجد طلبات صداقة جديدة</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="suggestions" className="space-y-6">
            {suggestions.length > 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>أصدقاء مقترحون</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {suggestions.map((suggestion) => (
                      <div
                        key={suggestion.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <Avatar className="w-12 h-12">
                            <AvatarImage
                              src={suggestion.avatar_url || "/placeholder.svg"}
                            />
                            <AvatarFallback>
                              {suggestion.full_name
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>

                          <div>
                            <h3 className="font-semibold text-gray-800">
                              {suggestion.full_name}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <span>{suggestion.points} نقطة</span>
                              <span>•</span>
                              <span>{suggestion.programming_level}</span>
                            </div>
                          </div>
                        </div>

                        <Button
                          size="sm"
                          onClick={() => handleSendRequest(suggestion.id)}
                        >
                          <UserPlus className="w-4 h-4 ml-2" />
                          إضافة
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    لا توجد اقتراحات
                  </h3>
                  <p className="text-gray-600">لا توجد اقتراحات صداقة حالياً</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default function FriendsPage() {
  return (
    <AuthGuard>
      <FriendsContent />
    </AuthGuard>
  );
}
