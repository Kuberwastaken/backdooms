// Base122 encoder implementation remains the same
function encodeBase122(str) {
    const utf8Encode = new TextEncoder();
    const bytes = utf8Encode.encode(str);
    let result = '';
    let bits = 0;
    let bitsLength = 0;
    const encodeTable = [
        '\x00', '\x01', '\x02', '\x03', '\x04', '\x05', '\x06', '\x07', 
        '\x08', '\x09', '\x0a', '\x0b', '\x0c', '\x0d', '\x0e', '\x0f',
        '\x10', '\x11', '\x12', '\x13', '\x14', '\x15', '\x16', '\x17',
        '\x18', '\x19', '\x1a', '\x1b', '\x1c', '\x1d', '\x1e', '\x1f',
        ' ', '!', '"', '#', '$', '%', '&', '\'',
        '(', ')', '*', '+', ',', '-', '.', '/',
        '0', '1', '2', '3', '4', '5', '6', '7',
        '8', '9', ':', ';', '<', '=', '>', '?',
        '@', 'A', 'B', 'C', 'D', 'E', 'F', 'G',
        'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
        'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W',
        'X', 'Y', 'Z', '[', '\\', ']', '^', '_',
        '`', 'a', 'b', 'c', 'd', 'e', 'f', 'g',
        'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o',
        'p', 'q', 'r', 's', 't', 'u', 'v', 'w',
        'x', 'y', 'z', '{', '|', '}', '~'
    ];

    for (let i = 0; i < bytes.length; i++) {
        bits = (bits << 8) | bytes[i];
        bitsLength += 8;
        
        while (bitsLength >= 7) {
            const index = (bits >> (bitsLength - 7)) & 0x7F;
            result += encodeTable[index];
            bitsLength -= 7;
        }
    }

    if (bitsLength > 0) {
        bits <<= (7 - bitsLength);
        result += encodeTable[bits & 0x7F];
    }

    return result;
}

// Optimized game code
const gameCode = `<html><head><style>body{margin:0;overflow:hidden;background:#000;cursor:crosshair}canvas{width:100vw;height:100vh}</style><title>BACKDOOMS</title></head><body><canvas id=c></canvas><script>with(Math)M=cos,N=sin,P=hypot,T=atan2,A=atan;c.width=320;c.height=240;h=c.getContext('2d');x=y=4;a=H=0;H=100;m=25;rc=fl=0;S=random()*100;f=(i,j)=>(abs(i-4)<4&&abs(j-4)<4)?0:((i+1e3)%7==3||(j+1e3)%7==3)?0:(n=N(i*12.9898+j*78.233+S)*43758.5453,n-=n|0,n<.05?1:0);e=[{x:5,y:4,h:100},{x:4,y:5,h:100}];k={};onkeydown=e=>k[e.key]=1;onkeyup=e=>k[e.key]=0;onclick=_=>{m&&(m--,fl=2,rc=.2,h.fillStyle="#FA0",h.fillRect(140,160,40,20),e.forEach(o=>{d=P(o.x-x,o.y-y),r=T(o.y-y,o.x-x);d<5&&abs(r-a)<.3&&(o.h-=50)}))};R=_=>{rc=max(0,rc-.02);fl=max(0,fl-1);e=e.filter(o=>o.h>0);h.fillStyle="#000";h.fillRect(0,0,320,240);k.ArrowLeft&&(a-=.1);k.ArrowRight&&(a+=.1);v=.1;(k.ArrowUp||k.w)&&(X=x+M(a)*v,Y=y+N(a)*v,f(~~X,~~Y)!=1&&(x=X,y=Y));(k.ArrowDown||k.s)&&(X=x-M(a)*v,Y=y-N(a)*v,f(~~X,~~Y)!=1&&(x=X,y=Y));if((k.ArrowUp||k.w||k.ArrowDown||k.s||k.ArrowLeft||k.ArrowRight)&&e.length<10&&random()<.01){t=random()*6.283,D=1+random(),X=x+M(t)*D,Y=y+N(t)*D,f(~~X,~~Y)==0&&e.push({x:X,y:Y,h:100})}random()<.005&&m<25&&m++;e.forEach(o=>{X=x-o.x,Y=y-o.y,d=P(X,Y);d>.2&&(nx=o.x+X/d*.0015,ny=o.y+Y/d*.0015,f(~~nx,~~ny)!=1&&(o.x=nx,o.y=ny));d<.5&&(H--,fl=2)});w=[];for(i=320;i--;){r=a+A((i-160)/160);X=x;Y=y;s=N(r);c=M(r);d=0;while(d<20&&f(~~X,~~Y)!=1){X+=c*.1;Y+=s*.1;d+=.1}d*=M(r-a);w[i]=d;h2=min(240,240/d);g=min(255,200/d)|0;h.fillStyle='rgb('+g+','+g+','+g+')';h.fillRect(i,120-h2/2+rc*20,1,h2)}e.forEach(o=>{d=P(o.x-x,o.y-y);r=T(o.y-y,o.x-x)-a;if(abs(r)<1.2){z=80/d;p=160+r*160;if(p>=0&&p<320&&d<w[~~p]*1.1){h.fillStyle=o.h>50?'#400':'#800';h.fillRect(p-z/2,120-z/2+rc*20,z,z*1.5);h.fillStyle='#f00';h.fillRect(p-z/4,120-z/2+rc*20,z/8,z/4);h.fillRect(p+z/4,120-z/2+rc*20,z/8,z/4);h.fillStyle='#900';h.fillRect(p-z/2,120-z/2-4+rc*20,z,2);h.fillStyle='#0f0';h.fillRect(p-z/2,120-z/2-4+rc*20,z*(o.h/100),2)}}});h.fillStyle='#444';h.fillRect(140,180+rc*20,40,60);fl&&(h.fillStyle='#FA0',h.fillRect(140,160+rc*20,40,20));h.fillStyle='#f00';h.fillRect(10,10,H,10);h.fillStyle='#ff0';h.fillRect(10,25,m*4,5);h.font='7px Arial';h.fillStyle='#fff';h.fillText('HP',10,7);h.fillText('AMMO:'+m,10,28);h.textAlign='right';h.fillText('<3 Kuber',315,235);h.textAlign='left';H>0?requestAnimationFrame(R):(h.fillStyle='#000a',h.fillRect(0,0,320,240),h.fillStyle='#f00',h.font='20px Arial',h.textAlign='center',h.fillText('GAME OVER',160,110),h.fillText('F5',160,130))};R()</script>`;

// Create data URL and check sizes
const originalSize = new TextEncoder().encode(gameCode).length;
const dataUrl = 'data:text/html,' + encodeBase122(gameCode);
const finalSize = new TextEncoder().encode(dataUrl).length;

console.log('Original size:', originalSize, 'bytes');
console.log('Final encoded size:', finalSize, 'bytes');
console.log('\nData URL:', dataUrl);