import axios, {AxiosInstance, AxiosRequestConfig} from 'axios'
import {useAction} from './useAction'
import {useResource, ResourceOptions} from './useResource'

type AxiosOptions = {
  axios: AxiosInstance
  config: AxiosRequestConfig
}

type Options = ResourceOptions & AxiosOptions

let axiosInstance = axios.create()
export function setAxiosInstance(instance: AxiosInstance) {
  axiosInstance = instance
}

export function useGet<T>(url: string, options: Partial<Options> = {}) {
  let {axios, config, ...settings} = options
  const key = JSON.stringify({url, config})
  const fn = () => (axios || axiosInstance).get<T>(url, config)
  const {data: res, ...rest} = useResource(key, fn, settings)
  return {
    status: res?.status,
    headers: res?.headers,
    data: res?.data,
    ...rest,
  }
}

export function usePost<Args, T = any>(url: string, options: Partial<AxiosOptions> = {}) {
  const fn = (data: Args) => (options.axios || axiosInstance).post<T>(url, data, options.config)
  const {data: res, ...rest} = useAction(fn)
  return {
    status: res?.status,
    headers: res?.headers,
    data: res?.data,
    ...rest,
  }
}

export function usePut<T>(url: string, data?: any, options: Partial<AxiosOptions> = {}) {
  const fn = () => (options.axios || axiosInstance).put<T>(url, data, options.config)
  const {data: res, ...rest} = useAction(fn)
  return {
    status: res?.status,
    headers: res?.headers,
    data: res?.data,
    ...rest,
  }
}

export function useDelete<T>(url: string, options: Partial<AxiosOptions> = {}) {
  const fn = () => (options.axios || axiosInstance).delete<T>(url, options.config)
  const {data: res, ...rest} = useAction(fn)
  return {
    status: res?.status,
    headers: res?.headers,
    data: res?.data,
    ...rest,
  }
}
