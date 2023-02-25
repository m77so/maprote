// https://app.quicktype.io/

export interface Topology {
    type:     string;
    id:       string;
    metadata: Metadata;
    objects:  Objects;
    arcs:     Array<Array<number[]>>;
    bbox:     [number, number, number, number];
}

export interface Metadata {
    type:                 string[];
    "dc:title":           string;
    "dc:source":          string;
    "dc:issued":          Date;
    "dc:subject":         string[];
    "cc:license":         string;
    "cc:useGuidelines":   string;
    "cc:attributionText": string;
    "cc:attributionURL":  string;
}

export interface Objects {
    town: Town;
    city: City;
}

export interface City {
    type:       string;
    geometries: CityGeometry[];
}

export interface CityGeometry {
    type:       string;
    arcs:       Array<Array<number[]>>;
    id:         string;
    properties: PurpleProperties;
}

export interface PurpleProperties {
    PREF:       string;
    CITY:       string;
    PREF_NAME:  KENNAMEEnum;
    CITY_NAME:  CITYNAMEEnum;
    KEN:        string;
    KEN_NAME:   KENNAMEEnum;
    SITYO_NAME: null;
    GST_NAME:   CITYNAMEEnum;
    CSS_NAME:   null;
    DUMMY1:     Dummy1;
    KIGO_D:     null;
    N_KEN:      null;
    N_CITY:     null;
    KIGO_I:     null;
}

export type CITYNAMEEnum = string

export enum Dummy1 {
    Empty = "-",
}

export type KENNAMEEnum = string

export interface Town {
    type:       string;
    geometries: TownGeometry[];
}

export interface TownGeometry {
    type:       Type;
    arcs:       Array<number[]>;
    properties: FluffyProperties;
}

export interface FluffyProperties {
    KEY_CODE:   string;
    PREF:       string;
    CITY:       string;
    S_AREA:     string;
    PREF_NAME:  KENNAMEEnum;
    CITY_NAME:  CITYNAMEEnum;
    S_NAME:     string;
    KIGO_E:     KigoE | null;
    HCODE:      number;
    AREA:       number;
    PERIMETER:  number;
    H27KAxx_:   number;
    H27KAxx_ID: number;
    KEN:        string;
    KEN_NAME:   KENNAMEEnum;
    SITYO_NAME: null;
    GST_NAME:   CITYNAMEEnum;
    CSS_NAME:   null;
    KIHON1:     string;
    DUMMY1:     Dummy1;
    KIHON2:     string;
    KEYCODE1:   string;
    KEYCODE2:   string;
    AREA_MAX_F: AreaMaxF | null;
    KIGO_D:     null;
    N_KEN:      null;
    N_CITY:     null;
    KIGO_I:     null;
    MOJI:       string;
    KBSUM:      number;
    JINKO:      number;
    SETAI:      number;
    X_CODE:     number;
    Y_CODE:     number;
    KCODE1:     string;
}

export enum AreaMaxF {
    M = "M",
}

export enum KigoE {
    E1 = "E1",
    E2 = "E2",
    E3 = "E3",
}

export enum Type {
    Polygon = "Polygon",
}
