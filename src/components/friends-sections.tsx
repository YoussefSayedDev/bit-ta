"use client";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Flag,
  MessageCircle,
  Search,
  Star,
  Trophy,
  UserCheck,
  UserPlus,
  Users,
  UserX,
} from "lucide-react";
import { useState } from "react";

interface Friend {
  id: string;
  username: string;
  avatar?: string;
  score: number;
  problemsSolved: number;
  college: string;
  year: string;
  rank: number;
  isOnline: boolean;
  status: "friend" | "pending" | "none";
}

const mockFriends: Friend[] = [
  {
    id: "1",
    username: "ahmed_coder",
    score: 2450,
    problemsSolved: 89,
    college: "كلية الهندسة",
    year: "3",
    rank: 1,
    isOnline: true,
    status: "friend",
  },
  {
    id: "2",
    username: "sara_dev",
    score: 2380,
    problemsSolved: 76,
    college: "كلية الحاسوب",
    year: "4",
    rank: 2,
    isOnline: false,
    status: "friend",
  },
  {
    id: "3",
    username: "mohamed_algo",
    score: 2290,
    problemsSolved: 82,
    college: "كلية الهندسة",
    year: "2",
    rank: 3,
    isOnline: true,
    status: "pending",
  },
];

const mockSearchResults: Friend[] = [
  {
    id: "4",
    username: "fatima_prog",
    score: 2156,
    problemsSolved: 67,
    college: "كلية العلوم",
    year: "3",
    rank: 4,
    isOnline: false,
    status: "none",
  },
  {
    id: "5",
    username: "omar_tech",
    score: 2089,
    problemsSolved: 71,
    college: "كلية الحاسوب",
    year: "4",
    rank: 5,
    isOnline: true,
    status: "none",
  },
];

export default function FriendsSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Friend[]>([]);
  const [activeTab, setActiveTab] = useState("friends");

  const handleSearch = () => {
    if (searchTerm.trim()) {
      const results = mockSearchResults.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleAddFriend = (userId: string) => {
    console.log("Adding friend:", userId);
  };

  const handleRemoveFriend = (userId: string) => {
    console.log("Removing friend:", userId);
  };

  const handleReport = (userId: string) => {
    console.log("Reporting user:", userId);
  };

  const UserCard = ({
    user,
    showActions = true,
  }: {
    user: Friend;
    showActions?: boolean;
  }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="relative">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={`/placeholder.svg?height=48&width=48&query=${user.username}+avatar`}
                />
                <AvatarFallback>
                  {user.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {user.isOnline && (
                <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{user.username}</h3>
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-600 mb-2">
                <span>{user.college}</span>
                <span>•</span>
                <span>السنة {user.year}</span>
              </div>
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  <Trophy className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">#{user.rank}</span>
                </div>
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  <Star className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">{user.score}</span>
                </div>
                <span className="text-sm text-gray-600">
                  {user.problemsSolved} مسألة
                </span>
              </div>
            </div>
          </div>

          {showActions && (
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              {user.status === "friend" && (
                <>
                  <Button size="sm" variant="outline">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRemoveFriend(user.id)}
                  >
                    <UserX className="h-4 w-4" />
                  </Button>
                </>
              )}
              {user.status === "pending" && (
                <Badge variant="secondary">طلب معلق</Badge>
              )}
              {user.status === "none" && (
                <Button size="sm" onClick={() => handleAddFriend(user.id)}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  إضافة صديق
                </Button>
              )}
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleReport(user.id)}
              >
                <Flag className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="friends">الأصدقاء</TabsTrigger>
          <TabsTrigger value="search">البحث</TabsTrigger>
          <TabsTrigger value="requests">الطلبات</TabsTrigger>
        </TabsList>

        <TabsContent value="friends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                <Users className="h-5 w-5" />
                <span>
                  قائمة الأصدقاء (
                  {mockFriends.filter((f) => f.status === "friend").length})
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockFriends
                  .filter((f) => f.status === "friend")
                  .map((friend) => (
                    <UserCard key={friend.id} user={friend} />
                  ))}
                {mockFriends.filter((f) => f.status === "friend").length ===
                  0 && (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      لا يوجد أصدقاء بعد
                    </h3>
                    <p className="text-gray-600">
                      ابحث عن مستخدمين وأضفهم كأصدقاء لتتابع تقدمهم
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="search" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                <Search className="h-5 w-5" />
                <span>البحث عن مستخدمين</span>
              </CardTitle>
              <CardDescription>
                ابحث عن المستخدمين باستخدام اسم المستخدم وأضفهم كأصدقاء
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2 rtl:space-x-reverse mb-6">
                <Input
                  placeholder="ابحث باسم المستخدم..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
                <Button onClick={handleSearch}>
                  <Search className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                {searchResults.map((user) => (
                  <UserCard key={user.id} user={user} />
                ))}
                {searchTerm && searchResults.length === 0 && (
                  <div className="text-center py-8">
                    <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      لا توجد نتائج
                    </h3>
                    <p className="text-gray-600">
                      لم يتم العثور على مستخدمين بهذا الاسم
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                <UserCheck className="h-5 w-5" />
                <span>
                  طلبات الصداقة (
                  {mockFriends.filter((f) => f.status === "pending").length})
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockFriends
                  .filter((f) => f.status === "pending")
                  .map((friend) => (
                    <Card key={friend.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3 rtl:space-x-reverse">
                            <Avatar className="h-10 w-10">
                              <AvatarImage
                                src={`/placeholder.svg?height=40&width=40&query=${friend.username}+avatar`}
                              />
                              <AvatarFallback>
                                {friend.username.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold">
                                {friend.username}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {friend.college} • السنة {friend.year}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <Button size="sm" variant="outline">
                              رفض
                            </Button>
                            <Button size="sm">قبول</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                {mockFriends.filter((f) => f.status === "pending").length ===
                  0 && (
                  <div className="text-center py-8">
                    <UserCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      لا توجد طلبات صداقة
                    </h3>
                    <p className="text-gray-600">
                      لا توجد طلبات صداقة معلقة في الوقت الحالي
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
