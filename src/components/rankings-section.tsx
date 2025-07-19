"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Award,
  Calendar,
  Medal,
  Star,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";
import { useState } from "react";

interface RankingUser {
  id: string;
  username: string;
  avatar?: string;
  score: number;
  problemsSolved: number;
  college: string;
  year: string;
  rank: number;
  change: number;
}

const mockRankings: RankingUser[] = [
  {
    id: "1",
    username: "ahmed_coder",
    score: 2450,
    problemsSolved: 89,
    college: "كلية الهندسة",
    year: "3",
    rank: 1,
    change: 2,
  },
  {
    id: "2",
    username: "sara_dev",
    score: 2380,
    problemsSolved: 76,
    college: "كلية الحاسوب",
    year: "4",
    rank: 2,
    change: -1,
  },
  {
    id: "3",
    username: "mohamed_algo",
    score: 2290,
    problemsSolved: 82,
    college: "كلية الهندسة",
    year: "2",
    rank: 3,
    change: 1,
  },
  {
    id: "4",
    username: "fatima_prog",
    score: 2156,
    problemsSolved: 67,
    college: "كلية العلوم",
    year: "3",
    rank: 4,
    change: 0,
  },
  {
    id: "5",
    username: "omar_tech",
    score: 2089,
    problemsSolved: 71,
    college: "كلية الحاسوب",
    year: "4",
    rank: 5,
    change: 3,
  },
];

export default function RankingsSection() {
  const [activeTab, setActiveTab] = useState("overall");

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getChangeIndicator = (change: number) => {
    if (change > 0) {
      return <Badge className="bg-green-100 text-green-800">+{change}</Badge>;
    } else if (change < 0) {
      return <Badge className="bg-red-100 text-red-800">{change}</Badge>;
    } else {
      return <Badge variant="secondary">-</Badge>;
    }
  };

  const RankingList = ({
    title,
    users,
  }: {
    title: string;
    users: RankingUser[];
  }) => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
          <Trophy className="h-5 w-5" />
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="flex items-center justify-center w-12 h-12">
                  {getRankIcon(user.rank)}
                </div>
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={`/placeholder.svg?height=40&width=40&query=${user.username}+avatar`}
                  />
                  <AvatarFallback>
                    {user.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{user.username}</h3>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-600">
                    <span>{user.college}</span>
                    <span>•</span>
                    <span>السنة {user.year}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="text-right">
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="font-bold">{user.score}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {user.problemsSolved} مسألة
                  </div>
                </div>
                {getChangeIndicator(user.change)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overall">الترتيب العام</TabsTrigger>
          <TabsTrigger value="year">حسب السنة</TabsTrigger>
          <TabsTrigger value="weekly">الأسبوع</TabsTrigger>
          <TabsTrigger value="monthly">الشهر</TabsTrigger>
        </TabsList>

        <TabsContent value="overall" className="space-y-6">
          <RankingList title="الترتيب العام" users={mockRankings} />
        </TabsContent>

        <TabsContent value="year" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RankingList
              title="السنة الثالثة"
              users={mockRankings.filter((u) => u.year === "3")}
            />
            <RankingList
              title="السنة الرابعة"
              users={mockRankings.filter((u) => u.year === "4")}
            />
          </div>
        </TabsContent>

        <TabsContent value="weekly" className="space-y-6">
          <RankingList
            title="أفضل المتسابقين هذا الأسبوع"
            users={mockRankings.slice(0, 3)}
          />
        </TabsContent>

        <TabsContent value="monthly" className="space-y-6">
          <RankingList title="أفضل المتسابقين هذا الشهر" users={mockRankings} />
        </TabsContent>
      </Tabs>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold">1,234</h3>
            <p className="text-sm text-gray-600">إجمالي المتسابقين</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold">89</h3>
            <p className="text-sm text-gray-600">متسابقين جدد هذا الأسبوع</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Calendar className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold">456</h3>
            <p className="text-sm text-gray-600">مسائل محلولة اليوم</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
