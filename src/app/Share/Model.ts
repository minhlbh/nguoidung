export interface TrieuChung {
    _id: string;
    Name: String;
    TSC: number;
    TSCP: number;
}

export interface Benh {
    _id: string;
    Name: String;
    ChiTiet: String;
    DsTrieuChung: DsTrieuChung;
    Score: number;
}

export interface DsTrieuChung {
    Name: string;
    Value: TrieuChung[];
}

