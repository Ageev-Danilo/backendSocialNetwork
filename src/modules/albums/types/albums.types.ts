export interface AlbumCredentials {
    name: string; 
}

export interface Album {
    id:      number;
    name:    string;   
    date:    string; 
    userId:  number;
    user:    { id: number; email: string };
}