
ALTER TABLE subjects 
ADD COLUMN IF NOT EXISTS parent_id INTEGER REFERENCES subjects(id) ON DELETE CASCADE,
ADD COLUMN IF NOT EXISTS subject_description TEXT,
ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

CREATE INDEX IF NOT EXISTS idx_subjects_parent_id ON subjects(parent_id);


INSERT INTO subjects (subject_name, subject_description, parent_id, display_order) VALUES
    ('FRCR', 'Fellowship of the Royal College of Radiologists', NULL, 1),
    ('EBIR Mock Exam', 'European Board of Interventional Radiology Mock Examination', NULL, 2),
    ('Breast Imaging Assessment', 'Comprehensive Breast Imaging Evaluation', NULL, 3),
    ('Chest X-Ray Timed Set', 'Time-limited Chest Radiograph Interpretation', NULL, 4),
    ('Emergency X-Ray Challenge', 'Acute Emergency Radiograph Assessment', NULL, 5),
    ('Radiology Anatomy', 'Cross-sectional Anatomy for Radiologists', NULL, 6),
    ('Interventional Radiology Viva Prep', 'IR Viva Preparation and Practice', NULL, 7)
ON CONFLICT DO NOTHING;


DO $$
DECLARE
    frcr_id INTEGER;
BEGIN

    SELECT id INTO frcr_id FROM subjects WHERE subject_name = 'FRCR' LIMIT 1;
    
    IF frcr_id IS NOT NULL THEN

        INSERT INTO subjects (subject_name, subject_description, parent_id, display_order) VALUES
            ('FRCR - Short Cases', 'FRCR Short Case Examinations', frcr_id, 1),
            ('FRCR - Long Cases', 'FRCR Long Case Examinations', frcr_id, 2),
            ('FRCR - Viva', 'FRCR Viva Voce Examinations', frcr_id, 3)
        ON CONFLICT DO NOTHING;
    END IF;
END $$;

-- Query examples to retrieve hierarchical data:

-- Get all parent subjects (main categories)
-- SELECT * FROM subjects WHERE parent_id IS NULL ORDER BY display_order;

-- Get all subcategories for a specific parent (e.g., FRCR)
-- SELECT * FROM subjects WHERE parent_id = (SELECT id FROM subjects WHERE subject_name = 'FRCR') ORDER BY display_order;

-- Get subjects with their parent names (if any)
-- SELECT 
--     s.id,
--     s.subject_name,
--     s.subject_description,
--     p.subject_name as parent_name,
--     s.display_order
-- FROM subjects s
-- LEFT JOIN subjects p ON s.parent_id = p.id
-- ORDER BY COALESCE(p.display_order, s.display_order), s.display_order;
