"use client";

import { AuthGuard } from "@/components/auth/auth-guard";
import { Header } from "@/components/layout/header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/auth-context";
import { getUserBadgeProgress } from "@/lib/api/badges";
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
import { useEffect, useState } from "react";

const iconMap = {
  Star,
  Target,
  Zap,
  Flame,
  Award,
  Crown,
  Shield,
  Trophy,
};

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

function BadgesContent() {
  const { user } = useAuth();
  const [badges, setBadges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBadges() {
      if (!user) return;

      try {
        setLoading(true);
        const badgeProgress = await getUserBadgeProgress(user.id);
        setBadges(badgeProgress);
      } catch (err) {
        setError(err instanceof Error ? err.message : "حدث خطأ");
      } finally {
        setLoading(false);
      }
    }

    fetchBadges();
  }, [user]);

  const earnedBadges = badges.filter((badge) => badge.isEarned);
  const availableBadges = badges.filter((badge) => !badge.isEarned);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-96" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-24" />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-48" />
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
                <div className="text-3xl font-bold text-gray-800 mb-2">
                  {earnedBadges.length}
                </div>
                <div className="text-sm text-gray-600">شارات مكتسبة</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800 mb-2">
                  {availableBadges.length}
                </div>
                <div className="text-sm text-gray-600">شارات متاحة</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800 mb-2">
                  {badges.length > 0
                    ? Math.round((earnedBadges.length / badges.length) * 100)
                    : 0}
                  %
                </div>
                <div className="text-sm text-gray-600">معدل الإنجاز</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Earned Badges */}
        {earnedBadges.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              الشارات المكتسبة
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {earnedBadges.map((badge) => {
                const IconComponent =
                  iconMap[badge.icon as keyof typeof iconMap] || Trophy;
                return (
                  <Card
                    key={badge.id}
                    className="text-center hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="pt-6">
                      <div
                        className={`w-16 h-16 ${badge.color
                          .replace("text-", "bg-")
                          .replace(
                            "-600",
                            "-100"
                          )} rounded-full flex items-center justify-center mx-auto mb-4`}
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
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Available Badges */}
        {availableBadges.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              الشارات المتاحة
            </h2>
            <div className="grid gap-6">
              {availableBadges.map((badge) => {
                const IconComponent =
                  iconMap[badge.icon as keyof typeof iconMap] || Trophy;

                return (
                  <Card
                    key={badge.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-6">
                        <div
                          className={`w-16 h-16 ${badge.color
                            .replace("text-", "bg-")
                            .replace(
                              "-600",
                              "-100"
                            )} rounded-full flex items-center justify-center relative`}
                        >
                          <IconComponent className={`w-8 h-8 ${badge.color}`} />
                          {badge.progressPercentage === 0 && (
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
                              value={badge.progressPercentage}
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
        )}

        {/* Empty State */}
        {badges.length === 0 && !loading && (
          <Card className="text-center py-12">
            <CardContent>
              <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                لا توجد شارات
              </h3>
              <p className="text-gray-600">
                ابدأ بحل المسائل لكسب شاراتك الأولى!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default function BadgesPage() {
  return (
    <AuthGuard>
      <BadgesContent />
    </AuthGuard>
  );
}
