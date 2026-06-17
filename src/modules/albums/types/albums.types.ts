export interface AlbumCredentials {
    name:   string;
    theme:  string;
    year:   number;         
    images?: { image: string }[];  
}

export interface AlbumUpdateCredentials {
    name?:  string;
    theme?: string;
    year?:  number;
    images?: { image: string }[];
}

export interface Album {
    id:        number;
    name:      string;
    theme:     string;
    year:      number;
    isShown:   boolean;
    isDefault: boolean;
    profileId: number;
    images:    { id: number; image: string }[];
}