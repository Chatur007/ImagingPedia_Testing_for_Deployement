# Courses Management System - Setup Guide

## Overview
A complete backend and frontend system for managing courses with videos (YouTube iframes) and images.

## Files Created

### 1. **Database Schema**
- **File**: `COURSES_DATABASE_SCHEMA.sql`
- **Location**: `src/Backed for AI Test/`
- **Contains**:
  - `courses` table - Main course information
  - `course_videos` table - YouTube videos linked to courses
  - `course_images` table - Additional course images/resources
  - Sample data and indexes for performance

### 2. **Backend API Routes**
- **File**: `routes/courses.js`
- **Location**: `src/Backed for AI Test/ai-lms-backend/routes/`
- **Endpoints**:
  - `GET /courses` - Get all courses with stats
  - `GET /courses/:id` - Get single course with videos and images
  - `POST /courses` - Create new course
  - `PUT /courses/:id` - Update course
  - `DELETE /courses/:id` - Delete course (cascades to videos, images, enrollments, progress)
  - `POST /courses/:courseId/videos` - Add video to course
  - `PUT /courses/:courseId/videos/:videoId` - Update video
  - `DELETE /courses/:courseId/videos/:videoId` - Delete video
  - `POST /courses/:courseId/images` - Add image to course
  - `PUT /courses/:courseId/images/:imageId` - Update image
  - `DELETE /courses/:courseId/images/:imageId` - Delete image
  - `GET /courses/:id/stats` - Get course statistics

### 3. **Frontend Admin Component**
- **File**: `AdminCourses.tsx`
- **Location**: `src/pages/`
- **Features**:
  - Admin authentication with password
  - Create new courses
  - Add videos to courses (YouTube embed URLs)
  - Add images to courses
  - View and manage all course content
  - Delete courses and their content
  - Expandable course details showing all videos and images

### 4. **API Documentation**
- **File**: `COURSES_API_DOCUMENTATION.md`
- **Location**: `src/Backed for AI Test/`
- **Contains**: Complete API reference with examples and usage

## Setup Instructions

### Step 1: Run Database Schema
```bash
# Connect to your PostgreSQL database and execute:
# psql -U your_user -d your_database -f COURSES_DATABASE_SCHEMA.sql

# Or copy-paste the SQL from COURSES_DATABASE_SCHEMA.sql into pgAdmin
```

### Step 2: Backend is Already Configured
The backend routes have been created and the server.js already imports the courses router:
```javascript
import courseRoutes from "./routes/courses.js";
app.use("/courses", courseRoutes);
```

### Step 3: Add Route to Frontend Router
Add this to your main routing file (likely `App.tsx` or route configuration):

```tsx
import AdminCourses from "@/pages/AdminCourses";

// In your routes configuration:
{
  path: "/admin/courses",
  element: <AdminCourses />,
  errorElement: <NotFound />
}
```

## Usage

### For Admin Users:
1. Navigate to `/admin/courses`
2. Enter admin password: `admin123`
3. Use the forms to:
   - **Create Courses**: Add course name, description, and thumbnail image
   - **Add Videos**: Select a course and add YouTube videos (embed format required)
   - **Add Images**: Select a course and add course images
   - **Manage Content**: View, edit, and delete courses, videos, and images

### YouTube URL Format:
- **Convert from watch URL**: `https://www.youtube.com/watch?v=VIDEO_ID`
- **To embed format**: `https://www.youtube.com/embed/VIDEO_ID`
- **Example**: 
  - Watch: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
  - Embed: `https://www.youtube.com/embed/dQw4w9WgXcQ`

### API Examples:

#### Create a Course
```bash
curl -X POST http://localhost:3000/courses \
  -H "Content-Type: application/json" \
  -d '{
    "course_name": "Advanced Radiology",
    "course_description": "Master advanced imaging techniques",
    "course_image": "https://example.com/image.jpg"
  }'
```

#### Add Video to Course
```bash
curl -X POST http://localhost:3000/courses/1/videos \
  -H "Content-Type: application/json" \
  -d '{
    "video_title": "CT Scanning",
    "video_url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
    "video_order": 1
  }'
```

#### Add Image to Course
```bash
curl -X POST http://localhost:3000/courses/1/images \
  -H "Content-Type: application/json" \
  -d '{
    "image_url": "https://example.com/image.jpg",
    "image_title": "Equipment Photo",
    "image_order": 1
  }'
```

## Database Relationships

```
courses (1) -----> (M) course_videos
  |
  +-----> (M) course_images
```

## Features Included

✅ Create/Read/Update/Delete (CRUD) operations for courses
✅ YouTube video integration with embed URLs
✅ Image management for courses
✅ Course statistics (videos, images count)
✅ Cascading deletes (deleting a course removes all related data)
✅ Admin authentication
✅ Database transactions for data consistency
✅ Input validation
✅ Error handling and logging

## Next Steps

1. **Run the database schema** in your PostgreSQL database
2. **Test the API** using the examples in COURSES_API_DOCUMENTATION.md
3. **Add the route** to your React Router configuration
4. **Access the admin panel** at `/admin/courses`
5. **Create courses** and add videos/images through the UI

## Notes

- The admin password is currently `admin123` (change in production)
- YouTube URLs must be in embed format
- All deletions are cascaded automatically
- Database operations use transactions for consistency
