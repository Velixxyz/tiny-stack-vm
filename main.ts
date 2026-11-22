import{readdirSync,readFileSync,writeFileSync,mkdirSync}from"node:fs";
function R(p,q){
let A=Int32Array,D=new A(256),C=new A(64),M=new A(256),O=new Uint8Array(1<<16),o=0,s=0,c=0,t=0,x=0,i=0,a,b,r,T=e=>[O.subarray(0,o),e];
for(;;){
if(t==1e6)return T(10);
if(x<0||x>=p.length)return T(9);
let k=p[x];
if(k>7&&k<16||k>34&&k<48||k==31||k>52&&k<64||k>65&&k<80||k>83)return T(5);
let m=k==1?1:k==2?4:k>=48&&k<=51?2:0;
if(x+m>=p.length)return T(9);
t++;
let n=x+1+m;
let B=k>15&&k<35&&k!=23&&k!=27&&k!=31;
let u=k==7?3:B||k==5||k==6||k==65?2:";3;4;23;27;49;50;64;80;81;83;".includes(";"+k+";")?1:0;
let v=k==1||k==2||k==82||k==23||k==27||k==64||B?1:k==4||k==5?2:k==6||k==7?3:0;
if(s<u)return T(2);
if(s-u+v>256)return T(3);
x=n;
if(k==0)return T(0);
if(k<3){D[s++]=k==1?(p[n-1]<<24)>>24:p[n-4]|p[n-3]<<8|p[n-2]<<16|p[n-1]<<24;continue}
if(k==3){s--;continue}
if(k==4){D[s]=D[s-1];s++;continue}
if(k==5){a=D[s-1];D[s-1]=D[s-2];D[s-2]=a;continue}
if(k==6){D[s]=D[s-2];s++;continue}
if(k==7){a=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=a;continue}
if(k==23){D[s-1]=-D[s-1];continue}
if(k==27){D[s-1]=~D[s-1];continue}
if(B){
a=D[s-2];b=D[s-1];
if(k>18&&k<23&&!b)return T(4);
if(k==16)r=a+b;else if(k==17)r=a-b;else if(k==18)r=Math.imul(a,b);
else if(k==19)r=a/b;else if(k==20)r=a%b;
else if(k==21)r=Math.floor((a>>>0)/(b>>>0));else if(k==22)r=(a>>>0)%(b>>>0);
else if(k==24)r=a&b;else if(k==25)r=a|b;else if(k==26)r=a^b;
else if(k==28)r=a<<(b&31);else if(k==29)r=a>>(b&31);else if(k==30)r=a>>>(b&31);
else if(k==32)r=a==b?1:0;else if(k==33)r=a<b?1:0;else r=a>>>0<b>>>0?1:0;
s-=2;D[s++]=r;continue;
}
if(k>=48&&k<=50){
let g=(p[n-2]|p[n-1]<<8)<<16>>16,w=k==48||(k==49)==(D[--s]==0);
if(w)x=n+g;
continue;
}
if(k==51){if(c==64)return T(7);C[c++]=n;x=p[n-2]|p[n-1]<<8;continue}
if(k==52){if(!c)return T(8);x=C[--c];continue}
if(k==64||k==65){a=D[s-1];if(a<0||a>255)return T(6);if(k==64)D[s-1]=M[a];else{M[a]=D[s-2];s-=2}continue}
if(k==80){let y=""+D[--s];if(o+y.length>65536)return T(11);O.set(Buffer.from(y),o);o+=y.length;continue}
if(k==81){if(o>65535)return T(11);O[o++]=D[--s]&255;continue}
if(k==82){D[s++]=i<q.length?q[i++]:-1;continue}
if(k==83)return T(D[--s]&255);
}
}
let I=process.env.MAKEFUN_INPUT_DIR||"/input",Y=process.env.MAKEFUN_OUTPUT_DIR||"/output";
for(let d of readdirSync(I).sort()){
let r=R(readFileSync(I+"/"+d+"/program.bin"),readFileSync(I+"/"+d+"/input.bin")),y=Y+"/"+d;
mkdirSync(y,{recursive:true});
writeFileSync(y+"/stdout.bin",r[0]);
writeFileSync(y+"/exit.txt",r[1]+"\n");
}
