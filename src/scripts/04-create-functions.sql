-- إنشاء دوال مساعدة

-- دالة لحساب ترتيب المستخدمين
CREATE OR REPLACE FUNCTION update_user_ranks()
RETURNS void AS $$
BEGIN
  WITH ranked_users AS (
    SELECT id, ROW_NUMBER() OVER (ORDER BY points DESC, created_at ASC) as new_rank
    FROM users
    WHERE NOT is_admin
  )
  UPDATE users 
  SET rank = ranked_users.new_rank
  FROM ranked_users
  WHERE users.id = ranked_users.id;
END;
$$ LANGUAGE plpgsql;

-- دالة للتحقق من استحقاق الشارات
CREATE OR REPLACE FUNCTION check_badge_eligibility(user_uuid UUID)
RETURNS void AS $$
DECLARE
  badge_record RECORD;
  user_stats RECORD;
  problems_solved INTEGER;
  current_streak INTEGER;
BEGIN
  -- الحصول على إحصائيات المستخدم
  SELECT 
    COUNT(DISTINCT s.problem_id) as solved_count,
    u.streak_days
  INTO user_stats
  FROM users u
  LEFT JOIN solutions s ON u.id = s.user_id AND s.status = 'مقبول'
  WHERE u.id = user_uuid
  GROUP BY u.id, u.streak_days;

  problems_solved := COALESCE(user_stats.solved_count, 0);
  current_streak := COALESCE(user_stats.streak_days, 0);

  -- التحقق من كل شارة
  FOR badge_record IN 
    SELECT * FROM badges 
    WHERE id NOT IN (
      SELECT badge_id FROM user_badges WHERE user_id = user_uuid
    )
  LOOP
    -- التحقق من شرط المسائل المحلولة
    IF badge_record.condition_type = 'problems_solved' THEN
      IF problems_solved >= (badge_record.condition_value->>'min')::INTEGER THEN
        INSERT INTO user_badges (user_id, badge_id) VALUES (user_uuid, badge_record.id);
      END IF;
    END IF;

    -- التحقق من شرط الأيام المتتالية
    IF badge_record.condition_type = 'streak_days' THEN
      IF current_streak >= (badge_record.condition_value->>'min')::INTEGER THEN
        INSERT INTO user_badges (user_id, badge_id) VALUES (user_uuid, badge_record.id);
      END IF;
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- دالة لتحديث النقاط عند حل مسألة
CREATE OR REPLACE FUNCTION award_points_for_solution()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'مقبول' AND (OLD.status IS NULL OR OLD.status != 'مقبول') THEN
    -- إضافة النقاط للمستخدم
    UPDATE users 
    SET points = points + (SELECT points FROM problems WHERE id = NEW.problem_id)
    WHERE id = NEW.user_id;
    
    -- تحديث النقاط المكتسبة في الحل
    NEW.points_earned = (SELECT points FROM problems WHERE id = NEW.problem_id);
    
    -- التحقق من استحقاق الشارات
    PERFORM check_badge_eligibility(NEW.user_id);
    
    -- تحديث الترتيب
    PERFORM update_user_ranks();
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- إنشاء المحفز
CREATE TRIGGER solution_status_change
  AFTER INSERT OR UPDATE ON solutions
  FOR EACH ROW
  EXECUTE FUNCTION award_points_for_solution();

-- دالة لتحديث عدد المشاهدات
CREATE OR REPLACE FUNCTION increment_views(table_name TEXT, record_id UUID)
RETURNS void AS $$
BEGIN
  IF table_name = 'articles' THEN
    UPDATE articles SET views = views + 1 WHERE id = record_id;
  ELSIF table_name = 'news' THEN
    UPDATE news SET views = views + 1 WHERE id = record_id;
  END IF;
END;
$$ LANGUAGE plpgsql;
