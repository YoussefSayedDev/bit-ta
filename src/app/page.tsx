import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Award,
  BookOpen,
  Code,
  Target,
  TrendingUp,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50"
      dir="rtl"
    >
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            تعلم البرمجة مع
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              مجتمعك
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            منصة تفاعلية تجمع الطلاب العرب لتعلم البرمجة وحل المسائل في بيئة
            داعمة ومحفزة
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-3"
              >
                ابدأ رحلتك مجاناً
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-3 bg-transparent"
              >
                تسجيل الدخول
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800">15,000+</div>
                <div className="text-sm text-gray-600">طالب نشط</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800">500+</div>
                <div className="text-sm text-gray-600">مسألة برمجية</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800">50,000+</div>
                <div className="text-sm text-gray-600">حل مقبول</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800">95%</div>
                <div className="text-sm text-gray-600">معدل النجاح</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              لماذا تختار منصتنا؟
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              نوفر لك كل ما تحتاجه لتطوير مهاراتك البرمجية
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <Code className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <CardTitle className="mb-4">مسائل متدرجة</CardTitle>
              <p className="text-gray-600">
                مسائل مصممة بعناية من المستوى المبتدئ إلى المتقدم لضمان التطور
                التدريجي
              </p>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <Target className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <CardTitle className="mb-4">تتبع التقدم</CardTitle>
              <p className="text-gray-600">
                نظام شامل لتتبع تقدمك وإنجازاتك مع إحصائيات مفصلة
              </p>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <Award className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <CardTitle className="mb-4">نظام المكافآت</CardTitle>
              <p className="text-gray-600">
                اكسب النقاط والشارات واحتل مراكز متقدمة في لوحة المتصدرين
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            جاهز لتبدأ رحلتك؟
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            انضم إلى آلاف الطلاب الذين يطورون مهاراتهم البرمجية يومياً
          </p>
          <Link href="/register">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3"
            >
              <Zap className="w-5 h-5 ml-2" />
              ابدأ الآن مجاناً
            </Button>
          </Link>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              فريق العمل
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              مجموعة من المطورين والمعلمين المتخصصين اللي هدفهم مساعدتك تحقق
              أهدافك في البرمجة
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <Image
                src="/placeholder.svg?height=120&width=120"
                alt="أحمد محمد"
                width={120}
                height={120}
                className="rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                أحمد محمد
              </h3>
              <p className="text-blue-600 font-medium mb-3">مطور Full Stack</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                خبرة 8 سنوات في تطوير التطبيقات، متخصص في React و Node.js
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <Image
                src="/placeholder.svg?height=120&width=120"
                alt="فاطمة علي"
                width={120}
                height={120}
                className="rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                فاطمة علي
              </h3>
              <p className="text-purple-600 font-medium mb-3">مطورة Frontend</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                متخصصة في تصميم واجهات المستخدم وتجربة المستخدم، خبرة في Vue.js
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <Image
                src="/placeholder.svg?height=120&width=120"
                alt="محمد حسن"
                width={120}
                height={120}
                className="rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-gray-800 mb-2">محمد حسن</h3>
              <p className="text-green-600 font-medium mb-3">مهندس بيانات</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                خبير في الذكاء الاصطناعي وتحليل البيانات، متخصص في Python و ML
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              ماذا قالوا عنا؟
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              آراء طلابنا اللي حققوا نجاحات مميزة معانا
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <Image
                  src="/placeholder.svg?height=50&width=50"
                  alt="سارة أحمد"
                  width={50}
                  height={50}
                  className="rounded-full ml-3 object-cover"
                />
                <div>
                  <h4 className="font-bold text-gray-800">سارة أحمد</h4>
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="w-4 h-4 fill-current">
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                "المنصة ساعدتني أتعلم البرمجة من الصفر، والمجتمع كان داعم جداً.
                دلوقتي بشتغل كمطورة في شركة تقنية كبيرة!"
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <Image
                  src="/placeholder.svg?height=50&width=50"
                  alt="عمر خالد"
                  width={50}
                  height={50}
                  className="rounded-full ml-3 object-cover"
                />
                <div>
                  <h4 className="font-bold text-gray-800">عمر خالد</h4>
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="w-4 h-4 fill-current">
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                "التحديات اليومية والمسابقات خلتني أحسن مهاراتي بسرعة. الآن عندي
                ثقة أكبر في قدراتي البرمجية."
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <Image
                  src="/placeholder.svg?height=50&width=50"
                  alt="نور محمود"
                  width={50}
                  height={50}
                  className="rounded-full ml-3 object-cover"
                />
                <div>
                  <h4 className="font-bold text-gray-800">نور محمود</h4>
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="w-4 h-4 fill-current">
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                "أفضل مكان لتعلم البرمجة! المحتوى منظم والمجتمع نشيط. حققت
                إنجازات ما كنت أتوقعها."
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              الأسئلة الشائعة
            </h2>
            <p className="text-xl text-gray-600">
              إجابات على أكثر الأسئلة اللي بتوصلنا
            </p>
          </div>

          <div className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center justify-between cursor-pointer">
                <h3 className="text-lg font-semibold text-gray-800">
                  هل المنصة مجانية؟
                </h3>
                <span className="w-5 h-5 text-gray-500">▼</span>
              </div>
              <p className="text-gray-600 mt-3 leading-relaxed">
                نعم، المنصة مجانية بالكامل للطلاب والمبتدئين. نوفر كل المحتوى
                والتحديات والمجتمع بدون أي رسوم.
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between cursor-pointer">
                <h3 className="text-lg font-semibold text-gray-800">
                  ما هي لغات البرمجة المتاحة؟
                </h3>
                <span className="w-5 h-5 text-gray-500">▼</span>
              </div>
              <p className="text-gray-600 mt-3 leading-relaxed">
                نغطي أشهر لغات البرمجة مثل Python، JavaScript، Java، C++،
                وغيرها. مع تحديثات مستمرة لإضافة لغات جديدة.
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between cursor-pointer">
                <h3 className="text-lg font-semibold text-gray-800">
                  كيف أبدأ كمبتدئ؟
                </h3>
                <span className="w-5 h-5 text-gray-500">▼</span>
              </div>
              <p className="text-gray-600 mt-3 leading-relaxed">
                ابدأ بإنشاء حساب، ثم اختار مسار التعلم المناسب لك. المنصة هترشدك
                خطوة بخطوة من البداية.
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between cursor-pointer">
                <h3 className="text-lg font-semibold text-gray-800">
                  هل يمكنني التفاعل مع طلاب آخرين؟
                </h3>
                <span className="w-5 h-5 text-gray-500">▼</span>
              </div>
              <p className="text-gray-600 mt-3 leading-relaxed">
                بالطبع! المنصة مصممة لتكون مجتمع تفاعلي. يمكنك إضافة أصدقاء،
                المشاركة في المناقشات، والتعاون في المشاريع.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold">منصة البرمجة</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                منصة تعليمية تفاعلية لتعلم البرمجة وبناء مجتمع من المطورين
                المبدعين
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-4">روابط سريعة</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    عن المنصة
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    التحديات
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    المدونة
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    المساعدة
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">المجتمع</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    المنتدى
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Discord
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Telegram
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    الفعاليات
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">تابعنا</h3>
              <div className="flex gap-4">
                <Link
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <span className="w-5 h-5">GitHub</span>
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <span className="w-5 h-5">Twitter</span>
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <span className="w-5 h-5">LinkedIn</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 منصة البرمجة. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
