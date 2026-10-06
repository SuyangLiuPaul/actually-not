import sharp from 'sharp'
import {readFileSync,mkdirSync,writeFileSync} from 'node:fs'
const svg=readFileSync('assets/icon.svg')
const ios='ios/App/App/Assets.xcassets/AppIcon.appiconset'
mkdirSync(ios,{recursive:true})
await sharp(svg,{density:384}).resize(1024,1024).flatten({background:'#f7f4ee'}).png().toFile(`${ios}/AppIcon-1024.png`)
writeFileSync(`${ios}/Contents.json`,JSON.stringify({images:[{filename:'AppIcon-1024.png',idiom:'universal',platform:'ios',size:'1024x1024'}],info:{author:'xcode',version:1}},null,2))
for(const [density,size] of [['mdpi',48],['hdpi',72],['xhdpi',96],['xxhdpi',144],['xxxhdpi',192]]){
 const dir=`android/app/src/main/res/mipmap-${density}`;mkdirSync(dir,{recursive:true})
 for(const name of ['ic_launcher','ic_launcher_round','ic_launcher_foreground']) await sharp(svg,{density:384}).resize(size,size).flatten({background:'#f7f4ee'}).png().toFile(`${dir}/${name}.png`)
}
const dir='android/app/src/main/res/drawable';mkdirSync(dir,{recursive:true})
writeFileSync(`${dir}/ic_stat_discovery.xml`,'<vector xmlns:android="http://schemas.android.com/apk/res/android" android:width="24dp" android:height="24dp" android:viewportWidth="24" android:viewportHeight="24"><path android:fillColor="#ffffff" android:pathData="M4,3h16v18h-16zM7,7v2h10v-2zM7,12v2h10v-2z" android:fillType="evenOdd"/></vector>')
