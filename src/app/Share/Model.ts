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

export interface Thuoc {
    _id: string,
    Name: string,
    Hang: string,
    Nuoc: string,
    DongGoi: string,
    HoatChat: string,
    DuongDung: string,
    HamLuong: string,
    TongSoLuong: number,
}

export interface DsTrieuChung {
    Name: string;
    Value: TrieuChung[];
}

