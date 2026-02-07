# Courses Management API Documentation

## Database Setup

1. Execute the SQL schema from `COURSES_DATABASE_SCHEMA.sql` in your PostgreSQL database
2. The schema creates 3 tables:
   - `courses` - Main courses table
   - `course_videos` - YouTube videos linked to courses
   - `course_images` - Additional images for courses

## API Endpoints

### Courses

#### Get All Courses
```
GET /courses
```
Returns list of all courses with video, image, and enrollment counts.

**Response:**
```json
[
  {
    "id": 1,
    "course_name": "Radiology Fundamentals",
    "course_description": "Learn the basics of radiological imaging techniques",
    "course_image": "https://example.com/image.jpg",
    "video_count": 2,
    "image_count": 3,
    "created_at": "2026-02-06T10:00:00Z"
  }
]
```

#### Get Single Course with Videos and Images
```
GET /courses/:id
```
Returns a specific course with all its videos and images.

**Response:**
```json
{
  "id": 1,
  "course_name": "Radiology Fundamentals",
  "course_description": "Learn the basics of radiological imaging techniques",
  "course_image": "https://example.com/image.jpg",
  "videos": [
    {
      "id": 1,
      "course_id": 1,
      "video_title": "Chest X-ray Basics",
      "video_url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
      "video_order": 1
    }
  ],
  "images": [
    {
      "id": 1,
      "course_id": 1,
      "image_url": "https://example.com/image.jpg",
      "image_title": "Radiology Equipment",
      "image_order": 1
    }
  ]
}
```

#### Create Course
```
POST /courses
Content-Type: application/json

{
  "course_name": "Course Title",
  "course_description": "Detailed course description",
  "course_image": "https://example.com/image.jpg" (optional)
}
```

**Response:** 201 Created
```json
{
  "id": 5,
  "course_name": "Course Title",
  "course_description": "Detailed course description",
  "course_image": "https://example.com/image.jpg",
  "created_at": "2026-02-06T10:00:00Z"
}
```

#### Update Course
```
PUT /courses/:id
Content-Type: application/json

{
  "course_name": "Updated Title",
  "course_description": "Updated description",
  "course_image": "https://example.com/new-image.jpg"
}
```

#### Delete Course
```
DELETE /courses/:id
```
Deletes the course and all associated videos, images, enrollments, and progress records.

### Course Videos

#### Add Video to Course
```
POST /courses/:courseId/videos
Content-Type: application/json

{
  "video_title": "Video Title",
  "video_url": "https://www.youtube.com/embed/VIDEO_ID",
  "video_order": 1 (optional)
}
```

**Note:** YouTube URLs must be in embed format:
- Correct: `https://www.youtube.com/embed/dQw4w9WgXcQ`
- Incorrect: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`

To convert a YouTube watch URL to embed:
1. Get the video ID from: `https://www.youtube.com/watch?v=VIDEO_ID`
2. Create embed URL: `https://www.youtube.com/embed/VIDEO_ID`

#### Update Video
```
PUT /courses/:courseId/videos/:videoId
Content-Type: application/json

{
  "video_title": "Updated Title",
  "video_url": "https://www.youtube.com/embed/NEW_VIDEO_ID",
  "video_order": 2
}
```

#### Delete Video
```
DELETE /courses/:courseId/videos/:videoId
```

### Course Images

#### Add Image to Course
```
POST /courses/:courseId/images
Content-Type: application/json

{
  "image_url": "https://example.com/image.jpg",
  "image_title": "Image Title" (optional),
  "image_order": 1 (optional)
}
```

#### Update Image
```
PUT /courses/:courseId/images/:imageId
Content-Type: application/json

{
  "image_url": "https://example.com/new-image.jpg",
  "image_title": "Updated Title",
  "image_order": 2
}
```

#### Delete Image
```
DELETE /courses/:courseId/images/:imageId
```

### Course Statistics

#### Get Course Stats
```
GET /courses/:id/stats
```
Returns statistics about a course.

**Response:**
```json
{
  "id": 1,
  "course_name": "Radiology Fundamentals",
  "total_videos": 2,
  "total_images": 3
}
```

## Error Responses

All endpoints return appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (missing required fields)
- `404` - Not Found
- `500` - Server Error

Error response format:
```json
{
  "error": "Error message"
}
```

## Examples

### Create a course with videos
```bash
# 1. Create course
curl -X POST http://localhost:3000/courses \
  -H "Content-Type: application/json" \
  -d '{
    "course_name": "Advanced Radiology",
    "course_description": "Master advanced radiological techniques",
    "course_image": "https://example.com/course.jpg"
  }'

# Response: { "id": 5, ... }

# 2. Add video to course
curl -X POST http://localhost:3000/courses/5/videos \
  -H "Content-Type: application/json" \
  -d '{
    "video_title": "CT Scanning Techniques",
    "video_url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
    "video_order": 1
  }'

# 3. Add another video
curl -X POST http://localhost:3000/courses/5/videos \
  -H "Content-Type: application/json" \
  -d '{
    "video_title": "MRI Principles",
    "video_url": "https://www.youtube.com/embed/9bZkp7q19f0",
    "video_order": 2
  }'

# 4. Add course image
curl -X POST http://localhost:3000/courses/5/images \
  -H "Content-Type: application/json" \
  -d '{
    "image_url": "https://example.com/radiology-equipment.jpg",
    "image_title": "Radiology Department",
    "image_order": 1
  }'
```

## Integration Notes

- The courses routes are registered at `/courses` in the server
- All database operations use parameterized queries to prevent SQL injection
- Deleting a course automatically cascades to delete all related videos, images, enrollments, and progress
- YouTube URLs must be in embed format (the API validates this)
- Image and video ordering allows for custom sequencing in the frontend
