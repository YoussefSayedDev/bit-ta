"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CheckCircle,
  Clock,
  Code2,
  ExternalLink,
  Filter,
  Search,
  Star,
  Users,
} from "lucide-react";
import { useState } from "react";

interface Problem {
  id: string;
  title: string;
  platform: string;
  difficulty: "easy" | "medium" | "hard";
  points: number;
  solved: boolean;
  solvedCount: number;
  tags: string[];
  timeLimit: string;
  url: string;
}

const mockProblems: Problem[] = [
  {
    id: "1",
    title: "Two Sum",
    platform: "LeetCode",
    difficulty: "easy",
    points: 10,
    solved: true,
    solvedCount: 1234,
    tags: ["Array", "Hash Table"],
    timeLimit: "1s",
    url: "#",
  },
  {
    id: "2",
    title: "Binary Search",
    platform: "Codeforces",
    difficulty: "medium",
    points: 20,
    solved: false,
    solvedCount: 856,
    tags: ["Binary Search", "Algorithms"],
    timeLimit: "2s",
    url: "#",
  },
  {
    id: "3",
    title: "Graph Traversal",
    platform: "AtCoder",
    difficulty: "hard",
    points: 30,
    solved: false,
    solvedCount: 234,
    tags: ["Graph", "DFS", "BFS"],
    timeLimit: "3s",
    url: "#",
  },
  {
    id: "4",
    title: "Dynamic Programming",
    platform: "HackerRank",
    difficulty: "hard",
    points: 35,
    solved: true,
    solvedCount: 445,
    tags: ["DP", "Optimization"],
    timeLimit: "2s",
    url: "#",
  },
  {
    id: "5",
    title: "String Matching",
    platform: "LeetCode",
    difficulty: "medium",
    points: 25,
    solved: false,
    solvedCount: 678,
    tags: ["String", "Pattern Matching"],
    timeLimit: "1s",
    url: "#",
  },
];

export default function ProblemsSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [platformFilter, setPlatformFilter] = useState("all");

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "سهل";
      case "medium":
        return "متوسط";
      case "hard":
        return "صعب";
      default:
        return difficulty;
    }
  };

  const filteredProblems = mockProblems.filter((problem) => {
    const matchesSearch =
      problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      problem.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesDifficulty =
      difficultyFilter === "all" || problem.difficulty === difficultyFilter;
    const matchesPlatform =
      platformFilter === "all" || problem.platform === platformFilter;

    return matchesSearch && matchesDifficulty && matchesPlatform;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
            <Filter className="h-5 w-5" />
            <span>البحث والتصفية</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">البحث</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="ابحث في المسائل..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">مستوى الصعوبة</label>
              <Select
                value={difficultyFilter}
                onValueChange={setDifficultyFilter}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع المستويات</SelectItem>
                  <SelectItem value="easy">سهل</SelectItem>
                  <SelectItem value="medium">متوسط</SelectItem>
                  <SelectItem value="hard">صعب</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">المنصة</label>
              <Select value={platformFilter} onValueChange={setPlatformFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع المنصات</SelectItem>
                  <SelectItem value="LeetCode">LeetCode</SelectItem>
                  <SelectItem value="Codeforces">Codeforces</SelectItem>
                  <SelectItem value="AtCoder">AtCoder</SelectItem>
                  <SelectItem value="HackerRank">HackerRank</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Problems List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredProblems.map((problem) => (
          <Card
            key={problem.id}
            className={`transition-all hover:shadow-md ${
              problem.solved ? "border-green-200 bg-green-50/30" : ""
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse mb-2">
                    {problem.solved && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                    <h3 className="text-lg font-semibold">{problem.title}</h3>
                    <Badge variant="outline">{problem.platform}</Badge>
                  </div>

                  <div className="flex items-center space-x-4 rtl:space-x-reverse mb-3">
                    <Badge className={getDifficultyColor(problem.difficulty)}>
                      {getDifficultyText(problem.difficulty)}
                    </Badge>
                    <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm text-gray-600">
                      <Star className="h-4 w-4" />
                      <span>{problem.points} نقطة</span>
                    </div>
                    <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>{problem.solvedCount} حل</span>
                    </div>
                    <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{problem.timeLimit}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {problem.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button
                  size="sm"
                  className="flex items-center space-x-2 rtl:space-x-reverse"
                >
                  <span>حل المسألة</span>
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProblems.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Code2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              لا توجد مسائل
            </h3>
            <p className="text-gray-600">
              لم يتم العثور على مسائل تطابق معايير البحث الخاصة بك.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
