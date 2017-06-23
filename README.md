# tomato-web
> web app of tomatobang. aim to make your work&life healthier and more interesting than ever~

## Demo
* initial version : https://tomatobang.github.io/tomato-web/ (refer to loveky/pomodoro-time)
* version online: http://115.29.51.196:5555

## Dev
```bash
git clone https://github.com/tomatobang/tomato-web.git
cd tomato-web
npm start
```

## Prod
you need go to your/path/to/tomato-web/src/app/app.routes.ts and change part of code to :
```
// JIT for DEV
//loadChildren:loadUserModule
// AOT for PROD
loadChildren:'./_user/user.module#UserModule'
```

then. just run
```bash
npm run build
```
if everything goes ok. you could see your prod files in dist/ under tomato-web/

## Support
chat are welcomed. see:https://tomatobang.slack.com

## License
MIT@yipeng.info