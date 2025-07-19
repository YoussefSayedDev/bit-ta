"use client";

import FriendsSection from "@/components/friends-sections";
import ProblemsSection from "@/components/problems-section";
import RankingsSection from "@/components/rankings-section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code2, Star, Target, TrendingUp, Trophy, Users } from "lucide-react";
import { useState } from "react";

type User = {
  user_metadata: {
    username: string;
  };
};

interface DashboardProps {
  user: User;
}

export function Dashboard({ user }: DashboardProps) {
  const [activeTab, setActiveTab] = useState("problems");
  const [showProfileSettings, setShowProfileSettings] = useState(false);

  const userStats = {
    totalScore: 1250,
    problemsSolved: 45,
    rank: 12,
    weeklyRank: 8,
  };

  // if (showProfileSettings) {
  //   return (
  //     <ProfileSettings
  //       user={user}
  //       onBack={() => setShowProfileSettings(false)}
  //     />
  //   );
  // }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <h1 className="text-xl font-bold text-blue-600">
                منصة البرمجة التنافسية
              </h1>
            </div>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowProfileSettings(true)}
                className="flex items-center space-x-2 rtl:space-x-reverse"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>
                    {user.user_metadata?.username?.charAt(0)?.toUpperCase() ||
                      "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline">
                  {user.user_metadata?.username || "المستخدم"}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    النقاط الإجمالية
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    {userStats.totalScore}
                  </p>
                </div>
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    المسائل المحلولة
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {userStats.problemsSolved}
                  </p>
                </div>
                <Target className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    الترتيب العام
                  </p>
                  <p className="text-2xl font-bold text-purple-600">
                    #{userStats.rank}
                  </p>
                </div>
                <Trophy className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    ترتيب الأسبوع
                  </p>
                  <p className="text-2xl font-bold text-orange-600">
                    #{userStats.weeklyRank}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger
              value="problems"
              className="flex items-center space-x-2 rtl:space-x-reverse"
            >
              <Code2 className="h-4 w-4" />
              <span>المسائل</span>
            </TabsTrigger>
            <TabsTrigger
              value="rankings"
              className="flex items-center space-x-2 rtl:space-x-reverse"
            >
              <Trophy className="h-4 w-4" />
              <span>الترتيب</span>
            </TabsTrigger>
            <TabsTrigger
              value="friends"
              className="flex items-center space-x-2 rtl:space-x-reverse"
            >
              <Users className="h-4 w-4" />
              <span>الأصدقاء</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="problems">
            <ProblemsSection />
          </TabsContent>

          <TabsContent value="rankings">
            <RankingsSection />
          </TabsContent>

          <TabsContent value="friends">
            <FriendsSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
