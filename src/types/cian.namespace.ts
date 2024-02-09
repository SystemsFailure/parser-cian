
export namespace Cian {
    export interface RentObject {
        title: string | null | undefined,
        parseSourceId: number | null | undefined,
        foreignId: number | null | undefined,
        regionId: number | null | undefined,
        cityId: number | null | undefined,
        districtId: number | null | undefined,
        streetId: number | null | undefined,
        houseNumber: number | null | undefined,
        name: string | null | undefined,
        phone: number | null | undefined,
        price: number | null | undefined,
        objectTypeId: number | null | undefined,
        pledge: string | null | undefined,
        src: string | null | undefined,
        area: number | null | undefined,
        areaKitchen: number | null | undefined,
        areaLiving: number | null | undefined,
        description: string | null | undefined,
        storey: number | null | undefined,
        storeyNumber: number | null | undefined,
        fullObject: string | null | undefined,
    }
    export type ParserCianCity = {
        region: string
        id: number
        name: string
        origin: string
  }

    export interface ParserOptions {
        baseUrl: string;
        timeout: number;
        timeDelay: any;
        cities: ParserCianCity[];
    }
}