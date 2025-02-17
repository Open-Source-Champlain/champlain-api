import express, { Request, Response } from "express";

const router = express.Router();
const BASE_URL = "https://classlist.champlain.edu/api3"; // Base URL for Champlain's API

/**
 * @route GET /courses
 * @description Fetch all courses or filter by subject.
 * @queryParam {string} subject - (Optional) Filter by subject (e.g., "CSI").
 * @returns {JSON} List of courses.
 */
router.get("/courses", async (req: Request, res: Response) => {
    try {
        // Extract subject from query parameters (if provided)
        const subject = req.query.subject as string | undefined;

        // Construct API URL based on whether a subject filter is provided
        const url = subject
            ? `${BASE_URL}/courses/semester/?subject=${subject}`
            : `${BASE_URL}/courses/semester/`;

        // Fetch course data from Champlain's API
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch courses");

        // Parse JSON response and send it back to the client
        const courses = await response.json();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

/**
 * @route GET /courses/:subject/:courseNumber
 * @description Fetch details about a specific course.
 * @param {string} subject - The course subject (e.g., "CSI").
 * @param {string} courseNumber - The course number (e.g., "240").
 * @returns {JSON} Course details.
 */
router.get("/courses/:subject/:courseNumber", async (req: Request, res: Response) => {
    try {
        // Extract subject and courseNumber from URL parameters
        const { subject, courseNumber } = req.params;

        // Construct API URL to fetch specific course details
        const url = `${BASE_URL}/course/number/${subject}_${courseNumber}/02`;

        // Fetch course details from Champlain's API
        const response = await fetch(url);
        if (!response.ok) throw new Error("Course not found");

        // Parse JSON response and return course details
        const courseDetails = await response.json();
        res.json(courseDetails);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

/**
 * @route GET /courses/filter
 * @description Filter courses by format (online/in-person/hybrid) and time (day/evening).
 * @queryParam {string} format - (Optional) Course format (e.g., "online", "hybrid", "in-person").
 * @queryParam {string} time - (Optional) Course time (e.g., "day", "evening").
 * @returns {JSON} Filtered list of courses.
 */
router.get("/courses/filter", async (req: Request, res: Response) => {
    try {
        // Extract query parameters for filtering
        const { format, time } = req.query; // Example: ?format=online&time=evening

        // Fetch all courses first
        const url = `${BASE_URL}/courses/semester/`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch courses");

        // Parse JSON response
        let courses = await response.json();

        // Filter courses by format (if provided)
        if (format) {
            courses = courses.filter((course: any) => course.format === format);
        }

        // Filter courses by time (if provided)
        if (time) {
            courses = courses.filter((course: any) => course.time === time);
        }

        // Return the filtered courses
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

export default router;
