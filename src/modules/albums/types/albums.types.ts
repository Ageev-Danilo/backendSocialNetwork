export interface AlbumCredentials {
    name: string;
    date: string;
    theme: string;
}

export interface Album {
    id:      number;
    name:    string;   
    date:    string; 
    theme: string;
    userId:  number;
    user:    { id: number; email: string };
}