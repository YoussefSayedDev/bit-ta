export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          phone: string | null;
          university: string | null;
          major: string | null;
          academic_year: string | null;
          programming_level: string;
          bio: string | null;
          avatar_url: string | null;
          points: number;
          rank: number;
          streak_days: number;
          is_admin: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          full_name: string;
          phone?: string | null;
          university?: string | null;
          major?: string | null;
          academic_year?: string | null;
          programming_level?: string;
          bio?: string | null;
          avatar_url?: string | null;
          points?: number;
          rank?: number;
          streak_days?: number;
          is_admin?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          phone?: string | null;
          university?: string | null;
          major?: string | null;
          academic_year?: string | null;
          programming_level?: string;
          bio?: string | null;
          avatar_url?: string | null;
          points?: number;
          rank?: number;
          streak_days?: number;
          is_admin?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      problems: {
        Row: {
          id: string;
          title: string;
          description: string;
          difficulty: "مبتدئ" | "متوسط" | "متقدم";
          category: string;
          points: number;
          time_limit: number;
          memory_limit: number;
          input_format: string | null;
          output_format: string | null;
          constraints: string | null;
          sample_input: string | null;
          sample_output: string | null;
          test_cases: any | null;
          status: "مسودة" | "منشور" | "مؤرشف";
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          difficulty: "مبتدئ" | "متوسط" | "متقدم";
          category: string;
          points?: number;
          time_limit?: number;
          memory_limit?: number;
          input_format?: string | null;
          output_format?: string | null;
          constraints?: string | null;
          sample_input?: string | null;
          sample_output?: string | null;
          test_cases?: any | null;
          status?: "مسودة" | "منشور" | "مؤرشف";
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          difficulty?: "مبتدئ" | "متوسط" | "متقدم";
          category?: string;
          points?: number;
          time_limit?: number;
          memory_limit?: number;
          input_format?: string | null;
          output_format?: string | null;
          constraints?: string | null;
          sample_input?: string | null;
          sample_output?: string | null;
          test_cases?: any | null;
          status?: "مسودة" | "منشور" | "مؤرشف";
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      solutions: {
        Row: {
          id: string;
          problem_id: string;
          user_id: string;
          code: string;
          language: string;
          status:
            | "قيد المراجعة"
            | "مقبول"
            | "مرفوض"
            | "خطأ في التشغيل"
            | "تجاوز ا��وقت";
          execution_time: number | null;
          memory_used: number | null;
          points_earned: number;
          submitted_at: string;
        };
        Insert: {
          id?: string;
          problem_id: string;
          user_id: string;
          code: string;
          language: string;
          status?:
            | "قيد المراجعة"
            | "مقبول"
            | "مرفوض"
            | "خطأ في التشغيل"
            | "تجاوز الوقت";
          execution_time?: number | null;
          memory_used?: number | null;
          points_earned?: number;
          submitted_at?: string;
        };
        Update: {
          id?: string;
          problem_id?: string;
          user_id?: string;
          code?: string;
          language?: string;
          status?:
            | "قيد المراجعة"
            | "مقبول"
            | "مرفوض"
            | "خطأ في التشغيل"
            | "تجاوز الوقت";
          execution_time?: number | null;
          memory_used?: number | null;
          points_earned?: number;
          submitted_at?: string;
        };
      };
      badges: {
        Row: {
          id: string;
          name: string;
          description: string;
          icon: string;
          color: string;
          rarity: "شائع" | "نادر" | "نادر جداً" | "أسطوري";
          condition_type: string;
          condition_value: any;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          icon: string;
          color: string;
          rarity?: "شائع" | "نادر" | "نادر جداً" | "أسطوري";
          condition_type: string;
          condition_value: any;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          icon?: string;
          color?: string;
          rarity?: "شائع" | "نادر" | "نادر جداً" | "أسطوري";
          condition_type?: string;
          condition_value?: any;
          created_at?: string;
        };
      };
      user_badges: {
        Row: {
          id: string;
          user_id: string;
          badge_id: string;
          earned_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          badge_id: string;
          earned_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          badge_id?: string;
          earned_at?: string;
        };
      };
      friendships: {
        Row: {
          id: string;
          user_id: string;
          friend_id: string;
          status: "معلق" | "مقبول" | "مرفوض";
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          friend_id: string;
          status?: "معلق" | "مقبول" | "مرفوض";
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          friend_id?: string;
          status?: "معلق" | "مقبول" | "مرفوض";
          created_at?: string;
        };
      };
      articles: {
        Row: {
          id: string;
          title: string;
          excerpt: string | null;
          content: string;
          category: string;
          tags: string[];
          featured_image: string | null;
          author_id: string | null;
          status: "مسودة" | "منشور" | "مؤرشف";
          views: number;
          likes: number;
          read_time: number | null;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          excerpt?: string | null;
          content: string;
          category: string;
          tags?: string[];
          featured_image?: string | null;
          author_id?: string | null;
          status?: "مسودة" | "منشور" | "مؤرشف";
          views?: number;
          likes?: number;
          read_time?: number | null;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          excerpt?: string | null;
          content?: string;
          category?: string;
          tags?: string[];
          featured_image?: string | null;
          author_id?: string | null;
          status?: "مسودة" | "منشور" | "مؤرشف";
          views?: number;
          likes?: number;
          read_time?: number | null;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      news: {
        Row: {
          id: string;
          title: string;
          excerpt: string | null;
          content: string;
          category: string;
          featured_image: string | null;
          author_id: string | null;
          status: "مسودة" | "منشور" | "مؤرشف";
          views: number;
          featured: boolean;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          excerpt?: string | null;
          content: string;
          category: string;
          featured_image?: string | null;
          author_id?: string | null;
          status?: "مسودة" | "منشور" | "مؤرشف";
          views?: number;
          featured?: boolean;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          excerpt?: string | null;
          content?: string;
          category?: string;
          featured_image?: string | null;
          author_id?: string | null;
          status?: "مسودة" | "منشور" | "مؤرشف";
          views?: number;
          featured?: boolean;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      comments: {
        Row: {
          id: string;
          content: string;
          author_id: string;
          article_id: string;
          parent_id: string | null;
          likes: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          content: string;
          author_id: string;
          article_id: string;
          parent_id?: string | null;
          likes?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          content?: string;
          author_id?: string;
          article_id?: string;
          parent_id?: string | null;
          likes?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      update_user_ranks: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
      check_badge_eligibility: {
        Args: {
          user_uuid: string;
        };
        Returns: undefined;
      };
      increment_views: {
        Args: {
          table_name: string;
          record_id: string;
        };
        Returns: undefined;
      };
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
