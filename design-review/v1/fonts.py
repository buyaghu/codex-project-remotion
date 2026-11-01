import pathlib,urllib.request
folder=pathlib.Path('public/fonts/review')
folder.mkdir(parents=True,exist_ok=True)
base='https://raw.githubusercontent.com/google/fonts/main/ofl/'
for name,path in [('Inter','inter/Inter%5Bopsz%2Cwght%5D.ttf'),('Jakarta','plusjakartasans/PlusJakartaSans%5Bwght%5D.ttf'),('Manrope','manrope/Manrope%5Bwght%5D.ttf')]:
 if not (folder/(name+'.ttf')).exists():
  urllib.request.urlretrieve(base+path,folder/(name+'.ttf'))
 family=path.split('/')[0]
 urllib.request.urlretrieve(base+family+'/OFL.txt',folder/(name+'-OFL.txt'))
