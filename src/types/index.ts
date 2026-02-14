export interface CodeSnippet {
    id?: string;
    label: string;
    language: 'cpp' | 'python' | 'typescript';
    code: string;
    description?: string;
}

export interface ContentUnit {
    id: string;
    title: string;
    description: string;
    type: 'video' | 'lab' | 'exercise' | 'combined';
    metadata: {
        duration?: number;          // Minutes
        format: 'short' | 'lecture'; // Video type
        difficulty?: 'beginner' | 'intermediate' | 'advanced';
        tags?: string[];            // Keywords
    };
    assets: {
        videoUrl?: string;     // Path to /public/content/...
        notesUrl?: string;     // PDF download
        visualizerPreset?: any; // JSON config for the AlgorithmVisualizer
        codeSnippets?: CodeSnippet[];
    };
    exercise?: {
        checklist: string[];   // Tasks for the user
        hints: string[];
    };
}

export interface CourseModule {
    id: string;
    title: string;
    description?: string; // Added for viral module descriptions
    units: ContentUnit[];
}

export interface Subject {
    id: string;
    title: string;
    description: string;
    modules: CourseModule[];
    recommendedReadings?: {
        title: string;
        author: string;
        year?: number;
        url?: string;
        description?: string;
    }[];
}
