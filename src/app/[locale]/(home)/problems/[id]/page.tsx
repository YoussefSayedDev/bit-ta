"use client";

import { AuthGuard } from "@/components/auth/auth-guard";
import { Header } from "@/components/layout/header";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/auth-context";
import { useProblem } from "@/hooks/use-problems";
import { submitSolution } from "@/lib/api/solutions";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Loader2,
  MemoryStickIcon as Memory,
  Play,
  Star,
  Users,
  XCircle,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

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

function ProblemContent() {
  const params = useParams();
  const { user } = useAuth();
  const { problem, stats, loading, error } = useProblem(params.id as string);

  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<any>(null);

  const handleSubmit = async () => {
    if (!user || !problem || !code.trim()) return;

    setSubmitting(true);
    setSubmitResult(null);

    try {
      const result = await submitSolution({
        problem_id: problem.id,
        user_id: user.id,
        code: code.trim(),
        language,
      });

      setSubmitResult(result);
    } catch (err) {
      setSubmitResult({
        error: err instanceof Error ? err.message : "حدث خطأ في إرسال الحل",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="space-y-3">
                    <Skeleton className="h-8 w-3/4" />
                    <div className="flex gap-2">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-20" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-64 w-full" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !problem) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error || "لم يتم العثور على المسألة"}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Problem Description */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <CardTitle className="text-2xl">{problem.title}</CardTitle>
                  <Badge className={getDifficultyColor(problem.difficulty)}>
                    {problem.difficulty}
                  </Badge>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    <Star className="w-3 h-3 ml-1" />
                    {problem.points} نقطة
                  </Badge>
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{problem.time_limit / 1000} ثانية</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Memory className="w-4 h-4" />
                    <span>{problem.memory_limit} MB</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{stats?.acceptedSolutions || 0} حل مقبول</span>
                  </div>
                  <Badge variant="secondary">{problem.category}</Badge>
                </div>
              </CardHeader>

              <CardContent>
                <Tabs defaultValue="description" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="description">الوصف</TabsTrigger>
                    <TabsTrigger value="input-output">
                      المدخلات والمخرجات
                    </TabsTrigger>
                    <TabsTrigger value="examples">أمثلة</TabsTrigger>
                  </TabsList>

                  <TabsContent value="description" className="mt-6">
                    <div className="prose prose-sm max-w-none">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {problem.description}
                      </p>
                      {problem.constraints && (
                        <div className="mt-4">
                          <h4 className="font-semibold text-gray-800 mb-2">
                            القيود:
                          </h4>
                          <p className="text-gray-600 whitespace-pre-wrap">
                            {problem.constraints}
                          </p>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="input-output" className="mt-6">
                    <div className="space-y-4">
                      {problem.input_format && (
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">
                            تنسيق المدخلات:
                          </h4>
                          <p className="text-gray-600 whitespace-pre-wrap bg-gray-50 p-3 rounded">
                            {problem.input_format}
                          </p>
                        </div>
                      )}
                      {problem.output_format && (
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">
                            تنسيق المخرجات:
                          </h4>
                          <p className="text-gray-600 whitespace-pre-wrap bg-gray-50 p-3 rounded">
                            {problem.output_format}
                          </p>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="examples" className="mt-6">
                    <div className="space-y-4">
                      {problem.sample_input && problem.sample_output && (
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-3">
                            مثال:
                          </h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <h5 className="font-medium text-gray-700 mb-2">
                                المدخل:
                              </h5>
                              <pre className="bg-gray-50 p-3 rounded text-sm font-mono">
                                {problem.sample_input}
                              </pre>
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-700 mb-2">
                                المخرج:
                              </h5>
                              <pre className="bg-gray-50 p-3 rounded text-sm font-mono">
                                {problem.sample_output}
                              </pre>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Statistics */}
            {stats && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">إحصائيات المسألة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        {stats.acceptedSolutions}
                      </div>
                      <div className="text-sm text-gray-600">حل مقبول</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-800">
                        {stats.totalAttempts}
                      </div>
                      <div className="text-sm text-gray-600">
                        إجمالي المحاولات
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">
                        {stats.successRate}%
                      </div>
                      <div className="text-sm text-gray-600">معدل النجاح</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Code Editor */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">محرر الكود</CardTitle>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                      <SelectItem value="cpp">C++</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    placeholder="اكتب كودك هنا..."
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="min-h-[300px] font-mono text-sm"
                  />

                  <div className="flex gap-2">
                    <Button
                      onClick={handleSubmit}
                      disabled={submitting || !code.trim()}
                      className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin ml-2" />
                          جاري الإرسال...
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 ml-2" />
                          إرسال الحل
                        </>
                      )}
                    </Button>
                    <Button variant="outline">تشغيل تجريبي</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Result */}
            {submitResult && (
              <Card>
                <CardContent className="pt-6">
                  {submitResult.error ? (
                    <Alert variant="destructive">
                      <XCircle className="h-4 w-4" />
                      <AlertDescription>{submitResult.error}</AlertDescription>
                    </Alert>
                  ) : (
                    <Alert className="border-green-200 bg-green-50">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800">
                        تم إرسال الحل بنجاح! سيتم تقييمه قريباً.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProblemPage() {
  return (
    <AuthGuard>
      <ProblemContent />
    </AuthGuard>
  );
}
