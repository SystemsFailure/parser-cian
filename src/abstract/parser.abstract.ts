import { Cian } from "../types/cian.namespace";

export abstract class Parser {
    protected baseUrl: string;
    protected timeout: number;
    protected cities: Cian.ParserCianCity[];
    protected timeDelay: any;
  
    constructor(options: Cian.ParserOptions) {
      this.baseUrl = options.baseUrl;
      this.timeout = options.timeout;
      this.timeDelay = options.timeDelay;
      this.cities = options.cities;
    }
  
    // Абстрактный метод, парсинга
    abstract parse(): Promise<void>;
  
    // метод для загрузки\обработки файлов
    abstract downloadFile(url: string, array: any[], itemFullObject: any, outputObject: any): Promise<any>;
  
    // метод для работы с базами данных
    abstract databaseModeling(model: any, data: any): Promise<any>;
  
    // Метод для проверки доступности источника
    abstract getActiveProxies(url: string, config: {}): Promise<any>;
  
    // Кастомный метод получения данных
    abstract customFetchData(url: string, citys: Cian.ParserCianCity[]): Promise<any>;
  }