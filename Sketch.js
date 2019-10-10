/*
!!Warning: don't look if you have trypophobia

Adjective: (go to end)
Operation: click mouse to change patterns, use mouse to control the motion

Brief description:
Mode 1: Circles surround the center of the screen, bouncing back and forth. The whole group of particles is pumping on the blood-like background.
Mode 2: Particles chase the rectanglem controlled by mouse. The group surges through the position and wraps it up in a moment.
Mode 3: Particles fall away. They drop from the black board and flee away from the cross, like a quiet death.
The transition from 3 to 1 simulates the respawning.

Reminder: When switching back to mode 1, all circles come back from outside of the screen. It may take some time to recover.
I tried to write an initializer but that turns to a trypophobia thing.
*/


let spike = []; //Spike array is to store the objects.
let i = 0; //Count of each loop
let opc; //This parameter controls the opacity of each graphic
let clr, clg, clb = 0; //The color

let mode = 0; //The initial mode count.

function setup() {
  createCanvas(1000, 700);
  background(255);
  //The loop generates circles. Objects are stored in the array.
  for (i = 0; i < 400; i ++){
    spike[i] = new Spike(clr, clg, clb, opc);
  }
}

function draw() {
  //Mode 1
  if (mode == 0){ 
    noStroke();
    //Draw the position of mouse
    fill(255, 57,85);
    ellipse(mouseX, mouseY, 20, 20);
    
    opc = random(20, 60);//Change the opacity
    fill(255,0,0,opc);
    rect(0, 0, 1000, 700);//Refresh the screen to wipe the graphic in the last run of the loop
    
    for (i = 0; i < 400; i++){
      spike[i].freeze(); //Particles surround the center
      spike[i].brush1(); 
    } 
  } else if (mode == 1) {
    fill(0);
    rect (mouseX - 10, mouseY - 10, 20, 20);
    opc = random(40);
    fill(255,255,255,opc);
    rect(0, 0, 1000, 700);
    
    for (i = 0; i < 400; i ++){
      spike[i].track(); //Particles track the mouse
      spike[i].brush3(); 
    } 
  } else {
    noStroke();
    //Draw the cross
    quad(mouseX - 10, mouseY - 5, mouseX - 5, mouseY - 10, mouseX + 10, mouseY + 5, mouseX + 5, mouseY + 10);
    quad(mouseX + 10, mouseY - 5, mouseX + 5, mouseY - 10, mouseX - 10, mouseY + 5, mouseX - 5, mouseY + 10);
    opc = random(20, 70);
    fill(0,0,0,opc);
    rect(0, 0, 1000, 700);
    
    for (i = 0; i < 400; i++){
      spike[i].fall(); //Particles fall
      spike[i].brush2() //The brush flip the color of graphics and the background.
    }
  }
}

function mousePressed(){
  //Change mode
  //3 in total
  if (mode == 2){
    mode = 0;
  } else {
    mode ++;
  }
}

class Spike{ 
  constructor(r, g, b, c){
    //Pass the parameter
    this.r = r;
    this.g = g;
    this.b = b;
    this.c = c;
    //Create vectors
    this.p = createVector(random(width), random(height)); //The initial position of an object(circle)
    this.v = createVector(); //The velocity of the object, giving the direction and moving speed.
    this.a = createVector(); //The acceleration of the object. The object will bounce back when reaching the end of its harmonic motion
  }

  brush1(){
    //Create the black circle
    fill(0);
    noStroke();
    ellipse(this.p.x, this.p.y, 7.5, 7.5);//Position to the p vector
  }
  
  brush2(){
    //Create the white circle
    fill(255);
    noStroke();
    ellipse(this.p.x, this.p.y, 7.5, 7.5);
  }
  
  brush3(){
    //Set the random orange/green color
    this.r = random(100, 250);
    this.g = random(50, 100);
    this.g = random(50, 70);
    fill(this.r, this.g, this.b, this.c)
    noStroke();
    ellipse(this.p.x, this.p.y, 7.5, 7.5);
  }
  
  freeze(){
    //Three vectors control the motion, all particles share a common, steady center
    //The acceleration change with the difference between center position and the circle.
    this.a = createVector(width/2-this.p.x, height/2 -this.p.y); //Follow a pattern of a trigonometric function
    this.a.limit(0.5); //Set the maximum acceleration
    //Acceleration applis to velocity
    this.v.add(this.a);
    this.v.limit(18); //Set the maximum velocity. It set up the radius of the sphere wrapping the center along with acceleration
    //Velcity applies to position
    this.p.add(this.v) //Move the object
  }
  
  track(){
    //The center of the motion changes to the mouse
    this.a = createVector(mouseX-this.p.x, mouseY -this.p.y); //Circles chase the mouse
    this.a.limit(0.5);
    this.v.add(this.a);
    this.v.limit(15); //A smaller velocity makes particles closer to each other.
    this.p.add(this.v)
  }
  
  fall(){
    //Circles fall away
    this.a = createVector(0, 0.1); //Apply the gravity
    this.v.add(this.a);
    this.p.add(this.v)
  }
  


}

/*
My Adjective: Anxious
The project was to imitate the emotion at different time. But I found it not that clear.
I'm just too lazy to think of any other words.
*/
