//主入口文件
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { enableProdMode } from '@angular/core'


import './assets/lib/css/bootstrap.min.css'
import './assets/lib/css/font-awesome.min.css'

// import './assets/lib/js/jquery_2.2.0.js'
// import './assets/lib/js/bootstrap_3.3.7.js'
import './assets/lib/js/piecon.min.js';

declare var  Piecon:any;

(function () {
      Piecon.setOptions({
        fallback: 'force',
        color: '#12eeb9',
        background: '#505769'
      });

      Piecon.reset();
    })();
// bulma
import 'bulma'


import './styles.css'

import { AppModule } from './app/app.module'

platformBrowserDynamic().bootstrapModule(AppModule)