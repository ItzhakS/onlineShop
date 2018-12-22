import { Injectable } from "@angular/core";

@Injectable()
export class Configuration {
  public ApiBaseUrl: String = "http://localhost:9090/api/";
  public CityList: Array<string> = ['Jerusalem', 'NY', 'LA', 'LON', 'TLV', 'RBS']
}
