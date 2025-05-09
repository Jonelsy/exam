/*
 Navicat Premium Data Transfer

 Source Server         : SchoolOver
 Source Server Type    : MySQL
 Source Server Version : 80013
 Source Host           : localhost:3306
 Source Schema         : exam

 Target Server Type    : MySQL
 Target Server Version : 80013
 File Encoding         : 65001

 Date: 06/04/2025 19:24:28
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for class
-- ----------------------------
DROP TABLE IF EXISTS `class`;
CREATE TABLE `class`  (
  `class_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '班级ID',
  `class_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '班级名称',
  `teacher_id` int(11) NOT NULL COMMENT '班主任ID',
  `create_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  PRIMARY KEY (`class_id`) USING BTREE,
  INDEX `fk_class_teacher`(`teacher_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of class
-- ----------------------------
INSERT INTO `class` VALUES (1, '计科二班', 8, '2025-02-03 12:49:08');
INSERT INTO `class` VALUES (3, '地科一班', 8, '2025-02-06 21:15:17');
INSERT INTO `class` VALUES (4, '计科三班', 1, '2025-02-18 20:00:10');
INSERT INTO `class` VALUES (8, '网编二班', 8, '2025-02-18 20:15:21');
INSERT INTO `class` VALUES (10, '网编一班', 8, '2025-02-18 20:15:37');
INSERT INTO `class` VALUES (11, '大数据一班', 8, '2025-02-18 20:15:46');
INSERT INTO `class` VALUES (12, '大数据二班', 8, '2025-02-18 20:15:51');
INSERT INTO `class` VALUES (13, '空间防护一班', 8, '2025-02-18 20:34:15');
INSERT INTO `class` VALUES (14, '空间防护二班', 8, '2025-02-18 20:34:22');
INSERT INTO `class` VALUES (15, '蒙一班12', 8, '2025-02-18 20:34:32');
INSERT INTO `class` VALUES (16, '蒙二班', 8, '2025-02-18 20:34:37');

-- ----------------------------
-- Table structure for class_exam
-- ----------------------------
DROP TABLE IF EXISTS `class_exam`;
CREATE TABLE `class_exam`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '关联ID',
  `class_id` int(11) NOT NULL COMMENT '班级ID',
  `exam_id` int(11) NOT NULL COMMENT '考试ID',
  `teacher_id` int(11) NOT NULL COMMENT '老师ID',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_class_exam`(`class_id`, `exam_id`) USING BTREE,
  INDEX `exam_id`(`exam_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of class_exam
-- ----------------------------
INSERT INTO `class_exam` VALUES (1, 1, 1, 8);
INSERT INTO `class_exam` VALUES (2, 3, 2, 8);
INSERT INTO `class_exam` VALUES (3, 3, 1, 8);
INSERT INTO `class_exam` VALUES (4, 1, 14, 8);
INSERT INTO `class_exam` VALUES (5, 16, 16, 8);
INSERT INTO `class_exam` VALUES (6, 11, 16, 8);
INSERT INTO `class_exam` VALUES (7, 3, 16, 8);
INSERT INTO `class_exam` VALUES (8, 3, 17, 8);
INSERT INTO `class_exam` VALUES (9, 3, 14, 8);
INSERT INTO `class_exam` VALUES (10, 3, 18, 8);

-- ----------------------------
-- Table structure for exam
-- ----------------------------
DROP TABLE IF EXISTS `exam`;
CREATE TABLE `exam`  (
  `exam_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '考试ID',
  `exam_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '考试名称',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '考试描述',
  `start_time` datetime(0) NOT NULL COMMENT '开始时间',
  `end_time` datetime(0) NOT NULL COMMENT '结束时间',
  `duration` int(11) NOT NULL COMMENT '考试时长(分钟)',
  `total_score` int(11) NOT NULL COMMENT '考试总分',
  `is_limit` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否限制次数',
  `allow_times` int(11) NULL DEFAULT 1 COMMENT '允许考试次数',
  `create_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `teacher_id` int(11) NULL DEFAULT NULL COMMENT '考试创建人ID',
  PRIMARY KEY (`exam_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of exam
-- ----------------------------
INSERT INTO `exam` VALUES (1, '计算机组成原理1', '探索计算机的奥秘，深入微观世界', '2025-02-10 20:28:22', '2025-02-10 20:28:22', 120, 100, 0, 1, '2025-02-10 20:00:37', 8);
INSERT INTO `exam` VALUES (2, '计算机组成原理2', '探索计算机的奥秘，深入微观世界', '2025-02-10 20:28:22', '2025-02-10 20:28:22', 120, 100, 0, 1, '2025-02-10 20:00:37', 8);
INSERT INTO `exam` VALUES (4, '123321321321', '1231231231231231231', '2025-02-23 00:00:00', '2025-02-24 10:38:39', 2078, 110, 1, 1, '2025-02-23 10:39:30', 8);
INSERT INTO `exam` VALUES (5, '321', '321', '2025-02-23 10:41:40', '2025-02-23 10:41:40', 0, 100, 0, 1, '2025-04-08 16:26:56', 8);
INSERT INTO `exam` VALUES (6, '1313', '1313', '2025-02-23 10:42:46', '2025-02-23 10:42:46', 0, 100, 0, 1, '2025-04-06 16:27:00', 8);
INSERT INTO `exam` VALUES (10, '123', '123', '2025-02-23 11:34:02', '2025-02-23 13:35:02', 121, 100, 1, 1, '2025-04-06 16:27:03', 8);
INSERT INTO `exam` VALUES (11, '1', '1', '2025-02-23 11:34:19', '2025-02-23 11:35:19', 1, 100, 0, 1, '2025-02-23 11:35:22', 8);
INSERT INTO `exam` VALUES (12, '123', '321', '2025-02-23 00:00:00', '2025-02-24 00:00:00', 1440, 100, 0, 1, '2025-02-23 11:35:39', 8);
INSERT INTO `exam` VALUES (13, '321', '321', '2025-02-23 00:00:00', '2025-02-23 11:35:39', 695, 100, 0, 1, '2025-02-23 11:35:53', 8);
INSERT INTO `exam` VALUES (14, '1313', '13131', '2025-02-24 00:00:00', '2025-03-25 00:00:00', 41760, 100, 0, 1, '2025-02-23 11:36:06', 8);
INSERT INTO `exam` VALUES (15, '321', '3123', '2025-02-23 10:36:06', '2025-02-23 12:36:06', 120, 100, 0, 1, '2025-02-23 11:36:25', 8);
INSERT INTO `exam` VALUES (16, '新增未开始考试', '新增未开始考试', '2025-03-22 00:00:00', '2025-03-31 00:00:00', 12960, 100, 1, 1, '2025-04-06 16:27:06', 8);
INSERT INTO `exam` VALUES (17, '永不开始的考试', '永不开始的考试', '2035-03-01 08:00:00', '2035-03-01 10:00:00', 120, 100, 0, 1, '2025-04-06 16:27:08', 8);
INSERT INTO `exam` VALUES (18, '永远进行中考试', '永远进行中考试', '2025-04-06 00:00:00', '2026-06-01 00:00:00', 606240, 100, 0, 1, '2025-04-06 16:27:11', 8);

-- ----------------------------
-- Table structure for exam_record
-- ----------------------------
DROP TABLE IF EXISTS `exam_record`;
CREATE TABLE `exam_record`  (
  `record_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '记录ID',
  `user_id` int(11) NOT NULL COMMENT '用户ID',
  `exam_id` int(11) NOT NULL COMMENT '考试ID',
  `score` int(11) NULL DEFAULT NULL COMMENT '考试成绩',
  `start_time` datetime(0) NOT NULL COMMENT '开始时间',
  `end_time` datetime(0) NOT NULL COMMENT '结束时间',
  `is_passed` tinyint(1) NULL DEFAULT NULL COMMENT '是否通过',
  PRIMARY KEY (`record_id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  INDEX `exam_id`(`exam_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of exam_record
-- ----------------------------

-- ----------------------------
-- Table structure for option
-- ----------------------------
DROP TABLE IF EXISTS `option`;
CREATE TABLE `option`  (
  `option_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '选项ID',
  `question_id` int(11) NOT NULL COMMENT '题目ID',
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '选项内容',
  `is_correct` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否正确答案',
  `exam_id` int(11) NOT NULL COMMENT '所属考试ID',
  PRIMARY KEY (`option_id`) USING BTREE,
  INDEX `question_id`(`question_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 255 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of option
-- ----------------------------
INSERT INTO `option` VALUES (100, 66, '简答题参考答案', 1, 4);
INSERT INTO `option` VALUES (243, 168, '1', 1, 1);
INSERT INTO `option` VALUES (244, 168, '2', 0, 1);
INSERT INTO `option` VALUES (245, 169, '1', 1, 1);
INSERT INTO `option` VALUES (246, 170, '1', 1, 16);
INSERT INTO `option` VALUES (247, 170, '2', 0, 16);
INSERT INTO `option` VALUES (248, 170, '3', 0, 16);
INSERT INTO `option` VALUES (249, 170, '4', 0, 16);
INSERT INTO `option` VALUES (250, 171, '1', 0, 16);
INSERT INTO `option` VALUES (251, 171, '2', 0, 16);
INSERT INTO `option` VALUES (252, 171, '3', 0, 16);
INSERT INTO `option` VALUES (253, 171, '4', 0, 16);
INSERT INTO `option` VALUES (254, 172, '判断题', 1, 16);
INSERT INTO `option` VALUES (255, 173, '简答题答案', 1, 16);
INSERT INTO `option` VALUES (256, 174, '1', 1, 1);
INSERT INTO `option` VALUES (257, 175, '1', 1, 1);
INSERT INTO `option` VALUES (258, 176, '123', 0, 18);
INSERT INTO `option` VALUES (259, 177, '123', 0, 18);
INSERT INTO `option` VALUES (260, 178, '123', 0, 18);
INSERT INTO `option` VALUES (261, 179, '123', 0, 18);
INSERT INTO `option` VALUES (262, 180, '123', 0, 18);
INSERT INTO `option` VALUES (263, 181, '123', 0, 18);
INSERT INTO `option` VALUES (264, 182, '123', 0, 18);
INSERT INTO `option` VALUES (265, 183, '这个题分值100', 0, 18);
INSERT INTO `option` VALUES (266, 183, '这个是正确答案', 1, 18);
INSERT INTO `option` VALUES (267, 183, '这个不是正确答案', 0, 18);
INSERT INTO `option` VALUES (268, 183, '这个也不是正确答案', 0, 18);
INSERT INTO `option` VALUES (269, 184, '这个题分值100', 0, 18);
INSERT INTO `option` VALUES (270, 184, '这个是正确答案', 1, 18);
INSERT INTO `option` VALUES (271, 184, '这个不是正确答案', 0, 18);
INSERT INTO `option` VALUES (272, 184, '这个也不是正确答案', 0, 18);
INSERT INTO `option` VALUES (273, 185, '1', 1, 18);
INSERT INTO `option` VALUES (274, 185, '2', 1, 18);
INSERT INTO `option` VALUES (275, 185, '3', 1, 18);
INSERT INTO `option` VALUES (276, 185, '4', 1, 18);
INSERT INTO `option` VALUES (277, 186, '判断题', 1, 18);
INSERT INTO `option` VALUES (278, 187, '终极测试', 1, 18);

-- ----------------------------
-- Table structure for question
-- ----------------------------
DROP TABLE IF EXISTS `question`;
CREATE TABLE `question`  (
  `question_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '题目ID',
  `exam_id` int(11) NOT NULL COMMENT '所属考试ID',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '题目内容',
  `question_type` int(11) NOT NULL COMMENT '题型（0单选 1多选 2判断）',
  `score` int(11) NOT NULL COMMENT '题目分值',
  `order_num` int(11) NOT NULL COMMENT '题目顺序',
  PRIMARY KEY (`question_id`) USING BTREE,
  INDEX `exam_id`(`exam_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 173 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of question
-- ----------------------------
INSERT INTO `question` VALUES (66, 4, '简答题题目', 3, 10, 2);
INSERT INTO `question` VALUES (170, 16, '这是一道单选题', 0, 10, 0);
INSERT INTO `question` VALUES (171, 16, '这是一道多选题', 1, 10, 1);
INSERT INTO `question` VALUES (172, 16, '这是一道判断题', 2, 10, 2);
INSERT INTO `question` VALUES (173, 16, '这是一道简答题', 3, 10, 3);
INSERT INTO `question` VALUES (175, 1, '123', 0, 11, 0);
INSERT INTO `question` VALUES (184, 18, '这个单选题是送分题', 0, 25, 0);
INSERT INTO `question` VALUES (185, 18, '多选题', 1, 25, 1);
INSERT INTO `question` VALUES (186, 18, '判断题', 2, 25, 2);
INSERT INTO `question` VALUES (187, 18, '简答题', 3, 25, 3);

-- ----------------------------
-- Table structure for submission_answers
-- ----------------------------
DROP TABLE IF EXISTS `submission_answers`;
CREATE TABLE `submission_answers`  (
  `answer_id` int(11) NOT NULL AUTO_INCREMENT,
  `exam_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `question_type` tinyint(4) NOT NULL,
  `option_ids` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `answer_content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `created_at` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`answer_id`) USING BTREE,
  INDEX `answer_id`(`answer_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of submission_answers
-- ----------------------------
INSERT INTO `submission_answers` VALUES (105, 18, 184, 0, NULL, '270', '2025-04-06 19:24:13');
INSERT INTO `submission_answers` VALUES (106, 18, 185, 1, '273,274,275,276', NULL, '2025-04-06 19:24:13');
INSERT INTO `submission_answers` VALUES (107, 18, 186, 2, NULL, '1', '2025-04-06 19:24:13');
INSERT INTO `submission_answers` VALUES (108, 18, 187, 3, NULL, '答案', '2025-04-06 19:24:13');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `openid` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '微信openid',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户姓名',
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '昵称',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '密码',
  `role` tinyint(1) NOT NULL DEFAULT 0 COMMENT '角色（0学生 1教师）',
  `create_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, '', '', '张老师', '', 1, '2025-02-03 12:49:08');
INSERT INTO `user` VALUES (2, '', '', '小明', '', 1, '2025-02-03 12:49:09');
INSERT INTO `user` VALUES (8, '', '何小雨', 'john_doe', '$2b$10$dg4xGY6no7e9qvHn2EkWe.1mWG/4gC0BF1/.ymvlcZ38cUlUPLida', 1, '2025-02-04 19:15:41');
INSERT INTO `user` VALUES (10, '', '何小雨', 'john_doe', '1234567', 0, '2025-02-06 21:16:58');
INSERT INTO `user` VALUES (14, '', '何小雨', 'john_doe', '1234567', 0, '2025-02-06 21:31:53');
INSERT INTO `user` VALUES (17, 'oeP4U6FohTfacfV6mkTD0a04mp0s', '李世宇', '20201104385', '$2b$10$EPUv8h2jcSHs2P1ShfWXiOJiWt7QeJWkFAT.eJUir9oH5tsi63oce', 0, '2025-02-18 21:32:13');
INSERT INTO `user` VALUES (18, '', '李世宇', '20201104393', '$2b$10$LjRJ4vEs4tiGPSTlZUFT/.b4nq7l711JjQVh0HTsq4R4zd3sxWEpO', 0, '2025-02-18 21:32:22');

-- ----------------------------
-- Table structure for user_class
-- ----------------------------
DROP TABLE IF EXISTS `user_class`;
CREATE TABLE `user_class`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '关联ID',
  `user_id` int(11) NOT NULL COMMENT '用户ID',
  `class_id` int(11) NOT NULL COMMENT '班级ID',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_user_class`(`user_id`, `class_id`) USING BTREE,
  INDEX `class_id`(`class_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_class
-- ----------------------------
INSERT INTO `user_class` VALUES (1, 14, 3);
INSERT INTO `user_class` VALUES (2, 17, 3);

SET FOREIGN_KEY_CHECKS = 1;
