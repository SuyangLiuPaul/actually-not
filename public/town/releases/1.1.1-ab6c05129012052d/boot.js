// External boot: CSP does not need unsafe-inline or unsafe-eval.
import('./modules/main.js').catch(error=>{
 console.error('Town entry failed:',error);
 const root=document.getElementById('app'); if(!root)return;root.replaceChildren();
 const box=document.createElement('main');box.className='boot';box.setAttribute('role','alert');
 const title=document.createElement('h1');title.textContent='小镇暂时无法载入';
 const note=document.createElement('p');note.textContent='程序文件未能载入。请保留已有存档，重试或先阅读文字资料。';
 const retry=document.createElement('button');retry.textContent='重新载入';retry.onclick=()=>location.reload();
 const link=document.createElement('a');link.href='https://extensionaus.com.au/professionalbeekeepers/cream-and-candied-honey/';link.textContent='阅读蜂蜜结晶资料';link.rel='noopener noreferrer';
 box.append(title,note,retry,document.createElement('br'),link);root.append(box);
});
