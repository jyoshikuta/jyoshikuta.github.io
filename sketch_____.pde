// http://www.openprocessing.org/sketch/154196
PImage img = loadImage("http://www.clker.com/cliparts/3/1/2/2/11949848201138561364eye_01.svg.med.png");
PImage img2 = loadImage("http://www.clipartbest.com/cliparts/ncB/XGx/ncBXGxAAi.png");
PImage img3 = loadImage("http://images4.wikia.nocookie.net/__cb20120121221605/callofduty/images/e/e7/M1897_Trench_Gun_CoD2.png");
PImage img4 = loadImage("http://fc02.deviantart.net/fs71/f/2013/027/c/2/blood_png_by_rainysometimes-d5sxess.png");
PImage img5 = loadImage("http://img2.wikia.nocookie.net/__cb20120116041052/mspaintadventures/images/archive/b/b5/20120210073547!Blood.png");
PImage img6 = loadImage("http://www.tigatime.com/uploadfiles-t/images/cartoon/Blood/BloodStain.png");
PImage img7 = loadImage("http://3.bp.blogspot.com/-JqMiZsJJois/UdBlIDR34hI/AAAAAAAAG0Y/TV30ZGwjpZU/s645/gun+aim.png");

int modetype = 0;
int nb = 5;
int nb2 = 5;
int stage = 1;
int level = 1;
int fail = 0;
SeaWeed[] weeds;
PVector rootNoise = new PVector(random(123456), random(123456));
int mode = 0;

void setup()
{
size(600, 450, P2D);
weeds = new SeaWeed[nb];
for (int i = 0; i < nb; i++)
{
weeds[i] = new SeaWeed(random(0, width), height);
}
}

void draw()
{
if (modetype == 0){ 
background(50);
textSize(70);
text("Kill The Tentacle",25,200);
textSize(40);
text(" level  "+ stage,200,275);
fill(random(255),random(255),random(255));
textSize(40);
text("Leftclick to start ",80,350);
fill(random(255),random(255),random(255));
image(img2,random(425,450),random(300,350),20,37); 
}//0

if (modetype == 1){ 
  
background(random(243, 255),random(205 ,231),random(152, 199)); 

int XX = int(random(1,1000));

if (nb <= 0){XX=1001;}


if (XX%1==0){
for (int i = 0; i < nb; i++){
weeds[i].update(); 
textSize(20);
text(" Enemy : "+nb+"                                                          Level : "+stage ,10,30);
fill(random(255),0,0);
//int bb = int(random(60, 100));
//image(img,random(0,450),random(50,200),bb,bb); 
image(img3,mouseX,350,150,150); 
image(img7,mouseX-25,mouseY-25,50,50); 
frameRate(24); 
}}

if (XX%(30-stage) == 0) {
nb=nb+1; 
weeds = new SeaWeed[nb];
for (int i = 0; i < nb; i++)
{
weeds[i] = new SeaWeed(random(0, width), height);} }
textSize(20);
text(" Enemy : "+nb+"                                                          Level : "+stage ,10,30);
fill(random(255),0,0);

image(img3,mouseX,350,150,150); 
image(img7,mouseX-25,mouseY-25,50,50); 

if (XX == 1001){ 
background(50);
textSize(100);
text("YOU WIN",80,200);
fill(random(255),random(255),random(255)); 
textSize(40);
text("Press space to level  "+ (stage+1),80,350);
fill(random(255),random(255),random(255));
}//1001


}//1

} //draw


void mousePressed



()
{
  //image(img3,mouseX-100,mouseY-100,150,150); 
  image(img3,mouseX,350,180,180); 
  image(img3,mouseX,350,180,180);  
  image(img3,mouseX,350,180,180); 
  
  int blood =int(random(0,3));
  if (blood <= 1.5){
  image(img4,mouseX-75,mouseY-75,150,150); }
  if (blood  > 1.2){
  image(img6,mouseX-75,mouseY-75,150,150);
  }

  
modetype = 1;
nb=nb-1;
if (nb <= 0){nb=0;}
weeds = new SeaWeed[nb];
for (int i = 0; i < nb; i++)
{
weeds[i] = new SeaWeed(random(0, width), height);
}
}

void keyPressed()
{
background(random(243, 255),random(205 ,231),random(152, 199));

stage=stage+1;
nb =nb2+5;
nb2=nb;
weeds = new SeaWeed[nb];
for (int i = 0; i < nb; i++)
{
weeds[i] = new SeaWeed(random(0, width), height);
}
}
class SeaWeed
{
final static float DIST_MAX = 4;//length of each segment
final static float maxNbSeg = 110;//max number of segments
final static float minNbSeg = 80;//min number of segments
final static float maxWidth = 500;//max width of the base line
final static float minWidth = 10;//min width of the base line
final static float FLOTATION = 8;//flotation constant
float mouseDist;//mouse interaction distance
int nbSegments = (int)random(minNbSeg, maxNbSeg);//number of segments
PVector[] pos;//position of each segment
color[] cols;//colors array, one per segment
MyColor myCol = new MyColor();
PVector rootNoise = new PVector(random(123456), random(123456));//noise water effect
float x;//x origin of the weed
SeaWeed(float p_x, float p_y)
{
pos = new PVector[nbSegments];
cols = new color[nbSegments];
x = p_x;
mouseDist = map(nbSegments, minNbSeg, maxNbSeg, 25, 50);
for (int i = 0; i < nbSegments; i++)
{
pos[i] = new PVector(p_x, p_y - i * DIST_MAX);
cols[i] = myCol.getColor();
}
}
void update()
{
rootNoise.add(new PVector(.02, .02));
PVector mouse = new PVector(mouseX-10, mouseY-10);
pos[0] = new PVector(x, height);
for (int i = 1; i < nbSegments; i++)
{
float n = noise(rootNoise.x + .003 * pos[i].x, rootNoise.y + .003 * pos[i].y);
float noiseForce = (.3 - n) * 4;
pos[i].x += noiseForce;
pos[i].y -= FLOTATION;
//mouse interaction
float d = PVector.dist(mouse, pos[i]);
if (d < mouseDist)// && pmouseX != mouseX && abs(pmouseX - mouseX) < 12)
{
PVector tmpPV = mouse.get(); 
tmpPV.sub(pos[i]);
tmpPV.normalize();
tmpPV.mult(mouseDist);
tmpPV = PVector.sub(mouse, tmpPV);
pos[i] = tmpPV.get();
}
PVector tmp = PVector.sub(pos[i-1], pos[i]);
tmp.normalize();
tmp.mult(DIST_MAX);
pos[i] = PVector.sub(pos[i-1], tmp);
}
myCol.update();
cols[0] = myCol.getColor();
for (int i = 0; i < nbSegments; i++)
{
if (i > 0)
{ 
float t = atan2(pos[i].y - pos[i-1].y, pos[i].x - pos[i-1].x) + PI/2;
float l = map(i, 0, nbSegments-1, map(nbSegments, minNbSeg, maxNbSeg, minWidth, maxWidth), 1);
float c = cos(t) * l;
float s = sin(t) * l;
}
}
if(mode == 1) beginShape(LINES);
for (int i = 0; i < nbSegments; i++)
{
if(mode == 0)
{
stroke(0, 100);
fill(cols[i]);
float r = (30 * cos(map(i, 0, nbSegments - 1, 0, HALF_PI)));
ellipse(pos[i].x, pos[i].y + 10, r, r);
}else
{
noFill();
stroke(cols[i]);
strokeWeight(nbSegments-i+int(30 * cos(map(i, 0, nbSegments - 1, 0, HALF_PI))));
curveVertex(pos[i].x, pos[i].y + 10);
}
}
if(mode == 1) endShape(); 
}
}

class MyColor
{
float R, G, B, Rspeed, Gspeed, Bspeed;
final static float minSpeed = .2;
final static float maxSpeed = .8;
final float minG = 120;
MyColor()
{
init();
}
public void init()
{
R = random(243, 255);
G = random(205 ,231);
B = random(152, 199);
Rspeed = (random(1) > .5 ? 1 : -1) * random(minSpeed, maxSpeed);
Gspeed = (random(1) > .5 ? 1 : -1) * random(minSpeed, maxSpeed);
Bspeed = (random(1) > .5 ? 1 : -1) * random(minSpeed, maxSpeed);
}
public void update()
{
Rspeed = ((R += Rspeed) > minG || (R < 0)) ? -Rspeed : Rspeed;
Gspeed = ((G += Gspeed) > 255 || (G < minG)) ? -Gspeed : Gspeed;
Bspeed = ((B += Bspeed) > minG || (B < 0)) ? -Bspeed : Bspeed;
}
public color getColor()
{
return color(R, G, B);
}
}


