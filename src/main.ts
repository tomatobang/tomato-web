//主入口文件
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { enableProdMode } from '@angular/core'


import './assets/lib/css/bootstrap.min.css'
import './assets/lib/css/font-awesome.min.css'

// bulma
import 'bulma'

import { AppModule } from './app/app.module'

platformBrowserDynamic().bootstrapModule(AppModule)