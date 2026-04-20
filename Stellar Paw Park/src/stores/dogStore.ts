import { defineStore } from 'pinia'
import { userType, dogType } from '../types/storeTypes'
import db from '../firebase'
import { useAuthStore } from './authStore'

export const useDogStore = defineStore('DogStore', {
    state: () => ({
        userDogs: [] as dogType[],
    }),
    actions: {

    },
})