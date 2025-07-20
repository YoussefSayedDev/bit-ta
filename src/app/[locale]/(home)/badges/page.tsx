import { Header } from "@/components/layout/header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Award,
  Crown,
  Flame,
  Lock,
  Shield,
  Star,
  Target,
  Trophy,
  Zap,
} from "lucide-react";

const earnedBadges = [
  {
    id: 1,
    name: "المبتدئ",
    description: "حل أول مسألة برمجية",
    icon: Star,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
    earnedDate: "2024-01-15",
    rarity: "شائع",
  },
  {
    id: 2,
    name: "حلال المسائل",
    description: "حل 10 مسائل برمجية",
    icon: Target,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    earnedDate: "2024-02-01",
    rarity: "شائع",
  },
  {
    id: 3,
    name: "السريع",
    description: "حل مسألة في أقل من دقيقة",
    icon: Zap,
    color: "text-green-600",
    bgColor: "bg-green-100",
    earnedDate: "2024-02-10",
    rarity: "نادر",
  },
  {
    id: 4,
    name: "المثابر",
    description: "حل مسائل لمدة 7 أيام متتالية",
    icon: Flame,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    earnedDate: "2024-02-20",
    rarity: "نادر",
  },
];

const availableBadges = [
  {
    id: 5,
    name: "الخبير",
    description: "حل 50 مسألة برمجية",
    icon: Award,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    progress: 32,
    total: 50,
    rarity: "نادر جداً",
  },
  {
    id: 6,
    name: "الأسطورة",
    description: "حل 100 مسألة برمجية",
    icon: Crown,
    color: "text-red-600",
    bgColor: "bg-red-100",
    progress: 32,
    total: 100,
    rarity: "أسطوري",
  },
  {
    id: 7,
    name: "المدافع",
    description: "ساعد 10 طلاب في حل المسائل",
    icon: Shield,
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
    progress: 3,
    total: 10,
    rarity: "نادر",
  },
  {
    id: 8,
    name: "البطل",
    description: "احتل المركز الأول في مسابقة",
    icon: Trophy,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
    progress: 0,
    total: 1,
    rarity: "أسطوري",
  },
];

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case "شائع":
      return "bg-gray-100 text-gray-800";
    case "نادر":
      return "bg-blue-100 text-blue-800";
    case "نادر جداً":
      return "bg-purple-100 text-purple-800";
    case "أسطوري":
      return "bg-gradient-to-r from-yellow-400 to-orange-500 text-white";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function BadgesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            الشارات والإنجازات
          </h1>
          <p className="text-gray-600">اعرض إنجازاتك واكتشف التحديات الجديدة</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800 mb-2">4</div>
                <div className="text-sm text-gray-600">شارات مكتسبة</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800 mb-2">4</div>
                <div className="text-sm text-gray-600">شارات متاحة</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800 mb-2">50%</div>
                <div className="text-sm text-gray-600">معدل الإنجاز</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Earned Badges */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            الشارات المكتسبة
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {earnedBadges.map((badge) => {
              const IconComponent = badge.icon;
              return (
                <Card
                  key={badge.id}
                  className="text-center hover:shadow-lg transition-shadow"
                >
                  <CardContent className="pt-6">
                    <div
                      className={`w-16 h-16 ${badge.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
                    >
                      <IconComponent className={`w-8 h-8 ${badge.color}`} />
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">
                      {badge.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {badge.description}
                    </p>
                    <Badge
                      className={getRarityColor(badge.rarity)}
                      variant="secondary"
                    >
                      {badge.rarity}
                    </Badge>
                    <div className="text-xs text-gray-500 mt-2">
                      تم الحصول عليها في {badge.earnedDate}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Available Badges */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            الشارات المتاحة
          </h2>
          <div className="grid gap-6">
            {availableBadges.map((badge) => {
              const IconComponent = badge.icon;
              const progressPercentage = (badge.progress / badge.total) * 100;

              return (
                <Card
                  key={badge.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-6">
                      <div
                        className={`w-16 h-16 ${badge.bgColor} rounded-full flex items-center justify-center relative`}
                      >
                        <IconComponent className={`w-8 h-8 ${badge.color}`} />
                        {progressPercentage === 0 && (
                          <div className="absolute inset-0 bg-gray-200 bg-opacity-75 rounded-full flex items-center justify-center">
                            <Lock className="w-6 h-6 text-gray-500" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-800">
                            {badge.name}
                          </h3>
                          <Badge
                            className={getRarityColor(badge.rarity)}
                            variant="secondary"
                          >
                            {badge.rarity}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-3">
                          {badge.description}
                        </p>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">التقدم</span>
                            <span className="font-medium">
                              {badge.progress} / {badge.total}
                            </span>
                          </div>
                          <Progress
                            value={progressPercentage}
                            className="h-2"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
