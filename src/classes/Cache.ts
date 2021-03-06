import {Store} from './Store'
import {StrMap} from '../types'

export class Cache {
  stores: StrMap<Store<any>> = {}

  has(key: string) {
    return this.stores[key] !== undefined
  }

  create(key: string) {
    this.stores[key] = new Store()
  }

  get(key: string) {
    return this.stores[key]
  }

  delete(key: string) {
    delete this.stores[key]
  }

  getData() {
    const data = {} as StrMap<any>
    for (const key in this.stores) {
      data[key] = this.stores[key].get()
    }
    return data
  }

  setData(data: StrMap<any>) {
    for (const key in data) {
      if (!this.has(key)) this.create(key)
      this.stores[key].set(data[key])
    }
  }

  async waitLoading() {
    const updates = await Promise.all(Object.values(this.stores).map((store) => store.wait()))
    return updates.includes(true)
  }
}
