-- إنشاء جدول المستخدمين
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  university VARCHAR(255),
  major VARCHAR(255),
  academic_year VARCHAR(50),
  programming_level VARCHAR(50) DEFAULT 'مبتدئ',
  bio TEXT,
  avatar_url TEXT,
  points INTEGER DEFAULT 0,
  rank INTEGER DEFAULT 0,
  streak_days INTEGER DEFAULT 0,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول المسائل البرمجية
CREATE TABLE IF NOT EXISTS problems (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  difficulty VARCHAR(50) NOT NULL CHECK (difficulty IN ('مبتدئ', 'متوسط', 'متقدم')),
  category VARCHAR(100) NOT NULL,
  points INTEGER NOT NULL DEFAULT 10,
  time_limit INTEGER DEFAULT 1000, -- بالميلي ثانية
  memory_limit INTEGER DEFAULT 256, -- بالميجابايت
  input_format TEXT,
  output_format TEXT,
  constraints TEXT,
  sample_input TEXT,
  sample_output TEXT,
  test_cases JSONB,
  status VARCHAR(50) DEFAULT 'مسودة' CHECK (status IN ('مسودة', 'منشور', 'مؤرشف')),
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول الحلول
CREATE TABLE IF NOT EXISTS solutions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  problem_id UUID REFERENCES problems(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  code TEXT NOT NULL,
  language VARCHAR(50) NOT NULL,
  status VARCHAR(50) DEFAULT 'قيد المراجعة' CHECK (status IN ('قيد المراجعة', 'مقبول', 'مرفوض', 'خطأ في التشغيل', 'تجاوز الوقت')),
  execution_time INTEGER, -- بالميلي ثانية
  memory_used INTEGER, -- بالكيلوبايت
  points_earned INTEGER DEFAULT 0,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول الشارات
CREATE TABLE IF NOT EXISTS badges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  icon VARCHAR(100) NOT NULL,
  color VARCHAR(50) NOT NULL,
  rarity VARCHAR(50) DEFAULT 'شائع' CHECK (rarity IN ('شائع', 'نادر', 'نادر جداً', 'أسطوري')),
  condition_type VARCHAR(100) NOT NULL, -- نوع الشرط
  condition_value JSONB NOT NULL, -- قيمة الشرط
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول شارات المستخدمين
CREATE TABLE IF NOT EXISTS user_badges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  badge_id UUID REFERENCES badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

-- إنشاء جدول الأصدقاء
CREATE TABLE IF NOT EXISTS friendships (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  friend_id UUID REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'معلق' CHECK (status IN ('معلق', 'مقبول', 'مرفوض')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, friend_id),
  CHECK (user_id != friend_id)
);

-- إنشاء جدول المقالات
CREATE TABLE IF NOT EXISTS articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  tags TEXT[] DEFAULT '{}',
  featured_image TEXT,
  author_id UUID REFERENCES users(id),
  status VARCHAR(50) DEFAULT 'مسودة' CHECK (status IN ('مسودة', 'منشور', 'مؤرشف')),
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  read_time INTEGER, -- بالدقائق
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول الأخبار
CREATE TABLE IF NOT EXISTS news (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  featured_image TEXT,
  author_id UUID REFERENCES users(id),
  status VARCHAR(50) DEFAULT 'مسودة' CHECK (status IN ('مسودة', 'منشور', 'مؤرشف')),
  views INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول التعليقات
CREATE TABLE IF NOT EXISTS comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  author_id UUID REFERENCES users(id) ON DELETE CASCADE,
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
