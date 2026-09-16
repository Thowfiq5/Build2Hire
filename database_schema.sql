-- Database Schema for Build2Hire Platform
-- Run this SQL in phpMyAdmin or MySQL CLI to set up the database and tables

CREATE DATABASE IF NOT EXISTS `build2hire_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `build2hire_db`;

-- 1. Users Table (Authentication & Role Base)
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `full_name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) UNIQUE NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('candidate', 'recruiter', 'client', 'admin') NOT NULL DEFAULT 'candidate',
  `avatar_url` VARCHAR(255) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Candidates Profile Table
CREATE TABLE IF NOT EXISTS `candidates` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `title` VARCHAR(150) DEFAULT NULL,
  `bio` TEXT DEFAULT NULL,
  `skills` JSON DEFAULT NULL,
  `experience_years` INT DEFAULT 0,
  `location` VARCHAR(100) DEFAULT NULL,
  `github_url` VARCHAR(255) DEFAULT NULL,
  `linkedin_url` VARCHAR(255) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Recruiters Profile Table
CREATE TABLE IF NOT EXISTS `recruiters` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `company_name` VARCHAR(150) NOT NULL,
  `designation` VARCHAR(100) DEFAULT NULL,
  `company_website` VARCHAR(255) DEFAULT NULL,
  `company_logo` VARCHAR(255) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Clients Profile Table (Freelance / Contract)
CREATE TABLE IF NOT EXISTS `clients` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `company_name` VARCHAR(150) DEFAULT NULL,
  `industry` VARCHAR(100) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Jobs Table
CREATE TABLE IF NOT EXISTS `jobs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `recruiter_id` INT NOT NULL,
  `title` VARCHAR(200) NOT NULL,
  `description` TEXT NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `job_type` ENUM('full-time', 'part-time', 'contract', 'remote') DEFAULT 'full-time',
  `salary_range` VARCHAR(100) DEFAULT NULL,
  `location` VARCHAR(100) DEFAULT NULL,
  `status` ENUM('open', 'closed', 'draft') DEFAULT 'open',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`recruiter_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. Projects Showcase Table
CREATE TABLE IF NOT EXISTS `projects` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `candidate_id` INT NOT NULL,
  `title` VARCHAR(200) NOT NULL,
  `description` TEXT DEFAULT NULL,
  `repo_url` VARCHAR(255) DEFAULT NULL,
  `live_demo_url` VARCHAR(255) DEFAULT NULL,
  `tech_stack` JSON DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`candidate_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 7. Portfolios Table
CREATE TABLE IF NOT EXISTS `portfolios` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `candidate_id` INT NOT NULL,
  `summary` TEXT DEFAULT NULL,
  `featured_projects` JSON DEFAULT NULL,
  `custom_domain` VARCHAR(150) DEFAULT NULL,
  `theme` VARCHAR(50) DEFAULT 'default',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`candidate_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 8. Job Applications Table
CREATE TABLE IF NOT EXISTS `applications` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `job_id` INT NOT NULL,
  `candidate_id` INT NOT NULL,
  `cover_letter` TEXT DEFAULT NULL,
  `status` ENUM('pending', 'shortlisted', 'interviewed', 'accepted', 'rejected') DEFAULT 'pending',
  `applied_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`job_id`) REFERENCES `jobs`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`candidate_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 9. Assessments & Submissions Tables
CREATE TABLE IF NOT EXISTS `assessments` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(200) NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `total_marks` INT DEFAULT 100,
  `questions` JSON NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `assessment_submissions` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `assessment_id` INT NOT NULL,
  `candidate_id` INT NOT NULL,
  `score` INT NOT NULL,
  `passed` TINYINT(1) DEFAULT 0,
  `submitted_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`assessment_id`) REFERENCES `assessments`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`candidate_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 10. Meetings Table
CREATE TABLE IF NOT EXISTS `meetings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `organizer_id` INT NOT NULL,
  `participant_id` INT NOT NULL,
  `title` VARCHAR(200) NOT NULL,
  `scheduled_at` DATETIME NOT NULL,
  `meeting_link` VARCHAR(255) DEFAULT NULL,
  `status` ENUM('scheduled', 'completed', 'cancelled') DEFAULT 'scheduled',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`organizer_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`participant_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 11. Messages Table
CREATE TABLE IF NOT EXISTS `messages` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `sender_id` INT NOT NULL,
  `receiver_id` INT NOT NULL,
  `message_text` TEXT NOT NULL,
  `is_read` TINYINT(1) DEFAULT 0,
  `sent_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`sender_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`receiver_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 12. Agreements Table
CREATE TABLE IF NOT EXISTS `agreements` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `client_id` INT NOT NULL,
  `candidate_id` INT NOT NULL,
  `title` VARCHAR(200) NOT NULL,
  `terms_content` LONGTEXT NOT NULL,
  `amount` DECIMAL(10, 2) DEFAULT 0.00,
  `status` ENUM('draft', 'sent', 'signed', 'completed', 'cancelled') DEFAULT 'draft',
  `signed_at` DATETIME DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`client_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`candidate_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 13. Default Seed Data (Users, Profiles & Jobs)
-- Password for all seed users is: password123
INSERT IGNORE INTO `users` (`id`, `full_name`, `email`, `password`, `role`) VALUES
(1, 'Test User', 'test@example.com', '$2y$10$.rX15uqVWC8zwajQx6gL..cS8muUHkiWV1X78WtZvD82G.R0xRTO2', 'candidate'),
(4, 'System Admin', 'admin@build2hire.com', '$2y$10$.rX15uqVWC8zwajQx6gL..cS8muUHkiWV1X78WtZvD82G.R0xRTO2', 'admin'),
(6, 'Sarah Connor', 'recruiter@innovatetech.com', '$2y$10$.rX15uqVWC8zwajQx6gL..cS8muUHkiWV1X78WtZvD82G.R0xRTO2', 'recruiter'),
(7, 'Test Candidate', 'candidate@build2hire.com', '$2y$10$.rX15uqVWC8zwajQx6gL..cS8muUHkiWV1X78WtZvD82G.R0xRTO2', 'candidate'),
(8, 'Alex Morgan', 'client@innovatetech.com', '$2y$10$.rX15uqVWC8zwajQx6gL..cS8muUHkiWV1X78WtZvD82G.R0xRTO2', 'client');

INSERT IGNORE INTO `candidates` (`user_id`, `title`, `bio`, `skills`, `experience_years`, `location`) VALUES
(1, 'Frontend Developer', 'Experienced UI/UX and React Developer.', '["JavaScript", "React", "CSS"]', 2, 'Remote'),
(7, 'Fullstack Developer', 'Passionate software engineer building web apps.', '["JavaScript", "React", "Node.js", "MySQL"]', 3, 'Remote');

INSERT IGNORE INTO `recruiters` (`user_id`, `company_name`, `designation`, `company_website`) VALUES
(6, 'InnovateTech', 'Senior Hiring Manager', 'https://innovatetech.com');

INSERT IGNORE INTO `clients` (`user_id`, `company_name`, `industry`) VALUES
(8, 'InnovateTech Corp', 'Software & Technology');

INSERT IGNORE INTO `jobs` (`recruiter_id`, `title`, `description`, `category`, `job_type`, `salary_range`, `location`, `status`) VALUES
(6, 'Full Stack Developer', 'Build scalable web applications with React and Node.js RESTful APIs.', 'Full Stack Engineer', 'full-time', '$120,000 - $150,000', 'Remote', 'open'),
(6, 'Backend Systems Developer', 'Develop high performance database API backends using Node.js, Express and MySQL.', 'Backend Engineer', 'full-time', '$130,000 - $160,000', 'Hybrid', 'open'),
(6, 'UI/UX Mobile Designer', 'Design modern responsive Figma wireframes and interfaces for iOS & Android.', 'Frontend Developer', 'contract', '$4,000 / project', 'Remote', 'open');

