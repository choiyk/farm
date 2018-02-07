import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { User } from './../domain/User';

@Injectable()
export class StorageService {
    constructor(private storage: Storage) { }

    public setUser(user: User): Promise<void>{
        return this.storage.set('user', user);
    }

    public getUser(): Promise<User>{
        return this.storage.get('user');
    }

    public setId(id: number){
        this.storage.set('id', id);
    }

    public getId(): Promise<number>{
        return this.storage.get('id');
    }

    public setEmail(email: string){
        this.storage.set('email', email);
    }

    public getEmail(): Promise<string>{
        return this.storage.get('email');
    }

    public setNickname(nickname: string){
        this.storage.set('nickname', nickname);
    }

    public getNickname(): Promise<string>{
        return this.storage.get('nickname');
    }

    public setType(type: number){
        this.storage.set('type', type);
    }

    public getType(): Promise<number>{
        return this.storage.get('type');
    }

    public clear() {
        this.storage.clear().then(() => {
            console.log('all keys cleared');
        });
    }
}