import { Header } from "@/components/layout/header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import {
  ArrowLeft,
  Calendar,
  Clock,
  Eye,
  Heart,
  MessageCircle,
  Search,
} from "lucide-react";
import Image from "next/image";

const blogPosts = [
  {
    id: 1,
    title: "دليل المبتدئين لتعلم البرمجة من الصفر",
    excerpt:
      "خطوات عملية ونصائح مهمة للبدء في رحلة تعلم البرمجة بطريقة صحيحة وفعالة",
    content:
      "البرمجة أصبحت من أهم المهارات في العصر الحديث، وتعلمها يفتح أبواب كثيرة...",
    image: "/placeholder.svg?height=200&width=400",
    author: {
      name: "أحمد محمد",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "مطور Full Stack",
    },
    date: "2024-01-20",
    readTime: "5 دقائق",
    category: "تعليمي",
    tags: ["مبتدئين", "أساسيات", "نصائح"],
    views: 2340,
    likes: 156,
    comments: 23,
    featured: true,
  },
  {
    id: 2,
    title: "أفضل الممارسات في كتابة الكود النظيف",
    excerpt:
      "تعلم كيفية كتابة كود قابل للقراءة والصيانة باتباع أفضل الممارسات المعترف بها",
    content:
      "الكود النظيف ليس مجرد كود يعمل، بل كود يمكن فهمه وصيانته بسهولة...",
    image: "/placeholder.svg?height=200&width=400",
    author: {
      name: "فاطمة علي",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "مهندسة برمجيات",
    },
    date: "2024-01-18",
    readTime: "8 دقائق",
    category: "تطوير",
    tags: ["كود نظيف", "أفضل الممارسات", "جودة"],
    views: 1890,
    likes: 134,
    comments: 18,
    featured: false,
  },
  {
    id: 3,
    title: "مقدمة في خوارزميات البحث والترتيب",
    excerpt:
      "شرح مبسط لأهم خوارزميات البحث والترتيب مع أمثلة عملية وتحليل الأداء",
    content: "خوارزميات البحث والترتيب من الأساسيات المهمة في علوم الحاسوب...",
    image: "/placeholder.svg?height=200&width=400",
    author: {
      name: "محمد حسن",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "أستاذ علوم حاسوب",
    },
    date: "2024-01-15",
    readTime: "12 دقيقة",
    category: "خوارزميات",
    tags: ["خوارزميات", "بحث", "ترتيب"],
    views: 1560,
    likes: 98,
    comments: 15,
    featured: false,
  },
  {
    id: 4,
    title: "كيف تستعد لمقابلات العمل التقنية؟",
    excerpt:
      "نصائح وإرشادات للتحضير الجيد لمقابلات العمل في مجال البرمجة والتكنولوجيا",
    content: "مقابلات العمل التقنية تتطلب تحضير خاص ومهارات معينة...",
    image: "/placeholder.svg?height=200&width=400",
    author: {
      name: "سارة أحمد",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "مديرة تقنية",
    },
    date: "2024-01-12",
    readTime: "10 دقائق",
    category: "مهني",
    tags: ["مقابلات", "وظائف", "تحضير"],
    views: 2100,
    likes: 187,
    comments: 31,
    featured: false,
  },
  {
    id: 5,
    title: "مشروعي الأول: تطبيق إدارة المهام",
    excerpt: "قصة تطوير أول تطبيق ويب والدروس المستفادة من التجربة",
    content:
      "أشارك معكم تجربتي في تطوير أول تطبيق ويب والتحديات التي واجهتها...",
    image: "/placeholder.svg?height=200&width=400",
    author: {
      name: "عمر خالد",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "طالب هندسة",
    },
    date: "2024-01-10",
    readTime: "6 دقائق",
    category: "تجارب",
    tags: ["مشاريع", "تجربة شخصية", "تعلم"],
    views: 980,
    likes: 76,
    comments: 12,
    featured: false,
  },
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case "تعليمي":
      return "bg-blue-100 text-blue-800";
    case "تطوير":
      return "bg-green-100 text-green-800";
    case "خوارزميات":
      return "bg-purple-100 text-purple-800";
    case "مهني":
      return "bg-orange-100 text-orange-800";
    case "تجارب":
      return "bg-pink-100 text-pink-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function BlogPage() {
  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">المدونة</h1>
          <p className="text-gray-600">
            مقالات ونصائح مفيدة في عالم البرمجة والتكنولوجيا
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input placeholder="ابحث في المقالات..." className="pr-10" />
                </div>
              </div>

              <Select>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="التصنيف" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع التصنيفات</SelectItem>
                  <SelectItem value="educational">تعليمي</SelectItem>
                  <SelectItem value="development">تطوير</SelectItem>
                  <SelectItem value="algorithms">خوارزميات</SelectItem>
                  <SelectItem value="career">مهني</SelectItem>
                  <SelectItem value="experiences">تجارب</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="ترتيب حسب" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">الأحدث</SelectItem>
                  <SelectItem value="popular">الأكثر شعبية</SelectItem>
                  <SelectItem value="mostViewed">الأكثر مشاهدة</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Featured Post */}
        {featuredPost && (
          <Card className="mb-8 overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <Image
                  src={featuredPost.image || "/placeholder.svg"}
                  alt={featuredPost.title}
                  width={400}
                  height={200}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className={getCategoryColor(featuredPost.category)}>
                    {featuredPost.category}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-yellow-50 text-yellow-700 border-yellow-200"
                  >
                    مقال مميز
                  </Badge>
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage
                        src={featuredPost.author.avatar || "/placeholder.svg"}
                      />
                      <AvatarFallback>
                        {featuredPost.author.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium text-gray-800">
                        {featuredPost.author.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {featuredPost.author.role}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{featuredPost.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{featuredPost.views}</span>
                    </div>
                  </div>

                  <Button>
                    اقرأ المقال
                    <ArrowLeft className="w-4 h-4 mr-2" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Regular Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularPosts.map((post) => (
            <Card
              key={post.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <Badge
                  className={`absolute top-3 right-3 ${getCategoryColor(
                    post.category
                  )}`}
                >
                  {post.category}
                </Badge>
              </div>

              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-2 mb-4">
                  <Avatar className="w-6 h-6">
                    <AvatarImage
                      src={post.author.avatar || "/placeholder.svg"}
                    />
                    <AvatarFallback className="text-xs">
                      {post.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-xs text-gray-600">
                    {post.author.name}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span>{post.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {post.tags.slice(0, 2).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button variant="outline" className="w-full bg-transparent">
                  اقرأ المقال
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            تحميل المزيد من المقالات
          </Button>
        </div>
      </div>
    </div>
  );
}
