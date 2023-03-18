import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import storageService from "./storage.service";

const API_URL = "http://localhost:5000/api";

class ApiService {
  public accessToken: string | null = "";
  public headers: any;

  constructor() {
    this.reload();
  }

  reload() {
    this.accessToken = storageService.get("token");
    this.headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.accessToken}`,
    };
  }

  get(
    url: string,
    config?: AxiosRequestConfig<any> | undefined
  ): Promise<AxiosResponse<any, any>> {
    config = {
      ...config,
      headers: this.headers,
    };
    return axios.get(API_URL + url, config);
  }

  post(
    url: string,
    data?: any,
    config?: AxiosRequestConfig<any> | undefined
  ): Promise<AxiosResponse<any, any>> {
    config = {
      ...config,
      headers: this.headers,
    };
    return axios.post(API_URL + url, data, config);
  }

  put(
    url: string,
    data?: any,
    config?: AxiosRequestConfig<any> | undefined
  ): Promise<AxiosResponse<any, any>> {
    config = {
      ...config,
      headers: this.headers,
    };
    return axios.put(API_URL + url, data, config);
  }
}

export default new ApiService();
