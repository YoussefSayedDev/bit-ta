-- إعداد Row Level Security (RLS)

-- تفعيل RLS على الجداول
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE solutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE friendships ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- سياسات جدول المستخدمين
CREATE POLICY "المستخدمون يمكنهم قراءة ملفاتهم الشخصية" ON users
  FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "المستخدمون يمكنهم تحديث ملفاتهم الشخصية" ON users
  FOR UPDATE USING (auth.uid()::text = id::text);

CREATE POLICY "الجميع يمكنهم قراءة البيانات العامة للمستخدمين" ON users
  FOR SELECT USING (true);

-- سياسات جدول المسائل
CREATE POLICY "الجميع يمكنهم قراءة المسائل المنشورة" ON problems
  FOR SELECT USING (status = 'منشور');

CREATE POLICY "المشرفون يمكنهم إدارة المسائل" ON problems
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text AND is_admin = true
    )
  );

-- سياسات جدول الحلول
CREATE POLICY "المستخدمون يمكنهم قراءة حلولهم" ON solutions
  FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "المستخدمون يمكنهم إرسال حلول" ON solutions
  FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "المشرفون يمكنهم قراءة جميع الحلول" ON solutions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text AND is_admin = true
    )
  );

-- سياسات جدول الشارات
CREATE POLICY "الجميع يمكنهم قراءة الشارات" ON badges
  FOR SELECT USING (true);

CREATE POLICY "المشرفون يمكنهم إدارة الشارات" ON badges
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text AND is_admin = true
    )
  );

-- سياسات جدول شارات المستخدمين
CREATE POLICY "المستخدمون يمكنهم قراءة شاراتهم" ON user_badges
  FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "الجميع يمكنهم قراءة شارات الآخرين" ON user_badges
  FOR SELECT USING (true);

-- سياسات جدول الأصدقاء
CREATE POLICY "المستخدمون يمكنهم إدارة صداقاتهم" ON friendships
  FOR ALL USING (
    auth.uid()::text = user_id::text OR auth.uid()::text = friend_id::text
  );

-- سياسات جدول المقالات
CREATE POLICY "الجميع يمكنهم قراءة المقالات المنشورة" ON articles
  FOR SELECT USING (status = 'منشور');

CREATE POLICY "الكتاب يمكنهم إدارة مقالاتهم" ON articles
  FOR ALL USING (auth.uid()::text = author_id::text);

CREATE POLICY "المشرفون يمكنهم إدارة جميع المقالات" ON articles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text AND is_admin = true
    )
  );

-- سياسات جدول الأخبار
CREATE POLICY "الجميع يمكنهم قراءة الأخبار المنشورة" ON news
  FOR SELECT USING (status = 'منشور');

CREATE POLICY "المشرفون يمكنهم إدارة الأخبار" ON news
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text AND is_admin = true
    )
  );

-- سياسات جدول التعليقات
CREATE POLICY "الجميع يمكنهم قراءة التعليقات" ON comments
  FOR SELECT USING (true);

CREATE POLICY "المستخدمون المسجلون يمكنهم إضافة تعليقات" ON comments
  FOR INSERT WITH CHECK (auth.uid()::text = author_id::text);

CREATE POLICY "المستخدمون يمكنهم تعديل تعليقاتهم" ON comments
  FOR UPDATE USING (auth.uid()::text = author_id::text);

CREATE POLICY "المستخدمون يمكنهم حذف تعليقاتهم" ON comments
  FOR DELETE USING (auth.uid()::text = author_id::text);
