"use client";
import { Award, Code, TrendingUp, Trophy, Users } from "lucide-react";
import { useState } from "react";

const user = {
  full_name: "Ahmed",
  total_points: 1250,
  current_rank: 1,
};

export default function Home() {
  // const { user } = useAuth();
  const [stats, setStats] = useState({
    total_users: 0,
    active_users: 0,
    platform_usage: {
      codeforces: 0,
      github: 0,
    },
  });
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchStats = async () => {
  //     try {
  //       const response = await ApiService.getLeaderboardStats();
  //       setStats(response);
  //     } catch (error) {
  //       console.error("Error fetching stats:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchStats();
  // }, []);

  const features = [
    {
      icon: Trophy,
      title: "نظام الترتيب",
      description: "تنافس مع زملائك وتصدر قائمة المتفوقين",
      color: "text-yellow-500",
    },
    {
      icon: Code,
      title: "بنك المشاكل",
      description: "مجموعة متنوعة من المشاكل البرمجية لتطوير مهاراتك",
      color: "text-blue-500",
    },
    {
      icon: TrendingUp,
      title: "تتبع التقدم",
      description: "راقب تحسن مستواك في منصات البرمجة المختلفة",
      color: "text-green-500",
    },
    {
      icon: Award,
      title: "نظام الشارات",
      description: "احصل على شارات للإنجازات والتحديات المكتملة",
      color: "text-purple-500",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
          مرحباً بك في{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Bit-ta
          </span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
          منصة تفاعلية لتطوير مهارات البرمجة وتتبع التقدم في منصات البرمجة
          المختلفة
        </p>

        {user && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 max-w-md mx-auto border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              أهلاً بك، {user.full_name}!
            </h3>
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>النقاط الحالية: {user.total_points}</span>
              <span>الترتيب: #{user.current_rank || "غير محدد"}</span>
            </div>
          </div>
        )}
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="mr-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {loading ? "..." : stats.total_users}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                إجمالي المستخدمين
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <div className="mr-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {loading ? "..." : stats.active_users}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                المستخدمون النشطون
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <Code className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="mr-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {loading ? "..." : stats.platform_usage?.codeforces || 0}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                مستخدمو Codeforces
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
              <Trophy className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="mr-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {loading ? "..." : stats.platform_usage?.github || 0}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">مستخدمو GitHub</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
          ميزات المنصة
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"
            >
              <div
                className={`p-3 rounded-lg w-fit mb-4 ${feature.color
                  .replace("text-", "bg-")
                  .replace("500", "100")} dark:${feature.color
                  .replace("text-", "bg-")
                  .replace("500", "900/20")}`}
              >
                <feature.icon className={`h-8 w-8 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">ابدأ رحلتك البرمجية الآن</h2>
        <p className="text-xl mb-6 opacity-90">
          انضم إلى آلاف المبرمجين وطور مهاراتك مع Bit-ta
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/problems"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            تصفح المشاكل
          </a>
          <a
            href="/top"
            className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
          >
            عرض المتصدرين
          </a>
        </div>
      </div>
    </div>
  );
}
