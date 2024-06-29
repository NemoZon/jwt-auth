/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";
import AuthService from "../service/AuthService";
import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import { API_URL } from "../http";

export default class Store {
  user = {} as IUser;
  isAuth = false;
  authError = "";
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }
  setAuth(bool: boolean) {
    this.isAuth = bool;
  }
  setUser(user: IUser) {
    this.user = user;
  }
  setAuthError(error: string) {
    this.authError = error;
  }
  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }
  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      this.setAuthError("");
    } catch (e: any) {
      this.setAuthError(e.response?.data?.message);
      console.log(e.response?.data?.message);
    }
  }
  async registration(email: string, password: string) {
    try {
      const response = await AuthService.registration(email, password);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      this.setAuthError("");
    } catch (e: any) {
      this.setAuthError(e.response?.data?.message);
      console.log(e.response?.data?.message);
    }
  }
  async logout() {
    try {
      await AuthService.logout();
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({} as IUser);
      this.setAuthError("");
    } catch (e: any) {
      this.setAuthError(e.response?.data?.message);
      console.log(e.response?.data?.message);
    }
  }
  async checkAuth() {
    this.setIsLoading(true);
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      this.setAuthError("");
    } catch (e: any) {
      this.setAuthError(e.response?.data?.message);
      console.log(e.response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }
}
