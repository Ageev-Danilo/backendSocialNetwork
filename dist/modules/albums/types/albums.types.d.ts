export interface AlbumCredentials {
    name: string;
    theme: string;
    year: number;
    isShown?: boolean;
    isDefault?: boolean;
    images?: {
        image: string;
    }[];
}
export interface Album {
    id: number;
    name: string;
    theme: string;
    year: number;
    createdAt: Date;
    isShown: boolean;
    isDefault: boolean;
    images: {
        id: number;
        image: string;
    }[];
    profileId: number;
    profile: {
        id: number;
        pseudonym: string;
    };
}
//# sourceMappingURL=albums.types.d.ts.map