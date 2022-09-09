import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage-angular";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
    providedIn: 'root'
})
export class TranslateConfigService {
    private _storage: Storage | null = null;

    static LANG: string = 'LANG';
    static DEFAULT_LANG: string = 'ar';


    constructor(
        private translate: TranslateService,
        private storage: Storage
    ) {

    }

    async init() {
        const storage = await this.storage.create();
        this._storage = storage;
    }

    initDefaultLanguage() {
        this.storage.get(TranslateConfigService.LANG).then((currLang) => {
            if (!currLang || currLang === null) {
                console.log(currLang);
                this.setLanguage(TranslateConfigService.DEFAULT_LANG);
            } else {
                console.log(currLang);
                this.setLanguage(currLang);
            }
        });
    }

    setLanguage(lang: string) {
        this.storage.set(TranslateConfigService.LANG, lang).then((currLang) => {
            this.translate.setDefaultLang(lang);
            this.translate.use(lang);
        });
    }


    getCurrentLang() {
        return this.storage.get(TranslateConfigService.LANG);
    }


}