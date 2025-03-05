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

 Date: 05/03/2025 19:23:05
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
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

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
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_class_exam`(`class_id`, `exam_id`) USING BTREE,
  INDEX `exam_id`(`exam_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of class_exam
-- ----------------------------
INSERT INTO `class_exam` VALUES (1, 1, 1);
INSERT INTO `class_exam` VALUES (3, 3, 1);
INSERT INTO `class_exam` VALUES (2, 3, 2);

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
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of exam
-- ----------------------------
INSERT INTO `exam` VALUES (1, '计算机组成原理1', '探索计算机的奥秘，深入微观世界', '2025-02-10 20:28:22', '2025-02-10 20:28:22', 120, 100, 0, 1, '2025-02-10 20:00:37', 8);
INSERT INTO `exam` VALUES (2, '计算机组成原理2', '探索计算机的奥秘，深入微观世界', '2025-02-10 20:28:22', '2025-02-10 20:28:22', 120, 100, 0, 1, '2025-02-10 20:00:37', 8);
INSERT INTO `exam` VALUES (4, '123321321321', '1231231231231231231', '2025-02-23 00:00:00', '2025-02-24 10:38:39', 2078, 110, 1, 1, '2025-02-23 10:39:30', 8);
INSERT INTO `exam` VALUES (5, '321', '321', '2025-02-23 10:41:40', '2025-02-23 10:41:40', 0, 100, 0, 1, NULL, 8);
INSERT INTO `exam` VALUES (6, '1313', '1313', '2025-02-23 10:42:46', '2025-02-23 10:42:46', 0, 100, 0, 1, NULL, 8);
INSERT INTO `exam` VALUES (10, '123', '123', '2025-02-23 11:34:02', '2025-02-23 13:35:02', 121, 100, 1, 1, NULL, 8);
INSERT INTO `exam` VALUES (11, '1', '1', '2025-02-23 11:34:19', '2025-02-23 11:35:19', 1, 100, 0, 1, '2025-02-23 11:35:22', 8);
INSERT INTO `exam` VALUES (12, '123', '321', '2025-02-23 00:00:00', '2025-02-24 00:00:00', 1440, 100, 0, 1, '2025-02-23 11:35:39', 8);
INSERT INTO `exam` VALUES (13, '321', '321', '2025-02-23 00:00:00', '2025-02-23 11:35:39', 695, 100, 0, 1, '2025-02-23 11:35:53', 8);
INSERT INTO `exam` VALUES (14, '1313', '13131', '2025-02-24 00:00:00', '2025-03-25 00:00:00', 41760, 100, 0, 1, '2025-02-23 11:36:06', 8);
INSERT INTO `exam` VALUES (15, '321', '3123', '2025-02-23 10:36:06', '2025-02-23 12:36:06', 120, 100, 0, 1, '2025-02-23 11:36:25', 8);

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
) ENGINE = InnoDB AUTO_INCREMENT = 39 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of option
-- ----------------------------
INSERT INTO `option` VALUES (100, 66, '简答题参考答案', 1, 4);

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
) ENGINE = InnoDB AUTO_INCREMENT = 27 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of question
-- ----------------------------
INSERT INTO `question` VALUES (66, 4, '简答题题目', 3, 10, 2);

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
INSERT INTO `user` VALUES (1, 'teacher_openid_123', '', '张老师', '', 1, '2025-02-03 12:49:08');
INSERT INTO `user` VALUES (2, 'student_openid_456', '', '小明', '', 1, '2025-02-03 12:49:09');
INSERT INTO `user` VALUES (8, '1', '何小雨', 'john_doe', '$2b$10$dg4xGY6no7e9qvHn2EkWe.1mWG/4gC0BF1/.ymvlcZ38cUlUPLida', 1, '2025-02-04 19:15:41');
INSERT INTO `user` VALUES (10, '0', '何小雨', 'john_doe', '1234567', 0, '2025-02-06 21:16:58');
INSERT INTO `user` VALUES (14, '123', '何小雨', 'john_doe', '1234567', 0, '2025-02-06 21:31:53');
INSERT INTO `user` VALUES (17, '1739885532558', '李世宇', '20201104385', '$2b$10$EPUv8h2jcSHs2P1ShfWXiOJiWt7QeJWkFAT.eJUir9oH5tsi63oce', 0, '2025-02-18 21:32:13');
INSERT INTO `user` VALUES (18, '1739885537748', '李世宇', '20201104393', '$2b$10$LjRJ4vEs4tiGPSTlZUFT/.b4nq7l711JjQVh0HTsq4R4zd3sxWEpO', 0, '2025-02-18 21:32:22');

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
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_class
-- ----------------------------
INSERT INTO `user_class` VALUES (1, 14, 3);
INSERT INTO `user_class` VALUES (2, 15, 3);

SET FOREIGN_KEY_CHECKS = 1;
