import { Header } from "@/components/layout/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock, Filter, Search, Star, Users } from "lucide-react";

const problems = [
  {
    id: 1,
    title: "جمع رقمين",
    difficulty: "مبتدئ",
    points: 10,
    solved: 1250,
    timeLimit: "1 ثانية",
    category: "رياضيات",
    description: "اكتب برنامج لجمع رقمين صحيحين",
  },
  {
    id: 2,
    title: "البحث في المصفوفة",
    difficulty: "متوسط",
    points: 25,
    solved: 850,
    timeLimit: "2 ثانية",
    category: "مصفوفات",
    description: "ابحث عن عنصر معين في مصفوفة مرتبة",
  },
  {
    id: 3,
    title: "خوارزمية الترتيب السريع",
    difficulty: "متقدم",
    points: 50,
    solved: 320,
    timeLimit: "3 ثواني",
    category: "خوارزميات",
    description: "تطبيق خوارزمية الترتيب السريع",
  },
  {
    id: 4,
    title: "حساب المضروب",
    difficulty: "مبتدئ",
    points: 15,
    solved: 980,
    timeLimit: "1 ثانية",
    category: "رياضيات",
    description: "احسب مضروب رقم معطى",
  },
  {
    id: 5,
    title: "أطول تسلسل مشترك",
    difficulty: "متقدم",
    points: 75,
    solved: 150,
    timeLimit: "5 ثواني",
    category: "برمجة ديناميكية",
    description: "إيجاد أطول تسلسل فرعي مشترك بين نصين",
  },
  {
    id: 6,
    title: "التحقق من الأرقام الأولية",
    difficulty: "متوسط",
    points: 20,
    solved: 650,
    timeLimit: "2 ثانية",
    category: "رياضيات",
    description: "تحقق من كون الرقم أولياً أم لا",
  },
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "مبتدئ":
      return "bg-green-100 text-green-800";
    case "متوسط":
      return "bg-yellow-100 text-yellow-800";
    case "متقدم":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function ProblemsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            المسائل البرمجية
          </h1>
          <p className="text-gray-600">
            اختبر مهاراتك وطور قدراتك من خلال حل المسائل المتنوعة
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input placeholder="ابحث عن المسائل..." className="pr-10" />
                </div>
              </div>

              <Select>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="المستوى" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع المستويات</SelectItem>
                  <SelectItem value="beginner">مبتدئ</SelectItem>
                  <SelectItem value="intermediate">متوسط</SelectItem>
                  <SelectItem value="advanced">متقدم</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="التصنيف" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع التصنيفات</SelectItem>
                  <SelectItem value="math">رياضيات</SelectItem>
                  <SelectItem value="arrays">مصفوفات</SelectItem>
                  <SelectItem value="algorithms">خوارزميات</SelectItem>
                  <SelectItem value="dp">برمجة ديناميكية</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline">
                <Filter className="w-4 h-4 ml-2" />
                تصفية
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Problems Grid */}
        <div className="grid gap-6">
          {problems.map((problem) => (
            <Card
              key={problem.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {problem.title}
                      </h3>
                      <Badge className={getDifficultyColor(problem.difficulty)}>
                        {problem.difficulty}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-700"
                      >
                        <Star className="w-3 h-3 ml-1" />
                        {problem.points} نقطة
                      </Badge>
                    </div>

                    <p className="text-gray-600 mb-3">{problem.description}</p>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{problem.solved} حل</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{problem.timeLimit}</span>
                      </div>
                      <Badge variant="secondary">{problem.category}</Badge>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      ابدأ الآن
                    </Button>
                    <Button variant="outline" size="sm">
                      عرض التفاصيل
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            تحميل المزيد من المسائل
          </Button>
        </div>
      </div>
    </div>
  );
}
