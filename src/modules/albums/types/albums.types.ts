export interface AlbumCredentials {
    name:   string;
    date:   string;
    theme:  string;
    photos?: { url: string }[];
}

export interface AlbumUpdateCredentials {
    name?:  string;
    date?:  string;
    theme?: string;
    photos?: { url: string }[];
}

export interface Album {
    id:     number;
    name:   string;
    date:   string;
    theme:  string;
    photos: { id: number; url: string }[];
    userId: number;
    user:   { id: number; email: string };
}