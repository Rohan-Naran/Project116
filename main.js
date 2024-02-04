righteyeX=0;
righteyeY=0;

lefteyeX=0;
lefteyeY=0;

leftEarX=0;
rightEarX=0;

midX=0;
midY=0;

function preload(){
    glasses = loadImage('https://i.postimg.cc/g2CG8dTr/Glasses.png');
}
function setup(){
    canvas= createCanvas(300,300);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(300, 300);
    video.hide();


    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log('PoseNet is initialized')
}

function gotPoses(results)
{
    if(results.length > 0){
        console.log(results);
        righteyeX = results[0].pose.rightEye.x;
        righteyeY = results[0].pose.rightEye.y;

        lefteyeX = results[0].pose.leftEye.x;
        lefteyeY = results[0].pose.leftEye.y;

        midX = (righteyeX+lefteyeX)/2;
        midY = (righteyeY+lefteyeY)/2;

        console.log("right eye x = " + righteyeX);
        console.log("right eye y = " + righteyeY)
        console.log("left eye x = " + lefteyeX);
        console.log("left eye y = " + lefteyeY);

        leftEarX = results[0].pose.leftEar.x;
        rightEarX = results[0].pose.rightEar.x;
    }
}

function draw(){
    width = rightEarX - leftEarX;
    height = 4/6 * width;

    image(video, 0, 0, 300, 300);
    image(glasses, midX-30, midY-17, 60, 40);
}
function take_snapshot(){
    save('your_pic.png');
}