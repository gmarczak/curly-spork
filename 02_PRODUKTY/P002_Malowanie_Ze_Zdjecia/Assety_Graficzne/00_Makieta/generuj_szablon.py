import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter
from scipy import ndimage as ndi
S=600
img=Image.open('dog.jpg').convert('RGB').crop((24,0,744,720)).resize((S,S),Image.LANCZOS)
img.save('photo.jpg',quality=85)
sm=np.asarray(img.filter(ImageFilter.MedianFilter(9)).filter(ImageFilter.MedianFilter(7)),dtype=np.float32)
X=sm.reshape(-1,3); rng=np.random.default_rng(1); K=14
C=X[rng.choice(len(X),K,replace=False)]
for _ in range(25):
    d=((X[:,None,:]-C[None])**2).sum(-1); L=d.argmin(1)
    C=np.array([X[L==k].mean(0) if (L==k).any() else C[k] for k in range(K)])
lab=L.reshape(S,S)
# usuwanie drobnych plam
for it in range(4):
    changed=0
    for k in range(K):
        cc,n=ndi.label(lab==k)
        if n==0: continue
        sizes=ndi.sum(np.ones_like(cc),cc,range(1,n+1))
        for i,sz in enumerate(sizes,1):
            if sz<220:
                m=cc==i; ring=ndi.binary_dilation(m,iterations=2)&~m
                vals=lab[ring]
                if vals.size: lab[m]=np.bincount(vals,minlength=K).argmax(); changed+=1
    if not changed: break
# numeracja wg jasności (1 = najjaśniejszy)
order=np.argsort(-C.sum(1)); num={int(k):i+1 for i,k in enumerate(order)}
pal=C.clip(0,255).astype(np.uint8)
painted=pal[lab]; Image.fromarray(painted).save('painted.jpg',quality=88)
edge=(lab!=np.roll(lab,1,0))|(lab!=np.roll(lab,1,1)); edge[0,:]=edge[:,0]=False
tmpl=np.full((S,S,3),255,np.uint8); tmpl[edge]=(150,142,134)
T=Image.fromarray(tmpl); dr=ImageDraw.Draw(T)
try: f=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',11)
except: f=ImageFont.load_default()
for k in range(K):
    cc,n=ndi.label(lab==k)
    for i in range(1,n+1):
        m=cc==i
        if m.sum()<300: continue
        dt=ndi.distance_transform_edt(m)
        if dt.max()<6: continue
        y,x=np.unravel_index(dt.argmax(),dt.shape)
        dr.text((x,y),str(num[k]),fill=(120,112,104),font=f,anchor='mm')
T.save('template.png',optimize=True)
tm=np.asarray(T); half=tm.copy(); half[:,:S//2]=painted[:,:S//2]; half[:,S//2-1:S//2+1]=(180,71,47)
Image.fromarray(half).save('half.jpg',quality=88)
# paleta do grafiki zestawu
open('palette.txt','w').write(' '.join('#%02x%02x%02x:%d'%(*pal[k],num[int(k)]) for k in order))
print('ok',K)
