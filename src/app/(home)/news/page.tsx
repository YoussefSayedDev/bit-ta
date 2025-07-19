import { Header } from "@/components/layout/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock, Eye, Star, User } from "lucide-react";
import Image from "next/image";

const news = [
  {
    id: 1,
    title: "إطلاق مسابقة البرمجة الكبرى 2024",
    excerpt:
      "انضم إلى أكبر مسابقة برمجة في الوطن العربي واربح جوائز قيمة تصل إلى 50,000 جنيه",
    content:
      "نعلن بفخر عن إطلاق مسابقة البرمجة الكبرى 2024، والتي تهدف إلى اكتشاف أفضل المواهب البرمجية في الوطن العربي...",
    image: "/placeholder.svg?height=200&width=400",
    author: "فريق المنصة",
    date: "2024-01-20",
    category: "مسابقات",
    views: 1250,
    featured: true,
  },
  {
    id: 2,
    title: "تحديث جديد: إضافة لغة Python للمسائل",
    excerpt:
      "يمكنك الآن حل جميع المسائل باستخدام لغة Python بالإضافة إلى اللغات المتاحة",
    content:
      "استجابة لطلبات المستخدمين، قمنا بإضافة دعم كامل للغة Python في جميع المسائل البرمجية...",
    image: "/placeholder.svg?height=200&width=400",
    author: "أحمد محمد",
    date: "2024-01-18",
    category: "تحديثات",
    views: 890,
    featured: false,
  },
  {
    id: 3,
    title: "ورشة عمل: أساسيات خوارزميات البحث",
    excerpt:
      "ورشة عمل مجانية عبر الإنترنت لتعلم أساسيات خوارزميات البحث والترتيب",
    content:
      "ندعوكم للمشاركة في ورشة العمل المجانية حول أساسيات خوارزميات البحث والترتيب...",
    image: "/placeholder.svg?height=200&width=400",
    author: "د. فاطمة علي",
    date: "2024-01-15",
    category: "فعاليات",
    views: 650,
    featured: false,
  },
  {
    id: 4,
    title: "تهانينا للفائزين في مسابقة الشهر",
    excerpt:
      "نبارك للطلاب الفائزين في مسابقة شهر ديسمبر ونتطلع لمشاركتكم في المسابقات القادمة",
    content: "نتقدم بأحر التهاني للطلاب الفائزين في مسابقة شهر ديسمبر...",
    image: "/placeholder.svg?height=200&width=400",
    author: "فريق المنصة",
    date: "2024-01-10",
    category: "إعلانات",
    views: 420,
    featured: false,
  },
  {
    id: 5,
    title: "نصائح لحل المسائل البرمجية بكفاءة",
    excerpt:
      "مجموعة من النصائح والاستراتيجيات لتحسين أدائك في حل المسائل البرمجية",
    content:
      "تعرف على أفضل الممارسات والتقنيات التي يستخدمها المبرمجون المحترفون...",
    image: "/placeholder.svg?height=200&width=400",
    author: "محمد حسن",
    date: "2024-01-08",
    category: "نصائح",
    views: 780,
    featured: false,
  },
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case "مسابقات":
      return "bg-red-100 text-red-800";
    case "تحديثات":
      return "bg-blue-100 text-blue-800";
    case "فعاليات":
      return "bg-green-100 text-green-800";
    case "إعلانات":
      return "bg-purple-100 text-purple-800";
    case "نصائح":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function NewsPage() {
  const featuredNews = news.find((item) => item.featured);
  const regularNews = news.filter((item) => !item.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            الأخبار والإعلانات
          </h1>
          <p className="text-gray-600">
            آخر الأخبار والتحديثات من منصة البرمجة
          </p>
        </div>

        {/* Featured News */}
        {featuredNews && (
          <Card className="mb-8 overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <Image
                  src={featuredNews.image || "/placeholder.svg"}
                  alt={featuredNews.title}
                  width={400}
                  height={200}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className={getCategoryColor(featuredNews.category)}>
                    {featuredNews.category}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-yellow-50 text-yellow-700 border-yellow-200"
                  >
                    <Star className="w-3 h-3 ml-1" />
                    مميز
                  </Badge>
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  {featuredNews.title}
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {featuredNews.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{featuredNews.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{featuredNews.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{featuredNews.views}</span>
                    </div>
                  </div>

                  <Button>
                    اقرأ المزيد
                    <ArrowLeft className="w-4 h-4 mr-2" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Regular News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularNews.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <Badge
                  className={`absolute top-3 right-3 ${getCategoryColor(
                    item.category
                  )}`}
                >
                  {item.category}
                </Badge>
              </div>

              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {item.excerpt}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    <span>{item.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{item.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>{item.views}</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full bg-transparent">
                  اقرأ المزيد
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            تحميل المزيد من الأخبار
          </Button>
        </div>
      </div>
    </div>
  );
}
