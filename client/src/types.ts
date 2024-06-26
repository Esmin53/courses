export interface Author {
    id: string;
    username: string;
    specialization: string;
    profile_picture?: string;
    description: string
}

export interface Course {
    title: string;
    id: string;
    price: string;
    thumbnail: string;
    description: string;
    author: Author;
    averageRating: number;
}

export interface User {
    id: string,
    username: string,
    specialization: string,
    description: string,
    role: 'STUDENT' | 'TUTOR' | 'ADMIN',
    profile_picture?: string
}